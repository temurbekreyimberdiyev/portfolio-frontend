import React, { useState } from "react";
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

const mockSkills = ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "TailwindCSS", "Docker"];

const initialProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "Full-stack online shopping platform with cart and payment integration",
    techStack: ["React", "Node.js", "MongoDB"],
    link: "https://example.com",
    image: null,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    techStack: ["Next.js", "PostgreSQL", "Prisma"],
    link: "https://example.com",
    image: null,
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedTech, setSelectedTech] = useState([]);

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setSelectedTech(project.techStack || []);
    setPreviewImage(project.image || null);
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
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newProject = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.get("title"),
      description: formData.get("description"),
      techStack: selectedTech,
      link: formData.get("link"),
      image: previewImage,
    };

    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? newProject : p)));
    } else {
      setProjects([...projects, newProject]);
    }

    setIsDialogOpen(false);
    setEditingProject(null);
    setSelectedTech([]);
    setPreviewImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">Projects Management</h2>
          <p className="text-white/60">Manage your portfolio projects</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProject(null);
                setSelectedTech([]);
                setPreviewImage(null);
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Project Title */}
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingProject?.title}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingProject?.description}
                  className="bg-white/5 border-white/10"
                  rows={3}
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label>Project Image</Label>
                <div className="mt-2 flex items-center gap-4">
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
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Tech Stack Selection */}
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

              {/* Link */}
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

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingProject(null);
                  }}
                  className="border-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  Save Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-xl mb-4 border border-white/10"
              />
            )}

            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl">{project.title}</h3>
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

            <p className="text-white/60 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Project <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
