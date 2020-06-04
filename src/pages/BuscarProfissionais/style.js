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

    areaBusca: {
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: "#333350",
        paddingBottom: 15,
        marginTop: 30
    },

    textoLabel: {
        fontSize: 15
    },

    areaResultado: {
        marginTop: 20
    },

    headerResultado: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
        marginLeft: 5,
        color: "#fff"
    },

    areaLink: {
        marginBottom: 10
    },

    botaoLink: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row"
    },

    textoLink: {
        marginLeft: 3
    }

});