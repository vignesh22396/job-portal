import axios from "axios";

const api = axios.create({
    baseURL: "https://job-portal-lezm.onrender.com/api",
});

export default api;