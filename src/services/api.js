import axios from "axios";

const api = axios.create({
    baseURL: "http:/10.0.0.107:8765/",
    headers: {
        "Content-Type" : "application/json",
    },
});

export default api;