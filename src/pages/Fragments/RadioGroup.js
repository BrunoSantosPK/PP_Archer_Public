import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function RadioGroup({ options, values, index,  callback }) {
    // Define os parâmetros de criação
    const [opcoes, setOpcoes] = useState(options);
    const [valores, setValores] = useState(values);
    const [id, setId] = useState(index);
    const [selecionado, setSelecionado] = useState("");

    function selecionar(newValue) {
        setSelecionado(newValue);

        callback(id, newValue);
    }

    return (
        <View style={styles.radioGroup}>
            {opcoes.map((opcao, indc) => (
                <View style={styles.areaOpcao} key={indc}>
                    <TouchableOpacity
                        style={styles.radio}
                        onPress={() => selecionar(valores[indc])}
                    >
                        {selecionado == valores[indc] && <View style={styles.radioCheck} />}
                    </TouchableOpacity>
                    <Text style={styles.textoOpcao}>{opcao}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({

    radioGroup: {
        marginBottom: 15
    },

    areaOpcao: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 5
    },

    textoOpcao: {
        marginLeft: 8,
        fontFamily: "Noto",
        fontSize: 15
    },

    radio: {
        height: 25,
		width: 25,
		borderRadius: 13,
		borderWidth: 1,
		borderColor: "#ACACAC",
		alignItems: "center",
		justifyContent: "center",
    },

    radioCheck: {
        width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: "#2543a9",
    }

});