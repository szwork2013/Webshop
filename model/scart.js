// 购物车
var mongoose = require('mongoose');

var scart = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    num: {type: Number},
    user:{type:String}
})

module.exports = mongoose.model('scart',scart);