import {type Request, type Response,type NextFunction} from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    userId?: string
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
    const authHeader = req.headers["authorization"]
    const token = authHeader?.split(" ")[1]

    if(!token) {
        return res.status(401).json({
            success: false,
            error: "token not found"
        })
    }

    

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {userId: string}

        req.userId = decoded.userId
        next()
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}