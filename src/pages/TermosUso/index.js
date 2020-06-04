import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";

// Estilos
import globals from "../Fragments/globalStyle";
import style from "./style";

// Componentes personalizados
import Header from "../Fragments/Header";
import FinalMargin from "../Fragments/FinalMargin";
import AdMob from "../Fragments/AdMob";

export default function TermosUso() {

    // Gerencia o loading
    const [loading, setLoading] = useState(false);

    // Devine os termos de uso
    const termos = [
        "O Sistema Archer foi concebido para ser um facilitador, sobretudo em um período delicado do país. Esta aplicação foi proposta pelo Grupo Sieg de desenvolvimento de software, através do selo Kiel System.",

        "Como facilitador, Archer propõe centralizar profissionais liberais e clientes em um único ambiente, para que possam realizar suas transações.",

        "Archer é um sistema de uso gratuito, não sendo cobrada nenhuma espécie de taxa pelo cadastro do usuário profissional ou do usuário cliente. Também não é cobrada taxa para manutenção do usuário no banco de dados ou em visibilidade.",

        "Todavia, Archer é um sistema emergencial, lançado como uma forma de auxílio em meio a um período conturbado da história do país. Por isso, o servidor do Grupo Sieg, que foi direcionado para sustentar esta aplicação, ficará online até a data de 30/10/2020.",

        "Após a data limite, o Grupo Sieg apagará todos os dados relativos ao Sistema Archer, desativando-o por período indeterminado.",

        "Considerando o pequeno servidor alocado, Archer não realiza o processo de comunicação internamente. Todas as comunicações entre o usuário cliente e o usuário profissional são realizadas pelos meios informados pelos mesmos no cadastro, sendo eles e-mail e telefone (WhatsApp). Archer apenas facilita esse contato.",

        "Todo o acesso ao sistema é realizado por meio do e-mail informado no cadastro, sendo sua senha pessoal armazenada de forma segura e criptografada em nosso banco de dados. Suas informações pessoais, informadas no cadastro, são guardadas com toda a segurança disponível. Tais dados são utilizados apenas no momento de facilitar o contato, não estando visíveis levianamente na aplicação.",

        "Archer possui duas faces: uma para o usuário profissional e outra para o usuário cliente.",

        "O usuário profissional pode verificar solicitações criadas por usuários clientes e visualizar as recomendações enviadas por usuários clientes.",

        "O usuário cliente pode criar solicitações, atribuir recomendações a usuários profissionais e buscar usuários profissionais, para solicitar diretamente a realização de algum serviço.",

        "Vale lembrar que Archer apenas facilita o contato, não se responsabilizando por nada feito após isso e fora da plataforma. Os detalhes de cada serviço são combinados entre usuário cliente e usuário profissional, não sendo alvo de interesse para o sistema.",

        "É dever de todos os usuários, clientes e profissionais, manter comportamento ético e cordial nas interações fora da plataforma, mas que foram por ela facilitadas. Qualquer tipo de comportamento que viole a ética pode ser denunciado.",

        "O contato conosco é realizado exclusivamente pelo e-mail suportearcher@kielsystem.com.br. Evite usar a seção de comentários da loja de aplicativos, pois o gerente mobile é um agente externo, sem a atribuição de suporte.",

        "Este termo de uso pode ser atualizado. Quando for o caso, um e-mail com a atualização será enviado para todos os usuários cadastrados.",

        "Esperamos que Archer seja útil para todos os usuários e desejamos que períodos de glória surjam para todos."
    ]

    // Gerencia a navegação
    const nav = useNavigation();

    return (
        <SafeAreaView style={globals.body}>

            <Header />

            <ScrollView style={globals.conteudo}>

                <Spinner
                    visible={loading} textContent={"Carregando..."} textStyle={globals.spinnerTextStyle}
                />

                <Text style={[globals.textoGeral, style.textoAbertura]}>Leia com atenção os Termos de Uso. O cadastro no Sistema Archer implica a aceitação de todas as regras abaixo.</Text>

                <View style={[globals.backSecao, style.secao]}>
                    <Text style={[globals.textoGeralBold, style.textoTitulo]}>TERMOS DE USO</Text>
                    <Text style={[globals.textoGeralBold, style.textoSubtitulo]}>Sistema Archer</Text>
                    {termos.map((item, indc) => (
                        <Text style={[globals.textoGeral, style.textoItem]}>{indc + 1}. {item}</Text>
                    ))}

                    <View style={style.areaBotoes}>
                        <TouchableOpacity style={globals.botao} onPress={() => nav.navigate("Cadastro")}>
                            <Text style={[globals.textoBotao, style.textoBotao]}>Concordo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={globals.botao} onPress={() => nav.goBack()}>
                            <Text style={[globals.textoBotao, style.textoBotao]}>Não Concordo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}