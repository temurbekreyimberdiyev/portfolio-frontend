import { useState } from 'react';
import { Plus, Trash2, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const initialContactInfo = {
  phone: '+998 90 123 45 67',
  email: 'developer@example.com',
  address: 'Tashkent, Uzbekistan',
};

const initialSocialLinks = [
  { id: '1', platform: 'Telegram', url: 'https://t.me/username', icon: '✈️' },
  { id: '2', platform: 'Instagram', url: 'https://instagram.com/username', icon: '📷' },
  { id: '3', platform: 'GitHub', url: 'https://github.com/username', icon: '💻' },
  { id: '4', platform: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: '💼' },
];

const sampleMessages = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hi! I would like to discuss a project with you.',
    date: '2025-10-15',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@company.com',
    message: 'We are looking for a developer for our startup. Are you available?',
    date: '2025-10-12',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@tech.com',
    message: 'Your portfolio is impressive! Let\'s connect.',
    date: '2025-10-10',
  },
];

export default function ContactManagement() {
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [messages] = useState(sampleMessages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteSocial = (id) => {
    setSocialLinks(socialLinks.filter((s) => s.id !== id));
  };

  const handleAddSocial = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newLink = {
      id: Date.now().toString(),
      platform: formData.get('platform'),
      url: formData.get('url'),
      icon: formData.get('icon'),
    };

    setSocialLinks([...socialLinks, newLink]);
    setIsDialogOpen(false);
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
                    <Label htmlFor="icon">Icon / Emoji</Label>
                    <Input id="icon" name="icon" placeholder="e.g., 🐦" className="bg-white/5 border-white/10" required />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((link) => (
              <div key={link.id} className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{link.icon}</div>
                  <button
                    onClick={() => handleDeleteSocial(link.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="mb-1">{link.platform}</h4>
                <p className="text-sm text-white/50 truncate">{link.url}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* MESSAGES TAB */}
        <TabsContent value="messages" className="mt-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4>{msg.name}</h4>
                        <p className="text-sm text-white/50">{msg.email}</p>
                      </div>
                      <span className="text-sm text-white/40">
                        {new Date(msg.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white/70">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
