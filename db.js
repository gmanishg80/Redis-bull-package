const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URL;
mongoose.connect(uri)
.then(()=>{ console.log( `Connected To Mongodb Database ${mongoose.connection.host}!!!`);})
.catch(()=>{ console.log("Mongodb Database Error error" );})