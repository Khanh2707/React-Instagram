import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/",
});

// Thiết lập interceptor để tự động thêm bearer token vào mỗi yêu cầu
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.requireToken !== false) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

let urlNotRefreshToken = [
  "api/accounts",
  "auth/token",
  "auth/introspect",
  "auth/logout",
  "auth/refreshToken",
  "api/users",
  "api/verify_email",
];

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !urlNotRefreshToken.some((url) => originalRequest.url.startsWith(url))
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(http(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentToken = localStorage.getItem("token");
        localStorage.removeItem("token"); // Xóa token hiện tại

        const refreshTokenResponse = await http.post("/auth/refreshToken", {
          token: currentToken,
        });
        const newToken = refreshTokenResponse.data.result.token;
        localStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        refreshSubscribers.forEach((callback) => callback(newToken));
        refreshSubscribers = [];

        return http(originalRequest);
      } catch (refreshError) {
        // Xử lý lỗi khi gọi refreshToken
        console.error("Error refreshing token:", refreshError);
        // Đăng xuất hoặc xử lý khác tùy thuộc vào yêu cầu
        // Ví dụ: đăng xuất người dùng
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const get = async (endpoint, params = {}, requireToken = true) => {
  const response = await http.get(endpoint, { params, requireToken });
  return response.data;
};

export const post = async (
  endpoint,
  body = {},
  params = {},
  requireToken = true
) => {
  const response = await http.post(endpoint, body, { params, requireToken });
  return response.data;
};

export const put = async (
  endpoint,
  body = {},
  params = {},
  requireToken = true
) => {
  const response = await http.put(endpoint, body, { params, requireToken });
  return response.data;
};

export const del = async (endpoint, params = {}, requireToken = true) => {
  const response = await http.delete(endpoint, { params, requireToken });
  return response.data;
};

export default http;
