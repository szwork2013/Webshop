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
})