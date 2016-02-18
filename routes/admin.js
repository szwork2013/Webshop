var crypto = require('crypto');
var dbAdmin = require('../model/admin');

module.exports = function(app){
    app.use(function(req, res, next){
        res.locals.adminuser = req.session.adminuser;
        next();
    })
    
    function Md5(val){
        var md5 = crypto.createHash('md5');
        return md5.update(val).digest('hex');
    }
    
    
    // 后台首页
    app.get('/admin/', function (req, res, next){
        if(!req.session.adminuser){
            res.redirect('/admin/login');
        }    
        res.render('admin/index');
    })
    
    // 后台登录
    app.get('/admin/login', function (req, res, next){
        res.render('admin/login');
    })
    
    // 后台登录处理
    app.post('/admin/login', function (req, res, next){
        var dataPost = {
            username: req.body.username,
            password: Md5(req.body.password)
        }
        dbAdmin.findOne(dataPost, function (err,doc){
            if(err){
                console.log(err);
            }
            if(doc != null){
                // 登陆成功
                req.session.adminuser = dataPost.username;
                res.locals.adminuser = req.session.adminuser;
                return res.redirect('/admin/');
            }else{
                return res.redirect('/admin/login');
            }
        })
    })
    
    // 退出登录
    app.get('/admin/logout', function (req,res,next){
        req.session.destroy();
        res.locals.adminuser = null;
        res.redirect('/admin/login');
    })
    
    app.get('/admin/main',function (req, res, next){
        res.render('admin/main');
    })
}