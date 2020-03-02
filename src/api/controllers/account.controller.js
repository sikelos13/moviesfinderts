const users = require('../models/users.model');

exports.login = (req, res) => {

    // Validate request
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "username or password not valid"
        });
    }

    users.findOne({username:req.body.username ,password:req.body.password})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with credentials"
                });
            }
            user.password = users.generateHash(user.password);
            req.session.loggedin = true;
            req.session.userId = user._id;
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with credentials"
            });
        }
        return res.status(500).send({
            message: "Error retrieving username and pass "
        });
    });
};

exports.logout = (req, res) => {

    if(!req.session.loggedin){
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }

    req.session.loggedin = true;
    return res.status(200).send({
        message: "logout successful"
    });
};

