import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { formatINR, formatUSD, formatDate, generateReceiptNumber } from "../utils/formatters";

/**
 * Generate a PDF document for a payment receipt
 */
export function generateReceiptPDF(receipt) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const primaryPurple = [107, 33, 168]; // #6B21A8
  const darkPurple = [59, 7, 100]; // #3B0764
  const goldAmber = [217, 119, 6]; // #D97706
  const textDark = [30, 41, 59]; // slate-800
  const textMuted = [100, 116, 139]; // slate-500

  // 1. Header background banner
  doc.setFillColor(primaryPurple[0], primaryPurple[1], primaryPurple[2]);
  doc.rect(0, 0, 210, 40, "F");

  // Gold accent line
  doc.setFillColor(goldAmber[0], goldAmber[1], goldAmber[2]);
  doc.rect(0, 40, 210, 3, "F");

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("ZYREN STORE", 16, 22);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Play More. Own More. | Verified MLBB Marketplace", 16, 30);

  // Top Right: OFFICIAL PAYMENT RECEIPT
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT RECEIPT", 194, 20, { align: "right" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Receipt #: ${receipt.receiptNumber || generateReceiptNumber()}`, 194, 28, { align: "right" });
  doc.text(`Date: ${formatDate(receipt.generatedAt || new Date())}`, 194, 34, { align: "right" });

  // 2. Metadata Columns (Customer & Transaction Info)
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  
  // Left Box: Billed To
  doc.setFillColor(248, 247, 252);
  doc.roundedRect(15, 50, 88, 38, 3, 3, "F");

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryPurple[0], primaryPurple[1], primaryPurple[2]);
  doc.text("BUYER INFORMATION", 20, 58);

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(receipt.buyerName || "Valued Customer", 20, 66);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Email: ${receipt.buyerEmail || "customer@example.com"}`, 20, 73);
  doc.text("Customer Status: Verified Buyer", 20, 80);

  // Right Box: Transaction & Order Status
  doc.setFillColor(248, 247, 252);
  doc.roundedRect(107, 50, 88, 38, 3, 3, "F");

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryPurple[0], primaryPurple[1], primaryPurple[2]);
  doc.text("TRANSACTION DETAILS", 112, 58);

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Payment Status:`, 112, 66);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(22, 163, 74); // green
  doc.text("VERIFIED & PAID", 150, 66);

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont("helvetica", "normal");
  doc.text(`Payment Channel:`, 112, 73);
  doc.text(receipt.paymentMethod || "WhatsApp Escrow / Direct", 150, 73);

  doc.text(`Account Delivery:`, 112, 80);
  doc.setTextColor(primaryPurple[0], primaryPurple[1], primaryPurple[2]);
  doc.setFont("helvetica", "bold");
  doc.text("Completed / Credentials Handed", 150, 80);

  // 3. Table of Purchased Item
  const tableData = [
    [
      {
        content: `${receipt.accountTitle || "MLBB Premium Account"}\n` +
                 `Category: ${receipt.accountCategory || "Collector Tier"}\n` +
                 `Rank: ${receipt.accountRank || "Mythical Glory"} | Skins: ${receipt.totalSkins || "300+"} | Heroes: ${receipt.totalHeroes || "80+"}\n` +
                 `Transfer Mode: Clean Moonton Bind / Full Email Surrender`,
        styles: { fontStyle: "normal" }
      },
      "1",
      formatINR(receipt.originalPriceINR || receipt.finalAmountINR || 0),
      formatINR(receipt.finalAmountINR || 0)
    ]
  ];

  autoTable(doc, {
    startY: 96,
    head: [["Item Description & Account Specs", "Qty", "Listed Price", "Final Amount"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: primaryPurple,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
      halign: "left"
    },
    columnStyles: {
      0: { cellWidth: 105 },
      1: { halign: "center", cellWidth: 15 },
      2: { halign: "right", cellWidth: 35 },
      3: { halign: "right", cellWidth: 35, fontStyle: "bold" }
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 4,
      textColor: textDark,
      lineColor: [237, 232, 245],
      lineWidth: 0.2
    }
  });

  // 4. Totals Breakdown Summary
  const finalY = doc.lastAutoTable.finalY + 8;

  doc.setFillColor(250, 248, 253);
  doc.roundedRect(120, finalY, 75, 34, 2, 2, "F");
  doc.setDrawColor(230, 220, 245);
  doc.roundedRect(120, finalY, 75, 34, 2, 2, "D");

  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text("Subtotal:", 125, finalY + 8);
  doc.text(formatINR(receipt.finalAmountINR || 0), 190, finalY + 8, { align: "right" });

  doc.setDrawColor(210, 200, 230);
  doc.line(125, finalY + 14, 190, finalY + 14);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkPurple[0], darkPurple[1], darkPurple[2]);
  doc.text("Total Paid:", 125, finalY + 23);
  doc.text(formatINR(receipt.finalAmountINR || 0), 190, finalY + 23, { align: "right" });

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`USD Equivalent: ${formatUSD(receipt.finalAmountUSD || Math.round((receipt.finalAmountINR || 0) * 0.012))}`, 190, finalY + 29, { align: "right" });

  // 5. Thank You & Verification Message
  const messageY = finalY + 40;
  doc.setFillColor(243, 238, 251);
  doc.roundedRect(15, messageY, 180, 26, 3, 3, "F");

  doc.setTextColor(primaryPurple[0], primaryPurple[1], primaryPurple[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("A MESSAGE FROM ZYREN STORE", 20, messageY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const msgLines = doc.splitTextToSize(
    receipt.thankYouMessage || 
    "Thank you for choosing Zyren Store! We truly appreciate your trust and support. We hope you enjoy your new MLBB account. Welcome to our gaming community!",
    170
  );
  doc.text(msgLines, 20, messageY + 14);

  // 6. Security Footer & Verification Watermark
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text("Official electronic receipt issued by Zyren Store. Keep this document for your records.", 15, 280);
  doc.text("Support: support@zyrenstore.com | WhatsApp: +91 98765 43210 | zyrenstore.com", 15, 285);

  return doc;
}

/**
 * Trigger immediate client-side download of receipt PDF
 */
export function downloadReceiptPDF(receipt) {
  const doc = generateReceiptPDF(receipt);
  const filename = `${receipt.receiptNumber || "MLBB-Receipt"}.pdf`;
  doc.save(filename);
}

/**
 * Get PDF as Base64 data string (to attach to Brevo email via backend)
 */
export function getReceiptPDFBase64(receipt) {
  const doc = generateReceiptPDF(receipt);
  return doc.output("datauristring").split(",")[1];
}

