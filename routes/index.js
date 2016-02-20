var dbUser = require('../model/user');
var crypto = require('crypto');
var dbcommodity = require('../model/commodity');
var dbscart = require('../model/scart');
var dborder = require('../model/order'); 

module.exports = function(app){
    
    app.use(function (req, res, next){
        res.locals.user = req.session.user;
        res.locals.error = '';
        next();
    })
    
    app.get('/', function (req, res, next){
        
        res.render('index', {title: '首页-Shop', cssname:'index'});
        
    })
    
    // 商品数据
    app.get('/commodity', function (req, res, next){
        dbcommodity.find({},null,{sort:{_id:-1}},function(err,data){
            if(err){
                console.log(err);
            }
            res.send(data);
        })
    })
    
    function Md5(val){
       var md5 = crypto.createHash('md5');
       return md5.update(val).digest('hex');
    }
    
    
    // 商品详情页
    app.get('/page/:id', function (req, res, next){
        dbcommodity.find({_id:req.params.id},function (err,data){
            if(err){
                console.log(err);
            }
             res.render('page', {title: data[0].name, cssname:'page',data:data });
        })
       
    })
    
    // 购物车页面
    app.get('/cart', function (req, res, next){
        if(!req.session.user){
            res.redirect('/login');
        }
        dbscart.find({user:req.session.user}, function (err,data){
            if(err){
                console.log(err);
            }
            res.render('cart', {title: '购物车', cssname:'cart',data:data });
        })
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
        if(!req.session.user){
            res.redirect('/login');
        }
        dborder.find({},null,{sort:{_id:-1}},function(err,data){
            res.render('user',{title: '个人中心', cssname:'user', data:data});
        })
    })
    
    // 注册处理
    app.post('/reg', function (req, res, next){
        var dataPost = {
            username: req.body.username,
            password: Md5(req.body.password)
        }
        if(dataPost.password != Md5(req.body.password_rep)){
            res.locals.error = '输入的口令不一致,请重新输入!';
            return res.render('reg', {title: '注册',cssname:'reg'});
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
                    return res.render('reg', {title: '注册',cssname:'reg'});
                })
            }else{
                res.locals.error = '用户名已存在';
                return res.render('reg', {title: '注册',cssname:'reg'});
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
                return res.render('login', {title: '登录',cssname:'login'});
            }
        })
    })
    
    //退出登陆
    app.get('/logout', function(req, res, next){
        req.session.destroy();
        res.locals.user = null;
        res.redirect('/');
    })
    
    // 添加购物车
    app.post('/addcart', function (req, res, next){
        if(!req.session.user){
            return res.send('请先登录!');
        }
        var dataPost = {
            name: req.body.name,
            price: req.body.price * req.body.num,
            num: req.body.num,
            user: req.session.user
        }
        dbscart.create(dataPost,function (err,doc){
            if(err){
                console.log(err);
            }
            return res.send('已添加到购物车!');
        })
    })
    
    // 删除购物车
    app.get('/delcart/:id', function (req, res, next){
        dbscart.remove({_id:req.params.id}, function(err,doc){
            if(err){
                console.log(err);
            }
            if(doc.result.ok){
                res.redirect('/cart');
            }
        })
    })
    
    // 添加到订单
    app.post('/order',function (req, res, next){
        if(!req.session.user){
            return res.send('请先登录!');
        }
        dbscart.remove({_id: req.body.id},function(err,doc){
            if(err){
                console.log(err);
            }
            if(doc.result.ok){
                // 删除成功
            }
        })
        var dataPost = {
            name: req.body.name,
            price: req.body.price,
            num: req.body.num,
            user: req.session.user
        }
        dborder.create(dataPost,function (err,doc){
            if(err){
                console.log(err);
            }
            return res.send('提交成功!');
        })
    })
    
    // 删除订单
    app.get('/delorder/:id', function (req, res, next){
        dborder.remove({_id:req.params.id}, function(err,doc){
            if(err){
                console.log(err)
            }
            if(doc.result.ok){
                res.redirect('/user');
            }
        })
    })
    
    // 付款
    app.get('/paying/:id', function (req, res, next){
        dborder.update({_id:req.params.id},{status:true},function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect('/user');
            }
        })
    })
    
};
