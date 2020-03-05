const users = require('../models/users.model');
const bookmarks = require('../models/bookmarks.model');
const mongoose = require('mongoose');


exports.login = (req, res) => {

    // Validate request
    if (!req.body.username || !req.body.password) {

        return res.status(400).send({
            message: "username or password not valid"
        });
    }

    users.findOne({username: req.body.username, password: req.body.password})
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

    if (!req.session.loggedin) {
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }

    req.session.loggedin = false;
    req.session.userId = null;
    return res.status(200).send({
        message: "logout successful"
    });
};

exports.updateBookmarks = (req, res) => {

    if (!req.session.loggedin || req.session.userId !== req.params.userId) {
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }

    users.findOne({_id: req.session.userId})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not Found"
                });
            }
            bookmarks.find({userId: req.session.userId}).then(data => {
                if (data.length > 1) {
                    res.status(500).send({message: error.message || "data inconsistency."});
                }
                if (!data || data.length === 0) {

                    let bookmark = new bookmarks();
                    bookmark.userId = req.session.userId;
                    bookmark.favorites.push(req.params.movieId);
                    bookmark._id = mongoose.Types.ObjectId();
                    bookmark.save().then(favorite => {
                        console.log("save bookmark done: ", favorite);
                        res.send(favorite);
                    }).catch(error => {
                        return res.status(500).send({
                            message: error.message || "Some error occurred while creating the bookmark."
                        });
                    })
                } else {

                    if (data[0].favorites.indexOf(req.params.movieId) > -1) {
                        return res.status(409).send({message: "Movie already exist!"});
                    } else {
                        if (!data[0].favorites) {
                            data[0].favorites = [];
                        }
                        data[0].favorites.push(req.params.movieId);
                        console.log("save bookmark done: ", data);
                    }
                    console.log("save bookmark done: ", data);

                    bookmarks.findByIdAndUpdate(data[0]._id, {
                        userId: req.params.userId,
                        favorites: data[0].favorites
                    }, {new: true}).then(saved => {
                        console.log("saved favorite done: ", saved);
                        return res.send(saved);
                    });
                }
            }).catch(error => {
                return res.status(500).send({
                    message:
                        error.message || "Some error occurred while creating the bookmark."
                });
            });
        }).catch(error => {
        return res.status(500).send({message: error.message || "Some error occurred while creating the bookmark."});
    });
};


exports.bookmarks = (req, res) => {

    if (!req.session.loggedin || req.session.userId !== req.params.userId) {
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }

    bookmarks.findOne({userId: req.params.userId}).then(bookmark => {
        console.log("retrieved ", bookmark);
        if (!bookmark) {
            return res.status(404).send({message: "bookmarks not found for userId " + req.params.userId});
        }
        return res.send(bookmark);
    }).catch(error => {
        return res.status(500).send({message: error.message || "Some error occurred while creating the bookmark."});
    });
};

exports.deleteBookmark = (req, res) => {

    if (!req.session.loggedin || req.session.userId !== req.params.userId) {
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }

    users.findOne({_id: req.session.userId})
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "User Not Found"});
            }
            bookmarks.find({userId: req.session.userId}).then(data => {
                if (data.length > 1) {
                    return res.status(500).send({message: error.message || "data inconsistency."});
                }
                if (data.length === 0) {
                    return res.status(404).send({message: "User Not Found."});
                }
                let index = data[0].favorites.indexOf(req.params.movieId);

                if (index > -1) {
                    data[0].favorites.splice(index, 1);
                } else {
                    res.status(404).send({message: "Movie Not Found."});
                }

                bookmarks.findByIdAndUpdate(data[0]._id, {
                    userId: req.params.userId,
                    favorites: data[0].favorites
                }, {new: true}).then(deleted => {
                    console.log("delete favorite done: ", deleted);
                    return res.send(deleted);
                });
            }).catch(error => {
                return res.status(500).send({message: error.message || "Some error occurred while creating the bookmark."});
            });
        }).catch(error => {
        return res.status(500).send({message: error.message || "Some error occurred while deleting the bookmark."});
    });

};
