import {z} from "zod"

export const OtpValidation = z.object({
    otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^[0-9]+$/, "OTP must only contain digits (0-9)")
})

export type OtpInput = z.infer<typeof OtpValidation>