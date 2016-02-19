var mongoose = require('mongoose');

var commodity = new mongoose.Schema({
    name: {type : String}, //商品名称
    nametitle: {type : String}, //商品副标题
    type: {type : String}, //商品类型
    content: {type : String}, //商品描述
    price: {type : Number}, //商品价格
    imgsrc: {type : String} //商品展示图
})

module.exports = mongoose.model('commodity',commodity);