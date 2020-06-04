import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
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
import normData from "../../utils/normData";

// Server
import api from "../../services/api";

export default function FeedbackProfissional() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Feedbacks informados
    const [feedbacks, setFeedbacks] = useState([]);

    // Carrega os fedbacks
    async function load() {
        setLoading(true);

        // Busca dados pessoais
        const dados = await Storage.getDadosUsuarios();
        const id_profissional = dados.dados_pessoais.id;

        try {
            const res = await api.post("/profissional.php", {
                proc: "feedbacks_recebidos", id_profissional
            });

            if(res.data.sucesso) {
                setFeedbacks(res.data.data);
            } else {
                gerarAlerta("Loading", res.data.log);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifique a sua conectividade.")
        }
    }

    // Inicialização
    useEffect(() => {
        load();
    }, []);

    return (
        <SafeAreaView style={globals.body}>

            <Header />

            <ScrollView style={globals.conteudo}>

                <Spinner
                    visible={loading} textContent={"Carregando..."} textStyle={globals.spinnerTextStyle}
                />

                <View style={style.areaHeader}>
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Feedback Recebidos</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                {feedbacks.map(item => (
                    <View style={[style.secao, globals.backSecao]}>
                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Autor:</Text> {item.nome}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Data Criação:</Text> {normData(item.data_criacao)}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Descrição:</Text> {item.descricao}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Área:</Text> {item.tag}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Classificação: </Text>
                            {item.classificacao} <Feather name="star" size={14}></Feather>
                        </Text>
                    </View>
                ))}

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}