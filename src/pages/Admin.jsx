import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Dashboard from "../components/admin/Dashboard";
import ProjectsManagement from "../components/admin/ProjectsManagement";
import ExperienceManagement from "../components/admin/ExperienceManagement";
import SkillsManagement from "../components/admin/SkillsManagement";
import HeroEditor from "../components/admin/HeroEditor";
import ContactManagement from "@/components/admin/ContactManagement";
import SettingsPanel from "@/components/admin/SettingsPanel";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
        case "projects":
        return <ProjectsManagement />;
        case "experience":
        return <ExperienceManagement />;
        case "skills":
        return <SkillsManagement />;
        case "hero":
        return <HeroEditor />;
        case "contact":
        return <ContactManagement />;
        case "settings":
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Fon uchun gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20 pointer-events-none" />

      {/* Asosiy layout */}
      <div className="relative flex min-h-screen">
        {/* Sidebar chapda */}
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Asosiy kontent */}
        <main className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
