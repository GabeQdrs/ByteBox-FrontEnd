import axios from "axios";

const api = axios.create({
    baseURL: "http:/172.26.144.1:8765/",
    headers: {
        "Content-Type" : "application/json",
    },
});

export default api;