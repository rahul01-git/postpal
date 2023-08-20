"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerifyTemplate = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
async function sendEmail({ to, subject, text, html }) {
    try {
        const transporter = nodemailer_1.default.createTransport({
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
        });
        console.log('Email sent: ', info);
    }
    catch (error) {
        console.log(`Error while sending email: ${error}`);
        throw error;
    }
}
exports.sendEmail = sendEmail;
function emailVerifyTemplate(code) {
    return `<p>Hey,</p>
    <p>Your verification code to verify account is</p>
    <h2>${code}</h2>
    <p>Thank you.</p>`;
}
exports.emailVerifyTemplate = emailVerifyTemplate;
