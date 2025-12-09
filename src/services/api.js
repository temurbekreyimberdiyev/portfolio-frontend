import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://api.temurbekreyimberdiev.uz/api/";

// Axios instans
const api = axios.create({
  baseURL: API_URL,
  // Content-Type ni o‘chirib yuborish FormData uchun keyinroq mumkin
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request interceptor — JWT token qo‘shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access"); // access token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Agar FormData yuborilsa
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
    config.transformRequest = [data => data];
  }

  return config;
});

// ----------------------------
// 🔸 API FUNKSIYALAR
// ----------------------------
export const getHero = () => api.get("hero/");
export const getSkills = () => api.get("skills/");
export const getProjects = () => api.get("projects/");
export const getExperiences = () => api.get("experiences/");
export const getContacts = () => api.get("contacts/");
export const getSocialLinks = () => api.get("social/");
export const sendMessage = (data) => api.post("messages/", data);

// ----------------------------
// 🔹 AUTH FUNKSIYALAR
// ----------------------------
export const login = async (username, password) => {
  const response = await api.post("token/", { username, password });
  const { access, refresh } = response.data;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  return response.data;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;
  const response = await api.post("token/refresh/", { refresh });
  const { access } = response.data;
  localStorage.setItem("access", access);
  return access;
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export default api;
