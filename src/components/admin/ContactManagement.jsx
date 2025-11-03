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
  Globe,
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
  uz: {
    phone: "+998 90 123 45 67",
    email: "developer@example.com",
    address: "Toshkent, O‘zbekiston",
  },
  en: {
    phone: "+998 90 123 45 67",
    email: "developer@example.com",
    address: "Tashkent, Uzbekistan",
  },
  ru: {
    phone: "+998 90 123 45 67",
    email: "developer@example.com",
    address: "Ташкент, Узбекистан",
  },
};

const initialSocialLinks = {
  uz: [
    { id: "1", platform: "Telegram", url: "https://t.me/username", iconUrl: "/icons/telegram.png" },
    { id: "2", platform: "Instagram", url: "https://instagram.com/username", iconUrl: "/icons/instagram.png" },
  ],
  en: [
    { id: "1", platform: "Telegram", url: "https://t.me/username", iconUrl: "/icons/telegram.png" },
    { id: "2", platform: "Instagram", url: "https://instagram.com/username", iconUrl: "/icons/instagram.png" },
  ],
  ru: [
    { id: "1", platform: "Телеграм", url: "https://t.me/username", iconUrl: "/icons/telegram.png" },
    { id: "2", platform: "Инстаграм", url: "https://instagram.com/username", iconUrl: "/icons/instagram.png" },
  ],
};

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
];

export default function ContactManagement() {
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [messages, setMessages] = useState(sampleMessages);
  const [currentLang, setCurrentLang] = useState("uz");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [editingLink, setEditingLink] = useState(null);

  // 🔹 Til almashtirish
  const handleLangSwitch = (lang) => {
    setCurrentLang(lang);
  };

  // 🔹 Xabarni o‘qilgan deb belgilash
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

  // 🔹 Contact ma’lumotlarini yangilash
  const handleUpdateContact = (field, value) => {
    setContactInfo({
      ...contactInfo,
      [currentLang]: {
        ...contactInfo[currentLang],
        [field]: value,
      },
    });
  };

  // 🔹 Social link qo‘shish
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const handleAddSocial = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   const newLink = {
  //     id: Date.now().toString(),
  //     platform: formData.get("platform"),
  //     url: formData.get("url"),
  //     iconUrl: preview,
  //   };

  //   setSocialLinks({
  //     ...socialLinks,
  //     [currentLang]: [...socialLinks[currentLang], newLink],
  //   });
  //   setIsDialogOpen(false);
  //   setPreview(null);
  // };

  const handleDeleteSocial = (id) => {
    setSocialLinks({
      ...socialLinks,
      [currentLang]: socialLinks[currentLang].filter((s) => s.id !== id),
    });
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const handleEditSocial = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   const updatedLink = {
  //     ...editingLink,
  //     platform: formData.get("platform"),
  //     url: formData.get("url"),
  //     iconUrl: editPreview || editingLink.iconUrl,
  //   };

  //   setSocialLinks({
  //     ...socialLinks,
  //     [currentLang]: socialLinks[currentLang].map((s) =>
  //       s.id === editingLink.id ? updatedLink : s
  //     ),
  //   });

  //   setIsEditDialogOpen(false);
  //   setEditingLink(null);
  //   setEditPreview(null);
  // };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">Contact Management</h2>
          <p className="text-white/60">Manage your contact info, links & messages</p>
        </div>
        {/* 🔹 Language Switch */}
        <Tabs defaultValue={currentLang} onValueChange={handleLangSwitch}>
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="uz">UZ</TabsTrigger>
            <TabsTrigger value="en">EN</TabsTrigger>
            <TabsTrigger value="ru">RU</TabsTrigger>
          </TabsList>
        </Tabs>
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

        {/* 🔹 CONTACT INFO */}
        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 space-y-4">
              <div>
                <Label>Phone Number</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Phone className="w-5 h-5 text-white/40" />
                  <Input
                    value={contactInfo[currentLang].phone}
                    onChange={(e) => handleUpdateContact("phone", e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Mail className="w-5 h-5 text-white/40" />
                  <Input
                    value={contactInfo[currentLang].email}
                    onChange={(e) => handleUpdateContact("email", e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <div className="flex items-center gap-3 mt-2">
                  <MapPin className="w-5 h-5 text-white/40" />
                  <Input
                    value={contactInfo[currentLang].address}
                    onChange={(e) => handleUpdateContact("address", e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                Save Contact Info
              </Button>
            </div>

            {/* Preview */}
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" /> Preview ({currentLang.toUpperCase()})
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <Phone className="w-5 h-5" />
                  <span>{contactInfo[currentLang].phone}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Mail className="w-5 h-5" />
                  <span>{contactInfo[currentLang].email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5" />
                  <span>{contactInfo[currentLang].address}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 🔹 SOCIAL LINKS */}
<TabsContent value="social" className="mt-6">
  <div className="flex items-center justify-between mb-6">
    <p className="text-white/60">
      Manage your social links ({currentLang.toUpperCase()})
    </p>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
          <Plus className="w-4 h-4 mr-2" /> Add Link
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0a0a1a] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Add Social Link</DialogTitle>
        </DialogHeader>

        {/* 🔸 Language Tabs inside Add Dialog */}
        <Tabs defaultValue={currentLang} className="mt-3">
          <TabsList className="bg-white/5 border border-white/10 mb-4">
            <TabsTrigger value="uz">UZ</TabsTrigger>
            <TabsTrigger value="en">EN</TabsTrigger>
            <TabsTrigger value="ru">RU</TabsTrigger>
          </TabsList>

          {["uz", "en", "ru"].map((lang) => (
            <TabsContent key={lang} value={lang}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newLink = {
                    id: Date.now().toString(),
                    platform: formData.get("platform"),
                    url: formData.get("url"),
                    iconUrl: preview,
                  };
                  setSocialLinks((prev) => ({
                    ...prev,
                    [lang]: [...prev[lang], newLink],
                  }));
                  setIsDialogOpen(false);
                  setPreview(null);
                }}
                className="space-y-4"
              >
                <div>
                  <Label>Platform</Label>
                  <Input
                    name="platform"
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    name="url"
                    required
                    type="url"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div>
                  <Label>Upload Icon</Label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="bg-white/5 border-white/10"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-3 w-16 h-16"
                    />
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-blue-500"
                  >
                    Add
                  </Button>
                </div>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  </div>

  {/* 🔹 Social Links List */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {socialLinks[currentLang].map((link) => (
      <div
        key={link.id}
        className="rounded-2xl p-6 bg-white/5 border border-white/10"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
            {link.iconUrl ? (
              <img src={link.iconUrl} className="w-6 h-6 object-contain" />
            ) : (
              <Globe className="w-5 h-5 text-white/60" />
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingLink(link);
                setEditPreview(link.iconUrl);
                setIsEditDialogOpen(true);
              }}
              className="p-1.5 rounded-lg hover:bg-blue-500/20 text-blue-400"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteSocial(link.id)}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400"
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

  {/* 🔸 Edit Dialog with Language Tabs */}
  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
    <DialogContent className="bg-[#0a0a1a] border-white/10 text-white">
      <DialogHeader>
        <DialogTitle>Edit Social Link</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue={currentLang} className="mt-3">
        <TabsList className="bg-white/5 border border-white/10 mb-4">
          <TabsTrigger value="uz">UZ</TabsTrigger>
          <TabsTrigger value="en">EN</TabsTrigger>
          <TabsTrigger value="ru">RU</TabsTrigger>
        </TabsList>

        {["uz", "en", "ru"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            {editingLink && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const updatedLink = {
                    ...editingLink,
                    platform: formData.get("platform"),
                    url: formData.get("url"),
                    iconUrl: editPreview || editingLink.iconUrl,
                  };
                  setSocialLinks((prev) => ({
                    ...prev,
                    [lang]: prev[lang].map((s) =>
                      s.id === editingLink.id ? updatedLink : s
                    ),
                  }));
                  setIsEditDialogOpen(false);
                  setEditingLink(null);
                  setEditPreview(null);
                }}
                className="space-y-4"
              >
                <div>
                  <Label>Platform</Label>
                  <Input
                    name="platform"
                    defaultValue={editingLink.platform}
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    name="url"
                    defaultValue={editingLink.url}
                    required
                    type="url"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div>
                  <Label>Upload Icon</Label>
                  <Input
                    type="file"
                    onChange={handleEditFileChange}
                    accept="image/*"
                    className="bg-white/5 border-white/10"
                  />
                  {editPreview && (
                    <img
                      src={editPreview}
                      alt="Preview"
                      className="mt-3 w-16 h-16"
                    />
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-blue-500"
                  >
                    Save
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </DialogContent>
  </Dialog>
</TabsContent>

        {/* 🔹 MESSAGES */}
        <TabsContent value="messages" className="mt-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl p-6 border transition-all ${
                  msg.read
                    ? "bg-white/5 border-white/10"
                    : "bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
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
                            ? "border-green-500 text-green-400"
                            : "border-blue-500 text-blue-400"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        {msg.read ? "Unread" : "Mark as Read"}
                      </Button>
                      <Button
                        onClick={() => deleteMessage(msg.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-400"
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
