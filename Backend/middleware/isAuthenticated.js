import jwt from 'jsonwebtoken';

const isAuthentication = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req?.cookies.token || req?.headers.authentication.token;
        console.log('Extracted Token:', token);

        // Check if token exists and is a string
        if (!token || typeof token !== 'string') {
            return res.status(401).json({
                message: "User not authorized. No token provided or invalid token format.",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded Token:', decoded);

        if(!decoded){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        // Attach userId to request object
        req.id = decoded.userId;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('JWT Verification Error:', error);

        return res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};

export default isAuthentication;