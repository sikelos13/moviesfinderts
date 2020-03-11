const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
var cors = require('cors');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

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

//Import routes
const userRouter = require('./routes/user.routes');
const movieRouter = require('./routes/movie.routes');
const accountRouter = require('./routes/account.routes');

app.use('/api/v1/', userRouter);
app.use('/api/v1/search', movieRouter);
app.use('/api/v1/account', accountRouter);

// listen for requests
app.listen(8000,'localhost', (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on 8000`)
});
