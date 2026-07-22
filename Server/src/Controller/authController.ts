import {type Request,type Response } from "express"
import { z } from "zod"
import { RegisterValidationSchema } from "../Schema/RegisterValidation"
import {User} from "../Model/User"
import bcrypt from "bcryptjs"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const result = RegisterValidationSchema.safeParse(req.body)
        if(!result.success) {
            const flattened = z.flattenError(result.error)

            return res.status(400).json({
                success: false,
                error: "validation failed",
                details: flattened.fieldErrors
            })
        }

        const {username, email, password} = result.data;

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({
                details: {email: ["Email already Exists"]}
            })
        }

        const passwordHash = await bcrypt.hash(password, 10) 

        const newUser = await User.create({
            username,
            email,
            passwordHash,
        })

        return res.status(201).json({
            message: "User created successfully",
        })

    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({error: error.message})
        }
    }
}