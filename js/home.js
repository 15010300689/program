$(function(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px";
	 var banner=new Swiper(".banner.swiper-container",{
	 	pagination: '.pageswitch',
	 	autoplay:'1000',
    autoplayDisableOnInteraction:false,
	 	loop:true
	 });
  $.ajax({
      url:"home.json",
      dataType:"json",
      type:"get",
      async:false,
      success:function(data){
        renderData(data)
      },
      error:function(){
        alert("出错！")
      }
  })
  function renderData(data){
    var html;
    $.each(data,function(k,v){
      var lis="",imgs='';
        $.each(v.logo_img,function(i,e){
         // console.log(i+"  "+e)
           imgs+='<a href="javascript:void(0);" data-tit="'+k+'"><img src="images/'+e+'" alt=""></a>'

        })
        $.each(v.list,function(j,e){
         // console.log(j+"  "+e)
         lis+='<li><a href="javascript:void(0);" data-index="'+k+"_"+j+'" class="home_list">'+e.title+'</a></li>'
        })
         html=$('<section class="list_content">'+
                 ' <h3><i></i>'+v.head+'<a href="catalog.html">更多></a></h3>'+
                  '<ul>'+lis+'</ul>'+
                   '<div class="sublist">'+imgs+'</div>'+
                ' </section>')
          $("#home_content").append(html)
    })

  }
  //导航跳转
 console.log( $(".sublist"))
  $(".sublist").find("a").each(function(i,ele){
      $(this).on("click",function(e){
          e.preventDefault()
          var _id=$(this).data("tit");
          //console.log(_id)
          location.href="detail.html?id="+_id
      })
  })
  //home_content跳转
  $("#home_content").on("click",".home_list",function(e){
       e.preventDefault()
       var _index=$(this).data("index")
       location.href="catalog.html?index="+_index
  })
})