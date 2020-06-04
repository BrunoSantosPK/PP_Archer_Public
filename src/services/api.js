import axios from "axios";

const api = axios.create({
    baseURL: "<API_privada>"
});

export default api;