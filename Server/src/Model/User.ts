import {Schema, model, Document} from "mongoose"

export interface UserI extends Document {
    username: string,
    email: string,
    passwordHash: string,
    createdAt: Date
}

const userSchema = new Schema<UserI>(
    {
        username: {type: String, required: true, unique: true, trim: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        passwordHash: {type: String, required: true},
    },
    {timestamps: true}
)

export const User = model<UserI>("User", userSchema)