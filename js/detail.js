;(function($){
	$("#list").find(".standard").on("click",function(){
		if($(".dropdown").css("display")=="none"){
			$(".dropdown").css("display","block")
		}else{
			$(".dropdown").css("display","none")
		}

	})
var para=getParamerer()
getJson()
getListData()
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
function renderData(data){
	for(var i=0;i<data.length;i++){
		if(para.id==data[i].id){
			var _index=i
		}
	}
	//console.log(data[_index])
	var data=data[_index]
	var str='<div class="goods">'+
					'<a href="javascript:void(0);" class="pic"><img src="'+data.img_src+'"></a>'+
					'<div class="txt">'+
						'<h2>'+
							'<label class="cf">处方</label>'+
							data.title+'</br>(<b>'+data.stan+''+data.deg+'×'+data.num+'</b>粒/瓶)'+
						'</h2>'+
						'<p class="pri"><em>¥</em>'+data.min_price+'～<em>¥</em>'+data.max_price+'<label for="">(共'+data.storenum+'个报价)</label></p>'+
						'<p><label for="">批准文号：</label>'+data.pizhun_hao+'</p>'+
						'<p class="make"><label for="">生产企业：</label>'+data.production+'</p>'+
					'</div>'+
				'</div>'+
				'<div class="infor">'+data.datail+'</div>'
	$("#con").html(str)
}
function getListData(){
	$.ajax({
		"url":"detail.json",
		"type":"get",
		"dataType":"json",
		"async":false,
		success:function(data){
			renderDetail(data)
		},
		erorr:function(){
			alert("请求出错，请重新加载页面！")
		}

	})
}
function renderDetail(data){
	var str='';
	for(var i=0;i<data.length;i++){
		str+='<li>'+
				'<a href="javascript:void(0);" class="stitle">'+
					'<div class="com_detail">'+
						'<div class="comp">'+
							'<p class="com_name">'+data[i].name+
							'<p class="area">'+
								'<label for="">'+data[i].address+'</label>'+
								'<label for="">评分：<i class="score">'+data[i].score+'分</i></label>'+
							'</p>'+
						'</div>'+
						'<div class="command">'+
							'<span class="act"><i></i>'+data[i].time+'小时发货</span>'+
							'<span class="act"><i></i>'+data[i].favor+'</span>'+
							'<span class="act"><i></i>'+data[i].act+'</span>'+
						'</div>'+
						'<div class="des">'+
							'<b><em>¥</em>'+data[i].price+'</b>'+
							'<span class="yf">运费<i>'+data[i].deliveryPay+'元</i></span>'+
						'</div>'+
					'</div>'+
				'</a>'+
			'</li>'
	}
	$("#list_con").find("ul").html(str)
}
})(Zepto)