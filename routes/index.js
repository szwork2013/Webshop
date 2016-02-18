var dbUser = require('../model/user');
var crypto = require('crypto');

module.exports = function(app){
    
    app.use(function (req, res, next){
        res.locals.user = req.session.user;
        res.locals.error = '';
        next();
    })
    
    app.get('/', function (req, res, next){
        res.render('index', {title: '首页-Shop', cssname:'index'});
    })
    
    function Md5(val){
       var md5 = crypto.createHash('md5');
       return md5.update(val).digest('hex');
    }
    
    
    // 商品详情页
    app.get('/page', function (req, res, next){
        res.render('page', {title: 'balala', cssname:'page'});
    })
    
    // 购物车页面
    app.get('/cart', function (req, res, next){
        res.render('cart', {title: '购物车', cssname:'cart'});
    })
    
    // 注册页面
    app.get('/reg', function (req, res, next){
        res.render('reg', {title: '注册', cssname:'reg'});
    })
    
    // 登录页面
    app.get('/login', function (req, res, next){
        res.render('login',{title: '登录', cssname:'login'});
    })
    
    // 个人中心页面
    app.get('/user', function (req, res, next){
        res.render('user',{title: '个人中心', cssname:'user'});
    })
    
    // 注册处理
    app.post('/reg', function (req, res, next){
        var dataPost = {
            username: req.body.username,
            password: Md5(req.body.password)
        }
        if(dataPost.password != Md5(req.body.password_rep)){
            res.locals.error = '输入的口令不一致,请重新输入!';
            return res.render('reg', {title: '注册'});
        }
        dbUser.findOne({username:dataPost.username},function (err,doc){
            if(err){
                console.log(err);
            }
            if(doc == null){
                dbUser.create(dataPost,function (err,doc){
                    if(err){
                        console.log(err);
                    }
                    res.locals.error = '注册成功';
                    return res.render('reg', {title: '注册'});
                })
            }else{
                res.locals.error = '用户名已存在';
                return res.render('reg', {title: '注册'});
            }
        })
    })
    
    // 登陆处理
    app.post('/login', function (req, res, next){
        var dataPost = {
            username: req.body.username,
            password: Md5(req.body.password)
        }
        dbUser.findOne(dataPost, function(err,doc){
            if(err){
                console.log(err);
            }
            if(doc != null){
                // 登陆成功
                req.session.user = dataPost.username;
                res.locals.user = req.session.user;
                res.redirect('/');
            }else{
                res.locals.error = '用户名或密码不正确';
                return res.render('login', {title: '登录'});
            }
        })
    })
    
    //退出登陆
    app.get('/logout', function(req, res, next){
        req.session.destroy();
        res.locals.user = null;
        res.redirect('/');
    })
    
    
};
