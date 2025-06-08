import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import {uploadImageToCloudinary} from '../utils/imageUploader.js'

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body; // Fetch all from req body
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing. Please fill all fields.",
                success: false 
            });
        }
        const file = req?.files?.file; // Assuming file handling will be implemented later
        // const fileUri = getDataUri(file);
        let cloudResponse;
        if(file){
            cloudResponse = await uploadImageToCloudinary(file,'sbk');
        }

        const existingUser = await User.findOne({ email }); // Check if email already exists
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists.",
                success: false, 
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse?.secure_url,
            }
        });

        return res.status(200).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false,
            data:error.message,
        });
    }
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!password || !email || !role) {
            return res.status(400).json({
                message: "Something is missing. Fill it.",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist for current role.",
                success: false,
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie('token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: 'strict',
            token:token,
        });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            token:token,
        };

        return res.status(200).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};

// Logout function
export const logout = async (req, res) => {
    try {
        // return res.status(200).cookie("token", "", { maxAge: 0 }).json({
        //     message: "Logged out successfully.",
        //     success: true,
        // });

        return res.status(200).json({
            message: "Logged out successfully.",
            success: true,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};

// Update profile function
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
         console.log("Updating The Profile ");
        const file = req?.files?.file;
        console.log("Logging files -- > ",req.files );

        console.log(" file " , file);
        let cloudResponse;

        // Check if file exists before processing
        if (file) {
            // const fileUri = getDataUri(file);
            // cloudResponse = await cloudinary?.uploader.upload(fileUri.content);
            const response = await uploadImageToCloudinary(file,"sbk");
            console.log("File uploadded  ",response);
            cloudResponse = response;

        }
        let skillArray;
        if (skills) {
            skillArray = skills?.split(",");
        }
        
        const userId = req?.id; // Assuming req.user is set by authentication middleware
        let user = await User?.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Update user profile
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillArray;

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.name; // Check file before accessing originalname
        }

        // Save updated user 
        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error.",
            success: false,
            data: error.message
        });
    }
};
