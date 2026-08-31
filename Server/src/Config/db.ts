import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const MONGO_URI = process.env.MONGO_URI as string
        
        if(!MONGO_URI) {
            throw new Error("MONGO_URI not found")
        }

        const conn = await mongoose.connect(MONGO_URI)

        console.log("MongoDB connected: ", conn.connection.host)
        console.log("Active Database: ", conn.connection.name)

    } catch(error) {
        if(error instanceof Error) {
            console.log("Database connection failed -> ", error.message)
        } else {
            console.log("An Unknown database connection error occurred")
        }
        process.exit(1) 
    }
};