// fixed main-menu top
jQuery(document).ready(function(){
  var $ = jQuery.noConflict();

       var $menu = $(".video-baner");

       $(window).scroll(function(){
           if ( $(this).scrollTop() > 50 && $menu.hasClass("video-baner") ){
               $menu.fadeOut('fast',function(){
                   $(this).removeClass("video-baner")
                          .addClass("fixed ")
                          .fadeIn('fast');

                   $(".logo-img").attr("src","img/ice-hockey-midy.png");
                   $(".nav-scroll").css("font-size","17px");
               });

           } else if($(this).scrollTop() <= 50 && $menu.hasClass("fixed")) {
               $menu.fadeOut('fast',function(){
                   $(this).removeClass("fixed ")
                          .addClass("video-baner")
                          .fadeIn('fast');
                     $(".logo-img").attr("src","img/ice-hockey.png");
                     $(".nav-scroll").css("font-size","18px");
               });
           }
       });//scroll


       $( ".btn-menu-wrapper" ).on( "click", ".btn-menu__innere" , function() {
        $( this ).toggleClass( "btn-menu__innere_closed" );
        console.log("sas");
      });

   });//jQuery
