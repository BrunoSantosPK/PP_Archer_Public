import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput } from "react-native";
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

export default function AlterarSenha() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Gerencia as senhas
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [repSenha, setRepSenha] = useState("");

    // Faz a alteração da senha
    async function salvar() {
        // Verifica se as novas senhas são iguais
        if(novaSenha != repSenha) {
            gerarAlerta("Erro", "As novas senhas não são iguais, por favor verifique");
            return;
        }

        // Recupera informações pessoais
        setLoading(true);
        const dados = await Storage.getDadosUsuarios();
        const id_usuario = dados.id_usuario;

        try {
            // Faz a alteração no banco
            const res = await api.post("/usuarios.php", {
                proc: "alterar_senha",
                senha_atual: senhaAtual,
                senha_nova: novaSenha,
                id_usuario
            });

            if(res.data.sucesso) {
                // Altera as informações de login
                const login = await Storage.getDadosLogin();
                login.senha = novaSenha;
                await Storage.setDadosLogin(login);

                // Limpa os inputs
                setSenhaAtual("");
                setNovaSenha("");
                setRepSenha("");

                // Informa o sucesso da operação
                gerarAlerta("Sucesso", "Senha alterada com sucesso.");
            } else {
                gerarAlerta("Erro", res.data.log);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifica a sua conectividade com a internet.");
        }
    }

    return (
        <KeyboardAvoidingView style={globals.body} behavior={Platform.Os == "ios" ? "padding" : "height"}>

            <Header />

            <ScrollView style={globals.conteudo}>

                <Spinner
                    visible={loading} textContent={"Carregando..."} textStyle={globals.spinnerTextStyle}
                />

                <View style={style.areaHeader}>
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Atlerar Senha</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14} color={globals.textoGeral.color}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.areaFormulario}>
                        <Text style={[globals.textoGeral, style.textoLabel]}>Digite a senha atual</Text>
                        <TextInput
                            value={senhaAtual}
                            style={[globals.input, globals.textoGeral, style.textoLabel]}
                            onChangeText={text => setSenhaAtual(text)}
                            secureTextEntry={true}
                        />

                        <Text style={[globals.textoGeral, style.textoLabel]}>Digite a nova senha</Text>
                        <TextInput
                            value={novaSenha}
                            style={[globals.input, globals.textoGeral, style.textoLabel]}
                            onChangeText={text => setNovaSenha(text)}
                            secureTextEntry={true}
                        />

                        <Text style={[globals.textoGeral, style.textoLabel]}>Repita a nova senha</Text>
                        <TextInput
                            value={repSenha}
                            style={[globals.input, globals.textoGeral, style.textoLabel]}
                            onChangeText={text => setRepSenha(text)}
                            secureTextEntry={true}
                        />

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