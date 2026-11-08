import React, { useState, useEffect } from "react";
import { 
  X, 
  Receipt, 
  Download, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Calculator,
  User,
  Mail,
  DollarSign 
} from "lucide-react";
import { generateReceiptPDF, downloadReceiptPDF } from "../../services/receiptService";
import { formatINR, formatUSD, generateReceiptNumber } from "../../utils/formatters";
import { useData } from "../../context/DataContext";
import toast from "react-hot-toast";

export default function ReceiptModal({ account, onClose }) {
  const { users, addReceipt, sendReceiptToCustomer, markAccountAsSold } = useData();

  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [finalAmount, setFinalAmount] = useState(account?.priceINR || 0);
  const [paymentMethod, setPaymentMethod] = useState("WhatsApp / UPI Escrow");

  // Generated receipt state
  const [generatedReceipt, setGeneratedReceipt] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

  // Auto-detect buyer name when buyer email changes
  useEffect(() => {
    if (!buyerEmail.trim()) return;

    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === buyerEmail.trim().toLowerCase()
    );

    if (matchedUser && !buyerName) {
      setBuyerName(matchedUser.displayName || "");
    }
  }, [buyerEmail, users, buyerName]);

  const handleGenerateReceipt = (e) => {
    e.preventDefault();
    if (!buyerEmail) {
      toast.error("Buyer registered email is required");
      return;
    }

    const receiptNum = generateReceiptNumber();
    const newReceipt = {
      receiptNumber: receiptNum,
      accountId: account.id,
      accountTitle: account.title,
      accountCategory: account.category,
      accountRank: account.highestRank,
      totalSkins: account.totalSkins,
      totalHeroes: account.totalHeroes,
      buyerName: buyerName.trim() || "Valued Customer",
      buyerEmail: buyerEmail.trim(),
      originalPriceINR: account.priceINR,
      originalPriceUSD: account.priceUSD,
      discountPercentage: 0,
      discountAmountINR: 0,
      finalAmountINR: Number(finalAmount),
      finalAmountUSD: Math.round(Number(finalAmount) * 0.012),
      paymentMethod,
      paymentStatus: "Verified & Paid",
      thankYouMessage:
        "Thank you for choosing our marketplace! We truly appreciate your trust and support. We hope you enjoy your new MLBB account. Welcome to our gaming community!",
    };

    const saved = addReceipt(newReceipt);
    setGeneratedReceipt(saved);

    // Optionally mark account as sold automatically
    if (account.status !== "sold") {
      markAccountAsSold(account.id);
    }

    toast.success(`Receipt ${receiptNum} generated successfully!`);
  };

  const handleDownload = () => {
    if (!generatedReceipt) return;
    downloadReceiptPDF(generatedReceipt);
    toast.success("Receipt PDF downloaded to your device.");
  };

  const handleSendEmail = async () => {
    if (!generatedReceipt) return;
    setIsSendingEmail(true);
    try {
      await sendReceiptToCustomer(generatedReceipt);
      setEmailSentSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (!account) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0e0e18] w-full max-w-2xl rounded-3xl border border-[#1b1b2a] shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1b1b2a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7c5cfc]/15 border border-[#7c5cfc]/30 text-[#7c5cfc] flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white">
                Generate Payment Receipt
              </h3>
              <p className="text-xs text-slate-400">
                Official MLBB Haven verified transaction record
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Account Summary */}
        <div className="p-4 rounded-2xl bg-[#131320] border border-[#1b1b2a] flex items-center gap-4">
          <img
            src={account.mainImage}
            alt={account.title}
            className="w-16 h-12 object-cover rounded-xl border border-[#222238]"
          />
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c5cfc] bg-[#7c5cfc]/15 border border-[#7c5cfc]/30 px-2 py-0.5 rounded-full">
              {account.category}
            </span>
            <h4 className="font-bold text-sm text-white mt-1">
              {account.title}
            </h4>
            <p className="text-xs text-slate-400">
              Rank: {account.highestRank} | Price: {formatINR(account.priceINR)}
            </p>
          </div>
        </div>

        {!generatedReceipt ? (
          /* Receipt Input Form */
          <form onSubmit={handleGenerateReceipt} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Buyer Registered Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="buyer@example.com"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Buyer Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Final Purchase Amount (INR) *
                </label>
                <input
                  type="number"
                  required
                  value={finalAmount}
                  onChange={(e) => setFinalAmount(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc] font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none"
                >
                  <option value="WhatsApp / Direct UPI">WhatsApp / Direct UPI</option>
                  <option value="Direct Bank Transfer / IMPS">Direct Bank Transfer / IMPS</option>
                  <option value="Crypto (USDT / Binance)">Crypto (USDT / Binance)</option>
                  <option value="PayPal / International Wire">PayPal / International Wire</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-[#1b1b2a]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white font-black text-xs shadow-lg shadow-[#7c5cfc]/25 transition"
              >
                Generate Receipt & Mark Sold
              </button>
            </div>
          </form>
        ) : (
          /* Receipt Preview & Delivery Actions */
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-black text-emerald-300">
                  Official Receipt #{generatedReceipt.receiptNumber} Generated!
                </p>
                <p className="text-[11px] text-emerald-400/80">
                  Account status has been automatically updated to SOLD.
                </p>
              </div>
            </div>

            {/* Receipt Breakdown Box */}
            <div className="p-5 rounded-2xl bg-[#131320] border border-[#1b1b2a] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Buyer:</span>
                <span className="font-bold text-white">
                  {generatedReceipt.buyerName} ({generatedReceipt.buyerEmail})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account:</span>
                <span className="font-bold text-white">
                  {generatedReceipt.accountTitle}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#1b1b2a] font-black text-base text-[#7c5cfc]">
                <span>Total Paid Amount:</span>
                <span>{formatINR(generatedReceipt.finalAmountINR)}</span>
              </div>
            </div>

            {/* Actions: Download PDF & Send via Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="py-3 px-4 rounded-full border border-[#7c5cfc] text-[#7c5cfc] hover:bg-[#7c5cfc]/10 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Receipt</span>
              </button>

              <button
                type="button"
                onClick={handleSendEmail}
                disabled={isSendingEmail || emailSentSuccess}
                className={`py-3 px-4 rounded-full text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition ${
                  emailSentSuccess
                    ? "bg-emerald-600 shadow-emerald-600/25"
                    : "bg-[#7c5cfc] hover:bg-[#6b47f5] shadow-[#7c5cfc]/25 disabled:opacity-50"
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {emailSentSuccess
                    ? "Receipt Sent via Brevo!"
                    : isSendingEmail
                    ? "Sending via Brevo..."
                    : "Send Receipt via Email"}
                </span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
