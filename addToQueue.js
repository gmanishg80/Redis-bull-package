const {messageQueue} = require('./queues/mail-queue');

const addEmailToQueue = async (email, subject, body) => {
    try {
        const job = await messageQueue.add(
            { email, subject, body },
            { delay: 5000 }  
        );
        console.log(`Job added to queue with id: ${job.id}`);
    } catch (error) {
        console.error('Error adding email to queue:', error);
    }
};

module.exports = { addEmailToQueue };
