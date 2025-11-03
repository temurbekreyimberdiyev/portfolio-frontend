import React, { useState } from "react";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  Code2, 
  User, 
  Mail, 
  Settings, 
  Menu, 
  X 
} from "lucide-react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* Mobil tugma */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 p-6 border-r border-white/10 bg-transparent backdrop-blur-none transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="sticky top-6">
          {/* Logo */}
          <div className="mb-8 pt-0 sm:pt-4 pb-6 border-b border-white/10">
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
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false); // mobilda tanlanganda yopiladi
                  }}
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

      {/* Mobil fon (overlay) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}
    </>
  );
}
