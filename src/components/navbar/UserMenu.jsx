import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  User, 
  ShieldCheck, 
  Crown, 
  Receipt, 
  LogOut, 
  LogIn, 
  RefreshCw,
  Sparkles 
} from "lucide-react";

export default function UserMenu() {
  const { currentUser, isAdmin, switchDemoRole, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentUser) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c5cfc] hover:bg-[#6a46fc] text-white text-xs font-bold shadow-[0_0_20px_rgba(124,92,252,0.4)] transition transform hover:-translate-y-0.5"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Sign In</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-0.5 rounded-full border-2 border-[#7c5cfc]/80 hover:border-[#7c5cfc] transition shadow-[0_0_15px_rgba(124,92,252,0.3)] bg-[#0d0d16]"
        aria-label="User Menu"
      >
        <img
          src={currentUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.email}`}
          alt={currentUser.displayName || "User"}
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0f0f18] border border-[#1e1e30] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
          <div className="px-4 py-2.5 border-b border-[#1c1c2e]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-white truncate">
                {currentUser.displayName || "Gamer"}
              </p>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {currentUser.email}
            </p>
          </div>

          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#151524] transition"
            >
              <User className="w-4 h-4 text-[#7c5cfc]" />
              <span>My Profile & Settings</span>
            </Link>

            <Link
              to="/profile?tab=purchases"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#151524] transition"
            >
              <Receipt className="w-4 h-4 text-[#00f2fe]" />
              <span>Purchase History & Receipts</span>
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#a78bfa] bg-[#7c5cfc]/15 hover:bg-[#7c5cfc]/25 border-y border-[#7c5cfc]/20 transition"
              >
                <ShieldCheck className="w-4 h-4 text-[#00f2fe]" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>

          {/* Role switcher */}
          <div className="px-4 py-2 border-t border-[#1c1c2e] bg-[#090910]">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-[#7c5cfc]" /> Quick Switch Role
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  switchDemoRole("admin");
                  setOpen(false);
                }}
                className={`text-[10px] font-semibold py-1 px-2 rounded-lg border transition text-center ${
                  isAdmin
                    ? "bg-[#7c5cfc] text-white border-[#7c5cfc] shadow-[0_0_10px_rgba(124,92,252,0.4)]"
                    : "bg-[#141422] border-[#222238] text-slate-300 hover:text-white"
                }`}
              >
                Administrator
              </button>
              <button
                type="button"
                onClick={() => {
                  switchDemoRole("user");
                  setOpen(false);
                }}
                className={`text-[10px] font-semibold py-1 px-2 rounded-lg border transition text-center ${
                  !isAdmin
                    ? "bg-[#7c5cfc] text-white border-[#7c5cfc] shadow-[0_0_10px_rgba(124,92,252,0.4)]"
                    : "bg-[#141422] border-[#222238] text-slate-300 hover:text-white"
                }`}
              >
                Regular Buyer
              </button>
            </div>
          </div>

          <div className="pt-1 border-t border-[#1c1c2e]">
            <button
              onClick={() => {
                logout();
                setOpen(false);
                navigate("/");
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/30 transition text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
