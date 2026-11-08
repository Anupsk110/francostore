# Franco Store - Premium MLBB Account Marketplace & Top-Up Portal

A fully functional, modern, premium-looking Mobile Legends: Bang Bang (MLBB) account marketplace and gaming community platform built with **React.js**, **Tailwind CSS**, **Node.js/Express**, **Firebase**, **Cloudinary**, and **Brevo**.

Designed and styled after the reference gaming marketplace aesthetic, featuring royal purple, gold, dark violet, and emerald accents with light and dark theme support.

---

## 🌟 Key Features

### 1. Storefront & Homepage
- **Navigation Bar**: Winged crown crest logo, rounded pill menu (Home, Community, Accounts for Sale, Memberships, Sell Account, About, Contact), Sun/Moon theme toggle, and User Menu with role switcher.
- **Hero Carousel**: Celestial anime artwork banner with *✨ Welcome to MLBB Haven* badge, dynamic headings, CTA buttons (*Browse Accounts* and *Join Community*), pagination dots, and navigation arrows.
- **Choose Your Membership**: 3 monthly tiers (**Basic** at ₹99/mo, **Premium** at ₹199/mo with *Most Popular* badge, and **Elite** at ₹499/mo).
- **Featured Accounts**: 4 top-tier handpicked accounts displaying ranks, level, total skins/heroes, pricing in INR and USD, and one-click detail navigation.
- **Join Our Community**: Recent community discussions, account reviews, and announcements with like and comment counts.
- **Footer**: Brand summary, quick links, support, newsletter subscription with instant alert opt-in, and WhatsApp support card.

### 2. Accounts Marketplace (`/accounts`) & Details (`/account/:id`)
- Search by account title, rank, hero, or collector skins.
- Filter by categories (*Mega Collector*, *Exalted Collector*, *World Collector*, *Epic Collector*, *Limited Edition*, *High Rank*, *Rare Skin*).
- Filter by rank (*Mythical Glory*, *Mythic*, *Legend*, *Epic*), price range, and minimum skin count slider.
- Detailed view with image gallery, win rates, matches, emblem levels, and clean surrender verification badges.
- **Dynamic Membership Discount**: Automatically calculates and applies member discounts (5%, 10%, 20%) when signed in.
- **WhatsApp Click-to-Chat**: One-click "Buy This Account on WhatsApp" with prefilled message containing account title, price, and buyer email (opens in new tab).

### 3. Sell Your Account (`/sell`)
- Step-by-step selling guide and evaluation workflow.
- **Interactive Account Valuation Estimator**: Real-time price calculator based on rank tier, skin count, and legend skins.
- Clear listing requirements (clean email surrender, no 3rd-party binds, violation check).
- Direct WhatsApp contact button with prefilled selling message.

### 4. VIP Memberships (`/memberships`)
- Interactive plan cards with monthly INR and USD pricing.
- **Interactive Savings Calculator**: Sliders to see how much money members save across Basic (5%), Premium (10%), and Elite (20%) tiers.
- One-click subscription simulation with confetti and profile updates.

### 5. Gaming Community (`/community` & `/community/post/:id`)
- Create posts with title, category (*Discussion*, *Review*, *Announcement*, *Gameplay*, *Question*), text, and optional image attachment.
- Upvoting and comment system with replies.
- Filter by tags and tabs (*Latest*, *Trending*, *Most Popular*).
- Administrator moderation tools (Pin announcements, delete posts, remove comments).

### 6. User Profile & Purchase History (`/profile`)
- View and update display name and profile avatar.
- Active membership tier and expiration date indicator.
- Opt-in notification preference toggle (*"Notify me by email whenever new MLBB accounts are listed on the website"*).
- **Purchase History & PDF Receipts**: View completed purchases and download official serialized payment receipt PDFs.

### 7. Administrative Management Dashboard (`/admin`)
- **Overview**: Real-time metrics for available accounts, sold accounts, registered users, active memberships, and total recorded revenue.
- **Account Management**: Add new accounts with Cloudinary image upload, edit details, replace images, mark as sold, restore to available, feature on homepage, and delete.
- **Automated Payment Receipt Generation**:
  - Open any account listing.
  - Enter buyer's registered email and name.
  - Auto-calculates member discount.
  - Generates unique receipt number (`MLBB-REC-2026-XXXX`).
  - Previews receipt details and provides **Download PDF** and **Send Receipt via Email** buttons.
- **Homepage Banner Management**: Add, update, reorder, and toggle banner visibility.
- **Community Moderation**: Search, pin, and delete posts or comments.
- **User Management**: View users, toggle active/suspended status, and manually grant or upgrade VIP memberships.
- **Membership Management**: Configure tier names, prices in INR/USD, discount %, and benefit bullet points.
- **Website Settings**: Configure WhatsApp support number, support email, social links, currency exchange rate, and notification toggles.

### 8. Brevo Email Service & Node.js Backend (`server/`)
- Express backend running on port 5000 with official `@getbrevo/brevo` integration.
- Endpoints:
  - `POST /api/email/welcome`: Welcome email on registration.
  - `POST /api/email/new-listing`: Broadcast alert to users who opted into new account listings.
  - `POST /api/email/membership`: VIP membership activation notification.
  - `POST /api/email/receipt`: Official payment receipt with attached Base64 PDF.
- Offline simulation mode included so all features work immediately out of the box even before API keys are added.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, Tailwind CSS, React Router DOM v7, Framer Motion, Lucide React, React Hot Toast, Canvas Confetti |
| **PDF Generation** | jsPDF, jsPDF-AutoTable, html2canvas |
| **Backend API** | Node.js, Express, CORS, Dotenv, Multer |
| **Email Service** | Brevo API (`@getbrevo/brevo` transactional emails) |
| **Image Storage** | Cloudinary API (direct client preset + backend signature generation) |
| **Database & Auth** | Firebase Auth, Firebase Firestore (with persistent local fallback) |

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

The application runs smoothly out of the box with built-in mock fallback services. To connect live services:
- **Firebase**: Set `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, and `VITE_FIREBASE_PROJECT_ID`.
- **Cloudinary**: Set `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`.
- **Brevo**: Set `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, and `BREVO_SENDER_NAME`.

### 3. Run Development Server
To run both backend server (port 5000) and frontend client (port 5173):
```bash
npm run dev
```

Or run them individually:
```bash
# In terminal 1 (Backend Server)
npm run server

# In terminal 2 (Vite Frontend)
npm run client
```

Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🔑 Demo Accounts & Role Switching

A role switcher is built directly into the user avatar menu (top right):
- **Haven Administrator**: Full access to the public site and `/admin` management panel.
- **Regular Buyer (`MythicStriker`)**: Premium 10% discount member experience.

---

## 📄 License & Attribution
Designed for Mobile Legends: Bang Bang fans and community collectors. All assets and brand names belong to their respective copyright holders.

