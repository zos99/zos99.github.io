var swiper = new Swiper(".swiper-container", {
    pagination: ".swiper-pagination",
    paginationClickable: !0,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    parallax: !0,
    speed: 1e3,
    spaceBetween: 30,
    effect: "fade",
    autoplay: 2500,
    autoplayDisableOnInteraction: !1,
    loop: !0
  });

  $ = jQuery.noConflict();
jQuery(document).ready(function() {
  jQuery().UItoTop({
    easingType: "easeOutQuart"
  })
});
jQuery(window).load(function() {
  var a = jQuery.noConflict();
  a("#loading").fadeOut(500), a("#loading-center").click(function() {
    a("#loading").fadeOut(500)
  })
});
