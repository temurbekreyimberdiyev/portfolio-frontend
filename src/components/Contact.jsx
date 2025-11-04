import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaTelegramPlane, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [contactInfo, setContactInfo] = useState(null);
  const [socials, setSocials] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const lang = i18n.language || "uz";

  useEffect(() => {
    // Contact info olish
    axios.get("http://127.0.0.1:8000/api/contacts/")
      .then(res => setContactInfo(res.data[0]))
      .catch(err => console.error(err));

    // Social media ma’lumotlarini olish
    axios.get("http://127.0.0.1:8000/api/social/")
      .then(res => setSocials(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/messages/", form)
      .then(() => alert(t("contact.messageSent")))
      .catch(err => console.error(err));
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  if (!contactInfo) return null; // Backenddan ma’lumot kelguncha

  return (
    <div
      name="contact"
      className="w-full flex flex-col items-center px-6 py-10 mt-10 sm:mt-20
        text-white bg-black/30 dark:bg-black/70 backdrop-blur-xl
        rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/40
        transition-colors duration-500"
    >
      <h1 className="text-3xl font-bold mb-10 drop-shadow-md">{t("contact.title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* 1️⃣ Xabar yuborish formasi */}
        <div className="p-6 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-gray-700/40 backdrop-blur-md shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">{t("contact.sendMessage")}</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("contact.name")}
              className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-gray-700/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white placeholder-gray-300"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("contact.email")}
              className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-gray-700/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white placeholder-gray-300"
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t("contact.phone")}
              className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-gray-700/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white placeholder-gray-300"
            />
            <textarea
              rows="4"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("contact.message")}
              className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-gray-700/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white placeholder-gray-300 resize-none"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-xl font-semibold text-white shadow-md transition-all duration-300 bg-gradient-to-r from-[#a855f7] to-[#9333ea] hover:from-[#b266f9] hover:to-[#7e22ce]"
            >
              {t("contact.submit")}
            </button>
          </form>
        </div>

        {/* 2️⃣ Kontakt ma’lumotlari */}
        <div className="p-6 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-gray-700/40 backdrop-blur-md shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">{t("contact.contactInfo")}</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaPhoneAlt className="text-white" />
              <span className="text-sm text-white">{contactInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaEnvelope className="text-white" />
              <a href={`mailto:${contactInfo.email}`} className="text-sm font-semibold text-white hover:underline">
                {contactInfo.email}
              </a>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaMapMarkerAlt className="text-white" />
              <span className="text-sm text-white">{contactInfo[`address_${lang}`]}</span>
            </div>
          </div>
        </div>

        {/* 3️⃣ Social media havolalar */}
        <div className="p-6 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-gray-700/40 backdrop-blur-md shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">{t("contact.socials")}</h2>
          <div className="flex flex-col space-y-3">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md shadow-md border border-white/20 text-white transition"
              >
                <img src={social.icon} alt={social.platform_uz} className="w-5 h-5" />
                <span>{social[`platform_${lang}`]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-16 text-xs text-gray-300 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
        {t("contact.footer")}
      </footer>
    </div>
  );
}
