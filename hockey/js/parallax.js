function init() {

	// start up after 2sec no matter what
    window.setTimeout(function(){
        start();
    }, 2000);
}

// fade in experience
function start() {

	$('body').removeClass("loading").addClass('loaded');

}
