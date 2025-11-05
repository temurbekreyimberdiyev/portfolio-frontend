import {
  Moon,
  Sun,
  Globe,
  Lock,
  Eye,
  EyeOff,
  User,
  Shield,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPanel() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");

  // Joriy ma'lumotlar (faqat ko'rish uchun)
  const [currentUsername, setCurrentUsername] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // O'zgartirish uchun maydonlar
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Joriy foydalanuvchi ma'lumotlarini yuklash
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/user/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCurrentUsername(data.username);
          setNewUsername(data.username); // o'zgartirish uchun ham
        } else if (res.status === 401) {
          await refreshToken();
          fetchUser();
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [navigate]);

  // Tokenni yangilash
  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access_token", data.access);
        return data.access;
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      localStorage.clear();
      navigate("/login");
    }
  };

  // Saqlash tugmasi
  const handleSave = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Validatsiya
    if (newPassword && newPassword !== confirmPassword) {
      setError("Yangi parollar mos kelmaydi!");
      setLoading(false);
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError("Parol kamida 6 belgidan iborat bo'lishi kerak!");
      setLoading(false);
      return;
    }

    if (newUsername === currentUsername && !newPassword) {
      setError("Hech qanday o'zgarish kiritilmadi!");
      setLoading(false);
      return;
    }

    try {
      const payload = {};

      if (newUsername && newUsername !== currentUsername) {
        payload.username = newUsername;
      }

      if (newPassword) {
        // Joriy parolni backendga yuborish kerak
        const currentPass = prompt(
          "Parolni o'zgartirish uchun joriy parolni kiriting:"
        );
        if (!currentPass) {
          setError("Joriy parol kiritilmadi!");
          setLoading(false);
          return;
        }
        payload.current_password = currentPass;
        payload.new_password = newPassword;
      }

      const res = await fetch("http://127.0.0.1:8000/api/change-password/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("Ma'lumotlar muvaffaqiyatli saqlandi!");
        setCurrentUsername(newUsername);
        setNewPassword("");
        setConfirmPassword("");
        setShowNew(false);
        setShowConfirm(false);
      } else if (res.status === 401) {
        await refreshToken();
        return handleSave();
      } else {
        const err = await res.json();
        setError(
          err.detail ||
            err.current_password?.[0] ||
            err.username?.[0] ||
            "Xatolik yuz berdi"
        );
      }
    } catch (err) {
      setError("Internet aloqasi yo'q yoki server xatosi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 pb-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Settings</h2>
        <p className="text-white/60 text-sm sm:text-base">
          Manage your admin panel preferences
        </p>
      </div>

      {/* Theme & Language Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <div className="rounded-2xl p-5 sm:p-6 bg-white/5 backdrop-blur-lg border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
              {theme === "dark" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-lg">Theme Mode</h3>
              <p className="text-sm text-white/60">Choose Light or Dark</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border transition-all ${
                theme === "light"
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <Sun className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Light</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border transition-all ${
                theme === "dark"
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <Moon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Dark</span>
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="rounded-2xl p-5 sm:p-6 bg-white/5 backdrop-blur-lg border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Language</h3>
              <p className="text-sm text-white/60">Select content language</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { code: "en", label: "English", short: "EN" },
              { code: "uz", label: "O'zbekcha", short: "UZ" },
              { code: "ru", label: "Русский", short: "RU" },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full p-4 rounded-xl border transition-all text-left ${
                  language === lang.code
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg">{lang.label}</div>
                    <div className="text-xs text-white/50">{lang.short}</div>
                  </div>
                  {language === lang.code && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="rounded-2xl p-5 sm:p-6 bg-white/5 backdrop-blur-lg border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-lg">Security</h3>
            <p className="text-sm text-white/60">
              Update your username and password
            </p>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-400 text-sm text-center mb-4">{success}</p>
        )}

        {/* Joriy hisob ma'lumotlari */}
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
          <h4 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Joriy hisob ma'lumotlari
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Joriy Username */}
            <div>
              <Label className="text-white/60">Username</Label>
              <div className="mt-1 px-3 py-2.5 rounded-lg bg-white/10 text-white font-medium flex items-center">
                <User className="w-4 h-4 mr-2 text-white/50" />
                {newUsername || "Yuklanmoqda..."}
              </div>
            </div>

            {/* Joriy Parol (faqat ko'rish uchun) */}
            <div className="relative">
              <Label className="text-white/60">Current Password</Label>
              <div className="mt-1 px-3 py-2.5 rounded-lg bg-white/10 flex items-center justify-between">
                <span className="text-white font-medium">
                  {showCurrentPassword ? newPassword : "••••••••"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="text-white/50 hover:text-white/80 transition"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* O'zgartirish maydonlari */}
        <div className="space-y-6">
          <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
            <User className="w-4 h-4" /> Yangi ma'lumotlarni kiriting
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Yangi Username */}
            <div>
              <Label htmlFor="new-username">Yangi Username</Label>
              <Input
                id="new-username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Yangi username"
                className="bg-white/5 border-white/10 mt-2"
              />
            </div>

            {/* Yangi parol */}
            <div className="relative">
              <Label htmlFor="new-password">Yangi parol</Label>
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/5 border-white/10 mt-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-10 text-white/50 hover:text-white/80 transition"
              >
                {showNew ? (
                  <EyeOff className="text-black w-4 h-4" />
                ) : (
                  <Eye className="text-black w-4 h-4" />
                )}
              </button>
            </div>

            {/* Parolni tasdiqlash */}
            <div className="relative">
              <Label htmlFor="confirm-password">Parolni tasdiqlash</Label>
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/5 border-white/10 mt-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-10 text-white/50 hover:text-white/80 transition"
              >
                {showConfirm ? (
                  <EyeOff className="text-black w-4 h-4" />
                ) : (
                  <Eye className="text-black w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 w-full sm:w-auto disabled:opacity-50"
            >
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
