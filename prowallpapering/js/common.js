jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, n, t, a, o) {
      return jQuery.easing[jQuery.easing.def](e, n, t, a, o)
    },
    easeInQuad: function(e, n, t, a, o) {
      return a * (n /= o) * n + t
    },
    easeOutQuad: function(e, n, t, a, o) {
      return -a * (n /= o) * (n - 2) + t
    },
    easeInOutQuad: function(e, n, t, a, o) {
      return (n /= o / 2) < 1 ? a / 2 * n * n + t : -a / 2 * (--n * (n - 2) - 1) + t
    },
    easeInCubic: function(e, n, t, a, o) {
      return a * (n /= o) * n * n + t
    },
    easeOutCubic: function(e, n, t, a, o) {
      return a * ((n = n / o - 1) * n * n + 1) + t
    },
    easeInOutCubic: function(e, n, t, a, o) {
      return (n /= o / 2) < 1 ? a / 2 * n * n * n + t : a / 2 * ((n -= 2) * n * n + 2) + t
    },
    easeInQuart: function(e, n, t, a, o) {
      return a * (n /= o) * n * n * n + t
    },
    easeOutQuart: function(e, n, t, a, o) {
      return -a * ((n = n / o - 1) * n * n * n - 1) + t
    },
    easeInOutQuart: function(e, n, t, a, o) {
      return (n /= o / 2) < 1 ? a / 2 * n * n * n * n + t : -a / 2 * ((n -= 2) * n * n * n - 2) + t
    },
    easeInQuint: function(e, n, t, a, o) {
      return a * (n /= o) * n * n * n * n + t
    },
    easeOutQuint: function(e, n, t, a, o) {
      return a * ((n = n / o - 1) * n * n * n * n + 1) + t
    },
    easeInOutQuint: function(e, n, t, a, o) {
      return (n /= o / 2) < 1 ? a / 2 * n * n * n * n * n + t : a / 2 * ((n -= 2) * n * n * n * n + 2) + t
    },
    easeInSine: function(e, n, t, a, o) {
      return -a * Math.cos(n / o * (Math.PI / 2)) + a + t
    },
    easeOutSine: function(e, n, t, a, o) {
      return a * Math.sin(n / o * (Math.PI / 2)) + t
    },
    easeInOutSine: function(e, n, t, a, o) {
      return -a / 2 * (Math.cos(Math.PI * n / o) - 1) + t
    },
    easeInExpo: function(e, n, t, a, o) {
      return 0 == n ? t : a * Math.pow(2, 10 * (n / o - 1)) + t
    },
    easeOutExpo: function(e, n, t, a, o) {
      return n == o ? t + a : a * (1 - Math.pow(2, -10 * n / o)) + t
    },
    easeInOutExpo: function(e, n, t, a, o) {
      return 0 == n ? t : n == o ? t + a : (n /= o / 2) < 1 ? a / 2 * Math.pow(2, 10 * (n - 1)) + t : a / 2 * (2 - Math.pow(2, -10 * --n)) + t
    },
    easeInCirc: function(e, n, t, a, o) {
      return -a * (Math.sqrt(1 - (n /= o) * n) - 1) + t
    },
    easeOutCirc: function(e, n, t, a, o) {
      return a * Math.sqrt(1 - (n = n / o - 1) * n) + t
    },
    easeInOutCirc: function(e, n, t, a, o) {
      return (n /= o / 2) < 1 ? -a / 2 * (Math.sqrt(1 - n * n) - 1) + t : a / 2 * (Math.sqrt(1 - (n -= 2) * n) + 1) + t
    },
    easeInElastic: function(e, n, t, a, o) {
      var r = 1.70158,
        i = 0,
        u = a;
      if (0 == n) return t;
      if (1 == (n /= o)) return t + a;
      if (i || (i = .3 * o), u < Math.abs(a)) {
        u = a;
        var r = i / 4
      } else var r = i / (2 * Math.PI) * Math.asin(a / u);
      return -u * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * o - r) * (2 * Math.PI) / i) + t
    },
    easeOutElastic: function(e, n, t, a, o) {
      var r = 1.70158,
        i = 0,
        u = a;
      if (0 == n) return t;
      if (1 == (n /= o)) return t + a;
      if (i || (i = .3 * o), u < Math.abs(a)) {
        u = a;
        var r = i / 4
      } else var r = i / (2 * Math.PI) * Math.asin(a / u);
      return u * Math.pow(2, -10 * n) * Math.sin((n * o - r) * (2 * Math.PI) / i) + a + t
    },
    easeInOutElastic: function(e, n, t, a, o) {
      var r = 1.70158,
        i = 0,
        u = a;
      if (0 == n) return t;
      if (2 == (n /= o / 2)) return t + a;
      if (i || (i = o * (.3 * 1.5)), u < Math.abs(a)) {
        u = a;
        var r = i / 4
      } else var r = i / (2 * Math.PI) * Math.asin(a / u);
      return n < 1 ? u * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * o - r) * (2 * Math.PI) / i) * -.5 + t : u * Math.pow(2, -10 * (n -= 1)) * Math.sin((n * o - r) * (2 * Math.PI) / i) * .5 + a + t
    },
    easeInBack: function(e, n, t, a, o, r) {
      return void 0 == r && (r = 1.70158), a * (n /= o) * n * ((r + 1) * n - r) + t
    },
    easeOutBack: function(e, n, t, a, o, r) {
      return void 0 == r && (r = 1.70158), a * ((n = n / o - 1) * n * ((r + 1) * n + r) + 1) + t
    },
    easeInOutBack: function(e, n, t, a, o, r) {
      return void 0 == r && (r = 1.70158), (n /= o / 2) < 1 ? a / 2 * (n * n * ((1 + (r *= 1.525)) * n - r)) + t : a / 2 * ((n -= 2) * n * ((1 + (r *= 1.525)) * n + r) + 2) + t
    },
    easeInBounce: function(e, n, t, a, o) {
      return a - jQuery.easing.easeOutBounce(e, o - n, 0, a, o) + t
    },
    easeOutBounce: function(e, n, t, a, o) {
      return (n /= o) < 1 / 2.75 ? a * (7.5625 * n * n) + t : n < 2 / 2.75 ? a * (7.5625 * (n -= 1.5 / 2.75) * n + .75) + t : n < 2.5 / 2.75 ? a * (7.5625 * (n -= 2.25 / 2.75) * n + .9375) + t : a * (7.5625 * (n -= 2.625 / 2.75) * n + .984375) + t
    },
    easeInOutBounce: function(e, n, t, a, o) {
      return n < o / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * n, 0, a, o) + t : .5 * jQuery.easing.easeOutBounce(e, 2 * n - o, 0, a, o) + .5 * a + t
    }
  }),
  function(e) {
    e.fn.UItoTop = function(n) {
      var t = {
          min: 200,
          inDelay: 600,
          outDelay: 400,
          containerID: "toTop",
          containerHoverID: "toTopHover",
          scrollSpeed: 1e3,
          easingType: "linear"
        },
        a = e.extend(t, n),
        o = "#" + a.containerID,
        r = "#" + a.containerHoverID;
      e("body").append('<a href="#" id="' + a.containerID + '">' + '<i class="fa fa-angle-up"></i>' + '</a>'), e(o).hide().on("click.UItoTop", function() {
        return e("html, body").animate({
          scrollTop: 0
        }, a.scrollSpeed, a.easingType), e("#" + a.containerHoverID, this).stop().animate({
          opacity: 0
        }, a.inDelay, a.easingType), !1
      }).prepend('<span id="' + a.containerHoverID + '"></span>').hover(function() {
        e(r, this).stop().animate({
          opacity: 1
        }, 600, "linear")
      }, function() {
        e(r, this).stop().animate({
          opacity: 0
        }, 700, "linear")
      }), e(window).scroll(function() {
        var n = e(window).scrollTop();
        void 0 === document.body.style.maxHeight && e(o).css({
          position: "absolute",
          top: n + e(window).height() - 50
        }), n > a.min ? e(o).fadeIn(a.inDelay) : e(o).fadeOut(a.Outdelay)
      })
    }
  }(jQuery);

jQuery(document).ready(function() {
  jQuery().UItoTop({
    easingType: "easeOutQuart"
  })
});

jQuery(function(){
   function modalNative() {
       jQuery("body").on("click", "[data-modalnative]", function(e){
           e.preventDefault();
           jQuery(".overlay").addClass("open");
           var modal = $(".modal."+$(this).attr("data-modal-name"));
           modal.find(".error").removeClass("error");
           modal.find(".form-errors").remove();
           modal.addClass("open");
           //$("#"+$(this).attr("data-modal-name")).css("top",$(window).scrollTop()+50+"px").addClass("open");
       });
       jQuery("body").on("click", ".overlay", function(e){
         e.preventDefault();
          jQuery(this).removeClass("open");
           jQuery(".modal.open").removeClass("open");
           /*setTimeout(function() {
               $(".modal-box").attr("style","");
           }, 320);*/
       });
       jQuery("body").on("click", ".modal .close", function(e){
         e.preventDefault();
         jQuery(".overlay").removeClass("open");
           jQuery(".modal.open").removeClass("open");
           /*setTimeout(function() {
               $(".modal").attr("style","");
           }, 320);*/
       });
   }
   modalNative();
 });


 window.onscroll = function() {scrollFunction()};

 function scrollFunction() {
   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
     document.getElementById("navbar").style.padding = "15px 6%";
     document.getElementById("logo").style.height = "50px";
   } else {
     document.getElementById("navbar").style.padding = "30px 6%";
     document.getElementById("logo").style.height = "96px";
   }
};


// instagram
$('.slider').on('init', function(slick){
    $(this).css('display', 'block').animate({
        // opacity: 1
    }, 300);
}).slick({
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<div class="slide-arrow_prev slide-arrow button button_slide">' +
        '<svg width="29" height="46" viewBox="0 0 29 46" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<rect width="5.47315" height="33.435" rx="2.73657" transform="matrix(0.878407 0.477914 -0.711612 0.702573 23.7927 0)" fill="#C4C4C4"/>\n' +
        '<rect width="5.47315" height="33.435" rx="2.73657" transform="matrix(0.878407 -0.477914 -0.711612 -0.702573 23.7927 46)" fill="#C4C4C4"/>\n' +
        '</svg>' +
        '</div>',
    nextArrow: '<div class="slide-arrow_next slide-arrow button button_slide">' +
        '<svg width="29" height="46" viewBox="0 0 29 46" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<rect width="5.47315" height="33.435" rx="2.73657" transform="matrix(-0.878407 0.477914 0.711612 0.702573 4.80762 0)" fill="#C4C4C4"/>\n' +
        '<rect width="5.47315" height="33.435" rx="2.73657" transform="matrix(-0.878407 -0.477914 0.711612 -0.702573 4.80762 46)" fill="#C4C4C4"/>\n' +
        '</svg>' +
        '</div>',
    dots: false,
    swipeToSlide: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3
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



// Fades in the targets given
function fadeIn(targets) {
  gsap.to(targets, { autoAlpha: 1, stagger: 0.1 });
}

// Our observer callback
let observer = new IntersectionObserver(function(entries, self) {
  let targets = entries.map(entry => {
    // If it's intersecting, add it to our list and stop observing it
    if(entry.isIntersecting) {
      self.unobserve(entry.target);
      return entry.target;
    }
  });

  // Call our animation function
  fadeIn(targets);
}, { threshold: 0.5 });

// Attach our observers
document.querySelectorAll('.card').forEach(card => observer.observe(card) );
