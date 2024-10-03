import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection is succesfully");
    }catch(error){
        console.error("MongoDB connection error:", error.message);
    process.exit(1);

    }
}

export default connectDb;