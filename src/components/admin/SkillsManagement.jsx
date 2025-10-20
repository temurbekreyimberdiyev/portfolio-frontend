import React, { useState } from "react";
import { Plus, Trash2, Upload, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const initialSkills = [
  { id: "1", name: "JavaScript", iconUrl: "/icons/js.png" },
  { id: "2", name: "React", iconUrl: "/icons/react.png" },
  { id: "3", name: "Node.js", iconUrl: "/icons/node.png" },
];

export default function SkillsManagement() {
  const [skills, setSkills] = useState(initialSkills);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleDelete = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    if (editingSkill) {
      // Update existing skill
      setSkills((prev) =>
        prev.map((s) =>
          s.id === editingSkill.id
            ? { ...s, name, iconUrl: preview || s.iconUrl }
            : s
        )
      );
    } else {
      // Add new skill
      const newSkill = {
        id: Date.now().toString(),
        name,
        iconUrl: preview,
      };
      setSkills([...skills, newSkill]);
    }

    setPreview(null);
    setEditingSkill(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (skill) => {
    setEditingSkill(skill);
    setPreview(skill.iconUrl);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">Skills & Technologies</h2>
          <p className="text-white/60">Manage your technical skills</p>
        </div>

        {/* Add Skill Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingSkill(null);
                setPreview(null);
                setIsDialogOpen(true);
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0a1a] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              {/* Skill Name */}
              <div>
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., React"
                  defaultValue={editingSkill?.name || ""}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>

              {/* Icon Upload */}
              <div>
                <Label htmlFor="icon">Skill Icon</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="icon"
                    name="icon"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-white/5 border-white/10"
                  />
                  <Upload className="w-5 h-5 text-white/70" />
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 w-16 h-16 object-contain rounded-lg border border-white/10"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setPreview(null);
                    setEditingSkill(null);
                    setIsDialogOpen(false);
                  }}
                  className="border-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  {editingSkill ? "Save Changes" : "Add Skill"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEditDialog(skill)}
                className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                {skill.iconUrl ? (
                  <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    className="w-8 h-8 object-contain rounded-md"
                  />
                ) : (
                  <span className="text-2xl">⚙️</span>
                )}
              </div>
              <span className="text-center text-sm">{skill.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
