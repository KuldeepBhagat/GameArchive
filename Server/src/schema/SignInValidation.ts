import {z} from 'zod'

export const SignInValidationSchema = z.object(
    {
        email: z
        .string("Email is required")
        .min(1, "Email is required")
        .trim(),

        password: z
        .string("Password is required")
        .min(1, "Password is required") 
    }
)

export type SignInInput = z.infer<typeof SignInValidationSchema>