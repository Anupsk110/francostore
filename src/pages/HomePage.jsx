import React from "react";
import HeroCarousel from "../components/hero/HeroCarousel";
import MovingTicker from "../components/common/MovingTicker";
import TopUpSection from "../components/topup/TopUpSection";
import FeaturedAccounts from "../components/accounts/FeaturedAccounts";
import CommunitySection from "../components/community/CommunitySection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col gap-5">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Moving Text Live Marquee Ticker */}
      <MovingTicker />

      {/* 3. Instant Gaming Top-Up Section (Replaced Subscription Model) */}
      <TopUpSection />

      {/* 4. Featured Accounts Section */}
      <FeaturedAccounts />

      {/* 5. Join Our Community Section */}
      <CommunitySection />
    </div>
  );
}
