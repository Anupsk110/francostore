import React, { useState } from "react";
import { Receipt, Download, Send, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";
import { downloadReceiptPDF } from "../../services/receiptService";
import { formatINR, formatUSD, formatDate } from "../../utils/formatters";
import toast from "react-hot-toast";

export default function AdminReceipts() {
  const { receipts, sendReceiptToCustomer } = useData();
  const [search, setSearch] = useState("");
  const [sendingId, setSendingId] = useState(null);

  const handleResend = async (receipt) => {
    setSendingId(receipt.id);
    try {
      await sendReceiptToCustomer(receipt);
    } catch (err) {
      console.error(err);
    } finally {
      setSendingId(null);
    }
  };

  const filtered = (receipts || []).filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.receiptNumber.toLowerCase().includes(q) ||
      r.buyerEmail.toLowerCase().includes(q) ||
      r.accountTitle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">
            Payment Receipts & Invoices
          </h1>
          <p className="text-xs text-slate-400">
            Official transactional records generated for verified buyer transfers
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by receipt # or buyer email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#131320] border border-[#1b1b2a] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
          />
        </div>
      </div>

      <div className="bg-[#0e0e18] rounded-3xl border border-[#1b1b2a] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111120] text-slate-400 uppercase font-black border-b border-[#1b1b2a] text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Receipt Number</th>
                <th className="p-4">Buyer Details</th>
                <th className="p-4">Account Purchased</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Total Paid</th>
                <th className="p-4">Brevo Email</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1b2a]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#131320]/60 transition">
                  <td className="p-4">
                    <span className="font-extrabold text-[#7c5cfc] block">
                      {r.receiptNumber}
                    </span>
                    <span className="text-[10px] text-slate-500">{formatDate(r.generatedAt)}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-white block">
                      {r.buyerName}
                    </span>
                    <span className="text-[11px] text-slate-400">{r.buyerEmail}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-200 block">
                      {r.accountTitle}
                    </span>
                    <span className="text-[10px] text-slate-500">Orig: {formatINR(r.originalPriceINR)}</span>
                  </td>

                  <td className="p-4">
                    {r.discountAmountINR > 0 ? (
                      <span className="text-emerald-400 font-bold">
                        -{formatINR(r.discountAmountINR)} ({r.discountPercentage}%)
                      </span>
                    ) : (
                      <span className="text-slate-500">None</span>
                    )}
                  </td>

                  <td className="p-4">
                    <span className="font-black text-white block text-sm">
                      {formatINR(r.finalAmountINR)}
                    </span>
                    <span className="text-[10px] text-slate-500">≈ {formatUSD(r.finalAmountUSD)}</span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        r.emailStatus === "Sent"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {r.emailStatus || "Pending"}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => downloadReceiptPDF(r)}
                      className="p-1.5 rounded-xl bg-[#7c5cfc]/15 text-[#7c5cfc] border border-[#7c5cfc]/30 hover:bg-[#7c5cfc]/25 transition"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleResend(r)}
                      disabled={sendingId === r.id}
                      className="p-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition disabled:opacity-50"
                      title="Send Receipt via Brevo"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}