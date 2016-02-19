// 订单
var mongoose = require('mongoose');

var order = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    user:{type: String},
    num: {type: Number},
    status: {type: Boolean, default: false}
})

module.exports = mongoose.model('order',order);