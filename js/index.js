$(function(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+"px";
    //轮播
    /* $(".slideBox").slide({
      mainCell:".bd ul",
      effect:"leftLoop",
      autoPlay:true
     });*/
	 var banner=new Swiper(".banner.swiper-container",{
	 	pagination: '.pageswitch',
	 	autoplay:'1000',
    autoplayDisableOnInteraction:false,
	 	loop:true
	 });
     var conitem = new Swiper('.conitem.swiper-container', {
         pagination: '.swiper-pagination',
         slidesPerView:4,
         paginationClickable: true,
         spaceBetween: 10
     });
})