import nodemailer from "nodemailer";  
import dotenv from "dotenv";          

dotenv.config();  

export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,   // ví dụ: sandbox.smtp.mailtrap.io
  port: process.env.MAIL_PORT,   // 2525
  auth: {
    user: process.env.MAIL_USER, // user trong Mailtrap
    pass: process.env.MAIL_PASS, // pass trong Mailtrap
  },
});
