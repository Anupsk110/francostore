import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  User,
  Mail,
  Crown,
  Bell,
  Receipt,
  Download,
  Calendar,
  Check,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { downloadReceiptPDF } from "../services/receiptService";
import { formatINR, formatDate } from "../utils/formatters";
import toast from "react-hot-toast";

export default function UserProfilePage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);

  const { currentUser, updateUserProfile } = useAuth();
  const { receipts } = useData();

  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [emailNotifications, setEmailNotifications] = useState(
    currentUser?.emailNotifications ?? true
  );

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-white">Please sign in to view your profile</h2>
        <Link to="/login" className="mt-4 inline-block px-6 py-2.5 rounded-full bg-[#7c5cfc] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25">
          Sign In
        </Link>
      </div>
    );
  }

  // Filter receipts belonging to this buyer email only (or all if admin)
  const myReceipts = (receipts || []).filter(
    (r) =>
      r.buyerEmail?.toLowerCase() === currentUser.email?.toLowerCase() ||
      currentUser.role === "admin"
  );

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateUserProfile({
      displayName,
      emailNotifications,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Badge */}
      <div className="bg-[#0e0e18] p-6 sm:p-8 rounded-3xl border border-[#1b1b2a] shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <img
            src={currentUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.email}`}
            alt={currentUser.displayName}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#7c5cfc] shadow-md shadow-[#7c5cfc]/20"
          />
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {currentUser.displayName || "Gamer"}
              </h1>
              {currentUser.role === "admin" && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c5cfc]/15 text-[#7c5cfc] border border-[#7c5cfc]/30 font-black">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{currentUser.email}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Member since {formatDate(currentUser.registeredAt || new Date())}
            </p>
          </div>
        </div>

        {/* Account Status Badge */}
        <div className="flex items-center gap-3 p-3 px-5 rounded-2xl bg-[#131320] border border-[#1b1b2a]">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Account Status</p>
            <p className="text-sm font-extrabold text-white">
              Verified Player
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1b1b2a] pb-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition ${activeTab === "profile"
            ? "bg-[#7c5cfc] text-white shadow-md shadow-[#7c5cfc]/20"
            : "text-slate-400 hover:text-white hover:bg-[#131320]"
            }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile Settings</span>
        </button>

        <button
          onClick={() => setActiveTab("purchases")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition ${activeTab === "purchases"
            ? "bg-[#7c5cfc] text-white shadow-md shadow-[#7c5cfc]/20"
            : "text-slate-400 hover:text-white hover:bg-[#131320]"
            }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Purchase History & Receipts ({myReceipts.length})</span>
        </button>
      </div>

      {/* Tab 1: Profile Settings Form */}
      {activeTab === "profile" && (
        <div className="bg-[#0e0e18] p-6 sm:p-8 rounded-3xl border border-[#1b1b2a] shadow-card max-w-2xl space-y-6">
          <h3 className="font-black text-base text-white">
            Personal Details & Email Preferences
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Email Address (Permanent)
              </label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#111120] border border-[#1b1b2a] text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Email Notification Preference (Mandatory user specification from Section 3) */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#131320] border border-[#7c5cfc]/30 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="mt-0.5 rounded text-[#7c5cfc] focus:ring-[#7c5cfc] accent-[#7c5cfc] w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Notify me by email whenever new MLBB accounts are listed on the website.
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Get instant notifications about newly published collector, mythic, and anime crossover accounts.
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Purchase History & Payment Receipts */}
      {activeTab === "purchases" && (
        <div className="bg-[#0e0e18] p-6 sm:p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-white">
                Your Purchased Accounts & Official Receipts
              </h3>
              <p className="text-xs text-slate-400">
                Official PDF invoices issued by Zyren Store for completed transactions.
              </p>
            </div>
          </div>

          {myReceipts.length > 0 ? (
            <div className="space-y-3">
              {myReceipts.map((receipt) => (
                <div
                  key={receipt.id}
                  className="p-5 rounded-2xl bg-[#111120] border border-[#1b1b2a] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#7c5cfc]">
                        {receipt.receiptNumber}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                        {receipt.paymentStatus || "Verified & Paid"}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-white">
                      {receipt.accountTitle}
                    </h4>

                    <p className="text-xs text-slate-400">
                      Date: {formatDate(receipt.generatedAt)} | Channel: {receipt.paymentMethod || "WhatsApp Escrow"}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className="text-right">
                      <p className="text-base font-black text-white">
                        {formatINR(receipt.finalAmountINR)}
                      </p>
                      {receipt.discountAmountINR > 0 && (
                        <p className="text-[10px] text-emerald-400 font-bold">
                          Member Discount Applied (-{formatINR(receipt.discountAmountINR)})
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => downloadReceiptPDF(receipt)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-[#1b1b2a] rounded-2xl p-6">
              <Receipt className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-white">No purchases recorded yet</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                Once an administrator verifies your account purchase via WhatsApp, your official PDF payment receipt will appear here.
              </p>
              <Link
                to="/accounts"
                className="mt-4 inline-block px-5 py-2 rounded-full bg-[#7c5cfc] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25"
              >
                Browse Accounts
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}