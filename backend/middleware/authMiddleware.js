import jwt from "jsonwebtoken";



export const protect = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }


        const token = authHeader.split(" ")[1];

        

    } catch(error) {

         // Extract Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data to request
        req.user = decoded;

        next();

   
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};