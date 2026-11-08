import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  SlidersHorizontal, 
  X, 
  Sparkles,
  ShoppingBag,
  Tag,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Zap
} from "lucide-react";
import { useData } from "../context/DataContext";
import AccountCard from "../components/accounts/AccountCard";
import { formatINR } from "../utils/formatters";

export default function AccountsPage() {
  const { accounts, categories } = useData();

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Accounts");
  const [selectedRank, setSelectedRank] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSkins, setMinSkins] = useState(0);
  const [statusFilter, setStatusFilter] = useState("available");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const ranksList = ["All", "Mythical Glory", "Mythic", "Legend", "Epic"];

  // Filter logic
  const filteredAccounts = useMemo(() => {
    return (accounts || []).filter((account) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = account.title?.toLowerCase().includes(term);
        const matchesCategory = account.category?.toLowerCase().includes(term);
        const matchesRank = account.highestRank?.toLowerCase().includes(term);
        const matchesDesc = account.description?.toLowerCase().includes(term);
        if (!matchesTitle && !matchesCategory && !matchesRank && !matchesDesc) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== "All Accounts" && account.category !== selectedCategory) {
        return false;
      }

      // Rank
      if (selectedRank !== "All" && !account.highestRank?.toLowerCase().includes(selectedRank.toLowerCase())) {
        return false;
      }

      // Price range
      if (minPrice && account.priceINR < Number(minPrice)) return false;
      if (maxPrice && account.priceINR > Number(maxPrice)) return false;

      // Minimum skins
      if (minSkins > 0 && (account.totalSkins || 0) < minSkins) return false;

      // Status
      if (statusFilter === "available" && account.status !== "available") return false;
      if (statusFilter === "sold" && account.status !== "sold") return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceINR - b.priceINR;
      if (sortBy === "price-desc") return b.priceINR - a.priceINR;
      if (sortBy === "skins-desc") return (b.totalSkins || 0) - (a.totalSkins || 0);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [accounts, searchTerm, selectedCategory, selectedRank, minPrice, maxPrice, minSkins, statusFilter, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Accounts");
    setSelectedRank("All");
    setMinPrice("");
    setMaxPrice("");
    setMinSkins(0);
    setStatusFilter("available");
    setSortBy("newest");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121220] border border-[#232338] text-xs font-bold text-[#00f2fe] uppercase tracking-wider mb-2">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Verified Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Accounts for Sale
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Browse verified Mobile Legends accounts. Guaranteed clean bindings, instant WhatsApp escrow, and member discounts up to 20%.
        </p>
      </div>

      {/* Sell Your Account Banner */}
      <div className="relative mb-6 rounded-2xl overflow-hidden border border-[#2a1f4a] bg-gradient-to-r from-[#0f0a1e] via-[#130d24] to-[#0a0f1e]">
        {/* Glow accents */}
        <div className="absolute top-0 left-0 w-48 h-full bg-[#7c5cfc]/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-40 h-24 bg-[#00f2fe]/8 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-5">
          {/* Left: Icon + Text */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7c5cfc]/20 border border-[#7c5cfc]/40 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(124,92,252,0.3)]">
              <Tag className="w-5 h-5 text-[#7c5cfc]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#7c5cfc] mb-0.5">
                Sell with Franco
              </p>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                Want to sell your account?
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Get the best price, fast payment & safe escrow — submit in minutes.
              </p>
            </div>
          </div>

          {/* Right: Perks + CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            {/* Quick perks */}
            <div className="hidden md:flex flex-col gap-1.5 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400" /> Instant Payment</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Safe Escrow</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="w-3 h-3 text-[#7c5cfc]" /> Best Market Rates</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                to="/sell"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c5cfc] to-[#916eff] hover:from-[#6b47fc] hover:to-[#7c5cfc] text-white text-xs font-black tracking-wide shadow-[0_0_16px_rgba(124,92,252,0.4)] transition whitespace-nowrap"
              >
                <Tag className="w-3.5 h-3.5" />
                Sell My Account
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20MLBB%20Haven!%20I%20want%20to%20sell%20my%20MLBB%20account."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-bold transition whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-[#0e0e18] p-4 rounded-3xl border border-[#1c1c2e] shadow-card mb-6 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by account title, hero, collector skin, or rank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc] transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown & Filter Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-8 pr-8 py-2.5 rounded-xl text-xs font-semibold bg-[#131320] border border-[#222238] text-slate-200 focus:outline-none focus:border-[#7c5cfc] appearance-none cursor-pointer"
              >
                <option value="newest" className="bg-[#131320]">Sort: Newest First</option>
                <option value="price-asc" className="bg-[#131320]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#131320]">Price: High to Low</option>
                <option value="skins-desc" className="bg-[#131320]">Most Skins</option>
              </select>
            </div>

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
                minPrice || maxPrice || minSkins > 0 || selectedRank !== "All" || statusFilter !== "available"
                  ? "bg-[#7c5cfc]/20 text-[#c4b5fd] border-[#7c5cfc]/50 shadow-[0_0_12px_rgba(124,92,252,0.3)]"
                  : "bg-[#131320] text-slate-300 border-[#222238] hover:text-white hover:bg-[#1a1a2a]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? "bg-[#7c5cfc] text-white shadow-[0_0_15px_rgba(124,92,252,0.4)]"
                  : "bg-[#131320] text-slate-400 hover:text-white hover:bg-[#181828]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expanded Filter Panel */}
        {mobileFilterOpen && (
          <div className="pt-4 border-t border-[#1c1c2e] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-top-2 duration-150">
            {/* Rank Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                Highest Rank
              </label>
              <select
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-[#131320] border border-[#222238] text-slate-200 focus:outline-none focus:border-[#7c5cfc]"
              >
                {ranksList.map((r) => (
                  <option key={r} value={r} className="bg-[#131320]">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                Price Range (INR)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-3 py-2 rounded-xl text-xs bg-[#131320] border border-[#222238] text-slate-200 focus:outline-none focus:border-[#7c5cfc]"
                />
                <span className="text-slate-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-3 py-2 rounded-xl text-xs bg-[#131320] border border-[#222238] text-slate-200 focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>
            </div>

            {/* Minimum Skins */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5 flex justify-between">
                <span>Min Skins: {minSkins}+</span>
              </label>
              <input
                type="range"
                min="0"
                max="500"
                step="50"
                value={minSkins}
                onChange={(e) => setMinSkins(Number(e.target.value))}
                className="w-full accent-[#7c5cfc] cursor-pointer"
              />
            </div>

            {/* Status & Reset */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                  Availability
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#131320] border border-[#222238] text-slate-200 focus:outline-none focus:border-[#7c5cfc]"
                >
                  <option value="available" className="bg-[#131320]">Available Only</option>
                  <option value="all" className="bg-[#131320]">All (Available & Sold)</option>
                  <option value="sold" className="bg-[#131320]">Sold Only</option>
                </select>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-900/50 transition"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count & Grid */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs font-bold text-slate-400">
          Showing {filteredAccounts.length} of {accounts.length} accounts
        </p>
      </div>

      {filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0e0e18] rounded-3xl border border-dashed border-[#1c1c2e] p-8">
          <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="font-bold text-base text-slate-200">
            No accounts match your criteria
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords, price range, or category filter to discover more available listings.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-5 py-2 rounded-full bg-[#7c5cfc] text-white text-xs font-bold shadow-[0_0_15px_rgba(124,92,252,0.4)] hover:bg-[#6b47fc] transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
