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

// Funções diversas
import Storage from "../../utils/storage";

export default function HomeProfissional() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();
    function move(local) {
        nav.navigate(local);
    }

    // Gerencia o texto de apresentação
    const [nome, setNome] = useState("");
    async function loadDadosPessoais() {
        setLoading(true);

        const dadosPessoais = await Storage.getDadosUsuarios();

        setNome(dadosPessoais.dados_pessoais.nome);
        setLoading(false);
    }

    // Faz o logoff
    async function logoff() {
        setLoading(true);

        await Storage.logoff();
        setLoading(false);

        nav.reset({
            index: 0,
            routes: [{ name: "Login" }]
        });
    }

    // Init
    useEffect(() => {
        loadDadosPessoais();
    }, []);

    return (
        <SafeAreaView style={globals.body}>

            <Header />

            <ScrollView style={globals.conteudo}>

                <Spinner
                    visible={loading} textContent={"Carregando..."} textStyle={globals.spinnerTextStyle}
                />

                <Text style={[globals.textoGeralBold, style.textoApresentacao]}>Bem-vindo(a) {nome}.</Text>

                <View style={style.areaMenu}>

                    <View style={style.linhaMenu}>
                        <View style={style.iconeMenu}>

                            <TouchableOpacity style={[globals.botao, style.botaoMenu]} onPress={() => move("GerenciarAreas")}>
                                <Feather name="layers" size={30} color={style.textoBotao.color}></Feather>
                                <Text style={[globals.textoBotao, style.textoBotao]}>Categorias</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={style.iconeMenu}>

                            <TouchableOpacity style={[globals.botao, style.botaoMenu]} onPress={() => move("PedidosProfissional")}>
                                <Feather name="tag" size={30} color={style.textoBotao.color}></Feather>
                                <Text style={[globals.textoBotao, style.textoBotao]}>Pedidos</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={style.linhaMenu}>
                        <View style={style.iconeMenu}>

                            <TouchableOpacity style={[globals.botao, style.botaoMenu]} onPress={() => move("RecomendacaoProfissional")}>
                                <Feather name="star" size={30} color={style.textoBotao.color}></Feather>
                                <Text style={[globals.textoBotao, style.textoBotao]}>Reputação</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={style.iconeMenu}>

                            <TouchableOpacity style={[globals.botao, style.botaoMenu]} onPress={() => move("AlterarSenha")}>
                                <Feather name="shield" size={30} color={style.textoBotao.color}></Feather>
                                <Text style={[globals.textoBotao, style.textoBotao]}>Segurança</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={style.linhaMenu}>
                        <View style={style.iconeMenu}>

                            <TouchableOpacity style={[globals.botao, style.botaoMenu]} onPress={logoff}>
                                <Feather name="log-out" size={30} color={style.textoBotao.color}></Feather>
                                <Text style={[globals.textoBotao, style.textoBotao]}>Sair</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    
                </View>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}