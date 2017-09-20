var swiper = new Swiper('.swiper-container', {
     pagination: '.swiper-pagination',
     paginationClickable: true,
     nextButton: '.swiper-button-next',
     prevButton: '.swiper-button-prev',
     speed: 1000,
     spaceBetween: 30,
     effect: 'fade',
     autoplay: 2500,
     autoplayDisableOnInteraction: false,
     loop: true
 });
//--------------main-menu
$(document).ready(function(){

    var $menu = $("#menu");

    $(window).scroll(function(){
        if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
            $menu.fadeOut('fast',function(){
                $(this).removeClass("default")
                       .addClass("fixed transbg")
                       .fadeIn('fast');
                       $(".logo-miny").css("display","block");
            });
        } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
            $menu.fadeOut('fast',function(){
                $(this).removeClass("fixed transbg")
                       .addClass("default")
                       .fadeIn('fast');
                        $(".logo-miny").css("display","none");
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
//menu animated
$(function() {
  $( '.dropdown' ).hover(
    function(){
      $(this).children('.sub-menu').slideDown(200);
      $(this).addClass('dropdown-animated');
    },
    function(){
      $(this).children('.sub-menu').slideUp(200);
      $(this).removeClass('dropdown-animated');
    }
  );

  $( '.sub-menu' ).hover(
    function(){
      $(this).addClass('sub-menu-animated');
    },
    function(){
      $(this).removeClass('sub-menu-animated');
    }
  );
});
