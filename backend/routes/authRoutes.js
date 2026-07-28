import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, uploadResume } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router(); 

router.post("/register", (req, res, next) => {
    console.log("REGISTER ROUTE HIT");
    next();
}, registerUser);
 
 
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post(
  "/upload-resume",
  (req, res, next) => {
    console.log("UPLOAD ROUTE HIT");
    next();
  },
  protect,
  upload.single("resume"),
  uploadResume
);

export default router;