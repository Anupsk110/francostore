import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  ShoppingBag, 
  Crown, 
  Info, 
  Mail, 
  Menu, 
  X,
  ShieldCheck,
  Search,
  Sparkles,
  Zap
} from "lucide-react";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useAuth();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Top Up", path: "/topup", icon: Zap },
    { name: "Accounts for Sale", path: "/accounts", icon: ShoppingBag },
    { name: "Community", path: "/community", icon: Users },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080c]/80 backdrop-blur-xl border-b border-[#1c1c2e]/90 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 md:h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center group py-1 shrink-0">
          <img
            src="/franco-logo.png?v=4"
            alt="MLBB Haven"
            className="h-7 sm:h-9 md:h-[40px] w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[210px] object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(124,92,252,0.3)]"
            onError={(e) => {
              e.currentTarget.src = "/website logo/logo with name.png?v=4";
            }}
          />
        </Link>

        {/* Desktop Center Navigation */}
        <nav className="hidden lg:flex items-center bg-[#0d0d16]/90 border border-[#1c1c2e] rounded-full p-1 shadow-card">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 transform hover:scale-[1.03] active:scale-95 ${
                  isActive
                    ? "bg-[#7c5cfc] text-white shadow-[0_0_18px_rgba(124,92,252,0.6)] font-bold"
                    : "text-slate-300 hover:text-white hover:bg-[#151524]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <Link
            to="/accounts"
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#0f0f18] border border-[#1e1e30] text-slate-300 hover:text-white hover:border-[#7c5cfc]/50 transition"
            title="Search listings"
          >
            <Search className="w-3.5 h-3.5" />
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#7c5cfc]/20 text-[#a78bfa] border border-[#7c5cfc]/40 hover:bg-[#7c5cfc]/30 hover:border-[#7c5cfc] transition shadow-[0_0_15px_rgba(124,92,252,0.2)]"
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>Admin</span>
            </Link>
          )}

          <UserMenu />

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-[#151524] transition focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1c1c2e] bg-[#09090f]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#7c5cfc] text-white shadow-[0_0_15px_rgba(124,92,252,0.4)]"
                    : "text-slate-300 hover:bg-[#141422] hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#a78bfa] bg-[#7c5cfc]/15 border border-[#7c5cfc]/30 transition"
            >
              <ShieldCheck className="w-4 h-4 text-[#00f2fe]" />
              <span>Admin Management Panel</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
