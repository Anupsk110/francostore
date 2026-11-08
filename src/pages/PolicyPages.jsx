import React from "react";

export function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <h1 className="text-3xl font-black text-white">Terms and Conditions</h1>
      <div className="bg-[#0e0e18] p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>Welcome to MLBB Haven. By accessing or using our marketplace, you agree to comply with and be bound by the following terms.</p>
        <h3 className="font-bold text-white text-base">1. Account Verification & Handover</h3>
        <p className="text-slate-400">All accounts listed on MLBB Haven are inspected for active binds and email availability. The administrator acts as an escrow intermediary to ensure fair and safe transfer of credentials.</p>
        <h3 className="font-bold text-white text-base">2. Payment & Receipts</h3>
        <p className="text-slate-400">Payments made through WhatsApp or authorized methods are final once the buyer confirms successful login and email change. Official payment receipts are generated automatically.</p>
        <h3 className="font-bold text-white text-base">3. Community Standards</h3>
        <p className="text-slate-400">Users must maintain respectful behavior in all community discussions. Harassment, spam, fraudulent listings, and unauthorized advertisements will result in immediate suspension.</p>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
      <div className="bg-[#0e0e18] p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>At MLBB Haven, your privacy is paramount. This policy outlines how we collect, store, and protect your information.</p>
        <h3 className="font-bold text-white text-base">1. Information We Collect</h3>
        <p className="text-slate-400">We collect your email address, display name, and avatar when you register. We record transaction receipts solely for servicing your purchases.</p>
        <h3 className="font-bold text-white text-base">2. Marketing & Notifications</h3>
        <p className="text-slate-400">We only send new listing email alerts to users who have explicitly checked the opt-in notification box during registration or in their profile settings.</p>
        <h3 className="font-bold text-white text-base">3. Data Security</h3>
        <p className="text-slate-400">We never sell your personal information. All API secrets and database operations are secured through server-side functions.</p>
      </div>
    </div>
  );
}

export function RefundPolicyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <h1 className="text-3xl font-black text-white">Refund Policy</h1>
      <div className="bg-[#0e0e18] p-8 rounded-3xl border border-[#1b1b2a] shadow-card space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>MLBB Haven is committed to customer satisfaction and safety throughout the account purchasing process.</p>
        <h3 className="font-bold text-white text-base">1. Pre-Handover Refund</h3>
        <p className="text-slate-400">If for any reason an account fails verification before credential handover, a 100% immediate refund is provided through the original payment channel.</p>
        <h3 className="font-bold text-white text-base">2. Post-Handover Warranty</h3>
        <p className="text-slate-400">We offer a 24-hour verification window after credentials are surrendered. In the rare event of an unresolvable binding dispute, our escrow team will investigate and provide replacement or refund.</p>
      </div>
    </div>
  );
}