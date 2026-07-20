import express, { type Request, type Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import { RegisterValidationSchema } from "./schema/RegisterValidation";
import { z } from "zod"

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/register", (req: Request, res: Response) => {
    try {
        // Authentication of payload
        const result = RegisterValidationSchema.safeParse(req.body)

        if(!result.success) {

            const flattened = z.flattenError(result.error)

            return res.status(400).json({
                success: false,
                error: "validation failed",
                details: flattened.fieldErrors
            })
        }

        const {username, email, password} = result.data
        console.log(username, email, password)

        res.status(200).json({ data: "success" })
    } catch (error) {
        if(error instanceof Error) {
            res.status(409).json({error: error.message})
        }
        
    }
})

app.listen(PORT, () => {
    console.log("connected to the server \nPORT: ", PORT)
})
