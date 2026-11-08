import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  MessageSquare, 
  Plus, 
  Search, 
  ThumbsUp, 
  Pin, 
  Trash2, 
  EyeOff, 
  ShieldCheck, 
  Image as ImageIcon,
  Flame,
  Clock,
  Sparkles,
  X 
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { uploadImageToCloudinary } from "../services/cloudinary";
import { timeAgo } from "../utils/formatters";
import toast from "react-hot-toast";

export default function CommunityPage() {
  const { posts, createPost, upvotePost, deletePost, togglePinPost } = useData();
  const { currentUser, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState("latest"); // 'latest', 'trending', 'popular'
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New post form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Discussion");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const tags = ["All", "Discussion", "Review", "Announcement", "Gameplay", "Question"];

  // Filter & sort
  const filteredPosts = (posts || []).filter((post) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title?.toLowerCase().includes(q);
      const matchContent = post.content?.toLowerCase().includes(q);
      const matchAuthor = post.authorName?.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchAuthor) return false;
    }

    if (selectedTag !== "All" && post.category !== selectedTag) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    // Pinned always on top
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    if (activeTab === "popular") return (b.upvotes || 0) - (a.upvotes || 0);
    if (activeTab === "trending") return ((b.upvotes || 0) + (b.commentsCount || 0) * 2) - ((a.upvotes || 0) + (a.commentsCount || 0) * 2);
    // latest
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please sign in to publish a community post.");
      return;
    }
    if (!title.trim() || !content.trim()) {
      toast.error("Please provide both title and content.");
      return;
    }

    setIsUploading(true);
    let uploadedImageUrl = "";

    try {
      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile, "community");
        uploadedImageUrl = uploadResult.url;
      }

      createPost({
        title,
        content,
        category,
        image: uploadedImageUrl,
        authorName: currentUser.displayName || "Gamer",
        authorRole: currentUser.role === "admin" ? "Administrator" : "Member",
        authorAvatar: currentUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.email}`,
      });

      // Reset
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview("");
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Create post error:", err);
      toast.error("Failed to post");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c5cfc]/10 border border-[#7c5cfc]/20 text-[#7c5cfc] text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Gaming Community</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            MLBB Community Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Discuss hero metas, review purchased accounts, ask questions, and chat with fellow Mobile Legends players.
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser) {
              toast.error("Please sign in to create a post");
              return;
            }
            setIsCreateModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs sm:text-sm font-black shadow-lg shadow-[#7c5cfc]/25 transition transform hover:-translate-y-0.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Post</span>
        </button>
      </div>

      {/* Filter and Tab Navigation Bar */}
      <div className="bg-[#0a0a12] p-3 sm:p-4 rounded-2xl border border-[#1a1a2a] shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[#0f0f1c] p-1 rounded-xl border border-[#1c1c2e]">
            <button
              onClick={() => setActiveTab("latest")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === "latest"
                  ? "bg-[#7c5cfc] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Latest</span>
            </button>

            <button
              onClick={() => setActiveTab("trending")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === "trending"
                  ? "bg-[#7c5cfc] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveTab("popular")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === "popular"
                  ? "bg-[#7c5cfc] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Most Popular</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-[#0f0f1c] border border-[#1c1c2e] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc] transition"
            />
          </div>
        </div>

        {/* Tags Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all duration-200 ${
                selectedTag === tag
                  ? "bg-[#7c5cfc]/20 border border-[#7c5cfc] text-white shadow-[0_0_10px_rgba(124,92,252,0.25)]"
                  : "bg-[#0f0f1c] border border-[#1c1c2e] text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 shadow-lg ${
                post.isPinned
                  ? "border-[#7c5cfc]/50 bg-gradient-to-b from-[#110f22] to-[#0a0a14] shadow-[0_0_20px_rgba(124,92,252,0.12)]"
                  : "border-[#1a1a2a] bg-[#0a0a12] hover:border-[#7c5cfc]/40"
              }`}
            >
              {/* Top Meta: Pinned, Author, Role, Time, Category */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${post.authorName}`}
                    alt={post.authorName}
                    className="w-8 h-8 rounded-full object-cover border border-[#7c5cfc]/30 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        {post.authorName}
                      </span>
                      {post.authorRole && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#7c5cfc]/15 text-[#a78bfa] border border-[#7c5cfc]/30 font-bold">
                          {post.authorRole}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {timeAgo(post.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.isPinned && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#7c5cfc] bg-[#7c5cfc]/15 border border-[#7c5cfc]/30 px-2 py-0.5 rounded-md">
                      <Pin className="w-2.5 h-2.5 fill-[#7c5cfc]" />
                      Pinned
                    </span>
                  )}

                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#131322] border border-[#222236] text-slate-300">
                    {post.category}
                  </span>

                  {/* Admin Moderation controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 ml-1">
                      <button
                        onClick={() => togglePinPost(post.id)}
                        className="w-7 h-7 rounded-lg bg-[#141424] hover:bg-[#7c5cfc]/20 text-slate-400 hover:text-[#7c5cfc] flex items-center justify-center transition border border-[#222236]"
                        title={post.isPinned ? "Unpin Post" : "Pin Post"}
                      >
                        <Pin className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="w-7 h-7 rounded-lg bg-[#141424] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition border border-[#222236]"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Body Content */}
              <div className="space-y-2">
                <Link to={`/community/post/${post.id}`} className="block">
                  <h3 className="font-extrabold text-sm sm:text-base text-white hover:text-[#7c5cfc] transition">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Compact, clean image preview (Fixed from oversized banner) */}
                {post.image && (
                  <div className="pt-2">
                    <Link
                      to={`/community/post/${post.id}`}
                      className="group/img relative inline-block max-w-sm rounded-xl overflow-hidden border border-[#222238] bg-[#141424] shadow-md hover:border-[#7c5cfc]/60 transition"
                    >
                      <img
                        src={post.image}
                        alt="Attachment"
                        className="max-h-44 sm:max-h-48 w-auto object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </Link>
                  </div>
                )}
              </div>

              {/* Card Footer: Upvote, Comment */}
              <div className="mt-4 pt-3 border-t border-[#1a1a2a] flex items-center gap-4 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => upvotePost(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    post.userHasUpvoted
                      ? "bg-[#7c5cfc]/20 border border-[#7c5cfc]/40 text-[#7c5cfc]"
                      : "bg-[#131322] border border-[#222236] hover:bg-[#1a1a2e] text-slate-300"
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${post.userHasUpvoted ? "fill-[#7c5cfc]" : ""}`} />
                  <span>{post.upvotes || 0} Upvotes</span>
                </button>

                <Link
                  to={`/community/post/${post.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131322] border border-[#222236] hover:bg-[#1a1a2e] hover:text-white transition text-slate-300"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsCount || (post.comments || []).length || 0} Comments</span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-[#0a0a12] rounded-2xl border border-dashed border-[#1a1a2a] p-8">
            <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-white">No discussions found</p>
            <p className="text-xs text-slate-500 mt-1">Be the first player to start a discussion in this topic!</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e18] w-full max-w-xl rounded-3xl border border-[#1b1b2a] shadow-2xl p-6 sm:p-7 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b1b2a]">
              <h3 className="font-black text-lg text-white">
                Create Community Post
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white focus:outline-none focus:border-[#7c5cfc]"
                >
                  <option value="Discussion">Discussion</option>
                  <option value="Review">Account Review</option>
                  <option value="Announcement">Announcement</option>
                  <option value="Gameplay">Gameplay & Strategies</option>
                  <option value="Question">Question & Help</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Post Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Best skin in MLBB right now?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Content
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your thoughts, review, or question with the community..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#131320] border border-[#222238] text-white placeholder-slate-500 focus:outline-none focus:border-[#7c5cfc] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Optional Image (Screenshot / Skin / Logo)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#7c5cfc]/20 file:text-[#7c5cfc] hover:file:bg-[#7c5cfc]/30 cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-2 relative w-24 h-24 rounded-xl overflow-hidden border border-[#222238]">
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white flex items-center justify-center text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1b1b2a]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-5 py-2 rounded-full text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 rounded-full bg-[#7c5cfc] hover:bg-[#6b47f5] text-white text-xs font-black shadow-lg shadow-[#7c5cfc]/25 transition disabled:opacity-50"
                >
                  {isUploading ? "Publishing..." : "Post to Community"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}