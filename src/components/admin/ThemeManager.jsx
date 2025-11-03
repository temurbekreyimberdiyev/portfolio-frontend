// src/components/admin/ThemeManager.jsx

// Admin panel uchun dark/light holatini olish
export const getAdminTheme = () => {
  return localStorage.getItem("admin_theme") || "dark";
};

// Admin panel uchun dark/light holatini o‘rnatish
export const setAdminTheme = (theme) => {
  localStorage.setItem("admin_theme", theme);

  // HTML elementga "dark" classini qo‘shish yoki olib tashlash
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Boshqa komponentlarga xabar berish
  window.dispatchEvent(new Event("adminThemeChanged"));
};
