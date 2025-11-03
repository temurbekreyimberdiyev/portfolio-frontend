import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { getAdminLang, setAdminLang } from "./i18n";

const LanguageSwitcher = () => {
  const [lang, setLang] = useState(getAdminLang());

  useEffect(() => {
    const update = () => setLang(getAdminLang());
    window.addEventListener("adminLanguageChanged", update);
    return () => window.removeEventListener("adminLanguageChanged", update);
  }, []);

  const cycleLang = () => {
    const next = lang === "uz" ? "en" : lang === "en" ? "ru" : "uz";
    setAdminLang(next);
  };

  return (
    <button
      onClick={cycleLang}
      className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
    >
      <Globe size={16} />
      {lang.toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;
