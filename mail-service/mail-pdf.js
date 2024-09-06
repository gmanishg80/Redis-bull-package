const nodemailer = require('nodemailer');
require('dotenv').config();
const { generatePDF } = require('../utils/generatePDF');


const sendInvoiceEmail = async (invoice, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const pdfStream = generatePDF(invoice);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Invoice',
        text: 'Please find attached your invoice.',
        attachments: [
            {
                filename: 'invoice.pdf',
                content: pdfStream,
                contentType: 'application/pdf'
            }
        ]
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendInvoiceEmail };