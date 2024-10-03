import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type: String,
        required:true
    }],
    salary:{
        type:Number,
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        require:true,
    },
    position:{
        type:Number,
        required:true,
    },
    experienceLevel:{
        type:Number,
        require:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref :'Application'
        }
    ]
},{timestamps:true});

export const Job = mongoose.model('Job',jobSchema);