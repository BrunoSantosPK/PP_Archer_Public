import React, { useState } from "react";
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
import gerarAlerta from "../../utils/gerarAlerta";
import Storage from "../../utils/storage";

// Service
import api from "../../services/api";

export default function Cadastro() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Gerencia informações informadas
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [repSenha, setRepSenha] = useState("");
    const [tipo, setTipo] = useState(1);

    async function cadastrar() {
        // Verifica igualdade das senhas
        if(senha != repSenha) {
            gerarAlerta("Erro", "As senhas informadas são diferentes uma da outra, por favor verifique e tente novamente.");
            return;
        }

        setLoading(true);
        try {
            // Envia solicitação para o banco
            const res = await api.post("/usuarios.php", {
                proc: "novo_usuario", senha, email, tipo
            });

            if(!res.data.sucesso) {
                gerarAlerta("Erro", res.data.log);
            } else {
                // Salva dados de login no storage
                const dadosLogin = { email, senha };
                await Storage.setDadosLogin(dadosLogin);

                // Envia para a tela de login
                const callback = () => {
                    nav.reset({
                        index: 0,
                        routes: [{ name: "Login" }]
                    });
                };
                gerarAlerta("Sucesso", "Cadastro de usuário realizado com sucesso.", callback);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Status Loading", "Erro de conexão, verifica a sua conectividade com a internet.")
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
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Novo Cadastro</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.areaFormulario}>
                        <Text style={[globals.textoGeral, style.textoLabel]}>Informe um e-mail</Text>
                        <TextInput
                            value={email}
                            style={[globals.input, globals.textoGeral, style.textoFormulario]}
                            onChangeText={text => setEmail(text)}
                            autoCompleteType="email"
                            keyboardType="email-address"
                        />

                        <Text style={[globals.textoGeral, style.textoLabel]}>Defina sua senha</Text>
                        <TextInput
                            value={senha}
                            style={[globals.input, globals.textoGeral, style.textoFormulario]}
                            onChangeText={text => setSenha(text)}
                            secureTextEntry={true}
                        />

                        <Text style={[globals.textoGeral, style.textoLabel]}>Digite a senha novamente</Text>
                        <TextInput
                            value={repSenha}
                            style={[globals.input, globals.textoGeral, style.textoFormulario]}
                            onChangeText={text => setRepSenha(text)}
                            secureTextEntry={true}
                        />

                        <Text style={[globals.textoGeral, style.textoLabel]}>Escolha o tipo de usuário</Text>
                        <Picker style={globals.textoGeral} selectedValue={tipo} onValueChange={value => setTipo(value)}>
                            <Picker.Item label={"Usuário Cliente"} value={1} />
                            <Picker.Item label={"Usuário Profissional"} value={2} />
                        </Picker>

                        <TouchableOpacity style={globals.botao} onPress={cadastrar}>
                            <Text style={globals.textoBotao}>Criar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </KeyboardAvoidingView>
    );
}