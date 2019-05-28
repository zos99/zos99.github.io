var fixed_menu = true;
window.jQuery = window.$ = jQuery;

//<![CDATA[
	jQuery(window).load(function(){
		"use strict";
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	})
//]]>


/************** Custom Scripts ******************/

function calculateScroll() {
	"use strict";
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.navmenu li.scrollable').find('a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li.scrollable')
			.removeClass('active')
			.eq(i).addClass('active');
			
			jQuery('.mobile_menu_wrapper').css({'display' : 'none'});			
		}
	})
};

//menu logo center
function menu_update() {
	"use strict";
	if (jQuery(window).width() > 767) {
		jQuery('nav.navmenu li a').css({'line-height': jQuery('#logo').height() + 'px'});		
	} else {
		jQuery('nav.navmenu li a').css({'line-height': 'auto'});		
		
	}	
}

//full-width slider
function fullwidthslider() {
	"use strict";
	var full_slider_w = jQuery(window).width();
	var full_slider_min_h = jQuery('.cube_box').innerHeight();
	var full_slider_h = jQuery(window).height(); //full_slider_w*0.52;
		
	jQuery('.full_slider .flexslider, .full_slider .flexslider li').css({'width': full_slider_w, 'height': full_slider_h, 'min-height': full_slider_min_h});	
	jQuery('.full_slider, .full_slider .flexslider li img.slide_bg').attr('style', 'height: '+ full_slider_h+'px', 'min-height: '+ full_slider_min_h+'px');		
	jQuery('.full_slider').css({'min-height': full_slider_min_h + 'px'});
	
};
jQuery(document).ready(function() {
	"use strict";
	
	
	fullwidthslider();
	calculateScroll();
	
	
	//Fixed Menu
	if (jQuery('.fixed-menu').size() && fixed_menu == true) {		
		var fixd_menu = setInterval(scrolled_menu, 10);
	}
		
	
	//MobileMenu
	jQuery('#top header').append('<a href="javascript:void(0)" class="menu_toggler"/>');
	jQuery('#top').append('<div class="mobile_menu_wrapper"><div class="mobile_menu"/></div>');	
	jQuery('.mobile_menu').html(jQuery('#top header').find('.navmenu').html());
	jQuery('.mobile_menu_wrapper').hide();
	jQuery('.menu_toggler').click(function(){
		jQuery('.mobile_menu_wrapper').slideToggle(300);
	});
		
	$(window).scroll(function(event) {
		calculateScroll();
	});
	
	// link scroll
	$('.navmenu ul li.scrollable a, .mobile_menu ul li.scrollable a, .next_section, .mouse, #logo a, #home .nav-item, .go_section').click(function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - jQuery('#logo').height() - 30}, 1000);
		return false;
	});
	
	// contact form
	$("#ajax-contact-form").submit(function() {
		var str = $(this).serialize();		
		$.ajax({
			type: "POST",
			url: "contact_form/contact_process.php",
			data: str,
			success: function(msg) {
				// Message Sent - Show the 'Thank You' message and hide the form
				if(msg == 'OK') {
					var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
					$("#fields").hide();
				} else {
					var result = msg;
				}
				$('#note').html(result);
			}
		});
		return false;
	});
	
	//Iframe transparent
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
		
	// prettyPhoto
	$("a[rel^='prettyPhoto'], .prettyPhoto").prettyPhoto();	
	$(".not_control").prettyPhoto({
		theme: 'pp_default',
		social_tools: '<div class="pp_social" style="display:none;"></div>'
	});
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});
	
	
	jQuery('.full_slider .flexslider li img.slide_bg').each(function(){
		jQuery(this).parent().attr('style', 'background-image:url('+$(this).attr('src')+');');		
	});
	
	jQuery('.flexslider').flexslider({
		animation: "fade",
		slideshow: false,
		controlNav: true,
		directionNav: false,
		slideshowSpeed: 4000,
    	animationSpeed: 1500,
		pauseOnHover: false
    });
	
	menu_update();	
	
	
	// Player
	jQuery("#jquery_jplayer_1").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title:"Cro Magnon - undefined",
				mp3:"audio/music.mp3"												
			});
		},
		play: function() { // To avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js/Jplayer.swf",
		supplied: "mp3",
		wmode: "window",
		smoothPlayBar: true,
		keyEnabled: true
	});
	jQuery("#jquery_jplayer_2").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title:"Cro Magnon - undefined",
				mp3:"audio/music.mp3"												
			});
		},
		play: function() { // To avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js/Jplayer.swf",
		supplied: "mp3",
		cssSelectorAncestor: "#jp_container_2",
		wmode: "window",
		smoothPlayBar: true,
		keyEnabled: true
	});
	jQuery("#jquery_jplayer_3").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title:"Cro Magnon - undefined",
				mp3:"audio/music.mp3"												
			});
		},
		play: function() { // To avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js/Jplayer.swf",
		supplied: "mp3",
		cssSelectorAncestor: "#jp_container_3",
		wmode: "window",
		smoothPlayBar: true,
		keyEnabled: true
	});
	jQuery("#jquery_jplayer_4").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title:"Cro Magnon - undefined",
				mp3:"audio/music.mp3"												
			});
		},
		play: function() { // To avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js/Jplayer.swf",
		supplied: "mp3",
		cssSelectorAncestor: "#jp_container_4",
		wmode: "window",
		smoothPlayBar: true,
		keyEnabled: true
	});
	jQuery("#jquery_jplayer_5").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title:"Cro Magnon - undefined",
				mp3:"audio/music.mp3"												
			});
		},
		play: function() { // To avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js/Jplayer.swf",
		supplied: "mp3",
		cssSelectorAncestor: "#jp_container_5",
		wmode: "window",
		smoothPlayBar: true,
		keyEnabled: true
	});
	jQuery("#jquery_jplayer_6").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title:"Cro Magnon - undefined",
				mp3:"audio/music.mp3"												
			});
		},
		play: function() { // To avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js/Jplayer.swf",
		supplied: "mp3",
		cssSelectorAncestor: "#jp_container_6",
		wmode: "window",
		smoothPlayBar: true,
		keyEnabled: true
	});
});

jQuery(window).load(function(){
	"use strict";
	menu_update();
	fullwidthslider();
});


jQuery(window).resize(function(){
	"use strict";
	menu_update();	
	fullwidthslider();
});

function scrolled_menu() {
	"use strict";
	if (jQuery(window).scrollTop() > (jQuery(window).height() - jQuery('#logo').height() + 47)) {
		jQuery('.fixed-menu').addClass('fixed_show');
	} else {
		jQuery('.fixed-menu').removeClass('fixed_show');
	}
};


//Trigger rotate
// --------------------
var trigged=[],scrollTimeout;
jQuery(function($){	
	
	$('#home .thumb').on('rotate',function(){
		var $this = $(this);
		$this.addClass('active');
		var tout =getRandomInt(3,10)*1000;
		setTimeout(function(){
			$this.removeClass('active');
		},tout)
	});
	var rotateCycle = setInterval(function(){
		var thumbs = $('#home .thumb:not(.active)');
		$(thumbs[getRandomInt(0,thumbs.length)]).trigger('rotate');
	},3000);
	
})

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}