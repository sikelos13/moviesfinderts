//Start a in-memory Mongo database
const MongoInMemory = require('mongo-in-memory');

const mongoServerInstance= new MongoInMemory();

mongoServerInstance.start((error) => {
    console.log("MongoDB started");
    if (error) {
        console.error(error);
    }
});
