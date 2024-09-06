// services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async ({ email, subject, body }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
