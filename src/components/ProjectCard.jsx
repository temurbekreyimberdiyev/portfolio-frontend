import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";
import { TbCube } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";

// 🔹 Default Unsplash random image (agar backenddan image kelmasa)
const getDefaultImage = () =>
  `https://source.unsplash.com/800x600/?project,technology,web,code,developer`;

export default function ProjectCard({ image, title, description, tech = [], link }) {
  const { t } = useTranslation();

  return (
    <div
      className="
        relative overflow-hidden 
        rounded-3xl shadow-xl
        bg-white/30 dark:bg-[#0e0b1b]/30
        backdrop-blur-2xl
        border border-white/40 dark:border-gray-700/40
        transition-all duration-500
        hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]
        text-black dark:text-white
        flex flex-col
      "
    >
      {/* Reflection highlight */}
      <div
        className="
          absolute top-0 left-0 w-full h-[70px]
          bg-gradient-to-b from-white/40 to-transparent
          dark:from-white/10 dark:to-transparent
          opacity-70
          rounded-t-3xl
          pointer-events-none
        "
      />

      {/* Project image */}
      <img
        src={image || getDefaultImage()}
        alt={title}
        className="
          w-full 
          h-44 sm:h-48 md:h-52 
          object-cover 
          rounded-t-3xl 
          border-b border-white/20 dark:border-gray-700/40
          transition-all duration-300
        "
        loading="lazy"
      />

      {/* Text content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        {/* Title + description */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
          <p
            className="
              text-gray-700 dark:text-gray-300 
              text-sm sm:text-base 
              mb-4 leading-relaxed
            "
          >
            {description}
          </p>
        </div>

        {/* Tech icons + link */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-3 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            {tech.includes("react") && <FaReact className="text-cyan-400" />}
            {tech.includes("next") && (
              <SiNextdotjs className="text-gray-900 dark:text-white" />
            )}
            {tech.includes("ts") && <SiTypescript className="text-blue-400" />}
            {tech.includes("three") && <TbCube className="text-purple-400" />}
          </div>

          <a
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1 
              text-sm sm:text-base 
              text-blue-600 hover:text-blue-500 
              dark:text-blue-400 dark:hover:text-blue-300 
              transition
            "
          >
            <span>{t("projects.live")}</span>
            <FiExternalLink className="text-[14px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
