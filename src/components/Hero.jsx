import React from "react";
import { useTranslation } from "react-i18next";
import profil from "../assets/avatar.png";
import { Link } from "react-scroll";
const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
  name="home"
  className="
    min-h-screen 
    flex flex-col items-center justify-center 
    px-4 
    text-center 
    pt-4 sm:pt-20 md:pt-24
    text-black dark:text-white
    transition-colors duration-500
  "
>


      {/* Avatar */}
      <div
        className="
          mb-8 p-[6px] rounded-full shadow-2xl
          bg-gradient-to-tr from-purple-400 via-pink-400 to-orange-300
          dark:from-purple-600 dark:via-pink-500 dark:to-orange-500
          transition-colors duration-500
          animate-spin-slow
        "
      >
        <div
          className="
            rounded-full p-1
            bg-white/30 dark:bg-black/40
            backdrop-blur-xl
            border border-white/30 dark:border-gray-700/50
            shadow-inner
          "
        >
          <img
            src={profil}
            alt="Temurbek"
            className="
              w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 
              rounded-full shadow-lg
            "
          />
        </div>
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
        <Link
  to="contact"          // section name
  smooth={true}         // smooth scroll
  duration={500}        // scroll davomiyligi (ms)
  offset={-80}          // navbar balandligini hisobga olish
>
  <button
    className="
      px-6 py-3 rounded-full font-semibold
      bg-gradient-to-r from-purple-500/40 to-pink-500/40
      backdrop-blur-lg
      text-white
      border border-white/30
      shadow-lg
      hover:from-purple-600/60 hover:to-pink-600/60
      transition
    "
  >
    {t("hero.btn_contact")}
  </button>
</Link>

        {/* CV Button */}
        <button
          className="
            px-6 py-3 rounded-full font-semibold
            bg-white/40 dark:bg-black/30
            backdrop-blur-lg
            border border-white/30 dark:border-gray-700/40
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
