$(function() {
	$(".scroll").click(function(e) {
		e.preventDefault();
		$.scrollify("move",$(this).attr("href"));
	});
});

/*-------*/

$.fn.touchScrolling = function(){
    var startPos = 0,
		self = $(this);

    self.bind('touchstart', function(event) {
        var e = event.originalEvent;
        startPos = self.scrollTop() + e.touches[0].pageY;
        e.preventDefault();
    });

    self.bind('touchmove', function(event) {
        var e = event.originalEvent;
        self.scrollTop(startPos - e.touches[0].pageY);
        e.preventDefault();
    });
};

$(function() {
    $('#touch-scroll').touchScrolling();
})
