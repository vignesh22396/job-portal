import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }
        
        const hashedPassword =  await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};