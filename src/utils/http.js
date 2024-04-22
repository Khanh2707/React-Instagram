import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/'
});

// Thiết lập interceptor để tự động thêm bearer token vào mỗi yêu cầu
http.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token && config.requireToken !== false) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const get = async (endpoint, params = {}, requireToken = true) => {
    const response = await http.get(endpoint, { params, requireToken });
    return response.data;
}

export const post = async (endpoint, body = {}, params = {}, requireToken = true) => {
    const response = await http.post(endpoint, body, { params, requireToken });
    return response.data;
}

export default http;
