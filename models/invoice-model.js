const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
     },
    products: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: { 
        type: Number 
    },
    purchaseDate: { 
        type: Date 
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);