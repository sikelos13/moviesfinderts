const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');

// Create a new user
router.post('/user', users.create);

// Retrieve a single User with userId
router.get('/users/:userId', users.findOne);

// Update a User with userId
router.put('/users/:userId', users.update);

// Delete a Note with userId
router.delete('/users/:userId', users.delete);

module.exports = router;

