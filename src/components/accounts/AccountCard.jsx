import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Trophy } from "lucide-react";
import { formatINR, formatUSD } from "../../utils/formatters";

export default function AccountCard({ account }) {
  const isSold = account.status === "sold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group relative bg-[#0e0e18] rounded-2xl sm:rounded-3xl border border-[#1c1c2e] hover:border-[#7c5cfc] shadow-card hover:shadow-[0_0_35px_rgba(124,92,252,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Image & Badges */}
      <div className="shine-effect relative aspect-[4/3] w-full overflow-hidden bg-[#141422]">
        <img
          src={account.mainImage}
          alt={account.title}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Availability Badge with glowing radar ping dot */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          {!isSold ? (
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[9px] sm:text-[11px] font-bold bg-[#090910]/90 text-emerald-400 border border-emerald-500/40 shadow-sm backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              </span>
              Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[9px] sm:text-[11px] font-bold bg-[#090910]/90 text-rose-400 border border-rose-500/40 shadow-sm backdrop-blur-md">
              Sold
            </span>
          )}
        </div>

        {/* Category Pill on top left */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
          <span className="px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide bg-black/85 border border-[#7c5cfc]/30 text-white backdrop-blur-md shadow-sm">
            {account.category}
          </span>
        </div>

        {/* Skin strip banner overlay along bottom of thumbnail */}
        <div className="absolute bottom-0 inset-x-0 h-6 sm:h-7 bg-gradient-to-t from-[#0e0e18] via-[#0e0e18]/80 to-transparent flex items-center px-2 sm:px-3">
          <div className="flex -space-x-1.5 overflow-hidden">
            {(account.galleryImages || []).slice(0, 5).map((img, i) => (
              <img
                key={i}
                src={img}
                alt="skin preview"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-white/40 object-cover"
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium ml-1.5 sm:ml-2 truncate">
            Verified Clean
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Title */}
          <Link to={`/account/${account.id}`} className="block">
            <h3 className="font-extrabold text-xs sm:text-sm md:text-base text-white line-clamp-1 group-hover:text-[#7c5cfc] transition-colors">
              {account.title}
            </h3>
          </Link>

          {/* Stats Bar with Hexagon Badges */}
          <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-slate-400">
            {/* Rank */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-amber-500/15 border border-amber-500/30 shape-hexagon flex items-center justify-center shrink-0">
                <Trophy className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-amber-400" />
              </div>
              <span className="font-semibold text-slate-200 truncate">
                {account.highestRank}
              </span>
            </div>

            {/* Level */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-amber-500/15 border border-amber-500/30 shape-hexagon flex items-center justify-center shrink-0">
                <Star className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-amber-400 fill-amber-400" />
              </div>
              <span>Lv. {account.level}</span>
            </div>

            {/* Skins & Heroes */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-[#00f2fe]/15 border border-[#00f2fe]/30 shape-hexagon flex items-center justify-center shrink-0">
                <Shield className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-[#00f2fe]" />
              </div>
              <span className="truncate">
                {account.totalSkins} Skins | {account.totalHeroes} Heroes
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Price & Action */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#1c1c2e] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-base md:text-lg font-black text-white group-hover:text-[#a78bfa] transition-colors">
                {formatINR(account.priceINR)}
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] text-slate-400 font-medium">
              ≈ {formatUSD(account.priceUSD)}
            </p>
          </div>

          <Link
            to={`/account/${account.id}`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#131320] border border-[#242438] text-slate-300 group-hover:bg-[#7c5cfc] group-hover:text-white group-hover:border-[#7c5cfc] group-hover:shadow-[0_0_15px_rgba(124,92,252,0.6)] flex items-center justify-center transition-all shadow-sm"
            aria-label={`View details for ${account.title}`}
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
