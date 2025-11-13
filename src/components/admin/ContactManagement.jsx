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
    phone: "",
    email: "",
    address: { uz: "", en: "", ru: "" },
  });
  const [contactId, setContactId] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
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

        // === Fetch Contact (bitta yozuv) ===
        const contactRes = await fetch(CONTACT_API);
        const contacts = await contactRes.json();
        const contact = contacts[0];

        if (contact) {
          setContactId(contact.id);
          setContactInfo({
            phone: contact.phone || "",
            email: contact.email || "",
            address: {
              uz: contact.address_uz || "",
              en: contact.address_en || "",
              ru: contact.address_ru || "",
            },
          });
        }

        // === Fetch Social Links ===
        const socialRes = await fetch(SOCIAL_API);
        const socials = await socialRes.json();
        setSocialLinks(
          socials.map((s) => ({
            id: s.id.toString(),
            platform: { uz: s.platform_uz, en: s.platform_en, ru: s.platform_ru },
            url: s.url,
            iconUrl: s.icon,
          }))
        );

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

  const handleUpdateContact = async (field, value, lang = null) => {
    let payload = {};

    if (field === "phone" || field === "email") {
      setContactInfo((prev) => ({ ...prev, [field]: value }));
      payload[field] = value;
    } else if (field === "address") {
      const updatedAddress = { ...contactInfo.address, [lang]: value };
      setContactInfo((prev) => ({ ...prev, address: updatedAddress }));
      payload[`address_${lang}`] = value;
    }

    if (!contactId) return;

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
      setSocialLinks((prev) => prev.filter((s) => s.id !== id));
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
        <Tabs value={currentLang} onValueChange={handleLangSwitch}>
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
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 space-y-6">
              {/* Phone & Email (bitta) */}
              <div>
                <Label>Phone</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Phone className="w-5 h-5 text-white/40" />
                  <Input
                    value={contactInfo.phone}
                    onChange={(e) => handleUpdateContact("phone", e.target.value)}
                    className="bg-white/5 border-white/10 flex-1"
                    placeholder="+998 99 123 45 67"
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Mail className="w-5 h-5 text-white/40" />
                  <Input
                    value={contactInfo.email}
                    onChange={(e) => handleUpdateContact("email", e.target.value)}
                    className="bg-white/5 border-white/10 flex-1"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              {/* Address (3 tilda) */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold text-purple-400">Manzil (Address)</h4>
                {["uz", "en", "ru"].map((lang) => (
                  <div key={lang}>
                    <Label className="text-xs text-white/60">
                      {lang.toUpperCase()} —{" "}
                      {lang === "uz" ? "Manzil" : lang === "en" ? "Address" : "Адрес"}
                    </Label>
                    <div className="flex items-center gap-3 mt-1">
                      <MapPin className="w-5 h-5 text-white/40" />
                      <Input
                        value={contactInfo.address[lang]}
                        onChange={(e) => handleUpdateContact("address", e.target.value, lang)}
                        className="bg-white/5 border-white/10 flex-1"
                        placeholder={lang === "uz" ? "Toshkent, Uzbekistan" : lang === "en" ? "Tashkent, Uzbekistan" : "Ташкент, Узбекистан"}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500" disabled>
                Avtomatik saqlanadi
              </Button>
            </div>

            {/* Preview */}
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="text-lg mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <Globe className="w-5 h-5" /> Preview ({currentLang.toUpperCase()})
              </h3>
              <div className="space-y-4 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <Phone className="w-5 h-5" /> {contactInfo.phone || "—"}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <Mail className="w-5 h-5" /> {contactInfo.email || "—"}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <MapPin className="w-5 h-5" /> {contactInfo.address[currentLang] || "—"}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Social Links */}
        <TabsContent value="social" className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <p className="text-white/60 text-center sm:text-left">
              Ijtimoiy tarmoqlar ({currentLang.toUpperCase()})
            </p>

            {/* ADD DIALOG */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" /> Qo‘shish
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0a1a] border-white/10 text-white w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Yangi ijtimoiy tarmoq qo‘shish</DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const file = formData.get("icon");

                    const payload = new FormData();
                    payload.append("platform_uz", formData.get("platform_uz"));
                    payload.append("platform_en", formData.get("platform_en"));
                    payload.append("platform_ru", formData.get("platform_ru"));
                    payload.append("url", formData.get("url"));
                    if (file) payload.append("icon", file);

                    try {
                      const res = await fetch(SOCIAL_API, {
                        method: "POST",
                        body: payload,
                      });
                      const newLink = await res.json();

                      setSocialLinks((prev) => [
                        ...prev,
                        {
                          id: newLink.id.toString(),
                          platform: {
                            uz: newLink.platform_uz,
                            en: newLink.platform_en,
                            ru: newLink.platform_ru,
                          },
                          url: newLink.url,
                          iconUrl: newLink.icon,
                        },
                      ]);
                      setIsDialogOpen(false);
                      setPreview(null);
                    } catch (err) {
                      console.error("Xato:", err);
                    }
                  }}
                  className="space-y-6 mt-4"
                >
                  {/* UZ */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-semibold text-purple-400 mb-3">O‘zbekcha (UZ)</h4>
                    <Input name="platform_uz" placeholder="Masalan: Telegram" required className="bg-white/5 border-white/10" />
                  </div>

                  {/* EN */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-semibold text-blue-400 mb-3">English (EN)</h4>
                    <Input name="platform_en" placeholder="e.g. Telegram" required className="bg-white/5 border-white/10" />
                  </div>

                  {/* RU */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-semibold text-green-400 mb-3">Русский (RU)</h4>
                    <Input name="platform_ru" placeholder="Например: Telegram" required className="bg-white/5 border-white/10" />
                  </div>

                  <div>
                    <Label>URL</Label>
                    <Input name="url" type="url" required placeholder="https://t.me/username" className="bg-white/5 border-white/10" />
                  </div>

                  <div>
                    <Label>Ikona yuklash</Label>
                    <input type="file" name="icon" accept="image/*" onChange={handleFileChange} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20" />
                    {preview && <img src={preview} alt="Preview" className="mt-3 w-20 h-20 rounded-lg object-contain bg-white/5" />}
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); setPreview(null); }}>
                      Bekor qilish
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500">
                      Qo‘shish
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* EDIT DIALOG */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="bg-[#0a0a1a] border-white/10 text-white w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Tahrirlash</DialogTitle>
                </DialogHeader>
                {editingLink && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const file = formData.get("icon");

                      const payload = new FormData();
                      payload.append("platform_uz", formData.get("platform_uz"));
                      payload.append("platform_en", formData.get("platform_en"));
                      payload.append("platform_ru", formData.get("platform_ru"));
                      payload.append("url", formData.get("url"));
                      if (file) payload.append("icon", file);

                      try {
                        await fetch(`${SOCIAL_API}${editingLink.id}/`, {
                          method: "PATCH",
                          body: payload,
                        });

                        setSocialLinks((prev) =>
                          prev.map((link) =>
                            link.id === editingLink.id
                              ? {
                                  ...link,
                                  platform: {
                                    uz: formData.get("platform_uz"),
                                    en: formData.get("platform_en"),
                                    ru: formData.get("platform_ru"),
                                  },
                                  url: formData.get("url"),
                                  iconUrl: file ? URL.createObjectURL(file) : link.iconUrl,
                                }
                              : link
                          )
                        );
                        setIsEditDialogOpen(false);
                        setEditingLink(null);
                        setEditPreview(null);
                      } catch (err) {
                        console.error("Xato:", err);
                      }
                    }}
                    className="space-y-6 mt-4"
                  >
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 mb-3">O‘zbekcha</h4>
                      <Input name="platform_uz" defaultValue={editingLink.platform.uz} required className="bg-white/5 border-white/10" />
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h4 className="text-sm font-semibold text-blue-400 mb-3">English</h4>
                      <Input name="platform_en" defaultValue={editingLink.platform.en} required className="bg-white/5 border-white/10" />
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h4 className="text-sm font-semibold text-green-400 mb-3">Русский</h4>
                      <Input name="platform_ru" defaultValue={editingLink.platform.ru} required className="bg-white/5 border-white/10" />
                    </div>

                    <div>
                      <Label>URL</Label>
                      <Input name="url" type="url" defaultValue={editingLink.url} required className="bg-white/5 border-white/10" />
                    </div>

                    <div>
                      <Label>Ikona o‘zgartirish</Label>
                      <input type="file" name="icon" accept="image/*" onChange={handleEditFileChange} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20" />
                      {(editPreview || editingLink.iconUrl) && (
                        <img src={editPreview || editingLink.iconUrl} alt="Preview" className="mt-3 w-20 h-20 rounded-lg object-contain bg-white/5" />
                      )}
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Bekor qilish
                      </Button>
                      <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500">
                        Saqlash
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((link) => (
              <div key={link.id} className="rounded-2xl p-6 bg-white/5 border border-white/10 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
                    {link.iconUrl ? (
                      <img src={link.iconUrl} alt={link.platform[currentLang]} className="w-6 h-6 object-contain" />
                    ) : (
                      <Globe className="w-5 h-5 text-white/60" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingLink(link);
                        setEditPreview(null);
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
                <h4 className="mb-1 truncate">{link.platform[currentLang]}</h4>
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
                        {msg.read ? "O‘qilmagan" : "O‘qilgan"}
                      </Button>
                      <Button
                        onClick={() => deleteMessage(msg.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        O‘chirish
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <p className="text-center text-white/40 mt-6">Xabarlar yo‘q.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}