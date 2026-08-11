import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://job-portal-pied-five.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 5000; 

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})