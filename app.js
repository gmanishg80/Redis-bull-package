const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { messageQueue } = require('./queues/mail-queue');
const { sendEmail } = require('./mail-service/mailService');
const {sendInvoiceEmail} = require("./mail-service/mail-pdf")
require("./db");

const app = express();
app.use(express.json());

app.use('/api', userRoutes);


messageQueue.process(async (job) => {
    try {
        console.log(`Processing job with id ${job.id}`);
        await sendEmail(job.data);
        // await sendInvoiceEmail(job.data);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error processing job:', error);
    }
});


app.listen(7070, () => {
    console.log("Server and worker are running on port 7070");
});
