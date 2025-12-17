import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ExperienceItem from "./ExperienceItem";

export default function Experience() {
  const { i18n, t } = useTranslation();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // API dan ma'lumot olishga urinish
    axios
      .get("http://127.0.0.1:8000/api/experiences/")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setExperiences(res.data);
        } else {
          // Fallback
          const staticExp = t("experience.items", { returnObjects: true });
          if (Array.isArray(staticExp)) setExperiences(staticExp);
        }
      })
      .catch((err) => {
        console.error("Experience API xato:", err);
        // Fallback on error
        const staticExp = t("experience.items", { returnObjects: true });
        if (Array.isArray(staticExp)) setExperiences(staticExp);
      });
  }, [t]);

  const lang = i18n.language || "uz";

  return (
    <section
      id="experience"
      className="
        relative py-20 px-6 md:px-16 
        text-gray-800 dark:text-white 
        bg-white/30 dark:bg-[#000319]/30
        backdrop-blur-2xl
        border border-white/20 dark:border-white/10
        rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        transition-all duration-500
        overflow-hidden
      "
    >
      <div
        className="
          absolute inset-0 
          bg-gradient-to-br from-white/40 via-transparent to-white/10
          dark:from-white/10 dark:via-transparent dark:to-white/5
          opacity-60 pointer-events-none
        "
      />

      <h2
        className="
          relative text-center text-3xl font-bold mb-12 tracking-widest
          text-blue-500 dark:text-blue-400 z-10
        "
      >
        {t("experience.title")}
      </h2>

      <div className="relative max-w-4xl mx-auto z-10 space-y-6">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/25 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="flex items-center space-x-5">
                <img
                  src={exp.logo || "https://example.com/default-logo.png"}
                  alt={exp.company || exp[`company_${lang}`]}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {exp.company || exp[`company_${lang}`]}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {exp.role || exp[`role_${lang}`]}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-800 dark:text-gray-200">
                {exp.description || exp[`description_${lang}`]}
              </p>
              <span className="mt-3 inline-block text-sm text-gray-600 dark:text-gray-400">
                {exp.current
                  ? `${exp.start_date} - ${t("experience.present") || "Hozir"}`
                  : `${exp.start_date} - ${exp.end_date}`}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("experience.no_data") || "Ma’lumot topilmadi."}
          </p>
        )}
      </div>

    </section>
  );
}
