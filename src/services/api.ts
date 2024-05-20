import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Base URL for the Flask API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
