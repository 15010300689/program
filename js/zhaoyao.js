;(function($){
	init()
	var json;
	function init(){
		document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px";
		getJson()
		bindEvent()
	}
	function getJson(){
		$.ajax({
			url:"json.json",
			type:"get",
			dataType:"json",
			async:false,
			success:function(data){
				json=data
			},
			error:function(){
				alert("出错！")
			}
		})
	}
	function bindEvent(){
		$("#lists").on("click","a",function(e){
			e.preventDefault()
		}).on("tap","a",function(){
			//更改当前高亮
			$(this).addClass("bj").parent("li").siblings().find("a").removeClass("bj")
			//切换右侧内容
			var tit=$(this).data("tit");
			renderData(tit)
		})
	}
	var _tit=$("#lists").find("li").eq(0).find("a").data("tit");
	renderData(_tit)
	function renderData(tit){
		//console.log(json)
		//console.log(json["zhongxi"])
		var str="";
		str='<a class="title_img" href="javascript:void(0);"><img src="images/'+json[tit].img_src+'"></a>'
		$.each(json[tit].detail,function(i,ele){
			//console.log(ele)
			str+='<div class="item">'+
					'<h3 class="item_title">'+ele.title+'<a href="javascript:void(0);">更多>></a></h3>'+
					'<div class="item_con">'
			$.each(ele.con,function(j,v){
				str+='<a href="javascript:void(0);">'+
						'<img src="images/'+v.img_src+'">'+
						'<span>'+v.text+'</span>'+
					 '</a>'
				//console.log(v.img_src+'    '+v.text)
			})
			str+="</div></div>"
		})
		//console.log(str)
		$("#lists_con").find(".lists_scroll").html(str)
	}
})(Zepto)