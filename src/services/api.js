import axios from "axios";

const api = axios.create({
    baseURL: "http://10.1.204.62:8765/",
    headers: {
        "Content-Type" : "application/json",
    },
});

export default api;