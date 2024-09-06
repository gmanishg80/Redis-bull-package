const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    }
}, { timestamps: true, });


const User = mongoose.model("User", Schema);
module.exports = User;