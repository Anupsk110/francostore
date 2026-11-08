import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  MessageCircle, 
  Heart,
  Youtube,
  Instagram,
  Twitter,
  Disc as DiscordIcon 
} from "lucide-react";
import { useData } from "../../context/DataContext";
import toast from "react-hot-toast";

export default function Footer() {
  const { settings } = useData();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success("Thank you! You're now subscribed to new listing alerts.");
    setNewsletterEmail("");
  };

  const openWhatsApp = () => {
    const phone = settings.whatsappNumber?.replace(/[^0-9]/g, "") || "919876543210";
    const text = encodeURIComponent("Hello Franco Store! I need some assistance with an account / marketplace.");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <footer className="relative w-full bg-[#06060a] border-t border-[#161626] transition-colors mt-8 sm:mt-16 overflow-hidden">
      {/* Subtle background crest watermark */}
      <div className="absolute right-4 bottom-2 opacity-5 pointer-events-none">
        <img src="/crest.svg" alt="" className="w-24 h-24 sm:w-32 sm:h-32" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-5 sm:pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-2 sm:space-y-3">
            <Link to="/" className="inline-block group">
              <img
                src="/franco-logo.png?v=4"
                alt="MLBB Haven"
                className="h-6 sm:h-8 md:h-9 w-auto max-w-[140px] sm:max-w-[180px] object-contain transition-transform group-hover:scale-105 drop-shadow-[0_0_12px_rgba(124,92,252,0.3)]"
                onError={(e) => {
                  e.currentTarget.src = "/website logo/logo with name.png?v=4";
                }}
              />
            </Link>

            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-sm">
              Your one-stop platform for MLBB accounts, gaming community, and verified escrow transactions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 text-slate-300">
              <a
                href={settings.discordUrl || "https://discord.com"}
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0d0d16] border border-[#1e1e30] flex items-center justify-center hover:text-[#7c5cfc] hover:border-[#7c5cfc]/60 transition"
                aria-label="Discord"
              >
                <DiscordIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
              <a
                href={settings.youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0d0d16] border border-[#1e1e30] flex items-center justify-center hover:text-rose-400 hover:border-rose-400/60 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
              <a
                href={settings.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0d0d16] border border-[#1e1e30] flex items-center justify-center hover:text-pink-400 hover:border-pink-400/60 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
              <a
                href={settings.twitterUrl || "https://x.com"}
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0d0d16] border border-[#1e1e30] flex items-center justify-center hover:text-[#00f2fe] hover:border-[#00f2fe]/60 transition"
                aria-label="Twitter X"
              >
                <Twitter className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-span-1">
            <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-white mb-2 sm:mb-2.5">
              Quick Links
            </h4>
            <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-[#7c5cfc] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/topup" className="hover:text-[#00f2fe] text-[#00f2fe] font-semibold transition flex items-center gap-1">
                  <span>⚡ Top Up</span>
                </Link>
              </li>
              <li>
                <Link to="/accounts" className="hover:text-[#7c5cfc] transition">
                  Accounts for Sale
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-[#7c5cfc] transition">
                  Community Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="col-span-1">
            <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-white mb-2 sm:mb-2.5">
              Support
            </h4>
            <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-[#7c5cfc] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#7c5cfc] transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#7c5cfc] transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#7c5cfc] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-[#7c5cfc] transition">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Updated Newsletter */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 space-y-1.5 sm:space-y-2">
            <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-white">
              Stay Updated
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Get notified about newly listed accounts & drops.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative flex items-center max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="w-full text-[11px] sm:text-xs rounded-lg pl-3 pr-8 py-1.5 sm:py-2 bg-[#0d0d16] border border-[#1e1e30] text-white focus:outline-none focus:border-[#7c5cfc] shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#7c5cfc] hover:bg-[#6b47fc] text-white flex items-center justify-center transition shadow-sm"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </form>
          </div>

          {/* Col 5: Need Help WhatsApp (Compact & inline on mobile) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex flex-col justify-center">
            <div className="bg-[#0e0e18] rounded-xl p-2.5 sm:p-3.5 border border-[#1c1c2e] shadow-sm flex items-center justify-between sm:flex-col sm:items-stretch gap-2">
              <div className="flex items-center gap-2 sm:mb-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-400/30 text-emerald-400" />
                </div>
                <div>
                  <h5 className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    Need Help?
                  </h5>
                  <p className="text-[9px] sm:text-[10px] text-slate-400">
                    WhatsApp 24/7
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openWhatsApp}
                className="py-1 px-3 sm:py-1.5 sm:px-4 rounded-lg bg-[#7c5cfc] hover:bg-[#6b47fc] text-white text-[11px] sm:text-xs font-bold text-center transition shadow-sm shrink-0"
              >
                Chat Now
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[#151522] flex flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] text-slate-500">
          <p>© 2026 Franco Store. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500 fill-rose-500 inline" />
            <span>for MLBB Fans</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
