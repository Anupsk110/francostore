import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import emailRoutes from "./routes/email.js";
import cloudinaryRoutes from "./routes/cloudinary.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "MLBB Haven Backend",
    timestamp: new Date().toISOString(),
    brevoConfigured: Boolean(process.env.BREVO_API_KEY && process.env.BREVO_API_KEY.length > 5),
    cloudinaryConfigured: Boolean(process.env.CLOUDINARY_API_KEY)
  });
});

// Routes
app.use("/api/email", emailRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

// Only listen on port in local/standalone environment (Vercel uses serverless handler)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`MLBB Haven Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;
