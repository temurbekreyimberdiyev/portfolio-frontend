import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div
      className="
        w-full 
        flex flex-col items-center 
        px-6 py-10
        mt-10 sm:mt-20
        text-gray-800 dark:text-white 
        bg-gray-100 dark:bg-[#000009] 
        transition-colors duration-500
      "
    >
      <h1 className="text-3xl font-bold mb-10">{t("contact.title")}</h1>

      <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl">
        {/* Chap tomon */}
        <div className="space-y-4 mb-8 md:mb-0">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-gray-500 dark:text-gray-300" />
            <span className="text-sm">+998 95 969 21 12</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-500 dark:text-gray-300" />
            <a
              href="mailto:temurbekreymberdiyev@gmail.com"
              className="text-sm font-semibold hover:underline"
            >
              temurbekreymberdiyev@gmail.com
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-500 dark:text-gray-300" />
            <span className="text-sm">{t("contact.location")}</span>
          </div>
        </div>

        {/* O‘ng tomon */}
        <div className="flex flex-col space-y-3">
          <a
            href="#"
            className="flex items-center space-x-2 bg-[#55acee] hover:bg-[#4a9cd9] text-white px-4 py-2 rounded-md transition"
          >
            <FaTelegramPlane />
            <span>{t("contact.telegram")}</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 bg-[#d64b87] hover:bg-[#c3427a] text-white px-4 py-2 rounded-md transition"
          >
            <FaInstagram />
            <span>{t("contact.instagram")}</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 bg-[#333333] hover:bg-[#444444] text-white px-4 py-2 rounded-md transition"
          >
            <FaGithub />
            <span>{t("contact.github")}</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 bg-[#2d64bc] hover:bg-[#2455a3] text-white px-4 py-2 rounded-md transition"
          >
            <FaLinkedin />
            <span>{t("contact.linkedin")}</span>
          </a>
        </div>
      </div>

      <footer className="mt-16 text-xs text-gray-500 dark:text-gray-400 transition">
        {t("contact.footer")}
      </footer>
    </div>
  );
};

export default Contact;
