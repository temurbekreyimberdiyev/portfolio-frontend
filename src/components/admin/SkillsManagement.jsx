import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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
  { id: "1", name: "JavaScript", icon: "📜", color: "from-yellow-500 to-yellow-600" },
  { id: "2", name: "React", icon: "⚛️", color: "from-blue-500 to-blue-600" },
  { id: "3", name: "TypeScript", icon: "📘", color: "from-blue-600 to-blue-700" },
  { id: "4", name: "Node.js", icon: "🟢", color: "from-green-500 to-green-600" },
  { id: "5", name: "MongoDB", icon: "🍃", color: "from-green-600 to-green-700" },
  { id: "6", name: "PostgreSQL", icon: "🐘", color: "from-blue-700 to-blue-800" },
  { id: "7", name: "Docker", icon: "🐳", color: "from-blue-500 to-cyan-500" },
  { id: "8", name: "Git", icon: "🔀", color: "from-orange-500 to-red-500" },
  { id: "9", name: "Figma", icon: "🎨", color: "from-purple-500 to-pink-500" },
  { id: "10", name: "Next.js", icon: "▲", color: "from-gray-700 to-gray-900" },
  { id: "11", name: "Tailwind CSS", icon: "💨", color: "from-cyan-500 to-blue-500" },
  { id: "12", name: "GraphQL", icon: "◼️", color: "from-pink-500 to-purple-500" },
];

export default function SkillsManagement() {
  const [skills, setSkills] = useState(initialSkills);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newSkill = {
      id: Date.now().toString(),
      name: formData.get("name"),
      icon: formData.get("icon"),
      color: formData.get("color"),
    };

    setSkills([...skills, newSkill]);
    setIsDialogOpen(false);
  };

  const colorOptions = [
    { label: "Purple", value: "from-purple-500 to-purple-600" },
    { label: "Blue", value: "from-blue-500 to-blue-600" },
    { label: "Green", value: "from-green-500 to-green-600" },
    { label: "Yellow", value: "from-yellow-500 to-yellow-600" },
    { label: "Red", value: "from-red-500 to-red-600" },
    { label: "Pink", value: "from-pink-500 to-pink-600" },
    { label: "Teal", value: "from-teal-500 to-teal-600" },
    { label: "Orange", value: "from-orange-500 to-orange-600" },
  ];

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
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0a1a] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., React"
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="icon">Icon / Emoji</Label>
                <Input
                  id="icon"
                  name="icon"
                  placeholder="e.g., ⚛️"
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="color">Color Theme</Label>
                <select
                  id="color"
                  name="color"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  required
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                  Add Skill
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
            <button
              onClick={() => handleDelete(skill.id)}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3 h-3" />
            </button>

            <div className="flex flex-col items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-2xl`}
              >
                {skill.icon}
              </div>
              <span className="text-center text-sm">{skill.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
