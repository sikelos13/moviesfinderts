module.exports = (app) => {
    const movie = require('../controllers/movie.controller.js');

    // find movies
    app.get('/movie', movie.find);
};