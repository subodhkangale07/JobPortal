import mongoose from "mongoose";

const applicationnSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','rejected','accepted'],
        default:'pending'
    }
},{timestamps:true} );

export const Application = mongoose.model('Application',applicationnSchema);