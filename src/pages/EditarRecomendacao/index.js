import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput, Picker } from "react-native";
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

// Funções diversas
import Storage from "../../utils/storage";
import gerarAlerta from "../../utils/gerarAlerta";

// Server
import api from "../../services/api";

export default function EditarRecomendacao() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Faz a alteração da senha
    async function salvar() {
        // Verifica o modo
        setLoading(true);
        let proc;
        if(modo == "novo") {
            proc = "recomendar_profissional";
        } else if(modo == "edicao") {
            proc = "atualizar_recomendacao";
        }

        // Recupera dados pessoais
        const dados = await Storage.getDadosUsuarios();
        const id_cliente = dados.dados_pessoais.id;

        try {
            // Estrutura do envio
            const post = { proc, id_cliente, classificacao, descricao, id_profissional: idProfissional }
            const res = await api.post("/cliente.php", post);

            if(res.data.sucesso) {
                const callback = () => {
                    nav.reset({
                        index: 0,
                        routes: [{ name: "HomeCliente" }]
                    });
                };
                gerarAlerta("Sucesso", "Dados atualizados no banco com sucesso.", callback);
            } else {
                gerarAlerta("Erro", res.data.log)
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifica a sua conectividade com a internet.");
        }
    }

    // Carrega dados iniciais
    const [modo, setModo] = useState("novo");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [classificacao, setClassificacao] = useState(5);
    const [idProfissional, setIdProfissional] = useState(0);

    async function init() {
        const dados = await Storage.getDadosRecomendacao();
        setNome(dados.nome);
        setModo(dados.modo);
        setDescricao(dados.descricao);
        setIdProfissional(dados.id_profissional);
        setClassificacao(dados.classificacao);
    }

    useEffect(() => {
        init()
    }, []);

    return (
        <KeyboardAvoidingView style={globals.body} behavior={Platform.Os == "ios" ? "padding" : "height"}>

            <Header />

            <ScrollView style={globals.conteudo}>

                <Spinner
                    visible={loading} textContent={"Carregando..."} textStyle={globals.spinnerTextStyle}
                />

                <View style={style.areaHeader}>
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Recomendar Profissional</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14} color={globals.textoGeral.color}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.areaFormulario}>
                        <Text style={[globals.textoGeral, style.textoLabel]}>Escreva algo sobre o profissional "{nome}"</Text>
                        <TextInput
                            value={descricao}
                            style={[globals.input, globals.textoGeral, style.textoLabel]}
                            onChangeText={text => setDescricao(text)}
                            multiline={true}
                        />

                        <Text style={[globals.textoGeral, style.textoLabel]}>Dê um classificação</Text>
                        <Picker style={globals.textoGeral} selectedValue={classificacao} onValueChange={value => setClassificacao(value)}>
                            <Picker.Item label={"5 Estrelas"} value={5} />
                            <Picker.Item label={"4 Estrelas"} value={4} />
                            <Picker.Item label={"3 Estrelas"} value={3} />
                            <Picker.Item label={"2 Estrelas"} value={2} />
                            <Picker.Item label={"1 Estrela"} value={1} />
                        </Picker>

                        <TouchableOpacity style={globals.botao} onPress={salvar}>
                            <Text style={globals.textoBotao}>Alterar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </KeyboardAvoidingView>
    );
}