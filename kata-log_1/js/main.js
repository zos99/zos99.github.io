$(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

  var $ = jQuery.noConflict();
  $(document).ready(function() {
  $().UItoTop({ easingType: 'easeOutQuart' });
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
  $(".online-booking_1").click(function() {
    //открыть модальное окно с id="myModal"
    $("#myModal_1").modal('show');
  });
});
