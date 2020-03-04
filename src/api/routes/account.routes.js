const express = require('express');
const router = express.Router();
const account = require('../controllers/account.controller');


router.post('/login', account.login);

router.post('/logout', account.logout);

router.put('/:userId/favorite/:movieId', account.updateBookmarks);

router.get('/:userId/favorite', account.bookmarks);

module.exports = router;
