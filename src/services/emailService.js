// Secure Email Service calling backend Brevo API endpoints

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://localhost:5000/api" : "/api");

/**
 * Send welcome email via Brevo backend
 */
export async function sendWelcomeEmail(email, displayName) {
  try {
    const response = await fetch(`${API_URL}/email/welcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, displayName }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.warn("Backend welcome email notification:", data.message);
      return { success: false, message: data.message };
    }

    return await response.json();
  } catch (err) {
    console.warn("Could not reach backend email server (using local simulation):", err.message);
    return { success: true, simulated: true };
  }
}

/**
 * Send new account listing announcement to opted-in users
 */
export async function sendNewListingEmail(account, recipients = []) {
  try {
    const response = await fetch(`${API_URL}/email/new-listing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account, recipients }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, message: data.message };
    }

    return await response.json();
  } catch (err) {
    console.warn("Backend email dispatch simulated:", err.message);
    return { success: true, simulated: true, count: recipients.length };
  }
}

/**
 * Membership notification (legacy/no-op)
 */
export async function sendMembershipEmail() {
  return { success: true, simulated: true };
}

/**
 * Send payment receipt email with PDF attachment
 */
export async function sendReceiptEmail(receipt, pdfBase64 = null) {
  try {
    const response = await fetch(`${API_URL}/email/receipt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receipt, pdfBase64 }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, message: data.message };
    }

    return await response.json();
  } catch (err) {
    console.warn("Backend receipt email dispatch simulated:", err.message);
    return { success: true, simulated: true };
  }
}

