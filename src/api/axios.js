import axios from "axios";

const API_URL = "https://api.temurbekreyimberdiev.uz/api/";

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor — JWT token qo‘shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access"); // access token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Agar FormData bo‘lsa Content-Type ni o‘chir
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
    config.transformRequest = [data => data];
  }

  return config;
});

export default api;
