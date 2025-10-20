import React from "react";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  Code2, 
  User, 
  Mail, 
  Settings 
} from "lucide-react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "hero", label: "Hero Section", icon: User },
    { id: "contact", label: "Contact Info", icon: Mail },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 p-6 border-r border-white/10">
      {/* Glass panel */}
      <div className="sticky top-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Portfolio Admin
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-white/10 backdrop-blur-lg shadow-lg shadow-purple-500/20 text-white"
                    : "hover:bg-white/5 backdrop-blur-sm text-white/70 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
