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
import API from "../../api/axios"; // Axios konfiguratsiyangiz

const mockSkills = ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "TailwindCSS", "Docker"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedTech, setSelectedTech] = useState([]);
  const [language, setLanguage] = useState("uz");
  const [formLanguage, setFormLanguage] = useState("uz");
  const [title, setTitle] = useState({ uz: "", en: "", ru: "" });
  const [description, setDescription] = useState({ uz: "", en: "", ru: "" });

  // --- FETCH PROJECTS FROM BACKEND ---
  const fetchProjects = async () => {
    try {
      const res = await API.get("projects/");
      const data = res.data.map((p) => ({
        id: p.id,
        title: { uz: p.title_uz, en: p.title_en, ru: p.title_ru },
        description: { uz: p.description_uz, en: p.description_en, ru: p.description_ru },
        techStack: p.skills.map((s) => s.name),
        link: p.link,
        image: p.image,
      }));
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- DELETE PROJECT ---
  const handleDelete = async (id) => {
    try {
      await API.delete(`projects/${id}/`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // --- EDIT PROJECT ---
  const handleEdit = (project) => {
    setEditingProject(project);
    setSelectedTech(project.techStack || []);
    setPreviewImage(project.image || null);
    setTitle(project.title || { uz: "", en: "", ru: "" });
    setDescription(project.description || { uz: "", en: "", ru: "" });
    setFormLanguage("uz");
    setIsDialogOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTechToggle = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  // --- SAVE PROJECT (CREATE OR UPDATE) ---
  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      title_uz: title.uz,
      title_en: title.en,
      title_ru: title.ru,
      description_uz: description.uz,
      description_en: description.en,
      description_ru: description.ru,
      link: e.currentTarget.link.value,
      skills: selectedTech,
      image: previewImage,
    };

    try {
      let res;
      if (editingProject) {
        res = await API.put(`projects/${editingProject.id}/`, payload);
      } else {
        res = await API.post("projects/", payload);
      }

      const savedProject = {
        id: res.data.id,
        title: { uz: res.data.title_uz, en: res.data.title_en, ru: res.data.title_ru },
        description: {
          uz: res.data.description_uz,
          en: res.data.description_en,
          ru: res.data.description_ru,
        },
        techStack: res.data.skills.map((s) => s.name),
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
      setTitle({ uz: "", en: "", ru: "" });
      setDescription({ uz: "", en: "", ru: "" });
    } catch (err) {
      console.error(err);
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

  const FormLanguageSwitcher = () => (
    <div className="flex items-center justify-end gap-2 mb-3">
      {["uz", "en", "ru"].map((lang) => (
        <button
          key={lang}
          onClick={() => setFormLanguage(lang)}
          className={`px-3 py-1 rounded-lg border transition-all ${
            formLanguage === lang
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              : "border-white/10 text-white/60 hover:text-white"
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
                  setTitle({ uz: "", en: "", ru: "" });
                  setDescription({ uz: "", en: "", ru: "" });
                  setFormLanguage("uz");
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

              <FormLanguageSwitcher />

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <Label htmlFor={`title_${formLanguage}`}>
                    Title ({formLanguage.toUpperCase()})
                  </Label>
                  <Input
                    id={`title_${formLanguage}`}
                    value={title[formLanguage]}
                    onChange={(e) =>
                      setTitle({ ...title, [formLanguage]: e.target.value })
                    }
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`desc_${formLanguage}`}>
                    Description ({formLanguage.toUpperCase()})
                  </Label>
                  <Textarea
                    id={`desc_${formLanguage}`}
                    rows={3}
                    value={description[formLanguage]}
                    onChange={(e) =>
                      setDescription({
                        ...description,
                        [formLanguage]: e.target.value,
                      })
                    }
                    className="bg-white/5 border-white/10"
                  />
                </div>

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

                <div>
                  <Label>Tech Stack</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {mockSkills.map((tech) => (
                      <label
                        key={tech}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                          selectedTech.includes(tech)
                            ? "bg-purple-500/20 border-purple-500 text-purple-300"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTech.includes(tech)}
                          onChange={() => handleTechToggle(tech)}
                          className="hidden"
                        />
                        {tech}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="link">Project Link</Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    defaultValue={editingProject?.link}
                    placeholder="https://example.com"
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingProject(null);
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
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm"
                >
                  {tech}
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
