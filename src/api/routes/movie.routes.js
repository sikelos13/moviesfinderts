const express = require('express');
const router = express.Router();
const movie = require('../controllers/movie.controller');

// find movies
router.get('/movies', movie.find);

router.get('/movie/:movieId', movie.findByID);


module.exports = router;
