import React from "react";
import { Zap, ShieldCheck, Gem, Trophy, Lock, Sparkles, MessageCircle, Star } from "lucide-react";

export default function MovingTicker() {
  const tickerItems = [
    {
      icon: Zap,
      iconColor: "text-[#00f2fe]",
      badge: "LIGHTNING FAST",
      text: "Instant Top-Up Delivered in 30-60 Seconds",
    },
    {
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
      badge: "100% SAFE",
      text: "Guaranteed Clean Bind & Email Surrender",
    },
    {
      icon: Gem,
      iconColor: "text-[#7c5cfc]",
      badge: "GLOBAL SERVERS",
      text: "Discounted Diamonds: India, Indo, PH, MY/SG, Russia, Turkey",
    },
    {
      icon: Trophy,
      iconColor: "text-amber-400",
      badge: "VERIFIED INVENTORY",
      text: "Exclusive Mega Collector & Mythic Glory Accounts",
    },
    {
      icon: Lock,
      iconColor: "text-cyan-400",
      badge: "ESCROW SECURITY",
      text: "Zero-Risk Escrow Protection on Every Transaction",
    },
    {
      icon: Sparkles,
      iconColor: "text-fuchsia-400",
      badge: "OFFICIAL INVOICE",
      text: "Automated Downloadable PDF Purchase Invoices",
    },
    {
      icon: Star,
      iconColor: "text-yellow-400",
      badge: "TOP RATED",
      text: "4.9/5 Community Rating from 2,500+ MLBB Gamers",
    },
    {
      icon: MessageCircle,
      iconColor: "text-emerald-400",
      badge: "DIRECT ASSISTANCE",
      text: "24/7 WhatsApp Concierge & Active Discord Community",
    },
  ];

  return (
    <div className="w-full relative py-2.5 overflow-hidden border-y border-[#1c1c2e]/60 my-2">
      {/* Subtle gradient background that blends with page */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08080c] via-[#0d0d1a] to-[#08080c] pointer-events-none" />
      {/* Very subtle accent strip */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c5cfc]/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f2fe]/20 to-transparent pointer-events-none" />

      {/* Left & Right gradient masks for smooth edge fade */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-r from-[#08080c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-l from-[#08080c] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee flex items-center gap-8 select-none">
        {[...tickerItems, ...tickerItems].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 shrink-0"
            >
              <div className="flex items-center justify-center shrink-0">
                <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                {item.badge}
              </span>
              <span className="text-slate-400 font-medium text-xs whitespace-nowrap">
                {item.text}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#7c5cfc]/50 ml-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

