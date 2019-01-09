// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

$(function() {

	// inizialize bookmark
	var current = window.location.hash ? window.location.hash : '#home';
	$('.nav a[href=' + current + ']').parent().addClass('active');

	// click and go
	$('.nav a').click(function(e){
		e.preventDefault();
		var current = $(this).attr('href');
		$.scrollTo(current, 1000, {
			easing: 'easeInOutCubic',
			onAfter: function(){
				location.hash = current;
			}
		})
	})

	// resize stuff
	$(window).resize(function(){
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh');
		});
		var current = $('.nav li.active a').attr('href');
		$.scrollTo(current, 1000, { easing: 'easeInOutCubic' });
		location.hash = current;
	})

});


// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
