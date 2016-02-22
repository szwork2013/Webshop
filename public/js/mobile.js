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
            name: $('.sname').html(),
            price: $('.sprice').html(),
            num: $('.snum').val()
        }
        $.post('/addcart',data,function(success){
            alert(success);
            location.href = '/cart';
        })
    })
    
})