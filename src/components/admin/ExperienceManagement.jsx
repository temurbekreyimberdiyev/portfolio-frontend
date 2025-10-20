import { useState } from "react";
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

export default function ExperienceManagement() {
  const initialExperiences = [
    {
      id: "1",
      company: "Ведущий компания",
      role: "Senior Frontend Developer",
      description:
        "Leading frontend development team, architecting scalable solutions",
      startDate: "2023-01",
      endDate: "",
      current: true,
    },
    {
      id: "2",
      company: "Microsoft (freelance)",
      role: "Frontend Developer",
      description:
        "Developed enterprise web applications using React and TypeScript",
      startDate: "2021-06",
      endDate: "2022-12",
      current: false,
    },
    {
      id: "3",
      company: "Яндекс (стажировка)",
      role: "Junior Developer",
      description:
        "Worked on internal tools and gained valuable experience in web development",
      startDate: "2020-01",
      endDate: "2021-05",
      current: false,
    },
  ];

  const [experiences, setExperiences] = useState(initialExperiences);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const handleDelete = (id) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setIsDialogOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newExperience = {
      id: editingExperience?.id || Date.now().toString(),
      company: formData.get("company"),
      role: formData.get("role"),
      description: formData.get("description"),
      startDate: formData.get("startDate"),
      endDate:
        formData.get("current") === "on"
          ? ""
          : formData.get("endDate") || "",
      current: formData.get("current") === "on",
    };

    if (editingExperience) {
      setExperiences(
        experiences.map((e) =>
          e.id === editingExperience.id ? newExperience : e
        )
      );
    } else {
      setExperiences([newExperience, ...experiences]);
    }

    setIsDialogOpen(false);
    setEditingExperience(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">Experience Management</h2>
          <p className="text-white/60">
            Manage your work experience timeline
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingExperience(null)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingExperience ? "Edit Experience" : "Add New Experience"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={editingExperience?.company}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Role / Position</Label>
                <Input
                  id="role"
                  name="role"
                  defaultValue={editingExperience?.role}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingExperience?.description}
                  className="bg-white/5 border-white/10"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="month"
                    defaultValue={editingExperience?.startDate}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="month"
                    defaultValue={editingExperience?.endDate}
                    className="bg-white/5 border-white/10"
                    disabled={editingExperience?.current}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="current"
                  name="current"
                  defaultChecked={editingExperience?.current}
                  className="w-4 h-4"
                />
                <Label htmlFor="current" className="cursor-pointer">
                  Currently working here
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingExperience(null);
                  }}
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
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl">{exp.role}</h3>
                      {exp.current && (
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-white/60">{exp.company}</p>
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

                <p className="text-white/70 mb-4">{exp.description}</p>

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
