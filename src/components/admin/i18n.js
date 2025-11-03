import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";

// Admin panelga xos tarjimalar
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uz: { translation: uz },
    ru: { translation: ru },
  },
  lng: localStorage.getItem("admin_lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Tilni olish
export const getAdminLang = () => i18n.language;

// Tilni o‘rnatish
export const setAdminLang = (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("admin_lang", lang);
  window.dispatchEvent(new Event("adminLanguageChanged"));
};

// Tarjima funksiyasi
export const tAdmin = (key) => i18n.t(key);

export default i18n;
