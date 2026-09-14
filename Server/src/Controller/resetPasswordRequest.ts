import { type Request, type Response } from "express";
import { User } from "../Model/User";
import { emailValidationSchema } from "../Schema/resetValidation";
import { z } from "zod"
import crypto from "crypto"
import { resetLinkSender } from "../Utils/otpSender";

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const result = emailValidationSchema.safeParse(req.body)

        if (!result.success) {
            const flattened = z.flattenError(result.error)
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: flattened.fieldErrors
            })
        }

        const { email } = result.data
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                details: { email: ["user doesn't exist"] }
            })
        }

        const rawToken = crypto.randomBytes(32).toString('hex')
        const hashedToken = crypto
            .createHash('sha256')
            .update(rawToken)
            .digest('hex')

        if (user.resetPassword?.expires &&
            new Date(user.resetPassword.expires).getTime() > Date.now()
        ) {
            console.log("true")
            return res.status(400).json({
                success: false,
                details: { email: ["please wait until previous request expires within 5min"] }
            })
        } else if(user.resetPassword?.expires &&
            new Date(user.resetPassword.expires).getTime() < Date.now())
            {
                user.resetPassword = undefined
                await user.save()
            }

        user.resetPassword = {
            token: hashedToken,
            expires: new Date(Date.now() + 1 * 60 * 1000)
        }
        await user.save()

        const BaseUrl = `http://localhost:5173/authenticateReset`
        const params = new URLSearchParams({
            token: rawToken,
            email
        })

        const link = `${BaseUrl}?${params.toString()}`
        await resetLinkSender(email, link)

        return res.status(200).json({
            success: true,
            message: "password Reset Link has been sent to your Mail please check"
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }
}