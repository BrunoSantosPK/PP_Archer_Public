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
    
    linkAberto: {
        color: "#bc341b"
    },

    areaLink: {
        marginTop: 10
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