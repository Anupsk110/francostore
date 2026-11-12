import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, ChevronLeft, ChevronRight, Zap, ShieldCheck, CreditCard } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function HeroCarousel() {
  const { banners } = useData();
  const activeBanners = (banners || []).filter((b) => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentBanner = activeBanners[currentIndex] || {
    badge: "Mobile Legends: Bang Bang",
    title: "Your Trusted MLBB Account Marketplace.",
    subtitle: "Buy verified collector accounts, join our gaming community, and get exclusive member discounts with guaranteed clean email surrender.",
    ctaPrimaryText: "Browse Accounts",
    ctaPrimaryLink: "/accounts",
    ctaSecondaryText: "Join Community",
    ctaSecondaryLink: "/community",
    image: "/banners/Moonlit Kagura in the Misty Garden.png",
  };

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-3 sm:pb-8">
      {/* Outer Banner Card */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#1c1c2e] bg-[#090910] min-h-[210px] sm:min-h-[340px] md:min-h-[480px] lg:min-h-[520px] flex items-center shadow-2xl">
        
        {/* Full Right Side Artwork (Fills the entire height and blends seamlessly) */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-[60%] h-full overflow-hidden pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentBanner.id || currentIndex}
              src={encodeURI(currentBanner.image || "/banners/Moonlit Kagura in the Misty Garden.png")}
              alt={currentBanner.title || "Zyren Store Banner"}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full h-full object-cover object-[78%_center] sm:object-center lg:object-right"
              onError={(e) => {
                e.target.src = "/banners/Moonlit%20Kagura%20in%20the%20Misty%20Garden.png";
              }}
            />
          </AnimatePresence>

          {/* Seamless Dark Gradient Fade: Blends image into dark background for 100% text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090910] via-[#090910]/85 via-50% sm:via-30% md:via-25% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090910]/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090910]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Futuristic dot grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#7c5cfc]/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#00f2fe]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Content Area (Overlaid on top of the left side of the hero card) */}
        <div className="relative z-10 w-full p-4 sm:p-8 md:p-12 lg:p-14 max-w-xl sm:max-w-2xl lg:max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner.id || currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 sm:space-y-4 md:space-y-5"
            >
              {/* Floating Tag */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#121220]/90 backdrop-blur-md border border-[#232338] text-slate-300 text-[10px] sm:text-xs font-semibold shadow-sm">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
                </span>
                <span>{currentBanner.badge || "Mobile Legends: Bang Bang"}</span>
              </div>

              {/* Heading */}
              <h1 className="text-lg sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight sm:leading-[1.12] drop-shadow-md max-w-[250px] sm:max-w-md md:max-w-xl">
                {currentBanner.title?.includes("MLBB") ? (
                  <>
                    Your Trusted{" "}
                    <span className="text-[#7c5cfc] drop-shadow-[0_0_30px_rgba(124,92,252,0.6)]">
                      MLBB
                    </span>{" "}
                    Account Marketplace.
                  </>
                ) : (
                  currentBanner.title
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-[11px] sm:text-sm md:text-base text-slate-300 max-w-[250px] sm:max-w-md md:max-w-xl font-normal leading-relaxed drop-shadow-sm line-clamp-2 md:line-clamp-none">
                {currentBanner.subtitle ||
                  "Buy verified collector accounts, join our gaming community, and get exclusive member discounts with guaranteed clean email surrender."}
              </p>

              {/* CTA Buttons: Hidden on mobile screens to keep the banner sleek, visible on tablet and desktop */}
              <div className="hidden sm:flex pt-1 sm:pt-2 items-center gap-2.5 sm:gap-3.5">
                <Link
                  to={currentBanner.ctaPrimaryLink || "/accounts"}
                  className="shine-effect group inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-xl bg-[#7c5cfc] hover:bg-[#6a46fc] text-white text-xs sm:text-sm font-extrabold shadow-[0_0_25px_rgba(124,92,252,0.5)] transition-all duration-300"
                >
                  <span>{currentBanner.ctaPrimaryText || "Browse Accounts"}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to={currentBanner.ctaSecondaryLink || "/community"}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-[#12121e]/90 hover:bg-[#18182c] text-slate-200 hover:text-white text-xs sm:text-sm font-bold border border-[#242438] hover:border-[#7c5cfc]/50 backdrop-blur-md transition-all duration-300"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f2fe]" />
                  <span>{currentBanner.ctaSecondaryText || "Community"}</span>
                </Link>
              </div>

              {/* Trust badges: Hidden on mobile screens, visible on tablet and desktop */}
              <div className="hidden sm:flex pt-2 sm:pt-4 items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-slate-300 font-medium">
                <div className="flex items-center gap-1 bg-[#090910]/80 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/5 shrink-0 whitespace-nowrap">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00f2fe] animate-pulse" />
                  <span>Instant Transfer</span>
                </div>
                <div className="flex items-center gap-1 bg-[#090910]/80 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/5 shrink-0 whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7c5cfc]" />
                  <span>Clean Bind Surrender</span>
                </div>
                <div className="flex items-center gap-1 bg-[#090910]/80 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/5 shrink-0 whitespace-nowrap">
                  <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                  <span>Escrow Protected</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel slide controls */}
        {activeBanners.length > 1 && (
          <div className="absolute right-2.5 sm:right-6 bottom-2.5 sm:bottom-5 z-20 flex items-center gap-1 sm:gap-2 bg-[#090910]/85 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#222238] shadow-lg">
            <div className="flex items-center gap-1 sm:gap-1.5 mr-0.5 sm:mr-2">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-3.5 sm:w-6 bg-[#7c5cfc] shadow-[0_0_8px_#7c5cfc]"
                      : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handlePrev}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#121220] border border-[#222238] text-slate-300 hover:text-white flex items-center justify-center transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#121220] border border-[#222238] text-slate-300 hover:text-white flex items-center justify-center transition"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
