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

// listen for requests
app.listen(8000, (err) => {
    console.log("ydsadsa");
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});

//Start a in-memory Mongo database
const MongoInMemory = require('mongo-in-memory');

var mongoServerInstance= new MongoInMemory();

mongoServerInstance.start((error) => {
    console.log("MongoDB started");
    if (error) {
        console.error(error);
    }
});

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

//Routes
require('./routes/movie.routes')(app);
require('./routes/user.routes')(app);