import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Upload } from "lucide-react";
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

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedTech, setSelectedTech] = useState([]);
  const [language, setLanguage] = useState("uz");
  const [title, setTitle] = useState({ uz: "", en: "", ru: "" });
  const [description, setDescription] = useState({ uz: "", en: "", ru: "" });
  const [imageFile, setImageFile] = useState(null);

  // O'CHIRISH TASDIQLASH MODALI UCHUN
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // --- FETCH SKILLS FROM BACKEND ---
  const fetchSkills = async () => {
    try {
      const res = await API.get("skills/");
      setSkills(res.data);
    } catch (err) {
      console.error("Skills yuklashda xato:", err);
    }
  };

  // --- FETCH PROJECTS FROM BACKEND ---
  const fetchProjects = async () => {
    try {
      const res = await API.get("projects/");
      const data = res.data.map((p) => ({
        id: p.id,
        title: { uz: p.title_uz, en: p.title_en, ru: p.title_ru },
        description: { uz: p.description_uz, en: p.description_en, ru: p.description_ru },
        techStack: p.skills.map((s) => ({ id: s.id, name: s.name, icon: s.icon })),
        link: p.link,
        image: p.image,
      }));
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchProjects();
  }, []);

  // --- DELETE PROJECT WITH CONFIRM ---
  const handleDelete = (id) => {
    setProjectToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      await API.delete(`projects/${projectToDelete}/`);
      setProjects(projects.filter((p) => p.id !== projectToDelete));
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error("O‘chirishda xato:", err);
      alert("O‘chirishda xato yuz berdi!");
    }
  };

  // --- EDIT PROJECT ---
  const handleEdit = (project) => {
    setEditingProject(project);
    setSelectedTech(project.techStack.map((s) => s.id));
    setPreviewImage(project.image || null);
    setImageFile(null);
    setTitle(project.title || { uz: "", en: "", ru: "" });
    setDescription(project.description || { uz: "", en: "", ru: "" });
    setIsDialogOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTechToggle = (skillId) => {
    setSelectedTech((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  // --- SAVE PROJECT (CREATE OR UPDATE) ---
  const handleSave = async (e) => {
    e.preventDefault();
    let res;

    try {
      if (editingProject) {
        if (imageFile) {
          const formData = new FormData();
          formData.append("title_uz", title.uz);
          formData.append("title_en", title.en);
          formData.append("title_ru", title.ru);
          formData.append("description_uz", description.uz);
          formData.append("description_en", description.en);
          formData.append("description_ru", description.ru);
          formData.append("link", e.currentTarget.link.value);

          selectedTech.forEach((id) => {
            formData.append("skills_ids", id);
          });

          formData.append("image", imageFile);

          res = await API.put(`projects/${editingProject.id}/`, formData);
        } else {
          const payload = {
            title_uz: title.uz,
            title_en: title.en,
            title_ru: title.ru,
            description_uz: description.uz,
            description_en: description.en,
            description_ru: description.ru,
            link: e.currentTarget.link.value,
            skills_ids: selectedTech,
          };
          res = await API.put(`projects/${editingProject.id}/`, payload, {
            headers: { "Content-Type": "application/json" },
          });
        }
      } else {
        // YANGI PROJECT
        if (imageFile) {
          const formData = new FormData();
          formData.append("title_uz", title.uz);
          formData.append("title_en", title.en);
          formData.append("title_ru", title.ru);
          formData.append("description_uz", description.uz);
          formData.append("description_en", description.en);
          formData.append("description_ru", description.ru);
          formData.append("link", e.currentTarget.link.value);

          selectedTech.forEach((id) => {
            formData.append("skills_ids", id);
          });

          formData.append("image", imageFile);

          res = await API.post("projects/", formData);
        } else {
          const payload = {
            title_uz: title.uz,
            title_en: title.en,
            title_ru: title.ru,
            description_uz: description.uz,
            description_en: description.en,
            description_ru: description.ru,
            link: e.currentTarget.link.value,
            skills_ids: selectedTech,
          };
          res = await API.post("projects/", payload, {
            headers: { "Content-Type": "application/json" },
          });
        }
      }

      const savedProject = {
        id: res.data.id,
        title: { uz: res.data.title_uz, en: res.data.title_en, ru: res.data.title_ru },
        description: {
          uz: res.data.description_uz,
          en: res.data.description_en,
          ru: res.data.description_ru,
        },
        techStack: res.data.skills.map((s) => ({
          id: s.id,
          name: s.name,
          icon: s.icon,
        })),
        link: res.data.link,
        image: res.data.image,
      };

      if (editingProject) {
        setProjects(projects.map((p) => (p.id === editingProject.id ? savedProject : p)));
      } else {
        setProjects([...projects, savedProject]);
      }

      setIsDialogOpen(false);
      setEditingProject(null);
      setSelectedTech([]);
      setPreviewImage(null);
      setImageFile(null);
      setTitle({ uz: "", en: "", ru: "" });
      setDescription({ uz: "", en: "", ru: "" });
    } catch (err) {
      console.error("Saqlashda xato:", err.response?.data);
      alert("XATO: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-2 border border-white/10 rounded-xl p-1 bg-white/5">
      {["uz", "en", "ru"].map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            language === lang
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
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl mb-2">Projects Management</h2>
          <p className="text-white/60 text-sm sm:text-base">
            Manage your portfolio projects (UZ / EN / RU)
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end w-full sm:w-auto">
          <LanguageSwitcher />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingProject(null);
                  setSelectedTech([]);
                  setPreviewImage(null);
                  setImageFile(null);
                  setTitle({ uz: "", en: "", ru: "" });
                  setDescription({ uz: "", en: "", ru: "" });
                }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#0a0a1a] border-white/10 text-white w-[95vw] sm:w-[90vw] md:w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSave} className="space-y-6 mt-4">
                {/* UZBEK */}
                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-purple-400">O'zbekcha (UZ)</h4>
                  <div>
                    <Label htmlFor="title_uz">Sarlavha (UZ)</Label>
                    <Input
                      id="title_uz"
                      value={title.uz}
                      onChange={(e) => setTitle({ ...title, uz: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="desc_uz">Tavsif (UZ)</Label>
                    <Textarea
                      id="desc_uz"
                      rows={3}
                      value={description.uz}
                      onChange={(e) => setDescription({ ...description, uz: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                {/* ENGLISH */}
                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-blue-400">English (EN)</h4>
                  <div>
                    <Label htmlFor="title_en">Title (EN)</Label>
                    <Input
                      id="title_en"
                      value={title.en}
                      onChange={(e) => setTitle({ ...title, en: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="desc_en">Description (EN)</Label>
                    <Textarea
                      id="desc_en"
                      rows={3}
                      value={description.en}
                      onChange={(e) => setDescription({ ...description, en: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                {/* RUSSIAN */}
                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-green-400">Русский (RU)</h4>
                  <div>
                    <Label htmlFor="title_ru">Заголовок (RU)</Label>
                    <Input
                      id="title_ru"
                      value={title.ru}
                      onChange={(e) => setTitle({ ...title, ru: e.target.value })}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="desc_ru">Описание (RU)</Label>
                    <Textarea
                      id="desc_ru"
                      rows={3}
                      value={description.ru}
                      onChange={(e) => setDescription({ ...description, ru: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <Label>Project Image</Label>
                  <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-24 h-24 rounded-lg object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                        No Image
                      </div>
                    )}
                    <label className="cursor-pointer w-full sm:w-auto">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <Label>Tech Stack</Label>
                  {skills.length === 0 ? (
                    <p className="text-white/40 text-sm mt-2">Skills yuklanmoqda...</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                      {skills.map((skill) => (
                        <label
                          key={skill.id}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                            selectedTech.includes(skill.id)
                              ? "bg-purple-500/20 border-purple-500 text-purple-300"
                              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedTech.includes(skill.id)}
                            onChange={() => handleTechToggle(skill.id)}
                            className="hidden"
                          />
                          {skill.icon ? (
                            <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                          ) : (
                            <div className="w-6 h-6 bg-white/10 rounded" />
                          )}
                          <span className="text-sm font-medium">{skill.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Link */}
                <div>
                  <Label htmlFor="link">Project Link</Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    defaultValue={editingProject?.link || ""}
                    placeholder="https://example.com"
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingProject(null);
                      setTitle({ uz: "", en: "", ru: "" });
                      setDescription({ uz: "", en: "", ru: "" });
                      setPreviewImage(null);
                      setImageFile(null);
                      setSelectedTech([]);
                    }}
                    className="border-white/10 w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 w-full sm:w-auto"
                  >
                    Save Project
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
              Bu loyiha butunlay o‘chib ketadi va qayta tiklab bo‘lmaydi.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteConfirmOpen(false);
                setProjectToDelete(null);
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl p-5 sm:p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title[language]}
                className="w-full h-44 sm:h-48 object-cover rounded-xl mb-4 border border-white/10"
              />
            )}

            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl">{project.title[language]}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-white/60 text-sm sm:text-base mb-4">
              {project.description[language]}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((skill) => (
                <span
                  key={skill.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm"
                >
                  {skill.icon && (
                    <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" />
                  )}
                  {skill.name}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
            >
              View Project <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}