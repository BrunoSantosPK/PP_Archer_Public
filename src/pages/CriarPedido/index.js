import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Picker, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

// Estilos
import globals from "../Fragments/globalStyle";
import style from "./style";

// Componentes personalizados
import Header from "../Fragments/Header";
import FinalMargin from "../Fragments/FinalMargin";
import AdMob from "../Fragments/AdMob";

// Funções diversas
import Storage from "../../utils/storage";
import gerarAlerta from "../../utils/gerarAlerta";

// Server
import api from "../../services/api";

export default function CriarPedido() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();
    const route = useRoute();

    // Variáveis para header
    const [titulo, setTitulo] = useState("Nova Solicitação");
    const [idPedido, setIdPedido] = useState(0);

    // Gerencia as áreas
    const [selectArea, setSelectArea] = useState(1);
    const [areas, setAreas] = useState([]);
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

    // Gerencia a descrição
    const [descricao, setDescricao] = useState("");

    // Salva novo pedido no banco
    async function salvar() {
        setLoading(true);

        // Recupera informações pessoais
        const dados = await Storage.getDadosUsuarios();
        const id_cliente = dados.dados_pessoais.id;
        let post = { proc: "criar_pedido", id_cliente, descricao, id_area: selectArea };

        // Verifica se o caso é de atualização
        if(idPedido != 0) {
            post = { proc: "alterar_pedido", id_pedido: idPedido, descricao, id_area: selectArea };
        }

        try {
            // Envia dados para o banco
            const res = await api.post("/cliente.php", post);

            if(res.data.sucesso) {
                const callback = () => {
                    nav.reset({
                        index: 0,
                        routes: [{ name: "HomeCliente" }]
                    });
                };

                gerarAlerta("Sucesso", "O pedido foi enviado para o sistema, aguarde o contato de algum profissional ou gerencie suas solicitações na área de Gerenciar Pedidos.", callback);
                setDescricao("");
            } else {
                gerarAlerta("Erro", res.data.log);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifica a sua conectividade com a internet.");
        }
    }

    // Função de inicialização
    function init() {
        if(route.params != undefined) {
            setTitulo("Editar Pedido");
            setDescricao(route.params.descricao);
            setSelectArea(route.params.id_area);
            setIdPedido(route.params.id_pedido);
        }
        loadAreas();
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
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>{titulo}</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14} color={globals.textoGeral.color}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.areaFormulario}>
                        <Text style={[globals.textoGeralBold, style.textoLabel]}>Escolha uma área de especialização</Text>
                        <Picker
                            selectedValue={selectArea}
                            onValueChange={value => setSelectArea(value)}
                            style={globals.textoGeral}
                        >
                            {areas.map(item => (
                                <Picker.Item label={item.tag} value={item.id_area} />
                            ))}
                        </Picker>

                        <Text style={[globals.textoGeralBold, style.textoLabel]}>Descreva o que você precisa nesse pedido em específico</Text>
                        <TextInput
                            value={descricao}
                            style={[globals.input, globals.textoGeral, style.textoLabel]}
                            onChangeText={text => setDescricao(text)}
                            multiline={true}
                        />

                    <TouchableOpacity style={globals.botao} onPress={salvar}>
                        <Text style={[globals.textoBotao]}>Salvar</Text>
                    </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </KeyboardAvoidingView>
    );
}