import { type Request, type Response } from "express"
import { z } from "zod"
import { RegisterValidationSchema } from "../Schema/RegisterValidation"
import { User } from "../Model/User"
import { Otp } from "../Model/otp"
import { otpSender } from "../Utils/otpSender"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export const registerUser = async (req: Request, res: Response) => {
    try {
        const result = RegisterValidationSchema.safeParse(req.body)
        if (!result.success) {
            const flattened = z.flattenError(result.error)

            return res.status(400).json({
                success: false,
                error: "validation failed",
                details: flattened.fieldErrors
            })
        }

        const { username, email, password } = result.data;

        const mail = await User.findOne({ email })
        if (mail) {
            return res.status(400).json({
                details: { email: ["Email already Exists"] }
            })
        }

        const uname = await User.findOne({ username })
        if (uname) {
            return res.status(400).json({
                details: { username: ["Username already Exists"] }
            })
        }
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            passwordHash,
        })

        await Otp.deleteMany({ email })
        const rawOtp = crypto.randomInt(100000, 999999).toString()
        const hashedOtp = await bcrypt.hash(rawOtp, 10)

        await Otp.create({ email, hashedOtp })
        await otpSender(email, rawOtp)
        
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            email: email
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }
}