module.exports = function(app){
    app.get('/', function (req, res, next){
        res.render('index', {title: '首页-Shop'});
    })
    
    // 商品详情页
    app.get('/page', function (req, res, next){
        res.render('page', {title: 'balala'});
    })
    
    // 购物车页面
    app.get('/cart', function (req, res, next){
        res.render('cart', {title: '购物车'});
    })
    
    // 注册页面
    app.get('/reg', function (req, res, next){
        res.render('reg', {title: '注册'});
    })
    
    // 登录页面
    app.get('/login', function (req, res, next){
        res.render('login',{title: '登录'});
    })
    
    // 个人中心页面
    app.get('/user', function (req, res, next){
        res.render('user',{title: '个人中心'});
    })
};
