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
