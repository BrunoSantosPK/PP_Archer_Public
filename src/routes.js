import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EditarPerfil from "./pages/EditarPerfil";
import HomeCliente from "./pages/HomeCliente";
import HomeProfissional from "./pages/HomeProfissional";
import GerenciarAreas from "./pages/GerenciarAreas";
import FeedbackProfissional from "./pages/FeedbackProfissional";
import PedidosProfissional from "./pages/PedidosProfissional";
import PedidosCliente from "./pages/PedidosCliente";
import RecomendacaoProfissional from "./pages/RecomendacaoProfissional";
import CriarPedido from "./pages/CriarPedido";
import BuscarProfissionais from "./pages/BuscarProfissionais";
import AlterarSenha from "./pages/AlterarSenha";
import RecomendacaoCliente from "./pages/RecomendacaoCliente";
import EditarRecomendacao from "./pages/EditarRecomendacao";
import DetalhesProfissional from "./pages/DetalhesProfissional";
import TermosUso from "./pages/TermosUso";

export default function Routes() {

    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
                <AppStack.Screen name="EditarPerfil" component={EditarPerfil} />
                <AppStack.Screen name="HomeCliente" component={HomeCliente} />
                <AppStack.Screen name="HomeProfissional" component={HomeProfissional} />
                <AppStack.Screen name="GerenciarAreas" component={GerenciarAreas} />
                <AppStack.Screen name="FeedbackProfissional" component={FeedbackProfissional} />
                <AppStack.Screen name="PedidosProfissional" component={PedidosProfissional} />
                <AppStack.Screen name="PedidosCliente" component={PedidosCliente} />
                <AppStack.Screen name="RecomendacaoProfissional" component={RecomendacaoProfissional} />
                <AppStack.Screen name="CriarPedido" component={CriarPedido} />
                <AppStack.Screen name="BuscarProfissionais" component={BuscarProfissionais} />
                <AppStack.Screen name="AlterarSenha" component={AlterarSenha} />
                <AppStack.Screen name="RecomendacaoCliente" component={RecomendacaoCliente} />
                <AppStack.Screen name="EditarRecomendacao" component={EditarRecomendacao} />
                <AppStack.Screen name="DetalhesProfissional" component={DetalhesProfissional} />
                <AppStack.Screen name="TermosUso" component={TermosUso} />
            </AppStack.Navigator>
        </NavigationContainer>
    );

}