import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ChevronRight, ShieldCheck, Clock, Flame } from "lucide-react";
import { POPULAR_GAMES } from "../../data/topupData";

export default function TopUpSection() {
  const navigate = useNavigate();

  const handleSelectGame = (gameId) => {
    navigate(`/topup/${gameId}`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header matching reference */}
      <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Popular Games</span>
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f2fe]" />
            </span>
            Instant Top-Up
          </span>
        </div>

        <Link
          to="/topup"
          className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#141424] hover:bg-[#1a1a2e] text-[#7c5cfc] hover:text-[#957dfc] border border-[#24243a] text-[11px] sm:text-xs font-bold transition-all shadow-sm"
        >
          <span>Open Top-Up Portal</span>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </Link>
      </div>

      {/* Grid of Popular Game / Server Cards (3 cols on mobile for clean app look) */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3">
        {POPULAR_GAMES.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelectGame(game.id)}
            className="group relative cursor-pointer rounded-xl sm:rounded-2xl bg-[#0c0c16] border border-[#1b1b2d] hover:border-[#7c5cfc] p-1.5 sm:p-2 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(124,92,252,0.3)] flex flex-col overflow-hidden"
          >
            {/* Top Artwork Container */}
            <div className="shine-effect relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#141424] border border-[#222236] group-hover:border-[#7c5cfc]/50 transition-colors duration-300">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "/topup/mlbb_india.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Info & Action */}
            <div className="pt-1.5 pb-0.5 px-0.5 flex flex-col justify-between">
              <h3 className="text-[11px] sm:text-xs font-bold text-white group-hover:text-[#7c5cfc] transition-colors truncate">
                {game.name}
              </h3>
              <p className="text-[9px] sm:text-[11px] text-slate-400 font-semibold group-hover:text-white transition-colors mt-0.5 flex items-center justify-between">
                <span>Buy Now</span>
                <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#7c5cfc] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges Strip */}
      <div className="relative mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0c0c16] border border-[#1b1b2d] overflow-hidden text-xs">
        <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300">
          <div className="w-7 h-7 sm:w-8 sm:h-8 shape-hexagon bg-[#7c5cfc]/20 border border-[#7c5cfc]/50 flex items-center justify-center text-[#7c5cfc] shrink-0">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <p className="font-bold text-white text-[11px] sm:text-xs">Automated Instant Delivery</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Diamonds land directly in MLBB inbox in 60s</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300 relative z-10">
          <div className="w-7 h-7 sm:w-8 sm:h-8 shape-hexagon bg-[#00f2fe]/20 border border-[#00f2fe]/50 flex items-center justify-center text-[#00f2fe] shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="font-bold text-white text-[11px] sm:text-xs">No Password Needed</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">100% Safe: Only User ID & Server ID required</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300 relative z-10">
          <div className="w-7 h-7 sm:w-8 sm:h-8 shape-hexagon bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="font-bold text-white text-[11px] sm:text-xs">Official Invoices & Receipts</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Downloadable PDF receipts sent to email</p>
          </div>
        </div>
      </div>
    </section>
  );
}

