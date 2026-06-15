import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
    try {
        const mongoUri= process.env.MONGOL_URI;
    
         if(!mongoUri){
            throw new Error("Mongo_uri is required");
         }

         const conn= await mongoose.connect(mongoUri);
    } catch (error) {
        console.error("MongoDB connection error:",error.message)
        process.exit(1)
    }
}