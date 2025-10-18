import React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      image: "/projects/earth.png",
      title: t("projects.items.earth.title"),
      description: t("projects.items.earth.description"),
      tech: ["react", "ts", "three"],
      link: "#",
    },
    {
      image: "/projects/yoom.png",
      title: t("projects.items.yoom.title"),
      description: t("projects.items.yoom.description"),
      tech: ["next", "ts"],
      link: "#",
    },
    {
      image: "/projects/ai-saas.png",
      title: t("projects.items.aiSaas.title"),
      description: t("projects.items.aiSaas.description"),
      tech: ["next", "ts"],
      link: "#",
    },
    {
      image: "/projects/iphone3d.png",
      title: t("projects.items.iphone.title"),
      description: t("projects.items.iphone.description"),
      tech: ["react", "ts", "three"],
      link: "#",
    },
  ];

  return (
    <section
      className="py-20 px-6 md:px-16 
      bg-white text-black 
      dark:bg-[#000319] dark:text-white 
      transition-colors duration-500"
    >
      <h2
        className="text-center text-3xl font-bold mb-12 tracking-widest 
        text-orange-500 dark:text-orange-400"
      >
        {t("projects.title")}
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
