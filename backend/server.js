import express from "express";
import cors from "cors";

const app = express();

const post = 5000;

app.use(cors());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running",
    });
});

app.listen(post, () => {
    console.log(`Server running on http://localhost:${post}`);
})