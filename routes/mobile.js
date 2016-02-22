var dbcommodity = require('../model/commodity');
var dbscart = require('../model/scart');
module.exports = function (app){
    // mobile index
    app.get('/mobile/', function (req, res, next){
        res.render('mobile/index', {title : '首页-Shop',css : 'index'});
    })
    
    // mobile page
    app.get('/mobile/page/:id', function (req, res, next){
        dbcommodity.find({_id:req.params.id},function (err,data){
            if(err){
                console.log(err);
            }
             res.render('mobile/page', {title: data[0].name, css:'page',data:data });
        })
    })
    
    // mobile cart
    app.get('/mobile/cart', function (req, res, next){
        if(!req.session.user){
            res.redirect('/login');
        }
        dbscart.find({user:req.session.user}, function (err,data){
            if(err){
                console.log(err);
            }
            res.render('mobile/cart', {title: '购物车', css:'cart', data:data});
        })
    })
    
    // mobile login
    app.get('/mobile/login', function (req, res, next){
        res.render('mobile/login',{title: 'login',css: 'login'})
    })
    
    // mobile reg
    app.get('/mobile/reg', function (req, res, next){
        res.render('mobile/reg',{title: 'reg', css:'reg'})
    })
}