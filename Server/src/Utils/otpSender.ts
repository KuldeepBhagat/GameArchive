import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

export async function sendOTP(toEmail: string, otp: string) {
    await transporter.sendMail({
        from: `"MGA" <${process.env.EMAIL}>`,
        to: toEmail,
        subject: "Your Verification Code",
        html: `
             <div style="font-family: sans-serif; padding: 16px;">
        <h2>Verify Your Email</h2>
        <p>Your one-time verification code is:</p>
        <h1 style="letter-spacing: 4px; color: #f59e0b;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
      </div>
        `
    })
}