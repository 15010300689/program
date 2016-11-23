;(function($){
	//获取地址栏参数
	var index=getParamerer().index.split("_")

	var json;
	//获取数据
	getJson()
	//更改头部
	changeHead()
	//判断显示更多的盒子是否出现，以及点击事件
	more()
	//渲染展示内容
	renderCon()
	function getJson(){
		$.ajax({
			url:"home.json",
			type:"get",
			dataType:"json",
			async:false,
			success:function(data){
				json=data;
				var arr=data[index[0]].list[index[1]].list_con
				//console.log()
				//渲染页面列表内容
				renderList(arr)
			},
			error:function(){
				alert("出错！")
			}
		})
	}
	//console.log(index[0]+"    "+index[1])
	//渲染页面列表内容
	function renderList(arr){
		var str="";
		for(var i=0;i<arr.length;i++){
			str+='<li><a href="javascript:void(0);">'+arr[i]+'</a></li>'
		}
		$("#catalog_list_ul").html(str)
	}
	//渲染展示内容
	function renderCon(){
		var imgs=json[index[0]].list[index[1]].list_img,str=""
		$.each(imgs,function(i,ele){
			str+='<a href="javascript:void(0);" class="catalog_item">'+
					'<div class="p_img"><img src="'+ele.img_src+'" alt=""></div>'+
						'<div class="p_con">'+
							'<h2>'+ele.alt+'</h2>'+
							'<p>'+ele.site+'</p>'+
							'<div class="catalog_price">'+
								'<strong>￥'+ele.price+'</strong>起<b><em>223</em>家商家在售</b>'+
						    '</div>'+
					    '</div>'+
				 '</a>'
		})
		$("#catalog_detail").html(str)
	}
	//更改头部
	function changeHead(){
		var title=json[index[0]].list[index[1]].title
		$("#head").text(title)
	}
	//判断显示更多的盒子是否出现，以及点击事件
	function more(){
		var flag=false;
		var arr=$("#catalog_list_ul").find("li")
		if($("#catalog_list_ul").find("li").length>6){
			$("#catalog_more").show();
			$("#catalog_more").html("展开全部分类<span>↓</span>")
			$("#catalog_more").on("click",function(){
				flag=!flag
				if(flag){
					$("#catalog_list_ul").find("li").show()
					$("#catalog_more").html("收起分类<span>↑</span>")
				}else{
					$.each(arr,function(i,ele){
						if(i>5){
							$(ele).hide()
						}
					})
					$("#catalog_more").html("展开全部分类<span>↓</span>")
				}
			})
		}else{
			$("#catalog_more").hide()
		}
		$.each(arr,function(i,ele){
			if(i>5){
				$(ele).hide()
			}
		})

	}
})(Zepto)