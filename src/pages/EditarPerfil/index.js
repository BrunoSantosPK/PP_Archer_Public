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
import gerarAlerta from "../../utils/gerarAlerta";
import Storage from "../../utils/storage";

// Service
import api from "../../services/api";

export default function EditarPerfil() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Constantes de configuração
    const [modo, setModo] = useState("novo");
    const [titulo, setTitulo] = useState("Novo Cadastro");
    const [labelDesc, setLabelDesc] = useState("Descrição pessoal (opcional)");

    // Gerencia o formulário
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUF] = useState("AC");
    const [descricao, setDescicao] = useState("");

    // Envia os dados para o banco
    async function salvar() {
        // Recupera dados pessoais
        setLoading(true);
        const dados = await Storage.getDadosUsuarios();
        const id_usuario = dados.id_usuario;

        // Define o body
        const post = { proc: "", id_usuario, nome, descricao, cidade, uf, telefone: parseInt(telefone) };

        // Altera a rota de acordo com a rota
        if(modo == "novo" && dados.tipo == "profissional") {
            post.proc = "criar_perfil_profissional";
        } else if(modo == "novo" && dados.tipo == "cliente") {
            post.proc = "criar_perfil_cliente";
        }

        try {
            // Envia requisição para o banco
            const res = await api.post("/usuarios.php", post);

            if(res.data.sucesso) {
                const callback = () => {
                    nav.reset({
                        index: 0,
                        routes: [{ name: "Login" }]
                    });
                };

                gerarAlerta("Sucesso", "Dados salvos no banco com sucesso", callback);
            } else {
                gerarAlerta("Erro", res.data.log);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Status Loading", "Erro de conexão, verifica a sua conectividade com a internet.");
        }
    }

    // Função para inicializar os dados
    async function init() {
        const dados = await Storage.getDadosUsuarios();

        // Busca as informações de edição
        if(dados.completo) {
            setModo("edicao");
            setTitulo("Atualizar Cadastro");
        }

        // Troca o label da descrição
        if(dados.tipo == "profissional") {
            setLabelDesc("Descrição profissional (sobre sua atuação)");
        }
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
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.areaFormulario}>

                    <Text style={[globals.textoGeral, style.textoLabel]}>Nome Completo</Text>
                    <TextInput
                        value={nome}
                        style={[globals.input, globals.textoGeral, style.textoFormulario]}
                        onChangeText={text => setNome(text)}
                    />

                    <Text style={[globals.textoGeral, style.textoLabel]}>Telefone Celular com DDD (apenas números)</Text>
                    <TextInput
                        value={telefone}
                        style={[globals.input, globals.textoGeral, style.textoFormulario]}
                        onChangeText={text => setTelefone(text)}
                        keyboardType="phone-pad"
                    />

                    <Text style={[globals.textoGeral, style.textoLabel]}>Informe seu endereço com a cidade</Text>
                    <TextInput
                        value={cidade}
                        style={[globals.input, globals.textoGeral, style.textoFormulario]}
                        onChangeText={text => setCidade(text)}
                    />

                    <Text style={[globals.textoGeral, style.textoLabel]}>Selecione seu estado</Text>
                    <Picker selectedValue={uf} onValueChange={value => setUF(value)}>
                        <Picker.Item label={"Acre"} value={"AC"} />
                        <Picker.Item label={"Alagoas"} value={"AL"} />
                        <Picker.Item label={"Amapá"} value={"AP"} />
                        <Picker.Item label={"Amazonas"} value={"AM"} />
                        <Picker.Item label={"Bahia"} value={"BA"} />
                        <Picker.Item label={"Ceará"} value={"CE"} />
                        <Picker.Item label={"Distrito Federal"} value={"DF"} />
                        <Picker.Item label={"Espírito Santo"} value={"ES"} />
                        <Picker.Item label={"Goiás"} value={"GO"} />
                        <Picker.Item label={"Maranhão"} value={"MA"} />
                        <Picker.Item label={"Mato Grosso"} value={"MT"} />
                        <Picker.Item label={"Mato Grosso do Sul"} value={"MS"} />
                        <Picker.Item label={"Minas Gerais"} value={"MG"} />
                        <Picker.Item label={"Pará"} value={"PA"} />
                        <Picker.Item label={"Paraíba"} value={"PB"} />
                        <Picker.Item label={"Paraná"} value={"PR"} />
                        <Picker.Item label={"Pernambuco"} value={"PE"} />
                        <Picker.Item label={"Piauí"} value={"PI"} />
                        <Picker.Item label={"Rio de Janeiro"} value={"RJ"} />
                        <Picker.Item label={"Rio Grande do Norte"} value={"RN"} />
                        <Picker.Item label={"Rio Grande do Sul"} value={"RS"} />
                        <Picker.Item label={"Rondônia"} value={"RO"} />
                        <Picker.Item label={"Roraima"} value={"RR"} />
                        <Picker.Item label={"Santa Catarina"} value={"SC"} />
                        <Picker.Item label={"São Paulo"} value={"SP"} />
                        <Picker.Item label={"Sergipe"} value={"SE"} />
                        <Picker.Item label={"Tocantins"} value={"TO"} />
                    </Picker>

                    <Text style={[globals.textoGeral, style.textoLabel]}>{labelDesc}</Text>
                    <TextInput
                        value={descricao}
                        style={[globals.input, globals.textoGeral, style.textoFormulario]}
                        onChangeText={text => setDescicao(text)}
                        multiline={true}
                    />

                    <TouchableOpacity style={globals.botao} onPress={salvar}>
                        <Text style={globals.textoBotao}>Salvar</Text>
                    </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </KeyboardAvoidingView>
    );
}