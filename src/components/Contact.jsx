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
      name="contact"
      className="
        w-full 
        flex flex-col items-center 
        px-6 py-10
        mt-10 sm:mt-20
        text-gray-900 dark:text-white
        bg-black/30 dark:bg-black/70
        backdrop-blur-xl
        rounded-2xl
        shadow-2xl
        border border-white/20 dark:border-gray-700/40
        transition-colors duration-500
      "
    >
      <h1 className="text-3xl font-bold mb-10 drop-shadow-md">
        {t("contact.title")}
      </h1>

      <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl gap-6">
        {/* Chap tomon */}
        <div className="space-y-4 mb-8 md:mb-0">
          <div
            className="flex items-center space-x-2 px-3 py-2 rounded-xl
              bg-white/20 dark:bg-white/10 backdrop-blur-md
              border border-white/30 dark:border-gray-700/40 shadow-md"
          >
            <FaPhoneAlt className="text-gray-200" />
            <span className="text-sm">+998 95 969 21 12</span>
          </div>

          <div
            className="flex items-center space-x-2 px-3 py-2 rounded-xl
              bg-white/20 dark:bg-white/10 backdrop-blur-md
              border border-white/30 dark:border-gray-700/40 shadow-md"
          >
            <FaEnvelope className="text-gray-200" />
            <a
              href="mailto:temurbekreymberdiyev@gmail.com"
              className="text-sm font-semibold hover:underline"
            >
              temurbekreymberdiyev@gmail.com
            </a>
          </div>

          <div
            className="flex items-center space-x-2 px-3 py-2 rounded-xl
              bg-white/20 dark:bg-white/10 backdrop-blur-md
              border border-white/30 dark:border-gray-700/40 shadow-md"
          >
            <FaMapMarkerAlt className="text-gray-200" />
            <span className="text-sm">{t("contact.location")}</span>
          </div>
        </div>

        {/* O‘ng tomon */}
        <div className="flex flex-col space-y-3">
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl 
              bg-[#55acee]/30 hover:bg-[#55acee]/50 
              backdrop-blur-md shadow-md border border-white/20
              text-white transition"
          >
            <FaTelegramPlane />
            <span>{t("contact.telegram")}</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl 
              bg-[#d64b87]/30 hover:bg-[#d64b87]/50 
              backdrop-blur-md shadow-md border border-white/20
              text-white transition"
          >
            <FaInstagram />
            <span>{t("contact.instagram")}</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl 
              bg-[#333333]/40 hover:bg-[#333333]/60 
              backdrop-blur-md shadow-md border border-white/20
              text-white transition"
          >
            <FaGithub />
            <span>{t("contact.github")}</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl 
              bg-[#2d64bc]/30 hover:bg-[#2d64bc]/50 
              backdrop-blur-md shadow-md border border-white/20
              text-white transition"
          >
            <FaLinkedin />
            <span>{t("contact.linkedin")}</span>
          </a>
        </div>
      </div>

      <footer
        className="mt-16 text-xs text-gray-200 dark:text-gray-400 
          px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm"
      >
        {t("contact.footer")}
      </footer>
    </div>
  );
};

export default Contact;
