const express = require('express');
const router = express.Router();
const movie = require('../controllers/movie.controller');

// find movies
router.get('/movie', movie.find);

module.exports = router;
