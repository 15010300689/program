//点击more  显示list_x

/*$('#more').on('click',function(){
	$(this).css({
		'background-position':"-422px 0",
		"height":"23px",
		"width":"28px"
	})
	$('#list_v').hide();
	$('#list_x').show();

})*/
getJson()
function getJson(){
	$.ajax({
		"url":"list.json",
		"type":"get",
		"dataType":"json",
		"async":false,
		success:function(data){
			console.log(data)
			renderData(data)
		},
		error:function(){
			alert("请求出错，请重新加载页面！")
		}
	})
}
function renderData(json){
	var str="";
	for(var i=0;i<json.length;i++){
		str+='<a href="detail.html" class="detailPage" data-tit="'+json[i].id+'"><dl>'+
					'<dt><img src="'+json[i].img_src+'" alt=""></dt>'+
					'<dd>'+
						'<h2>'+json[i].title+'</h2>'+
						'<small class="guige">'+json[i].pizhun_hao+'</small>'+
						'<div class="_info">'+
							'<span><strong>￥'+json[i].min_price+'</strong><small>起</small></span>'+
							'<em><i>'+json[i].storenum+'</i>家商家在售</em>'+
						'</div>'+
					'</dd>'+
				'</dl></a>'
	}
	$("#list_v").html(str)
}
//
$("#list_v").find("a").each(function(i,ele){
	$(this).on("click",function(e){
		e.preventDefault()
		var _id=$(this).data("tit");
		location.href="detail.html?id="+_id
	})
})