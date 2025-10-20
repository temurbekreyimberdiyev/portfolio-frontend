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
        w-full flex flex-col items-center 
        px-6 py-10 mt-10 sm:mt-20
        text-gray-900 dark:text-white
        bg-black/30 dark:bg-black/70
        backdrop-blur-xl
        rounded-2xl shadow-2xl
        border border-white/20 dark:border-gray-700/40
        transition-colors duration-500
      "
    >
      <h1 className="text-3xl font-bold mb-10 drop-shadow-md">
        {t("contact.title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* 1️⃣ Xabar yuborish formasi */}
        <div
          className="p-6 rounded-2xl bg-white/10 dark:bg-white/5 
          border border-white/20 dark:border-gray-700/40 
          backdrop-blur-md shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold mb-2">{t("contact.sendMessage")}</h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder={t("contact.name")}
              className="w-full px-4 py-2 rounded-xl bg-white/20 
                dark:bg-white/10 border border-white/30 
                dark:border-gray-700/40 shadow-sm focus:outline-none 
                focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <input
              type="email"
              placeholder={t("contact.email")}
              className="w-full px-4 py-2 rounded-xl bg-white/20 
                dark:bg-white/10 border border-white/30 
                dark:border-gray-700/40 shadow-sm focus:outline-none 
                focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <input
              type="tel"
              placeholder={t("contact.phone")}
              className="w-full px-4 py-2 rounded-xl bg-white/20 
                dark:bg-white/10 border border-white/30 
                dark:border-gray-700/40 shadow-sm focus:outline-none 
                focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <textarea
              rows="4"
              placeholder={t("contact.message")}
              className="w-full px-4 py-2 rounded-xl bg-white/20 
                dark:bg-white/10 border border-white/30 
                dark:border-gray-700/40 shadow-sm focus:outline-none 
                focus:ring-2 focus:ring-purple-500 text-sm resize-none"
            ></textarea>
            <button
              className="w-full py-2 rounded-xl bg-gradient-to-r 
                from-purple-500 to-purple-700 hover:from-purple-600 
                hover:to-purple-800 shadow-md font-semibold text-white 
                transition-all duration-300"
            >
              {t("contact.submit")}
            </button>
          </div>
        </div>

        {/* 2️⃣ Kontakt ma’lumotlari */}
        <div
          className="p-6 rounded-2xl bg-white/10 dark:bg-white/5 
          border border-white/20 dark:border-gray-700/40 
          backdrop-blur-md shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold mb-2">{t("contact.contactInfo")}</h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaPhoneAlt className="text-gray-200" />
              <span className="text-sm">+998 95 969 21 12</span>
            </div>

            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaEnvelope className="text-gray-200" />
              <a
                href="mailto:temurbekreymberdiyev@gmail.com"
                className="text-sm font-semibold hover:underline"
              >
                temurbekreymberdiyev@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaMapMarkerAlt className="text-gray-200" />
              <span className="text-sm">{t("contact.location")}</span>
            </div>
          </div>
        </div>

        {/* 3️⃣ Social media havolalar */}
        <div
          className="p-6 rounded-2xl bg-white/10 dark:bg-white/5 
          border border-white/20 dark:border-gray-700/40 
          backdrop-blur-md shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold mb-2">{t("contact.socials")}</h2>

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
