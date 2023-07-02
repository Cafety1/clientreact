import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7249",
})

export default api;