module.exports = function (app){
    // mobile index
    app.get('/mobile/', function (req, res, next){
        res.render('mobile/index', {title : '首页-Shop'});
    })
}