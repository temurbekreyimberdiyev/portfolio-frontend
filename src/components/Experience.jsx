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
  className="
    py-20 px-6 md:px-16 
    text-gray-800 dark:text-white 
    bg-white dark:bg-[#000319] 
    rounded-3xl shadow-lg
    transition-colors duration-500
  "
>
      <h2 className="text-center text-3xl font-bold mb-12 tracking-widest 
        text-blue-500 dark:text-blue-400">
        {t("experience.title")}
      </h2>

      <div className="max-w-4xl mx-auto">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </section>
  );
}
