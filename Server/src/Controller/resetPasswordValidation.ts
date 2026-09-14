import { type Request, type Response } from "express"
import { User } from "../Model/User"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { passwordValidationSchema } from "../Schema/resetValidation"
import { z } from "zod"

export const resetPasswordValidation = async (req: Request, res: Response) => {
    try {
        const result = passwordValidationSchema.safeParse(req.body)
        if (!result.success) {
            const flattened = z.flattenError(result.error)
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: flattened.fieldErrors
            })
        }
        const {newPassword} = result.data
        const {email, token} = req.body

        const testUser = await User.findOne({ email })
        if (!testUser) {
            if (!testUser) {
                return res.status(401).json({
                    success: false,
                    message: "can't find the user"
                })
            }
        }

        const isSameAsOld = await bcrypt.compare(newPassword, testUser.passwordHash)
        if(isSameAsOld) {
            return res.status(400).json({
                success: false,
                details: {newPassword: ["Please Enter a new password"]}
            })
        }

        const hashedToken = crypto
                            .createHash("sha256")
                            .update(token)
                            .digest('hex')

        const user = await User.findOne({
            "resetPassword.token": hashedToken,
            "resetPassword.expires": {$gt: new Date()}
        })

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Session expired"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.passwordHash = hashedPassword
        await user.save()

        return res.status(200).json({
            success: true,
            message: "password reset successfully"
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }
}