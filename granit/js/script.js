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
/*--------------*/
$(document).ready(function(){
  function parallax(){
      var scrolled = $(window).scrollTop();
      $('.bg').css('top', -(scrolled * (-0.05)) + 'px');
  }
  $(window).scroll(function(e){
  parallax();
  });
});//jQuery
/*--------------*/
$(document).ready(function(){
  function parallax(){
      var scrolled = $(window).scrollTop();
      $('.bg-3').css('top', -(scrolled * (-0.05)) + 'px');
  }
  $(window).scroll(function(e){
  parallax();
  });
});//jQuery
