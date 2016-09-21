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
