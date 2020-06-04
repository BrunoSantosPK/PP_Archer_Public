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
        fontSize: 15,
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
        marginLeft: 3,
        fontSize: 16
    },

    bodyModal: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22
    },

    contentModal: {
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

    areaBotaoModal: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    pdBotaoModal: {
        paddingHorizontal: 20
    },

    textoModal: {
        fontSize: 16
    }

});