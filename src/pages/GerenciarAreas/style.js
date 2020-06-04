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

    areaSubTitulo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
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
        marginBottom: 5,
        color: "#000"
    },

    botaoExcluir: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 5
    },

    textoBotalExcluir: {
        marginLeft: 3,
        color: "#bc341b"
    },

    corpoModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    conteudoModal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    textoModal: {
        fontSize: 17
    },

    areaBotoesModal: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },

    botao: {
        paddingHorizontal: 20
    },

    itemFormulario: {
        marginTop: 20
    },

    select: {
        margin: 0
    },

    textoLabel: {
        fontSize: 16
    }

});