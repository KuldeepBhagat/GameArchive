import jwt  from "jsonwebtoken";

export const generateToken = (userId: string, remember: boolean = false): string => {
    const secret = process.env.JWT_SECRET
    if(!secret) {
        throw new Error("JWT_SECRET is missing")
    }

    const expiresIn = remember? "30d" : "1d"

    return jwt.sign({userId}, secret, {expiresIn})
}