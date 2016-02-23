$(function(){
	$(".header-nav").on('click',function(){
        if($("#mobile-main").hasClass("active")){
            $("html,body").css({
                "overflow-y": ""
            })
            $(".nav-left").css({
                "width":"0%"
            })
            $("#mobile-main").removeClass("active");
        }else{
            $("html,body").css({
                "overflow": "hidden"
            })
            $(".nav-left").css({
                "width":"60%"
            })
            $("#mobile-main").addClass("active");
            $("body").height( $(window).height() );
        }
	})
    
    $.get("/commodity",function(data){
        $.each(data,function(i,j){
            var html = '<div class="col-xs-6"><div class="shopcom-img"><img src="'+j.imgsrc+'" class="img-responsive" alt=""><a href="/mobile/page/'+j._id+'" class="shopcom-name">'+j.name+'</a></div></div>';
            $(".shopcom-m").append(html);
        })
    })
    
    $(".pro-btn").on('click', function(){
        var data = {
            name: $('.page-name').html(),
            price: $('.sprice').html(),
            num: $('.snum').val()
        }
        $.post('/addcart',data,function(success){
            alert(success);
            location.href = '/cart';
        })
    })
    
    var sum = 0;
    $('.cart-c').find('.cart-check').click(function(){
        if($(this).is(':checked')){
            sum += parseInt($(this).attr('data-price'));
        }else{
            sum -= $(this).attr('data-price');
        }
        $('.nav .cart-price').html(sum + '.00');
    })
    
    $('#cart-btn').on('click', function(){
        var data = {
            id: $('.cart-id').val(),
            name: $('.cart-name').html(),
            num: $('.p-num').html(),
            price: $('.cart-price').html()
        }
        if(!data.id){
            alert('购物车里没有东西');
            return false;
        }
        console.log(data.id)
        console.log(data.price)
        if(data.price <= 0){
            alert('请选择商品')
            return false;
        }else{
            $.post('/order',data, function (succcess){
                alert(succcess);
                location.href = '/user';
            })
        }
        
    })
    
    
    
})