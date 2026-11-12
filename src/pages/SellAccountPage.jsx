import React, { useState } from "react";
import { 
  Tag, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  HelpCircle, 
  FileText,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Zap
} from "lucide-react";
import { useData } from "../context/DataContext";
import { formatINR } from "../utils/formatters";

export default function SellAccountPage() {
  const { settings } = useData();

  // Interactive valuation calculator state
  const [calcRank, setCalcRank] = useState("Mythic");
  const [calcSkins, setCalcSkins] = useState(250);
  const [calcLegends, setCalcLegends] = useState(1);

  const calculateEstimate = () => {
    let base = 3000;
    if (calcRank === "Mythical Glory") base += 4000;
    if (calcRank === "Mythic") base += 2000;
    if (calcRank === "Legend") base += 1000;

    const skinsVal = calcSkins * 25;
    const legendVal = calcLegends * 3000;
    const low = Math.round((base + skinsVal + legendVal) * 0.85);
    const high = Math.round((base + skinsVal + legendVal) * 1.15);

    return { low, high };
  };

  const estimate = calculateEstimate();

  const handleContactWhatsApp = () => {
    const phone = settings.whatsappNumber?.replace(/[^0-9]/g, "") || "919876543210";
    const text = settings.whatsappPrefillSell || "Hello! I want to sell my MLBB account through your marketplace. Please guide me through the account evaluation and listing process.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121220] border border-[#232338] text-[#00f2fe] text-xs font-bold uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5" />
          <span>Verified Escrow & Instant Payouts</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Sell Your MLBB Account
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Get top-market valuation and safe escrow payout for your Mobile Legends account. Thousands of buyers are waiting for collector accounts.
        </p>
      </div>

      {/* 3 Step Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1c1c2e] shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#7c5cfc]/20 text-[#c4b5fd] border border-[#7c5cfc]/30 flex items-center justify-center font-black text-lg">
            1
          </div>
          <h3 className="font-extrabold text-base text-white">
            Submit Details & Screenshots
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Message our verified admin on WhatsApp with your account profile, skin inventory, and binding status.
          </p>
        </div>

        <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1c1c2e] shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-black text-lg">
            2
          </div>
          <h3 className="font-extrabold text-base text-white">
            Instant Valuation & Offer
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We evaluate your skins, emblems, and rank within 15 minutes and offer either instant direct buyout or featured marketplace listing.
          </p>
        </div>

        <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1c1c2e] shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-black text-lg">
            3
          </div>
          <h3 className="font-extrabold text-base text-white">
            Fast Payout via UPI / Bank
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Receive full payment immediately upon successful credential handover. Zero chargeback risk.
          </p>
        </div>
      </div>

      {/* Interactive Account Valuation Tool */}
      <div className="bg-gradient-to-r from-[#120a26] via-[#0d0d1a] to-[#0a1520] border border-[#202038] text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold">
              <Calculator className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>Instant Valuation Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              How Much Is Your Account Worth?
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use our real-time estimation model based on recent completed transactions on Zyren Store.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rank Tier</label>
                <select
                  value={calcRank}
                  onChange={(e) => setCalcRank(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl text-xs bg-[#131320] border border-[#242438] text-white focus:outline-none"
                >
                  <option value="Mythical Glory" className="bg-[#131320]">Mythical Glory / Immortal</option>
                  <option value="Mythic" className="bg-[#131320]">Mythic</option>
                  <option value="Legend" className="bg-[#131320]">Legend</option>
                  <option value="Epic" className="bg-[#131320]">Epic & Below</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Total Skins: {calcSkins}</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={calcSkins}
                  onChange={(e) => setCalcSkins(Number(e.target.value))}
                  className="w-full accent-[#7c5cfc] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Legend / Prime Skins: {calcLegends}</label>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={calcLegends}
                  onChange={(e) => setCalcLegends(Number(e.target.value))}
                  className="w-full accent-[#00f2fe] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0b0b14]/90 backdrop-blur-md p-6 rounded-3xl border border-[#222238] text-center space-y-4 shadow-xl">
            <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              Estimated Market Value
            </p>
            <div className="text-3xl sm:text-4xl font-black text-[#00f2fe] drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              {formatINR(estimate.low)} - {formatINR(estimate.high)}
            </div>
            <p className="text-[11px] text-slate-400">
              Final valuation is determined based on rare collector skins, win rates, and emblem max levels.
            </p>

            <button
              type="button"
              onClick={handleContactWhatsApp}
              className="w-full py-3.5 px-6 rounded-xl bg-[#7c5cfc] hover:bg-[#6b47fc] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(124,92,252,0.4)]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Submit Account on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submission Requirements & Rules */}
      <div className="bg-[#0e0e18] p-8 rounded-3xl border border-[#1c1c2e] shadow-card space-y-6">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#7c5cfc]" />
          <span>Listing Requirements & Security Protocol</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Clean Email Surrender:</strong> You must provide the original Moonton email and password, or change the bind to our secure admin transfer address.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>No 3rd-Party Binds:</strong> Facebook, TikTok, VK, or Google Play accounts must be cleanly disconnected before handover.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Zero Violation History:</strong> Accounts with history of cheats, win-trading, or active mute/chat penalties are strictly rejected.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Identity Verification:</strong> Sellers of high-tier accounts (&gt;₹25,000) may be required to verify government ID for anti-fraud protection.</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1c1c2e] text-center">
          <button
            type="button"
            onClick={handleContactWhatsApp}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#7c5cfc] hover:bg-[#6b47fc] text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(124,92,252,0.4)] transition"
          >
            <span>Start Selling Your Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
