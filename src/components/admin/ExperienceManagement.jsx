import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
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
import API from "../../api/axios";

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewLang, setViewLang] = useState("uz");

  const [company, setCompany] = useState({ uz: "", en: "", ru: "" });
  const [role, setRole] = useState({ uz: "", en: "", ru: "" });
  const [description, setDescription] = useState({ uz: "", en: "", ru: "" });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [current, setCurrent] = useState(false);

  // O'CHIRISH TASDIQLASH MODALI UCHUN
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [expToDelete, setExpToDelete] = useState(null);

  // --- FETCH EXPERIENCES ---
  const fetchExperiences = async () => {
    try {
      const res = await API.get("experiences/");
      setExperiences(
        res.data.map((exp) => ({
          id: exp.id,
          company: {
            uz: exp.company_uz,
            en: exp.company_en,
            ru: exp.company_ru,
          },
          role: {
            uz: exp.role_uz,
            en: exp.role_en,
            ru: exp.role_ru,
          },
          description: {
            uz: exp.description_uz,
            en: exp.description_en,
            ru: exp.description_ru,
          },
          logo: exp.logo,
          startDate: exp.start_date,
          endDate: exp.end_date,
          current: exp.current,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch experiences:", err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openNew = () => {
    clearForm();
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const clearForm = () => {
    setCompany({ uz: "", en: "", ru: "" });
    setRole({ uz: "", en: "", ru: "" });
    setDescription({ uz: "", en: "", ru: "" });
    setLogoFile(null);
    setLogoPreview(null);
    setStartDate("");
    setEndDate("");
    setCurrent(false);
  };

  // --- EDIT ---
  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setCompany(exp.company);
    setRole(exp.role);
    setDescription(exp.description);
    setLogoPreview(exp.logo);
    setLogoFile(null);
    setStartDate(exp.startDate ? exp.startDate.slice(0, 7) : "");
    setEndDate(exp.endDate ? exp.endDate.slice(0, 7) : "");
    setCurrent(exp.current);
    setIsDialogOpen(true);
  };

  // --- DELETE WITH CONFIRM ---
  const handleDelete = (id) => {
    setExpToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!expToDelete) return;

    try {
      await API.delete(`experiences/${expToDelete}/`);
      setExperiences((prev) => prev.filter((e) => e.id !== expToDelete));
      setDeleteConfirmOpen(false);
      setExpToDelete(null);
    } catch (err) {
      console.error("O‘chirishda xato:", err);
      alert("O‘chirishda xato yuz berdi!");
    }
  };

  // --- LOGO UPLOAD ---
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // --- SAVE ---
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("company_uz", company.uz);
    formData.append("company_en", company.en);
    formData.append("company_ru", company.ru);
    formData.append("role_uz", role.uz);
    formData.append("role_en", role.en);
    formData.append("role_ru", role.ru);
    formData.append("description_uz", description.uz);
    formData.append("description_en", description.en);
    formData.append("description_ru", description.ru);

    formData.append("start_date", startDate ? `${startDate}-01` : "");
    formData.append("end_date", current ? "" : (endDate ? `${endDate}-01` : ""));
    formData.append("current", current);

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      if (editingId) {
        await API.put(`experiences/${editingId}/`, formData);
      } else {
        await API.post("experiences/", formData);
      }
      fetchExperiences();
      setIsDialogOpen(false);
      clearForm();
    } catch (err) {
      console.error("Saqlashda xato:", err.response?.data || err);
      alert("Xato: " + JSON.stringify(err.response?.data || err.message));
    }
  };

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
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl mb-2">Experience Management</h2>
          <p className="text-white/60 text-sm sm:text-base">
            Manage work experiences
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end w-full sm:w-auto">
          <LanguageSwitcherView />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openNew}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-lg sm:max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-xl p-6">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {editingId ? "Edit Experience" : "Add New Experience"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSave} className="space-y-6 mt-4">
                {/* UZBEK */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                  <h4 className="text-sm font-semibold text-purple-400">O'zbekcha (UZ)</h4>
                  <div>
                    <Label>Kompaniya nomi (UZ)</Label>
                    <Input
                      value={company.uz}
                      onChange={(e) => setCompany({ ...company, uz: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label>Lavozim (UZ)</Label>
                    <Input
                      value={role.uz}
                      onChange={(e) => setRole({ ...role, uz: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label>Tavsif (UZ)</Label>
                    <Textarea
                      rows={3}
                      value={description.uz}
                      onChange={(e) => setDescription({ ...description, uz: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>

                {/* ENGLISH */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                  <h4 className="text-sm font-semibold text-blue-400">English (EN)</h4>
                  <div>
                    <Label>Company Name (EN)</Label>
                    <Input
                      value={company.en}
                      onChange={(e) => setCompany({ ...company, en: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label>Position (EN)</Label>
                    <Input
                      value={role.en}
                      onChange={(e) => setRole({ ...role, en: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label>Description (EN)</Label>
                    <Textarea
                      rows={3}
                      value={description.en}
                      onChange={(e) => setDescription({ ...description, en: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>

                {/* RUSSIAN */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                  <h4 className="text-sm font-semibold text-green-400">Русский (RU)</h4>
                  <div>
                    <Label>Название компании (RU)</Label>
                    <Input
                      value={company.ru}
                      onChange={(e) => setCompany({ ...company, ru: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label>Должность (RU)</Label>
                    <Input
                      value={role.ru}
                      onChange={(e) => setRole({ ...role, ru: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label>Описание (RU)</Label>
                    <Textarea
                      rows={3}
                      value={description.ru}
                      onChange={(e) => setDescription({ ...description, ru: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <Label>Company Logo</Label>
                  <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="logo"
                        className="w-16 h-16 object-contain rounded-md bg-white/5 p-1 border border-white/10"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-white/40">
                        No Logo
                      </div>
                    )}
                    <label className="cursor-pointer w-full sm:w-auto">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        Upload
                      </div>
                    </label>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-4 h-4 rounded border-white/30"
                  />
                  <Label className="cursor-pointer">Currently working here</Label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      clearForm();
                    }}
                    className="border-white/10 w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 w-full sm:w-auto"
                  >
                    Save Experience
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Haqiqatan o‘chirmoqchimisiz?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white/70">
              Bu tajriba butunlay o‘chib ketadi va qayta tiklab bo‘lmaydi.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteConfirmOpen(false);
                setExpToDelete(null);
              }}
              className="border-white/20 hover:bg-white/10"
            >
              Bekor qilish
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Ha, o‘chirish
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Timeline */}
      <div className="relative mt-6">
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500" />

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-16 sm:pl-20">
              <div className="absolute left-4 sm:left-6 top-6 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-4 border-[#0a0a1a]" />

              <div className="rounded-2xl p-4 sm:p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex flex-wrap items-start justify-between mb-3">
                  <div className="flex items-start gap-3 mb-2 sm:mb-0 w-full sm:w-auto">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt="logo"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-white/5 p-1 object-contain"
                      />
                    )}
                    <div>
                      <h3 className="text-lg sm:text-xl mb-1">
                        {exp.role[viewLang] || exp.role.en}
                      </h3>
                      <p className="text-white/60 text-sm sm:text-base">
                        {exp.company[viewLang] || exp.company.en}
                      </p>
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

                <p className="text-white/70 text-sm sm:text-base mb-4">
                  {exp.description[viewLang] || exp.description.en}
                </p>

                <p className="text-xs sm:text-sm text-white/50">
                  {new Date(exp.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}{" "}
                  -{" "}
                  {exp.current
                    ? "Present"
                    : exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })
                    : "Present"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}