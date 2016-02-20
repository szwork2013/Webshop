var crypto = require('crypto');
var dbAdmin = require('../model/admin');
var dbcommodity = require('../model/commodity');
var dbuser = require('../model/user');
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/avatar/';

module.exports = function(app){
    app.use(function(req, res, next){
        res.locals.msg = '';
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
    
    app.post('/admin/main', function (req, res, next){
        var form = new formidable.IncomingForm(); //创建上传表单
        form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
        form.keepExtensions = true;	 //保留后缀
        console.log(req.body.content)
        form.parse(req, function(err, fields, files){
            var imgsrc = files.imgSrc.path;
            var index = files.imgSrc.path.indexOf('avatar');
            imgsrc = imgsrc.substring(index,imgsrc.length);
            var dataPost = {
                name: fields.name,
                nametitle: fields.nametitle,
                type: fields.type,
                content: fields.content,
                price: fields.price,
                imgsrc: imgsrc
            }
            console.log(req.body.content)
            dbcommodity.create(dataPost,function (err,doc){
                if(err){
                    console.log(err)
                }
                res.locals.msg = '保存成功!';
                res.render('admin/main');
            })
        })
    })
    
    
    
    
    // 删除商品
    app.get('/admin/del/:id',function (req, res, next){
        dbcommodity.remove({_id:req.params.id},function(err,doc){
            if(err){
                console.log(err);
            }
            if(doc.result.ok){
                // 删除成功
                res.locals.msg = '删除成功!';
                res.redirect('/admin/main');
            }
        })
    })
    
    // 用户管理
    app.get('/admin/user',function (req, res, next){
        dbuser.find({},null,{sort:{_id:-1}},function (err,data){
            res.render('admin/user',{data:data});    
        })
    })
    
    // 删除用户
    app.get('/deluser/:id', function (req, res, next){
        dbuser.remove({_id: req.params.id},function (err,doc){
            if(err){
                console.log(err)
            }
            if(doc.result.ok){
                res.redirect('/admin/user');
            }
        })
    })
    
    // 修改后台密码页面
    app.get('/admin/pwd', function (req, res, next){
        res.render('admin/pwd');
    })
    
    // 修改后台密码
    app.post('/admin/pwd', function (req, res, next){
        dbAdmin.findOne({password:Md5(req.body.password)},function(err,doc){
            if(err){
                console.log(err)
            }
            if(doc == null){
                res.locals.msg = '原密码不正确!';
                return res.render('admin/pwd');
            }else{
                dbAdmin.update({username: req.session.adminuser },{password: Md5(req.body.newpassword)},function(err,doc){
                    
                    if(err){
                        console.log(err)
                    }else{
                        res.locals.msg = '修改成功';
                        return res.render('admin/pwd');
                    }
                    
                })
            }
        })
    })
}