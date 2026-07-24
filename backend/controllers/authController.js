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

export const loginUser = async(req, res) => {
 
    try{
        const { email, password } = req.body;
    
        const user = await User.findOne({email});
        
        if (!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        res.status(200).json({
            success: true,
            message: "Login successful"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

};