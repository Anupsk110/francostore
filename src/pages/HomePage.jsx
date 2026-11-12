import React from "react";
import HeroCarousel from "../components/hero/HeroCarousel";
import MovingTicker from "../components/common/MovingTicker";
import FeaturedAccounts from "../components/accounts/FeaturedAccounts";
import CommunitySection from "../components/community/CommunitySection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Moving Text Live Marquee Ticker */}
      <MovingTicker />

      {/* 3. Featured Accounts Section */}
      <FeaturedAccounts />

      {/* 4. Join Our Community Section */}
      <CommunitySection />
    </div>
  );
}
