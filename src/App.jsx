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
    <div
      className="
        min-h-screen 
        transition-all duration-500
        bg-gradient-to-b from-white via-sky-100 to-blue-200
        dark:bg-gradient-to-b dark:from-[#000319] dark:via-[#0b1120] dark:to-[#1e293b]
        text-black dark:text-white
      "
    >
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
