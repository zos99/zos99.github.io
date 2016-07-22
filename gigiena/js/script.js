$(function() {

// CAROUSEL

$('.jcarousel')
        .jcarousel({
            // Core configuration goes here
        })
        .jcarouselAutoscroll({
            interval: 4000,
            target: '+=1',
            autostart: true
        });

        $('.jcarousel').jcarousel({
          wrap: 'circular'
        });

        $('.jcarousel').jcarousel({
          easing : 'slow'
        });


         $('.jcarousel-pagination').on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
          })
            .on('jcarouselpagination:inactive', 'a', function() {
              $(this).removeClass('active');
            })
            .jcarouselPagination();

});
