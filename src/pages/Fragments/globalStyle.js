import { StyleSheet } from "react-native";

export default StyleSheet.create({

    body: {
        flex: 1
    },

    conteudo: {
        paddingHorizontal: 20,
        paddingTop: 25,
        backgroundColor: "#fff"
    },

    backSecao: {
        backgroundColor: "#c4c4c445"
    },

    textoGeral: {
        fontFamily: "Noto",
        color: "#333350"
    },

    textoGeralBold: {
        fontFamily: "NotoBold",
        color: "#333350"
    },
    
    spinnerTextStyle: {
        color: "#FFF"
    },

    input: {
        borderStyle: "solid",
        borderColor: "#333350",
        borderWidth: 1,
        paddingLeft: 2,
        paddingVertical: 2
    },

    botao: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#583881",
        marginTop: 15,
        borderRadius: 3
    },

    textoBotao: {
        color: "#fff",
        lineHeight: 35,
        fontFamily: "MontserratBold",
        fontSize: 15
    }

});