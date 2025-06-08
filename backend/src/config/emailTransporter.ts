import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth:{
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
})