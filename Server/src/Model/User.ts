import {Schema, model, Document} from "mongoose"

export interface SessionI {
  tokenID: string;
  deviceName: string;
  ipAddress?: string;
  createdAt?: Date;
  expiresAt: Date;
}

export interface UserI extends Document {
    username: string,
    email: string,
    passwordHash: string,
    verified: boolean,
    createdAt: Date
    session: SessionI[]
}

const sessionSchema = new Schema<SessionI>(
    {
        tokenID: {type: String, required: true},
        deviceName: {type: String, required: true, default: "Unknown Device"},
        ipAddress: {type: String},
        createdAt: {type: Date, default: Date.now},
        expiresAt: {type: Date, required: true}
    }
)

const userSchema = new Schema<UserI>(
    {
        username: {type: String, required: true, unique: true, trim: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        passwordHash: {type: String, required: true},
        verified: {type: Boolean, default: false},
        session: [sessionSchema]
    },
    {timestamps: true}
)

export const User = model<UserI>("User", userSchema)