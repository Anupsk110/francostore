import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err) {}
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#0e0e18] w-full max-w-md p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#7c5cfc]/15 border border-[#7c5cfc]/30 text-[#7c5cfc] flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">
            Reset Password
          </h1>
          <p className="text-xs text-slate-400">
            Enter your registered email and we'll send you recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-[#111122] border border-[#7c5cfc]/40 text-center space-y-3">
            <p className="text-xs text-slate-200 font-semibold">
              Password reset link sent to <strong>{email}</strong>.
            </p>
            <Link
              to="/login"
              className="inline-block px-5 py-2 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white font-black text-xs shadow-lg shadow-[#7c5cfc]/25 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#7c5cfc]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}