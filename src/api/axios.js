import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // Content-Type ni bu yerda o‘chiramiz — FormData uchun kerak emas
});

// ENG MUHIM INTERCEPTOR — FormData uchun
API.interceptors.request.use((config) => {
  // Agar FormData yuborilsa — Content-Type ni o‘chir
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
    // transformRequest ni buzmaslik uchun
    config.transformRequest = [data => data];
  }

  // Agar JWT token kerak bo‘lsa (keyinroq ishlatasiz)
  // const token = localStorage.getItem("token");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
});

export default API;