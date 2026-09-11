import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import authRoutes from "./Router/authRoutes"
import { connectDB } from "./Config/db"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser())

app.use("/user", authRoutes)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log("connected to the server \nPORT: ", PORT)
        })
    } catch (error) {
        if(error instanceof Error) {
            console.log("server failed to start")
        }
    }
}

startServer();