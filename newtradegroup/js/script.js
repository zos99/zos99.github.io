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


var clickCounter = 1;

/* Function for hover on services-box*/
function servicesBoxHover() {
$( '.services-box__image-container').mouseover(function() {
  $(this).css('cursor', 'pointer');
  $(this).find('.services-box__image').css('opacity', '0.2').css('transition', '.25s');
  $(this).find('.services-box__image-text-link').css('color', '#f4b60d');
  $(this).find('.services-box__g-line').css('display', 'block');
  $(this).find('.services-box__v-line').css('display', 'block');

});
$( '.services-box__image-container').mouseout(function() {
    $('.services-box__image').css('opacity', '1');
    $('.services-box__image-text-link').css('color', '#ffffff');
    $(this).find('.services-box__g-line').css('display', 'none');
    $(this).find('.services-box__v-line').css('display', 'none');
  });
}

/* Function for click on accordion panels*/
function clickOnAccordingPanel() {
  // clickCounter++;
  $('.banners-place__box').on('click', function() {
    if (clickCounter % 2 != 0) {
      console.log('Count: ', clickCounter);
      $(this).find('.banners-place__box-title-sign').css('background', '#f6c53d');
      $(this).find('.banners-place__box-title-text').css('background', '#f6c53d');
      $(this).find('.banners-place__box-v-line').css('display', 'none');
      $(this).find('.banners-place__box-text').css('display', 'block');
      clickCounter++;
    } else {
      console.log('Count: ', clickCounter);
      $(this).find('.banners-place__box-title-sign').css('background', '#ffffff');
      $(this).find('.banners-place__box-title-text').css('background', '#ffffff');
      $(this).find('.banners-place__box-v-line').css('display', 'block');
      $('.banners-place__box-text').css('display', 'none');
      clickCounter++;
    }



  });
}

/* JSON ARAY*/





servicesBoxHover();
clickOnAccordingPanel();

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
