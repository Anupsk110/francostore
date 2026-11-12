import React, { useState } from "react";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, X } from "lucide-react";
import { useData } from "../../context/DataContext";
import { uploadImageToCloudinary } from "../../services/cloudinary";
import toast from "react-hot-toast";

export default function AdminBanners() {
  const { banners, addBanner, updateBanner, deleteBanner } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [badge, setBadge] = useState("✨ Welcome to Zyren Store");
  const [title, setTitle] = useState("Your Trusted MLBB Account Marketplace");
  const [subtitle, setSubtitle] = useState("Buy verified accounts, join our gaming community and get instant verified delivery.");
  const [ctaPrimaryText, setCtaPrimaryText] = useState("Browse Accounts");
  const [ctaPrimaryLink, setCtaPrimaryLink] = useState("/accounts");
  const [ctaSecondaryText, setCtaSecondaryText] = useState("Join Community");
  const [ctaSecondaryLink, setCtaSecondaryLink] = useState("/community");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop");
  const [isUploading, setIsUploading] = useState(false);

  const openNew = () => {
    setEditingBanner(null);
    setBadge("✨ Welcome to Zyren Store");
    setTitle("Your Trusted MLBB Account Marketplace");
    setSubtitle("Buy verified accounts, join our gaming community and get instant verified delivery.");
    setCtaPrimaryText("Browse Accounts");
    setCtaPrimaryLink("/accounts");
    setCtaSecondaryText("Join Community");
    setCtaSecondaryLink("/community");
    setImageUrl("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop");
    setIsModalOpen(true);
  };

  const openEdit = (b) => {
    setEditingBanner(b);
    setBadge(b.badge || "");
    setTitle(b.title || "");
    setSubtitle(b.subtitle || "");
    setCtaPrimaryText(b.ctaPrimaryText || "Browse Accounts");
    setCtaPrimaryLink(b.ctaPrimaryLink || "/accounts");
    setCtaSecondaryText(b.ctaSecondaryText || "Join Community");
    setCtaSecondaryLink(b.ctaSecondaryLink || "/community");
    setImageUrl(b.image || "");
    setIsModalOpen(true);
  };

  const handleImageFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await uploadImageToCloudinary(file, "banners");
      setImageUrl(res.url);
      toast.success("Banner image uploaded to Cloudinary!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      badge,
      title,
      subtitle,
      ctaPrimaryText,
      ctaPrimaryLink,
      ctaSecondaryText,
      ctaSecondaryLink,
      image: imageUrl,
      active: true,
    };

    if (editingBanner) {
      updateBanner(editingBanner.id, data);
    } else {
      addBanner(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">
            Homepage Banner Carousel
          </h1>
          <p className="text-xs text-slate-400">
            Customize hero banners, background artwork, headings, and promotional call-to-actions
          </p>
        </div>

        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b, idx) => (
          <div
            key={b.id}
            className="bg-[#0e0e18] rounded-3xl border border-[#1b1b2a] shadow-card overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[16/7] w-full bg-[#08080c]">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-amber-300 border border-amber-300/20">
                {b.badge}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={() => updateBanner(b.id, { active: !b.active })}
                  className={`p-1.5 rounded-full backdrop-blur-md text-xs font-bold transition ${
                    b.active ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                  title={b.active ? "Banner is Active" : "Banner is Hidden"}
                >
                  {b.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-extrabold text-base text-white">
                {b.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">{b.subtitle}</p>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-[#1b1b2a]">
                <span className="text-[11px] text-slate-500">Order: #{idx + 1}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(b)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#7c5cfc] hover:bg-[#131320] transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Delete banner?")) deleteBanner(b.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-[#131320] transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e18] w-full max-w-xl rounded-3xl border border-[#1b1b2a] shadow-2xl p-6 sm:p-8 space-y-4 my-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b1b2a]">
              <h3 className="font-black text-lg text-white">
                {editingBanner ? "Edit Hero Banner" : "New Hero Banner"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Top Badge</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Heading</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Primary Button Label</label>
                  <input
                    type="text"
                    value={ctaPrimaryText}
                    onChange={(e) => setCtaPrimaryText(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Primary Destination</label>
                  <input
                    type="text"
                    value={ctaPrimaryLink}
                    onChange={(e) => setCtaPrimaryLink(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Banner Image (Upload or URL)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#7c5cfc]/20 file:text-[#7c5cfc] hover:file:bg-[#7c5cfc]/30 cursor-pointer"
                />
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full mt-2 px-3 py-1.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>

              <div className="pt-3 border-t border-[#1b1b2a] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-xs font-semibold text-slate-400 rounded-full hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}