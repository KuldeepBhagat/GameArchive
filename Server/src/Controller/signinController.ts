import { type Request, type Response } from "express";
import { SignInValidationSchema } from "../Schema/SignInValidation";
import {z} from "zod"
import { User } from "../Model/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../Schema/jwt";


export const signIn = async (req: Request, res: Response) => {
    try {
        const result = SignInValidationSchema.safeParse(req.body)

        if(!result.success) {
            const flattened = z.flattenError(result.error)
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: flattened.fieldErrors
            })
            
        } 
        
        const {email, password} = result.data

        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid email or password"
            })
        }

        const validation = await bcrypt.compare(password, user.passwordHash);
        if(!validation) {
            return res.status(401).json({
                success: false,
                error: "Invalid email or password"
            })
        }

        const token = generateToken(user._id.toString())

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
        
    } catch(error) {
        if(error instanceof Error) {
            res.status(500).json({error: error.message})
        }
    }
}