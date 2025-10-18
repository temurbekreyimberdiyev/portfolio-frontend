import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

function App() {
  const [theme, setTheme] = useState("dark");

  // Avvalgi tanlovni localStorage’dan o‘qish
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Tema o‘zgartirish funksiyasi
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#000319] dark:text-white transition-all duration-500">
      {/* Global container */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
      </div>
      <Contact />
    </div>
  );
}

export default App;
