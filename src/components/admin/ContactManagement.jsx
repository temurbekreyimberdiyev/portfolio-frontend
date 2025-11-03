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
  uz: { phone: "+998 90 123 45 67", email: "developer@example.com", address: "Toshkent, O‘zbekiston" },
  en: { phone: "+998 90 123 45 67", email: "developer@example.com", address: "Tashkent, Uzbekistan" },
  ru: { phone: "+998 90 123 45 67", email: "developer@example.com", address: "Ташкент, Узбекистан" },
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
    message: "We are looking for a developer for our startup. Are you available?",
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

  const handleLangSwitch = (lang) => setCurrentLang(lang);
  const toggleRead = (id) => setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, read: !msg.read } : msg)));
  const deleteMessage = (id) => setMessages((prev) => prev.filter((msg) => msg.id !== id));
  const handleUpdateContact = (field, value) => {
    setContactInfo({
      ...contactInfo,
      [currentLang]: { ...contactInfo[currentLang], [field]: value },
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteSocial = (id) => {
    setSocialLinks({
      ...socialLinks,
      [currentLang]: socialLinks[currentLang].filter((s) => s.id !== id),
    });
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl mb-2 text-center sm:text-left">Contact Management</h2>
          <p className="text-white/60 text-center sm:text-left">
            Manage your contact info, links & messages
          </p>
        </div>
        <Tabs defaultValue={currentLang} onValueChange={handleLangSwitch}>
          <TabsList className="bg-white/5 border border-white/10 flex-wrap justify-center">
            <TabsTrigger value="uz">UZ</TabsTrigger>
            <TabsTrigger value="en">EN</TabsTrigger>
            <TabsTrigger value="ru">RU</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 flex flex-wrap justify-center gap-2">
          <TabsTrigger value="info">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="messages">
            Messages
            <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
              {messages.length}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Contact Info */}
        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel */}
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 space-y-4">
              {["phone", "email", "address"].map((field, idx) => (
                <div key={idx}>
                  <Label className="capitalize">{field}</Label>
                  <div className="flex items-center gap-3 mt-2">
                    {field === "phone" && <Phone className="w-5 h-5 text-white/40" />}
                    {field === "email" && <Mail className="w-5 h-5 text-white/40" />}
                    {field === "address" && <MapPin className="w-5 h-5 text-white/40" />}
                    <Input
                      value={contactInfo[currentLang][field]}
                      onChange={(e) => handleUpdateContact(field, e.target.value)}
                      className="bg-white/5 border-white/10 flex-1"
                    />
                  </div>
                </div>
              ))}
              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                Save Contact Info
              </Button>
            </div>

            {/* Preview */}
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="text-lg mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <Globe className="w-5 h-5" /> Preview ({currentLang.toUpperCase()})
              </h3>
              <div className="space-y-4 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <Phone className="w-5 h-5" /> {contactInfo[currentLang].phone}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <Mail className="w-5 h-5" /> {contactInfo[currentLang].email}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <MapPin className="w-5 h-5" /> {contactInfo[currentLang].address}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Social Links */}
        <TabsContent value="social" className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <p className="text-white/60 text-center sm:text-left">
              Manage your social links ({currentLang.toUpperCase()})
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" /> Add Link
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0a1a] border-white/10 text-white w-[95%] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Social Link</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue={currentLang} className="mt-3">
                  <TabsList className="bg-white/5 border border-white/10 mb-4 flex-wrap justify-center">
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
                          <Input name="platform" required className="bg-white/5 border-white/10 w-full" />
                        </div>
                        <div>
                          <Label>URL</Label>
                          <Input name="url" required type="url" className="bg-white/5 border-white/10 w-full" />
                        </div>
                        <div>
                          <Label>Upload Icon</Label>
                          <Input type="file" onChange={handleFileChange} accept="image/*" className="bg-white/5 border-white/10 w-full" />
                          {preview && <img src={preview} alt="Preview" className="mt-3 w-16 h-16 mx-auto sm:mx-0" />}
                        </div>
                        <div className="flex justify-end gap-2 flex-wrap">
                          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500">
                            Add
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  ))}
                </Tabs>
              </DialogContent>
            </Dialog>

            {/* 🔽 EDIT LINK DIALOG FORM QO‘SHILDI 🔽 */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="bg-[#0a0a1a] border-white/10 text-white w-[95%] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Social Link</DialogTitle>
                </DialogHeader>
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
                        [currentLang]: prev[currentLang].map((link) =>
                          link.id === editingLink.id ? updatedLink : link
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
                        className="bg-white/5 border-white/10 w-full"
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input
                        name="url"
                        type="url"
                        defaultValue={editingLink.url}
                        required
                        className="bg-white/5 border-white/10 w-full"
                      />
                    </div>
                    <div>
                      <Label>Change Icon</Label>
                      <Input
                        type="file"
                        onChange={handleEditFileChange}
                        accept="image/*"
                        className="bg-white/5 border-white/10 w-full"
                      />
                      {(editPreview || editingLink.iconUrl) && (
                        <img
                          src={editPreview || editingLink.iconUrl}
                          alt="Preview"
                          className="mt-3 w-16 h-16 mx-auto sm:mx-0"
                        />
                      )}
                    </div>
                    <div className="flex justify-end gap-2 flex-wrap">
                      <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500">
                        Save
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
            {/* 🔼 TUGADI 🔼 */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks[currentLang].map((link) => (
              <div key={link.id} className="rounded-2xl p-6 bg-white/5 border border-white/10 flex flex-col min-w-0">
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
                <h4 className="mb-1 truncate">{link.platform}</h4>
                <p className="text-sm text-white/50 truncate">{link.url}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Messages */}
        <TabsContent value="messages" className="mt-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl p-6 border transition-all ${
                  msg.read ? "bg-white/5 border-white/10" : "bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto sm:mx-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                      <div className="text-center sm:text-left">
                        <h4 className="font-semibold">{msg.name}</h4>
                        <p className="text-sm text-white/50">{msg.email}</p>
                        <p className="text-sm text-white/50">{msg.phone}</p>
                      </div>
                      <span className="text-sm text-white/40 text-center sm:text-right">
                        {new Date(msg.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white/70 mb-3 text-center sm:text-left">{msg.message}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      <Button
                        onClick={() => toggleRead(msg.id)}
                        variant="outline"
                        size="sm"
                        className={msg.read ? "border-green-500 text-green-400" : "border-blue-500 text-blue-400"}
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
              <p className="text-center text-white/40 mt-6">No messages available.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
