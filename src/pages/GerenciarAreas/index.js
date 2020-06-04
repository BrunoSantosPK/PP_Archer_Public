import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Picker, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

// Estilos
import globals from "../Fragments/globalStyle";
import style from "./style";

// Componentes personalizados
import Header from "../Fragments/Header";
import FinalMargin from "../Fragments/FinalMargin";
import AdMob from "../Fragments/AdMob";

// Funções gerais
import Storage from "../../utils/storage";
import gerarAlerta from "../../utils/gerarAlerta";

// Server
import api from "../../services/api";

export default function GerenciarAreas() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Gerancia as variáveis de estado para áreas
    const [areas, setAreas] = useState([]);
    const [todasAreas, setTodasAreas] = useState([]);
    const [novaArea, setNovaArea] = useState(0);
    const [descArea, setDescArea] = useState("");
    const [detalhamento, setDetalhamento] = useState("");

    // Modal de confirmação para exclusão
    const [aberto, setAberto] = useState(false);
    const [tagDel, setTagDel] = useState("");
    const [idDel, setIdDel] = useState(0);

    // Seleciona uma área no picker
    function selecionar(value) {
        setNovaArea(value);

        for(let i = 0; i < todasAreas.length; i++) {
            if(todasAreas[i].id_area == value) {
                setDescArea(todasAreas[i].descricao);
                break;
            }
        }
    }

    // Carrega as áreas cadastradas para o profissional
    async function loadCadastradas() {
        setLoading(true);

        // Recupera informações pessoais
        const dados = await Storage.getDadosUsuarios();
        const id_profissional = dados.dados_pessoais.id;

        try {
            // Busca dados no banco
            const res = await api.post("/profissional.php", {
                proc: "areas_cadastradas", id_profissional
            });

            if(res.data.sucesso) {
                setAreas(res.data.data);
            } else {
                gerarAlerta("Status Loading", res.data.log)
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Staus Loading", "Um erro de conexão ocorreu, verifique sua conectividade com a internet.")
        }
    }

    // Carrega todas as áreas existente
    async function loadAreas() {
        setLoading(true);

        try {
            // Busca dados no banco
            const res = await api.post("/profissional.php", {
                proc: "areas_disponiveis"
            });

            if(res.data.sucesso) {
                setTodasAreas(res.data.data);
            } else {
                gerarAlerta("Status Loading", res.data.log)
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Staus Loading", "Um erro de conexão ocorreu, verifique sua conectividade com a internet.")
        }
    }

    function excluirArea(indc) {
        setTagDel(areas[indc].tag);
        setIdDel(areas[indc].id_area);
        setAberto(true);
    }

    async function excluir() {
        setLoading(true);
        setAberto(false);

        // Recupera informações pessoais
        const dados = await Storage.getDadosUsuarios();
        const id_profissional = dados.dados_pessoais.id;
        const id_area = idDel;

        try {
            // Busca dados no banco
            const res = await api.post("/profissional.php", {
                proc: "del_area", id_profissional, id_area
            });

            if(res.data.sucesso) {
                loadCadastradas();
            } else {
                setLoading(false);
                gerarAlerta("Status Loading", res.data.log)
            }

        } catch(erro) {
            setLoading(false);
            gerarAlerta("Staus Loading", "Um erro de conexão ocorreu, verifique sua conectividade com a internet.")
        }
    }

    // Cria uma nova área de especialização
    async function addArea() {
        setLoading(true);

        // Recupera dados pessoais
        const dados = await Storage.getDadosUsuarios();
        const id_profissional = dados.dados_pessoais.id;

        // Recupera dados do estado
        const id_area = novaArea;

        try {
            // Envia dados para o banco
            const res = await api.post("/profissional.php", {
                proc: "add_area", id_profissional, id_area, detalhamento
            });

            if(res.data.sucesso) {
                gerarAlerta("Sucesso", "A nova especialidade foi adicionada ao sistema.");
                setDetalhamento("");
                loadCadastradas();
            } else {
                setLoading(false);
                gerarAlerta("Erro", res.data.log);
            }

        } catch(erro) {
            setLoading(false);
            gerarAlerta("Status Loading", "Um erro de conexão ocorreu, verifique sua conectividade com a internet.");
        }
    }

    // Função de inicialização
    async function init() {
        await loadCadastradas();
        await loadAreas();
    }
    useEffect(() => {
        init();
    }, []);

    return (
        <KeyboardAvoidingView style={globals.body} behavior={Platform.Os == "ios" ? "padding" : "height"}>

            <Header />

            <ScrollView style={globals.conteudo}>

                <Spinner
                    visible={loading} textContent={"Carregando..."} textStyle={globals.spinnerTextStyle}
                />

                <View style={style.areaHeader}>
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Especialidades</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14} color={globals.textoGeral.color}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                {areas.map((item, indc) => (
                    <View style={[globals.backSecao, style.secao]} key={item.id_area}>
                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Especialidade:</Text> {item.tag}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Descrição Geral:</Text> {item.descricao}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Descrição Pessoal:</Text> {item.detalhamento}
                        </Text>

                        <TouchableOpacity style={style.botaoExcluir} onPress={() => excluirArea(indc)}>
                            <Feather name="trash-2" size={13} color={style.textoBotalExcluir.color}></Feather>
                            <Text style={[globals.textoGeral, style.textoBotalExcluir]}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={style.areaSubTitulo}>
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Cadastrar Nova</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14} color={globals.textoGeral.color}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={style.itemFormulario}>
                        <Text style={[globals.textoGeralBold, style.textoLabel]}>Selecione uma especialidade</Text>
                        <Picker
                            selectedValue={novaArea}
                            style={[style.select, globals.textoGeral, globals.input]}
                            onValueChange={value => selecionar(value)}
                        >
                            {todasAreas.map(item => (
                                <Picker.Item label={item.tag} value={item.id_area} />
                            ))}
                        </Picker>
                        <Text style={[globals.textoGeral, style.textoLabel]}>{descArea}</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={style.itemFormulario}>
                            <Text style={[globals.textoGeralBold, style.textoLabel]}>Descreva um pouco mais seu trabalho com esta especialidade.</Text>
                            <TextInput
                                value={detalhamento}
                                style={[globals.input, globals.textoGeral, style.textoLabel]}
                                onChangeText={text => setDetalhamento(text)}
                                multiline={true}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={style.itemFormulario}>
                        <TouchableOpacity style={[globals.botao, style.botaoVoltar]} onPress={addArea}>
                            <Text style={[globals.textoBotao, style.textoBotalVoltar]}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={aberto}
                >
                    <View style={style.corpoModal}>
                        <View style={style.conteudoModal}>
                            <Text style={[globals.textoGeral, style.textoModal]}>Você tem certeza que deseja excluir sua especialidade em "{tagDel}"?</Text>

                            <View style={style.areaBotoesModal}>
                                <TouchableOpacity style={[globals.botao, style.botao]} onPress={() => setAberto(false)}>
                                    <Text style={globals.textoBotao}>Não</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[globals.botao, style.botao]} onPress={excluir}>
                                    <Text style={globals.textoBotao}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </KeyboardAvoidingView>
    );
}