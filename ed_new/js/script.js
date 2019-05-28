(function($) {
  $(function() {
    $('input.termsCheck, select').styler();
  });
})(jQuery);

$(function() {
  $( '.dropdown' ).hover(
    function(){
      $(this).children('.sub-menu').slideDown(300);
      $(this).addClass('dropdown-animated');
    },
    function(){
      $(this).children('.sub-menu').slideUp(300);
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
