import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        console.log("===== REGISTER API CALLED =====");
        console.log("Email:", email);

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        console.log("Existing User:", existingUser);
        
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

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const loginUser = async(req, res) => {
 
    try{
        const { email, password } = req.body;

        console.log("Email from request:", email);
        console.log("Password from request:", password);
    
        const user = await User.findOne({email});

        console.log("User from DB:", user);
        
        if (!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password Match:", isMatch);

        if (!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

};