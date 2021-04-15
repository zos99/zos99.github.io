window.jQuery = window.$ = jQuery;

	jQuery(window).load(function(){
		"use strict";
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	});


    $('.multiple-items').slick({
    infinite: true,
    dots: true,
    dotsClass: "my-dots",
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1
});

$(document).ready(function(){
  // jQuery to collapse the navbar on scroll
  $(window).scroll(function() {
      if ($(".site-header").offset().top > 50) {
          $(".site-header").addClass("site-header--fixed");
      } else {
          $(".site-header").removeClass("site-header--fixed");
      }
  });
});
