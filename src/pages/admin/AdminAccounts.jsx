import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Receipt, 
  Star, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Upload, 
  X,
  Image as ImageIcon 
} from "lucide-react";
import { useData } from "../../context/DataContext";
import { uploadImageToCloudinary } from "../../services/cloudinary";
import { formatINR, formatUSD } from "../../utils/formatters";
import ReceiptModal from "../../components/receipt/ReceiptModal";
import toast from "react-hot-toast";

export default function AdminAccounts() {
  const [searchParams] = useSearchParams();
  const { accounts, categories, addAccount, updateAccount, deleteAccount, markAccountAsSold, restoreAccount, toggleFeatured } = useData();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(searchParams.get("action") === "new");
  const [editingAccount, setEditingAccount] = useState(null);

  // Active account for Receipt Generation Modal
  const [receiptTargetAccount, setReceiptTargetAccount] = useState(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Mega Collector");
  const [priceINR, setPriceINR] = useState(15000);
  const [priceUSD, setPriceUSD] = useState(180);
  const [totalSkins, setTotalSkins] = useState(300);
  const [totalHeroes, setTotalHeroes] = useState(100);
  const [highestRank, setHighestRank] = useState("Mythical Glory");
  const [level, setLevel] = useState(120);
  const [winRate, setWinRate] = useState("65%");
  const [emblemLevel, setEmblemLevel] = useState("Max Level 60 (All 9)");
  const [description, setDescription] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const openNewModal = () => {
    setEditingAccount(null);
    setTitle("");
    setCategory("Mega Collector");
    setPriceINR(15000);
    setPriceUSD(180);
    setTotalSkins(300);
    setTotalHeroes(100);
    setHighestRank("Mythical Glory");
    setLevel(120);
    setWinRate("65%");
    setEmblemLevel("Max Level 60 (All 9)");
    setDescription("");
    setMainImageUrl("https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=800&auto=format&fit=crop");
    setFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (acc) => {
    setEditingAccount(acc);
    setTitle(acc.title);
    setCategory(acc.category);
    setPriceINR(acc.priceINR);
    setPriceUSD(acc.priceUSD);
    setTotalSkins(acc.totalSkins);
    setTotalHeroes(acc.totalHeroes);
    setHighestRank(acc.highestRank);
    setLevel(acc.level);
    setWinRate(acc.winRate || "65%");
    setEmblemLevel(acc.emblemLevel || "Max Level 60");
    setDescription(acc.description);
    setMainImageUrl(acc.mainImage);
    setFeatured(acc.featured || false);
    setIsModalOpen(true);
  };

  const handleImageFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await uploadImageToCloudinary(file, "accounts");
      setMainImageUrl(res.url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = {
      title,
      category,
      priceINR: Number(priceINR),
      priceUSD: Number(priceUSD),
      totalSkins: Number(totalSkins),
      totalHeroes: Number(totalHeroes),
      highestRank,
      level: Number(level),
      winRate,
      emblemLevel,
      description,
      mainImage: mainImageUrl,
      galleryImages: [mainImageUrl],
      featured,
    };

    if (editingAccount) {
      updateAccount(editingAccount.id, accountData);
    } else {
      await addAccount(accountData);
    }
    setIsModalOpen(false);
  };

  const filtered = (accounts || []).filter((acc) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!acc.title.toLowerCase().includes(q) && !acc.category.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (categoryFilter !== "All" && acc.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">
            MLBB Account Management
          </h1>
          <p className="text-xs text-slate-400">
            Publish, edit, mark accounts sold, and issue official payment receipts
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Account</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0e0e18] p-4 rounded-3xl border border-[#1b1b2a] shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#131320] border border-[#1b1b2a] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#1b1b2a] text-slate-200 focus:outline-none focus:border-[#7c5cfc]"
          >
            <option value="All">All Categories</option>
            {categories.filter((c) => c !== "All Accounts").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-[#0e0e18] rounded-3xl border border-[#1b1b2a] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111120] text-slate-400 uppercase font-black border-b border-[#1b1b2a] text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Account</th>
                <th className="p-4">Category & Rank</th>
                <th className="p-4">Stats</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1b2a]">
              {filtered.map((acc) => (
                <tr key={acc.id} className="hover:bg-[#131320]/60 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.mainImage}
                        alt=""
                        className="w-12 h-10 object-cover rounded-xl border border-[#222238]"
                      />
                      <div>
                        <span className="font-extrabold text-white block line-clamp-1">
                          {acc.title}
                        </span>
                        <span className="text-[10px] text-slate-500">ID: {acc.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-[#7c5cfc] block">{acc.category}</span>
                    <span className="text-slate-400">{acc.highestRank}</span>
                  </td>

                  <td className="p-4 text-slate-300">
                    <div>{acc.totalSkins} Skins | {acc.totalHeroes} Heroes</div>
                    <span className="text-[10px] text-slate-500">Lv. {acc.level}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-black text-white block">
                      {formatINR(acc.priceINR)}
                    </span>
                    <span className="text-[10px] text-slate-400">≈ {formatUSD(acc.priceUSD)}</span>
                  </td>

                  <td className="p-4">
                    {acc.status === "available" ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-black text-[10px]">
                        Available
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-black text-[10px]">
                        Sold
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right space-x-1">
                    {/* Generate Receipt Quick Action */}
                    <button
                      onClick={() => setReceiptTargetAccount(acc)}
                      className="p-1.5 rounded-xl bg-[#7c5cfc]/15 text-[#7c5cfc] border border-[#7c5cfc]/30 hover:bg-[#7c5cfc]/25 transition"
                      title="Generate Official Payment Receipt"
                    >
                      <Receipt className="w-4 h-4" />
                    </button>

                    {/* Featured toggle */}
                    <button
                      onClick={() => toggleFeatured(acc.id)}
                      className={`p-1.5 rounded-xl transition ${
                        acc.featured
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          : "text-slate-400 hover:text-amber-400 hover:bg-[#131320]"
                      }`}
                      title={acc.featured ? "Remove from Featured" : "Feature on Homepage"}
                    >
                      <Star className="w-4 h-4" />
                    </button>

                    {/* Sold toggle */}
                    {acc.status === "available" ? (
                      <button
                        onClick={() => markAccountAsSold(acc.id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-[#131320] transition"
                        title="Mark as Sold"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => restoreAccount(acc.id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-[#131320] transition"
                        title="Restore to Available"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(acc)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-[#7c5cfc] hover:bg-[#131320] transition"
                      title="Edit Account"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${acc.title}?`)) {
                          deleteAccount(acc.id);
                        }
                      }}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-[#131320] transition"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e18] w-full max-w-2xl rounded-3xl border border-[#1b1b2a] shadow-2xl p-6 sm:p-8 space-y-4 my-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b1b2a]">
              <h3 className="font-black text-lg text-white">
                {editingAccount ? "Edit MLBB Account" : "Add New MLBB Listing"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mega Collector Account"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  >
                    {categories.filter((c) => c !== "All Accounts").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={priceINR}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPriceINR(val);
                      setPriceUSD(Math.round(val * 0.012));
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Price (USD)</label>
                  <input
                    type="number"
                    required
                    value={priceUSD}
                    onChange={(e) => setPriceUSD(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Skins</label>
                  <input
                    type="number"
                    required
                    value={totalSkins}
                    onChange={(e) => setTotalSkins(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Heroes</label>
                  <input
                    type="number"
                    required
                    value={totalHeroes}
                    onChange={(e) => setTotalHeroes(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Rank</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mythical Glory"
                    value={highestRank}
                    onChange={(e) => setHighestRank(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Level</label>
                  <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Win Rate</label>
                  <input
                    type="text"
                    value={winRate}
                    onChange={(e) => setWinRate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                  />
                </div>
              </div>

              {/* Main Image Upload (Cloudinary) */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Main Account Image (Upload to Cloudinary or URL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#7c5cfc]/20 file:text-[#7c5cfc] hover:file:bg-[#7c5cfc]/30 cursor-pointer"
                  />
                  {isUploading && <span className="text-xs text-[#7c5cfc] animate-pulse font-bold">Uploading...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Or enter direct image URL"
                  value={mainImageUrl}
                  onChange={(e) => setMainImageUrl(e.target.value)}
                  className="w-full mt-2 px-3 py-1.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Collector skins, prime skins, bindings, and delivery info..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc] resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-[#7c5cfc] focus:ring-[#7c5cfc] accent-[#7c5cfc] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="featCheck" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Feature on Homepage Hero & Top Showcase
                </label>
              </div>

              <div className="pt-3 border-t border-[#1b1b2a] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition"
                >
                  {editingAccount ? "Save Changes" : "Publish Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Receipt Modal */}
      {receiptTargetAccount && (
        <ReceiptModal
          account={receiptTargetAccount}
          onClose={() => setReceiptTargetAccount(null)}
        />
      )}
    </div>
  );
}