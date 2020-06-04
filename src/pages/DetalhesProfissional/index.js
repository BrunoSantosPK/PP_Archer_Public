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

// Server
import api from "../../services/api";

export default function DetalhesProfissional() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Gerencia as recomendações recebidas
    const [recomendacoes, setRecomendacoes] = useState([]);
    async function load() {
        setLoading(true);

        // Recupera dados pessoais
        const dados = await Storage.getDadosDetalhes();
        const id_profissional = dados.id_profissional;

        try {
            // Busca no banco
            const res = await api.post("/profissional.php", {
                proc: "recomendacoes", id_profissional
            });

            if(res.data.sucesso) {
                setRecomendacoes(res.data.data);
            } else {
                gerarAlerta("Loading", res.data.log);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifique sua conectividade.");
        }
    }

    // Permite a atualização de recomendação
    async function atualizar(indc) {
        const dados = {
            modo: "edicao",
            nome: recomendacoes[indc].nome,
            descricao: recomendacoes[indc].descricao,
            id_profissional: recomendacoes[indc].id_profissional,
            classificacao: recomendacoes[indc].classificacao
        }
        await Storage.setDadosRecomendacao(dados);
        nav.navigate("EditarRecomendacao");
    }

    // Função de inicialização
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
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Detalhes</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                {recomendacoes.map((item, indc) => (
                    <View style={[globals.backSecao, style.secao]}>
                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Autor:</Text> {item.nome}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Recomendação:</Text> {item.descricao}
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