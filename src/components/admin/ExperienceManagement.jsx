import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function ExperienceManagement() {
  const initialExperiences = [
    {
      id: "1",
      logo:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiI+PHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjMjI4OGZmIiByeD0iOCI+PC9yZWN0Pjwvc3ZnPg==",
      company: {
        uz: "Yetakchi kompaniya",
        en: "Leading Company",
        ru: "Ведущая компания",
      },
      role: {
        uz: "Katta Frontend Dasturchi",
        en: "Senior Frontend Developer",
        ru: "Старший Frontend Разработчик",
      },
      description: {
        uz: "Frontend jamoasini boshqarish, kengaytiriladigan yechimlarni yaratish",
        en: "Leading frontend development team, architecting scalable solutions",
        ru: "Руководство командой фронтенда, проектирование масштабируемых решений",
      },
      startDate: "2023-01",
      endDate: "",
      current: true,
    },
  ];

  const [experiences, setExperiences] = useState(initialExperiences);

  // Dialog va form holati
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Inputlar uchun til tablari
  const [formLang, setFormLang] = useState("uz");

  // Dashboarddagi til switcher
  const [viewLang, setViewLang] = useState("uz");

  // Ma’lumotlar
  const [company, setCompany] = useState({ uz: "", en: "", ru: "" });
  const [role, setRole] = useState({ uz: "", en: "", ru: "" });
  const [description, setDescription] = useState({ uz: "", en: "", ru: "" });
  const [logo, setLogo] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [current, setCurrent] = useState(false);

  const openNew = () => {
    clearForm();
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const clearForm = () => {
    setCompany({ uz: "", en: "", ru: "" });
    setRole({ uz: "", en: "", ru: "" });
    setDescription({ uz: "", en: "", ru: "" });
    setLogo(null);
    setStartDate("");
    setEndDate("");
    setCurrent(false);
    setFormLang("uz");
  };

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setCompany(exp.company);
    setRole(exp.role);
    setDescription(exp.description);
    setLogo(exp.logo);
    setStartDate(exp.startDate);
    setEndDate(exp.endDate);
    setCurrent(exp.current);
    setFormLang("uz");
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newExp = {
      id: editingId || Date.now().toString(),
      company,
      role,
      description,
      logo,
      startDate,
      endDate: current ? "" : endDate,
      current,
    };

    if (editingId) {
      setExperiences((prev) => prev.map((exp) => (exp.id === editingId ? newExp : exp)));
    } else {
      setExperiences((prev) => [newExp, ...prev]);
    }

    setIsDialogOpen(false);
    clearForm();
  };

  useEffect(() => {
    if (!isDialogOpen) setEditingId(null);
  }, [isDialogOpen]);

  // Language Switcher (View)
  const LanguageSwitcherView = () => (
    <div className="flex items-center gap-2 border border-white/10 rounded-xl p-1 bg-white/5">
      {["uz", "en", "ru"].map((lang) => (
        <button
          key={lang}
          onClick={() => setViewLang(lang)}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            viewLang === lang
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-3xl mb-2">Experience Management</h2>
          <p className="text-white/60">Manage multilingual work experiences</p>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcherView />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openNew}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Experience" : "Add New Experience"}
                </DialogTitle>
              </DialogHeader>

              {/* Language tabs for input form */}
              <div className="flex gap-2 mb-4">
                {["uz", "en", "ru"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setFormLang(lang)}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      formLang === lang
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <Label>Company Name ({formLang.toUpperCase()})</Label>
                  <Input
                    value={company[formLang]}
                    onChange={(e) =>
                      setCompany({ ...company, [formLang]: e.target.value })
                    }
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>

                <div>
                  <Label>Role / Position ({formLang.toUpperCase()})</Label>
                  <Input
                    value={role[formLang]}
                    onChange={(e) =>
                      setRole({ ...role, [formLang]: e.target.value })
                    }
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>

                <div>
                  <Label>Description ({formLang.toUpperCase()})</Label>
                  <Textarea
                    rows={3}
                    value={description[formLang]}
                    onChange={(e) =>
                      setDescription({ ...description, [formLang]: e.target.value })
                    }
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>

                {/* Logo Upload */}
                <div>
                  <Label>Company Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    {logo ? (
                      <img
                        src={logo}
                        alt="logo"
                        className="w-16 h-16 object-contain rounded-md bg-white/5 p-1 border border-white/10"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-white/40">
                        No Logo
                      </div>
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        Upload
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      disabled={current}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={current}
                    onChange={(e) => setCurrent(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label className="cursor-pointer">Currently working here</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-blue-500"
                  >
                    Save Experience
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500" />

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-20">
              <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-4 border-[#0a0a1a]" />

              <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {exp.logo && (
                        <img
                          src={exp.logo}
                          alt="logo"
                          className="w-12 h-12 rounded-md bg-white/5 p-1 object-contain"
                        />
                      )}
                      <div>
                        <h3 className="text-xl mb-1">
                          {exp.role[viewLang] || exp.role.en}
                        </h3>
                        <p className="text-white/60">
                          {exp.company[viewLang] || exp.company.en}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-white/70 mb-4">
                  {exp.description[viewLang] || exp.description.en}
                </p>

                <p className="text-sm text-white/50">
                  {new Date(exp.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}{" "}
                  -{" "}
                  {exp.current
                    ? "Present"
                    : new Date(exp.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
