  var $ = jQuery.noConflict();
  $(document).ready(function() {
  $().UItoTop({ easingType: 'easeOutQuart' });
  });

jQuery(function(){
  var $ = jQuery.noConflict();

  var toggles = document.querySelectorAll(".toggle-hamburger");
console.log( toggles);
   for (var i = toggles.length - 1; i >= 0; i--) {
     var toggle = toggles[i];
     toggleHandler(toggle);
   };

   function toggleHandler(toggle) {
     toggle.addEventListener( "click", function(e) {
       e.preventDefault();
       (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
     });
   }
});

jQuery(function(){
    var $ = jQuery.noConflict();
  /* mobile-menu */
  $(".toggle-hamburger").on("click", function(){
    $('.header__menu--mobile').slideToggle();
  });
});
