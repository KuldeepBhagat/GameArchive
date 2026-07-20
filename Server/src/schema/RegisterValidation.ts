import {email, z} from "zod"

export const RegisterValidationSchema = z.object({
    username: z
    .string("Username is required" )
    .trim()
    .min(1, "Username is required")
    .refine((val) => val.length >= 4, "Username must be at least 4 character long")
    .max(20, "username can't exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .regex(/[a-zA-Z]/, "must contain at least one character")
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Username must start with a latter"),

    email: z
    .string("Email is required")
    .min(1, "Email is required")
    .trim()
    .pipe(z.email("Invalid email format")),

    password: z
    .string("Password is required")
    .min(1, "Password is required")
    .refine((val) => val.length >= 8, "Password must be at least 8 characters long")
    .max(100, "Password is too long")

})

export type RegisterInput = z.infer<typeof RegisterValidationSchema>

