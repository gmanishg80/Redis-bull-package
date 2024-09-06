const express = require('express');
const { createUser, updateUser , createInvoice } = require('../controllers/user-controller');

const router = express.Router();

router.post('/users', createUser);
router.put('/users', updateUser);
router.post('/invoice', createInvoice);

module.exports = router;