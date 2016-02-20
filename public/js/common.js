$(function(){
	//表格行，鼠标放上去变色
	$(".tr:odd").css("background", "#FFFCEA");
	$(".tr:odd").each(function(){
		$(this).hover(function(){
			$(this).css("background-color", "#FFE1FF");
		}, function(){
			$(this).css("background-color", "#FFFCEA");
		});
	});
	$(".tr:even").each(function(){
		$(this).hover(function(){
			$(this).css("background-color", "#FFE1FF");
		}, function(){
			$(this).css("background-color", "#fff");
		});
	}); 

    
    $.get('/commodity', function (data){
        $.each(data,function(i,j){
            var html = '<tr class="tr"><td class="td_center">'+j.name+'</td><td>￥'+j.price+'</td><td><a href="/admin/del/'+j._id+'">删除</a></td></tr>';
            $("#tablebox").append(html);
        })
    })
    
    
 
});