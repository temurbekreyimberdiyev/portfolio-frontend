import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

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
    {
      image: "/projects/portfolio.png",
      title: "Portfolio Website",
      description: "My personal portfolio built with React and Tailwind.",
      tech: ["react", "tailwind"],
      link: "#",
    },
    {
      image: "/projects/admin.png",
      title: "Admin Dashboard",
      description: "Responsive admin dashboard with charts and analytics.",
      tech: ["vue", "tailwind"],
      link: "#",
    },
  ];

  // Sahifalash logikasi
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Faqat Projects section’ini tepaga scroll qilamiz
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects-section"
      name="projects"
      className="py-20 px-6 md:px-16 text-black dark:text-white transition-colors duration-500"
    >
      <h2
        className="text-center text-3xl font-bold mb-12 tracking-widest 
        text-orange-500 dark:text-orange-400"
      >
        {t("projects.title")}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {currentProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed border-gray-400"
                  : "border-blue-600 text-blue-600 hover:text-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
              }`}
          >
            {t("projects.prev") || "Prev"}
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-400 dark:text-black"
                    : "border-blue-600 text-blue-600 hover:text-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed border-gray-400"
                  : "border-blue-600 text-blue-600 hover:text-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
              }`}
          >
            {t("projects.next") || "Next"}
          </button>
        </div>
      )}
    </section>
  );
}
