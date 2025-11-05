import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // lucide-react ikonlarini import qilamiz

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // password ko‘rsatish flag
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      navigate("/admin");
    } else {
      setError("Username yoki password noto‘g‘ri!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-indigo-900 p-4">
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
          Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="w-full" onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/50 border border-white/20 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/20 transition"
            />
          </div>

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"} // ko‘rsatish/hidden
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/50 border border-white/20 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/20 transition pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white/50 hover:text-white/20 transition"
            >
              {showPassword ? <EyeOff className=" text-black w-5 h-5" /> : <Eye className="text-black w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transform transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-white/50 text-sm mt-6 text-center">
          © 2025 Temurbek Reyimberdiyev. All rights reserved.
        </p>
      </div>

      {/* Dynamic liquid light effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-72 h-72 bg-purple-500/30 rounded-full -top-20 -left-20 filter blur-3xl animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-pink-500/30 rounded-full -bottom-20 -right-20 filter blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}
