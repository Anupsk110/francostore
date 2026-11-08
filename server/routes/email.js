import express from "express";
import * as brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize Brevo API client
const apiKey = process.env.BREVO_API_KEY;
let apiInstance = null;

if (apiKey && apiKey.length > 5) {
  try {
    apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    console.log("Brevo API client initialized successfully.");
  } catch (err) {
    console.warn("Could not initialize Brevo client:", err.message);
  }
}

const sender = {
  email: process.env.BREVO_SENDER_EMAIL || "support@mlbbhaven.com",
  name: process.env.BREVO_SENDER_NAME || "MLBB Haven",
};

/**
 * 1. Welcome Email
 */
router.post("/welcome", async (req, res) => {
  const { email, displayName } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const subject = "Welcome to MLBB Haven! Your Premium Account Journey Begins";
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #faf8fc; padding: 20px; color: #1e293b;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #ede8f5;">
        <div style="background: linear-gradient(135deg, #6b21a8, #3b0764); padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">MLBB HAVEN</h1>
          <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Play More. Own More.</p>
        </div>
        <div style="padding: 24px;">
          <h2 style="color: #6b21a8; font-size: 20px;">Welcome, ${displayName || "Gamer"}! 👋</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            We are thrilled to welcome you to <strong>MLBB Haven</strong>, the most trusted marketplace for verified Mobile Legends: Bang Bang accounts.
          </p>
          <div style="background: #f8f6fc; border-left: 4px solid #6b21a8; padding: 12px 16px; margin: 18px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #334155;">
              🛡️ <strong>100% Secure Transfer:</strong> All accounts undergo strict verification, clean email surrender, and full buyer protection.
            </p>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            You can now explore handpicked collector accounts, discuss skin strategies in our gaming community, and chat directly with our verified admins on WhatsApp.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="http://localhost:5173/accounts" style="background: #6b21a8; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 14px; display: inline-block;">
              Browse Available Accounts &rarr;
            </a>
          </div>
          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px;">
            If you need assistance, reply to this email or reach us on WhatsApp: +91 98765 43210.
          </p>
        </div>
      </div>
    </div>
  `;

  if (apiInstance) {
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      sendSmtpEmail.sender = sender;
      sendSmtpEmail.to = [{ email, name: displayName || "MLBB Gamer" }];

      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return res.json({ success: true, messageId: data.messageId });
    } catch (err) {
      console.error("Brevo email send error:", err);
      return res.status(500).json({ error: "Failed to send email via Brevo", details: err.message });
    }
  }

  // Simulated email delivery when API key is not yet configured
  console.log(`[SIMULATED BREVO EMAIL] Welcome email sent to: ${email}`);
  return res.json({
    success: true,
    simulated: true,
    message: "Email logged in console. Set BREVO_API_KEY in .env for live SMTP delivery.",
  });
});

/**
 * 2. New Account Listing Broadcast
 */
router.post("/new-listing", async (req, res) => {
  const { account, recipients } = req.body;
  if (!account || !recipients || !recipients.length) {
    return res.status(400).json({ error: "Account details and recipients list required" });
  }

  const subject = `🔥 New Account Listed: ${account.title} (${account.category})`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #faf8fc; padding: 20px; color: #1e293b;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #ede8f5;">
        <div style="background: linear-gradient(135deg, #6b21a8, #3b0764); padding: 20px; text-align: center; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px;">MLBB HAVEN - NEW LISTING ALERT</h2>
        </div>
        <div style="padding: 24px;">
          <img src="${account.mainImage}" alt="${account.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;" />
          <span style="background: #f3e8ff; color: #6b21a8; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold;">
            ${account.category}
          </span>
          <h3 style="font-size: 22px; margin: 10px 0 6px; color: #1e293b;">${account.title}</h3>
          <p style="font-size: 14px; color: #64748b; margin-bottom: 16px;">
            Rank: <strong>${account.highestRank}</strong> | Skins: <strong>${account.totalSkins}</strong> | Heroes: <strong>${account.totalHeroes}</strong>
          </p>
          <p style="font-size: 20px; font-weight: bold; color: #6b21a8; margin: 0 0 16px;">
            ₹${account.priceINR?.toLocaleString("en-IN")} <span style="font-size: 14px; color: #94a3b8; font-weight: normal;">(≈$${account.priceUSD})</span>
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="http://localhost:5173/account/${account.id}" style="background: #6b21a8; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 14px; display: inline-block;">
              View Account & Details &rarr;
            </a>
          </div>
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">
            You received this email because you opted into new MLBB account notifications on MLBB Haven.
          </p>
        </div>
      </div>
    </div>
  `;

  if (apiInstance) {
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      sendSmtpEmail.sender = sender;
      sendSmtpEmail.to = recipients.map((r) => ({ email: r }));

      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return res.json({ success: true, count: recipients.length, messageId: data.messageId });
    } catch (err) {
      console.error("Brevo broadcast error:", err);
      return res.status(500).json({ error: "Failed to broadcast email", details: err.message });
    }
  }

  console.log(`[SIMULATED BREVO BROADCAST] New listing email sent to ${recipients.length} recipients`);
  return res.json({
    success: true,
    simulated: true,
    count: recipients.length,
    message: "Broadcast logged. Set BREVO_API_KEY in .env for live email broadcast.",
  });
});

/**
 * 3. Membership Activation Email
 */
router.post("/membership", async (req, res) => {
  const { email, userName, membershipPlan } = req.body;
  if (!email || !membershipPlan) return res.status(400).json({ error: "Missing required fields" });

  const subject = `🎉 Your MLBB Haven ${membershipPlan.name} Membership is Active!`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #faf8fc; padding: 20px; color: #1e293b;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #ede8f5;">
        <div style="background: linear-gradient(135deg, #6b21a8, #3b0764); padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px;">MEMBERSHIP ACTIVATED</h1>
          <p style="margin: 4px 0 0; font-size: 13px;">MLBB Haven VIP Club</p>
        </div>
        <div style="padding: 24px;">
          <h2 style="color: #6b21a8;">Welcome to ${membershipPlan.name} Tier, ${userName || "Member"}! 👑</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            Your monthly membership has been successfully activated. You can now enjoy <strong>${membershipPlan.discountPercentage}% discount</strong> on all MLBB accounts listed on our marketplace.
          </p>
          <div style="background: #fdf8e6; border: 1px solid #fef08a; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #854d0e;">Your Benefits:</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #854d0e;">
              ${(membershipPlan.benefits || []).map((b) => `<li>${b}</li>`).join("")}
            </ul>
          </div>
          <p style="font-size: 13px; color: #64748b;">
            When buying any account on WhatsApp, simply provide your registered email: <strong>${email}</strong> to automatically claim your discount.
          </p>
        </div>
      </div>
    </div>
  `;

  if (apiInstance) {
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      sendSmtpEmail.sender = sender;
      sendSmtpEmail.to = [{ email, name: userName || "Member" }];

      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return res.json({ success: true, messageId: data.messageId });
    } catch (err) {
      console.error("Brevo membership email error:", err);
      return res.status(500).json({ error: "Failed to send membership email", details: err.message });
    }
  }

  console.log(`[SIMULATED BREVO MEMBERSHIP] Membership email sent to: ${email}`);
  return res.json({ success: true, simulated: true });
});

/**
 * 4. Payment Receipt with PDF Attachment
 */
router.post("/receipt", async (req, res) => {
  const { receipt, pdfBase64 } = req.body;
  if (!receipt || !receipt.buyerEmail) {
    return res.status(400).json({ error: "Receipt data and buyer email required" });
  }

  const subject = `Payment Receipt - ${receipt.receiptNumber} | MLBB Haven`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #faf8fc; padding: 20px; color: #1e293b;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #ede8f5;">
        <div style="background: linear-gradient(135deg, #6b21a8, #3b0764); padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px;">OFFICIAL PAYMENT RECEIPT</h1>
          <p style="margin: 4px 0 0; font-size: 13px;">Receipt #: ${receipt.receiptNumber}</p>
        </div>
        <div style="padding: 24px;">
          <p style="font-size: 14px; color: #475569;">
            Dear <strong>${receipt.buyerName || "Customer"}</strong>,
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            Thank you for choosing <strong>MLBB Haven</strong>! Your payment for the account <strong>${receipt.accountTitle}</strong> has been verified.
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 13px;">
            <tr style="background: #f8f6fc;">
              <td style="padding: 8px; border: 1px solid #ede8f5; font-weight: bold;">Account:</td>
              <td style="padding: 8px; border: 1px solid #ede8f5;">${receipt.accountTitle} (${receipt.accountCategory})</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ede8f5; font-weight: bold;">Original Price:</td>
              <td style="padding: 8px; border: 1px solid #ede8f5;">₹${receipt.originalPriceINR?.toLocaleString("en-IN")}</td>
            </tr>
            ${
              receipt.discountAmountINR > 0
                ? `<tr style="background: #fef2f2;">
                    <td style="padding: 8px; border: 1px solid #ede8f5; font-weight: bold; color: #dc2626;">Discount:</td>
                    <td style="padding: 8px; border: 1px solid #ede8f5; color: #dc2626;">-₹${receipt.discountAmountINR?.toLocaleString("en-IN")}</td>
                  </tr>`
                : ""
            }
            <tr style="background: #f3e8ff;">
              <td style="padding: 8px; border: 1px solid #ede8f5; font-weight: bold; color: #6b21a8; font-size: 14px;">Total Paid:</td>
              <td style="padding: 8px; border: 1px solid #ede8f5; font-weight: bold; color: #6b21a8; font-size: 14px;">₹${receipt.finalAmountINR?.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ede8f5; font-weight: bold;">Payment Status:</td>
              <td style="padding: 8px; border: 1px solid #ede8f5; color: #16a34a; font-weight: bold;">Verified & Paid</td>
            </tr>
          </table>

          <div style="background: #f3e8ff; border-radius: 8px; padding: 14px; margin: 16px 0; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #4c1d95; font-style: italic;">
              "${receipt.thankYouMessage || "Thank you for choosing our marketplace! We truly appreciate your trust and support. We hope you enjoy your new MLBB account. Welcome to our gaming community!"}"
            </p>
          </div>

          <p style="font-size: 12px; color: #64748b;">
            📎 Your official PDF receipt is attached to this email. You can also view and download it anytime from your MLBB Haven user profile dashboard.
          </p>
        </div>
      </div>
    </div>
  `;

  if (apiInstance && pdfBase64) {
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      sendSmtpEmail.sender = sender;
      sendSmtpEmail.to = [{ email: receipt.buyerEmail, name: receipt.buyerName || "Buyer" }];
      sendSmtpEmail.attachment = [
        {
          name: `${receipt.receiptNumber}.pdf`,
          content: pdfBase64,
        },
      ];

      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return res.json({ success: true, messageId: data.messageId });
    } catch (err) {
      console.error("Brevo receipt attachment error:", err);
      return res.status(500).json({ error: "Failed to send receipt with PDF", details: err.message });
    }
  }

  console.log(`[SIMULATED BREVO RECEIPT] PDF Receipt emailed to: ${receipt.buyerEmail} for ${receipt.receiptNumber}`);
  return res.json({
    success: true,
    simulated: true,
    message: "Receipt email recorded and simulated. Attachments supported via Brevo API.",
  });
});

export default router;

