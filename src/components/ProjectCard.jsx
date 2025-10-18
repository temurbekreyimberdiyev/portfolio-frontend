import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";
import { TbCube } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function ProjectCard({ image, title, description, tech, link }) {
  const { t } = useTranslation();

  return (
    <div
      className="rounded-2xl overflow-hidden border hover:scale-[1.02] 
      transition-all duration-300 shadow-lg 
      bg-white text-black border-gray-200 
      dark:bg-[#0f0b1e] dark:text-white dark:border-[#1e1b3a]"
    >
      {/* Project image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Text content */}
      <div className="p-5 flex flex-col justify-between h-[240px]">
        {/* Title + description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {description}
          </p>
        </div>

        {/* Tech icons + link */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-lg text-gray-500 dark:text-gray-300">
            {tech.includes("react") && <FaReact className="text-cyan-500" />}
            {tech.includes("next") && (
              <SiNextdotjs className="text-gray-900 dark:text-white" />
            )}
            {tech.includes("ts") && <SiTypescript className="text-blue-500" />}
            {tech.includes("three") && <TbCube className="text-purple-500" />}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm 
            text-blue-600 hover:text-blue-500 
            dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <span>{t("projects.live")}</span>
            <FiExternalLink className="text-[14px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
