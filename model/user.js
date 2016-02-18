var mongoose = require('mongoose');

var user = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('user',user);