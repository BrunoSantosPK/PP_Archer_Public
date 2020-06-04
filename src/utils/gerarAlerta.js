import { Alert } from "react-native"

export default function gerarAlerta(titulo, mensagem, callback = undefined) {
    if(callback == undefined) {
        callback = () => console.log("callback alerta");
    }

    Alert.alert(titulo, mensagem, [
        {
            text: "OK",
            style: "cancel",
            onPress: () => callback()
        }
    ]);
}