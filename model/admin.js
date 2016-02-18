var mongoose = require('mongoose');

var adminuser = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('admin',adminuser);