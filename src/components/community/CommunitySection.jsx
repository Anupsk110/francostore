import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ArrowRight } from "lucide-react";
import { useData } from "../../context/DataContext";
import CommunityCard from "./CommunityCard";

export default function CommunitySection() {
  const { posts } = useData();
  const displayPosts = (posts || []).slice(0, 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7c5cfc]/15 border border-[#7c5cfc]/30 flex items-center justify-center text-[#7c5cfc] shadow-sm shrink-0">
            <MessageSquare className="w-4 h-4 fill-[#7c5cfc]/30" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Join Our Community
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Share, discuss and connect with fellow MLBB players!
            </p>
          </div>
        </div>

        <Link
          to="/community"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7c5cfc] hover:bg-[#6b47fc] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(124,92,252,0.35)] transition"
        >
          <span>Visit Community</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Community Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <CommunityCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
