import { useState, useEffect } from "react";
import { Upload, Trash2, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import exampleAvatar from "../../assets/avatar.png";

export default function HeroEditor() {
  const [avatarUrl, setAvatarUrl] = useState(exampleAvatar);
  const [cvFile, setCvFile] = useState(null);
  const [intro, setIntro] = useState("I do code and");
  const [introColorText, setIntroColorText] = useState("make content about it!");
  const [description, setDescription] = useState(
    "I am Temurbek Reyimberdiyev, a seasoned Full-Stack Software Engineer and IT Mentor with over 4 years of professional experience. I love mentoring aspiring developers and building modern, efficient, and cloud-driven software solutions."
  );
  const [showCvPreview, setShowCvPreview] = useState(false);

  // localStorage dan ma'lumotlarni olish
  useEffect(() => {
    const savedData = localStorage.getItem("heroData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setAvatarUrl(parsed.avatarUrl || exampleAvatar);
      setCvFile(parsed.cvFile || null);
      setIntro(parsed.intro || "");
      setIntroColorText(parsed.introColorText || "");
      setDescription(parsed.description || "");
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
    const data = {
      avatarUrl,
      cvFile,
      intro,
      introColorText,
      description,
    };
    localStorage.setItem("heroData", JSON.stringify(data));
    alert("Hero section updated successfully!");
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-3xl mb-2">Hero Section Editor</h2>
        <p className="text-white/60">Customize your hero section content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* -------- EDITOR PANEL -------- */}
        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10">
            <Label>Avatar Image</Label>
            <div className="mt-4 flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload New</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* CV Upload */}
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10">
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
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload CV (.pdf)</span>
                  </div>
                </label>
              ) : (
                <div className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-md">
                  <span className="text-sm truncate">{cvFile.name}</span>
                  <div className="flex gap-2">
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

          {/* Text Inputs */}
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 space-y-4">
            <div>
              <Label htmlFor="intro">Intro Text</Label>
              <Input
                id="intro"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="bg-white/5 border-white/10 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="introColorText">Colored Intro Text</Label>
              <Input
                id="introColorText"
                value={introColorText}
                onChange={(e) => setIntroColorText(e.target.value)}
                className="bg-white/5 border-white/10 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Description Text</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/5 border-white/10 mt-2"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* -------- PREVIEW PANEL -------- */}
        <div className="rounded-2xl p-8 bg-white/5 backdrop-blur-lg border border-white/10">
          <h3 className="text-lg mb-4 text-white/60">Preview</h3>
          <div className="text-center space-y-6">
            <div className="relative w-36 h-36 mx-auto rounded-full p-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="rounded-full object-cover w-full h-full"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold">{intro}</h1>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                {introColorText}
              </h1>
              <p className="max-w-xl mx-auto text-white/70">{description}</p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                Get In Touch
              </Button>
              {cvFile && (
                <a
                  href={cvFile.url}
                  download={cvFile.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-white/20">
                    Download CV
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showCvPreview && cvFile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-xl w-11/12 md:w-3/4 h-[80vh] p-4 relative">
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
