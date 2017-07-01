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
