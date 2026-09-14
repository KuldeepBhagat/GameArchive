import { type Request, type Response } from "express";
import { SignInValidationSchema } from "../Schema/SignInValidation";
import { z } from "zod"
import { User } from "../Model/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../Schema/jwt";
import crypto from "crypto"
import { UAParser } from "ua-parser-js";

export const signIn = async (req: Request, res: Response) => {
    try {
        const result = SignInValidationSchema.safeParse(req.body)

        if (!result.success) {
            const flattened = z.flattenError(result.error)
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: flattened.fieldErrors
            })

        }

        const { email, password } = result.data

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                details: { email: ["Invalid email or password"] }
            })
        }

        const validation = await bcrypt.compare(password, user.passwordHash);
        if (!validation) {
            return res.status(401).json({
                success: false,
                details: { password: ["Invalid email or password"] }
            })
        }

        if (!user.verified) {
            return res.status(403).json({
                success: false,
                error: "Email not verified",
                email: email
            })
        }

        const parser = new UAParser(req.headers["user-agent"])
        const uaResult = parser.getResult()

        const browser = uaResult.browser.name || "Unknow Browser"
        const os = uaResult.os.name || "Unknown Device"
        const osVersion = uaResult.os.version ? `${uaResult.os.name}` : ""
        const deviceModel = uaResult.device.model  // for mobile devices
        const deviceName = deviceModel ?
            `${browser} on ${deviceModel}` :
            `${browser} on ${os} ${osVersion}`

        const forwarded = req.headers["x-forwarded-for"]
        const rawIp: string = (Array.isArray(forwarded)
            ? forwarded[0]
            : typeof forwarded === "string"
                ? forwarded.split(",")[0]
                : req.socket.remoteAddress) ?? "Unknown IP";

        const ipAddress = rawIp.trim()
        const tokenID = crypto.randomUUID()
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

        user.session = user.session.filter(s => new Date(s.expiresAt).getTime() > Date.now())
        user.session.push({
            tokenID,
            deviceName,
            ipAddress,
            expiresAt
        })

        await user.save()
    
        const token = generateToken(user._id.toString(), tokenID)

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7*24*60*60*1000
        })
        
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
    }
}