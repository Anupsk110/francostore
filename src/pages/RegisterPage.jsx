import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerWithEmail, signInWithGoogle, loading } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await registerWithEmail(email, password, displayName, emailNotifications);
      navigate("/");
    } catch (err) { }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) { }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#0e0e18] w-full max-w-md p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group">
            <img
              src="/website logo/ZYREN STORE FINAL LOGO DESIGN.jpg (1).jpeg"
              alt="Zyren Store"
              className="h-14 sm:h-16 w-auto max-w-[220px] mx-auto object-contain drop-shadow-[0_0_15px_rgba(255,42,85,0.35)] transition-transform group-hover:scale-105 rounded-xl"
              onError={(e) => {
                e.currentTarget.src = "/zyren-logo.jpeg";
              }}
            />
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-slate-400">
            Join Zyren Store to unlock member discounts & community access
          </p>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-full border border-[#222238] bg-[#131320] hover:border-[#7c5cfc] text-white font-bold text-xs flex items-center justify-center gap-3 transition shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign up with Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#1b1b2a]" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">or register with email</span>
          <div className="flex-1 h-px bg-[#1b1b2a]" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Gamer / Display Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="e.g. MythicFanny"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>
          </div>

          {/* Mandatory Section 3: Opt-in Email Notification Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#131320] border border-[#7c5cfc]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="mt-0.5 rounded text-[#7c5cfc] focus:ring-[#7c5cfc] accent-[#7c5cfc] w-4 h-4 cursor-pointer"
              />
              <span className="text-[11px] text-slate-300 leading-snug">
                <strong>Notify me by email whenever new MLBB accounts are listed on the website.</strong>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white font-black text-xs shadow-lg shadow-[#7c5cfc]/25 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#7c5cfc] font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}