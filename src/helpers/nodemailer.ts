import nodemailer from 'nodemailer'
import { EmailOptions } from '../interfaces/emailOptions'
import 'dotenv/config'

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });

        const info = await transporter.sendMail({
            from: process.env.MAILER_USER,
            to,
            subject,
            text,
            html
        })
        console.log('Email sent: ', info);

    } catch (error) {
        console.log(`Error while sending email: ${error}`);
        throw error
    }
}

export function emailVerifyTemplate(code: number) {
    return `<p>Hey,</p>
    <p>Your verification code to verify account is</p>
    <h2>${code}</h2>
    <p>Thank you.</p>`
}
