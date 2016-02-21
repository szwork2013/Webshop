module.exports = function (app){
    // mobile index
    app.get('/mobile/', function (req, res, next){
        res.send('hello mobile!');
    })
}