var $ = jQuery.noConflict();
$(document).ready(function() {
$().UItoTop({ easingType: 'easeOutQuart' });
});



jQuery(window).load(function() {
   var $ = jQuery.noConflict();
   $("#loading").fadeOut(500);
   $("#loading-center").click(function() {
      $("#loading").fadeOut(500);
   });
});


window.onload = function () {

var parallaxBox = document.getElementById ( 'box' );
var c6left = document.getElementById ( 'l6' ).offsetLeft,
c6top = document.getElementById ( 'l6' ).offsetTop;

c7left = document.getElementById ( 'l7' ).offsetLeft,
c7top = document.getElementById ( 'l7' ).offsetTop;



c10left = document.getElementById ( 'l9' ).offsetLeft,
c10top = document.getElementById ( 'l9' ).offsetTop;

parallaxBox.onmousemove = function ( event ) {
  event = event || window.event;
  var x = event.clientX - parallaxBox.offsetLeft,
  y = event.clientY - parallaxBox.offsetTop;

  mouseParallax ( 'l6', c6left, c6top, x, y, 15 );
  mouseParallax ( 'l7', c7left, c7top, x, y, 15 );

  mouseParallax ( 'l9', c9left, c9top, x, y, 15 );
}

}

function mouseParallax ( id, left, top, mouseX, mouseY, speed ) {
var obj = document.getElementById ( id );
var parentObj = obj.parentNode,
containerWidth = parseInt( parentObj.offsetWidth ),
containerHeight = parseInt( parentObj.offsetHeight );
obj.style.left = left - ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + 'px';
obj.style.top = top - ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * speed ) + 'px';
}
