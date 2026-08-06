import express from "express";
import { addJob, getJobs, getJobById, updateJob, deleteJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// Public route
router.get("/", getJobs);
router.get("/:id", getJobById);
// Protected route
router.post("/add", protect, addJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

export default router;