import { useTranslation } from "react-i18next";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function ExperienceItem({ company, role, period, description }) {
  const { t } = useTranslation();

  const icons = {
    Google: <FaGoogle className="text-[#ea4335]" />,
    Apple: <FaApple className="text-gray-700 dark:text-gray-300" />,
    Meta: <FaFacebook className="text-[#0a84ff]" />,
  };

  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
      border-b border-gray-200 dark:border-[#1e1b3a] 
      pb-6 mb-6 transition-colors duration-500"
    >
      <div className="flex items-start sm:items-center gap-4">
        <div className="text-2xl">{icons[company]}</div>
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
        {t(period)}
      </span>
    </div>
  );
}
