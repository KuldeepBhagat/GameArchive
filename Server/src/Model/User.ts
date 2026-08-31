import {Schema, model, Document} from "mongoose"
import { boolean } from "zod"

export interface UserI extends Document {
    username: string,
    email: string,
    passwordHash: string,
    verified: boolean,
    createdAt: Date
}

const userSchema = new Schema<UserI>(
    {
        username: {type: String, required: true, unique: true, trim: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        passwordHash: {type: String, required: true},
        verified: {type: Boolean, default: false}
    },
    {timestamps: true}
)

export const User = model<UserI>("User", userSchema)