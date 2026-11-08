import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Contexts
import { ThemeProvider } from "./context/ThemeContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

// Components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ReceiptModal from "./components/receipt/ReceiptModal";

// Pages
import HomePage from "./pages/HomePage";
import AccountsPage from "./pages/AccountsPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import SellAccountPage from "./pages/SellAccountPage";
import CommunityPage from "./pages/CommunityPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TopUpPage from "./pages/TopUpPage";
import { TermsPage, PrivacyPolicyPage, RefundPolicyPage } from "./pages/PolicyPages";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAccounts from "./pages/admin/AdminAccounts";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminCommunity from "./pages/admin/AdminCommunity";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReceipts from "./pages/admin/AdminReceipts";
import AdminSettings from "./pages/admin/AdminSettings";
import AnimatedBackground from "./components/common/AnimatedBackground";

function LayoutWrapper({ children, onOpenReceiptModal }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-[#08080c] text-slate-100 transition-colors relative selection:bg-[#7c5cfc]/40 selection:text-white">
      {/* Dynamic Animated Ambient Background with Moving Grids, Shooting Beams & Rising Embers */}
      <AnimatedBackground />

      {!isAdminRoute && <Navbar />}
      <main className="flex-1 w-full relative z-10">{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  const [activeReceiptAccount, setActiveReceiptAccount] = useState(null);

  const openReceiptModal = (account) => {
    setActiveReceiptAccount(account);
  };

  const closeReceiptModal = () => {
    setActiveReceiptAccount(null);
  };

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <LayoutWrapper onOpenReceiptModal={openReceiptModal}>
                <Routes>
                  {/* Public Storefront Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/topup" element={<TopUpPage />} />
                  <Route path="/topup/:gameId" element={<TopUpPage />} />
                  <Route path="/accounts" element={<AccountsPage />} />
                  <Route
                    path="/account/:id"
                    element={<AccountDetailPage onOpenReceiptModal={openReceiptModal} />}
                  />
                  <Route path="/sell" element={<SellAccountPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/community/post/:id" element={<PostDetailPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/refund" element={<RefundPolicyPage />} />

                  {/* Admin Dashboard Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="accounts" element={<AdminAccounts />} />
                    <Route path="banners" element={<AdminBanners />} />
                    <Route path="community" element={<AdminCommunity />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="receipts" element={<AdminReceipts />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </LayoutWrapper>

              {/* Global Receipt Modal */}
              {activeReceiptAccount && (
                <ReceiptModal
                  account={activeReceiptAccount}
                  onClose={closeReceiptModal}
                />
              )}

              {/* Notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "#1e1735",
                    color: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #3b2a5a",
                    fontSize: "12px",
                    fontWeight: "600",
                  },
                  success: {
                    iconTheme: {
                      primary: "#10b981",
                      secondary: "#ffffff",
                    },
                  },
                }}
              />
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

