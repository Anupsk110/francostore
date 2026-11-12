// Comprehensive mock & default data for Zyren Store

export const INITIAL_SETTINGS = {
  websiteName: "Zyren Store",
  tagline: "Play More. Own More.",
  whatsappNumber: "+919876543210",
  whatsappPrefillBuy: "Hello! I'm interested in purchasing the MLBB account listed as {title}. The listed price is ₹{price}. My registered email is {email}. Please provide more details about the purchase.",
  whatsappPrefillSell: "Hello! I want to sell my MLBB account through Zyren Store. Please guide me through the account evaluation and listing process.",
  contactEmail: "support@zyrenstore.com",
  currency: "INR",
  inrToUsdRate: 0.012, // 1 INR = 0.012 USD (approx ₹83.3 = $1)
  discordUrl: "https://discord.gg/zyrenstore",
  youtubeUrl: "https://youtube.com/@zyrenstore",
  instagramUrl: "https://instagram.com/zyrenstore",
  twitterUrl: "https://x.com/zyrenstore",
  heroBadge: "✨ Welcome to Zyren Store",
  heroHeading: "Your Trusted MLBB Account Marketplace",
  heroSubheading: "Buy verified accounts, join our gaming community and get exclusive member benefits.",
  emailNotificationsEnabled: true,
};

export const INITIAL_CATEGORIES = [
  "All Accounts",
  "Mega Collector",
  "Exalted Collector",
  "World Collector",
  "Epic Collector",
  "Limited Edition",
  "High Rank Accounts",
  "Rare Skin Accounts"
];

export const INITIAL_BANNERS = [
  {
    id: "banner-1",
    badge: "✨ Welcome to Zyren Store",
    title: "Your Trusted MLBB Account Marketplace",
    highlightWord: "MLBB",
    subtitle: "Buy verified accounts, join our gaming community and get exclusive member benefits.",
    ctaPrimaryText: "Browse Accounts",
    ctaPrimaryLink: "/accounts",
    ctaSecondaryText: "Join Community",
    ctaSecondaryLink: "/community",
    image: "/banners/Moonlit Kagura in the Misty Garden.png",
    active: true,
    order: 1
  },
  {
    id: "banner-2",
    badge: "🔥 Verified Collector Accounts",
    title: "Browse High-Tier MLBB Collections",
    highlightWord: "Collections",
    subtitle: "Explore rare limited-edition anime crossovers, Aspirants, Legends, and Mythical Glory smurfs.",
    ctaPrimaryText: "Explore Accounts",
    ctaPrimaryLink: "/accounts",
    ctaSecondaryText: "Join Community",
    ctaSecondaryLink: "/community",
    image: "/banners/hirara second banner.png",
    active: true,
    order: 2
  },
  {
    id: "banner-3",
    badge: "💎 Sell Your Account",
    title: "Turn Your MLBB Account Into Cash",
    highlightWord: "Cash",
    subtitle: "Fast evaluation, highest payout rates, and safe escrow with verified community admins.",
    ctaPrimaryText: "Sell Account",
    ctaPrimaryLink: "/sell",
    ctaSecondaryText: "Chat on WhatsApp",
    ctaSecondaryLink: "https://wa.me/919876543210",
    image: "/banners/Moonlit Kagura in the Misty Garden.png",
    active: true,
    order: 3
  }
];

export const INITIAL_ACCOUNTS = [
  {
    id: "acc-101",
    title: "Renowned Collector II - 216 Skins",
    category: "Collector Tier",
    highestRank: "Mythic ★26",
    currentRank: "Mythic",
    level: 29,
    totalSkins: 216,
    totalHeroes: 97,
    priceINR: 3200,
    priceUSD: 32,
    status: "available", // available | sold
    featured: true,
    mainImage: "/accounts/renowned_collector_216_skins.jpg",
    galleryImages: [
      "/accounts/renowned_collector_216_skins.jpg"
    ],
    description: "Verified Renowned Collector II account (Shinsuke N4kamura). Features 216 Skins and 97 Heroes with Highest Rank Mythic ★26. Includes Guinevere Psion of Tomorrow, Kagura Water Lily, Luo Yi Elysium Guardian, Yi Sun-shin Lone Destructor, Aldous Realm Watcher, Yu Zhong M4 Prime, Chou KOF, full Lightborn squad, 520 diamonds in bag, and active 34-day Weekly Diamond Pass. Clean Moonton bind with email surrender.",
    winRate: "61.4%",
    matches: "2,030",
    emblemLevel: "Max Level 60",
    legendSkins: 1,
    collectorSkins: 6,
    aspirantsSkins: 2,
    server: "India / Sikkim",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "acc-102",
    title: "Mega Collector III - 538 Skins",
    category: "Mega Collector",
    highestRank: "Mythical Immortal 110★",
    currentRank: "Mythic 32★",
    level: 111,
    totalSkins: 538,
    totalHeroes: 120,
    priceINR: 13000,
    priceUSD: 155,
    status: "available",
    featured: true,
    mainImage: "/accounts/mega_collector_538_skins.jpg",
    galleryImages: [
      "/accounts/mega_collector_538_skins.jpg"
    ],
    description: "13k anyone? CHECK SKINS! RECHARGEABLE CLEAN FRESH, EXCHANGEABLE AS WELL. Massive 538 skins collection featuring Mega Collector III with 208,285 collection score and Mythical Immortal 110 Stars! Loaded with Naruto collab, Ducati limiteds (Benedetta & Irithel), Saint Seiya series, full Transformers set (Bumblebee, Megatron, Optimus), full KOF lineup, Aspirants, Legends (Gusion Cosmic Gleam, Alucard Obsidian Blade), and full Lightborn set. 100% clean bind surrender.",
    winRate: "62.3%",
    matches: "3,500+",
    emblemLevel: "Max Level 60 (All 9)",
    legendSkins: 3,
    collectorSkins: 16,
    aspirantsSkins: 6,
    server: "Global / Asia",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "acc-103",
    title: "Renowned Collector II - 298 Skins",
    category: "Collector Tier",
    highestRank: "Mythical Immortal 100★",
    currentRank: "Mythic",
    level: 75,
    totalSkins: 298,
    totalHeroes: 132,
    priceINR: 1900,
    priceUSD: 23,
    status: "available",
    featured: true,
    mainImage: "/accounts/renowned_collector_298_skins.jpg",
    galleryImages: [
      "/accounts/renowned_collector_298_skins.jpg"
    ],
    description: "1.9k special price! Veteran 6 Years Together account with 298 Skins and 132 Heroes, Highest Rank Mythical Immortal 100 Stars! Features Yi Sun-shin and Hayabusa Collector skins, Chou KOF Iori Yagami, S.T.U.N. Chou & Selena, M1 Aldous, M2 Lancelot, M3 Roger, M4 Yu Zhong, full S.A.B.E.R., V.E.N.O.M., and Dragon Tamer squads, full Lightborn team, and SpongeBob collaboration. Super clean and fast transfer.",
    winRate: "58.6%",
    matches: "7,993",
    emblemLevel: "Max Level 60",
    legendSkins: 1,
    collectorSkins: 8,
    aspirantsSkins: 3,
    server: "Asia / India",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "acc-104",
    title: "Mega Collector IV - 517 Skins (64.6% WR)",
    category: "Mega Collector",
    highestRank: "Mythical Immortal 235★",
    currentRank: "Mythic 32★",
    level: 148,
    totalSkins: 517,
    totalHeroes: 133,
    priceINR: 18000,
    priceUSD: 215,
    status: "available",
    featured: true,
    mainImage: "/accounts/mega_collector_517_skins.jpg",
    galleryImages: [
      "/accounts/mega_collector_517_skins.jpg"
    ],
    description: "18k Local clean Rebindable ✅ Wr 60%+ (64.62% WR over 22,069 matches with 2,486 MVPs). Mega Collector IV with 198,245 collection score and Mythical Immortal 235 Stars highest rank! Contains Jujutsu Kaisen Gojo Satoru (Xavier), Megumi, Nobara, and Yuji Itadori, Starfall Knight Granger Legend skin, full Collector series (Lunox, Kagura, Guinevere, Angela, Nana), Ducati Benedetta & Irithel, Transformers series, Sanrio, and full Zodiac collection. 100% verified local clean rebindable with instant email surrender.",
    winRate: "64.62%",
    matches: "22,069",
    emblemLevel: "Max Level 60 (All 9)",
    legendSkins: 4,
    collectorSkins: 24,
    aspirantsSkins: 8,
    server: "India / Arunachal Pradesh",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "acc-105",
    title: "Epic Collector - Marksman God",
    category: "Epic Collector",
    highestRank: "Mythical Glory",
    currentRank: "Mythical Honor 40★",
    level: 145,
    totalSkins: 280,
    totalHeroes: 95,
    priceINR: 9500,
    priceUSD: 115,
    status: "available",
    featured: false,
    mainImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Dedicated Marksman lover account. Includes Lesley Stellar Mentor, Claude Blazing Barrows, Brody S.T.U.N., Beatrix Prime M4, and Wanwan Collector. Clean bindings, no violations, high credit score (110).",
    winRate: "64.2%",
    matches: "2,200",
    emblemLevel: "Max Marksman & Assassin",
    legendSkins: 1,
    collectorSkins: 7,
    aspirantsSkins: 2,
    server: "Asia",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: "acc-106",
    title: "Limited Edition - Anime Crossover Vault",
    category: "Limited Edition",
    highestRank: "Mythic",
    currentRank: "Mythic 15★",
    level: 110,
    totalSkins: 210,
    totalHeroes: 80,
    priceINR: 15500,
    priceUSD: 185,
    status: "available",
    featured: false,
    mainImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Features exclusive anime collaborations: Jujutsu Kaisen (Yuji Itadori Yin, Satoru Gojo Xavier, Megumi Fushiguro Julian, Nobara Kugisaki Melissa) and Attack on Titan (Eren Yin, Mikasa Fanny, Levi Martis). Rare and no longer obtainable in store!",
    winRate: "61.5%",
    matches: "1,420",
    emblemLevel: "Max Fighter & Mage",
    legendSkins: 0,
    collectorSkins: 6,
    aspirantsSkins: 5,
    server: "Global",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "acc-107",
    title: "High Rank Smurf - 82% Winrate",
    category: "High Rank Accounts",
    highestRank: "Mythical Glory",
    currentRank: "Mythical Glory 70★",
    level: 95,
    totalSkins: 150,
    totalHeroes: 75,
    priceINR: 7500,
    priceUSD: 90,
    status: "sold", // Sold example to demonstrate sold filter & watermark
    featured: false,
    mainImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
    ],
    description: "High winrate smurf account used for tournament scrims. 82.3% win rate in rank, perfect for streamers or competitive players seeking unmatched stats.",
    winRate: "82.3%",
    matches: "850",
    emblemLevel: "Max Assassin & Support",
    legendSkins: 0,
    collectorSkins: 3,
    aspirantsSkins: 2,
    server: "Asia",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  }
];

export const INITIAL_POSTS = [
  {
    id: "post-1",
    authorName: "AstraRina",
    authorRole: "Verified Member",
    authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AstraRina",
    category: "Discussion",
    title: "Best skin in MLBB?",
    content: "In your opinion, what's the best skin in MLBB right now? For me, it's hands down Gusion Cosmic Gleam or Kagura Water Lily. The sound effects and fluid animations make playing so satisfying! What are your personal favorites?",
    image: "/banners/Moonlit Kagura in the Misty Garden.png",
    upvotes: 124,
    commentsCount: 45,
    isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    userHasUpvoted: false,
    comments: [
      {
        id: "comm-1",
        authorName: "Kaelen_Ro",
        authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Kaelen_Ro",
        content: "Ling Serene Plume is top tier too! The sword sound effect is so crisp.",
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        likes: 12
      },
      {
        id: "comm-2",
        authorName: "ViperMain",
        authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ViperMain",
        content: "Chou Iori Yagami remains the king of martial arts skins since 2019!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        likes: 19
      }
    ]
  },
  {
    id: "post-2",
    authorName: "Rizky",
    authorRole: "Elite Member",
    authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Rizky",
    category: "Review",
    title: "Smooth buying experience!",
    content: "Just bought an account from here and it was super smooth... Contacted the admin on WhatsApp, verified the credentials in 5 minutes, received the clean Gmail login, and got the official PDF receipt immediately. Shout out to Zyren Store team for genuine service!",
    image: "/accounts/renowned_collector_298_skins.jpg",
    upvotes: 87,
    commentsCount: 23,
    isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    userHasUpvoted: true,
    comments: [
      {
        id: "comm-3",
        authorName: "Admin_Zyren",
        authorAvatar: "/zyren-logo.jpeg",
        content: "Thank you so much Rizky! Enjoy your new account in ranked games! 🏆",
        createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        likes: 15
      }
    ]
  },
  {
    id: "post-3",
    authorName: "Zyren Admin",
    authorRole: "Administrator",
    authorAvatar: "/zyren-logo.jpeg",
    category: "Announcement",
    title: "New accounts are live!",
    content: "📢 Check out our latest Mega Collector accounts now! We have just uploaded 4 brand new high-tier accounts featuring Mythical Glory rank, maxed emblems, and rare limited-edition anime skins. All buyers enjoy secure escrow and instant credentials transfer on WhatsApp.",
    image: "/accounts/mega_collector_538_skins.jpg",
    upvotes: 210,
    commentsCount: 67,
    isPinned: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    userHasUpvoted: false,
    comments: [
      {
        id: "comm-4",
        authorName: "ShadowAssassin",
        authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ShadowAssassin",
        content: "Already checked the World Collector one, looks breathtaking!",
        createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        likes: 8
      }
    ]
  }
];

export const INITIAL_RECEIPTS = [
  {
    id: "rec-1001",
    receiptNumber: "MLBB-REC-2026-1001",
    accountId: "acc-107",
    accountTitle: "High Rank Smurf - 82% Winrate",
    accountCategory: "High Rank Accounts",
    buyerName: "Alex Rivera",
    buyerEmail: "alex.gamer@gmail.com",
    originalPriceINR: 7500,
    originalPriceUSD: 90,
    discountPercentage: 0,
    discountAmountINR: 0,
    finalAmountINR: 7500,
    finalAmountUSD: 90,
    paymentMethod: "WhatsApp / Direct Bank / UPI",
    paymentStatus: "Paid",
    emailStatus: "Sent",
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    thankYouMessage: "Thank you for choosing our marketplace! We truly appreciate your trust and support. We hope you enjoy your new MLBB account. Welcome to our gaming community!"
  }
];

export const INITIAL_USERS = [
  {
    uid: "admin-01",
    email: "admin@zyrenstore.com",
    displayName: "Zyren Administrator",
    role: "admin",
    emailNotifications: true,
    photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    registeredAt: "2026-01-01T00:00:00.000Z",
    status: "active"
  },
  {
    uid: "user-01",
    email: "gamer.pro@example.com",
    displayName: "MythicStriker",
    role: "user",
    emailNotifications: true,
    photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    registeredAt: "2026-02-15T10:30:00.000Z",
    status: "active"
  }
];

