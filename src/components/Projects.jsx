import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api"; // axios instans
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const lang = i18n.language || "uz";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 1️⃣ Login va token olish
        const loginRes = await api.post("token/", {
          username: "admin",
          password: "temur.969.21.12",
        });

        localStorage.setItem("access", loginRes.data.access);
        localStorage.setItem("refresh", loginRes.data.refresh);

        // 2️⃣ Token bilan projects API chaqirish
        const res = await api.get("projects/");

        // Agar kerak bo‘lsa, icon URL larini to‘liq qilish
        const data = res.data.map(project => {
          if (project.image && !project.image.startsWith("http")) {
            project.image = `${api.defaults.baseURL}${project.image}`;
          }
          return project;
        });

        if (data.length > 0) {
          setProjects(data);
        } else {
          const staticProjects = t("projects.items", { returnObjects: true });
          if (Array.isArray(staticProjects)) setProjects(staticProjects);
        }
      } catch (err) {
        console.error("Projects API yoki login xato:", err);
        const staticProjects = t("projects.items", { returnObjects: true });
        if (Array.isArray(staticProjects)) setProjects(staticProjects);
      }
    };

    fetchProjects();
  }, [t]);

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
      id="projects"
      className="py-20 px-6 md:px-16 text-black dark:text-white transition-colors duration-500"
    >
      <h2 className="text-center text-3xl font-bold mb-12 tracking-widest text-orange-500 dark:text-orange-400">
        {t("projects.title")}
      </h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t("projects.loading") || "Loading projects..."}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                image={project.image || "https://via.placeholder.com/400x300?text=No+Image"}
                title={project.title || project[`title_${lang}`]}
                description={project.description || project[`description_${lang}`]}
                skills={project.skills} // skill ob'ektlarini uzatish (name + icon)
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
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${currentPage === 1
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
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${currentPage === index + 1
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
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${currentPage === totalPages
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
