import {Schema, model, Document} from "mongoose"

export interface otpType extends Document {
    email: string,
    hashedOtp: string,
    createdAt: Date
}

const otpSchema = new Schema<otpType>({
    email: {type: String, required: true, index: true},
    hashedOtp: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: 300}
})

export const Otp = model<otpType>("Otp", otpSchema)