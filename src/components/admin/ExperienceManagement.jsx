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

export default function ExperienceManagement() {
  const initialExperiences = [
    {
      id: "1",
      company: "Ведущий компания",
      logo:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiI+PHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjMjI4OGZmIiByeD0iOCI+PC9yZWN0Pjwvc3ZnPg==", // placeholder
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
      logo: null,
      role: "Frontend Developer",
      description:
        "Developed enterprise web applications using React and TypeScript",
      startDate: "2021-06",
      endDate: "2022-12",
      current: false,
    },
  ];

  const [experiences, setExperiences] = useState(initialExperiences);

  // Dialog + form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState(null); // data URL
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [current, setCurrent] = useState(false);

  // Open dialog for new item
  const openNew = () => {
    setEditingId(null);
    clearForm();
    setIsDialogOpen(true);
  };

  // Open dialog to edit existing
  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setCompany(exp.company || "");
    setLogo(exp.logo || null);
    setRole(exp.role || "");
    setDescription(exp.description || "");
    setStartDate(exp.startDate || "");
    setEndDate(exp.endDate || "");
    setCurrent(Boolean(exp.current));
    setIsDialogOpen(true);
  };

  const clearForm = () => {
    setCompany("");
    setLogo(null);
    setRole("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setCurrent(false);
  };

  // Delete experience
  const handleDelete = (id) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  // Logo upload (file -> data URL)
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result); // data URL
    };
    reader.readAsDataURL(file);
  };

  const handleLogoRemove = () => setLogo(null);

  // Save (create or update)
  const handleSave = (e) => {
    e.preventDefault();

    const newExp = {
      id: editingId || Date.now().toString(),
      company,
      logo, // data URL or null
      role,
      description,
      startDate,
      endDate: current ? "" : endDate,
      current,
    };

    if (editingId) {
      setExperiences((prev) => prev.map((p) => (p.id === editingId ? newExp : p)));
    } else {
      setExperiences((prev) => [newExp, ...prev]);
    }

    setIsDialogOpen(false);
    setEditingId(null);
    clearForm();
  };

  // When dialog closed manually, clear editingId/form
  useEffect(() => {
    if (!isDialogOpen) {
      setEditingId(null);
    }
  }, [isDialogOpen]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">Experience Management</h2>
          <p className="text-white/60">Manage your work experience timeline</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[#0a0a1a] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Experience" : "Add New Experience"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} className="bg-white/5 border-white/10" required />
              </div>

              <div>
                <Label>Company Logo (upload)</Label>
                <div className="mt-2 flex items-center gap-4">
                  {logo ? (
                    <div className="flex items-center gap-3">
                      <img src={logo} alt="logo" className="w-16 h-16 object-contain rounded-md bg-white/5 p-1 border border-white/10" />
                      <div className="flex flex-col gap-2">
                        <label className="cursor-pointer">
                          <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                          <div className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">Replace</div>
                        </label>
                        <button type="button" onClick={handleLogoRemove} className="px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      <span>Upload Logo</span>
                    </label>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="role">Role / Position</Label>
                <Input id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} className="bg-white/5 border-white/10" required />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-white/5 border-white/10" rows={3} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" type="month" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-white/5 border-white/10" required />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" type="month" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-white/5 border-white/10" disabled={current} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="current" name="current" checked={current} onChange={(e) => setCurrent(e.target.checked)} className="w-4 h-4" />
                <Label htmlFor="current" className="cursor-pointer">Currently working here</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); setEditingId(null); clearForm(); }} className="border-white/10">Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500">Save Experience</Button>
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
                    <div className="flex items-center gap-3 mb-2">
                      {exp.logo && (
                        <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded-md bg-white/5 p-1 object-contain" />
                      )}
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl">{exp.role}</h3>
                          {exp.current && <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">Current</span>}
                        </div>
                        <p className="text-white/60">{exp.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(exp)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(exp.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-white/70 mb-4">{exp.description}</p>

                <p className="text-sm text-white/50">
                  {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -{" "}
                  {exp.current ? "Present" : new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
