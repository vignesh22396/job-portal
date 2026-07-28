import express from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router(); 
router.post("/register", (req, res, next) => {
    console.log("REGISTER ROUTE HIT");
    next();
}, registerUser);
 

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;