import { type Request, type Response } from "express"
import bcrypt from "bcryptjs"
import { OtpValidation } from "../Schema/otpValidation"
import { z } from "zod"
import { Otp } from "../Model/otp"
import { User } from "../Model/User"

export const OtpVerify = async (req: Request, res: Response) => {

    try {
        const result = OtpValidation.safeParse(req.body)
        if (!result.success) {
            const flattened = z.flattenError(result.error)
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: flattened.fieldErrors
            })
        }

        const { otp } = result.data
        const { email } = req.body
        const OtpSession = await Otp.findOne({ email })
        if (!OtpSession) {
            return res.status(401).json({
                success: false,
                error: { otp: ["Session not found"] }
            })
        }
        const validation = await bcrypt.compare(otp, OtpSession.hashedOtp)
        if (!validation) {
            return res.status(400).json({
                success: false,
                details: { otp: ["Invalid OTP"] }
            })
        }

        await User.findOneAndUpdate(
            {email},
            { $set: {verified: true}}
        )

        return res.status(200).json({
            success: true
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }
}