import { useState, useEffect } from "react";
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

// API URLs
const API_BASE = "http://127.0.0.1:8000/api";
const CONTACT_API = `${API_BASE}/contacts/`;
const SOCIAL_API = `${API_BASE}/social/`;
const MESSAGE_API = `${API_BASE}/messages/`;

export default function ContactManagement() {
  const [contactInfo, setContactInfo] = useState({
    uz: { phone: "", email: "", address: "" },
    en: { phone: "", email: "", address: "" },
    ru: { phone: "", email: "", address: "" },
  });
  const [contactId, setContactId] = useState(null); // Yangi: bitta yozuv ID
  const [socialLinks, setSocialLinks] = useState({
    uz: [],
    en: [],
    ru: [],
  });
  const [messages, setMessages] = useState([]);
  const [currentLang, setCurrentLang] = useState("uz");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [editingLink, setEditingLink] = useState(null);

  const [loading, setLoading] = useState(true);

  // === FETCH DATA ON MOUNT ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // === Fetch Contacts (bitta yozuv) ===
        const contactRes = await fetch(CONTACT_API);
        const contacts = await contactRes.json();
        const contact = contacts.find((c) => c.lang === "uz") || contacts[0];

        if (contact) {
          setContactId(contact.id);
          setContactInfo({
            uz: {
              phone: contact.phone || "",
              email: contact.email || "",
              address: contact.address_uz || "",
            },
            en: {
              phone: contact.phone || "",
              email: contact.email || "",
              address: contact.address_en || "",
            },
            ru: {
              phone: contact.phone || "",
              email: contact.email || "",
              address: contact.address_ru || "",
            },
          });
        }

        // === Fetch Social Links ===
        const socialRes = await fetch(SOCIAL_API);
        const socials = await socialRes.json();
        const newSocialLinks = { uz: [], en: [], ru: [] };
        socials.forEach((s) => {
          newSocialLinks.uz.push({
            id: s.id.toString(),
            platform: s.platform_uz,
            url: s.url,
            iconUrl: s.icon,
          });
          newSocialLinks.en.push({
            id: s.id.toString(),
            platform: s.platform_en,
            url: s.url,
            iconUrl: s.icon,
          });
          newSocialLinks.ru.push({
            id: s.id.toString(),
            platform: s.platform_ru,
            url: s.url,
            iconUrl: s.icon,
          });
        });
        setSocialLinks(newSocialLinks);

        // === Fetch Messages ===
        const msgRes = await fetch(MESSAGE_API);
        const msgs = await msgRes.json();
        setMessages(
          msgs.map((m) => ({
            id: m.id.toString(),
            name: m.name,
            email: m.email,
            phone: m.phone,
            message: m.message,
            date: m.date,
            read: m.read,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // === HANDLERS ===
  const handleLangSwitch = (lang) => setCurrentLang(lang);

  const toggleRead = async (id) => {
    const msg = messages.find((m) => m.id === id);
    const updated = { ...msg, read: !msg.read };

    try {
      await fetch(`${MESSAGE_API}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: updated.read }),
      });
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch (err) {
      console.error("Failed to update read status:", err);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await fetch(`${MESSAGE_API}${id}/`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // Tuzatilgan: bitta yozuv, payload faqat kerakli maydon
  const handleUpdateContact = async (field, value) => {
    const updated = {
      ...contactInfo,
      [currentLang]: { ...contactInfo[currentLang], [field]: value },
    };
    setContactInfo(updated);

    if (!contactId) return;

    const payload = {};

    if (field === "phone" || field === "email") {
      payload[field] = value;
    } else if (field === "address") {
      payload[`address_${currentLang}`] = value;
    }

    try {
      await fetch(`${CONTACT_API}${contactId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to save contact:", err);
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

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteSocial = async (id) => {
    try {
      await fetch(`${SOCIAL_API}${id}/`, { method: "DELETE" });
      setSocialLinks((prev) => ({
        ...prev,
        uz: prev.uz.filter((s) => s.id !== id),
        en: prev.en.filter((s) => s.id !== id),
        ru: prev.ru.filter((s) => s.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete social link:", err);
    }
  };

  // === RENDER ===
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

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
                      value={contactInfo[currentLang][field] || ""}
                      onChange={(e) => handleUpdateContact(field, e.target.value)}
                      className="bg-white/5 border-white/10 flex-1"
                    />
                  </div>
                </div>
              ))}
              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500" disabled>
                Saved Automatically
              </Button>
            </div>

            {/* Preview */}
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="text-lg mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <Globe className="w-5 h-5" /> Preview ({currentLang.toUpperCase()})
              </h3>
              <div className="space-y-4 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <Phone className="w-5 h-5" /> {contactInfo[currentLang].phone || "—"}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <Mail className="w-5 h-5" /> {contactInfo[currentLang].email || "—"}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <MapPin className="w-5 h-5" /> {contactInfo[currentLang].address || "—"}
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
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const file = formData.get("icon");

                          const payload = new FormData();
                          payload.append("platform_uz", lang === "uz" ? formData.get("platform") : "");
                          payload.append("platform_en", lang === "en" ? formData.get("platform") : "");
                          payload.append("platform_ru", lang === "ru" ? formData.get("platform") : "");
                          payload.append("url", formData.get("url"));
                          if (file) payload.append("icon", file);

                          try {
                            const res = await fetch(SOCIAL_API, {
                              method: "POST",
                              body: payload,
                            });
                            const newLink = await res.json();

                            const linkObj = {
                              id: newLink.id.toString(),
                              platform:
                                lang === "uz"
                                  ? newLink.platform_uz
                                  : lang === "en"
                                  ? newLink.platform_en
                                  : newLink.platform_ru,
                              url: newLink.url,
                              iconUrl: newLink.icon,
                            };

                            setSocialLinks((prev) => ({
                              ...prev,
                              [lang]: [...prev[lang], linkObj],
                            }));
                            setIsDialogOpen(false);
                            setPreview(null);
                          } catch (err) {
                            console.error("Failed to add social link:", err);
                          }
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
                          <Input type="file" name="icon" onChange={handleFileChange} accept="image/*" className="bg-white/5 border-white/10 w-full" />
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

            {/* EDIT DIALOG */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="bg-[#0a0a1a] border-white/10 text-white w-[95%] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Social Link</DialogTitle>
                </DialogHeader>
                {editingLink && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const file = formData.get("icon");

                      const payload = new FormData();
                      payload.append("platform_uz", currentLang === "uz" ? formData.get("platform") : editingLink.platform);
                      payload.append("platform_en", currentLang === "en" ? formData.get("platform") : editingLink.platform);
                      payload.append("platform_ru", currentLang === "ru" ? formData.get("platform") : editingLink.platform);
                      payload.append("url", formData.get("url"));
                      if (file) payload.append("icon", file);

                      try {
                        const res = await fetch(`${SOCIAL_API}${editingLink.id}/`, {
                          method: "PATCH",
                          body: payload,
                        });
                        const updated = await res.json();

                        const updatedLink = {
                          ...editingLink,
                          platform:
                            currentLang === "uz"
                              ? updated.platform_uz
                              : currentLang === "en"
                              ? updated.platform_en
                              : updated.platform_ru,
                          url: updated.url,
                          iconUrl: file ? URL.createObjectURL(file) : updated.icon,
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
                      } catch (err) {
                        console.error("Failed to update link:", err);
                      }
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
                        name="icon"
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks[currentLang].map((link) => (
              <div key={link.id} className="rounded-2xl p-6 bg-white/5 border border-white/10 flex flex-col min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
                    {link.iconUrl ? (
                      <img src={link.iconUrl} alt={link.platform} className="w-6 h-6 object-contain" />
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