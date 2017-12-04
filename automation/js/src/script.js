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
/*----parallax top-------*/
$(document).ready(function(){
  function parallax(){
      var scrolled = $(window).scrollTop();
      $('.bg-parallax').css('top', -(scrolled * (-0.5)) + 'px');
  }
  $(window).scroll(function(e){
  parallax();
  });
});//jQuery
