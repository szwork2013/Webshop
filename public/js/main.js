$(function(){
    $('.item').on('mouseover',function(){
        var index = $(this).index();
        $(this).css('background','#fff');
        $(this).find('a').css('color','#B61D1D');
        $('.item-brands').eq(index).show();
    })
    
    $('.item').on('mouseout',function(){
        var index = $(this).index();
        $(this).css('background','#C81623');
        $(this).find('a').css('color','#fff');
        $('.item-brands').eq(index).hide();
    })
    
    $('.item-brands').on('mouseover',function(){
        var index = $(this).index() -3;
        $('.item.fore1').eq(index).css('background','#fff');
        $('.item.fore1 h3 a').eq(index).css('color','#B61D1D');
        $(this).show();
    })
    
    $('.item-brands').on('mouseout',function(){
        var index = $(this).index() - 3;
        $('.item.fore1').eq(index).css('background','#C81623');
        $('.item.fore1 h3 a').eq(index).css('color','#fff');
        $(this).hide();
    })
    var spanindex = 1;
    $('.slider span').find('a').on('mouseover', function(){
        $('.slider span a').removeClass('active');
        $(this).addClass('active');
        spanindex = $(this).index();
        $('.slider ul li img').fadeOut(100);
        $('.slider ul li img').eq(spanindex).fadeIn(200);
    })
    
    var slidertime = setInterval(function(){
        
        if(spanindex >= 3){
            spanindex = 0;
            return ;
        }else{
            $('.slider span a').removeClass('active');
            $('.slider span a').eq(spanindex).addClass('active');
            $('.slider ul li img').fadeOut(100);
            $('.slider ul li img').eq(spanindex).fadeIn(200);
        }
        spanindex += 1;
    },5000)
    
    $('.tab ul').find('li').on('mouseover',function(){
        var index = $(this).index();
        $('.tab ul li a').removeClass('active');
        $(this).find('a').addClass('active');
        $('.tabs-item1').removeClass('active');
        $('.tabs-item1').eq(index).addClass('active');
    })
    
    $('.trigger').on('click', function(){
        $('html,body').animate({
            scrollTop: 0 + 'px'
        },'slow')
    })
    
    $.get('/commodity', function (data){
        $.each(data,function(i,j){
            if(j.type == 0){
                var html = '<div class="tabs"><a target="_blank" href="/page/'+j._id+'"><img src="'+j.imgsrc+'" alt=""></a><p><a target="_blank" href="/page/'+j._id+'">'+ j.name+'</a></p><p class="tabs-price">价格 <em>￥'+ j.price+'</em></p></div>';
                $(".tab .item1").append(html);
            }
            if(j.type == 1){
                html = '<div class="tabs"><a target="_blank" href="/page/'+j._id+'"><img src="'+j.imgsrc+'" alt=""></a><p><a target="_blank" href="/page/'+j._id+'">'+ j.name+'</a></p><p class="tabs-price">价格 <em>￥'+ j.price+'</em></p></div>';
                $(".tab .item2").append(html);
            }
            if(j.type == 2){
                html = '<div class="tabs"><a target="_blank" href="/page/'+j._id+'"><img src="'+j.imgsrc+'" alt=""></a><p><a target="_blank" href="/page/'+j._id+'">'+ j.name+'</a></p><p class="tabs-price">价格 <em>￥'+ j.price+'</em></p></div>';
                $(".tab .item3").append(html);
            }
        })
    })
    
    $(".pro-btn").on('click', function(){
        var data = {
            name: $('.sname').html(),
            price: $('.sprice').html(),
            num: $('.snum').val()
        }
        $.post('/addcart',data,function(success){
            alert(success);
            location.href = '/cart';
        })
    })
    
    var sum = 0;
    $('.cart').find('.cartche').click(function(){
        if($(this).is(':checked')){
            sum += parseInt($(this).attr('data-price'));
        }else{
            sum -= $(this).attr('data-price');
        }
        $('.cart-price').html(sum + '.00');
    })
    
    $('.cart-btn').on('click', function(){
        var data = {
            id: $('.cart-id').val(),
            name: $('.p-name').html(),
            num: $('.p-num').html(),
            price: $('.cart-price').html()
        }
        if(!data.id){
            alert('购物车里没有东西')
            return ;
        }
        if(data.price <= 0){
            alert('请选择商品')
            return ;
        }
        $.post('/order',data, function (succcess){
            alert(succcess);
            location.href = '/user';
        })
    })
    
})