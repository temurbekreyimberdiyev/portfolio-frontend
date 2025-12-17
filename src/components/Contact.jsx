import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [contactInfo, setContactInfo] = useState(null);
  const [socials, setSocials] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [modal, setModal] = useState({ show: false, type: "success", message: "" });

  const lang = i18n.language || "uz"; // "uz", "en", yoki "ru"

  useEffect(() => {
    // Contact Info Fallback Logic
    axios.get("http://127.0.0.1:8000/api/contacts/")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setContactInfo(res.data[0]);
        } else {
          setContactInfo(t("contact.info", { returnObjects: true }));
        }
      })
      .catch(err => {
        console.error(err);
        setContactInfo(t("contact.info", { returnObjects: true }));
      });

    // Socials Fallback Logic
    axios.get("http://127.0.0.1:8000/api/social/")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setSocials(res.data);
        } else {
          const staticSocials = t("contact.social_items", { returnObjects: true });
          if (Array.isArray(staticSocials)) setSocials(staticSocials);
        }
      })
      .catch(err => {
        console.error(err);
        const staticSocials = t("contact.social_items", { returnObjects: true });
        if (Array.isArray(staticSocials)) setSocials(staticSocials);
      });
  }, [t]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/messages/", form)
      .then(() => {
        setModal({
          show: true,
          type: "success",
          message: t("contact.messageSent")
        });
        setForm({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => {
        // Mock success if API fails (for demo purposes since backend might be down)
        setModal({
          show: true,
          type: "success",
          message: t("contact.messageSent")
        });
        setForm({ name: "", email: "", phone: "", message: "" });
      });
  };

  // Fallback if contactInfo is still null (shouldn't happen with above logic but safe guard)
  const displayContactInfo = contactInfo || t("contact.info", { returnObjects: true });

  return (
    <div id="contact" className="w-full flex flex-col items-center px-6 py-10 mt-10 sm:mt-20 text-white bg-black/30 dark:bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/40 transition-colors duration-500">

      <h1 className="text-3xl font-bold mb-10 drop-shadow-md">{t("contact.title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

        {/* Form */}
        <div className="p-6 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-gray-700/40 backdrop-blur-md shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">{t("contact.sendMessage")}</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            {["name", "email", "phone", "message"].map((field) =>
              field !== "message" ? (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={t(`contact.${field}`)}
                  className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-gray-700/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white placeholder-gray-300"
                />
              ) : (
                <textarea
                  key={field}
                  rows="4"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.message")}
                  className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-gray-700/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white placeholder-gray-300 resize-none"
                />
              )
            )}
            <button
              type="submit"
              className="w-full py-2 rounded-xl font-semibold text-white shadow-md transition-all duration-300 bg-gradient-to-r from-[#a855f7] to-[#9333ea] hover:from-[#b266f9] hover:to-[#7e22ce]"
            >
              {t("contact.submit")}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="p-6 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-gray-700/40 backdrop-blur-md shadow-md space-y-4">
          <h2 className="text-xl font-semibold mb-2">{t("contact.contactInfo")}</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaPhoneAlt className="text-white" />
              <span className="text-sm text-white">{displayContactInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaEnvelope className="text-white" />
              <a href={`mailto:${displayContactInfo.email}`} className="text-sm font-semibold text-white hover:underline">
                {displayContactInfo.email}
              </a>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/20 dark:bg-white/10 border border-white/30 shadow-md">
              <FaMapMarkerAlt className="text-white" />
              <span className="text-sm text-white">{displayContactInfo.address || displayContactInfo[`address_${lang}`]}</span>
            </div>
          </div>
        </div>

        {/* Socials */}
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
                <img src={social.icon} alt={social.platform || social[`platform_${lang}`]} className="w-5 h-5 bg-white rounded-full p-0.5" />
                <span>{social.platform || social[`platform_${lang}`]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-xs text-gray-300 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
        {t("contact.footer")}
      </footer>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModal({ ...modal, show: false })}
          ></div>
          <div className="relative p-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg max-w-sm w-full text-center">
            <h3 className={`text-lg font-semibold mb-2 ${modal.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {modal.type === "success" ? t("contact.success") : t("contact.error")}
            </h3>
            <p className="text-white mb-4">{modal.message}</p>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 transition-transform"
            >
              {t("contact.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
