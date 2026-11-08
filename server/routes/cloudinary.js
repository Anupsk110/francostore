import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/**
 * Generate secure Cloudinary upload signature for client
 */
router.post("/signature", (req, res) => {
  const { folder = "accounts" } = req.body;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(200).json({
      configured: false,
      message: "Cloudinary credentials not set in backend .env. Frontend fallback will be used."
    });
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = `folder=mlbb_haven/${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

  return res.json({
    configured: true,
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder: `mlbb_haven/${folder}`
  });
});

export default router;

