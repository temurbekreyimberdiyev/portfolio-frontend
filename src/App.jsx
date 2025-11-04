import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Portfolio sahifa */}
        <Route path="/" element={<Home toggleTheme={toggleTheme} theme={theme} />} />

        {/* Login sahifa */}
        <Route path="/login" element={<Login />} />

        {/* Admin panel Protected */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Admin toggleTheme={toggleTheme} theme={theme} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
