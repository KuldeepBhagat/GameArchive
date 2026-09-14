import {z} from "zod"

export const emailValidationSchema = z.object(
    {
        email: z
        .string("Email is required")
        .min(1, "Email is required")
        .trim(),
    }
)

export const passwordValidationSchema = z.object({
    newPassword: z
    .string("Password is required")
    .min(1, "Password is required")
    .refine((val) => val.length >= 8, "Password must be at least 8 characters long")
    .max(100, "Password is too long")
})