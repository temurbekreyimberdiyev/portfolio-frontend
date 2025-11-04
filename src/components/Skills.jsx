import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Skills() {
  const { t } = useTranslation();
  const [skills, setSkills] = useState([]);

  // Backenddan ma'lumot olish
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/skills/")
      .then((res) => {
        setSkills(res.data);
      })
      .catch((err) => {
        console.error("Skills API xato:", err);
      });
  }, []);

  return (
    <section
      className="
        relative overflow-hidden
        py-16 px-6 md:px-12 
        flex flex-col items-center 
        rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        bg-white/20 dark:bg-[#0e0b1b]/25
        backdrop-blur-2xl
        border border-white/30 dark:border-gray-700/40
        text-black dark:text-white
        transition-all duration-700
      "
    >
      {/* Yorug‘lik “liquid glass” effekti */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/10 pointer-events-none" />

      {/* Asosiy kontent */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <button className="bg-gradient-to-r from-[#4ba3c7] to-[#1b3c4d] text-gray-200 
          px-6 py-2 rounded-lg mb-6 font-medium shadow-md">
          {t("skills.title")}
        </button>

        <p className="text-gray-600 dark:text-gray-400 mb-10 text-center transition-colors duration-500 max-w-2xl">
          {t("skills.description")}
        </p>

        {/* Loading holati */}
        {skills.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">{t("skills.loading") || "Loading..."}</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-200"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-16 h-16 object-contain drop-shadow-[0_1px_5px_rgba(255,255,255,0.4)]"
                  />
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-500">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
