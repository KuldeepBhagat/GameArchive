import {type Response} from "express"
import {type AuthRequest } from "../middleware/authMiddleware";
import { User } from "../Model/User";
import { usernameValidationSchema } from "../Schema/changeValidation";
import {z} from "zod"
import bcrypt from "bcryptjs"

export const changeUsername = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId

        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({error: "user not found"})
        }

        const changename = usernameValidationSchema(user.username)
        const result = changename.safeParse(req.body)

        if(!result.success) {
            const flattened = z.flattenError(result.error)
            return res.status(400).json({
                success: false,
                message: "validation failed",
                details: flattened.fieldErrors
            })
        }

        const {password, newUsername} = result.data
        
        

        const validation = await bcrypt.compare(password, user.passwordHash)
        if(!validation) {
            return res.status(400).json({
                success: false,
                details: {password: ["wrong password"]}
            })
        }

        const userExists = await User.findOne({username: newUsername})
        if(userExists) {
            return res.status(400).json({
                details: {newUsername: ["username already exists"]}
            })
        }

        user.username = newUsername
        await user.save()

        return res.status(200).json({success: true, message: "username updated successfully"})
    } catch(error) {
        if(error instanceof Error) {
            res.status(500).json({error: error.message})
        }
    }
    
}