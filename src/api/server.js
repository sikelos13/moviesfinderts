const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//Start a in-memory Mongo database
const MongoInMemory = require('mongo-in-memory');

var mongoServerInstance= new MongoInMemory();

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("mongoose connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");

    mongoServerInstance.start((error, config) => {
        console.log("MongoDB started");
        if (error) {
            console.error(error);
        }
    })
});

require('./routes/user.routes')(app);
require('./routes/movie.routes')(app);