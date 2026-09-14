import { type Response, type Request } from "express";
import { Otp } from "../Model/otp";
import { otpSender } from "../Utils/otpSender";
import bcrypt from "bcryptjs";
import crypto from "crypto"

export const VerificationRetry = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        await Otp.deleteMany({ email })
        const rawOtp = crypto.randomInt(100000, 999999).toString()
        const hashedOtp = await bcrypt.hash(rawOtp, 10)

        await Otp.create({ email, hashedOtp })
        await otpSender(email, rawOtp)

        return res.status(201).json({
            success: true,
            message: "OTP sent again successfully",
            email: email
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }
}