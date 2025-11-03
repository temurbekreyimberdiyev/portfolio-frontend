import { useState, useEffect } from "react";
import { Upload, Trash2, Eye, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import exampleAvatar from "../../assets/avatar.png";

export default function HeroEditor() {
  const [language, setLanguage] = useState("en");
  const [avatarUrl, setAvatarUrl] = useState(exampleAvatar);
  const [cvFile, setCvFile] = useState(null);
  const [showCvPreview, setShowCvPreview] = useState(false);

  const [texts, setTexts] = useState({
    en: {
      intro: "I do code and",
      introColorText: "make content about it!",
      description:
        "I am Temurbek Reyimberdiyev, a seasoned Full-Stack Software Engineer and IT Mentor with over 4 years of professional experience. I love mentoring aspiring developers and building modern, efficient, and cloud-driven software solutions.",
      buttonText: "Get in Touch",
    },
    uz: {
      intro: "Men dasturlayman va",
      introColorText: "bu haqida kontent tayyorlayman!",
      description:
        "Men Temurbek Reyimberdiyevman, 4 yildan ortiq tajribaga ega Full-Stack dasturchi va IT mentorman. Yosh dasturchilarni o‘qitish va zamonaviy dasturiy yechimlar yaratishni yaxshi ko‘raman.",
      buttonText: "Bog‘lanish",
    },
    ru: {
      intro: "Я программирую и",
      introColorText: "создаю контент об этом!",
      description:
        "Я Темурбек Рейимбердиев — опытный Full-Stack разработчик и IT-наставник с более чем 4-летним опытом. Мне нравится обучать начинающих разработчиков и создавать современные программные решения.",
      buttonText: "Связаться",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("heroData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setAvatarUrl(parsed.avatarUrl || exampleAvatar);
      setCvFile(parsed.cvFile || null);
      setTexts(parsed.texts || texts);
    }
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
    setCvFile({ name: file.name, url: fileUrl });
  };

  const handleCvDelete = () => setCvFile(null);

  const handleSave = () => {
    const data = { avatarUrl, cvFile, texts };
    localStorage.setItem("heroData", JSON.stringify(data));
    alert("Hero section updated successfully!");
  };

  const updateText = (field, value) => {
    setTexts((prev) => ({
      ...prev,
      [language]: { ...prev[language], [field]: value },
    }));
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
            {["intro", "introColorText", "description", "buttonText"].map(
              (field) => (
                <div key={field}>
                  <Label>
                    {field === "intro"
                      ? `Intro Text (${language.toUpperCase()})`
                      : field === "introColorText"
                      ? `Colored Intro Text (${language.toUpperCase()})`
                      : field === "description"
                      ? `Description (${language.toUpperCase()})`
                      : `Button Text (${language.toUpperCase()})`}
                  </Label>
                  <Input
                    value={texts[language][field]}
                    onChange={(e) => updateText(field, e.target.value)}
                    className="bg-white/5 border-white/10 mt-2 text-sm sm:text-base"
                  />
                </div>
              )
            )}
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
