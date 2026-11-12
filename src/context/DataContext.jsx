import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  INITIAL_ACCOUNTS, 
  INITIAL_BANNERS, 
  INITIAL_CATEGORIES, 
  INITIAL_POSTS, 
  INITIAL_RECEIPTS, 
  INITIAL_SETTINGS,
  INITIAL_USERS 
} from "../data/mockData";
import { sendNewListingEmail, sendReceiptEmail } from "../services/emailService";
import { getReceiptPDFBase64 } from "../services/receiptService";
import toast from "react-hot-toast";

const DataContext = createContext();

export function DataProvider({ children }) {
  // Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("mlbb_settings");
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Accounts
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem("mlbb_accounts");
    if (!saved) return INITIAL_ACCOUNTS;
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((acc) => {
        if (acc.id === "acc-101") {
          return {
            ...acc,
            title: "Renowned Collector II - 216 Skins",
            category: "Collector Tier",
            highestRank: "Mythic ★26",
            currentRank: "Mythic",
            level: 29,
            totalSkins: 216,
            totalHeroes: 97,
            priceINR: 3200,
            priceUSD: 32,
            mainImage: "/accounts/renowned_collector_216_skins.jpg",
            galleryImages: ["/accounts/renowned_collector_216_skins.jpg"],
            description: "Verified Renowned Collector II account (Shinsuke N4kamura). Features 216 Skins and 97 Heroes with Highest Rank Mythic ★26. Includes Guinevere Psion of Tomorrow, Kagura Water Lily, Luo Yi Elysium Guardian, Yi Sun-shin Lone Destructor, Aldous Realm Watcher, Yu Zhong M4 Prime, Chou KOF, full Lightborn squad, 520 diamonds in bag, and active 34-day Weekly Diamond Pass. Clean Moonton bind with email surrender.",
            winRate: "61.4%",
            matches: "2,030",
            emblemLevel: "Max Level 60",
            server: "India / Sikkim",
            featured: true,
            status: "available",
          };
        }
        if (acc.id === "acc-102") {
          return {
            ...acc,
            title: "Mega Collector III - 538 Skins",
            category: "Mega Collector",
            highestRank: "Mythical Immortal 110★",
            currentRank: "Mythic 32★",
            level: 111,
            totalSkins: 538,
            totalHeroes: 120,
            priceINR: 13000,
            priceUSD: 155,
            mainImage: "/accounts/mega_collector_538_skins.jpg",
            galleryImages: ["/accounts/mega_collector_538_skins.jpg"],
            description: "13k anyone? CHECK SKINS! RECHARGEABLE CLEAN FRESH, EXCHANGEABLE AS WELL. Massive 538 skins collection featuring Mega Collector III with 208,285 collection score and Mythical Immortal 110 Stars! Loaded with Naruto collab, Ducati limiteds (Benedetta & Irithel), Saint Seiya series, full Transformers set (Bumblebee, Megatron, Optimus), full KOF lineup, Aspirants, Legends (Gusion Cosmic Gleam, Alucard Obsidian Blade), and full Lightborn set. 100% clean bind surrender.",
            winRate: "62.3%",
            matches: "3,500+",
            emblemLevel: "Max Level 60 (All 9)",
            server: "Global / Asia",
            featured: true,
            status: "available",
          };
        }
        if (acc.id === "acc-103") {
          return {
            ...acc,
            title: "Renowned Collector II - 298 Skins",
            category: "Collector Tier",
            highestRank: "Mythical Immortal 100★",
            currentRank: "Mythic",
            level: 75,
            totalSkins: 298,
            totalHeroes: 132,
            priceINR: 1900,
            priceUSD: 23,
            mainImage: "/accounts/renowned_collector_298_skins.jpg",
            galleryImages: ["/accounts/renowned_collector_298_skins.jpg"],
            description: "1.9k special price! Veteran 6 Years Together account with 298 Skins and 132 Heroes, Highest Rank Mythical Immortal 100 Stars! Features Yi Sun-shin and Hayabusa Collector skins, Chou KOF Iori Yagami, S.T.U.N. Chou & Selena, M1 Aldous, M2 Lancelot, M3 Roger, M4 Yu Zhong, full S.A.B.E.R., V.E.N.O.M., and Dragon Tamer squads, full Lightborn team, and SpongeBob collaboration. Super clean and fast transfer.",
            winRate: "58.6%",
            matches: "7,993",
            emblemLevel: "Max Level 60",
            server: "Asia / India",
            featured: true,
            status: "available",
          };
        }
        if (acc.id === "acc-104") {
          return {
            ...acc,
            title: "Mega Collector IV - 517 Skins (64.6% WR)",
            category: "Mega Collector",
            highestRank: "Mythical Immortal 235★",
            currentRank: "Mythic 32★",
            level: 148,
            totalSkins: 517,
            totalHeroes: 133,
            priceINR: 18000,
            priceUSD: 215,
            mainImage: "/accounts/mega_collector_517_skins.jpg",
            galleryImages: ["/accounts/mega_collector_517_skins.jpg"],
            description: "18k Local clean Rebindable ✅ Wr 60%+ (64.62% WR over 22,069 matches with 2,486 MVPs). Mega Collector IV with 198,245 collection score and Mythical Immortal 235 Stars highest rank! Contains Jujutsu Kaisen Gojo Satoru (Xavier), Megumi, Nobara, and Yuji Itadori, Starfall Knight Granger Legend skin, full Collector series (Lunox, Kagura, Guinevere, Angela, Nana), Ducati Benedetta & Irithel, Transformers series, Sanrio, and full Zodiac collection. 100% verified local clean rebindable with instant email surrender.",
            winRate: "64.62%",
            matches: "22,069",
            emblemLevel: "Max Level 60 (All 9)",
            server: "India / Arunachal Pradesh",
            featured: true,
            status: "available",
          };
        }
        return acc;
      });
    } catch {
      return INITIAL_ACCOUNTS;
    }
  });

  // Categories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("mlbb_categories");
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Banners
  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem("mlbb_banners");
    if (!saved) return INITIAL_BANNERS;
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((b) => {
        if (b.id === "banner-2" || b.order === 2) {
          return {
            ...b,
            image: "/banners/hirara second banner.png",
            badge: "🔥 Verified Collector Accounts",
            title: "Browse High-Tier MLBB Collections",
            subtitle: "Explore rare limited-edition anime crossovers, Aspirants, Legends, and Mythical Glory smurfs.",
            ctaPrimaryText: "Explore Accounts",
            ctaPrimaryLink: "/accounts"
          };
        }
        if (b.id === "banner-1" || b.order === 1) {
          return {
            ...b,
            badge: "✨ Welcome to Zyren Store",
            ctaPrimaryLink: "/accounts"
          };
        }
        if (b.image && b.image.includes("unsplash.com")) {
          return { ...b, image: "/banners/Moonlit Kagura in the Misty Garden.png" };
        }
        return b;
      });
    } catch {
      return INITIAL_BANNERS;
    }
  });

  // Community Posts
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("mlbb_posts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean out any old random unsplash placeholder images from localStorage
        return parsed.map((p) => {
          if (p.image && p.image.includes("unsplash.com")) {
            if (p.id === "post-3") return { ...p, image: "/accounts/mega_collector_538_skins.jpg" };
            if (p.id === "post-1") return { ...p, image: "/banners/Moonlit Kagura in the Misty Garden.png" };
            if (p.id === "post-2") return { ...p, image: "/accounts/renowned_collector_298_skins.jpg" };
            return { ...p, image: "" };
          }
          return p;
        });
      } catch (e) {
        return INITIAL_POSTS;
      }
    }
    return INITIAL_POSTS;
  });

  // Receipts
  const [receipts, setReceipts] = useState(() => {
    const saved = localStorage.getItem("mlbb_receipts");
    return saved ? JSON.parse(saved) : INITIAL_RECEIPTS;
  });

  // Users list (for Admin User Management)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("mlbb_users_list");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Save to localStorage whenever states change
  useEffect(() => {
    localStorage.setItem("mlbb_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("mlbb_accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("mlbb_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("mlbb_banners", JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem("mlbb_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("mlbb_receipts", JSON.stringify(receipts));
  }, [receipts]);

  useEffect(() => {
    localStorage.setItem("mlbb_users_list", JSON.stringify(users));
  }, [users]);

  // Account Operations
  const addAccount = async (accountData) => {
    const newAccount = {
      ...accountData,
      id: `acc-${Date.now()}`,
      status: "available",
      createdAt: new Date().toISOString(),
    };

    setAccounts((prev) => [newAccount, ...prev]);
    toast.success("Account listing published successfully!");

    // Send email announcement to opted-in users
    if (settings.emailNotificationsEnabled) {
      const optedInUsers = users.filter((u) => u.emailNotifications);
      if (optedInUsers.length > 0) {
        try {
          await sendNewListingEmail(newAccount, optedInUsers.map((u) => u.email));
          toast.success(`Notification sent to ${optedInUsers.length} subscribers!`);
        } catch (err) {
          console.warn("Listing notification:", err);
        }
      }
    }
    return newAccount;
  };

  const updateAccount = (id, updates) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, ...updates } : acc))
    );
    toast.success("Account updated successfully!");
  };

  const deleteAccount = (id) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    toast.success("Account listing deleted.");
  };

  const markAccountAsSold = (id) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, status: "sold" } : acc))
    );
    toast.success("Account marked as SOLD.");
  };

  const restoreAccount = (id) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, status: "available" } : acc))
    );
    toast.success("Account restored to AVAILABLE status.");
  };

  const toggleFeatured = (id) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, featured: !acc.featured } : acc
      )
    );
    toast.success("Featured status updated.");
  };

  // Banner Operations
  const addBanner = (bannerData) => {
    const newBanner = {
      ...bannerData,
      id: `banner-${Date.now()}`,
      order: banners.length + 1,
      active: true,
    };
    setBanners((prev) => [...prev, newBanner]);
    toast.success("New banner added successfully!");
    return newBanner;
  };

  const updateBanner = (id, updates) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    toast.success("Banner updated.");
  };

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast.success("Banner deleted.");
  };

  const reorderBanners = (startIndex, endIndex) => {
    setBanners((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((b, idx) => ({ ...b, order: idx + 1 }));
    });
    toast.success("Banners reordered.");
  };

  // Community Operations
  const createPost = (postData) => {
    const newPost = {
      ...postData,
      id: `post-${Date.now()}`,
      upvotes: 0,
      commentsCount: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      userHasUpvoted: false,
      isPinned: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    toast.success("Post published to community!");
    return newPost;
  };

  const upvotePost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasUpvoted = p.userHasUpvoted;
          return {
            ...p,
            upvotes: hasUpvoted ? p.upvotes - 1 : p.upvotes + 1,
            userHasUpvoted: !hasUpvoted,
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId, comment) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      ...comment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: (p.commentsCount || 0) + 1,
            comments: [...(p.comments || []), newComment],
          };
        }
        return p;
      })
    );
    toast.success("Comment posted!");
  };

  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    toast.success("Post deleted.");
  };

  const togglePinPost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isPinned: !p.isPinned } : p))
    );
    toast.success("Post pin status updated.");
  };

  const deleteComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: Math.max(0, (p.commentsCount || 1) - 1),
            comments: (p.comments || []).filter((c) => c.id !== commentId),
          };
        }
        return p;
      })
    );
    toast.success("Comment removed.");
  };

  // User Management
  const toggleUserStatus = (uid) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.uid === uid) {
          const newStatus = u.status === "suspended" ? "active" : "suspended";
          toast.success(`User ${newStatus === "suspended" ? "suspended" : "reactivated"}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // Receipt Operations
  const addReceipt = (receiptData) => {
    const newReceipt = {
      ...receiptData,
      id: `rec-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      emailStatus: "Pending",
    };
    setReceipts((prev) => [newReceipt, ...prev]);
    return newReceipt;
  };

  const sendReceiptToCustomer = async (receipt) => {
    try {
      const pdfBase64 = getReceiptPDFBase64(receipt);
      const res = await sendReceiptEmail(receipt, pdfBase64);

      setReceipts((prev) =>
        prev.map((r) =>
          r.id === receipt.id || r.receiptNumber === receipt.receiptNumber
            ? { ...r, emailStatus: "Sent" }
            : r
        )
      );

      toast.success(`Receipt sent via Brevo to ${receipt.buyerEmail}!`);
      return res;
    } catch (err) {
      console.error("Error sending receipt email:", err);
      toast.error("Failed to send receipt email");
      throw err;
    }
  };

  return (
    <DataContext.Provider
      value={{
        settings,
        setSettings,
        accounts,
        categories,
        setCategories,
        banners,
        posts,
        receipts,
        users,
        addAccount,
        updateAccount,
        deleteAccount,
        markAccountAsSold,
        restoreAccount,
        toggleFeatured,
        addBanner,
        updateBanner,
        deleteBanner,
        reorderBanners,
        createPost,
        upvotePost,
        addComment,
        deletePost,
        togglePinPost,
        deleteComment,
        toggleUserStatus,
        addReceipt,
        sendReceiptToCustomer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

