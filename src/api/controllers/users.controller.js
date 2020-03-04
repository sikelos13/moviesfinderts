const users = require('../models/users.model');

// Create and Save a new user
exports.create = (req, res) => {

    // Validate request
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "username or password not valid"
        });
    }

    // Create a user
    const user = new users({
        username: req.body.username,
        password: req.body.password
    });

    users.findOne({username:user.username,password:user.password}, function (err, u) {
        if (err) return console.error(err);

        if (u) {
            console.log("user exist ", u);
            return res.status(400).send({
                message: "username or password not valid"
            });
        }
        // Save user in the database
        user.save()
            .then(data => {
                console.log("save user done: ", data);
                data.password = users.generateHash(data.password)
                res.send(data);
            }).catch(error => {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the user."
            });
        })
    })
};

// Find a single user with a userId
exports.findOne = (req, res) => {

    if(!req.session.loggedin || req.session.userId !== req.params.userId ){
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }

    users.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "user not found with id " + req.params.userId});
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

    if(!req.session.loggedin || req.session.userId !== req.params.userId ){
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }

    // Validate Request
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "user data can not be empty"
        });
    }

    // Find user and update it with the request body
    users.findByIdAndUpdate(req.params.userId, {
        username: req.body.username,
        password: req.body.password
    }, {new: true})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {

    if(!req.session.loggedin || req.session.userId !== req.params.userId ){
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }

    users.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send({message: "user deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};