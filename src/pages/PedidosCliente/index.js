import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal } from "react-native";
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

export default function PedidosCliente() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const nav = useNavigation();

    // Gerencia os pedidos cadastrados
    const [pedidos, setPedidos] = useState([]);
    async function load() {
        setLoading(true);

        // Recupera informações iniciais
        const dados = await Storage.getDadosUsuarios();
        const id_cliente = dados.dados_pessoais.id;

        try {
            // Busca pedidos no banco
            const res = await api.post("/cliente.php", {
                proc: "listar_pedidos", id_cliente
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

    // Variáveis de estado para fechamento de pedido
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [id_pedido, setIdPedido] = useState(0);

    // Gerencia abertura e fechamento de modais
    function fecharPedido(indc) {
        setModalConfirmacao(true);
        setIdPedido(indc);
    }

    async function finalizar() {
        setLoading(true);
        setModalConfirmacao(false);

        try {
            // Envia confirmação para o banco
            const res = await api.post("/cliente.php", {
                proc: "fechar_pedido", id_pedido
            });

            if(res.data.sucesso) {
                load();
            } else {
                setLoading(false);
                gerarAlerta("Loading", res.data.log);
            }

        } catch(erro) {
            setLoading(false);
            gerarAlerta("Loading", "Erro de conexão, verifica a sua conectividade com a internet.");
        }
    }

    // Envia para tela de edição
    function editarPedido(indc) {
        nav.navigate("CriarPedido", {
            id_pedido: pedidos[indc].id_pedido,
            descricao: pedidos[indc].descricao,
            id_area: pedidos[indc].id_area
        });
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
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>Pedidos Registrados</Text>

                    <TouchableOpacity style={style.botaoVoltar} onPress={() => nav.goBack()}>
                        <Feather name="arrow-left" size={14} color={globals.textoGeral.color}></Feather>
                        <Text style={[globals.textoGeral, style.textoBotalVoltar]}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                {pedidos.map((item, indc) => (
                    <View style={[globals.backSecao, style.secao]} key={item.id_pedido}>
                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Descrição:</Text> {item.descricao}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Data Criação:</Text> {normData(item.data_criacao, "total")}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            <Text style={globals.textoGeralBold}>Área:</Text> {item.tag}
                        </Text>

                        <Text style={[globals.textoGeral, style.textoSecao]}>
                            {item.aberto == 1 ? (
                                <Text style={[globals.textoGeralBold, style.linkAberto]}>Aberto</Text>
                            ) : (
                                <Text style={globals.textoGeralBold}>Fechado</Text>
                            )}
                        </Text>

                        {item.aberto == 1 ? (
                            <View style={style.areaLink}>
                                <TouchableOpacity style={style.botaoLink} onPress={() => fecharPedido(item.id_pedido)}>
                                    <Feather name="folder-plus" size={13} color={style.linkAberto.color}></Feather>
                                    <Text style={[globals.textoGeral, style.textoLink, style.linkAberto]}>Fechar Pedido</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={style.botaoLink} onPress={() => editarPedido(indc)}>
                                    <Feather name="edit" size={13} color={globals.textoGeral.color}></Feather>
                                    <Text style={[globals.textoGeral, style.textoLink]}>Editar Pedido</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (<View></View>)}
                    </View>
                ))}

                <Modal animationType="slide" transparent={true} visible={modalConfirmacao} >
                    <View style={style.bodyModal}>
                        <View style={style.contentModal}>
                            <Text style={[globals.textoGeral, style.textoModal]}>Você deseja realmente fechar esta solicitação? Ao realizar isso, ela deixará de estar visível para os profissionais.</Text>

                            <View style={style.areaBotaoModal}>
                                <TouchableOpacity style={[globals.botao, style.pdBotaoModal]} onPress={() => setModalConfirmacao(false)}>
                                    <Text style={globals.textoBotao}>Não</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[globals.botao, style.pdBotaoModal]} onPress={finalizar}>
                                    <Text style={globals.textoBotao}>Sim</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}