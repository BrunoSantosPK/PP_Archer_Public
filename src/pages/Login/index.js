import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
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
import gerarAlerta from "../../utils/gerarAlerta";
import Storage from "../../utils/storage";

// Service
import api from "../../services/api";

export default function Login() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Gerencia senha e email
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Verifica se não foi realizado logoff
    async function init() {
        setLoading(true);

        // Busca dados de login
        const dados = await Storage.getDadosLogin();
        if(dados != null) {
            setEmail(dados.email);
            setSenha(dados.senha);
            login(dados.email, dados.senha);
        } else {
            setLoading(false);
        }
    }

    // Gerencia o login
    async function login() {
        setLoading(true);

        try {
            // Salva dados de login
            const dadosLogin = { email, senha };

            const args = arguments;
            if(args.length == 2) {
                dadosLogin.email = args[0];
                dadosLogin.senha = args[1];
            }

            const res = await api.post("/usuarios.php", {
                proc: "login",
                email: dadosLogin.email, senha: dadosLogin.senha
            });

            if(res.data.sucesso) {
                // Salva informações do usuario
                const dadosUsuario = {
                    tipo: res.data.data.tipo,
                    email: res.data.data.email,
                    id_usuario: res.data.data.id_usuario,
                    dados_pessoais: res.data.data.dados_pessoais,
                    completo: res.data.completo
                };
                await Storage.setDadosUsuarios(dadosUsuario);
                await Storage.setDadosLogin(dadosLogin);

                if(!res.data.completo) {
                    // Se o cadastro não estiver completo, envia para edição de perfil
                    nav.reset({
                        index: 0,
                        routes: [{ name: "EditarPerfil" }]
                    });
                } else {
                    // Envia para a tela de perfil
                    const home = (res.data.data.tipo == "profissional") ? "HomeProfissional" : "HomeCliente";

                    nav.reset({
                        index: 0,
                        routes: [{ name: home }]
                    });
                }

                setLoading(false);
            } else {
                gerarAlerta("Status de Login", res.data.log);
                setLoading(false);
            }
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Status de Login", "Um erro de conexão ocorreu, verifica seu acesso a internet.");
        }
    }

    // Recuperar senha
    async function recuperarSenha() {
        setLoading(true);
        try {
            // Envia solicitação para o banco
            const res = await api.post("/usuarios.php", {
                proc: "recuperar_senha", email
            });

            if(res.data.sucesso) {
                gerarAlerta("Sucesso", "Sua nova senha será enviada para o e-mail informado. Assim que realizar o login, troque-a.")
            } else {
                gerarAlerta("Erro", res.data.log);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Status de Login", "Um erro de conexão ocorreu, verifica seu acesso a internet.");
        }
    }

    // Inicia o processo de cadastro de novo usuário
    function cadastrar() {
        nav.navigate("TermosUso");
    }

    // Função de inicialização da página
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

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[globals.backSecao, style.secao]}>
                        
                        <TextInput
                            value={email}
                            style={[style.input, globals.textoGeral, style.textoFormulario]}
                            onChangeText={text => setEmail(text)}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            placeholder="E-mail"
                        />

                        <TextInput
                            value={senha}
                            style={[style.input, globals.textoGeral, style.textoFormulario]}
                            onChangeText={text => setSenha(text)}
                            secureTextEntry={true}
                            placeholder="Senha"
                        />

                        <TouchableOpacity style={style.botaoPrincipal} onPress={login}>
                            <View style={style.efeito3D}>
                                <Text style={globals.textoBotao}>ENTRAR</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={style.areaCadastrar}>
                            <TouchableOpacity onPress={recuperarSenha}>
                                <Text style={[globals.textoGeral, style.link]}>Recuperar senha</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={cadastrar}>
                                <Text style={[globals.textoGeral, style.link]}>Novo por aqui?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </TouchableWithoutFeedback>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </KeyboardAvoidingView>
    );
}