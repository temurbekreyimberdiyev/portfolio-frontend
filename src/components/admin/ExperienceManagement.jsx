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
import axios from "axios";

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formLang, setFormLang] = useState("uz");
  const [viewLang, setViewLang] = useState("uz");

  const [company, setCompany] = useState({ uz: "", en: "", ru: "" });
  const [role, setRole] = useState({ uz: "", en: "", ru: "" });
  const [description, setDescription] = useState({ uz: "", en: "", ru: "" });
  const [logo, setLogo] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [current, setCurrent] = useState(false);

  const API_URL = "http://127.0.0.1:8000/api/experiences/";

  // Fetch experiences from backend
  const fetchExperiences = async () => {
    try {
      const res = await axios.get(API_URL);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete experience:", err);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("company_uz", company.uz);
    payload.append("company_en", company.en);
    payload.append("company_ru", company.ru);
    payload.append("role_uz", role.uz);
    payload.append("role_en", role.en);
    payload.append("role_ru", role.ru);
    payload.append("description_uz", description.uz);
    payload.append("description_en", description.en);
    payload.append("description_ru", description.ru);
    payload.append("start_date", startDate);
    payload.append("end_date", current ? "" : endDate);
    payload.append("current", current);
    if (logo && logo instanceof File) payload.append("logo", logo);

    try {
      if (editingId) {
        await axios.put(`${API_URL}${editingId}/`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      fetchExperiences();
      setIsDialogOpen(false);
      clearForm();
    } catch (err) {
      console.error("Failed to save experience:", err);
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

            {/* RESPONSIVE DIALOG */}
            <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-lg sm:max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Experience" : "Add New Experience"}
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-wrap gap-2 mb-4">
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
                  <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
                    className="w-4 h-4"
                  />
                  <Label className="cursor-pointer text-sm sm:text-base">
                    Currently working here
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
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
