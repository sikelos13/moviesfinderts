const express = require('express');
const router = express.Router();
const account = require('../controllers/account.controller');


router.post('/login', account.login);

router.post('/logout', account.logout);

module.exports = router;
