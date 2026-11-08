import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { timeAgo } from "../../utils/formatters";
import { useData } from "../../context/DataContext";

export default function CommunityCard({ post }) {
  const { upvotePost } = useData();

  const getTagStyle = (category) => {
    switch (category?.toLowerCase()) {
      case "review":
        return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
      case "announcement":
        return "bg-[#00f2fe]/15 text-[#67e8f9] border border-[#00f2fe]/30";
      case "discussion":
      default:
        return "bg-[#7c5cfc]/15 text-[#c4b5fd] border border-[#7c5cfc]/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative bg-[#0a0a12] rounded-2xl p-4 sm:p-5 border border-[#1a1a2a] hover:border-[#7c5cfc]/50 shadow-lg hover:shadow-[0_0_20px_rgba(124,92,252,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="relative z-10">
        {/* Author Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <img
              src={post.authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${post.authorName}`}
              alt={post.authorName}
              className="w-7 h-7 rounded-full object-cover border border-[#7c5cfc]/30 transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">
                {post.authorName}
              </h4>
              <p className="text-[9px] text-slate-500">
                {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>

          {/* Category Tag */}
          <span
            className={`text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm transition-transform duration-300 ${getTagStyle(
              post.category
            )}`}
          >
            {post.category || "Discussion"}
          </span>
        </div>

        {/* Content Row: Text + Thumbnail */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Link to={`/community/post/${post.id}`}>
              <h3 className="font-extrabold text-sm text-white line-clamp-1 group-hover:text-[#7c5cfc] transition-colors">
                {post.title}
              </h3>
            </Link>
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {post.content}
            </p>
          </div>

          {post.image && (
            <Link to={`/community/post/${post.id}`} className="shrink-0 overflow-hidden rounded-xl border border-[#222238] bg-[#141424]">
              <img
                src={post.image}
                alt="Post thumbnail"
                className="w-11 h-11 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </Link>
          )}
        </div>
      </div>

      {/* Footer: Likes & Comments */}
      <div className="mt-4 pt-3 border-t border-[#1a1a2a] flex items-center gap-4 text-xs text-slate-400">
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={() => upvotePost(post.id)}
          className={`flex items-center gap-1.5 transition ${
            post.userHasUpvoted
              ? "text-[#7c5cfc] font-bold drop-shadow-[0_0_8px_rgba(124,92,252,0.6)]"
              : "hover:text-white"
          }`}
          aria-label="Upvote post"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${post.userHasUpvoted ? "fill-[#7c5cfc]" : ""}`} />
          <span>{post.upvotes || 0}</span>
        </motion.button>

        <Link
          to={`/community/post/${post.id}`}
          className="flex items-center gap-1.5 hover:text-white transition"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{post.commentsCount || (post.comments || []).length || 0}</span>
        </Link>
      </div>
    </motion.div>
  );
}
