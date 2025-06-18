import axios from "axios";

const api = axios.create({
    baseURL: "http://10.1.200.88:8765/",
    headers: {
        "Content-Type" : "application/json",
    },
});

export default api;