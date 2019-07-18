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


jQuery(function(){
    var $ = jQuery.noConflict();
///modal
   function modalNative() {
       $("body").on("click", "[data-modalnative]", function(e){
           e.preventDefault();
           $(".overlay").addClass("open");
           var modal = $(".modal."+$(this).attr("data-modal-name"));
           modal.find(".error").removeClass("error");
           modal.find(".form-errors").remove();
           modal.addClass("open");
           //$("#"+$(this).attr("data-modal-name")).css("top",$(window).scrollTop()+50+"px").addClass("open");
       });
       $("body").on("click", ".overlay", function(e){
         e.preventDefault();
           $(this).removeClass("open");
           $(".modal.open").removeClass("open");
           /*setTimeout(function() {
               $(".modal-box").attr("style","");
           }, 320);*/
       });
       $("body").on("click", ".modal .close", function(e){
         e.preventDefault();
         $(".overlay").removeClass("open");
           $(".modal.open").removeClass("open");
           /*setTimeout(function() {
               $(".modal").attr("style","");
           }, 320);*/
       });
   }
   modalNative();
 });

 jQuery(window).load(function() {
     var $ = jQuery.noConflict();
     $("#loading").fadeOut(500);
     $("#loading-center").click(function() {
        $("#loading").fadeOut(500);
     });
 });
