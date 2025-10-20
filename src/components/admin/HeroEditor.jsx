import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import exampleAvatar from '../../assets/avatar.png'; // O‘zingizning rasm yo‘lingizni kiriting

export default function HeroEditor({ language = 'en' }) {
  const [avatarUrl, setAvatarUrl] = useState(exampleAvatar);
  const [content, setContent] = useState({
    intro: {
      en: "I write code and create content about it!",
      uz: "Men kod yozaman va u haqida kontent yarataman!",
      ru: "Я пишу код и создаю контент об этом!",
    },
    headline: {
      en: "Full Stack Developer",
      uz: "Full Stack Dasturchi",
      ru: "Full Stack Разработчик",
    },
    subheadline: {
      en: "I create modern web applications with passion and precision",
      uz: "Men zamonaviy veb-ilovalarni ishtiyoq va aniqlik bilan yarataman",
      ru: "Я создаю современные веб-приложения с энтузиазмом и точностью",
    },
    ctaContact: {
      en: "Contact Me",
      uz: "Bog'lanish",
      ru: "Связаться со мной",
    },
    ctaCv: {
      en: "Download CV",
      uz: "CV yuklab olish",
      ru: "Скачать резюме",
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (field, value) => {
    setContent({
      ...content,
      [field]: {
        ...content[field],
        [language]: value,
      },
    });
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="text-3xl mb-2">Hero Section Editor</h2>
        <p className="text-white/60">Customize your portfolio hero section</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10">
            <Label>Avatar Image</Label>
            <div className="mt-4 flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload New</span>
                </div>
              </label>
            </div>
          </div>

          {/* Language Indicator */}
          <div className="rounded-2xl p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10">
            <p className="text-sm">
              Editing in: <strong className="uppercase">{language}</strong>
            </p>
            <p className="text-xs text-white/60 mt-1">
              Switch language in Settings to edit other translations
            </p>
          </div>

          {/* Content Fields */}
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 space-y-4">
            <div>
              <Label htmlFor="intro">Intro Text</Label>
              <Textarea
                id="intro"
                value={content.intro[language]}
                onChange={(e) => handleUpdate('intro', e.target.value)}
                className="bg-white/5 border-white/10 mt-2"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="headline">Main Headline</Label>
              <Input
                id="headline"
                value={content.headline[language]}
                onChange={(e) => handleUpdate('headline', e.target.value)}
                className="bg-white/5 border-white/10 mt-2"
              />
            </div>

            <div>
              <Label htmlFor="subheadline">Subheadline</Label>
              <Textarea
                id="subheadline"
                value={content.subheadline[language]}
                onChange={(e) => handleUpdate('subheadline', e.target.value)}
                className="bg-white/5 border-white/10 mt-2"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaContact">Contact Button</Label>
                <Input
                  id="ctaContact"
                  value={content.ctaContact[language]}
                  onChange={(e) => handleUpdate('ctaContact', e.target.value)}
                  className="bg-white/5 border-white/10 mt-2"
                />
              </div>

              <div>
                <Label htmlFor="ctaCv">CV Button</Label>
                <Input
                  id="ctaCv"
                  value={content.ctaCv[language]}
                  onChange={(e) => handleUpdate('ctaCv', e.target.value)}
                  className="bg-white/5 border-white/10 mt-2"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="rounded-2xl p-8 bg-white/5 backdrop-blur-lg border border-white/10">
          <h3 className="text-lg mb-4 text-white/60">Preview</h3>
          <div className="text-center space-y-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mx-auto">
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2">
              <p className="text-white/80">{content.intro[language]}</p>
              <h1 className="text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {content.headline[language]}
              </h1>
              <p className="text-white/70">{content.subheadline[language]}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                {content.ctaContact[language]}
              </Button>
              <Button variant="outline" className="border-white/20">
                {content.ctaCv[language]}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
