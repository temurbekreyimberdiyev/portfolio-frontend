import React, { useState } from "react";
import logoDark from "../assets/logo_dark.png";
import logoLight from "../assets/logo_light.png";
import { useTranslation } from "react-i18next";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-scroll";

const Navbar = ({ toggleTheme, theme }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const logo = theme === "dark" ? logoDark : logoLight;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50
        backdrop-blur-xl bg-white/30 dark:bg-[#0e0b1b]/40
        border-b border-white/20 dark:border-gray-700/40
        text-black dark:text-white
        transition-all duration-500`}
      style={{ height: "80px" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Reyimberdiyev Logo"
            className="w-40 h-auto object-contain cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-lg font-medium">
          {["home", "projects", "experience", "contact"].map((item) => (
            <li key={item}>
              <Link
                to={item}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass="text-purple-400 font-semibold"
                className="cursor-pointer hover:text-purple-400 transition"
              >
                {t(`navbar.${item}`)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language + Theme */}
        <div className="flex items-center space-x-3">
          {/* Language */}
          <div className="flex items-center space-x-2">
            {["uz", "ru", "en"].map((lng, idx) => (
              <React.Fragment key={lng}>
                <button
                  onClick={() => changeLanguage(lng)}
                  className="text-sm px-2 py-1 rounded-lg 
                    bg-white/20 dark:bg-white/10 
                    border border-white/30 dark:border-gray-700/40 
                    backdrop-blur-md shadow-sm hover:text-purple-400 transition"
                >
                  {lng.toUpperCase()}
                </button>
                {idx < 2 && (
                  <span className="text-gray-500 dark:text-gray-400">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-3 text-xl p-2 rounded-full 
              bg-white/20 dark:bg-white/10 
              border border-white/30 dark:border-gray-700/40 
              backdrop-blur-md shadow-sm hover:text-purple-400 transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-xl p-2 rounded-lg
              bg-white/20 dark:bg-white/10 
              border border-white/30 dark:border-gray-700/40 
              backdrop-blur-md shadow-sm hover:text-purple-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden absolute top-[80px] left-0 w-full 
              bg-white/30 dark:bg-[#0e0b1b]/40
              backdrop-blur-xl border-t border-white/20 dark:border-gray-700/40 
              text-center py-4 space-y-4"
          >
            {["home", "projects", "experience", "contact"].map((item) => (
              <Link
                key={item}
                to={item}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-medium cursor-pointer hover:text-purple-400 transition"
              >
                {t(`navbar.${item}`)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
