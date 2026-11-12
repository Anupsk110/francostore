import React from "react";
import { ShieldCheck, Award, Users, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About Zyren Store
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          The premier, trusted sanctuary for Mobile Legends: Bang Bang players, collectors, and competitive esports enthusiasts.
        </p>
      </div>

      <div className="bg-[#0e0e18] p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-6">
        <h2 className="text-2xl font-black text-white">
          Our Mission & Promise
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Founded in 2024 by veteran Mythical Glory players, <strong className="text-white">Zyren Store</strong> was created to solve the rampant issue of scams, account recalls, and untrustworthy trades in the Mobile Legends gaming space. We built a platform grounded in strict identity verification, guaranteed email surrender, and escrow security so players can buy, sell, and enjoy premium MLBB accounts with 100% peace of mind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-[#131320] border border-[#1b1b2a] space-y-2">
            <ShieldCheck className="w-7 h-7 text-[#7c5cfc]" />
            <h3 className="font-extrabold text-sm text-white">100% Verified Escrow</h3>
            <p className="text-xs text-slate-400">
              Every single listing is inspected by our administrators. We personally audit binding status before handover.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131320] border border-[#1b1b2a] space-y-2">
            <Award className="w-7 h-7 text-amber-400" />
            <h3 className="font-extrabold text-sm text-white">Collector Specialists</h3>
            <p className="text-xs text-slate-400">
              From limited-edition anime crossovers (Jujutsu Kaisen, AOT) to Aspirants and Legends, we find the rarest accounts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131320] border border-[#1b1b2a] space-y-2">
            <HeartHandshake className="w-7 h-7 text-emerald-400" />
            <h3 className="font-extrabold text-sm text-white">Legitimate Receipts</h3>
            <p className="text-xs text-slate-400">
              We generate official, serialized PDF payment receipts and dispatch them to your email for permanent recordkeeping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}