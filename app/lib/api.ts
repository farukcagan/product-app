import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        return Promise.reject(message);
    }
);

export default api;
