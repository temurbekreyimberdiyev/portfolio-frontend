import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Tokenni localStorage’dan olamiz
  const token = localStorage.getItem("access_token");

  // Agar token bo‘lmasa login sahifasiga yo‘naltiramiz
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token mavjud bo‘lsa, route’ga ruxsat
  return children;
}
