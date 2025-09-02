import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// FRONTEND ORIGINS
const FRONTEND_ORIGINS = [
  "http://localhost:5173",               // local dev
  "https://atmosphere-chat-app-1.onrender.com" // your Render frontend URL
];

// Middleware
app.use(
  cors({
    origin: FRONTEND_ORIGINS,
    credentials: true, // allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());

// 1️⃣ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// 2️⃣ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendDist));

  // Serve index.html for any route NOT starting with /api
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// Connect to DB & start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("DB connection failed:", err);
});
