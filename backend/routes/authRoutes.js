import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();
 
router.post("/register", (req, res, next) => {
    console.log("REGISTER ROUTE HIT");
    next();
}, registerUser);

router.post("/login", loginUser);

export default router;