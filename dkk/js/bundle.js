!(function(e) {
  function t(t) {
    for (
      var n, o, r = t[0], l = t[1], h = t[2], c = 0, d = [];
      c < r.length;
      c++
    )
      (o = r[c]), s[o] && d.push(s[o][0]), (s[o] = 0);
    for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
    for (u && u(t); d.length; ) d.shift()();
    return a.push.apply(a, h || []), i();
  }
  function i() {
    for (var e, t = 0; t < a.length; t++) {
      for (var i = a[t], n = !0, r = 1; r < i.length; r++) {
        var l = i[r];
        0 !== s[l] && (n = !1);
      }
      n && (a.splice(t--, 1), (e = o((o.s = i[0]))));
    }
    return e;
  }
  var n = {},
    s = { 0: 0 },
    a = [];
  function o(t) {
    if (n[t]) return n[t].exports;
    var i = (n[t] = { i: t, l: !1, exports: {} });
    return e[t].call(i.exports, i, i.exports, o), (i.l = !0), i.exports;
  }
  (o.m = e),
    (o.c = n),
    (o.d = function(e, t, i) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (o.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function(e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (o.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var n in e)
          o.d(
            i,
            n,
            function(t) {
              return e[t];
            }.bind(null, n)
          );
      return i;
    }),
    (o.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = "");
  var r = (window.webpackJsonp = window.webpackJsonp || []),
    l = r.push.bind(r);
  (r.push = t), (r = r.slice());
  for (var h = 0; h < r.length; h++) t(r[h]);
  var u = l;
  a.push([45, 1]), i();
})({
  45: function(e, t, i) {
    e.exports = i(77);
  },
  46: function(e, t, i) {},
  77: function(e, t, i) {
    "use strict";
    i.r(t);
    i(46), i(47);
    var n = i(31),
      s = i.n(n),
      a = i(3),
      o = i(16),
      r = i.n(o),
      l = {
        html: document.documentElement,
        body: document.body,
        width: window.innerWidth,
        height: window.innerHeight,
        isWebp: document.body.classList.contains("is-webp"),
        bp: { phone: window.matchMedia("(min-width: 640px)").matches }
      },
      h = i(26),
      u = i.n(h),
      c = function(e, t, i) {
        return e * (1 - i) + t * i;
      },
      d = function(e, t, i) {
        return (e - t) / (i - t);
      };
    var f = function(e, t) {
        for (var i = t.length, n = 0; n < i; n++) e[t[n]] = e[t[n]].bind(e);
      },
      p = i(40),
      g = new (i.n(p)).a();
    function v(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var m = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.tick = this.tick.bind(this)),
          a.a.ticker.addEventListener("tick", this.tick);
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "tick",
            value: function() {
              g.emit(e.events.TICK);
            }
          }
        ]) && v(t.prototype, i),
        n && v(t, n),
        e
      );
    })();
    m.events = { TICK: "TICK" };
    new m();
    var y = m.events,
      b = i(41),
      x = i.n(b);
    function w(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var k = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.onResize = x()(this.onResize.bind(this), 200)),
          window.addEventListener("resize", this.onResize);
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "onResize",
            value: function() {
              g.emit(e.events.RESIZE);
            }
          }
        ]) && w(t.prototype, i),
        n && w(t, n),
        e
      );
    })();
    k.events = { RESIZE: "GlobalResize.events.RESIZE" };
    new k();
    var _ = k.events,
      T = i(27),
      S = i.n(T);
    function P(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var E = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.el = document.querySelector("[data-smooth]")),
          this.setup();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "setup",
            value: function() {
              (this.vs = new S.a({
                el: this.el,
                limitInertia: !1,
                mouseMultiplier: 0.5,
                touchMultiplier: 3,
                firefoxMultiplier: 90,
                keyStep: 0,
                preventTouch: !0
              })),
                this.vs.on(this.onScroll);
            }
          },
          {
            key: "onScroll",
            value: function(t) {
              g.emit(e.events.SCROLL, {
                y:
                  "keydown" === t.originalEvent.type
                    ? 0
                    : Math.round(-1 * t.deltaY)
              });
            }
          }
        ]) && P(t.prototype, i),
        n && P(t, n),
        e
      );
    })();
    E.events = { SCROLL: "ScrollController.events.SCROLL" };
    new E();
    var C = E.events;
    function O(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var L = (function() {
        function e() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            f(this, ["run", "event", "resize"]),
            (a.a.defaultEase = Linear.easeNone),
            (this.el = t.el || l.body);
          var i = t.sections,
            n =
              void 0 === i
                ? this.el.querySelectorAll("[data-smooth-section]")
                : i,
            s = t.elems,
            o = void 0 === s ? this.el.querySelectorAll("[data-from]") : s,
            r = t.threshold,
            h = void 0 === r ? 200 : r,
            u = t.ease,
            c = void 0 === u ? (l.isDevice ? 0.1 : 0.125) : u;
          t.preload;
          (this.dom = { el: this.el, sections: n, elems: o }),
            (this.state = { resizing: !1, rafCancelled: !1, locked: !1 }),
            (this.data = {
              threshold: h,
              ease: c,
              current: 0,
              last: 0,
              target: 0,
              bounding: 0,
              height: 0,
              max: 0,
              phone: window.matchMedia("(max-width: 640px)").matches
            }),
            this.init();
        }
        var t, i, n;
        return (
          (t = e),
          (i = [
            {
              key: "init",
              value: function() {
                this.on();
              }
            },
            {
              key: "on",
              value: function() {
                this.dom.el.classList.add("is-virtual-scroll"),
                  this.setStyles(),
                  this.getCache(),
                  this.getBounding(),
                  this.addListeners(),
                  this.preload();
              }
            },
            {
              key: "setStyles",
              value: function() {
                (this.dom.el.style.position = "fixed"),
                  (this.dom.el.style.top = 0),
                  (this.dom.el.style.left = 0),
                  (this.dom.el.style.width = "100%");
              }
            },
            {
              key: "event",
              value: function(e) {
                var t = e.y;
                (this.data.target += t), this.clamp();
              }
            },
            {
              key: "clamp",
              value: function() {
                this.data.target = Math.round(
                  Math.min(Math.max(this.data.target, 0), this.data.max)
                );
              }
            },
            {
              key: "run",
              value: function() {
                this.state.resizing ||
                  ((this.data.current +=
                    (this.data.target - this.data.current) * this.data.ease),
                  this.transformSections(),
                  this.animateElems(),
                  (this.data.last = this.data.current));
              }
            },
            {
              key: "transformSections",
              value: function() {
                var e = this;
                if (this.sections) {
                  this.data.current;
                  var t = this.data.current.toFixed(2);
                  this.sections.forEach(function(i, n) {
                    var s = "translate3d(0, ".concat(-t, "px, 0)");
                    e.isVisible(i).isVisible || e.state.resizing
                      ? ((i.out = !1), (e.dom.sections[n].style.transform = s))
                      : i.out ||
                        ((i.out = !0), (e.dom.sections[n].style.transform = s));
                  });
                }
              }
            },
            {
              key: "animateElems",
              value: function() {
                var e = this;
                this.elems &&
                  this.elems.forEach(function(t, i) {
                    var n = e.isVisible(t, 0.01),
                      s = n.isVisible,
                      a = n.start,
                      o = n.end;
                    s &&
                      (e.intersectRatio(t, a, o),
                      t.tl.progress(t.progress.current));
                  });
              }
            },
            {
              key: "intersectRatio",
              value: function(e, t, i) {
                var n = t - this.data.height,
                  s = (this.data.height + i + e.height) * e.duration;
                (e.progress.current = Math.abs(n / s)),
                  (e.progress.current = Math.max(
                    0,
                    Math.min(1, e.progress.current)
                  ));
              }
            },
            {
              key: "isVisible",
              value: function(e, t) {
                var i = this.data.current,
                  n = t || this.data.threshold,
                  s = e.top - i,
                  a = e.bottom - i,
                  o = s < n + this.data.height && a > -n;
                return { isVisible: o, start: s, end: a };
              }
            },
            {
              key: "cancelAnimationFrame",
              value: (function(e) {
                function t() {
                  return e.apply(this, arguments);
                }
                return (
                  (t.toString = function() {
                    return e.toString();
                  }),
                  t
                );
              })(function() {
                cancelAnimationFrame(this.raf);
              })
            },
            {
              key: "getCache",
              value: function() {
                this.getSections(), this.getElems();
              }
            },
            {
              key: "getSections",
              value: function() {
                var e = this;
                this.dom.sections &&
                  ((this.sections = []),
                  this.dom.sections.forEach(function(t) {
                    t.style.transform = "";
                    var i = t.getBoundingClientRect();
                    e.sections.push({ top: i.top, bottom: i.bottom, out: !0 });
                  }));
              }
            },
            {
              key: "getElems",
              value: function() {
                var e = this;
                this.dom.elems &&
                  ((this.elems = []),
                  this.dom.elems.forEach(function(t) {
                    if (void 0 !== t.dataset.animateMobile || !e.data.phone) {
                      var i = t.getBoundingClientRect(),
                        n = new TimelineLite({ paused: !0 }),
                        s = JSON.parse(t.dataset.from),
                        a = JSON.parse(t.dataset.to);
                      n.fromTo(t, 1, s, a), n.progress(1);
                      var o = t.getBoundingClientRect();
                      n.progress(0),
                        e.elems.push({
                          el: t,
                          tl: n,
                          top: i.top > e.data.height ? i.top : e.data.height,
                          bottom: o.bottom,
                          height: o.bottom - i.top,
                          duration: t.dataset.duration ? t.dataset.duration : 1,
                          progress: { current: 0 }
                        });
                    }
                  }),
                  console.log('11')
                );
              }
            },
            {
              key: "getBounding",
              value: function() {
                var e = this.dom.el.getBoundingClientRect();
                (this.data.height = window.innerHeight),
                  (this.data.bounding = e),
                  (this.data.max = e.height - this.data.height);
              }
            },
            {
              key: "preload",
              value: function() {
                var e = this;
                u()(this.dom.el, function(t) {
                  e.resize();
                });
              }
            },
            {
              key: "resize",
              value: function() {
                (this.state.resizing = !0),
                  (this.data.phone = window.matchMedia(
                    "(max-width: 640px)"
                  ).matches),
                  this.getCache(),
                  this.transformSections(),
                  this.getBounding(),
                  (this.state.resizing = !1);
              }
            },
            {
              key: "addListeners",
              value: function() {
                g.on(y.TICK, this.run),
                  g.on(C.SCROLL, this.event),
                  g.on(_.RESIZE, this.resize);
              }
            }
          ]) && O(t.prototype, i),
          n && O(t, n),
          e
        );
      })(),
      j = i(78),
      A = i(79),
      M = i(80),
      z = i(81),
      N = i(82),
      I = i(0),
      F = i(32),
      B = i(42),
      q = i(33),
      D = i(23),
      R = i.n(D);
    i(57);
    function V(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var U = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          f(this, ["getPos", "mouseMove", "mouseDown", "mouseUp"]),
          this.addListeners();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "addListeners",
            value: function() {
              window.addEventListener("pointermove", this.mouseMove),
                window.addEventListener("pointerdown", this.mouseDown),
                window.addEventListener("pointerup", this.mouseUp);
            }
          },
          {
            key: "getPos",
            value: function(e) {
              return { x: e.clientX, y: e.clientY, target: e.target };
            }
          },
          {
            key: "mouseMove",
            value: function(t) {
              var i = this.getPos(t),
                n = i.x,
                s = i.y,
                a = i.target;
              g.emit(e.events.MOVE, { x: n, y: s, target: a });
            }
          },
          {
            key: "mouseDown",
            value: function(t) {
              var i = this.getPos(t),
                n = i.x,
                s = i.y,
                a = i.target;
              g.emit(e.events.DOWN, { x: n, y: s, target: a });
            }
          },
          {
            key: "mouseUp",
            value: function(t) {
              var i = this.getPos(t).target;
              g.emit(e.events.UP, { target: i });
            }
          }
        ]) && V(t.prototype, i),
        n && V(t, n),
        e
      );
    })();
    U.events = {
      MOVE: "GlobalMouse.events.MOVE",
      DOWN: "GlobalMouse.events.DOWN",
      UP: "GlobalMouse.events.UP"
    };
    new U();
    var W = U.events,
      H = "\n".concat(
        "\nvec4 when_eq(vec4 x, vec4 y) {\n  return 1.0 - abs(sign(x - y));\n}\n\nvec4 when_neq(vec4 x, vec4 y) {\n  return abs(sign(x - y));\n}\n\nvec4 when_gt(vec4 x, vec4 y) {\n  return max(sign(x - y), 0.0);\n}\n\nvec4 when_lt(vec4 x, vec4 y) {\n  return max(sign(y - x), 0.0);\n}\n\nvec4 when_ge(vec4 x, vec4 y) {\n  return 1.0 - when_lt(x, y);\n}\n\nvec4 when_le(vec4 x, vec4 y) {\n  return 1.0 - when_gt(x, y);\n}\n\nvec4 and(vec4 a, vec4 b) {\n  return a * b;\n}\n\nvec4 or(vec4 a, vec4 b) {\n  return min(a + b, 1.0);\n}\n\nvec4 xor(vec4 a, vec4 b) {\n  return mod((a + b), 2.0);\n}\n\nvec4 not(vec4 a) {\n  return 1.0 - a;\n}\n",
        "\n\nvec2 fixUV(vec2 uv) {\n\n  vec2 fixedUV = uv;\n\n  fixedUV -= when_lt(vec4(uv.y), vec4(0.)).x * uv.y;\n  fixedUV += when_gt(vec4(uv.y), vec4(1.)).x * uv.y;\n\n  return fixedUV;\n}\n\nuniform float scroll;\nuniform float dispFactor;\nuniform float intensity;\nuniform float direction;\n\nuniform sampler2D textureBackCurrent;\nuniform sampler2D textureBackNext;\nuniform sampler2D textureFrontCurrent;\nuniform sampler2D textureFrontNext;\nuniform sampler2D textureLogo;\nuniform sampler2D disp;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n  vec4 outputColor = vec4(1.0);\n\n  vec2 backUV = vUv;\n  backUV.y += scroll * 0.25;\n\n  vec4 _textureBackCurrent = texture2D(textureBackCurrent, backUV);\n  vec4 _textureBackNext = texture2D(textureBackNext, backUV);\n\n  vec2 frontUV = vUv;\n  frontUV.y += scroll * 0.15;\n\n  vec4 _textureFrontCurrent = texture2D(textureFrontCurrent, frontUV);\n  vec4 _textureFrontNext = texture2D(textureFrontNext, frontUV);\n\n  vec4 logoColor = texture2D(textureLogo, backUV);\n  logoColor.rgb = vec3(1.0);\n\n  // read the animation texture\n  vec4 dispTexture = texture2D(disp, vUv);\n  dispTexture.rgb = direction == 0.0 ? (1.0 - dispTexture.rgb) : dispTexture.rgb;\n\n  float r = dispFactor * (1.0 + intensity * 2.0) - intensity;\n  float mixFactor = clamp((dispTexture.r - r) * (1.0 / intensity), 0.0, 1.0);\n\n  // mix front and back color depending on dispTexture progress\n  vec4 frontColor = mix(_textureFrontNext, _textureFrontCurrent, mixFactor);\n  vec4 backColor = mix(_textureBackNext, _textureBackCurrent, mixFactor);\n\n  // render backColor\n  // when frontColor is actually existing (alpha > 0) render frontColor\n  outputColor = backColor * when_le(vec4(frontColor.a), vec4(0.9)).x\n              + frontColor * when_gt(vec4(frontColor.a), vec4(0.9)).x;\n\n  backColor = mix(backColor, logoColor, logoColor.a);\n  outputColor = mix(backColor, frontColor, frontColor.a);\n\n  gl_FragColor = outputColor;\n}\n"
      );
    function G(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var K = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          f(this, [
            "setPos",
            "on",
            "off",
            "render",
            "handleObserver",
            "getScroll",
            "onResize"
          ]),
          (this.el = document.querySelector(".js-hero__canvas")),
          (this.images = {
            back: [
              "images-tmpl/"
                .concat(l.bp.phone ? "desktop" : "mobile", "/night-back.")
                .concat(r.a ? "webp" : "jpg"),
              "images-tmpl/"
                .concat(l.bp.phone ? "desktop" : "mobile", "/sunrise-back.")
                .concat(r.a ? "webp" : "jpg"),
              "images-tmpl/"
                .concat(l.bp.phone ? "desktop" : "mobile", "/day-back.")
                .concat(r.a ? "webp" : "jpg")
            ],
            front: [
              "images-tmpl/"
                .concat(l.bp.phone ? "desktop" : "mobile", "/night-front.")
                .concat(r.a ? "webp" : "png"),
              "images-tmpl/"
                .concat(l.bp.phone ? "desktop" : "mobile", "/sunrise-front.")
                .concat(r.a ? "webp" : "png"),
              "images-tmpl/"
                .concat(l.bp.phone ? "desktop" : "mobile", "/day-front.")
                .concat(r.a ? "webp" : "png")
            ]
          }),
          (this.data = {
            scroll: { ease: l.isDevice ? 0.1 : 0.125, current: 0, target: 0 },
            slide: {
              total: 2,
              current: this.timeBased(),
              next: 2 === this.timeBased() ? 0 : this.timeBased() + 1
            },
            progress: {
              ease: 0.1,
              on: 0,
              off: 0,
              last: 0,
              current: 0,
              bounding: 0.2 * window.innerWidth
            }
          }),
          (this.state = {
            dragging: !1,
            animating: !1,
            visible: !1,
            flipped: !1,
            direction: { prev: !1, next: !1 }
          }),
          (this.size = {
            width: this.el.offsetWidth,
            height: this.el.offsetHeight
          }),
          (this.observer = new IntersectionObserver(this.handleObserver, {
            root: null,
            rootMargin: "0px 0px 0px 0px",
            threshold: [0, 0]
          })),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "timeBased",
            value: function() {
              var e = new Date().getHours();
              return e >= 18 || e <= 4 ? 0 : e >= 9 || e < 18 ? 1 : 2;
            }
          },
          {
            key: "cameraSetup",
            value: function() {
              (this.camera = new j.a(
                this.size.width / -2,
                this.size.width / 2,
                this.size.height / 2,
                this.size.height / -2,
                1,
                1e3
              )),
                this.camera.lookAt(this.scene.position),
                (this.camera.position.z = 1);
            }
          },
          {
            key: "setup",
            value: function() {
              (this.scene = new A.a()),
                (this.clock = new M.a(!0)),
                (this.renderer = new z.a({ alpha: !0 })),
                this.renderer.setPixelRatio(window.devicePixelRatio),
                this.renderer.setSize(this.size.width, this.size.height),
                this.el.appendChild(this.renderer.domElement);
            }
          },
          {
            key: "loadTextures",
            value: function() {
              var e = this,
                t = new N.a();
              (t.crossOrigin = ""),
                (this.textures = {}),
                (this.textures.back = []),
                (this.textures.front = []),
                this.images.back.forEach(function(i) {
                  var n = t.load(i, e.render);
                  (n.minFilter = I.M), e.textures.back.push(n);
                }),
                this.images.front.forEach(function(i) {
                  var n = t.load(i, e.render);
                  (n.minFilter = I.M), e.textures.front.push(n);
                }),
                (this.textures.logo = t.load(this.images.logo, this.render)),
                (this.textures.logo.minFilter = I.M),
                (this.textures.disp = t.load(
                  "images/disp-hero.jpg",
                  this.render
                )),
                (this.textures.disp.wrapS = this.textures.disp.wrapT = I.k);
            }
          },
          {
            key: "createMesh",
            value: function() {
              (this.mat = new F.a({
                uniforms: {
                  scroll: { type: "f", value: 0 },
                  dispFactor: { type: "f", value: 0 },
                  intensity: { type: "f", value: 0.1 },
                  direction: { type: "f", value: 0 },
                  textureBackCurrent: {
                    type: "t",
                    value: this.textures.back[this.data.slide.current]
                  },
                  textureBackNext: {
                    type: "t",
                    value: this.textures.back[this.data.slide.next]
                  },
                  textureFrontCurrent: {
                    type: "t",
                    value: this.textures.front[this.data.slide.current]
                  },
                  textureFrontNext: {
                    type: "t",
                    value: this.textures.front[this.data.slide.next]
                  },
                  textureLogo: { type: "t", value: this.textures.logo },
                  disp: { type: "t", value: this.textures.disp }
                },
                transparent: !0,
                vertexShader:
                  "\nvarying vec2 vUv;\nvoid main() {\n  vUv = vec2(uv.x, uv.y);\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",
                fragmentShader: H
              })),
                (this.mat.blending = I.s),
                (this.mat.blendSrc = I.ib),
                (this.mat.blendDst = I.lb);
              var e = new B.a(1, 1, 1);
              (this.mesh = new q.a(e, this.mat)),
                this.mesh.scale.set(this.size.width, this.size.height, 1),
                this.scene.add(this.mesh);
            }
          },
          {
            key: "getScroll",
            value: function(e) {
              var t = e.y;
              (this.data.scroll.target += t),
                (this.data.scroll.target = Math.round(
                  Math.min(
                    Math.max(this.data.scroll.target, 0),
                    this.size.height
                  )
                ));
            }
          },
          {
            key: "setPos",
            value: function(e) {
              var t = e.x;
              this.state.dragging &&
                ((this.data.progress.current =
                  this.data.progress.off + 0.75 * (t - this.data.progress.on)),
                (this.data.progress.current = R()(
                  this.data.progress.current,
                  -this.data.progress.bounding,
                  this.data.progress.bounding
                )),
                (this.data.progress.current = d(
                  this.data.progress.current,
                  0,
                  this.data.progress.bounding
                )));
            }
          },
          {
            key: "reset",
            value: function() {
              (this.data.progress.off = Math.round(this.data.progress.current)),
                (this.data.progress.last = this.data.progress.current = 0),
                (this.mat.uniforms.dispFactor.value = 0);
            }
          },
          {
            key: "on",
            value: function(e) {
              var t = e.x,
                i = e.target;
              !this.state.animating &&
                this.el.contains(i) &&
                ((this.state.dragging = !0),
                (this.data.progress.on = t),
                this.el.classList.add("is-grabbing"),
                l.body.classList.add("is-hero-grabbing"));
            }
          },
          {
            key: "off",
            value: function(e) {
              var t = this;
              e.target;
              this.state.dragging &&
                ((this.state.dragging = !1),
                (this.state.animating = !0),
                this.playTimeline(),
                a.a.to(this.mat.uniforms.dispFactor, 2, {
                  value: 1,
                  ease: Power2.easeOut,
                  onComplete: function() {
                    t.reset(), t.changeCurrent(), (t.state.animating = !1);
                  }
                }),
                this.el.classList.remove("is-grabbing"),
                l.body.classList.remove("is-hero-grabbing"));
            }
          },
          {
            key: "addListeners",
            value: function() {
              g.on(y.TICK, this.render),
                g.on(C.SCROLL, this.getScroll),
                g.on(W.MOVE, this.setPos),
                g.on(W.DOWN, this.on),
                g.on(W.UP, this.off),
                g.on(_.RESIZE, this.onResize);
            }
          },
          {
            key: "handleObserver",
            value: function(e) {
              var t = this;
              e.forEach(function(e) {
                e.isIntersecting
                  ? (t.state.visible = !0)
                  : (t.state.visible = !1);
              });
            }
          },
          {
            key: "observe",
            value: function() {
              this.observer.observe(this.el);
            }
          },
          {
            key: "changeCurrent",
            value: function() {
              (this.data.slide.current = this.data.slide.next),
                (this.mat.uniforms.textureBackCurrent.value = this.textures.back[
                  this.data.slide.current
                ]),
                (this.mat.uniforms.textureFrontCurrent.value = this.textures.front[
                  this.data.slide.current
                ]),
                (this.mat.uniforms.textureBackNext.value = this.mat.uniforms.textureFrontNext.value = null),
                (this.state.flipped = this.state.direction.prev = this.state.direction.next = !1);
            }
          },
          {
            key: "changeNext",
            value: function() {
              (this.data.progress.last < 0 && this.state.direction.prev) ||
                (this.data.progress.last >= 0 && this.state.direction.next) ||
                ((this.state.flipped = this.data.progress.last < 0),
                this.state.flipped
                  ? ((this.state.direction.next = !1),
                    (this.state.direction.prev = !0),
                    (this.data.slide.next =
                      this.data.slide.current === this.data.slide.total
                        ? 0
                        : this.data.slide.current + 1))
                  : ((this.state.direction.next = !0),
                    (this.state.direction.prev = !1),
                    (this.data.slide.next =
                      0 === this.data.slide.current
                        ? this.data.slide.total
                        : this.data.slide.current - 1)),
                (this.mat.uniforms.textureBackNext.value = this.textures.back[
                  this.data.slide.next
                ]),
                (this.mat.uniforms.textureFrontNext.value = this.textures.front[
                  this.data.slide.next
                ]),
                (this.mat.uniformsNeedUpdate = !0));
            }
          },
          {
            key: "onResize",
            value: function() {
              (this.size = {
                width: this.el.offsetWidth,
                height: this.el.offsetHeight
              }),
                this.mesh.scale.set(this.size.width, this.size.height, 1),
                (this.camera.left = -this.size.width / 2),
                (this.camera.right = this.size.width / 2),
                (this.camera.top = this.size.height / 2),
                (this.camera.bottom = -this.size.height / 2),
                this.camera.updateProjectionMatrix(),
                this.renderer.setSize(this.size.width, this.size.height);
            }
          },
          {
            key: "render",
            value: function() {
              this.state.visible &&
                (this.renderer.render(this.scene, this.camera),
                (this.data.scroll.current +=
                  (this.data.scroll.target - this.data.scroll.current) *
                  this.data.scroll.ease),
                (this.mat.uniforms.scroll.value = d(
                  this.data.scroll.current,
                  0,
                  this.size.height
                )),
                this.state.dragging &&
                  ((this.data.progress.last = c(
                    this.data.progress.last,
                    this.data.progress.current,
                    0.075
                  )),
                  (this.mat.uniforms.dispFactor.value = Math.abs(
                    this.data.progress.last
                  )),
                  (this.mat.uniforms.direction.value =
                    this.data.progress.last > 0 ? 1 : 0),
                  this.changeNext()));
            }
          },
          {
            key: "iconTimelines",
            value: function() {
              (this.tl = {}),
                (this.tl.nightToSunrise = new TimelineLite({ paused: !0 })),
                (this.tl.sunriseToDay = new TimelineLite({ paused: !0 })),
                (this.tl.dayToNight = new TimelineLite({ paused: !0 })),
                (this.tl.dayToSunrise = new TimelineLite({ paused: !0 })),
                (this.tl.sunriseToNight = new TimelineLite({ paused: !0 })),
                (this.tl.nightToDay = new TimelineLite({ paused: !0 }));
              var e = this.toggler.querySelector(".js-hero-toggle__inner"),
                t = this.toggler.querySelector(".js-hero-toggle__sun"),
                i = this.toggler.querySelector(".js-hero-toggle__mountain"),
                n = this.toggler.querySelector(".js-hero-toggle__moon");
              a.a.set(n, { autoAlpha: 0 }),
                this.tl.nightToSunrise
                  .set(n, { autoAlpha: 1 })
                  .fromTo(
                    n,
                    1,
                    { yPercent: -50 },
                    { yPercent: -220, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    t,
                    1,
                    { yPercent: 150 },
                    { yPercent: 0, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    e,
                    1,
                    { backgroundColor: "#4db5bf" },
                    { backgroundColor: "#ca720a", ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    i,
                    1,
                    { backgroundColor: "#000" },
                    { backgroundColor: "#1c1713", ease: Power2.easeOut },
                    0
                  ),
                this.tl.sunriseToDay
                  .fromTo(
                    t,
                    1,
                    { yPercent: 0 },
                    { yPercent: -50, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    e,
                    1,
                    { backgroundColor: "#ca720a" },
                    { backgroundColor: "#4db5bf", ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    i,
                    1,
                    { backgroundColor: "#1c1713" },
                    { backgroundColor: "#fff", ease: Power2.easeOut },
                    0
                  ),
                this.tl.dayToNight
                  .fromTo(
                    t,
                    1,
                    { yPercent: -50 },
                    { yPercent: -220, ease: Power2.easeOut },
                    0
                  )
                  .set(n, { autoAlpha: 1 }, 0)
                  .fromTo(
                    n,
                    1,
                    { yPercent: 150 },
                    { yPercent: -50, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    e,
                    1,
                    { backgroundColor: "#4db5bf" },
                    { backgroundColor: "#003366", ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    i,
                    1,
                    { backgroundColor: "#fff" },
                    { backgroundColor: "#000", ease: Power2.easeOut },
                    0
                  ),
                this.tl.dayToSunrise
                  .fromTo(
                    t,
                    1,
                    { yPercent: -50 },
                    { yPercent: 0, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    e,
                    1,
                    { backgroundColor: "#4db5bf" },
                    { backgroundColor: "#ca720a", ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    i,
                    1,
                    { backgroundColor: "#fff" },
                    { backgroundColor: "#1c1713", ease: Power2.easeOut },
                    0
                  ),
                this.tl.sunriseToNight
                  .set(n, { autoAlpha: 1 })
                  .fromTo(
                    n,
                    1,
                    { yPercent: -220 },
                    { yPercent: -50, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    t,
                    1,
                    { yPercent: 0 },
                    { yPercent: 150, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    e,
                    1,
                    { backgroundColor: "#4db5bf" },
                    { backgroundColor: "#003366", ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    i,
                    1,
                    { backgroundColor: "#000" },
                    { backgroundColor: "#000", ease: Power2.easeOut },
                    0
                  ),
                this.tl.nightToDay
                  .fromTo(
                    t,
                    1,
                    { yPercent: -220 },
                    { yPercent: -50, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    n,
                    1,
                    { yPercent: -50 },
                    { yPercent: 150, ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    e,
                    1,
                    { backgroundColor: "#003366" },
                    { backgroundColor: "#4db5bf", ease: Power2.easeOut },
                    0
                  )
                  .fromTo(
                    i,
                    1,
                    { backgroundColor: "#000" },
                    { backgroundColor: "#fff", ease: Power2.easeOut },
                    0
                  );
            }
          },
          {
            key: "toggle_setup",
            value: function() {
              f(this, [
                "toggle_onPress",
                "toggle_onRelease",
                "toggle_onEnter",
                "toggle_onLeave",
                "toggle_draw"
              ]),
                (this.toggler = document.querySelector(".js-hero-toggle")),
                (this.toggle = {
                  angle: { start: -0.5, end: -0.5 },
                  tl: null,
                  animating: !1
                }),
                this.toggle_createCanvas(),
                this.toggle_addListeners(),
                this.toggle_setBounds(),
                this.toggle_draw();
            }
          },
          {
            key: "toggle_createCanvas",
            value: function() {
              (this.toggle.canvas = document.createElement("canvas")),
                this.toggler.appendChild(this.toggle.canvas),
                (this.toggle.ctx = this.toggle.canvas.getContext("2d"));
            }
          },
          {
            key: "toggle_setBounds",
            value: function() {
              var e = this.toggler.getBoundingClientRect(),
                t = this.toggle.canvas;
              (t.style.height = "".concat(e.height, "px")),
                (t.style.width = "".concat(e.width, "px")),
                (t.height = 2 * e.height),
                (t.width = 2 * e.width),
                (this.toggle.size = {
                  x: t.width / 2,
                  y: t.height / 2,
                  radius: t.height / 2
                });
            }
          },
          {
            key: "toggle_draw",
            value: function() {
              var e = this.toggle.size,
                t = e.x,
                i = e.y,
                n = e.radius,
                s = this.toggle.angle,
                a = s.start,
                o = s.end,
                r = this.toggle.ctx;
              r.clearRect(
                0,
                0,
                this.toggle.canvas.width,
                this.toggle.canvas.height
              ),
                r.beginPath(),
                r.arc(t, i, n - 6, 0, 2 * Math.PI),
                (r.lineWidth = 3),
                (r.strokeStyle = "rgba(255, 255, 255, 0.25)"),
                r.stroke(),
                r.beginPath(),
                r.arc(t, i, n - 6, a * Math.PI, o * Math.PI),
                (r.lineWidth = 3),
                (r.strokeStyle = "#ffffff"),
                r.stroke();
            }
          },
          {
            key: "toggle_onEnter",
            value: function() {
              l.isDesktop &&
                a.a.to(this.toggler, 1, { scale: 1.1, ease: Expo.easeOut });
            }
          },
          {
            key: "toggle_onLeave",
            value: function() {
              l.isDesktop &&
                a.a.to(this.toggler, 1, { scale: 1, ease: Expo.easeOut });
            }
          },
          {
            key: "toggle_onPress",
            value: function(e) {
              var t = this,
                i = e.target;
              !this.state.animating &&
                this.toggler.contains(i) &&
                (this.toggle_onLeave(),
                (this.toggle.animating = !0),
                (this.state.direction.next = !0),
                (this.state.direction.prev = !1),
                (this.data.slide.next =
                  this.data.slide.current === this.data.slide.total
                    ? 0
                    : this.data.slide.current + 1),
                (this.mat.uniforms.textureBackNext.value = this.textures.back[
                  this.data.slide.next
                ]),
                (this.mat.uniforms.textureFrontNext.value = this.textures.front[
                  this.data.slide.next
                ]),
                (this.mat.uniformsNeedUpdate = !0),
                (this.toggle.tl = new TimelineMax({
                  paused: !0,
                  onComplete: function() {
                    (t.toggle.complete = !1),
                      (t.toggle.angle = { end: -0.5, start: -0.5 }),
                      t.toggle.tl.kill();
                  }
                })),
                this.toggle.tl
                  .to(
                    this.toggle.angle,
                    2.25,
                    {
                      end: 3.5,
                      start: 1.5,
                      onUpdate: this.toggle_draw,
                      ease: Power3.easeInOut
                    },
                    0
                  )
                  .to(
                    this.mat.uniforms.dispFactor,
                    2.25,
                    { value: 1, ease: Power3.easeInOut },
                    0
                  )
                  .addCallback(function() {
                    t.reset(),
                      t.playTimeline(),
                      t.changeCurrent(),
                      (t.toggle.animating = !1),
                      (t.state.animating = !1);
                  })
                  .to(this.toggle.angle, 1, {
                    end: 3.5,
                    start: 3.5,
                    onUpdate: this.toggle_draw,
                    ease: Power3.easeInOut
                  }),
                this.toggle.tl.play());
            }
          },
          {
            key: "toggle_onRelease",
            value: function(e) {
              var t = this;
              e.target;
              this.toggle.animating &&
                (this.toggle.tl && this.toggle.tl.kill(),
                this.changeNext(),
                (this.toggle.animating = !1),
                a.a.to(this.toggle.angle, 1.75, {
                  end: -0.5,
                  start: -0.5,
                  onUpdate: this.toggle_draw,
                  ease: Power3.easeOut
                }),
                a.a.to(this.mat.uniforms.dispFactor, 1.75, {
                  value: 0,
                  ease: Power2.easeOut,
                  onComplete: function() {
                    t.state.animating = !1;
                  }
                }));
            }
          },
          {
            key: "toggle_addListeners",
            value: function() {
              g.on(W.DOWN, this.toggle_onPress),
                g.on(W.UP, this.toggle_onRelease),
                this.toggler.addEventListener(
                  "mouseenter",
                  this.toggle_onEnter
                ),
                this.toggler.addEventListener(
                  "mouseleave",
                  this.toggle_onLeave
                );
            }
          },
          {
            key: "playTimeline",
            value: function() {
              2 === this.data.slide.current && 0 === this.data.slide.next
                ? this.tl.dayToNight.restart()
                : 1 === this.data.slide.current && 2 === this.data.slide.next
                  ? this.tl.sunriseToDay.restart()
                  : 0 === this.data.slide.current && 1 === this.data.slide.next
                    ? this.tl.nightToSunrise.restart()
                    : 2 === this.data.slide.current &&
                      1 === this.data.slide.next
                      ? this.tl.dayToSunrise.restart()
                      : 1 === this.data.slide.current &&
                        0 === this.data.slide.next
                        ? this.tl.sunriseToNight.restart()
                        : 0 === this.data.slide.current &&
                          2 === this.data.slide.next &&
                          this.tl.nightToDay.restart();
            }
          },
          {
            key: "setTimeline",
            value: function() {
              1 === this.data.slide.current
                ? this.tl.nightToSunrise.progress(1)
                : 2 === this.data.slide.current
                  ? this.tl.sunriseToDay.progress(1)
                  : 0 === this.data.slide.current &&
                    this.tl.dayToNight.progress(1);
            }
          },
          {
            key: "init",
            value: function() {
              this.setup(),
                this.cameraSetup(),
                this.loadTextures(),
                this.createMesh(),
                this.observe(),
                this.addListeners(),
                this.toggle_setup(),
                this.iconTimelines(),
                this.setTimeline();
            }
          }
        ]) && G(t.prototype, i),
        n && G(t, n),
        e
      );
    })();
    function X(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = new Array(e.length); t < e.length; t++)
              i[t] = e[t];
            return i;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Z(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var Y,
      J = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            l.isDevice ||
              (f(this, ["run", "onMove", "onEnter", "onLeave"]),
              (this.el = document.querySelector(".js-cursor")),
              (this.inner = this.el.querySelector(".js-cursor__inner")),
              (this.circle = this.el.querySelector(".js-cursor__content path")),
              (this.targets = X(
                document.querySelectorAll("[data-cursor-target]")
              )),
              (this.arrows = X(this.el.querySelectorAll(".js-cursor__arrow"))),
              (this.share = X(
                document.querySelectorAll(".js-site-head-social__link")
              )),
              (this.data = {
                current: { x: 0, y: 0 },
                last: { x: 0, y: 0 },
                ease: 0.15
              }),
              (this.state = { grabbing: !1, hover: !1, target: null }),
              this.init());
        }
        var t, i, n;
        return (
          (t = e),
          (i = [
            {
              key: "onMove",
              value: function(e) {
                var t = e.x,
                  i = e.y;
                e.target;
                (this.data.current.x = t), (this.data.current.y = i);
              }
            },
            {
              key: "onEnter",
              value: function(e) {
                (this.state.hover = !0),
                  (this.state.target = e.dataset.cursorTarget);
                var t = new TimelineLite({ paused: !0 });
                t
                  .to(this.inner, 0.5, { scale: 1.25, ease: Expo.easeOut }, 0)
                  .to(this.arrows, 0.5, { alpha: 1, ease: Linear.easeNone }, 0),
                  t.play();
              }
            },
            {
              key: "onLeave",
              value: function(e) {
                var t = this;
                this.state.hover = !1;
                var i = new TimelineLite({
                  paused: !0,
                  onComplete: function() {
                    t.state.target = null;
                  }
                });
                i
                  .to(this.inner, 0.5, { scale: 1, ease: Expo.easeOut })
                  .to(this.arrows, 0.5, { alpha: 0, ease: Expo.easeOut }, 0),
                  i.play();
              }
            },
            {
              key: "onSocial",
              value: function() {
                var e = this;
                this.share.forEach(function(t) {
                  t.addEventListener("mouseenter", function() {
                    a.a.to(e.circle, 0.5, {
                      fill: "#ebb52f",
                      ease: Power2.easeOut
                    }),
                      a.a.to(e.inner, 0.5, { scale: 1.25, ease: Expo.easeOut });
                  }),
                    t.addEventListener("mouseleave", function() {
                      a.a.to(e.circle, 0.5, {
                        fill: "#fff",
                        ease: Power2.easeOut
                      }),
                        a.a.to(e.inner, 0.5, { scale: 1, ease: Expo.easeOut });
                    });
                });
              }
            },
            {
              key: "onTargets",
              value: function() {
                var e = this;
                this.targets.forEach(function(t) {
                  t.addEventListener("mouseenter", function() {
                    e.onEnter(t);
                  }),
                    t.addEventListener("mouseleave", function() {
                      e.onLeave(t);
                    });
                });
              }
            },
            {
              key: "run",
              value: function() {
                (this.data.last.x = c(
                  this.data.last.x,
                  this.data.current.x,
                  this.data.ease
                )),
                  (this.data.last.y = c(
                    this.data.last.y,
                    this.data.current.y,
                    this.data.ease
                  ));
                var e = this.data.current.x - this.data.last.x,
                  t = this.data.current.y - this.data.last.y,
                  i =
                    0.25 *
                    (R()(Math.abs(e) / 20, 0, 1) + R()(Math.abs(t) / 20, 0, 1));
                this.el.style.transform = "\n      translate3d("
                  .concat(this.data.last.x.toFixed(2), "px, ")
                  .concat(this.data.last.y.toFixed(2), "px, 0)\n      scale(")
                  .concat(1 - i, ") \n    ");
              }
            },
            {
              key: "addListeners",
              value: function() {
                g.on(y.TICK, this.run),
                  g.on(W.MOVE, this.onMove),
                  this.onTargets(),
                  this.onSocial();
              }
            },
            {
              key: "init",
              value: function() {
                this.addListeners();
              }
            }
          ]) && Z(t.prototype, i),
          n && Z(t, n),
          e
        );
      })(),
      $ = i(30),
      Q = i.n($),
      ee = i(2),
      te = ee.e.document,
      ie = te.defaultView ? te.defaultView.getComputedStyle : function() {},
      ne = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      se = -1 !== ((ee.e.navigator || {}).userAgent || "").indexOf("Edge"),
      ae = {
        rect: ["width", "height"],
        circle: ["r", "r"],
        ellipse: ["rx", "ry"],
        line: ["x2", "y2"]
      };
    function oe(e, t, i, n, s, a) {
      return (
        (i = (parseFloat(i || 0) - parseFloat(e || 0)) * s),
        (n = (parseFloat(n || 0) - parseFloat(t || 0)) * a),
        Math.sqrt(i * i + n * n)
      );
    }
    function re(e) {
      return (
        ("string" != typeof e && e.nodeType) ||
          ((e = ee.e.TweenLite.selector(e)).length && (e = e[0])),
        e
      );
    }
    function le(e) {
      if (!e) return 0;
      var t,
        i,
        n,
        s,
        a,
        o,
        r,
        l = (e = re(e)).tagName.toLowerCase(),
        h = 1,
        u = 1;
      "non-scaling-stroke" === e.getAttribute("vector-effect") &&
        ((u = e.getScreenCTM()),
        (h = Math.sqrt(u.a * u.a + u.b * u.b)),
        (u = Math.sqrt(u.d * u.d + u.c * u.c)));
      try {
        i = e.getBBox();
      } catch (e) {
        console.log(
          "Error: Some browsers like Firefox won't report measurements of invisible elements (like display:none or masks inside defs)."
        );
      }
      if (
        ((i && (i.width || i.height)) ||
          !ae[l] ||
          ((i = {
            width: parseFloat(e.getAttribute(ae[l][0])),
            height: parseFloat(e.getAttribute(ae[l][1]))
          }),
          "rect" !== l && "line" !== l && ((i.width *= 2), (i.height *= 2)),
          "line" === l &&
            ((i.x = parseFloat(e.getAttribute("x1"))),
            (i.y = parseFloat(e.getAttribute("y1"))),
            (i.width = Math.abs(i.width - i.x)),
            (i.height = Math.abs(i.height - i.y)))),
        "path" === l)
      )
        (s = e.style.strokeDasharray),
          (e.style.strokeDasharray = "none"),
          (t = e.getTotalLength() || 0),
          h !== u &&
            console.log(
              "Warning: <path> length cannot be measured accurately when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."
            ),
          (t *= (h + u) / 2),
          (e.style.strokeDasharray = s);
      else if ("rect" === l) t = 2 * i.width * h + 2 * i.height * u;
      else if ("line" === l)
        t = oe(i.x, i.y, i.x + i.width, i.y + i.height, h, u);
      else if ("polyline" === l || "polygon" === l)
        for (
          n = e.getAttribute("points").match(ne) || [],
            "polygon" === l && n.push(n[0], n[1]),
            t = 0,
            a = 2;
          a < n.length;
          a += 2
        )
          t += oe(n[a - 2], n[a - 1], n[a], n[a + 1], h, u) || 0;
      else
        ("circle" !== l && "ellipse" !== l) ||
          ((o = i.width / 2 * h),
          (r = i.height / 2 * u),
          (t = Math.PI * (3 * (o + r) - Math.sqrt((3 * o + r) * (o + 3 * r)))));
      return t || 0;
    }
    function he(e, t) {
      if (!e) return [0, 0];
      (e = re(e)), (t = t || le(e) + 1);
      var i = ie(e),
        n = i.strokeDasharray || "",
        s = parseFloat(i.strokeDashoffset),
        a = n.indexOf(",");
      return (
        a < 0 && (a = n.indexOf(" ")),
        (n = a < 0 ? t : parseFloat(n.substr(0, a)) || 1e-5) > t && (n = t),
        [Math.max(0, -s), Math.max(0, n - s)]
      );
    }
    function ue(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = new Array(e.length); t < e.length; t++)
              i[t] = e[t];
            return i;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function ce(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    ((Y = ee.e._gsDefine.plugin({
      propName: "drawSVG",
      API: 2,
      version: "0.2.0",
      global: !0,
      overwriteProps: ["drawSVG"],
      init: function(e, t, i, n) {
        if (!e.getBBox) return !1;
        var s,
          a,
          o,
          r,
          l = le(e) + 1;
        return (
          (this._style = e.style),
          (this._target = e),
          "function" == typeof t && (t = t(n, e)),
          !0 === t || "true" === t
            ? (t = "0 100%")
            : t ? -1 === (t + "").indexOf(" ") && (t = "0 " + t) : (t = "0 0"),
          (a = (function(e, t, i) {
            var n,
              s,
              a = e.indexOf(" ");
            return (
              -1 === a
                ? ((n = void 0 !== i ? i + "" : e), (s = e))
                : ((n = e.substr(0, a)), (s = e.substr(a + 1))),
              (n =
                -1 !== n.indexOf("%")
                  ? parseFloat(n) / 100 * t
                  : parseFloat(n)) >
              (s =
                -1 !== s.indexOf("%") ? parseFloat(s) / 100 * t : parseFloat(s))
                ? [s, n]
                : [n, s]
            );
          })(t, l, (s = he(e, l))[0])),
          (this._length = l + 10),
          0 === s[0] && 0 === a[0]
            ? ((o = Math.max(1e-5, a[1] - l)),
              (this._dash = l + o),
              (this._offset = l - s[1] + o),
              (this._offsetPT = this._addTween(
                this,
                "_offset",
                this._offset,
                l - a[1] + o,
                "drawSVG"
              )))
            : ((this._dash = s[1] - s[0] || 1e-6),
              (this._offset = -s[0]),
              (this._dashPT = this._addTween(
                this,
                "_dash",
                this._dash,
                a[1] - a[0] || 1e-5,
                "drawSVG"
              )),
              (this._offsetPT = this._addTween(
                this,
                "_offset",
                this._offset,
                -a[0],
                "drawSVG"
              ))),
          se &&
            (r = ie(e)).strokeLinecap !== r.strokeLinejoin &&
            ((a = parseFloat(r.strokeMiterlimit)),
            this._addTween(
              e.style,
              "strokeMiterlimit",
              a,
              a + 1e-4,
              "strokeMiterlimit"
            )),
          (this._live =
            "non-scaling-stroke" === e.getAttribute("vector-effect") ||
            -1 !== (t + "").indexOf("live")),
          !0
        );
      },
      set: function(e) {
        if (this._firstPT) {
          if (this._live) {
            var t,
              i = le(this._target) + 11;
            i !== this._length &&
              ((t = i / this._length),
              (this._length = i),
              (this._offsetPT.s *= t),
              (this._offsetPT.c *= t),
              this._dashPT
                ? ((this._dashPT.s *= t), (this._dashPT.c *= t))
                : (this._dash *= t));
          }
          this._super.setRatio.call(this, e),
            (this._style.strokeDashoffset = this._offset),
            (this._style.strokeDasharray =
              1 === e || 0 === e
                ? this._offset < 0.001 && this._length - this._dash <= 10
                  ? "none"
                  : this._offset === this._dash
                    ? "0px, 999999px"
                    : this._dash + "px," + this._length + "px"
                : this._dash + "px," + this._length + "px");
        }
      }
    })).getLength = le),
      (Y.getPosition = he);
    var de = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          f(this, ["setPos", "run", "on", "off", "resize"]),
          (this.dom = {
            el: document.querySelector(".js-act"),
            img: document.querySelector(".js-act__img"),
            slide: {
              one: document.querySelector(".js-act__slide--1"),
              two: document.querySelector(".js-act__slide--2")
            },
            nav: {
              next: document.querySelector(".js-act__btn--next"),
              prev: document.querySelector(".js-act__btn--previous")
            },
            bullets: ue(document.querySelectorAll(".js-act__bullet"))
          }),
          a.a.set([this.dom.slide.one, this.dom.slide.two], {
            rotation: 0.01,
            force3D: !0
          }),
          (this.data = {
            ease: 0.1,
            speed: l.isPhone ? 2.5 : 1.5,
            total: 4,
            on: 0,
            off: 0,
            current: 0,
            last: 0,
            slides: ["one", "two", "three", "four"],
            bullet: { current: 0, last: 0 }
          }),
          (this.bounds = {
            width: 0,
            max: 0,
            min: 0,
            snap: { width: 0, points: 0, offset: 0 },
            phone: window.matchMedia("(max-width: 640px)").matches
          }),
          (this.state = { resizing: !1, dragging: !1, snapping: !1 }),
          (this.cache = null),
          (this.bullets = null),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "getBullets",
            value: function() {
              var e = this;
              (this.bullets = []),
                this.dom.bullets.forEach(function(t) {
                  var i = t.querySelector("path");
                  a.a.set(i, { drawSVG: 0 }),
                    e.bullets.push({ el: t, path: i });
                });
            }
          },
          {
            key: "setBounds",
            value: function() {
              var e = this;
              (this.bounds.snap.points = []),
                (this.bounds.diff = this.dom.el.offsetWidth),
                (this.bounds.width = this.dom.img.offsetWidth),
                (this.bounds.max = -(this.bounds.width - this.bounds.diff)),
                (this.bounds.min = 0),
                (this.bounds.snap.width = -this.bounds.width / this.data.total),
                this.data.slides.forEach(function(t, i) {
                  e.bounds.snap.points.push(e.bounds.snap.width * i);
                });
            }
          },
          {
            key: "setStart",
            value: function() {
              (this.data.current = 0), this.toggleBullet(0);
            }
          },
          {
            key: "setStyles",
            value: function() {
              (this.dom.slide.two.style.touchAction = "pan-x"),
                (this.dom.slide.two.style.userSelect = "none");
            }
          },
          {
            key: "setPos",
            value: function(e) {
              var t = e.x;
              this.state.dragging &&
                ((this.data.current =
                  this.data.off + (t - this.data.on) * this.data.speed),
                this.clamp());
            }
          },
          {
            key: "clamp",
            value: function() {
              this.data.current = R()(
                this.data.current,
                this.bounds.max,
                this.bounds.min
              );
            }
          },
          {
            key: "run",
            value: function() {
              this.state.resizing ||
                this.state.snapping ||
                ((this.data.last = c(
                  this.data.last,
                  this.data.current,
                  this.data.ease
                )),
                (this.dom.slide.one.style.transform = "translate3d(".concat(
                  0.25 * this.data.last.toFixed(2),
                  "px, 0, 0)"
                )),
                (this.dom.slide.two.style.transform = "translate3d(".concat(
                  this.data.last.toFixed(2),
                  "px, 0, 0)"
                )));
            }
          },
          {
            key: "on",
            value: function(e) {
              var t = e.x,
                i = e.target;
              this.dom.el == i &&
                ((this.state.dragging = !0),
                (this.data.on = t),
                this.dom.el.classList.add("is-grabbing"));
            }
          },
          {
            key: "off",
            value: function() {
              this.state.dragging &&
                (this.snap(),
                (this.state.dragging = !1),
                (this.data.off = this.data.current),
                this.dom.el.classList.remove("is-grabbing"));
            }
          },
          {
            key: "onBulletClick",
            value: function() {
              var e = this;
              (this.state.snapping = !0),
                a.a.fromTo(
                  this.dom.slide.one,
                  1,
                  { x: 0.25 * this.data.last },
                  {
                    x: 0.25 * this.bounds.snap.points[this.data.bullet.current],
                    ease: Expo.easeInOut
                  }
                ),
                a.a.fromTo(
                  this.dom.slide.two,
                  1,
                  { x: this.data.last },
                  {
                    x: this.bounds.snap.points[this.data.bullet.current],
                    ease: Expo.easeInOut,
                    onUpdate: function() {
                      e.data.last = e.data.current =
                        e.bounds.snap.points[e.data.bullet.current];
                    },
                    onComplete: function() {
                      (e.data.off = e.data.current), (e.state.snapping = !1);
                    }
                  }
                );
            }
          },
          {
            key: "getClosest",
            value: function() {
              (this.data.bullet.last = this.data.bullet.current),
                (this.data.bullet.current = Q.a.number(
                  this.data.current,
                  this.bounds.snap.points
                )),
                (this.bounds.snap.offset = this.bounds.snap.points[
                  this.data.bullet.current
                ]);
            }
          },
          {
            key: "snap",
            value: function() {
              this.getClosest(),
                (this.data.current = this.bounds.snap.offset),
                this.clamp(),
                this.toggleBullet();
            }
          },
          {
            key: "addEvents",
            value: function() {
              g.on(y.TICK, this.run),
                g.on(W.DOWN, this.on),
                g.on(W.MOVE, this.setPos),
                g.on(W.UP, this.off),
                g.on(_.RESIZE, this.resize),
                this.desktopEvents(),
                this.bullets[0].el.classList.add("is-active"),
                this.bounds.phone ||
                  a.a.set(this.bullets[0].path, { drawSVG: "0 100%" });
            }
          },
          {
            key: "desktopEvents",
            value: function() {
              var e = this;
              this.bounds.phone ||
                this.bullets.forEach(function(t, i) {
                  t.el.addEventListener("click", function() {
                    e.state.snapping ||
                      ((e.data.bullet.last = e.data.bullet.current),
                      (e.data.bullet.current = i),
                      e.toggleBullet(),
                      e.onBulletClick());
                  });
                });
            }
          },
          {
            key: "toggleBulletMobile",
            value: function(e, t) {
              if (this.bounds.phone) {
                var i = new TimelineLite({ paused: !0 }),
                  n = this.data.last < this.data.current;
                i
                  .set(t.el, { autoAlpha: 1 })
                  .to(e.el, 0.35, {
                    xPercent: n ? 25 : -25,
                    alpha: 0,
                    ease: Power1.easeIn
                  })
                  .fromTo(
                    t.el,
                    0.65,
                    { xPercent: n ? -25 : 25, alpha: 0 },
                    { xPercent: 0, alpha: 1, ease: Power3.easeOut },
                    0.35
                  )
                  .set(e.el, { autoAlpha: 0 }),
                  i.play();
              }
            }
          },
          {
            key: "toggleBullet",
            value: function() {
              if (this.data.bullet.last !== this.data.bullet.current) {
                var e = this.bullets[this.data.bullet.last],
                  t = this.bullets[this.data.bullet.current];
                e.el.classList.remove("is-active"),
                  t.el.classList.add("is-active"),
                  this.toggleBulletMobile(e, t),
                  this.bounds.phone ||
                    (a.a.fromTo(
                      t.path,
                      1,
                      { drawSVG: "0" },
                      { drawSVG: "100%", ease: Power3.easeOut }
                    ),
                    a.a.fromTo(
                      e.path,
                      1,
                      { drawSVG: "0 100%" },
                      { drawSVG: 0, ease: Power3.easeOut }
                    ));
              }
            }
          },
          {
            key: "resize",
            value: function() {
              (this.state.resizing = !0),
                (this.bounds.phone = window.matchMedia(
                  "(max-width: 640px)"
                ).matches),
                this.setBounds(),
                (this.state.resizing = !1);
            }
          },
          {
            key: "init",
            value: function() {
              this.getBullets(),
                this.setStyles(),
                this.setBounds(),
                this.setStart(),
                this.addEvents();
            }
          }
        ]) && ce(t.prototype, i),
        n && ce(t, n),
        e
      );
    })();
    function fe(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = new Array(e.length); t < e.length; t++)
              i[t] = e[t];
            return i;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function pe(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var ge = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          this.bindAll(),
          (this.dom = {
            el: document.querySelector("[data-schedule]"),
            slides: fe(document.querySelectorAll("[data-schedule-slide]"))
          }),
          a.a.set(this.dom.slides, { rotation: 0.01, force3D: !0 }),
          (this.data = {
            ease: 0.1,
            speed: l.isPhone ? 2.5 : 1.25,
            total: this.dom.slides.length - 1,
            on: 0,
            off: 0,
            current: 0,
            last: 0
          }),
          (this.bounds = { width: 0, max: 0, min: 0 }),
          (this.state = { resizing: !1, dragging: !1, snapping: !1 }),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "bindAll",
            value: function() {
              var e = this;
              ["setPos", "run", "on", "off", "resize"].forEach(function(t) {
                return (e[t] = e[t].bind(e));
              });
            }
          },
          {
            key: "getCache",
            value: function() {
              var e = this;
              (this.cache = []),
                this.dom.slides.forEach(function(t, i) {
                  e.cache.push({
                    el: t,
                    ease: 0.1 - parseFloat("0.0".concat(1.25 * i)),
                    last: 0
                  });
                });
            }
          },
          {
            key: "setBounds",
            value: function() {
              var e = this;
              (this.bounds.diff = this.dom.el.offsetWidth),
                (this.bounds.min = 0),
                this.dom.slides.forEach(function(t, i) {
                  (e.bounds.width = e.bounds.width + t.offsetWidth),
                    i == e.data.total &&
                      (e.bounds.max = -(e.bounds.width - e.bounds.diff));
                });
            }
          },
          {
            key: "setStyles",
            value: function() {
              (this.dom.el.style.touchAction = "pan-x"),
                (this.dom.el.style.userSelect = "none");
            }
          },
          {
            key: "setPos",
            value: function(e) {
              var t = e.x;
              this.state.dragging &&
                ((this.data.current =
                  this.data.off + (t - this.data.on) * this.data.speed),
                this.clamp());
            }
          },
          {
            key: "clamp",
            value: function() {
              this.data.current = Math.max(
                Math.min(this.data.current, this.bounds.min),
                this.bounds.max
              );
            }
          },
          {
            key: "run",
            value: function() {
              var e = this;
              this.state.resizing ||
                this.cache.forEach(function(t) {
                  (t.last = c(t.last, e.data.current, t.ease)),
                    (t.el.style.transform = "translate3d(".concat(
                      t.last.toFixed(2),
                      "px, 0, 0)"
                    ));
                });
            }
          },
          {
            key: "on",
            value: function(e) {
              var t = e.x,
                i = e.target;
              this.dom.el.contains(i) &&
                ((this.state.dragging = !0),
                (this.data.on = t),
                this.dom.el.classList.add("is-grabbing"));
            }
          },
          {
            key: "off",
            value: function() {
              this.state.dragging &&
                ((this.state.dragging = !1),
                (this.data.off = this.data.current),
                this.dom.el.classList.remove("is-grabbing"));
            }
          },
          {
            key: "addEvents",
            value: function() {
              g.on(y.TICK, this.run),
                g.on(W.DOWN, this.on),
                g.on(W.MOVE, this.setPos),
                g.on(W.UP, this.off),
                g.on(_.RESIZE, this.resize);
            }
          },
          {
            key: "resize",
            value: function() {
              (this.state.resizing = !0),
                this.setBounds(),
                (this.state.resizing = !1);
            }
          },
          {
            key: "init",
            value: function() {
              this.getCache(),
                this.setStyles(),
                this.setBounds(),
                this.addEvents();
            }
          }
        ]) && pe(t.prototype, i),
        n && pe(t, n),
        e
      );
    })();
    function ve(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = new Array(e.length); t < e.length; t++)
              i[t] = e[t];
            return i;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function me(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var

      be = i(43),
      xe = i.n(be);
    function we(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var ke = (function() {
      function e() {
        var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          f(this, ["run", "event", "resize"]),
          (this.el = t.el || l.body);
        var i = t.section,
          n = void 0 === i ? this.el.querySelector("[data-smooth-section]") : i,
          s = t.ease,
          a = void 0 === s ? (l.isDevice ? 0.1 : 0.125) : s,
          o = (t.preload, t.mouseMultiplier),
          r = void 0 === o ? 0.5 : o,
          h = t.touchMultiplier,
          u = void 0 === h ? 2.5 : h,
          c = t.firefoxMultiplier,
          d = void 0 === c ? 90 : c,
          p = t.keyStep,
          g = void 0 === p ? 0 : p,
          v = t.preventTouch,
          m = void 0 === v || v,
          y = t.passive,
          b = void 0 !== y && y;
        (this.dom = { el: this.el, section: n }),
          (this.state = { resizing: !1, rafCancelled: !1, locked: !1 }),
          (this.data = {
            ease: a,
            current: 0,
            last: 0,
            target: 0,
            bounding: 0,
            height: 0,
            max: 0
          }),
          (this.vs = new S.a({
            el: this.el,
            mouseMultiplier: r,
            touchMultiplier: u,
            firefoxMultiplier: d,
            keyStep: g,
            preventTouch: m,
            passive: b
          })),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "init",
            value: function() {
              this.on();
            }
          },
          {
            key: "on",
            value: function() {
              this.dom.el.classList.add("is-virtual-scroll"),
                this.setStyles(),
                this.getBounding(),
                this.addListeners(),
                this.vs.on(this.event),
                this.preload();
            }
          },
          {
            key: "setStyles",
            value: function() {
              (this.dom.el.style.position = "fixed"),
                (this.dom.el.style.top = 0),
                (this.dom.el.style.left = 0),
                (this.dom.el.style.width = "100%");
            }
          },
          {
            key: "event",
            value: function(e) {
              (this.data.target +=
                "keydown" === e.originalEvent.type
                  ? 0
                  : Math.round(-1 * e.deltaY)),
                this.clamp();
            }
          },
          {
            key: "clamp",
            value: function() {
              this.data.target = Math.round(
                Math.min(Math.max(this.data.target, 0), this.data.max)
              );
            }
          },
          {
            key: "run",
            value: function() {
              if (!this.state.resizing && !this.state.rafCancelled) {
                this.data.current +=
                  (this.data.target - this.data.current) * this.data.ease;
                var e = this.data.current.toFixed(2);
                (this.dom.section.style.transform = "translate3d(0, ".concat(
                  -e,
                  "px, 0)"
                )),
                  (this.data.last = this.data.current);
              }
            }
          },
          {
            key: "getBounding",
            value: function() {
              var e = this.dom.section.getBoundingClientRect();
              (this.data.height = window.innerHeight),
                (this.data.bounding = e),
                (this.data.max = e.height - this.data.height);
            }
          },
          {
            key: "preload",
            value: function() {
              var e = this;
              u()(this.dom.el, function(t) {
                e.resize();
              });
            }
          },
          {
            key: "resize",
            value: function() {
              (this.state.resizing = !0),
                this.getBounding(),
                (this.state.resizing = !1);
            }
          },
          {
            key: "off",
            value: function() {
              (this.state.rafCancelled = !0),
                this.vs.off(this.event),
                this.dom.el.classList.remove("is-virtual-scroll"),
                this.removeListeners();
            }
          },
          {
            key: "addListeners",
            value: function() {
              g.on(y.TICK, this.run), g.on(_.RESIZE, this.resize);
            }
          },
          {
            key: "removeListeners",
            value: function() {
              g.off(y.TICK, this.run), g.off(_.RESIZE, this.resize);
            }
          },
          {
            key: "destroy",
            value: function() {
              this.off(),
                this.vs.destroy(),
                (this.dom = null),
                (this.data = null),
                (this.raf = null);
            }
          }
        ]) && we(t.prototype, i),
        n && we(t, n),
        e
      );
    })();
    function _e(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = new Array(e.length); t < e.length; t++)
              i[t] = e[t];
            return i;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Te(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var Se = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.el = document.querySelector(".js-checkout")),
          (this.dom = {
            btn: {
              open: _e(document.querySelectorAll(".js-checkout-open")),
              close: _e(this.el.querySelectorAll(".js-checkout-close")),
              checkout: _e(document.querySelectorAll(".js-checkout-pay"))
            },
            required: _e(this.el.querySelectorAll("[required]")),
            inputs: _e(this.el.querySelectorAll("input"))
          }),
          (this.data = {
            price: {
              base:
                void 0 !== window.TICKET_COST
                  ? parseInt(window.TICKET_COST)
                  : 0,
              total:
                void 0 !== window.TICKET_COST ? parseInt(window.TICKET_COST) : 0
            },
            quantity: 1,
            order: window.EARLYBIRD ? "x Earlybird tickets" : "x Normal tickets"
          }),
          (this.state = { updating: !1 }),
          (this.tl = { open: null, close: null }),
          (this.smooth = null),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "open",
            value: function() {
              (this.smooth = new ke({ el: this.el })),
                (this.tl.open = new TimelineLite({ paused: !0 })),
                this.tl.open
                  .set(this.el, { autoAlpha: 1 })
                  .set(".js-checkout-close__line--1", {
                    transformOrigin: "top left"
                  })
                  .set(".js-checkout-close__line--2", {
                    transformOrigin: "top right"
                  })
                  .fromTo(
                    ".js-checkout__overlay",
                    1,
                    { alpha: 0 },
                    { alpha: 1, ease: Linear.easeNone },
                    0
                  )
                  .fromTo(
                    ".js-checkout__inner",
                    1.25,
                    { xPercent: -100 },
                    { xPercent: 0, ease: Expo.easeInOut },
                    0
                  )
                  .fromTo(
                    ".js-checkout__content",
                    1.25,
                    { xPercent: 75 },
                    { xPercent: 0, ease: Expo.easeInOut },
                    0
                  )
                  .fromTo(
                    ".js-checkout__underline",
                    1.5,
                    { scaleX: 0 },
                    { scaleX: 1, ease: Expo.easeInOut },
                    0.5
                  )
                  .staggerFromTo(
                    ".js-checkout-close__line",
                    0.9,
                    { scaleX: 0 },
                    { scaleX: 1, ease: Expo.easeInOut },
                    0.25,
                    1.25
                  )
                  .fromTo(
                    ".js-checkout-close__svg",
                    0.9,
                    { alpha: 0 },
                    { alpha: 1, ease: Linear.easeNone },
                    1.25
                  ),
                this.tl.open.play();
            }
          },
          {
            key: "close",
            value: function() {
              (this.tl.close = new TimelineLite({
                paused: !0,
                onComplete: this.smooth.destroy()
              })),
                this.tl.close
                  .to(
                    ".js-checkout__inner",
                    1.25,
                    { xPercent: -100, ease: Expo.easeInOut },
                    0
                  )
                  .to(
                    ".js-checkout__content",
                    1.25,
                    { xPercent: 75, ease: Expo.easeInOut },
                    0
                  )
                  .to(
                    ".js-checkout__overlay",
                    1,
                    { alpha: 0, ease: Linear.easeNone },
                    0
                  )
                  .set(this.el, { autoAlpha: 0 }),
                this.tl.close.play();
            }
          },
          {
            key: "addListeners",
            value: function() {
              var e = this;
              this.dom.btn.open.forEach(function(t) {
                t.addEventListener("click", function() {
                  e.open();
                });
              }),
                this.dom.btn.close.forEach(function(t) {
                  t.addEventListener("click", function() {
                    e.close();
                  });
                }),
                this.dom.btn.checkout.forEach(function(t) {
                  t.addEventListener("click", function() {
                    (e.data.payFull = !0), e.openStripe();
                  });
                }),
                this.toggleClasses();
            }
          },
          {
            key: "init",
            value: function() {
              this.addListeners(), this.isStripeLoaded() && this.initStripe();
            }
          },
          {
            key: "isStripeLoaded",
            value: function() {
              var e = void 0 !== window.StripeCheckout,
                t = void 0 !== window.STRIPE_PUBLISHABLE_KEY,
                i = void 0 !== window.TICKET_COST;
              return e && t && i;
            }
          },
          {
            key: "initStripe",
            value: function() {
              (this.stripeHandler = null),
                this.dom.btn.checkout && this.setupStripeHandler();
            }
          },
          {
            key: "setupStripeHandler",
            value: function() {
              this.stripeHandler = window.StripeCheckout.configure({
                key: window.STRIPE_PUBLISHABLE_KEY,
                image: "/images/logo-stripe.jpg",
                locale: "auto",
                token: this.handleToken.bind(this)
              });
            }
          },
          {
            key: "required",
            value: function() {
              var e = this;
              (this.fields = null),
                (this.fields = []),
                this.dom.required.forEach(function(t) {
                  ("" !== t.value.trim() && null !== t) ||
                    (t.parentNode.classList.add("has-error"), e.fields.push(t));
                });
            }
          },
          {
            key: "toggleClasses",
            value: function() {
              this.dom.inputs.forEach(function(e) {
                e.addEventListener("keydown", function() {
                  "" != e.value.trim() &&
                    (e.parentNode.classList.remove("has-error"),
                    e.parentNode.classList.add("has-value"));
                }),
                  e.addEventListener("focus", function() {
                    e.parentNode.classList.add("is-active");
                  }),
                  e.addEventListener("blur", function() {
                    e.parentNode.classList.remove("is-active");
                  });
              });
            }
          },
          {
            key: "openStripe",
            value: function() {
              if ((this.required(), !(this.fields.length > 0))) {
                var e = document.getElementById("first-name").value,
                  t = document.getElementById("last-name").value,
                  i = document.getElementById("email").value,
                  n = document.querySelector('input[name="size"]:checked')
                    .value,
                  s = document.getElementById("special-requests").value;
                (this.customerInfo = {
                  first_name: e,
                  last_name: t,
                  tshirt_size: n,
                  special_requests: s,
                  ticket_type: "Earlybird"
                }),
                  this.stripeHandler.open({
                    name: "Epicurrence Breckenridge",
                    description: this.data.quantity + this.data.order,
                    zipCode: !0,
                    email: i,
                    amount: this.data.payFull
                      ? 100 * this.data.price.total
                      : 100 * this.data.price.total / 2
                  }),
                  (this.isStripeOpen = !0);
              }
            }
          },
          {
            key: "closeStripe",
            value: function() {
              this.stripeHandler.close(), (this.isStripeOpen = !1);
            }
          },
          {
            key: "handleToken",
            value: function(e) {
              var t = this;
              xe.a
                .post("/?process_payment", {
                  token: e,
                  quantity: this.data.quantity,
                  customer_info: this.customerInfo
                })
                .then(function(e) {
                  t.close();
                })
                .catch(function(e) {
                  console.log(e);
                });
            }
          }
        ]) && Te(t.prototype, i),
        n && Te(t, n),
        e
      );
    })();
    function Pe(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var Ee = (function() {
      function e(t) {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.el = t),
          (this.masks = this.el.querySelectorAll(".js-btn__mask")),
          (this.tl = { in: null, out: null }),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "mouseEnter",
            value: function() {
              this.tl.out && this.tl.out.kill(),
                (this.tl.in = new TimelineLite({ paused: !0 })),
                this.tl.in.staggerFromTo(
                  this.masks,
                  0.75,
                  { yPercent: 0 },
                  { yPercent: -100, ease: Power3.easeOut },
                  0.15
                ),
                this.tl.in.play();
            }
          },
          {
            key: "mouseLeave",
            value: function() {
              this.tl.in && this.tl.in.kill(),
                (this.tl.out = new TimelineLite({ paused: !0 })),
                this.tl.out.staggerFromTo(
                  this.masks,
                  0.75,
                  { yPercent: -100 },
                  { yPercent: -200, ease: Power3.easeOut },
                  -0.15
                ),
                this.tl.out.play();
            }
          },
          {
            key: "addListeners",
            value: function() {
              var e = this;
              this.el.addEventListener("mouseenter", function() {
                e.mouseEnter();
              }),
                this.el.addEventListener("mouseleave", function() {
                  e.mouseLeave();
                });
            }
          },
          {
            key: "init",
            value: function() {
              this.addListeners();
            }
          }
        ]) && Pe(t.prototype, i),
        n && Pe(t, n),
        e
      );
    })();
    function Ce(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var Oe = (function() {
      function e(t) {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.el = t),
          (this.mask = this.el.querySelector(".js-btn-outline__mask")),
          (this.lines = {
            h: this.el.querySelectorAll(".js-btn-outline__border-h"),
            v: this.el.querySelectorAll(".js-btn-outline__border-v")
          }),
          (this.tl = { in: null, out: null }),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "mouseEnter",
            value: function() {
              this.tl.out && this.tl.out.kill(),
                (this.tl.in = new TimelineLite({ paused: !0 })),
                this.tl.in
                  .to(this.lines.h, 0.5, { scaleX: 1, ease: Expo.easeOut }, 0)
                  .to(this.lines.v, 0.5, { scaleY: 1, ease: Expo.easeOut }, 0)
                  .fromTo(
                    this.mask,
                    1.1,
                    { yPercent: 0 },
                    { yPercent: -100, ease: Expo.easeOut },
                    0.15
                  ),
                this.tl.in.play();
            }
          },
          {
            key: "mouseLeave",
            value: function() {
              this.tl.in && this.tl.in.kill(),
                (this.tl.out = new TimelineLite({ paused: !0 })),
                this.tl.out
                  .fromTo(
                    this.mask,
                    1.1,
                    { yPercent: -100 },
                    { yPercent: -200, ease: Expo.easeOut }
                  )
                  .to(
                    this.lines.h,
                    0.5,
                    { scaleX: 0, ease: Expo.easeOut },
                    0.25
                  )
                  .to(
                    this.lines.v,
                    0.5,
                    { scaleY: 0, ease: Expo.easeOut },
                    0.25
                  ),
                this.tl.out.play();
            }
          },
          {
            key: "addListeners",
            value: function() {
              var e = this;
              this.el.addEventListener("mouseenter", function() {
                e.mouseEnter();
              }),
                this.el.addEventListener("mouseleave", function() {
                  e.mouseLeave();
                });
            }
          },
          {
            key: "init",
            value: function() {
              this.addListeners();
            }
          }
        ]) && Ce(t.prototype, i),
        n && Ce(t, n),
        e
      );
    })();
    function Le(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var je = (function() {
      function e(t) {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          f(this, ["onEnter", "onLeave", "render", "onResize"]),
          (this.vert =
            "\n    varying vec2 vUv;\n    void main() {\n      vUv = vec2(uv.x, uv.y);\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n    "),
          (this.frag =
            "\n    uniform float dispFactor;\n    uniform float intensity;\n\n    uniform sampler2D texture1;\n    uniform sampler2D texture2;\n    uniform sampler2D disp;\n\n    varying vec2 vUv;\n\n    void main() {\n\n      vec4 texel1 = texture2D(texture1, vUv);\n      vec4 texel2 = texture2D(texture2, vUv);\n      \n      vec4 dispTexture = texture2D( disp, vUv );\n      float r = dispFactor * (1.0 + intensity * 2.0) - intensity;\n      float mixit = clamp((dispTexture.r - r) * (1.0 / intensity), 0.0, 1.0);\n      \n      gl_FragColor = mix(texel1, texel2, mixit);\n    }\n    "),
          (this.el = t),
          (this.size = {
            width: this.el.offsetWidth,
            height: this.el.offsetHeight
          }),
          (this.images = {
            one: ""
              .concat(this.el.dataset.imgOne)
              .concat(r.a ? ".webp" : ".jpg"),
            two: ""
              .concat(this.el.dataset.imgTwo)
              .concat(r.a ? ".webp" : ".jpg"),
            disp: [
              "images/disp-1.png",
              "images/disp-2.png",
              "images/disp-3.png"
            ]
          }),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "cameraSetup",
            value: function() {
              (this.camera = new j.a(
                this.size.width / -2,
                this.size.width / 2,
                this.size.height / 2,
                this.size.height / -2,
                1,
                1e3
              )),
                this.camera.lookAt(this.scene.position),
                (this.camera.position.z = 1);
            }
          },
          {
            key: "setup",
            value: function() {
              (this.scene = new A.a()),
                (this.clock = new M.a(!0)),
                (this.renderer = new z.a({ alpha: !0 })),
                this.renderer.setPixelRatio(window.devicePixelRatio),
                this.renderer.setSize(this.size.width, this.size.height),
                this.el.appendChild(this.renderer.domElement);
            }
          },
          {
            key: "loadTextures",
            value: function() {
              var e = new N.a();
              (e.crossOrigin = ""),
                (this.textures = {}),
                (this.textures.one = e.load(this.images.one, this.render)),
                (this.textures.one.minFilter = I.M),
                (this.textures.two = e.load(this.images.two, this.render)),
                (this.textures.two.minFilter = I.M),
                (this.textures.disp = e.load(
                  this.images.disp[Math.floor(3 * Math.random()) + 0],
                  this.render
                )),
                (this.textures.disp.wrapS = this.textures.disp.wrapT = I.Wb);
            }
          },
          {
            key: "createMesh",
            value: function() {
              this.mat = new F.a({
                uniforms: {
                  dispFactor: { type: "f", value: 0 },
                  intensity: { type: "f", value: 0.1 },
                  texture1: { type: "t", value: this.textures.one },
                  texture2: { type: "t", value: this.textures.two },
                  disp: { type: "t", value: this.textures.disp }
                },
                transparent: !0,
                vertexShader: this.vert,
                fragmentShader: this.frag
              });
              var e = new B.a(1, 1, 1);
              (this.mesh = new q.a(e, this.mat)),
                this.mesh.scale.set(this.size.width, this.size.height, 1),
                this.scene.add(this.mesh);
            }
          },
          {
            key: "onEnter",
            value: function() {
              a.a.to(this.mat.uniforms.dispFactor, 2.5, {
                value: 1,
                ease: Power3.easeOut,
                onUpdate: this.render,
                onComplete: this.render
              });
            }
          },
          {
            key: "onLeave",
            value: function() {
              a.a.to(this.mat.uniforms.dispFactor, 2.5, {
                value: 0,
                ease: Power3.easeOut,
                onUpdate: this.render,
                onComplete: this.render
              });
            }
          },
          {
            key: "addListeners",
            value: function() {
              this.el.addEventListener("mouseenter", this.onEnter),
                this.el.addEventListener("touchstart", this.onEnter),
                this.el.addEventListener("mouseleave", this.onLeave),
                this.el.addEventListener("touchend", this.onLeave),
                g.on(_.RESIZE, this.onResize);
            }
          },
          {
            key: "onResize",
            value: function() {
              (this.size = {
                width: this.el.offsetWidth,
                height: this.el.offsetHeight
              }),
                this.mesh.scale.set(this.size.width, this.size.height, 1),
                (this.camera.left = -this.size.width / 2),
                (this.camera.right = this.size.width / 2),
                (this.camera.top = this.size.height / 2),
                (this.camera.bottom = -this.size.height / 2),
                this.camera.updateProjectionMatrix(),
                this.renderer.setSize(this.size.width, this.size.height);
            }
          },
          {
            key: "render",
            value: function() {
              this.renderer.render(this.scene, this.camera);
            }
          },
          {
            key: "init",
            value: function() {
              this.setup(),
                this.cameraSetup(),
                this.loadTextures(),
                this.createMesh(),
                this.render(),
                this.addListeners();
            }
          }
        ]) && Le(t.prototype, i),
        n && Le(t, n),
        e
      );
    })();
    /*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
    /*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
    !(function(e) {
      var t = e.GreenSockGlobals || e,
        i = (function(e) {
          var i,
            n = e.split("."),
            s = t;
          for (i = 0; i < n.length; i++) s[n[i]] = s = s[n[i]] || {};
          return s;
        })("com.greensock.utils"),
        n = document,
        s = n.defaultView ? n.defaultView.getComputedStyle : function() {},
        a = /([A-Z])/g,
        o = function(e, t, i, n) {
          var o;
          return (
            (i = i || s(e, null))
              ? (o =
                  (e = i.getPropertyValue(t.replace(a, "-$1").toLowerCase())) ||
                  i.length
                    ? e
                    : i[t])
              : e.currentStyle && (o = (i = e.currentStyle)[t]),
            n ? o : parseInt(o, 10) || 0
          );
        },
        r = function(e) {
          return !!(
            e.length &&
            e[0] &&
            ((e[0].nodeType && e[0].style && !e.nodeType) ||
              (e[0].length && e[0][0]))
          );
        },
        l = function(e, t) {
          for (var i, n = t.length; --n > -1; )
            if (((i = t[n]), e.substr(0, i.length) === i)) return i.length;
        },
        h = /(?:\r|\n|\t\t)/g,
        u = /(?:\s\s+)/g,
        c = function(e) {
          return (
            ((e.charCodeAt(0) - 55296) << 10) +
            (e.charCodeAt(1) - 56320) +
            65536
          );
        },
        d =
          " style='position:relative;display:inline-block;" +
          (n.all && !n.addEventListener ? "*display:inline;*zoom:1;'" : "'"),
        f = function(e, t) {
          var i = -1 !== (e = e || "").indexOf("++"),
            n = 1;
          return (
            i && (e = e.split("++").join("")),
            function() {
              return (
                "<" + t + d + (e ? " class='" + e + (i ? n++ : "") + "'>" : ">")
              );
            }
          );
        },
        p = (i.SplitText = t.SplitText = function(e, t) {
          if (("string" == typeof e && (e = p.selector(e)), !e))
            throw "cannot split a null element.";
          (this.elements = r(e)
            ? (function(e) {
                var t,
                  i,
                  n,
                  s = [],
                  a = e.length;
                for (t = 0; t < a; t++)
                  if (((i = e[t]), r(i)))
                    for (n = i.length, n = 0; n < i.length; n++) s.push(i[n]);
                  else s.push(i);
                return s;
              })(e)
            : [e]),
            (this.chars = []),
            (this.words = []),
            (this.lines = []),
            (this._originals = []),
            (this.vars = t || {}),
            this.split(t);
        }),
        g = function e(t, i, n) {
          var s = t.nodeType;
          if (1 === s || 9 === s || 11 === s)
            for (t = t.firstChild; t; t = t.nextSibling) e(t, i, n);
          else
            (3 !== s && 4 !== s) ||
              (t.nodeValue = t.nodeValue.split(i).join(n));
        },
        v = function(e, t) {
          for (var i = t.length; --i > -1; ) e.push(t[i]);
        },
        y = function(e, t, i) {
          for (var n; e && e !== t; ) {
            if ((n = e._next || e.nextSibling))
              return n.textContent.charAt(0) === i;
            e = e.parentNode || e._parent;
          }
          return !1;
        },
        b = function e(t) {
          var i,
            n,
            s = m(t.childNodes),
            a = s.length;
          for (i = 0; i < a; i++)
            (n = s[i])._isSplit
              ? e(n)
              : (i && 3 === n.previousSibling.nodeType
                  ? (n.previousSibling.nodeValue +=
                      3 === n.nodeType ? n.nodeValue : n.firstChild.nodeValue)
                  : 3 !== n.nodeType && t.insertBefore(n.firstChild, n),
                t.removeChild(n));
        },
        x = function(e, t, i, a, r, l, h) {
          var u,
            c,
            d,
            f,
            p,
            m,
            x,
            w,
            k,
            _,
            T,
            S,
            P = s(e),
            E = o(e, "paddingLeft", P),
            C = -999,
            O = o(e, "borderBottomWidth", P) + o(e, "borderTopWidth", P),
            L = o(e, "borderLeftWidth", P) + o(e, "borderRightWidth", P),
            j = o(e, "paddingTop", P) + o(e, "paddingBottom", P),
            A = o(e, "paddingLeft", P) + o(e, "paddingRight", P),
            M = 0.2 * o(e, "fontSize"),
            z = o(e, "textAlign", P, !0),
            N = [],
            I = [],
            F = [],
            B = t.wordDelimiter || " ",
            q = t.span ? "span" : "div",
            D = t.type || t.split || "chars,words,lines",
            R = r && -1 !== D.indexOf("lines") ? [] : null,
            V = -1 !== D.indexOf("words"),
            U = -1 !== D.indexOf("chars"),
            W = "absolute" === t.position || !0 === t.absolute,
            H = t.linesClass,
            G = -1 !== (H || "").indexOf("++"),
            K = [];
          for (
            G && (H = H.split("++").join("")),
              d = (c = e.getElementsByTagName("*")).length,
              p = [],
              u = 0;
            u < d;
            u++
          )
            p[u] = c[u];
          if (R || W)
            for (u = 0; u < d; u++)
              ((m = (f = p[u]).parentNode === e) || W || (U && !V)) &&
                ((S = f.offsetTop),
                R &&
                  m &&
                  Math.abs(S - C) > M &&
                  ("BR" !== f.nodeName || 0 === u) &&
                  ((x = []), R.push(x), (C = S)),
                W &&
                  ((f._x = f.offsetLeft),
                  (f._y = S),
                  (f._w = f.offsetWidth),
                  (f._h = f.offsetHeight)),
                R &&
                  (((f._isSplit && m) ||
                    (!U && m) ||
                    (V && m) ||
                    (!V &&
                      f.parentNode.parentNode === e &&
                      !f.parentNode._isSplit)) &&
                    (x.push(f), (f._x -= E), y(f, e, B) && (f._wordEnd = !0)),
                  "BR" === f.nodeName &&
                    ((f.nextSibling && "BR" === f.nextSibling.nodeName) ||
                      0 === u) &&
                    R.push([])));
          for (u = 0; u < d; u++)
            (m = (f = p[u]).parentNode === e),
              "BR" !== f.nodeName
                ? (W &&
                    ((k = f.style),
                    V ||
                      m ||
                      ((f._x += f.parentNode._x), (f._y += f.parentNode._y)),
                    (k.left = f._x + "px"),
                    (k.top = f._y + "px"),
                    (k.position = "absolute"),
                    (k.display = "block"),
                    (k.width = f._w + 1 + "px"),
                    (k.height = f._h + "px")),
                  !V && U
                    ? f._isSplit
                      ? ((f._next = f.nextSibling), f.parentNode.appendChild(f))
                      : f.parentNode._isSplit
                        ? ((f._parent = f.parentNode),
                          !f.previousSibling &&
                            f.firstChild &&
                            (f.firstChild._isFirst = !0),
                          f.nextSibling &&
                            " " === f.nextSibling.textContent &&
                            !f.nextSibling.nextSibling &&
                            K.push(f.nextSibling),
                          (f._next =
                            f.nextSibling && f.nextSibling._isFirst
                              ? null
                              : f.nextSibling),
                          f.parentNode.removeChild(f),
                          p.splice(u--, 1),
                          d--)
                        : m ||
                          ((S = !f.nextSibling && y(f.parentNode, e, B)),
                          f.parentNode._parent &&
                            f.parentNode._parent.appendChild(f),
                          S && f.parentNode.appendChild(n.createTextNode(" ")),
                          t.span && (f.style.display = "inline"),
                          N.push(f))
                    : f.parentNode._isSplit && !f._isSplit && "" !== f.innerHTML
                      ? I.push(f)
                      : U &&
                        !f._isSplit &&
                        (t.span && (f.style.display = "inline"), N.push(f)))
                : R || W
                  ? (f.parentNode && f.parentNode.removeChild(f),
                    p.splice(u--, 1),
                    d--)
                  : V || e.appendChild(f);
          for (u = K.length; --u > -1; ) K[u].parentNode.removeChild(K[u]);
          if (R) {
            for (
              W &&
                ((_ = n.createElement(q)),
                e.appendChild(_),
                (T = _.offsetWidth + "px"),
                (S = _.offsetParent === e ? 0 : e.offsetLeft),
                e.removeChild(_)),
                k = e.style.cssText,
                e.style.cssText = "display:none;";
              e.firstChild;

            )
              e.removeChild(e.firstChild);
            for (
              w = " " === B && (!W || (!V && !U)), u = 0;
              u < R.length;
              u++
            ) {
              for (
                x = R[u],
                  (_ = n.createElement(q)).style.cssText =
                    "display:block;text-align:" +
                    z +
                    ";position:" +
                    (W ? "absolute;" : "relative;"),
                  H && (_.className = H + (G ? u + 1 : "")),
                  F.push(_),
                  d = x.length,
                  c = 0;
                c < d;
                c++
              )
                "BR" !== x[c].nodeName &&
                  ((f = x[c]),
                  _.appendChild(f),
                  w && f._wordEnd && _.appendChild(n.createTextNode(" ")),
                  W &&
                    (0 === c &&
                      ((_.style.top = f._y + "px"),
                      (_.style.left = E + S + "px")),
                    (f.style.top = "0px"),
                    S && (f.style.left = f._x - S + "px")));
              0 === d
                ? (_.innerHTML = "&nbsp;")
                : V || U || (b(_), g(_, String.fromCharCode(160), " ")),
                W && ((_.style.width = T), (_.style.height = f._h + "px")),
                e.appendChild(_);
            }
            e.style.cssText = k;
          }
          W &&
            (h > e.clientHeight &&
              ((e.style.height = h - j + "px"),
              e.clientHeight < h && (e.style.height = h + O + "px")),
            l > e.clientWidth &&
              ((e.style.width = l - A + "px"),
              e.clientWidth < l && (e.style.width = l + L + "px"))),
            v(i, N),
            v(a, I),
            v(r, F);
        },
        w = function e(t, i, s, a) {
          var r,
            d,
            f = m(t.childNodes),
            p = f.length,
            v = "absolute" === i.position || !0 === i.absolute;
          if (3 !== t.nodeType || p > 1) {
            for (i.absolute = !1, r = 0; r < p; r++)
              (3 !== (d = f[r]).nodeType || /\S+/.test(d.nodeValue)) &&
                (v &&
                  3 !== d.nodeType &&
                  "inline" === o(d, "display", null, !0) &&
                  ((d.style.display = "inline-block"),
                  (d.style.position = "relative")),
                (d._isSplit = !0),
                e(d, i, s, a));
            return (i.absolute = v), void (t._isSplit = !0);
          }
          !(function(e, t, i, s) {
            var a,
              o,
              r,
              d,
              f,
              p,
              v,
              m,
              y,
              b,
              x = t.span ? "span" : "div",
              w =
                -1 !==
                (t.type || t.split || "chars,words,lines").indexOf("chars"),
              k = "absolute" === t.position || !0 === t.absolute,
              _ = t.wordDelimiter || " ",
              T = " " !== _ ? "" : k ? "&#173; " : " ",
              S = t.span ? "</span>" : "</div>",
              P = !0,
              E = t.specialChars
                ? "function" == typeof t.specialChars ? t.specialChars : l
                : null,
              C = n.createElement("div"),
              O = e.parentNode;
            for (
              O.insertBefore(C, e),
                C.textContent = e.nodeValue,
                O.removeChild(e),
                v =
                  -1 !==
                  (a = (function e(t) {
                    var i = t.nodeType,
                      n = "";
                    if (1 === i || 9 === i || 11 === i) {
                      if ("string" == typeof t.textContent)
                        return t.textContent;
                      for (t = t.firstChild; t; t = t.nextSibling) n += e(t);
                    } else if (3 === i || 4 === i) return t.nodeValue;
                    return n;
                  })((e = C))).indexOf("<"),
                !1 !== t.reduceWhiteSpace &&
                  (a = a.replace(u, " ").replace(h, "")),
                v && (a = a.split("<").join("{{LT}}")),
                f = a.length,
                o = (" " === a.charAt(0) ? T : "") + i(),
                r = 0;
              r < f;
              r++
            )
              if (
                ((p = a.charAt(r)), E && (b = E(a.substr(r), t.specialChars)))
              )
                (p = a.substr(r, b || 1)),
                  (o += w && " " !== p ? s() + p + "</" + x + ">" : p),
                  (r += b - 1);
              else if (p === _ && a.charAt(r - 1) !== _ && r) {
                for (o += P ? S : "", P = !1; a.charAt(r + 1) === _; )
                  (o += T), r++;
                r === f - 1
                  ? (o += T)
                  : ")" !== a.charAt(r + 1) && ((o += T + i()), (P = !0));
              } else
                "{" === p && "{{LT}}" === a.substr(r, 6)
                  ? ((o += w ? s() + "{{LT}}</" + x + ">" : "{{LT}}"), (r += 5))
                  : (p.charCodeAt(0) >= 55296 && p.charCodeAt(0) <= 56319) ||
                    (a.charCodeAt(r + 1) >= 65024 &&
                      a.charCodeAt(r + 1) <= 65039)
                    ? ((m = c(a.substr(r, 2))),
                      (y = c(a.substr(r + 2, 2))),
                      (d =
                        (m >= 127462 &&
                          m <= 127487 &&
                          y >= 127462 &&
                          y <= 127487) ||
                        (y >= 127995 && y <= 127999)
                          ? 4
                          : 2),
                      (o +=
                        w && " " !== p
                          ? s() + a.substr(r, d) + "</" + x + ">"
                          : a.substr(r, d)),
                      (r += d - 1))
                    : (o += w && " " !== p ? s() + p + "</" + x + ">" : p);
            (e.outerHTML = o + (P ? S : "")), v && g(O, "{{LT}}", "<");
          })(t, i, s, a);
        },
        k = p.prototype;
      (k.split = function(e) {
        this.isSplit && this.revert(),
          (this.vars = e = e || this.vars),
          (this._originals.length = this.chars.length = this.words.length = this.lines.length = 0);
        for (
          var t,
            i,
            n,
            s = this.elements.length,
            a = e.span ? "span" : "div",
            o = f(e.wordsClass, a),
            r = f(e.charsClass, a);
          --s > -1;

        )
          (n = this.elements[s]),
            (this._originals[s] = n.innerHTML),
            (t = n.clientHeight),
            (i = n.clientWidth),
            w(n, e, o, r),
            x(n, e, this.chars, this.words, this.lines, i, t);
        return (
          this.chars.reverse(),
          this.words.reverse(),
          this.lines.reverse(),
          (this.isSplit = !0),
          this
        );
      }),
        (k.revert = function() {
          if (!this._originals) throw "revert() call wasn't scoped properly.";
          for (var e = this._originals.length; --e > -1; )
            this.elements[e].innerHTML = this._originals[e];
          return (
            (this.chars = []),
            (this.words = []),
            (this.lines = []),
            (this.isSplit = !1),
            this
          );
        }),
        (p.selector =
          e.$ ||
          e.jQuery ||
          function(t) {
            var i = e.$ || e.jQuery;
            return i
              ? ((p.selector = i), i(t))
              : "undefined" == typeof document
                ? t
                : document.querySelectorAll
                  ? document.querySelectorAll(t)
                  : document.getElementById(
                      "#" === t.charAt(0) ? t.substr(1) : t
                    );
          }),
        (p.version = "0.6.1");
    })(ee.e);
    var Ae = ee.g.SplitText;
    function Me(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = new Array(e.length); t < e.length; t++)
              i[t] = e[t];
            return i;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function ze(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var Ne = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          f(this, ["toggle"]),
          (this.el = document.querySelector(".js-day-night")),
          (this.dom = {




          }),
          (this.state = { toggled: !1, animating: !1 }),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "classToggle",
            value: function() {
              this.el.classList.contains("is-switch-day")
                ? (this.el.classList.remove("is-switch-day"),
                  this.el.classList.add("is-switch-night"))
                : (this.el.classList.remove("is-switch-night"),
                  this.el.classList.add("is-switch-day"));
            }
          },
          {
            key: "createTimelines",
            value: function() {
              var e = this;
              (this.tl = {}),
                (this.tl.one = new TimelineLite({
                  paused: !0,
                  onComplete: function() {
                    e.state.animating = !1;
                  }
                })),
                (this.tl.two = new TimelineLite({
                  paused: !0,
                  onComplete: function() {
                    e.state.animating = !1;
                  }
                }));
              var
                n = this.dom.content,
                o = new Ae(s, { type: "lines" }),
                r = new Ae(a, { type: "lines" });
              this.tl.one
                .set(s, { autoAlpha: 1 })
                .fromTo(
                  n,
                  1,
                  { xPercent: 150 },
                  { xPercent: 0, ease: Power3.easeInOut },
                  0
                )
                .fromTo(
                  i,
                  0.5,
                  { xPercent: 0 },
                  { xPercent: 200, ease: Power3.easeIn },
                  0
                )
                .fromTo(
                  t,
                  0.5,
                  { xPercent: -200 },
                  { xPercent: 0, ease: Power3.easeOut },
                  0.5
                )
                .fromTo(
                  s,
                  0.75,
                  { scaleX: 1.15 },
                  { scale: 1, ease: Power3.easeOut },
                  0.65
                )
                .staggerFromTo(
                  r.lines,
                  0.35,
                  { x: 0 },
                  { x: 30, ease: Power3.easeIn },
                  0.075,
                  0
                )
                .staggerFromTo(
                  r.lines,
                  0.35,
                  { alpha: 1 },
                  { alpha: 0, ease: Linear.easeNone },
                  0.075,
                  0
                )
                .staggerFromTo(
                  o.lines,
                  0.75,
                  { x: -30 },
                  { x: 0, ease: Power3.easeOut },
                  0.075,
                  0.65
                )
                .staggerFromTo(
                  o.lines,
                  0.75,
                  { alpha: 0 },
                  { alpha: 1, ease: Linear.easeNone },
                  0.075,
                  0.65
                )
                .set(a, { autoAlpha: 0 }),
                this.tl.two
                  .set(a, { autoAlpha: 1 })
                  .fromTo(
                    n,
                    1,
                    { xPercent: 0 },
                    { xPercent: 150, ease: Power3.easeInOut },
                    0
                  )
                  .fromTo(
                    t,
                    0.5,
                    { xPercent: 0 },
                    { xPercent: 200, ease: Power3.easeIn },
                    0
                  )
                  .fromTo(
                    i,
                    0.5,
                    { xPercent: -200 },
                    { xPercent: 0, ease: Power3.easeOut },
                    0.5
                  )
                  .fromTo(
                    a,
                    0.75,
                    { scaleX: 1.15 },
                    { scale: 1, ease: Power3.easeOut },
                    0.65
                  )
                  .staggerFromTo(
                    o.lines,
                    0.35,
                    { x: 0 },
                    { x: 30, ease: Power3.easeIn },
                    0.075,
                    0
                  )
                  .staggerFromTo(
                    o.lines,
                    0.35,
                    { alpha: 1 },
                    { alpha: 0, ease: Linear.easeNone },
                    0.075,
                    0
                  )
                  .staggerFromTo(
                    r.lines,
                    0.75,
                    { x: -30 },
                    { x: 0, ease: Power3.easeOut },
                    0.075,
                    0.65
                  )
                  .staggerFromTo(
                    r.lines,
                    0.75,
                    { alpha: 0 },
                    { alpha: 1, ease: Linear.easeNone },
                    0.075,
                    0.65
                  )
                  .set(s, { autoAlpha: 0 }),
                this.tl.one.progress(1);
            }
          },
          {
            key: "toggle",
            value: function() {
              this.state.animating ||
                ((this.state.animating = !0),
                this.classToggle(),
                this.state.toggled
                  ? (this.tl.one.restart(), (this.state.toggled = !1))
                  : (this.tl.two.restart(), (this.state.toggled = !0)));
            }
          },
          {
            key: "addListeners",
            value: function() {
              this.dom.switch.addEventListener("click", this.toggle);
            }
          },
          {
            key: "init",
            value: function() {
              this.createTimelines(), this.addListeners();
            }
          }
        ]) && ze(t.prototype, i),
        n && ze(t, n),
        e
      );
    })();
    function Ie(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = new Array(e.length); t < e.length; t++)
              i[t] = e[t];
            return i;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function Fe(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    var Be = (function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.el = document.querySelector(".js-details")),
          (this.dom = {
            btn: {
              open: Ie(document.querySelectorAll(".js-details-open")),
              close: Ie(this.el.querySelectorAll(".js-details-close"))
            }
          }),
          (this.state = { updating: !1 }),
          (this.tl = { open: null, close: null }),
          (this.smooth = null),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "open",
            value: function() {
              (this.smooth = new ke({ el: this.el })),
                (this.tl.open = new TimelineLite({ paused: !0 })),
                this.tl.open
                  .set(this.el, { autoAlpha: 1 })
                  .set(".js-details-close__line--1", {
                    transformOrigin: "top left"
                  })
                  .set(".js-details-close__line--2", {
                    transformOrigin: "top right"
                  })
                  .fromTo(
                    ".js-details__overlay",
                    1,
                    { alpha: 0 },
                    { alpha: 1, ease: Linear.easeNone },
                    0
                  )
                  .fromTo(
                    ".js-details__inner",
                    1.25,
                    { xPercent: -100 },
                    { xPercent: 0, ease: Expo.easeInOut },
                    0
                  )
                  .fromTo(
                    ".js-details__content",
                    1.25,
                    { xPercent: 75 },
                    { xPercent: 0, ease: Expo.easeInOut },
                    0
                  )
                  .fromTo(
                    ".js-details__underline",
                    1.5,
                    { scaleX: 0 },
                    { scaleX: 1, ease: Expo.easeInOut },
                    0.5
                  )
                  .staggerFromTo(
                    ".js-details-close__line",
                    0.9,
                    { scaleX: 0 },
                    { scaleX: 1, ease: Expo.easeInOut },
                    0.25,
                    1.25
                  )
                  .fromTo(
                    ".js-details-close__svg",
                    0.9,
                    { alpha: 0 },
                    { alpha: 1, ease: Linear.easeNone },
                    1.25
                  ),
                this.tl.open.play();
            }
          },
          {
            key: "close",
            value: function() {
              (this.tl.close = new TimelineLite({
                paused: !0,
                onComplete: this.smooth.destroy()
              })),
                this.tl.close
                  .to(
                    ".js-details__inner",
                    1.25,
                    { xPercent: -100, ease: Expo.easeInOut },
                    0
                  )
                  .to(
                    ".js-details__content",
                    1.25,
                    { xPercent: 75, ease: Expo.easeInOut },
                    0
                  )
                  .to(
                    ".js-details__overlay",
                    1,
                    { alpha: 0, ease: Linear.easeNone },
                    0
                  )
                  .set(this.el, { autoAlpha: 0 }),
                this.tl.close.play();
            }
          },
          {
            key: "addListeners",
            value: function() {
              var e = this;
              this.dom.btn.open.forEach(function(t) {
                t.addEventListener("click", function() {
                  e.open();
                });
              }),
                this.dom.btn.close.forEach(function(t) {
                  t.addEventListener("click", function() {
                    e.close();
                  });
                });
            }
          },
          {
            key: "init",
            value: function() {
              this.addListeners();
            }
          }
        ]) && Fe(t.prototype, i),
        n && Fe(t, n),
        e
      );
    })();
    function qe(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = new Array(e.length); t < e.length; t++)
              i[t] = e[t];
            return i;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        })()
      );
    }
    function De(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    new ((function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          this.setup(),
          this.init();
      }
      var t, i, n;
      return (
        (t = e),
        (i = [
          {
            key: "setup",
            value: function() {
              s.a.addClasses(l.body),
                Object.assign(l, s.a.getInfos()),
                Object.assign(l.isWebp, r.a),
                r.a
                  ? l.body.classList.add("is-webp")
                  : l.body.classList.add("is-not-webp");
            }
          },
          {
            key: "init",
            value: function() {
              var e = this;

                new L({ el: document.querySelector("[data-smooth]") }),
                new K(),
                new J();
              this.initHovers()

            }
          },
          {
            key: "initOnLoad",
            value: function() {
              new Ne(), new Se(), new de(), new ge(), new Be();
            }
          },
          {
            key: "initHovers",
            value: function() {
              var e = qe(document.querySelectorAll(".js-btn")),
                t = qe(document.querySelectorAll(".js-btn-outline")),
                i = qe(document.querySelectorAll(".js-photos-img__canvas"));
              e.forEach(function(e) {
                new Ee(e);
              }),
                t.forEach(function(e) {
                  new Oe(e);
                }),
                i.forEach(function(e) {
                  new je(e);
                });
            }
          }
        ]) && De(t.prototype, i),
        n && De(t, n),
        e
      );
    })())();
  }
});
