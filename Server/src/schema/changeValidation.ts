import { z } from "zod"

// username password can't be same
export const usernameValidationSchema = z.object({
    password: z
        .string("Enter password")
        .min(1, "Enter password"),

    newUsername: z.
        string("Enter a new username")
        .trim()
        .min(1, "Username is required")
        .refine((val) => val.length >= 4, "Username must be at least 4 character long")
        .max(20, "username can't exceed 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
        .regex(/[a-zA-Z]/, "must contain at least one character")
        .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Username must start with a latter")
})

// old and new password should be different
export const passwordValidationSchema = z.object({
    password: z
        .string("Enter password")
        .min(1, "Enter password"),
    newPassword: z
        .string("Enter new password")
        .min(1, "Enter new password")
        .refine((val) => val.length >= 8, "Password must be at least 8 characters long")
        .max(100, "Password is too long")
})
