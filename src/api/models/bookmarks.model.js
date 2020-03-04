const mongoose = require('mongoose');

const bookmarksSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId: String,
    favorites: [String]
});

module.exports = mongoose.model('bookmarks', bookmarksSchema);