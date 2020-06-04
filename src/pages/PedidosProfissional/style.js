import { StyleSheet } from "react-native";

export default StyleSheet.create({

    textoTitulo: {
        fontSize: 18
    },

    areaHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderColor: "#333350"
    },

    botaoVoltar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    textoBotalVoltar: {
        marginLeft: 3
    },

    secao: {
        borderRadius: 8,
        marginTop: 15,
        paddingHorizontal: 5,
        paddingVertical: 10
    },

    textoSecao: {
        fontSize: 16,
        marginBottom: 5
    },

    areaContato: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
        marginBottom: 5
    },

    botaoContato: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#4a359c",
        paddingHorizontal: 10
    },

    textoBotaoContato: {
        marginLeft: 5
    },

    areaSelect: {
        marginTop: 20
    },

    textoLabel: {
        fontSize: 16,
        marginBottom: -10
    }

});