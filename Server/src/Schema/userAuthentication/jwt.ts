import jwt  from "jsonwebtoken";

export const generateToken = (userId: string, tokenId: string): string => {
    const secret = process.env.JWT_SECRET
    if(!secret) {
        throw new Error("JWT_SECRET is missing")
    }

    const expiresIn = "7d"

    return jwt.sign({userId, tokenId}, secret, {expiresIn})
}