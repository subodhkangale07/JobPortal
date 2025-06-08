import { Company } from "../models/company.model.js";
import mongoose from "mongoose";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import {uploadImageToCloudinary} from '../utils/imageUploader.js'
export const companyRegister = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => { 
    try {
        const companyId = req.params.id;

        // Check if companyId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID format",
                success: false
            });
        }

        console.log("Fetching company with ID:", companyId);

        // Fetch company by ID
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company found",
            company,
            success: true
        });

    } catch (error) {
        console.error("Error fetching company:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
       
        let logo; // Declare logo variable
        let updateData = { name, description, website, location }; // Initial update data
        
        // Check if file is present in the request
        if (req.files && req.files.file) {
            const file = req.files.file;
            // Upload the file to Cloudinary or other storage
            const cloudResponse = await uploadImageToCloudinary(file, "sbk");
            logo = cloudResponse.secure_url;
            updateData.logo = logo; // Add logo to the update data if present
        }
        
        // Update the company with the new data
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
