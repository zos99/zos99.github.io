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

 // ---------height-----------
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
//-----------services-box-----------------
 /* Function for hover on services-box*/
$(function() {
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
//--------masonry--------------
jQuery(document).ready(function($) {
    $('.elements-gride').masonry({
        // options
        itemSelector: '.element-item',
        columnWidth: '.persent-size',
        percentPosition: true
    });
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

//*Скрипт, привязывающий событие click, открывающее модальное окно, к элементам, имеющим класс .btn
$(document).ready(function(){
  //при нажатию на любую кнопку, имеющую класс .btn
  $(".online-booking").click(function() {
    //открыть модальное окно с id="myModal"
    $("#myModal").modal('show');
  });
});
//*Скрипт, привязывающий событие click, открывающее модальное окно, к элементам, имеющим класс .btn
$(document).ready(function(){
  //при нажатию на любую кнопку, имеющую класс .btn
  $(".call-back").click(function() {
    //открыть модальное окно с id="myModal"
    $("#myModal1").modal('show');
  });
});
