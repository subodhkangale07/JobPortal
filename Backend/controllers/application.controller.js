import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req,res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        }
        // check user ha applied for job or not 
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"You Applied already",
                success:false
            })
        }

        // checkif job is not exist
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"NO job found",
                message:false
            })
        }

        // after that all user apply for job 
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message:"Applied successfully",
            success:true
        })

    }catch(ror){
        console.log(error);
    }
}

// get all applied Jobs

export const getAppliedJobs = async(req,res) => {
    try{
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt: -1}).populate({
            path:'job',
            options:{sort:{createdAt: -1}},
            populate:{
                path:'company',
                options:{sort:{createdAt: -1}},
           }
        });
        if(!application){
            return res.status(400).json({
                message:"No Application",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        })


    } catch(error){
        console.log(error);
    }
}

// find applicant that applied for job -> kyuki admin jb job post krenga to vo check kr ske how many user applied for job

export const getApplicants = async(req,res) => {
    try{
        const jobId = req.params.id; // find job
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(400).json({
                message:"Applicant not found",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })

    } catch(error){
        console.log(error);
    }
}

// Fixed updateStatus controller function
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        // Find application by applicationID
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        // Update status (maintain the original case from the frontend)
        application.status = status; // Don't convert to lowercase
        await application.save();

        // Return the updated application for the frontend
        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
            updatedApplication: application
        });

    } catch (error) {
        console.log(error);
        // Always return an error response
        return res.status(500).json({
            message: "Failed to update status: " + error.message,
            success: false
        });
    }
}