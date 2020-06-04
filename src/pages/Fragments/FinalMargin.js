import React from "react";
import { View, StyleSheet } from "react-native";

export default function FinalMargin() {
    return (
        <View style={style.final}></View>
    );
}

const style = StyleSheet.create({
    final: {
        paddingBottom: 90
    }
});