import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";

import logo from "../../assets/logo.png";

export default function Header() {
    return (
        <View style={style.barra}>
            <Text style={style.titulo}>ARCHER</Text>

        </View>
    );
}

const style = new StyleSheet.create({
    barra: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        backgroundColor: "#583881",

    },
    titulo: {
        fontFamily: "RobotoBold",
        fontSize: 25,
        color: "#fafdfd"
    },
    imagem: {
        width: 40,
        height: 40
    }
});