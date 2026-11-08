import React from "react";
import { Link } from "react-router-dom";
import { CreditCard, ArrowRight } from "lucide-react";
import { useData } from "../../context/DataContext";
import AccountCard from "./AccountCard";

export default function FeaturedAccounts() {
  const { accounts } = useData();
  
  const featured = (accounts || [])
    .filter((acc) => acc.featured && acc.status === "available")
    .slice(0, 4);

  const displayAccounts = featured.length >= 4 
    ? featured 
    : (accounts || []).filter((acc) => acc.status === "available").slice(0, 4);

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe] shadow-sm shrink-0">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Featured Accounts
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Top-tier accounts, handpicked for you.
            </p>
          </div>
        </div>

        <Link
          to="/accounts"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#7c5cfc] transition"
        >
          <span>View All Accounts</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {/* 4 Cards Grid (2 cols on mobile for clean app layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {displayAccounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </section>
  );
}
