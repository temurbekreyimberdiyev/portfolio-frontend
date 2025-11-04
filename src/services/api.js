import axios from "axios";

// 🔹 Backend manzili (localhost yoki production)
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";


// 🔹 Axios instans (asosiy sozlama)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------------
// 🔸 1. HERO SECTION
// ----------------------------
export const getHero = () => api.get("hero/");

// ----------------------------
// 🔸 2. SKILLS
// ----------------------------
export const getSkills = () => api.get("skills/");

// ----------------------------
// 🔸 3. PROJECTS
// ----------------------------
export const getProjects = () => api.get("projects/");

// ----------------------------
// 🔸 4. EXPERIENCES
// ----------------------------
export const getExperiences = () => api.get("experiences/");

// ----------------------------
// 🔸 5. CONTACTS
// ----------------------------
export const getContacts = () => api.get("contacts/");

// ----------------------------
// 🔸 6. SOCIAL LINKS
// ----------------------------
export const getSocialLinks = () => api.get("social/");

// ----------------------------
// 🔸 7. MESSAGE yuborish (POST)
// ----------------------------
export const sendMessage = (data) => api.post("messages/", data);

export default api;
