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
          text: "To Top",
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
      e("body").append('<a href="#" id="' + a.containerID + '">' + a.text + "</a>"), e(o).hide().on("click.UItoTop", function() {
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
var swiper = new Swiper(".swiper-container", {
  pagination: ".swiper-pagination",
  paginationClickable: !0,
  nextButton: ".swiper-button-next",
  prevButton: ".swiper-button-prev",
  parallax: !0,
  speed: 1e3,
  spaceBetween: 30,
  effect: "fade",
  autoplay: 2500,
  autoplayDisableOnInteraction: !1,
  loop: !0
});
jQuery(document).ready(function() {
  jQuery().UItoTop({
    easingType: "easeOutQuart"
  })
}), jQuery(window).load(function() {
  var e = jQuery.noConflict();
  e("#loading").fadeOut(500), e("#loading-center").click(function() {
    e("#loading").fadeOut(500)
  })
});
var swiper = new Swiper(".swiper-container", {
  pagination: ".swiper-pagination",
  paginationClickable: !0,
  nextButton: ".swiper-button-next",
  prevButton: ".swiper-button-prev",
  parallax: !0,
  speed: 1e3,
  spaceBetween: 30,
  effect: "fade",
  autoplay: 2500,
  autoplayDisableOnInteraction: !1,
  loop: !0
});
jQuery(document).ready(function() {
  jQuery().UItoTop({
    easingType: "easeOutQuart"
  })
}), jQuery(function() {
  var e = jQuery.noConflict();
  ! function() {
    e("body").on("click", "[data-modalnative]", function(n) {
      n.preventDefault(), e(".overlay-v").addClass("open");
      var t = e(".modal-v." + e(this).attr("data-modal-name"));
      t.find(".error").removeClass("error"), t.find(".form-errors").remove(), t.addClass("open")
    }), e("body").on("click", ".overlay-v", function(n) {
      n.preventDefault(), e(this).removeClass("open"), e(".modal-v.open").removeClass("open")
    }), e("body").on("click", ".modal-v .close", function(n) {
      n.preventDefault(), e(".overlay-v").removeClass("open"), e(".modal-v.open").removeClass("open")
    })
  }()
}),


//mobile version - go back to main navigation
jQuery('.go-back').on('click', function(event){
  event.preventDefault();
  jQuery('.menu').removeClass('moves-out');
  jQuery('li.active').removeClass('active');
});

//open sub-navigation
jQuery('.cd-subnav-trigger').on('click', function(event){
  event.preventDefault();
  jQuery('.menu').toggleClass('moves-out');
  jQuery(this).parents('li.parent').toggleClass('active');
}),


jQuery(window).load(function() {
  var e = jQuery.noConflict();
  e("#loading").fadeOut(500), e("#loading-center").click(function() {
    e("#loading").fadeOut(500)
  })
});
