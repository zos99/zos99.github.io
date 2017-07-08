var swiper = new Swiper('.swiper-container', {
     pagination: '.swiper-pagination',
     paginationClickable: true,
     nextButton: '.swiper-button-next',
     prevButton: '.swiper-button-prev',
     parallax: true,
     speed: 1000,
     spaceBetween: 30,
     effect: 'fade',
     autoplay: 2500,
     autoplayDisableOnInteraction: false,
     loop: true
 });

 $(function() {
  /* Function for hover on services-box*/
 function servicesBoxHover() {
 $( '.services-box__image-container').mouseover(function() {
   $(this).css('cursor', 'pointer');
   $(this).find('.services-box__image').css('opacity', '0.1').css('transition', '.50s');
   $(this).find('.services-box__v-line').css('display', 'block');

 });
 $( '.services-box__image-container').mouseout(function() {
     $(this).find('.services-box__image').css('opacity', '1');
     $(this).find('.services-box__v-line').css('display', 'none');
   });
 }
servicesBoxHover();
});

$(function() {

// CAROUSEL

$('.jcarousel')
        .jcarousel({
            // Core configuration goes here
        })
        .jcarouselAutoscroll({
            interval: 4000,
            target: '+=1',
            autostart: true
        });

        $('.jcarousel').jcarousel({
          wrap: 'circular'
        });

        $('.jcarousel').jcarousel({
          easing : 'slow'
        });


         $('.jcarousel-pagination').on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
          })
            .on('jcarouselpagination:inactive', 'a', function() {
              $(this).removeClass('active');
            })
            .jcarouselPagination();

});
// ---------box height------------
$(document).ready(function(){
    $('.container').each(function(){
        var highestBox = 0;
        $('.box-height ', this).each(function(){
            if($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });
        $('.box-height ',this).height(highestBox);
    });
});
//-----menu-------------------------//
$(document).ready(function(){

    var $menu = $("#menu");

    $(window).scroll(function(){
        if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
            $menu.fadeOut('fast',function(){
                $(this).removeClass("default")
                       .addClass("fixed transbg")
                       .fadeIn('fast');
                       $(".logo-mini ").css("display","block");
                       $(".first-logo ").css("display","block");


            });
        } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
            $menu.fadeOut('fast',function(){
                $(this).removeClass("fixed transbg")
                       .addClass("default")
                       .fadeIn('fast');
                        $(".logo-mini ").css("display","none");
                        $(".first-logo ").css("display","none");


            });
        }
    });//scroll


});//jQuery
