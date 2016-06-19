
(function($){
	
	$.fn.carousel=function(options){
		var defaults={
			backgroubdColor:'black',
			time:800
		};
		var settings=$.extend(defaults,options);
		this.css({'background-color':settings.backgroubdColor});
	    $(document).on('click', ".carousel-button-right",function(){ 
		var $carusel = $(this).parents('.carousel');
		right_carusel($carusel);
		return false;
		});
		$(document).on('click',".carousel-button-left",function(){ 
			var $carusel = $(this).parents('.carousel');
			left_carusel($carusel);
			return false;
		});
		function left_carusel($carusel){
		   var block_width = $carusel.find('.carousel-block').outerWidth();
		   $carusel.find(".carousel-items .carousel-block").eq(-1).clone().prependTo($carusel.find(".carousel-items")); 
			   $carusel.find(".carousel-items").css({"left":"-"+block_width+"px"});
			   $carusel.find(".carousel-items .carousel-block").eq(-1).remove();    
			   $carusel.find(".carousel-items").animate({left: "0px"}, settings.time); 
			   
		}
		function right_carusel($carusel){
		   var block_width = $carusel.find('.carousel-block').outerWidth();
		   $carusel.find(".carousel-items").animate({left: "-"+ block_width +"px"}, settings.time, function(){
			   $carusel.find(".carousel-items .carousel-block").eq(0).clone().appendTo($carusel.find(".carousel-items")); 
			   $carusel.find(".carousel-items .carousel-block").eq(0).remove(); 
			   $carusel.find(".carousel-items").css({"left":"0px"}); 
		   }); 
		}
	    return this;
    };
})(jQuery);
    	



