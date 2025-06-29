import axios from "axios";

const api = axios.create({
    baseURL: "http:/192.168.0.12:8765/",
    headers: {
        "Content-Type" : "application/json",
    },
});

export default api;