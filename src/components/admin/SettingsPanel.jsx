import { Moon, Sun, Globe, Lock } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { useState } from 'react'

export default function SettingsPanel() {
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('en')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2">Settings</h2>
        <p className="text-white/60">Manage your admin panel preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h3>Theme Mode</h3>
              <p className="text-sm text-white/60">Choose your preferred theme</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <span>Dark Mode</span>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border transition-all ${
                theme === 'light'
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <Sun className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <Moon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Dark</span>
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3>Language</h3>
              <p className="text-sm text-white/60">Select content language</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { code: 'en', label: "🇬🇧 English", short: 'EN' },
              { code: 'uz', label: "🇺🇿 O'zbekcha", short: 'UZ' },
              { code: 'ru', label: '🇷🇺 Русский', short: 'RU' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full p-4 rounded-xl border transition-all text-left ${
                  language === lang.code
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg">{lang.label}</div>
                    <div className="text-xs text-white/50">{lang.short}</div>
                  </div>
                  {language === lang.code && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3>Security</h3>
            <p className="text-sm text-white/60">Update your password and security settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••"
              className="bg-white/5 border-white/10 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="••••••••"
              className="bg-white/5 border-white/10 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className="bg-white/5 border-white/10 mt-2"
            />
          </div>
        </div>

        <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
          Update Password
        </Button>
      </div>
    </div>
  )
}
