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

/*-------------Responsive video----------------*/
$(function(){
   var vid = document.getElementById('bgvid');
   var pause = $('#info-block button');

   vid.onEnded = function(){
       this.pause();
       this.classList.add('stopfade');
   }

   pause.on('click', function(){
       vid.classList.toggle('stopfade');

       if(vid.paused){
           vid.play();
           $(this).html('Pause');
       }
       else{
           vid.pause();
           $(this).html('Paused');
       }
   });
});
