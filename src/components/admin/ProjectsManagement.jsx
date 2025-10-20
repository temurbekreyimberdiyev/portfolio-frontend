import React, { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const initialProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-stack online shopping platform with cart and payment integration",
    tags: ["Web App", "E-commerce"],
    techStack: ["React", "Node.js", "MongoDB"],
    link: "https://example.com",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    tags: ["SaaS", "Productivity"],
    techStack: ["Next.js", "PostgreSQL", "Prisma"],
    link: "https://example.com",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newProject = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.get("title"),
      description: formData.get("description"),
      tags: formData.get("tags") ? formData.get("tags").split(",").map((t) => t.trim()) : [],
      techStack: formData.get("techStack") ? formData.get("techStack").split(",").map((t) => t.trim()) : [],
      link: formData.get("link"),
    };

    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? newProject : p)));
    } else {
      setProjects([...projects, newProject]);
    }

    setIsDialogOpen(false);
    setEditingProject(null);
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
              onClick={() => setEditingProject(null)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4">
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

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  defaultValue={editingProject?.tags?.join(", ")}
                  placeholder="Web App, SaaS, Mobile"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div>
                <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                <Input
                  id="techStack"
                  name="techStack"
                  defaultValue={editingProject?.techStack?.join(", ")}
                  placeholder="React, Node.js, MongoDB"
                  className="bg-white/5 border-white/10"
                />
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
                <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500">
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
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

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
