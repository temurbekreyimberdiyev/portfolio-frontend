import { useTranslation } from "react-i18next";
import ExperienceItem from "./ExperienceItem";

export default function Experience() {
  const { t } = useTranslation();

  const experiences = [
    {
      company: "Google",
      role: t("experience.items.google.role"),
      period: "experience.period.google",
      description: t("experience.items.google.description"),
    },
    {
      company: "Apple",
      role: t("experience.items.apple.role"),
      period: "experience.period.apple",
      description: t("experience.items.apple.description"),
    },
    {
      company: "Meta",
      role: t("experience.items.meta.role"),
      period: "experience.period.meta",
      description: t("experience.items.meta.description"),
    },
  ];

  return (
    <section
      name="experience"
      className="
        relative py-20 px-6 md:px-16 
        text-gray-800 dark:text-white 
        bg-white/30 dark:bg-[#000319]/30
        backdrop-blur-2xl
        border border-white/20 dark:border-white/10
        rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        transition-all duration-500
        overflow-hidden
      "
    >
      {/* Liquid reflection layer */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-br from-white/40 via-transparent to-white/10
          dark:from-white/10 dark:via-transparent dark:to-white/5
          opacity-60 pointer-events-none
        "
      />

      {/* Subtle top reflection */}
      <div
        className="
          absolute top-0 left-0 w-full h-[80px]
          bg-gradient-to-b from-white/50 to-transparent
          dark:from-white/10 dark:to-transparent
          opacity-50 pointer-events-none
        "
      />

      {/* Title */}
      <h2
        className="
          relative text-center text-3xl font-bold mb-12 tracking-widest
          text-blue-500 dark:text-blue-400 z-10
        "
      >
        {t("experience.title")}
      </h2>

      {/* Experience items */}
      <div className="relative max-w-4xl mx-auto z-10">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </section>
  );
}
