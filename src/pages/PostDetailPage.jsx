import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ThumbsUp, 
  MessageCircle, 
  Send, 
  Pin, 
  Trash2, 
  Share2 
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { timeAgo } from "../utils/formatters";
import toast from "react-hot-toast";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, upvotePost, addComment, deleteComment } = useData();
  const { currentUser, isAdmin } = useAuth();

  const post = (posts || []).find((p) => p.id === id);
  const [commentText, setCommentText] = useState("");

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white">Post Not Found</h2>
        <Link to="/community" className="mt-4 inline-block px-5 py-2 rounded-full bg-[#7c5cfc] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25">
          Back to Community
        </Link>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please sign in to comment.");
      return;
    }
    if (!commentText.trim()) return;

    addComment(post.id, {
      authorName: currentUser.displayName || "Gamer",
      authorAvatar: currentUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.email}`,
      content: commentText.trim(),
    });

    setCommentText("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/community")}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#7c5cfc] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Community</span>
      </button>

      {/* Main Post Card */}
      <div className="bg-[#0e0e18] p-6 sm:p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4">
        {/* Author Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#1b1b2a]">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${post.authorName}`}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover border border-[#7c5cfc]/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {post.authorName}
                </span>
                {post.authorRole && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c5cfc]/15 text-[#7c5cfc] border border-[#7c5cfc]/30 font-bold">
                    {post.authorRole}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                Posted {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {post.isPinned && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#7c5cfc] bg-[#7c5cfc]/15 border border-[#7c5cfc]/30 px-2.5 py-0.5 rounded-full">
                <Pin className="w-3 h-3 fill-[#7c5cfc]" />
                Pinned
              </span>
            )}
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#131320] border border-[#1b1b2a] text-slate-300">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          {post.image && (
            <div className="pt-2">
              <div className="inline-block max-w-lg rounded-xl overflow-hidden border border-[#222238] bg-[#141424] shadow-md">
                <img
                  src={post.image}
                  alt="Post Media"
                  className="max-h-72 w-auto object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-[#1b1b2a] flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => upvotePost(post.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${
                post.userHasUpvoted
                  ? "bg-[#7c5cfc]/20 border border-[#7c5cfc]/40 text-[#7c5cfc] font-bold"
                  : "bg-[#131320] border border-[#1b1b2a] text-slate-300 hover:bg-[#1a1a2b]"
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${post.userHasUpvoted ? "fill-[#7c5cfc]" : ""}`} />
              <span>{post.upvotes || 0} Upvotes</span>
            </button>

            <span className="flex items-center gap-1 text-slate-500">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{(post.comments || []).length} Comments</span>
            </span>
          </div>
        </div>
      </div>

      {/* Discussion & Comments Thread */}
      <div className="bg-[#0e0e18] p-6 sm:p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-6">
        <h3 className="font-black text-base text-white">
          Comments ({(post.comments || []).length})
        </h3>

        {/* Comment input form */}
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <textarea
            rows={3}
            placeholder={
              currentUser
                ? "Write a reply or share your thought..."
                : "Please sign in to join the discussion."
            }
            disabled={!currentUser}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-3.5 text-xs sm:text-sm rounded-2xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc] resize-none disabled:opacity-50"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!currentUser || !commentText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Reply</span>
            </button>
          </div>
        </form>

        {/* List of comments */}
        <div className="space-y-3 pt-3 border-t border-[#1b1b2a]">
          {(post.comments || []).length > 0 ? (
            (post.comments || []).map((comm) => (
              <div
                key={comm.id}
                className="p-4 rounded-2xl bg-[#111120] border border-[#1b1b2a] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={comm.authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${comm.authorName}`}
                      alt={comm.authorName}
                      className="w-7 h-7 rounded-full object-cover border border-[#7c5cfc]/30"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">
                        {comm.authorName}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {timeAgo(comm.createdAt)}
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => deleteComment(post.id, comm.id)}
                      className="text-slate-500 hover:text-rose-500 p-1"
                      title="Remove comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-300 pl-9 leading-relaxed">
                  {comm.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic text-center py-4">
              No replies yet. Start the conversation!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}