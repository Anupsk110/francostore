import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Image as BannerIcon, 
  Users, 
  Crown, 
  MessageSquare, 
  Receipt, 
  Settings, 
  ArrowLeft,
  ShieldCheck,
  LogOut,
  Menu,
  X 
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, switchDemoRole } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Security check: if not admin, show unauthorized screen
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-[#0e0e18] max-w-md w-full p-8 rounded-3xl border border-rose-900/60 shadow-2xl text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-950/60 text-rose-500 border border-rose-500/30 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white">Admin Access Restricted</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            You must be an authorized Administrator to access the Zyren Store control panel.
          </p>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => switchDemoRole("admin")}
              className="w-full py-2.5 px-4 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white font-black text-xs shadow-lg shadow-[#7c5cfc]/25 transition"
            >
              Switch to Administrator Account (Demo)
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-2 px-4 rounded-full text-slate-400 text-xs font-semibold hover:text-white"
            >
              Return to Public Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard },
    { name: "Accounts & Listings", path: "/admin/accounts", icon: ShoppingBag },
    { name: "Homepage Banners", path: "/admin/banners", icon: BannerIcon },
    { name: "Community Moderation", path: "/admin/community", icon: MessageSquare },
    { name: "Registered Users", path: "/admin/users", icon: Users },
    { name: "Payment Receipts", path: "/admin/receipts", icon: Receipt },
    { name: "Website Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#08080c] flex">
      {/* Desktop Sidebar (w-64) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0e0e18] border-r border-[#1b1b2a] shrink-0 sticky top-0 h-screen z-30">
        {/* Brand header */}
        <div className="p-6 border-b border-[#1b1b2a] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/website logo/ZYREN STORE FINAL LOGO DESIGN.jpg (1).jpeg"
              alt="Zyren Store"
              className="w-10 h-10 object-contain rounded-xl drop-shadow-[0_0_8px_rgba(255,42,85,0.4)]"
              onError={(e) => {
                e.currentTarget.src = "/zyren-logo.jpeg";
              }}
            />
            <div>
              <span className="font-black text-sm text-white block leading-tight">
                ZYREN ADMIN
              </span>
              <span className="text-[10px] text-red-500 font-black uppercase tracking-wider">
                Management Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#7c5cfc] text-white shadow-lg shadow-[#7c5cfc]/25"
                    : "text-slate-400 hover:bg-[#131320] hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & return to site */}
        <div className="p-4 border-t border-[#1b1b2a] space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-[#131320] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden sticky top-0 z-40 bg-[#0e0e18]/90 backdrop-blur-md border-b border-[#1b1b2a] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/website logo/ZYREN STORE FINAL LOGO DESIGN.jpg (1).jpeg"
              alt="Zyren Store"
              className="w-8 h-8 object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/zyren-logo.jpeg";
              }}
            />
            <span className="font-black text-sm text-white">Zyren Admin</span>
          </div>

          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:bg-[#131320]"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile slide menu */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-[#0e0e18] border-b border-[#1b1b2a] p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                    isActive ? "bg-[#7c5cfc] text-white shadow-md" : "text-slate-300 hover:bg-[#131320]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-400"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}