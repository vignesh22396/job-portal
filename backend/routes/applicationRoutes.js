import express from "express";
import {
  applyJob,
  getMyApplications,
  getApplicantsForMyJobs,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply/:jobId", protect, applyJob);

router.get("/my-applications", protect, getMyApplications);

router.get("/recruiter/applicants", protect, getApplicantsForMyJobs);

router.put(
  "/status/:id",
  protect,
  updateApplicationStatus
);

export default router;