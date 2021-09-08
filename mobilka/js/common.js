$('.multiple-items').slick({
    infinite: true,
    dots: true,
    dotsClass: "my-dots",
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1
});

// Товары
$('.product-slider').on('init', function(slick){
    $(this).css('display', 'block').animate({
        // opacity: 1
    }, 300);
}).slick({
    centerMode: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<div class="slide-arrow_prev slide-arrow button button_slide">' +
        '<svg width="12" height="24" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M2.21477 13.0736L13.4387 1.84973C13.63 1.6483 13.625 1.33107 13.4286 1.13974C13.2322 0.953419 12.925 0.953419 12.7287 1.13974L1.14729 12.7211C0.950905 12.9175 0.950905 13.2347 1.14729 13.4311L12.7287 25.0125C12.9301 25.2039 13.2473 25.1989 13.4387 25.0025C13.625 24.8061 13.625 24.4989 13.4387 24.3026L2.21477 13.0736Z" fill="black" stroke="black" stroke-width="0.5"/>\n' +
        '</svg>' +
        '</div>',
    nextArrow: '<div class="slide-arrow_next slide-arrow button button_slide">' +
        '<svg width="12" height="24" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M12.3643 13.0736L1.14042 1.84973C0.949089 1.6483 0.954092 1.33107 1.15047 1.13974C1.34685 0.953419 1.65403 0.953419 1.85041 1.13974L13.4318 12.7211C13.6282 12.9175 13.6282 13.2347 13.4318 13.4311L1.85041 25.0125C1.64898 25.2039 1.33175 25.1989 1.14042 25.0025C0.954093 24.8061 0.954093 24.4989 1.14042 24.3026L12.3643 13.0736Z" fill="black" stroke="black" stroke-width="0.5"/>\n' +
        '</svg>' +
        '</div>',
    dots: false,
    swipeToSlide: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 620,
            settings: {
                slidesToShow: 1,
                adaptiveHeight: true
            }
        }
    ]
});