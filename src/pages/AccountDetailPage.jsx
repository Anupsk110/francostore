import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Trophy, 
  Star, 
  Shield, 
  Check, 
  MessageCircle, 
  Share2, 
  Sparkles,
  Receipt,
  Crown,
  FileCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { formatINR, formatUSD } from "../utils/formatters";
import toast from "react-hot-toast";

export default function AccountDetailPage({ onOpenReceiptModal }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts, settings } = useData();
  const { currentUser, isAdmin } = useAuth();

  const account = (accounts || []).find((a) => a.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!account) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white">Account Not Found</h2>
        <p className="text-sm text-slate-400 mt-2">The account you are looking for does not exist or has been removed.</p>
        <Link to="/accounts" className="mt-4 inline-block px-5 py-2 rounded-full bg-[#7c5cfc] text-white text-xs font-bold shadow-[0_0_15px_rgba(124,92,252,0.4)]">
          Back to Accounts
        </Link>
      </div>
    );
  }

  const gallery = account.galleryImages && account.galleryImages.length > 0 
    ? account.galleryImages 
    : [account.mainImage];

  const isSold = account.status === "sold";

  // WhatsApp Click to Chat
  const handleBuyOnWhatsApp = () => {
    if (isSold) {
      toast.error("This account has already been sold.");
      return;
    }

    const phone = settings.whatsappNumber?.replace(/[^0-9]/g, "") || "919876543210";
    const buyerEmail = currentUser?.email || "[Guest / Not Registered]";
    const priceToQuote = account.priceINR;

    const message = settings.whatsappPrefillBuy
      ? settings.whatsappPrefillBuy
          .replace("{title}", account.title)
          .replace("{price}", priceToQuote.toLocaleString("en-IN"))
          .replace("{email}", buyerEmail)
      : `Hello! I'm interested in purchasing the MLBB account listed as ${account.title}. The listed price is ₹${priceToQuote.toLocaleString("en-IN")}. My registered email is ${buyerEmail}. Please provide more details about the purchase.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: account.title,
        text: `Check out this ${account.title} on MLBB Haven!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#131320] border border-[#222238] text-slate-300 hover:text-white hover:border-[#7c5cfc] transition shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full rounded-3xl overflow-hidden bg-[#10101c] border border-[#1c1c2e] shadow-2xl flex items-center justify-center min-h-[440px] max-h-[750px]">
            <img
              src={gallery[selectedImageIndex] || account.mainImage}
              alt={account.title}
              className="w-full h-full max-h-[750px] object-contain object-top"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-black/80 border border-white/10 text-white backdrop-blur-md">
                {account.category}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10">
              {!isSold ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#090910]/90 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)] backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                  Available Now
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-400 border border-rose-800 shadow-md backdrop-blur-md">
                  Sold Out
                </span>
              )}
            </div>

            {/* Gallery Navigation arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev + 1) % gallery.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                    idx === selectedImageIndex
                      ? "border-[#7c5cfc] scale-105 shadow-[0_0_12px_rgba(124,92,252,0.5)]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Box */}
          <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1c1c2e] shadow-card space-y-3">
            <h3 className="font-extrabold text-base text-white">
              Account Overview & Collector Vault
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {account.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1c1c2e]">
              <div className="p-3 rounded-2xl bg-[#141422] border border-[#202034] text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Win Rate</p>
                <p className="text-sm font-black text-[#c4b5fd] mt-0.5">
                  {account.winRate || "65%+"}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#141422] border border-[#202034] text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Matches</p>
                <p className="text-sm font-black text-amber-400 mt-0.5">
                  {account.matches || "2,000+"}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#141422] border border-[#202034] text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Emblems</p>
                <p className="text-sm font-black text-[#00f2fe] mt-0.5">
                  {account.emblemLevel || "Max Lv. 60"}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#141422] border border-[#202034] text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Server</p>
                <p className="text-sm font-black text-emerald-400 mt-0.5">
                  {account.server || "Global/Asia"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Purchase Call to Action (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e0e18] p-6 sm:p-7 rounded-3xl border border-[#1c1c2e] shadow-card space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#c4b5fd] bg-[#7c5cfc]/20 border border-[#7c5cfc]/40 px-3 py-0.5 rounded-full">
                  {account.category}
                </span>
                <span className="text-xs text-slate-500">• ID: {account.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {account.title}
              </h1>
            </div>

            {/* Spec Badges Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-[#1c1c2e]">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Rank</p>
                  <p className="text-xs font-bold text-slate-200">{account.highestRank}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Level</p>
                  <p className="text-xs font-bold text-slate-200">Level {account.level}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#00f2fe] shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Total Skins</p>
                  <p className="text-xs font-bold text-slate-200">{account.totalSkins} Skins</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Heroes</p>
                  <p className="text-xs font-bold text-slate-200">{account.totalHeroes} Heroes</p>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-[#131320] border border-[#202034]">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Listed Price
              </p>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {formatINR(account.priceINR)}
                </span>
                <span className="text-xs text-[#00f2fe] font-semibold">
                  (≈{formatUSD(account.priceUSD)})
                </span>
              </div>
            </div>

            {/* Purchase Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleBuyOnWhatsApp}
                disabled={isSold}
                className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-3 transition-all shadow-lg ${
                  isSold
                    ? "bg-[#181828] text-slate-500 cursor-not-allowed border border-[#222238]"
                    : "bg-[#7c5cfc] hover:bg-[#6b47fc] text-white shadow-[0_0_25px_rgba(124,92,252,0.45)] transform hover:-translate-y-0.5"
                }`}
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#7c5cfc]" />
                <span>{isSold ? "Account Already Sold" : "Buy This Account on WhatsApp"}</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                🛡️ Verified escrow purchase. Clicking connects directly with our administrator to verify binding details and execute secure transfer.
              </p>

              {/* Admin Quick Action: Generate Payment Receipt */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => onOpenReceiptModal && onOpenReceiptModal(account)}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#7c5cfc]/40 bg-[#7c5cfc]/15 text-[#c4b5fd] text-xs font-bold hover:bg-[#7c5cfc]/25 transition flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4 text-[#00f2fe]" />
                  <span>Admin: Generate Payment Receipt for this Account</span>
                </button>
              )}
            </div>

            {/* Trust Checklist */}
            <div className="pt-4 border-t border-[#1c1c2e] space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Clean Moonton & Gmail surrender guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant login delivery upon WhatsApp verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official PDF payment receipt emailed directly to you</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
