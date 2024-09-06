const User = require('../models/user-model');
const { addEmailToQueue } = require('../addToQueue');
const Invoice = require('../models/invoice-model');
const {sendInvoiceEmail} = require('../mail-service/mail-pdf');

const createUser = async (req, res) => {
    const { email, name, gender, age } = req.body;
    console.log(req.body);
    const newUser = await User.create({ email, name, gender, age });

    await addEmailToQueue(email, 'Welcome!', `Hello ${name}, welcome to our platform!`);

    return res.status(201).json({ message: 'User created', newUser });
};




const updateUser = [

    async (req, res) => {

        try {
            const updateData = ["email", "name", "gender", "age"];

            const userId = req.query.userId;
            const user = await User.findById(userId);
            console.log(user);

            const refData = {};
            for (const key of updateData) {
                console.log('keyyy', key);
                if (req.body[key] != null && req.body[key] != "") {
                    refData[key] = req.body[key];
                }
            }

            const updated_user = await User.findOneAndUpdate({ _id: userId }, { $set: refData }, { new: true });
            console.log(updated_user);
            if (updated_user) {
                await addEmailToQueue(updated_user.email, 'Updated!', `Hello ${updated_user.name}, Data updated successfully!!!`);

                return res.status(200).json({ message: 'User updated', updated_user });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.log(error);

        }
    }
];


// const createInvoice = async (req, res) => {
//     try {
//         const { userId, products ,email } = req.body;

//         const totalAmount = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

//         console.log("total amount", totalAmount);

//         const invoice = await Invoice.create({ userId, products, totalAmount });
//          let invoiceData = invoice.products.map((product) => {
//              return `Name: ${product.name}, Quantity: ${product.quantity}, Price: $${product.price}`;      
//          }).join('<br>');

//          console.log(invoiceData);
         

//          await addEmailToQueue(email, 'Invoice!', `Hello, here is your invoice:<br><br>${invoiceData}<br><br>Total amount: $${totalAmount}.`);

//         res.status(200).json({ message: 'Invoice created and email sent', invoice });
//     } catch (err) {
//         res.status(500).json({ message: 'Error creating invoice', error: err.message });
//     }
// };



const createInvoice = async (req, res) => {
    try {
        const { userId, products, email } = req.body;

        const totalAmount = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

        console.log("Total amount:", totalAmount);

        const invoice = await Invoice.create({ userId, products, totalAmount });

        console.log('Invoice created:', invoice);
        

        await sendInvoiceEmail(invoice, email);

        res.status(200).json({ message: 'Invoice created and email sent', invoice });
    } catch (err) {
        res.status(500).json({ message: 'Error creating invoice', error: err.message });
    }
};

module.exports = { createUser, updateUser, createInvoice };
