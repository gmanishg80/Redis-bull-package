const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const { PassThrough } = require('stream');
const Invoice = require('../models/invoice-model');

const generatePDF = (invoice) => {
    const doc = new PDFDocument();
    const stream = new PassThrough();

    doc.pipe(stream);

    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`User ID: ${invoice.userId}`);
    doc.text(`Date: ${new Date(invoice.purchaseDate).toLocaleDateString()}`);
    doc.moveDown();

    doc.fontSize(14).text('Products:', { underline: true });
    invoice.products.forEach(product => {
        doc.text(`Name: ${product.name}`);
        doc.text(`Quantity: ${product.quantity}`);
        doc.text(`Price: $${product.price}`);
        doc.moveDown();
    });

    doc.fontSize(16).text(`Total Amount: $${invoice.totalAmount}`, { align: 'right' });

    doc.end();

    return stream;
};

module.exports = { generatePDF }