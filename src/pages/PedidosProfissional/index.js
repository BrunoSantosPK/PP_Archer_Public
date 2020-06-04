import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking, Picker } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from 'expo-mail-composer';

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

export default function PedidosProfissional() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Define os estados
    const [selectUF, setSelectUF] = useState("");
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

    // Envia e-mail para conversar sobre o pedido
    function sendMail(indc) {
        MailComposer.composeAsync({
            subject: `Sobre o pedido de ${pedidos[indc].tag} cadastrado no Archer`,
            recipients: [pedidos[indc].email],
            body: `Olá ${pedidos[indc].nome}, como vai? Entro em contato para conversar sobre o pedido de ${pedidos[indc].tag} que você cadastrou no Sistema Archer. Sou profissional da área e consigo realizar a sua demanda. Poderíamos conversar melhor? Desde já, agradeço a atenção.`
        });
    }

    // Entra em contato via WhatsApp
    function sendZap(indc) {
        const mensagem = `Olá ${pedidos[indc].nome}, como vai? Entro em contato para conversar sobre o pedido de ${pedidos[indc].tag} que você cadastrou no Sistema Archer. Sou profissional da área e consigo realizar a sua demanda. Poderíamos conversar melhor? Desde já, agradeço a atenção.`

        Linking.openURL(`whatsapp://send?phone=55${pedidos[indc].telefone}&text=${mensagem}`);
    }


    // Gerencia os pedidos disponíveis
    const [pedidos, setPedidos] = useState([]);
    async function load(uf) {
        setLoading(true);
        setSelectUF(uf);

        // Recupera informações pessoais
        const dados = await Storage.getDadosUsuarios();
        const id_profissional = dados.dados_pessoais.id;

        try {
            // Faz a busca no banco
            const res = await api.post("/profissional.php", {
                proc: "pedidos_disponiveis", id_profissional, uf
            });

            if(res.data.sucesso) {
                setPedidos(res.data.data);
            } else {
                gerarAlerta("Loading", res.data.log);
            }

            setLoading(false);
        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifica a sua conectividade com a internet.");
        }
    }

    // Função init
    useEffect(() => {
        load("");
    }, []);

    return (
        <SafeAreaView style={globals.body}>

            <Header />

            <ScrollView style={globals.conteudo}>

                <Spinner
                    visible={loading} textContent={"Carregando..."} textStyle={globals.spinnerTextStyle}
                />

                <View style={style.areaHeader}>
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Pedidos Abertos</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14} color={globals.textoGeral.color}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.areaSelect}>
                    <Text style={[globals.textoGeral, style.textoLabel]}>Filtrar por UF</Text>
                    <Picker
                        style={globals.textoGeral}
                        selectedValue={selectUF}
                        onValueChange={value => load(value)}>
                        {estados.map(estado => (
                            <Picker.Item label={estado.label} value={estado.sigla} />
                        ))}
                    </Picker>
                </View>

                {pedidos.map((item, indc) => (
                    <View style={[globals.backSecao, style.secao]} key={item.id_pedido}>
                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Solicitante:</Text> {item.nome}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Descrição:</Text> {item.descricao}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Área:</Text> {item.tag}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Criada em: </Text>
                            {normData(item.data_criacao, "total")}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Endereço:</Text> {item.cidade}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Estado:</Text> {item.uf}
                        </Text>

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

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}