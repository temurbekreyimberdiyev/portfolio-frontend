import { useState, useEffect } from "react";
import { Upload, Trash2, Eye, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import exampleAvatar from "../../assets/avatar.png";

export default function HeroEditor() {
  const [language, setLanguage] = useState("en");
  const [avatarUrl, setAvatarUrl] = useState(exampleAvatar);
  const [cvFile, setCvFile] = useState(null);
  const [showCvPreview, setShowCvPreview] = useState(false);

  const [texts, setTexts] = useState({
    en: { intro: "", introColorText: "", description: "", buttonText: "Get in Touch" },
    uz: { intro: "", introColorText: "", description: "", buttonText: "Bog‘lanish" },
    ru: { intro: "", introColorText: "", description: "", buttonText: "Связаться" },
  });

  const API_URL = "http://127.0.0.1:8000/api/hero/1/";

  // Fetch hero data from backend
  const fetchHeroData = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data;
      setAvatarUrl(data.avatar || exampleAvatar);
      if (data.cv_file) setCvFile({ url: data.cv_file, name: data.cv_file.split("/").pop() });
      setTexts({
        en: {
          intro: data.intro_en || "",
          introColorText: data.introColorText_en || "",
          description: data.description_en || "",
          buttonText: "Get in Touch",
        },
        uz: {
          intro: data.intro_uz || "",
          introColorText: data.introColorText_uz || "",
          description: data.description_uz || "",
          buttonText: "Bog‘lanish",
        },
        ru: {
          intro: data.intro_ru || "",
          introColorText: data.introColorText_ru || "",
          description: data.description_ru || "",
          buttonText: "Связаться",
        },
      });
    } catch (err) {
      console.error("Failed to fetch hero data:", err);
    }
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file!");
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setCvFile({ name: file.name, file, url: fileUrl });
  };

  const handleCvDelete = () => setCvFile(null);

  const updateText = (field, value) => {
    setTexts((prev) => ({
      ...prev,
      [language]: { ...prev[language], [field]: value },
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("intro_en", texts.en.intro);
      formData.append("intro_uz", texts.uz.intro);
      formData.append("intro_ru", texts.ru.intro);
      formData.append("introColorText_en", texts.en.introColorText);
      formData.append("introColorText_uz", texts.uz.introColorText);
      formData.append("introColorText_ru", texts.ru.introColorText);
      formData.append("description_en", texts.en.description);
      formData.append("description_uz", texts.uz.description);
      formData.append("description_ru", texts.ru.description);

      if (avatarUrl && avatarUrl !== exampleAvatar) {
        // Convert base64 to Blob if it's a new uploaded image
        if (avatarUrl.startsWith("data:image")) {
          const res = await fetch(avatarUrl);
          const blob = await res.blob();
          formData.append("avatar", blob, "avatar.png");
        }
      }

      if (cvFile?.file) {
        formData.append("cv_file", cvFile.file);
      }

      await axios.put(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Hero section updated successfully!");
      fetchHeroData();
    } catch (err) {
      console.error("Failed to save hero data:", err);
      alert("Failed to update hero section!");
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl mb-1">Hero Section Editor</h2>
          <p className="text-white/60">Customize your hero section content</p>
        </div>

        {/* LANGUAGE SWITCH */}
        <div className="flex flex-wrap items-center gap-2">
          <Globe className="w-5 h-5 text-white/70" />
          {["uz", "en", "ru"].map((lang) => (
            <Button
              key={lang}
              onClick={() => setLanguage(lang)}
              variant={language === lang ? "default" : "outline"}
              className={`uppercase px-4 py-2 text-sm ${
                language === lang
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "border-white/20 text-white/70 hover:text-white"
              }`}
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT PANEL */}
        <div className="space-y-6">
          {/* Avatar */}
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <Label>Avatar Image</Label>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm sm:text-base">
                  <Upload className="w-4 h-4" />
                  <span>Upload New</span>
                </div>
              </label>
            </div>
          </div>

          {/* CV UPLOAD */}
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <Label>CV File</Label>
            <div className="mt-4 flex flex-col gap-3">
              {!cvFile ? (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleCvUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm sm:text-base">
                    <Upload className="w-4 h-4" />
                    <span>Upload CV (.pdf)</span>
                  </div>
                </label>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white/5 px-4 py-2 rounded-md">
                  <span className="text-sm truncate">{cvFile.name}</span>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowCvPreview(true)}
                      className="text-cyan-400 hover:text-cyan-500"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCvDelete}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* TEXT INPUTS */}
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10 space-y-4">
            {["intro", "introColorText", "description"].map((field) => (
              <div key={field}>
                <Label>
                  {field === "intro"
                    ? `Intro Text (${language.toUpperCase()})`
                    : field === "introColorText"
                    ? `Colored Intro Text (${language.toUpperCase()})`
                    : `Description (${language.toUpperCase()})`}
                </Label>
                <Input
                  value={texts[language][field]}
                  onChange={(e) => updateText(field, e.target.value)}
                  className="bg-white/5 border-white/10 mt-2 text-sm sm:text-base"
                />
              </div>
            ))}
            <Button
              onClick={handleSave}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-sm sm:text-base"
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL (PREVIEW) */}
        <div className="rounded-2xl p-6 sm:p-8 bg-white/5 border border-white/10 text-center">
          <h3 className="text-lg mb-4 text-white/60">
            Preview ({language.toUpperCase()})
          </h3>
          <div className="space-y-6">
            <div className="relative w-28 sm:w-36 h-28 sm:h-36 mx-auto rounded-full p-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="rounded-full object-cover w-full h-full"
              />
            </div>

            <div className="space-y-2 px-2">
              <h1 className="text-2xl sm:text-4xl font-bold">
                {texts[language].intro}
              </h1>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                {texts[language].introColorText}
              </h1>
              <p className="max-w-xl mx-auto text-white/70 text-sm sm:text-base">
                {texts[language].description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 w-full sm:w-auto">
                {texts[language].buttonText}
              </Button>
              {cvFile && (
                <a
                  href={cvFile.url}
                  download={cvFile.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    className="border-white/20 w-full sm:w-auto"
                  >
                    Download CV
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PDF PREVIEW MODAL */}
      {showCvPreview && cvFile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl w-full max-w-5xl h-[80vh] p-4 relative">
            <button
              onClick={() => setShowCvPreview(false)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1"
            >
              ✕
            </button>
            <iframe
              src={cvFile.url}
              title="CV Preview"
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
