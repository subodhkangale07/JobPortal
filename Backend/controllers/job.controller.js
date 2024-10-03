
import {Job} from "../models/job.model.js"

// admin Post job
export const postJob = async(req,res) => {
    try{
        const {title, description, location, experience, salary, companyId, requirements, jobType, position} = req.body;
        const userId = req.id;
        if(!title || !description || !location || !experience || !salary || !companyId || !requirements || !jobType || !position){
            return res.status(400).json({
                message:"Something is missing",
                success:false,
            })

        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            company:companyId,
            experienceLevel:experience,
            jobType,
            location,
            position,
            created_by:userId

        });

        return res.status(201).json({
            message:"New Job created successfully",
            job,
            success:true
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// getAll Job
// student get jobs
export const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""; // Find job by keyword
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } }, 
                { description: { $regex: keyword, $options: "i" } }, 
            ],
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs.length) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// find jo by ID
// student find job by id
export const getJobById = async(req,res) => {
    try{
        
        const jobId = req.params.id; // first fetch JobId
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });

        if(!jobId){
            return res.status(402).json({
                message:"Job not found",
                success:false,
            })
        }

        return res.status(201).json({
            jobId,
            job,
            success:true
        })

    }
    catch(error){
        console.log(error);
    }
}

// Jobs that are created by recuiter/ admin

export const getAdminJobs = async(req,res) => {
    try{
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company'
        });
        if(!jobs){
            return res.status(402).json({
                message:"Job not found",
                success:false
            })
        };
        return res.status(201).json({
            jobs,
            success:true
        })


    }catch(error){
        console.log(error);
    }
}
