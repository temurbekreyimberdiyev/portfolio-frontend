import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const lang = i18n.language || "uz";

  // Backenddan loyihalarni olish
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/projects/")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Projects API xato:", err);
      });
  }, []);

  // Sahifalash logikasi
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

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
      {/* Title */}
      <h2
        className="text-center text-3xl font-bold mb-12 tracking-widest 
        text-orange-500 dark:text-orange-400"
      >
        {t("projects.title")}
      </h2>

      {/* Loading holati */}
      {projects.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t("projects.loading") || "Loading projects..."}
        </p>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                image={
                  project.image ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                title={project[`title_${lang}`]}
                description={project[`description_${lang}`]}
                // YANGI: Endi to'liq skill ob'ektlari (name + icon) uzatilmoqda
                skills={project.skills} // Bu yerda icon ham bor!
                link={project.link}
              />
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
        </>
      )}
    </section>
  );
}