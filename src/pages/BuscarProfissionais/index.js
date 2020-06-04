import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, Picker, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from 'expo-mail-composer';
import style from "./style";

// Estilos
import globals from "../Fragments/globalStyle";

// Componentes personalizados
import Header from "../Fragments/Header";
import FinalMargin from "../Fragments/FinalMargin";
import AdMob from "../Fragments/AdMob";

// Funções gerais
import Storage from "../../utils/storage";
import gerarAlerta from "../../utils/gerarAlerta";

// Server
import api from "../../services/api";

export default function BuscarProfissionais() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Gerencia os profissionais
    const [profissionais, setProfissionais] = useState([]);
    const [areas, setAreas] = useState([]);

    // Gerencia os estados
    const estados = [
        { sigla: "", label: "Todos" },
        { sigla: "AC", label: "Acre" },
        { sigla: "AL", label: "Alagoas" },
        { sigla: "AP", label: "Amapá" },
        { sigla: "AM", label: "Amazonas" },
        { sigla: "BA", label: "Bahia" },
        { sigla: "CE", label: "Ceará" },
        { sigla: "DF", label: "Distrito Federal" },
        { sigla: "ES", label: "Espírito Santo" },
        { sigla: "GO", label: "Goiás" },
        { sigla: "MA", label: "Maranhão" },
        { sigla: "MT", label: "Mato Grosso" },
        { sigla: "MS", label: "Mato Grosso do Sul" },
        { sigla: "MG", label: "Minas Gerais" },
        { sigla: "PA", label: "Pará" },
        { sigla: "PB", label: "Paraíba" },
        { sigla: "PR", label: "Paraná" },
        { sigla: "PE", label: "Pernambuco" },
        { sigla: "PI", label: "Piauí" },
        { sigla: "RJ", label: "Rio de Janeiro" },
        { sigla: "RN", label: "Rio Grande do Norte" },
        { sigla: "RS", label: "Rio Grande do Sul" },
        { sigla: "RO", label: "Rondônia" },
        { sigla: "RR", label: "Roraima" },
        { sigla: "SC", label: "Santa Catarina" },
        { sigla: "SP", label: "São Paulo" },
        { sigla: "SE", label: "Sergipe" },
        { sigla: "TO", label: "Tocantins" }
    ];
    const [ufArea, setUfArea] = useState("");
    const [ufNome, setUfNome] = useState("");

    // Gerencia informações da busca
    const [selectArea, setSelectArea] = useState(0);
    const [nomeBusca, setNomeBusca] = useState("");
    const [executado, setExecutado] = useState(false);
    const [total, setTotal] = useState(0);
    const [query, setQuery] = useState("");

    // Gerencia o contato via e-mail
    function sendMail(indc) {
        MailComposer.composeAsync({
            subject: `Contato via Sistema Archer`,
            recipients: [profissionais[indc].email],
            body: `Olá ${profissionais[indc].nome}, como vai? Entro em contato por motivos profissionais, através do seu cadastro no Sistema Archer. Poderíamos conversar melhor? Desde já, agradeço a atenção.`
        });
    }

    // Gerencia o contato via whatsapp
    function sendZap(indc) {
        const mensagem = `Olá ${profissionais[indc].nome}, como vai? Entro em contato por motivos profissionais, através do seu cadastro no Sistema Archer. Poderíamos conversar melhor? Desde já, agradeço a atenção.`

        Linking.openURL(`whatsapp://send?phone=55${profissionais[indc].telefone}&text=${mensagem}`);
    }

    // Carrega as áreas disponíveis
    async function loadAreas() {
        setLoading(true);

        try {
            // Busca no banco
            const res = await api.post("/cliente.php", {
                proc: "areas_disponiveis"
            });

            if(res.data.sucesso) {
                setAreas(res.data.data);
            } else {
                gerarAlerta("Loading", res.data.log);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifica a sua conectividade com a internet.");
        }
    }

    // Carrega os profissionais
    async function buscar(post) {
        setLoading(true);

        try {
            // Busca informações no banco
            const res = await api.post("/cliente.php", post);

            if(res.data.sucesso) {
                setProfissionais(res.data.data);
                setExecutado(true);
                setTotal(res.data.data.length);
            } else {
                gerarAlerta("Loading", res.data.log);
            }

            setLoading(false)
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifica a sua conectividade com a internet.");
        }
    }

    // Função intermediária, que monta o estilo de busca para cada função
    function search(tipo) {
        if(tipo == "nome") {
            const post = {
                proc: "buscar_profissional_nome", nome: nomeBusca, local: ufNome
            };

            setQuery(`"${nomeBusca}"${(ufNome) == "" ? "": "/" + ufNome}`)
            buscar(post);
        } else if(tipo == "area") {
            const post = {
                proc: "buscar_profissionais", id_area: selectArea, local: ufArea
            };

            for(let i = 0; i < areas.length; i++) {
                if(areas[i].id_area == selectArea) {
                    setQuery(`"${areas[i].tag}"${(ufArea) == "" ? "": "/" + ufArea}`);
                    break;
                }
            }
            buscar(post);
        }
    }

    // Envia para a tela de recomendação
    async function recomendar(indc) {
        const dados = {
            modo: "novo",
            id_profissional: profissionais[indc].id_profissional,
            classificacao: 5,
            descricao: "",
            nome: profissionais[indc].nome
        };
        await Storage.setDadosRecomendacao(dados);
        nav.navigate("EditarRecomendacao");
    }

    // Envia para a tela de detalhes
    async function detalhar(indc) {
        const dados = {
            id_profissional: profissionais[indc].id_profissional
        }
        await Storage.setDadosDetalhes(dados);
        nav.navigate("DetalhesProfissional");
    }

    // Função de inicialização
    useEffect(() => {
        loadAreas();
    }, [])

    return (
        <KeyboardAvoidingView style={globals.body} behavior={Platform.Os == "ios" ? "padding" : "height"}>

            <Header />

            <ScrollView style={globals.conteudo}>

                <Spinner
                    visible={loading} textContent={"Carregando..."} textStyle={globals.spinnerTextStyle}
                />

                <View style={style.areaHeader}>
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Profissionais</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14} color={globals.textoGeral.color}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.areaBusca}>
                    <Text style={[globals.textoGeral, style.textoLabel]}>Buscar por área</Text>

                    <Picker
                        selectedValue={selectArea}
                        onValueChange={value => setSelectArea(value)}
                        style={globals.textoGeral}
                    >
                        {areas.map(item => (
                            <Picker.Item label={item.tag} value={item.id_area} />
                        ))}
                    </Picker>

                    <Text style={[globals.textoGeral, style.textoLabel]}>UF do profissional</Text>

                    <Picker
                        style={globals.textoGeral}
                        selectedValue={ufArea}
                        onValueChange={value => setUfArea(value)}>
                        {estados.map(estado => (
                            <Picker.Item label={estado.label} value={estado.sigla} />
                        ))}
                    </Picker>

                    <TouchableOpacity style={globals.botao} onPress={() => search("area")}>
                        <Text style={globals.textoBotao}>Buscar</Text>
                    </TouchableOpacity>

                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.areaBusca}>
                        <Text style={[globals.textoGeral, style.textoLabel]}>Buscar por nome</Text>

                        <TextInput
                            value={nomeBusca}
                            style={[globals.input, globals.textoGeral]}
                            onChangeText={text => setNomeBusca(text)}
                        />

                        <Text style={[globals.textoGeral, style.textoLabel]}>UF do profissional</Text>

                        <Picker
                            style={globals.textoGeral}
                            selectedValue={ufNome}
                            onValueChange={value => setUfNome(value)}>
                            {estados.map(estado => (
                                <Picker.Item label={estado.label} value={estado.sigla} />
                            ))}
                        </Picker>

                        <TouchableOpacity style={globals.botao} onPress={() => search("nome")}>
                            <Text style={globals.textoBotao}>Buscar</Text>
                        </TouchableOpacity>
                        
                    </View>
                </TouchableWithoutFeedback>

                <View style={style.areaResultado}>
                    {executado == true ? (
                        <View style={style.headerResultado}>
                            <Text style={[globals.textoGeral, style.textoLabel]}>Busca Realizada ({query})</Text>
                            <Text style={[globals.textoGeral, style.textoLabel]}>Total: {total}</Text>
                        </View>
                    ) : (<View></View>)}

                    {profissionais.map((profissional, indc) => (
                        <View style={[globals.backSecao, style.secao]}>

                            <Text style={[globals.textoGeral, style.textoSecao]}>
                                <Text style={globals.textoGeralBold}>Nome:</Text> {profissional.nome}
                            </Text>

                            <Text style={[globals.textoGeral, style.textoSecao]}>
                                <Text style={globals.textoGeralBold}>Descrição Pessoal:</Text> {profissional.descricao}
                            </Text>

                            <Text style={[globals.textoGeral, style.textoSecao]}>
                                <Text style={globals.textoGeralBold}>Endereço:</Text> {profissional.cidade}
                            </Text>

                            <Text style={[globals.textoGeral, style.textoSecao]}>
                                <Text style={globals.textoGeralBold}>Estado:</Text> {profissional.uf}
                            </Text>

                            <View style={style.areaLink}>
                                <TouchableOpacity style={style.botaoLink} onPress={() => detalhar(indc)}>
                                    <Feather name="file-plus" size={13} color={globals.textoGeral.color}></Feather>
                                    <Text style={[globals.textoGeral, style.textoLink]}>Recomendações do Profissional</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={style.areaLink}>
                                <TouchableOpacity style={style.botaoLink} onPress={() => recomendar(indc)}>
                                    <Feather name="star" size={13} color={globals.textoGeral.color}></Feather>
                                    <Text style={[globals.textoGeral, style.textoLink]}>Recomendar Profissional</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={style.areaContato}>
                                <TouchableOpacity style={style.botaoContato} onPress={() => sendMail(indc)}>
                                    <Feather name="mail" size={15} color={globals.textoBotao.color}></Feather>
                                    <Text style={[globals.textoBotao, style.textoBotaoContato]}>E-mail</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={style.botaoContato} onPress={() => sendZap(indc)}>
                                    <Feather name="message-circle" size={15} color={globals.textoBotao.color}></Feather>
                                    <Text style={[globals.textoBotao, style.textoBotaoContato]}>Whatsapp</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))}
                </View>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </KeyboardAvoidingView>
    );
}