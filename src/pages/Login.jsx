import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-4">
      <div
        className="
          w-full max-w-sm 
          bg-white/10 backdrop-blur-md border border-white/30 
          rounded-3xl shadow-2xl p-8
          flex flex-col items-center
        "
      >
        <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
          Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="w-full" onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl 
                bg-white/20 text-white placeholder-white/70 
                border border-white/30 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-purple-400 
                transition
              "
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl 
                bg-white/20 text-white placeholder-white/70 
                border border-white/30 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-purple-400 
                transition
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full py-3 rounded-xl 
              bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
              text-white font-semibold shadow-lg 
              hover:scale-105 transform transition duration-300
            "
          >
            Login
          </button>
        </form>

        <p className="text-white/70 text-sm mt-6 text-center">
          © 2025 Your Name. All rights reserved.
        </p>
      </div>
    </div>
  );
}
