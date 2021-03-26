window.jQuery = window.$ = jQuery;

	jQuery(window).load(function(){
		"use strict";
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	});


$(window).scroll(function() {
        $(this).scrollTop() > 100 ? ($("header").addClass("sticky"),
        $("header").slideDown("1000"),
        $(".dropdown").css("top", "57px")) : ($("header").removeClass("sticky"),
        $(".dropdown").css("top", "57px"))
    });

    $('.multiple-items').slick({
    infinite: true,
    dots: true,
    dotsClass: "my-dots",
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1
});
