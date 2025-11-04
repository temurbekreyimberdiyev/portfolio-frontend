import { useTranslation } from "react-i18next";

export default function ExperienceItem({ company, role, period, description, logo }) {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
      border-b border-gray-200 dark:border-[#1e1b3a] 
      pb-6 mb-6 transition-colors duration-500"
    >
      <div className="flex items-start sm:items-center gap-4">
        {/* Dynamic company logo (backenddan) */}
        {logo && (
          <img
            src={logo}
            alt={company}
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full border border-gray-200 dark:border-gray-700"
          />
        )}

        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            {role}{" "}
            <span className="font-normal text-gray-600 dark:text-gray-300">
              {t("experience.at")} {company}
            </span>
          </h3>

          <p className="mt-2 text-sm leading-relaxed max-w-2xl text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <span className="mt-3 sm:mt-0 text-sm text-gray-600 dark:text-gray-400">
        {period}
      </span>
    </div>
  );
}
