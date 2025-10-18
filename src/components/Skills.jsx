import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaReact, FaNodeJs, FaGitAlt, FaSass
} from "react-icons/fa";
import {
  SiJavascript, SiTypescript, SiNextdotjs, SiExpress, SiNestjs,
  SiSocketdotio, SiPostgresql, SiMongodb, SiTailwindcss,
  SiFigma, SiCypress, SiStorybook
} from "react-icons/si";

export default function Skills() {
  const { t } = useTranslation();

  const skills = [
    { icon: <SiJavascript className="text-yellow-400" />, name: "Javascript" },
    { icon: <SiTypescript className="text-blue-400" />, name: "Typescript" },
    { icon: <FaReact className="text-cyan-400" />, name: "React" },
    { icon: <SiNextdotjs className="text-gray-900 dark:text-white" />, name: "Next.js" },
    { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
    { icon: <SiExpress className="text-gray-700 dark:text-gray-300" />, name: "Express.js" },
    { icon: <SiNestjs className="text-red-500" />, name: "Nest.js" },
    { icon: <SiSocketdotio className="text-gray-600 dark:text-gray-200" />, name: "Socket.io" },
    { icon: <SiPostgresql className="text-sky-500" />, name: "PostgreSQL" },
    { icon: <SiMongodb className="text-green-400" />, name: "MongoDB" },
    { icon: <FaSass className="text-pink-400" />, name: "Sass/Scss" },
    { icon: <SiTailwindcss className="text-sky-400" />, name: "Tailwindcss" },
    { icon: <SiFigma className="text-purple-500" />, name: "Figma" },
    { icon: <SiCypress className="text-gray-700 dark:text-gray-300" />, name: "Cypress" },
    { icon: <SiStorybook className="text-pink-500" />, name: "Storybook" },
    { icon: <FaGitAlt className="text-orange-500" />, name: "Git" },
  ];

  return (
    <section className="py-16 flex flex-col items-center 
      bg-white text-black dark:bg-[#000319] dark:text-white transition-colors duration-500">

      {/* Title button */}
      <button className="bg-gradient-to-r from-[#4ba3c7] to-[#1b3c4d] text-gray-200 
        px-6 py-2 rounded-lg mb-6 font-medium shadow-md">
        {t("skills.title")}
      </button>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-10 text-center transition-colors duration-500">
        {t("skills.description")}
      </p>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-200"
          >
            <div className="text-5xl">{skill.icon}</div>
            <span className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-500">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
