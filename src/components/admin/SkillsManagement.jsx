import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [preview, setPreview] = useState(null);
  const API_URL = "http://127.0.0.1:8000/api/skills/";

  // O'CHIRISH TASDIQLASH MODALI UCHUN
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  // Fetch skills from backend
  const fetchSkills = async () => {
    try {
      const res = await axios.get(API_URL);
      setSkills(
        res.data.map((s) => ({
          id: s.id,
          name: s.name,
          iconUrl: s.icon,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // --- DELETE WITH CONFIRM ---
  const handleDelete = (id) => {
    setSkillToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!skillToDelete) return;

    try {
      await axios.delete(`${API_URL}${skillToDelete}/`);
      setSkills((prev) => prev.filter((s) => s.id !== skillToDelete));
      setDeleteConfirmOpen(false);
      setSkillToDelete(null);
    } catch (err) {
      console.error("Failed to delete skill:", err);
      alert("O‘chirishda xato yuz berdi!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const payload = new FormData();
    payload.append("name", name);
    if (e.target.icon.files[0]) {
      payload.append("icon", e.target.icon.files[0]);
    }

    try {
      if (editingSkill) {
        await axios.put(`${API_URL}${editingSkill.id}/`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      fetchSkills();
      setEditingSkill(null);
      setPreview(null);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to save skill:", err);
    }
  };

  const openEditDialog = (skill) => {
    setEditingSkill(skill);
    setPreview(skill.iconUrl);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingSkill(null);
    setPreview(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl mb-2">Skills & Technologies</h2>
          <p className="text-white/60">Manage your technical skills</p>
        </div>

        {/* Add Skill Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openAddDialog}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-md w-full">
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
                <div className="flex flex-wrap items-center gap-3">
                  <Input
                    id="icon"
                    name="icon"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-white/5 border-white/10 flex-1"
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

              <div className="flex justify-end gap-2 pt-4 flex-wrap">
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

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Haqiqatan o‘chirmoqchimisiz?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white/70">
              Bu mahorat butunlay o‘chib ketadi va loyihalardan ham yo‘qoladi.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteConfirmOpen(false);
                setSkillToDelete(null);
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

            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                {skill.iconUrl ? (
                  <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    className="w-8 h-8 object-contain rounded-md"
                  />
                ) : (
                  <span className="text-2xl">Gear</span>
                )}
              </div>
              <span className="text-sm break-words">{skill.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}