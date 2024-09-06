const Invoice = require('./models/invoice-model');

exports.createInvoice = async (req, res) => {
    try {
        const { userId, products } = req.body;

        const totalAmount = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

        const invoice = await Invoice.create({ userId, products, totalAmount });
        

        res.status(200).json({ message: 'Invoice created and email sent', invoice });
    } catch (err) {
        res.status(500).json({ message: 'Error creating invoice', error: err.message });
    }
};

// Send invoice email function
const sendInvoiceEmail = async (invoice) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Render invoice template
        const templatePath = path.join(__dirname, '../views/invoiceTemplate.ejs');
        const htmlContent = await ejs.renderFile(templatePath, { invoice });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'customer@example.com', // Replace with the customer's email
            subject: 'Your Invoice',
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;
    }
};
