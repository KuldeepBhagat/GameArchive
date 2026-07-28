import { passwordValidationSchema } from "../Schema/changeValidation";
import {z} from "zod"
import { User } from "../Model/User";
import {type AuthRequest } from "../middleware/authMiddleware";
import { type Response } from "express";
import bcrypt from "bcryptjs";

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId
        if(!userId) {
            return res.status(400).json({error: "token not found"})
        }

        const result = passwordValidationSchema.safeParse(req.body)
        if(!result.success) {
            const flattened = z.flattenError(result.error)
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                details: flattened.fieldErrors
            })
        }

        const {password, newPassword} = result.data

        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({error: "user not found"})
        }

        const passwordVerification = await bcrypt.compare(password, user.passwordHash)
        if(!passwordVerification) {
            return res.status(400).json({
                error: "validation failed",
                details: {password: ["wrong password"]} 
            })
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10)
        user.passwordHash = newPasswordHash
        await user.save()

        return res.status(200).json({success: true, message: "username updated successfully"})

    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({error: error.message})
        }
    }
}