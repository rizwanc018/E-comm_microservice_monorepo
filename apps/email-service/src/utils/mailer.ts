import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendMail = async (to: string, subject: string, text: string) => {
    const res = await transporter.sendMail({
        from: '"E-Comm" <noreply@example.com>',
        to,
        subject,
        text,
    });

    console.log("MESSAGE SENT: ", res);
};

export default sendMail;
