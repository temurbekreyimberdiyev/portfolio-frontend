import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ExperienceItem from "./ExperienceItem";

export default function Experience() {
  const { i18n, t } = useTranslation();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/experiences/")
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error("Experience API xato:", err));
  }, []);

  const lang = i18n.language || "uz";

  return (
    <section
      name="experience"
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

      <div className="relative max-w-4xl mx-auto z-10">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <ExperienceItem
              key={exp.id}
              company={exp[`company_${lang}`]}
              role={exp[`role_${lang}`]}
              description={exp[`description_${lang}`]}
              logo={exp.logo}
              period={
                exp.current
                  ? `${exp.start_date} - ${t("experience.present") || "Hozir"}`
                  : `${exp.start_date} - ${exp.end_date}`
              }
            />
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
