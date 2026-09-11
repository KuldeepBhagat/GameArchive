import { type Request, type Response, type NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../Model/User"

export interface jwtPayload {
    userId: string,
    tokenId: string
}

export interface AuthRequest extends Request {
    userId?: string,
    tokenID?: string
}

export const AuthenticateRequest = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {

        const token = req.cookies.accessToken

        if (!token) {
            return res.status(401).json({
                success: false,
                error: "token not found"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as jwtPayload

        const user = User.findOne({
            _id: decoded.userId,
            "session.tokenID": decoded.tokenId
        })

        if (!user) {
            res.clearCookie("accessToken")
            return res.status(401).json({ message: "session expired" })
        }

        req.userId = decoded.userId
        req.tokenID = decoded.tokenId

        next()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}