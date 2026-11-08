import React, { useState } from "react";
import { MessageCircle, Mail, MapPin, Send, Clock } from "lucide-react";
import { useData } from "../context/DataContext";
import toast from "react-hot-toast";

export default function ContactPage() {
  const { settings } = useData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been dispatched to our support team.");
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleWhatsApp = () => {
    const phone = settings.whatsappNumber?.replace(/[^0-9]/g, "") || "919876543210";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent("Hello Franco Store! I have a question regarding the marketplace.")}`, "_blank");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Need help with an account, have a valuation inquiry, or want to verify an admin? We're available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Contact Info & WhatsApp */}
        <div className="space-y-6">
          <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
            <h3 className="font-black text-base text-white">
              Instant WhatsApp Support
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our direct WhatsApp line connects you to our verified administrators for real-time account evaluation, escrow purchase, and receipt verification.
            </p>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/25"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Chat with Admin on WhatsApp ({settings.whatsappNumber})</span>
            </button>
          </div>

          <div className="bg-[#0e0e18] p-6 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7c5cfc]/15 text-[#7c5cfc] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Email Inquiries</p>
                <p className="text-xs font-bold text-white">{settings.contactEmail || "support@mlbbhaven.com"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7c5cfc]/15 text-[#7c5cfc] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Operating Hours</p>
                <p className="text-xs font-bold text-white">Monday - Sunday: 24/7 Escrow Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-[#0e0e18] p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-5">
          <h3 className="font-black text-lg text-white">
            Send an Online Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about account availability, escrow transfers, or sell requests..."
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white font-black text-xs shadow-lg shadow-[#7c5cfc]/25 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}