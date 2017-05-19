// fixed main-menu
$(document).ready(function(){

       var $menu = $("#main-menu");

       $(window).scroll(function(){
           if ( $(this).scrollTop() > 50 && $menu.hasClass("video-baner") ){
               $menu.fadeOut('fast',function(){
                   $(this).removeClass("video-baner")
                          .addClass("fixed transbg")
                          .fadeIn('fast');
                   $(".headen-block").css('height', '0px');
                   $(".headen-block").attr("aria-expanded","false");
                   $(".headen-block").removeClass("in");
                   $(".logo-img").attr("src","img/ice-hockey-midy.png");
               });

           } else if($(this).scrollTop() <= 50 && $menu.hasClass("fixed")) {
               $menu.fadeOut('fast',function(){
                   $(this).removeClass("fixed transbg")
                          .addClass("video-baner")
                          .fadeIn('fast');
                     $(".logo-img").attr("src","img/ice-hockey.png");
               });
           }
       });//scroll

       $menu.hover(
           function(){
               if( $(this).hasClass('fixed') ){
                   $(this).removeClass('transbg');
               }
           },
           function(){
               if( $(this).hasClass('fixed') ){
                   $(this).addClass('transbg');
               }
           });//hover
   });//jQuery
