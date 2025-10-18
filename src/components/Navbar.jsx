import React from "react";
import logoDark from "../assets/logo_dark.png";
import logoLight from "../assets/logo_light.png";
import { useTranslation } from "react-i18next";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ toggleTheme, theme }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const logo = theme === "dark" ? logoDark : logoLight;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md 
        bg-white dark:bg-[#0e0b1b] 
        text-black dark:text-white 
        transition-colors duration-500`}  // ✅ faqat rang o'zgaradi, o'lcham emas
      style={{ height: "80px" }}  // ✅ doimiy balandlik
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Reyimberdiyev Logo"
            className="w-40 h-auto object-contain"
          />
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-10 text-lg font-medium">
          <li className="hover:text-purple-400 transition">{t("navbar.home")}</li>
          <li className="hover:text-purple-400 transition">{t("navbar.projects")}</li>
          <li className="hover:text-purple-400 transition">{t("navbar.experience")}</li>
          <li className="hover:text-purple-400 transition">{t("navbar.contact")}</li>
        </ul>

        {/* Language + Theme Switcher */}
        <div className="flex items-center space-x-3">
          {/* Language */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeLanguage("uz")}
              className="text-sm hover:text-purple-400 transition"
            >
              UZ
            </button>
            <span className="text-gray-500">|</span>
            <button
              onClick={() => changeLanguage("ru")}
              className="text-sm hover:text-purple-400 transition"
            >
              RU
            </button>
            <span className="text-gray-500">|</span>
            <button
              onClick={() => changeLanguage("en")}
              className="text-sm hover:text-purple-400 transition"
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-3 text-xl hover:text-purple-400 transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile menu (hamburger icon) */}
        <button className="md:hidden text-black dark:text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
