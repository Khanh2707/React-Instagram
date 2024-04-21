import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/'
});

export const get = async (endpoint, params = {}) => {
    const response = await http.get(endpoint, params);
    return response.data;
}

export const post = async (endpoint, body = {}, params = {}) => {
    const response = await http.post(endpoint, body, params);
    return response.data;
}

export default http;