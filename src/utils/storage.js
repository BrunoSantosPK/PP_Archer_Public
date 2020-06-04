import { AsyncStorage } from "react-native";

export default class Store {

    static async setDadosUsuarios(data) {
        try {
            await AsyncStorage.setItem("dadosUsuarios", JSON.stringify(data));
            return true;
        } catch(erro) {
            return false;
        }
    }

    /**
     * O null consegue filtrar.
     */
    static async getDadosUsuarios() {
        try {
            let res = await AsyncStorage.getItem("dadosUsuarios");
            res = JSON.parse(res);
            return res;
        } catch(erro) {
            return false;
        }
    }

    static async setDadosLogin(data) {
        try {
            await AsyncStorage.setItem("dadosLogin", JSON.stringify(data));
            return true;
        } catch(erro) {
            return false;
        }
    }

    /**
     * O null consegue filtrar.
     */
    static async getDadosLogin() {
        try {
            let res = await AsyncStorage.getItem("dadosLogin");
            res = JSON.parse(res);
            return res;
        } catch(erro) {
            return false;
        }
    }

    static async logoff() {
        try {
            await AsyncStorage.removeItem("dadosLogin");
            await AsyncStorage.removeItem("dadosUsuarios");
            return true;
        } catch(erro) {
            return false;
        }
    }

    static async setDadosRecomendacao(data) {
        try {
            await AsyncStorage.setItem("dadosRecomendacao", JSON.stringify(data));
            return true;
        } catch(erro) {
            return false;
        }
    }

    static async getDadosRecomendacao() {
        try {
            let res = await AsyncStorage.getItem("dadosRecomendacao");
            res = JSON.parse(res);
            return res;
        } catch(erro) {
            return false;
        }
    }

    static async setDadosDetalhes(data) {
        try {
            await AsyncStorage.setItem("dadosDetalhes", JSON.stringify(data));
            return true;
        } catch(erro) {
            return false;
        }
    }

    static async getDadosDetalhes() {
        try {
            let res = await AsyncStorage.getItem("dadosDetalhes");
            res = JSON.parse(res);
            return res;
        } catch(erro) {
            return false;
        }
    }

}