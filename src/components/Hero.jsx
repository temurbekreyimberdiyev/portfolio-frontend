import React from "react";
import { useTranslation } from "react-i18next";
import profil from "../assets/avatar.png";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      name="home"
      className="
        min-h-screen flex flex-col items-center justify-center px-4 text-center pt-20
        text-black dark:text-white
        transition-colors duration-500
      "
    >
      {/* Avatar */}
      <div
        className="
          mb-8 p-[6px]
          rounded-full
          bg-black/20 dark:bg-black/50
          backdrop-blur-xl
          shadow-2xl
          border-4 border-purple-600
        "
      >
        <img
          src={profil}
          alt="Temurbek"
          className="
            w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 
            rounded-full
            shadow-lg
          "
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-md">
        {t("hero.title1")} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
          {t("hero.title2")}
        </span>
      </h1>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 max-w-2xl mt-4 text-base sm:text-lg transition-colors duration-500 drop-shadow-sm">
        {t("hero.description")}
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 mt-8">
        {/* Contact Button */}
        <button
          className="
            px-6 py-3 rounded-full font-semibold
            bg-black/30 dark:bg-white/20
            backdrop-blur-lg
            text-white dark:text-white
            border border-white/30
            shadow-lg
            hover:bg-black/50 dark:hover:bg-white/30
            transition
          "
        >
          {t("hero.btn_contact")}
        </button>

        {/* CV Button */}
        <button
          className="
            px-6 py-3 rounded-full font-semibold
            bg-white/40 dark:bg-black/30
            backdrop-blur-lg
            border border-black/30 dark:border-white/30
            shadow-md
            hover:bg-purple-600 hover:text-white
            transition
          "
        >
          {t("hero.btn_cv")}
        </button>
      </div>
    </section>
  );
};

export default Hero;
