import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  QrCode,
  MessageSquare,
  AlertCircle,
  Copy,
  ChevronLeft,
  ChevronRight,
  Download,
  Flame,
  Minus,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { POPULAR_GAMES, TOPUP_CATEGORIES, DIAMOND_PACKS } from "../data/topupData";
import { useData } from "../context/DataContext";
import { formatINR, formatUSD } from "../utils/formatters";
import { downloadReceiptPDF } from "../services/receiptService";
import toast from "react-hot-toast";

export default function TopUpPage() {
  const { gameId } = useParams();
  const { addReceipt } = useData();

  // Selected game / server
  const [selectedGame, setSelectedGame] = useState(() => {
    if (gameId) {
      const found = POPULAR_GAMES.find((g) => g.id === gameId);
      if (found) return found;
    }
    return POPULAR_GAMES[0];
  });

  // Keep in sync if URL param changes
  useEffect(() => {
    if (gameId) {
      const found = POPULAR_GAMES.find((g) => g.id === gameId);
      if (found) setSelectedGame(found);
    }
  }, [gameId]);

  // Form state
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedIgn, setVerifiedIgn] = useState(null);
  const [showIdGuide, setShowIdGuide] = useState(false);

  // Selected Category & Pack
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPack, setSelectedPack] = useState(DIAMOND_PACKS[0]);
  const [quantity, setQuantity] = useState(1);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi | whatsapp

  // Checkout modal
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  // Filter diamond packs
  const filteredPacks = DIAMOND_PACKS.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  // Calculate total
  const totalPrice = (selectedPack?.priceINR || 0) * quantity;
  const totalPriceUSD = Math.round(totalPrice * 0.012 * 100) / 100;

  // Handle Verify ID (Simulated instant lookup)
  const handleCheckId = () => {
    if (!userId.trim() || !zoneId.trim()) {
      toast.error("Please enter both User ID and Zone ID");
      return;
    }

    setIsVerifying(true);
    setVerifiedIgn(null);

    setTimeout(() => {
      setIsVerifying(false);
      // Realistic simulated MLBB In-Game Name based on user ID
      const mockNames = [
        "GhostViper_ML",
        "MythicBlade★",
        "ShadowKagura",
        "LunoxCarry_99",
        "ChouGod_IN",
        "AamonStrike",
        "Vanguard_Pro",
      ];
      const nameIndex = Math.abs(parseInt(userId.slice(-2)) || 0) % mockNames.length;
      const ign = mockNames[nameIndex];
      setVerifiedIgn(ign);
      toast.success(`ID Verified! Player: ${ign}`);
    }, 700);
  };

  // Handle Pay Now
  const handlePayNow = () => {
    if (!userId.trim() || !zoneId.trim()) {
      toast.error("Please enter your User ID and Zone ID first!");
      return;
    }

    setShowCheckoutModal(true);
  };

  // Confirm and generate receipt
  const handleConfirmPayment = () => {
    const receiptNum = `TOP-${Date.now().toString().slice(-6)}`;
    const newReceipt = {
      id: `rec-top-${Date.now()}`,
      receiptNumber: receiptNum,
      accountId: `topup-${selectedPack.id}`,
      accountTitle: `${selectedGame.name} - ${selectedPack.name} (Qty ${quantity})`,
      accountCategory: "Diamond Top-Up",
      accountRank: `Player: ${verifiedIgn || "MLBB Gamer"} [${userId} (${zoneId})]`,
      totalSkins: selectedPack.diamondsDesc,
      totalHeroes: `Server: ${selectedGame.region}`,
      buyerName: verifiedIgn || `User ${userId}`,
      buyerEmail: "customer@topup.mlbbhaven.com",
      originalPriceINR: totalPrice,
      originalPriceUSD: totalPriceUSD,
      discountPercentage: 0,
      discountAmountINR: 0,
      finalAmountINR: totalPrice,
      finalAmountUSD: totalPriceUSD,
      paymentMethod: paymentMethod === "upi" ? "Instant UPI / QR" : "WhatsApp Direct",
      paymentStatus: "Verified & Paid",
      generatedAt: new Date().toISOString(),
      thankYouMessage: `Thank you for recharging with MLBB Haven! Your ${selectedPack.name} is being delivered to User ID ${userId} (${zoneId}). Delivery completes in under 60 seconds.`,
    };

    const saved = addReceipt(newReceipt);
    setGeneratedReceipt(saved);
    toast.success("Order confirmed! Official receipt generated.");
  };

  // Copy helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  // Generate WhatsApp message URL
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello MLBB Haven! I want to top up:\n\n• Server: ${selectedGame.name} (${selectedGame.region})\n• User ID: ${userId || "[Pending]"}\n• Zone ID: ${zoneId || "[Pending]"}\n• IGN: ${verifiedIgn || "Not verified"}\n• Package: ${selectedPack.name}\n• Quantity: ${quantity}\n• Total Amount: ₹${totalPrice}\n\nPlease share payment QR and confirm instant delivery!`
  )}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">

      {/* Page Title + Server Selector — inline, no bulky box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            to="/"
            className="p-1.5 sm:p-2 rounded-xl bg-[#0e0e18] hover:bg-[#1b1b2d] text-slate-400 hover:text-white border border-[#1c1c2e] transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#2b2b42] bg-[#141424] flex-shrink-0 shadow-md">
            <img
              src={selectedGame.image}
              alt={selectedGame.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "/topup/mlbb_india.png"; }}
            />
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] font-black text-[#00f2fe] uppercase tracking-widest">
              ⚡ Instant Top-Up Portal
            </p>
            <h1 className="text-base sm:text-lg font-black text-white leading-tight">
              {selectedGame.name}
              <span className="text-slate-400 font-semibold text-xs sm:text-sm ml-1.5 sm:ml-2">• {selectedGame.region} Server</span>
            </h1>
          </div>
        </div>

        {/* Server Selector Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-wrap sm:flex-nowrap">
          <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold whitespace-nowrap mr-1">Server:</span>
          {POPULAR_GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => { setSelectedGame(g); setVerifiedIgn(null); }}
              className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold whitespace-nowrap transition-all duration-200 ${
                selectedGame.id === g.id
                  ? "bg-[#7c5cfc] text-white shadow-[0_0_10px_rgba(124,92,252,0.45)]"
                  : "bg-[#0e0e18] text-slate-400 border border-[#1c1c2e] hover:border-[#7c5cfc]/50 hover:text-white"
              }`}
            >
              {g.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Portal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* LEFT COLUMN: Steps 1 & 2 (Inputs & Diamond Packs) */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          
          {/* STEP 01: Player Verification */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0c0c16] border border-[#1b1b2d] relative overflow-hidden shadow-card">
            {/* Step Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#7c5cfc] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-[0_0_12px_rgba(124,92,252,0.5)]">
                  1
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#7c5cfc] tracking-widest block">
                    STEP 01
                  </span>
                  <h2 className="text-sm sm:text-lg font-black text-white">
                    Player Verification
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIdGuide(!showIdGuide)}
                className="flex items-center gap-1 text-[11px] sm:text-xs text-[#00f2fe] hover:underline font-bold"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Where is my ID?</span>
              </button>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4">
              Enter your account details so diamond delivery lands directly on the right profile.
            </p>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
              <div className="sm:col-span-7">
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  User ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter User ID (e.g. 12345678)"
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    setVerifiedIgn(null);
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#131322] border border-[#222238] focus:border-[#7c5cfc] text-white text-xs font-semibold placeholder-slate-500 focus:outline-none transition"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Zone ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Zone (e.g. 1234)"
                  value={zoneId}
                  onChange={(e) => {
                    setZoneId(e.target.value);
                    setVerifiedIgn(null);
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#131322] border border-[#222238] focus:border-[#7c5cfc] text-white text-xs font-semibold placeholder-slate-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Check ID Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={handleCheckId}
                disabled={isVerifying || !userId || !zoneId}
                className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#7c5cfc] to-[#916eff] hover:from-[#6b47fc] hover:to-[#7c5cfc] text-white text-xs font-black tracking-wide shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Moonton ID...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CHECK ID</span>
                  </>
                )}
              </button>

              <span className="text-[10px] sm:text-[11px] text-slate-500 italic text-center sm:text-right">
                Example: 12345678 (1234) ID = 12345678 and Server = 1234
              </span>
            </div>

            {/* Verified Result Banner */}
            <AnimatePresence>
              {verifiedIgn && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-black text-emerald-300">
                        Player Identified: <span className="text-white underline">{verifiedIgn}</span>
                      </p>
                      <p className="text-[10px] text-emerald-400/80">
                        Server: {selectedGame.region} • Ready for instant delivery
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] sm:text-[10px] font-extrabold uppercase">
                    Verified ✅
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Where is my ID modal helper */}
            <AnimatePresence>
              {showIdGuide && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#141424] border border-[#2b2b42] text-xs space-y-2"
                >
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#00f2fe]" />
                    How to find your User ID and Server/Zone ID:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-300 text-[11px]">
                    <li>Open Mobile Legends: Bang Bang on your device.</li>
                    <li>Tap your <strong>Profile Avatar</strong> in the top-left corner of the main lobby.</li>
                    <li>Under your avatar and nickname, locate the ID format: <code className="text-[#00f2fe] bg-black/40 px-1 py-0.5 rounded font-mono">12345678 (1234)</code>.</li>
                    <li>The first number is your <strong>User ID</strong> and the number inside parentheses is your <strong>Zone ID</strong>.</li>
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* STEP 02: Choose Your Package */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0c0c16] border border-[#1b1b2d] relative shadow-card">
            {/* Step Header */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#7c5cfc] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-[0_0_12px_rgba(124,92,252,0.5)]">
                2
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#7c5cfc] tracking-widest block">
                  STEP 02
                </span>
                <h2 className="text-sm sm:text-lg font-black text-white">
                  Choose Your Package
                </h2>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 mb-3 sm:mb-4 scrollbar-none border-b border-[#1b1b2d]">
              {TOPUP_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold whitespace-nowrap transition border ${
                    activeCategory === cat.id
                      ? "bg-[#7c5cfc]/20 border-[#7c5cfc] text-white shadow-[0_0_10px_rgba(124,92,252,0.3)]"
                      : "bg-[#121220] border-[#1d1d30] text-slate-400 hover:text-white hover:border-slate-600"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Diamond Packs Grid (Compact & reduced sizing) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3">
              {filteredPacks.map((pack) => {
                const isSelected = selectedPack?.id === pack.id;
                return (
                  <motion.div
                    key={pack.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedPack(pack)}
                    className={`relative cursor-pointer rounded-xl sm:rounded-2xl p-2.5 sm:p-3 transition-all duration-200 border flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#151526] border-[#7c5cfc] ring-1.5 ring-[#7c5cfc]/50 shadow-[0_0_15px_rgba(124,92,252,0.3)]"
                        : "bg-[#10101c] border-[#1d1d30] hover:border-[#7c5cfc]/50 hover:bg-[#131322]"
                    }`}
                  >
                    {/* Discount Badge + Selection check */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/30 text-rose-400 text-[9px] font-black tracking-wide">
                        {pack.badge}
                      </span>

                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#7c5cfc] text-white flex items-center justify-center shadow-sm">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Pack Visual Art / Icon — compact */}
                    <div className="w-full flex items-center justify-center py-1 sm:py-1.5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#19192e] border border-[#2b2b46] flex items-center justify-center shadow-inner group-hover:scale-105 transition">
                        {pack.iconType === "pass" ? (
                          <div className="relative text-center">
                            <span className="text-lg sm:text-xl">🎟️</span>
                            <span className="absolute -bottom-1 -right-1 text-[10px]">💎</span>
                          </div>
                        ) : pack.iconType === "double" ? (
                          <div className="relative text-center">
                            <span className="text-lg sm:text-xl">💎</span>
                            <span className="absolute -top-1 -right-1.5 text-[8px] bg-[#00f2fe] text-black font-black px-0.5 rounded-full">
                              2X
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg sm:text-xl filter drop-shadow-[0_0_6px_#00f2fe]">💎</span>
                        )}
                      </div>
                    </div>

                    {/* Title & Specs */}
                    <div className="text-center mt-1 flex-grow">
                      <h3 className="text-[11px] sm:text-xs font-black text-white line-clamp-1">
                        {pack.name}
                      </h3>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-2 leading-tight">
                        {pack.diamondsDesc}
                      </p>
                    </div>

                    {/* Price in INR and Original */}
                    <div className="mt-2 pt-1.5 border-t border-[#1d1d30] text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-xs sm:text-sm font-black text-emerald-400">
                          {formatINR(pack.priceINR)}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-slate-500 line-through">
                          {formatINR(pack.originalPriceINR)}
                        </span>
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-500 block">
                        ≈ {formatUSD(pack.priceUSD)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Steps 3 & 4 (Payment Method & Order Summary) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          
          {/* STEP 03: Select Payment Method */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0c0c16] border border-[#1b1b2d] shadow-card">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#7c5cfc] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-[0_0_12px_rgba(124,92,252,0.5)]">
                3
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#7c5cfc] tracking-widest block">
                  STEP 03
                </span>
                <h2 className="text-sm sm:text-base font-black text-white">
                  Select Payment Method
                </h2>
              </div>
            </div>

            <div className="space-y-2">
              {/* Option 1: Instant UPI / Direct QR */}
              <div
                onClick={() => setPaymentMethod("upi")}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl cursor-pointer transition border flex items-center justify-between ${
                  paymentMethod === "upi"
                    ? "bg-[#141424] border-[#7c5cfc] ring-1 ring-[#7c5cfc]/50"
                    : "bg-[#10101c] border-[#1d1d30] hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#7c5cfc]/20 border border-[#7c5cfc]/40 flex items-center justify-center text-[#7c5cfc] shrink-0">
                    <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Instant UPI / Direct QR</span>
                      <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[8px] sm:text-[9px] font-black">
                        ⚡ Instant
                      </span>
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-400">
                      GPay, PhonePe, Paytm, BHIM, NetBanking
                    </p>
                  </div>
                </div>

                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    paymentMethod === "upi"
                      ? "border-[#7c5cfc] bg-[#7c5cfc]"
                      : "border-slate-600"
                  }`}
                >
                  {paymentMethod === "upi" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Option 2: WhatsApp Support / Escrow */}
              <div
                onClick={() => setPaymentMethod("whatsapp")}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl cursor-pointer transition border flex items-center justify-between ${
                  paymentMethod === "whatsapp"
                    ? "bg-[#141424] border-emerald-500 ring-1 ring-emerald-500/50"
                    : "bg-[#10101c] border-[#1d1d30] hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1.5">
                      <span>WhatsApp Direct Concierge</span>
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-400">
                      Chat directly with admin for fast checkout
                    </p>
                  </div>
                </div>

                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    paymentMethod === "whatsapp"
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-slate-600"
                  }`}
                >
                  {paymentMethod === "whatsapp" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 04: Order Details & Summary */}
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0c0c16] border border-[#1b1b2d] shadow-card space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-1 sm:mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#7c5cfc] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-[0_0_12px_rgba(124,92,252,0.5)]">
                4
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#7c5cfc] tracking-widest block">
                  STEP 04
                </span>
                <h2 className="text-sm sm:text-base font-black text-white">
                  Order Details
                </h2>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Review your order and click Pay Now.
            </p>

            {/* Receipt Summary Rows */}
            <div className="space-y-2.5 text-xs pt-1 border-t border-[#1b1b2d]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Product:</span>
                <span className="font-bold text-white text-right">
                  {selectedGame.name} ({selectedGame.region})
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-medium">User ID:</span>
                <span className="font-mono text-white">
                  {userId.trim() || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Zone ID:</span>
                <span className="font-mono text-white">
                  {zoneId.trim() || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-medium">IGN:</span>
                <span className="font-bold text-[#00f2fe]">
                  {verifiedIgn || (userId ? "Pending check" : "—")}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Package:</span>
                <span className="font-bold text-white text-right">
                  {selectedPack.name}
                </span>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-[#1b1b2d]">
                <span className="text-slate-400 font-medium">Quantity:</span>
                <div className="inline-flex items-center gap-3 px-2.5 py-1 rounded-xl bg-[#141424] border border-[#222238]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-black text-white text-xs">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    disabled={quantity >= 20}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1b1b2d]">
                <span className="font-black text-white text-sm">Total Amount:</span>
                <div className="text-right">
                  <span className="font-black text-xl text-white block">
                    Rs {totalPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ≈ {formatUSD(totalPriceUSD)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 italic">
              Provide correct account information to avoid delivery delays.
            </p>

            {/* Action Buttons */}
            {paymentMethod === "upi" ? (
              <button
                type="button"
                onClick={handlePayNow}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.3)] transition flex items-center justify-center gap-2 group"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>⚡ PAY NOW</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm tracking-wide shadow-[0_0_20px_rgba(37,211,102,0.3)] transition flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Order via WhatsApp</span>
              </a>
            )}

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Moonton Authorized Top-Up</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL (QR CODE & RECEIPT CONFIRMATION) */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0c0c16] border border-[#2b2b42] p-6 shadow-2xl space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#1b1b2d] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#7c5cfc]/20 border border-[#7c5cfc]/40 flex items-center justify-center text-[#7c5cfc]">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      Instant UPI Checkout
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Scan QR or send to UPI ID for instant diamond delivery
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="p-1.5 rounded-xl bg-[#141424] text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Order Info Summary */}
              <div className="p-3.5 rounded-2xl bg-[#141424] border border-[#222238] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Item:</span>
                  <span className="font-bold text-white">{selectedPack.name} (x{quantity})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Player:</span>
                  <span className="font-bold text-[#00f2fe]">{verifiedIgn || "MLBB Gamer"} [{userId} ({zoneId})]</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-1 border-t border-[#222238]">
                  <span className="text-white">Amount Due:</span>
                  <span className="text-emerald-400">Rs {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-900 shadow-md">
                {/* Simulated dynamic UPI QR code with amount embedded */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=mlbbhaven@upi&pn=MLBBHaven&am=${totalPrice}&cu=INR`}
                  alt="UPI QR Code"
                  className="w-40 h-40 rounded-lg"
                />
                <p className="mt-2 text-xs font-bold text-slate-900">
                  Scan with GPay, PhonePe, Paytm, or BHIM
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-600">
                  <span>UPI ID: <strong className="font-mono">mlbbhaven@upi</strong></span>
                  <button
                    onClick={() => handleCopy("mlbbhaven@upi", "UPI ID")}
                    className="p-1 hover:text-[#7c5cfc]"
                    title="Copy UPI ID"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Receipt / Confirm Section */}
              {generatedReceipt ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-black text-white text-sm">
                    Receipt Generated: {generatedReceipt.receiptNumber}
                  </p>
                  <p className="text-xs text-slate-300">
                    Diamonds are being dispatched to your MLBB account. Download your invoice below:
                  </p>
                  <button
                    onClick={() => downloadReceiptPDF(generatedReceipt)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Invoice</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>I Have Completed Payment</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-2xl bg-[#141424] hover:bg-[#1b1b2d] border border-[#2b2b42] text-slate-300 hover:text-white font-bold text-xs transition flex items-center justify-center gap-2 text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Send Screenshot on WhatsApp</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

