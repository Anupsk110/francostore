import React from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Users, 
  Receipt, 
  MessageSquare, 
  Plus, 
  ArrowRight 
} from "lucide-react";
import { useData } from "../../context/DataContext";
import { formatINR, formatDate } from "../../utils/formatters";

export default function AdminDashboard() {
  const { accounts, users, posts, receipts } = useData();

  const availableAccounts = (accounts || []).filter((a) => a.status === "available");
  const soldAccounts = (accounts || []).filter((a) => a.status === "sold");

  const totalRevenue = (receipts || []).reduce(
    (sum, r) => sum + (Number(r.finalAmountINR) || 0),
    0
  );

  const stats = [
    {
      title: "Available Accounts",
      value: availableAccounts.length,
      subtext: `${soldAccounts.length} accounts sold to date`,
      icon: ShoppingBag,
      link: "/admin/accounts",
    },
    {
      title: "Registered Users",
      value: users.length,
      subtext: `${users.filter((u) => u.emailNotifications).length} opted into email alerts`,
      icon: Users,
      link: "/admin/users",
    },
    {
      title: "Community Threads",
      value: (posts || []).length,
      subtext: "Discussions & Reviews",
      icon: MessageSquare,
      link: "/admin/community",
    },
    {
      title: "Recorded Sales",
      value: formatINR(totalRevenue),
      subtext: `${receipts.length} official receipts issued`,
      icon: Receipt,
      link: "/admin/receipts",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time analytics, marketplace listings, escrow transfers, and email receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/accounts?action=new"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Account</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              to={s.link}
              className="bg-[#0e0e18] p-5 rounded-3xl border border-[#1b1b2a] shadow-card hover:border-[#7c5cfc]/40 hover:shadow-card-hover transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400">{s.title}</span>
                  <div className="w-9 h-9 rounded-2xl bg-[#7c5cfc]/15 text-[#7c5cfc] border border-[#7c5cfc]/30 flex items-center justify-center group-hover:scale-110 transition">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-white">
                  {s.value}
                </p>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 border-t border-[#1b1b2a] pt-2 flex items-center justify-between">
                <span>{s.subtext}</span>
                <ArrowRight className="w-3 h-3 text-[#7c5cfc]" />
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent Receipts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Payment Receipts */}
        <div className="lg:col-span-8 bg-[#0e0e18] p-6 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#7c5cfc]" />
              <span>Recent Payment Receipts</span>
            </h3>
            <Link to="/admin/receipts" className="text-xs text-[#7c5cfc] font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-2.5">
            {receipts.slice(0, 4).map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-2xl bg-[#111120] border border-[#1b1b2a] flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-extrabold text-[#7c5cfc] block">
                    {rec.receiptNumber}
                  </span>
                  <span className="text-white font-medium">
                    {rec.accountTitle}
                  </span>
                  <p className="text-[10px] text-slate-400">
                    Buyer: {rec.buyerEmail} | {formatDate(rec.generatedAt)}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-black text-sm text-white block">
                    {formatINR(rec.finalAmountINR)}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {rec.emailStatus === "Sent" ? "Emailed via Brevo" : "Recorded"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations panel */}
        <div className="lg:col-span-4 bg-[#0e0e18] p-6 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
          <h3 className="font-black text-sm text-white">
            Quick Administrative Actions
          </h3>

          <div className="space-y-2">
            <Link
              to="/admin/accounts?action=new"
              className="w-full p-3 rounded-2xl bg-[#7c5cfc]/15 border border-[#7c5cfc]/30 text-[#7c5cfc] font-black text-xs flex items-center justify-between hover:bg-[#7c5cfc]/25 transition"
            >
              <span>+ Add MLBB Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/accounts"
              className="w-full p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-xs flex items-center justify-between hover:bg-emerald-500/20 transition"
            >
              <span>🛍️ View Storefront Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/admin/banners"
              className="w-full p-3 rounded-2xl bg-[#131320] border border-[#1b1b2a] text-slate-300 font-bold text-xs flex items-center justify-between hover:border-[#7c5cfc] hover:text-white transition"
            >
              <span>Manage Homepage Banners</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/admin/community"
              className="w-full p-3 rounded-2xl bg-[#131320] border border-[#1b1b2a] text-slate-300 font-bold text-xs flex items-center justify-between hover:border-[#7c5cfc] hover:text-white transition"
            >
              <span>Moderate Community Threads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/admin/settings"
              className="w-full p-3 rounded-2xl bg-[#131320] border border-[#1b1b2a] text-slate-300 font-bold text-xs flex items-center justify-between hover:border-[#7c5cfc] hover:text-white transition"
            >
              <span>Update WhatsApp Support Number</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
