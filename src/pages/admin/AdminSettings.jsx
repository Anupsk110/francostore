import React, { useState } from "react";
import { Settings, Save, Phone, Mail, Globe, Share2, Bell } from "lucide-react";
import { useData } from "../../context/DataContext";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const { settings, setSettings } = useData();

  const [form, setForm] = useState({
    websiteName: settings.websiteName || "MLBB Haven",
    tagline: settings.tagline || "Play More. Own More.",
    whatsappNumber: settings.whatsappNumber || "+919876543210",
    contactEmail: settings.contactEmail || "support@mlbbhaven.com",
    discordUrl: settings.discordUrl || "https://discord.gg/mlbbhaven",
    youtubeUrl: settings.youtubeUrl || "https://youtube.com/@mlbbhaven",
    instagramUrl: settings.instagramUrl || "https://instagram.com/mlbbhaven",
    twitterUrl: settings.twitterUrl || "https://x.com/mlbbhaven",
    inrToUsdRate: settings.inrToUsdRate || 0.012,
    emailNotificationsEnabled: settings.emailNotificationsEnabled ?? true,
    whatsappPrefillBuy: settings.whatsappPrefillBuy || "",
    whatsappPrefillSell: settings.whatsappPrefillSell || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSettings((prev) => ({ ...prev, ...form }));
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white">
          Website & Integration Settings
        </h1>
        <p className="text-xs text-slate-400">
          Configure WhatsApp escrow phone, contact details, social links, and email broadcast toggles
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Storefront Info */}
        <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
          <h3 className="font-black text-sm text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#7c5cfc]" />
            <span>Storefront Brand Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Website Name</label>
              <input
                type="text"
                name="websiteName"
                value={form.websiteName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Escrow Settings */}
        <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
          <h3 className="font-black text-sm text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Click-to-Chat Escrow</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Admin WhatsApp Number (With Country Code)
              </label>
              <input
                type="text"
                name="whatsappNumber"
                placeholder="+919876543210"
                value={form.whatsappNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc] font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Support Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              WhatsApp Buyer Prefill Template
            </label>
            <input
              type="text"
              name="whatsappPrefillBuy"
              value={form.whatsappPrefillBuy}
              onChange={handleChange}
              placeholder="Use {title}, {price}, {email} placeholders"
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
            />
          </div>
        </div>

        {/* Currency & Email Broadcast */}
        <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
          <h3 className="font-black text-sm text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#7c5cfc]" />
            <span>Currency & Notifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                INR to USD Exchange Multiplier (e.g. 0.012 for ₹83=$1)
              </label>
              <input
                type="number"
                step="0.001"
                name="inrToUsdRate"
                value={form.inrToUsdRate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotificationsEnabled"
                  checked={form.emailNotificationsEnabled}
                  onChange={handleChange}
                  className="rounded text-[#7c5cfc] focus:ring-[#7c5cfc] accent-[#7c5cfc] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-300">
                  Enable automatic Brevo broadcast emails on new listings
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
          <h3 className="font-black text-sm text-white flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#7c5cfc]" />
            <span>Community Social Links</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Discord</label>
              <input
                type="text"
                name="discordUrl"
                value={form.discordUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">YouTube</label>
              <input
                type="text"
                name="youtubeUrl"
                value={form.youtubeUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Instagram</label>
              <input
                type="text"
                name="instagramUrl"
                value={form.instagramUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">X (Twitter)</label>
              <input
                type="text"
                name="twitterUrl"
                value={form.twitterUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white font-black text-xs shadow-lg shadow-[#7c5cfc]/25 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}