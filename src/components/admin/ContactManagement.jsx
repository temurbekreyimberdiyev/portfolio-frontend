import { useState } from "react";
import {
  Plus,
  Trash2,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Upload,
  Pencil,
  CheckCircle2,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const initialContactInfo = {
  phone: "+998 90 123 45 67",
  email: "developer@example.com",
  address: "Tashkent, Uzbekistan",
};

const initialSocialLinks = [
  {
    id: "1",
    platform: "Telegram",
    url: "https://t.me/username",
    iconUrl: "/icons/telegram.png",
  },
  {
    id: "2",
    platform: "Instagram",
    url: "https://instagram.com/username",
    iconUrl: "/icons/instagram.png",
  },
  {
    id: "3",
    platform: "GitHub",
    url: "https://github.com/username",
    iconUrl: "/icons/github.png",
  },
  {
    id: "4",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/username",
    iconUrl: "/icons/linkedin.png",
  },
];

const sampleMessages = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    message: "Hi! I would like to discuss a project with you.",
    date: "2025-10-15",
    read: false,
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@company.com",
    phone: "+1987654321",
    message:
      "We are looking for a developer for our startup. Are you available?",
    date: "2025-10-12",
    read: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@tech.com",
    phone: "+1122334455",
    message: "Your portfolio is impressive! Let's connect.",
    date: "2025-10-10",
    read: false,
  },
];

export default function ContactManagement() {
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [messages, setMessages] = useState(sampleMessages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [editingLink, setEditingLink] = useState(null);

  // 🔹 Xabarni o‘qilgan deb belgilash yoki qayta o‘qilmagan qilish
  const toggleRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, read: !msg.read } : msg
      )
    );
  };

  // 🔹 Xabarni o‘chirish
  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleDeleteSocial = (id) => {
    setSocialLinks(socialLinks.filter((s) => s.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddSocial = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newLink = {
      id: Date.now().toString(),
      platform: formData.get("platform"),
      url: formData.get("url"),
      iconUrl: preview,
    };

    setSocialLinks([...socialLinks, newLink]);
    setIsDialogOpen(false);
    setPreview(null);
  };

  const handleEditSocial = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedLink = {
      ...editingLink,
      platform: formData.get("platform"),
      url: formData.get("url"),
      iconUrl: editPreview || editingLink.iconUrl,
    };

    setSocialLinks(
      socialLinks.map((s) => (s.id === editingLink.id ? updatedLink : s))
    );
    setIsEditDialogOpen(false);
    setEditingLink(null);
    setEditPreview(null);
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateContact = (field, value) => {
    setContactInfo({
      ...contactInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-3xl mb-2">Contact Information</h2>
        <p className="text-white/60">Manage your contact details and messages</p>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="info">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="messages">
            Messages
            <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
              {messages.length}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* CONTACT INFO TAB */}
        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Phone className="w-5 h-5 text-white/40" />
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => handleUpdateContact('phone', e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Mail className="w-5 h-5 text-white/40" />
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleUpdateContact('email', e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <div className="flex items-center gap-3 mt-2">
                  <MapPin className="w-5 h-5 text-white/40" />
                  <Input
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => handleUpdateContact('address', e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                Save Contact Info
              </Button>
            </div>

            {/* Preview */}
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="text-lg mb-4">Preview</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <Phone className="w-5 h-5" />
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Mail className="w-5 h-5" />
                  <span>{contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5" />
                  <span>{contactInfo.address}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SOCIAL LINKS TAB */}
        <TabsContent value="social" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/60">Manage your social media links</p>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Social Link
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0a1a] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle>Add Social Link</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSocial} className="space-y-4">
                  <div>
                    <Label htmlFor="platform">Platform Name</Label>
                    <Input id="platform" name="platform" placeholder="e.g., Twitter" className="bg-white/5 border-white/10" required />
                  </div>

                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" name="url" type="url" placeholder="https://..." className="bg-white/5 border-white/10" required />
                  </div>

                  <div>
                    <Label htmlFor="icon">Upload Icon</Label>
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
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-white/10">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500">
                      Add Link
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Social links list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((link) => (
              <div key={link.id} className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    {link.iconUrl ? (
                      <img src={link.iconUrl} alt={link.platform} className="w-6 h-6 object-contain" />
                    ) : (
                      <span className="text-2xl">🌐</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingLink(link);
                        setEditPreview(link.iconUrl);
                        setIsEditDialogOpen(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSocial(link.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h4 className="mb-1">{link.platform}</h4>
                <p className="text-sm text-white/50 truncate">{link.url}</p>
              </div>
            ))}
          </div>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-[#0a0a1a] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Edit Social Link</DialogTitle>
              </DialogHeader>
              {editingLink && (
                <form onSubmit={handleEditSocial} className="space-y-4">
                  <div>
                    <Label htmlFor="platform">Platform Name</Label>
                    <Input
                      id="platform"
                      name="platform"
                      defaultValue={editingLink.platform}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      defaultValue={editingLink.url}
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="icon">Change Icon</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="icon"
                        name="icon"
                        type="file"
                        accept="image/*"
                        onChange={handleEditFileChange}
                        className="bg-white/5 border-white/10"
                      />
                      <Upload className="w-5 h-5 text-white/70" />
                    </div>
                    {editPreview && (
                      <img
                        src={editPreview}
                        alt="Preview"
                        className="mt-3 w-16 h-16 object-contain rounded-lg border border-white/10"
                      />
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-white/10">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500">
                      Save Changes
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl p-6 border transition-all ${
              msg.read
                ? "bg-white/5 border-white/10"
                : "bg-blue-500/10 border-blue-500/30"
            } hover:bg-white/10`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{msg.name}</h4>
                    <p className="text-sm text-white/50">{msg.email}</p>
                    <p className="text-sm text-white/50">{msg.phone}</p>
                  </div>
                  <span className="text-sm text-white/40">
                    {new Date(msg.date).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-white/70 mb-3">{msg.message}</p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => toggleRead(msg.id)}
                    variant="outline"
                    size="sm"
                    className={`${
                      msg.read
                        ? "border-green-500 text-green-400 hover:bg-green-500/10"
                        : "border-blue-500 text-blue-400 hover:bg-blue-500/10"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    {msg.read ? "Unread" : "Mark as Read"}
                  </Button>

                  <Button
                    onClick={() => deleteMessage(msg.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="text-center text-white/40 mt-6">
            No messages available.
          </p>
        )}
      </div>
    </TabsContent>
      </Tabs>
    </div>
  );
}
