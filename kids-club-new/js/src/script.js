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
	var c1left = document.getElementById ( 'l1' ).offsetLeft,
	c1top = document.getElementById ( 'l1' ).offsetTop,
	c2left = document.getElementById ( 'l2' ).offsetLeft,
	c2top = document.getElementById ( 'l2' ).offsetTop,
	c3left = document.getElementById ( 'l3' ).offsetLeft,
	c3top = document.getElementById ( 'l3' ).offsetTop,
	c4left = document.getElementById ( 'l4' ).offsetLeft,
	c4top = document.getElementById ( 'l4' ).offsetTop;
  c5left = document.getElementById ( 'l5' ).offsetLeft,
	c5top = document.getElementById ( 'l5' ).offsetTop;

  c6left = document.getElementById ( 'l6' ).offsetLeft,
	c6top = document.getElementById ( 'l6' ).offsetTop;

  c7left = document.getElementById ( 'l7' ).offsetLeft,
	c7top = document.getElementById ( 'l7' ).offsetTop;

  c8left = document.getElementById ( 'l8' ).offsetLeft,
	c8top = document.getElementById ( 'l8' ).offsetTop;

  c9left = document.getElementById ( 'l9' ).offsetLeft,
	c9top = document.getElementById ( 'l9' ).offsetTop;

  c10left = document.getElementById ( 'l10' ).offsetLeft,
	c10top = document.getElementById ( 'l10' ).offsetTop;


  c11left = document.getElementById ( 'l11' ).offsetLeft,
	c11top = document.getElementById ( 'l11' ).offsetTop;


  c12left = document.getElementById ( 'l12' ).offsetLeft,
	c12top = document.getElementById ( 'l12' ).offsetTop;

	parallaxBox.onmousemove = function ( event ) {
		event = event || window.event;
		var x = event.clientX - parallaxBox.offsetLeft,
		y = event.clientY - parallaxBox.offsetTop;

		mouseParallax ( 'l1', c1left, c1top, x, y, 1 );
		mouseParallax ( 'l2', c2left, c2top, x, y, 25 );
		mouseParallax ( 'l3', c3left, c3top, x, y, 5 );
		mouseParallax ( 'l4', c4left, c4top, x, y, 15 );
    mouseParallax ( 'l5', c5left, c5top, x, y, 15 );
    mouseParallax ( 'l6', c6left, c6top, x, y, 15 );
    mouseParallax ( 'l7', c7left, c7top, x, y, 15 );
    mouseParallax ( 'l8', c8left, c8top, x, y, 15 );
    mouseParallax ( 'l9', c9left, c9top, x, y, 15 );
    mouseParallax ( 'l10', c10left, c10top, x, y, 10 );
    mouseParallax ( 'l11', c11left, c11top, x, y, 15 );
    mouseParallax ( 'l12', c12left, c12top, x, y, 10 );
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
