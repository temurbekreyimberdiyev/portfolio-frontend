import React from "react";
import { useTranslation } from "react-i18next";
import profil from "../assets/avatar.png";
const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-20 
      bg-white text-black dark:bg-[#000319] dark:text-white transition-colors duration-500">
      
      {/* Avatar */}
      <div className="mb-8">
        <img
          src={profil}
          alt="Temurbek"
          className="
          w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 
          rounded-full
          border-4 border-purple-600 shadow-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
        {t("hero.title1")} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
          {t("hero.title2")}
        </span>
      </h1>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mt-4 text-base sm:text-lg transition-colors duration-500">
        {t("hero.description")}
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 mt-8">
        <button className="bg-black text-white dark:bg-white dark:text-black font-semibold px-6 py-3 rounded-full 
          hover:opacity-80 transition">
          {t("hero.btn_contact")}
        </button>
        <button className="border border-black dark:border-white px-6 py-3 rounded-full 
          hover:bg-purple-600 hover:text-white transition">
          {t("hero.btn_cv")}
        </button>
      </div>
    </section>
  );
};

export default Hero;
