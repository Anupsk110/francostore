import React, { useState } from "react";
import { MessageSquare, Pin, Trash2, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { timeAgo } from "../../utils/formatters";

export default function AdminCommunity() {
  const { posts, deletePost, togglePinPost, deleteComment } = useData();
  const [search, setSearch] = useState("");

  const filtered = (posts || []).filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">
            Community Moderation
          </h1>
          <p className="text-xs text-slate-400">
            Review user posts, pin official announcements, and remove toxic comments
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search posts or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#131320] border border-[#1b1b2a] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="bg-[#0e0e18] p-5 rounded-3xl border border-[#1b1b2a] shadow-card space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${post.authorName}`}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-[#7c5cfc]/30"
                />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {post.authorName}
                  </span>
                  <span className="text-[10px] text-slate-500">{timeAgo(post.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#131320] border border-[#1b1b2a] text-slate-300">
                  {post.category}
                </span>

                <button
                  onClick={() => togglePinPost(post.id)}
                  className={`p-1.5 rounded-lg text-xs font-bold transition ${
                    post.isPinned
                      ? "bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40"
                      : "text-slate-400 hover:text-[#7c5cfc] hover:bg-[#131320]"
                  }`}
                  title="Toggle Pin Announcement"
                >
                  <Pin className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete this post?")) deletePost(post.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-[#131320] transition"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <Link
                  to={`/community/post/${post.id}`}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#7c5cfc] hover:bg-[#131320] transition"
                  title="View Public Thread"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-white">
                {post.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {post.content}
              </p>
            </div>

            {/* Comments moderation sub-section */}
            {(post.comments || []).length > 0 && (
              <div className="pt-3 border-t border-[#1b1b2a] space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Comments ({(post.comments || []).length})
                </span>
                {(post.comments || []).map((comm) => (
                  <div
                    key={comm.id}
                    className="p-2.5 rounded-xl bg-[#131320] border border-[#1b1b2a] text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-white">{comm.authorName}: </span>
                      <span className="text-slate-400">{comm.content}</span>
                    </div>
                    <button
                      onClick={() => deleteComment(post.id, comm.id)}
                      className="text-slate-500 hover:text-rose-500 p-1 transition"
                      title="Delete Comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}