import axios from "axios";

const api = axios.create({
    baseURL: "http:/192.168.18.79:8765/",
    headers: {
        "Content-Type" : "application/json",
    },
});

export default api;