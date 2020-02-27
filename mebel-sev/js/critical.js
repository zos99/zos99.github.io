var viewportWidth = document.documentElement.clientWidth,
  viewportHeight = document.documentElement.clientHeight,
  bannerID;

function recalcViewport() {
  viewportWidth = document.documentElement.clientWidth, viewportHeight = document.documentElement.clientHeight
}

function findIndexByKeyValue(arraytosearch, key, valuetosearch) {
  for (var i = 0; i < arraytosearch.length; i++)
    if (arraytosearch[i][key] == valuetosearch) return i;
  return null
}

function getDigits(info) {
  return info.replace(/\D+/g, "")
}

function contains(needle) {
  var findNaN = needle != needle;
  return -1 < (findNaN || "function" != typeof Array.prototype.indexOf ? function(needle) {
    var i = -1,
      index = -1;
    for (i = 0; i < this.length; i++) {
      var item = this[i];
      if (findNaN && item != item || item === needle) {
        index = i;
        break
      }
    }
    return index
  } : Array.prototype.indexOf).call(this, needle)
}

function toJSON(data) {
  var arr = {};
  data = data.split("&");
  for (var i = 0; i < data.length; i++) {
    var param = data[i].split("=");
    arr[param[0]] = param[1]
  }
  return arr
}

function toSerialize(obj) {
  var str = [];
  for (var p in obj) obj.hasOwnProperty(p) && str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&")
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function isEmpty(obj) {
  for (var key in obj) return !1;
  return !0
}

function compileDom(elemClass) {
  if (void 0 !== elemClass && "function" == typeof angular.element && $(elemClass).length) {
    $(elemClass).each(function() {
      var content = $(this);
      angular.element("body").injector().invoke(function($compile) {
        var scope;
        content.length && (scope = angular.element(content).scope());
        try {
          $compile(content)(scope)
        } catch (e) {}
      })
    });
    try {
      myLazyLoad.update()
    } catch (e) {}
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments,
      callNow = immediate && !timeout;
    clearTimeout(timeout), timeout = setTimeout(function() {
      timeout = null, immediate || func.apply(context, args)
    }, wait), callNow && func.apply(context, args)
  }
}

function setCookie(name, value, options) {
  var expires = (options = options || {}).expires;
  if ("number" == typeof expires && expires) {
    var d = new Date;
    d.setTime(d.getTime() + 1e3 * expires), expires = options.expires = d
  }
  expires && expires.toUTCString && (options.expires = expires.toUTCString());
  var updatedCookie = name + "=" + (value = encodeURIComponent(value));
  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    !0 !== propValue && (updatedCookie += "=" + propValue)
  }
  document.cookie = updatedCookie
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : void 0
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

function searchToObject() {
  var pair, i, pairs = window.location.search.substring(1).split("&"),
    obj = {};
  for (i in pairs)
    if ("" !== pairs[i]) try {
      pair = pairs[i].split("="), obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
    } catch (e) {
      console.warn(e)
    }
  return obj
}

function getBrowserInfo() {
  var tem, ua = navigator.userAgent,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  return /trident/i.test(M[1]) ? "IE " + ((tem = /\brv[ :]+(\d+)/g.exec(ua) || [])[1] || "") : "Chrome" === M[1] && null != (tem = ua.match(/\b(OPR|Edge)\/(\d+)/)) ? tem.slice(1).join(" ").replace("OPR", "Opera") : (M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (tem = ua.match(/version\/(\d+)/i)) && M.splice(1, 1, tem[1]), M.join(" "))
}
0 < +$(".box-offer").data("banner-id") && (getCookie("banner_id") == $(".box-offer").data("banner-id") && ($(".box-offer").hide(), $(window).resize()), $(".offer-close").click(function() {
  setCookie("banner_id", bannerID = +$(this).closest(".box-offer").data("banner-id"), {
    expires: 2592e3
  }), $(".box-offer").hide(), $(window).resize()
}));

function stopAllVideo(elem) {
  $(".lazy-video", elem).each(function() {
    var newSrc = noAutoplay($(this).attr("src"), "autoplay=1");
    $(this).attr("src", newSrc)
  })
}

function noAutoplay(str, term) {
  var autoplay = new RegExp("(" + term + ")", "gi");
  return str.replace(autoplay, "autoplay=0")
}

function listenRecaptchaClose(elem) {
  var myRecaptchaParent;
  $(document).find("iframe").each(function(i) {
    $(this)[0].hasAttribute("src") && -1 != $(this).attr("src").indexOf("google.com/recaptcha/api2/bframe") && (myRecaptchaParent = this.parentNode.parentNode, new MutationObserver(function(x) {
      return 0 == myRecaptchaParent.style.opacity && onCloseRecaptcha(elem)
    }).observe(myRecaptchaParent, {
      attributes: !0,
      attributeFilter: ["style"]
    }))
  })
}

function onCloseRecaptcha(elem) {
  elem.removeClass("has-loader")
}
$.fn.isInViewport = function() {
  var elementData = {},
    elementTop = $(this).offset().top,
    elementBottom = elementTop + $(this).outerHeight(),
    viewportTop = $(window).scrollTop(),
    viewportBottom = viewportTop + $(window).height();
  return elementData.elementTop = elementTop, elementData.elementBottom = elementBottom, elementData.viewportTop = viewportTop, elementData.viewportBottom = viewportBottom, elementData.isInViewport = viewportTop < elementBottom && elementTop < viewportBottom, elementData
}, jQuery.event.special.doubletap = {
  bindType: "touchend",
  delegateType: "touchend",
  handle: function(event) {
    var handleObj = event.handleObj,
      targetData = jQuery.data(event.target),
      now = (new Date).getTime(),
      delta = targetData.lastTouch ? now - targetData.lastTouch : 0,
      delay = null == delay ? 300 : delay;
    delta < delay && 30 < delta ? (targetData.lastTouch = null, event.type = handleObj.origType, ["clientX", "clientY", "pageX", "pageY"].forEach(function(property) {
      event[property] = event.originalEvent.changedTouches[0][property]
    }), handleObj.handler.apply(this, arguments)) : targetData.lastTouch = now
  }
};
var simulateClick = function(elem) {
  var evt = new MouseEvent("click", {
    bubbles: !0,
    cancelable: !0,
    view: window
  });
  elem.dispatchEvent(evt)
};

function iOSnoScroll() {
  var _overlay = document.querySelector(".mfp-wrap"),
    _clientY = null;
  _overlay.addEventListener("touchstart", function(event) {
    1 === event.targetTouches.length && (_clientY = event.targetTouches[0].clientY)
  }, !1), _overlay.addEventListener("touchmove", function(event) {
    1 === event.targetTouches.length && function(event) {
      var clientY = event.targetTouches[0].clientY - _clientY;
      0 === _overlay.scrollTop && 0 < clientY && event.preventDefault();
      _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight && clientY < 0 && event.preventDefault()
    }(event)
  }, !1)
}

function removeFromArray(array, element) {
  return array.filter(function(e) {
    return e !== element
  })
}

function pagePreloader(show) {
  show ? $("body").addClass("has-loader") : $("body").removeClass("has-loader")
}

function elementPreloader(selector, show) {
  $(selector).length && (show ? $(selector).addClass("has-loader") : $(selector).removeClass("has-loader"))
}

function startTimer(duration, display) {
  var minutes, seconds, timerInterval, timer = duration;
  timerInterval = setInterval(function() {
    minutes = parseInt(timer / 60, 10), seconds = (seconds = parseInt(timer % 60, 10)) < 10 ? "0" + seconds : seconds, "string" == typeof display ? $(display).html(minutes + "&nbsp;мин.&nbsp;" + seconds + "&nbsp;сек.") : display.html(minutes + "&nbsp;мин.&nbsp;" + seconds + "&nbsp;сек."), --timer < 0 && (timer = 0)
  }, 1e3), startTimer.id && clearInterval(startTimer.id), startTimer.id = timerInterval
}
var isCyrillicSymbol = function(symbol) {
  return "А" <= symbol && symbol <= "я" || "Ё" == symbol || "ё" == symbol
};

function isInt(n) {
  return Number(n) === n && n % 1 == 0
}

function isFloat(n) {
  return Number(n) === n && n % 1 != 0
}

function decimalZero(val) {
  return parseFloat(val).toFixed(1)
}
var is_touch_device = function() {
  var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || window.navigator.maxTouchPoints) || function(query) {
    return window.matchMedia(query).matches
  }(["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(""))
};
$(function() {
    $(".box-sideinfo__options").length && "Выбрать" !== $(".box-sideinfo__options .option .bs-placeholder").attr("title") && $(".box-sideinfo__options .option").children(".elem-select-custom").addClass("has-spinner")
  }),
  function() {
    "use strict";
    angular.module("MassAutoComplete", []).provider("massAutocompleteConfig", function() {
      var e = this;
      e.KEYS = {
        TAB: 9,
        ESC: 27,
        ENTER: 13,
        UP: 38,
        DOWN: 40
      }, e.EVENTS = {
        KEYDOWN: "keydown",
        RESIZE: "resize",
        BLUR: "blur"
      }, e.DEBOUNCE = {
        position: 150,
        attach: 300,
        suggest: 200,
        blur: 150
      }, e.generate_random_id = function(e) {
        return e + "_" + Math.random().toString().substring(2)
      }, e.position_autocomplete = function(e, t) {
        if (void 0 !== t) {
          var n = t[0].getBoundingClientRect(),
            o = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset,
            i = document.body.scrollLeft || document.documentElement.scrollLeft || window.pageXOffset;
          e[0].style.top = n.top + n.height + o + "px", e[0].style.left = n.left + i + "px", e[0].style.width = n.width + "px"
        }
      }, e.CLASSES = {
        container: "ac-container",
        menu: "ac-menu",
        menu_item: "ac-menu-item",
        menu_item_focus: "ac-state-focus"
      }, this.$get = function() {
        return e
      }
    }).directive("massAutocomplete", ["massAutocompleteConfig", "$timeout", "$window", "$document", "$q", function(e, t, n, o, i) {
      return {
        restrict: "A",
        scope: {
          options: "&massAutocomplete"
        },
        transclude: !0,
        template: '<span ng-transclude></span><div class="' + e.CLASSES.container + '"aria-autocomplete="list" role="listbox" ng-show="show_autocomplete"><ul class="' + e.CLASSES.menu + '"> <li ng-repeat="result in results" ng-if="$index > 0" class="' + e.CLASSES.menu_item + '" role="option" id="{{result.id}}" ng-class="$index == selected_index ? \'' + e.CLASSES.menu_item_focus + '\': \'\'"><a ng-click="apply_selection($index)" ng-bind-html="result.label"></a></li></ul></div>',
        link: function(e, t) {
          e.container = angular.element(t[0].getElementsByClassName("ac-container")[0]), e.container[0].style.position = "absolute"
        },
        controller: ["$scope", function(a) {
          function c() {
            a.show_autocomplete = !0
          }

          function u() {
            a.show_autocomplete = !1, a.selected_index = -1, a.container[0].removeAttribute("aria-activedescendant"), y = void 0
          }

          function l(e, n, o) {
            var i;
            return function() {
              var a = this,
                c = arguments,
                l = o && !i;
              t.cancel(i), i = t(function() {
                i = null, o || e.apply(a, c)
              }, n), l && e.apply(a, c)
            }
          }

          function s(t) {
            return !(t.id && "" !== t.id || (t.id = e.generate_random_id("ac_element"), 0))
          }

          function r() {
            e.position_autocomplete(a.container, b)
          }

          function m(e) {
            S.$modelValue !== e && (S.$setViewValue(e), S.$render())
          }

          function f(e) {
            var t = a.results[e];
            return b.val(t.value), a.selected_index = e, a.container[0].setAttribute("aria-activedescendant", t.id), t
          }

          function _() {
            angular.element(n).bind(e.EVENTS.RESIZE, V), h[e.EVENTS.BLUR] = function() {
              t(function() {
                b && b[0] === o[0].activeElement || g.detach()
              }, $.debounce_blur)
            }, b.bind(e.EVENTS.BLUR, h[e.EVENTS.BLUR]), h[e.EVENTS.KEYDOWN] = function(t) {
              if (!t.shiftKey) switch (t.keyCode) {
                case e.KEYS.ESC:
                  a.show_autocomplete ? (u(), a.$apply()) : b.val(N);
                  break;
                case e.KEYS.ENTER:
                  a.show_autocomplete && 0 < a.selected_index && !a.waiting_for_suggestion && (a.apply_selection(a.selected_index), t.stopPropagation(), t.preventDefault()), u(), a.$apply();
                  break;
                case e.KEYS.TAB:
                  if (!a.show_autocomplete) break;
                  t.preventDefault();
                case e.KEYS.DOWN:
                  0 < a.results.length && (a.show_autocomplete ? f(a.selected_index + 1 > a.results.length - 1 ? 0 : a.selected_index + 1) : (c(), f(0)), a.$apply());
                  break;
                case e.KEYS.UP:
                  a.show_autocomplete && (t.preventDefault(), f(0 <= a.selected_index - 1 ? a.selected_index - 1 : a.results.length - 1), a.$apply())
              }
            }, b.bind(e.EVENTS.KEYDOWN, h[e.EVENTS.KEYDOWN])
          }
          var g = this,
            h = {};
          h[e.EVENTS.BLUR] = null, h[e.EVENTS.KEYDOWN] = null, h[e.EVENTS.RESIZE] = null;
          var b, S, v, N, w, y, A, T = a.options() || {},
            $ = {
              debounce_position: T.debounce_position || e.DEBOUNCE.position,
              debounce_attach: T.debounce_attach || e.DEBOUNCE.attach,
              debounce_suggest: T.debounce_suggest || e.DEBOUNCE.suggest,
              debounce_blur: T.debounce_blur || e.DEBOUNCE.blur
            };
          a.show_autocomplete = !1;
          var V = l(r, $.debounce_position),
            x = l(function(t, n) {
              a.selected_index = 0, a.waiting_for_suggestion = !0, "string" == typeof t && 0 < t.length ? i.when(v.suggest(t), function(o) {
                b && b === n && (o && 0 < o.length ? (o.forEach(function(t) {
                  t.id || (t.id = e.generate_random_id("ac_item"))
                }), a.results = [{
                  value: t,
                  label: "",
                  id: ""
                }].concat(o), c(), v.auto_select_first && f(1)) : (a.results = [], u()))
              }, function(e) {
                u(), v.on_error && v.on_error(e)
              }).finally(function() {
                a.waiting_for_suggestion = !1
              }) : (a.waiting_for_suggestion = !1, u(), a.$apply())
            }, $.debounce_suggest);
          g.attach = l(function(e, t, n) {
            b !== t && (b && g.detach(), t[0] === o[0].activeElement && (n.on_attach && n.on_attach(), b = t, v = n, N = (S = e).$viewValue, A = s(t), a.container[0].setAttribute("aria-labelledby", b.id), a.results = [], a.selected_index = -1, _(), w = a.$watch(function() {
              return e.$modelValue
            }, function(e) {
              e !== y && (r(), x(e, b))
            })))
          }, $.debounce_attach), g.detach = function() {
            if (b) {
              var t = b.val();
              m(t), v.on_detach && v.on_detach(t), b.unbind(e.EVENTS.KEYDOWN, h[e.EVENTS.KEYDOWN]), b.unbind(e.EVENTS.BLUR, h[e.EVENTS.BLUR]), A && b[0].removeAttribute("id")
            }
            u(), a.container[0].removeAttribute("aria-labelledby"), angular.element(n).unbind(e.EVENTS.RESIZE, h[e.EVENTS.RESIZE]), w && w(), a.selected_index = a.results = void 0, S = b = N = void 0
          }, a.apply_selection = function(e) {
            if (b[0].focus(), !(!a.show_autocomplete || e > a.results.length || e < 0)) {
              var t = f(e);
              y = t.value, m(t.value), u(), v.on_select && v.on_select(t)
            }
          }, a.$on("$destroy", function() {
            g.detach(), a.container.remove()
          })
        }]
      }
    }]).directive("massAutocompleteItem", function() {
      return {
        restrict: "A",
        require: ["^massAutocomplete", "ngModel"],
        scope: {
          massAutocompleteItem: "&"
        },
        link: function(e, t, n, o) {
          n.$set("autocomplete", "off");
          var i = o[0],
            a = o[1];
          t.bind("focus", function() {
            var n = e.massAutocompleteItem();
            if (!n) throw new Error("Invalid options");
            i.attach(a, t, n)
          })
        }
      }
    })
  }();
var Autocomplete = function() {
    "use strict";

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
      }
    }

    function _defineProperty(obj, key, value) {
      return key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : obj[key] = value, obj
    }

    function AutocompleteCore() {
      var value, _this = this,
        _ref = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        search = _ref.search,
        _ref$autoSelect = _ref.autoSelect,
        autoSelect = void 0 !== _ref$autoSelect && _ref$autoSelect,
        _ref$setValue = _ref.setValue,
        setValue = void 0 === _ref$setValue ? function() {} : _ref$setValue,
        _ref$setAttribute = _ref.setAttribute,
        setAttribute = void 0 === _ref$setAttribute ? function() {} : _ref$setAttribute,
        _ref$onUpdate = _ref.onUpdate,
        onUpdate = void 0 === _ref$onUpdate ? function() {} : _ref$onUpdate,
        _ref$onSubmit = _ref.onSubmit,
        onSubmit = void 0 === _ref$onSubmit ? function() {} : _ref$onSubmit,
        _ref$onShow = _ref.onShow,
        onShow = void 0 === _ref$onShow ? function() {} : _ref$onShow,
        _ref$onHide = _ref.onHide,
        onHide = void 0 === _ref$onHide ? function() {} : _ref$onHide,
        _ref$onLoading = _ref.onLoading,
        onLoading = void 0 === _ref$onLoading ? function() {} : _ref$onLoading,
        _ref$onLoaded = _ref.onLoaded,
        onLoaded = void 0 === _ref$onLoaded ? function() {} : _ref$onLoaded;
      _classCallCheck(this, AutocompleteCore), _defineProperty(this, "value", ""), _defineProperty(this, "searchCounter", 0), _defineProperty(this, "results", []), _defineProperty(this, "selectedIndex", -1), _defineProperty(this, "handleInput", function(event) {
        var value = event.target.value;
        _this.updateResults(value), _this.value = value
      }), _defineProperty(this, "handleKeyDown", function(event) {
        var key = event.key;
        switch (key) {
          case "Up":
          case "Down":
          case "ArrowUp":
          case "ArrowDown":
            var selectedIndex = "ArrowUp" === key || "Up" === key ? _this.selectedIndex - 1 : _this.selectedIndex + 1;
            event.preventDefault(), _this.handleArrows(selectedIndex);
            break;
          case "Tab":
            _this.selectResult();
            break;
          case "Enter":
            var selectedResult = _this.results[_this.selectedIndex];
            _this.selectResult(), _this.onSubmit(selectedResult);
            break;
          case "Esc":
          case "Escape":
            _this.hideResults(), _this.setValue();
            break;
          default:
            return
        }
      }), _defineProperty(this, "handleFocus", function(event) {
        var value = event.target.value;
        _this.updateResults(value), _this.value = value
      }), _defineProperty(this, "handleBlur", function() {
        _this.hideResults()
      }), _defineProperty(this, "handleResultMouseDown", function(event) {
        event.preventDefault()
      }), _defineProperty(this, "handleResultClick", function(event) {
        var target = event.target,
          result = closest(target, "[data-result-index]");
        if (result) {
          _this.selectedIndex = parseInt(result.dataset.resultIndex, 10);
          var selectedResult = _this.results[_this.selectedIndex];
          _this.selectResult(), _this.onSubmit(selectedResult)
        }
      }), _defineProperty(this, "handleArrows", function(selectedIndex) {
        var resultsCount = _this.results.length;
        _this.selectedIndex = (selectedIndex % resultsCount + resultsCount) % resultsCount, _this.onUpdate(_this.results, _this.selectedIndex)
      }), _defineProperty(this, "selectResult", function() {
        var selectedResult = _this.results[_this.selectedIndex];
        selectedResult && _this.setValue(selectedResult), _this.hideResults()
      }), _defineProperty(this, "updateResults", function(value) {
        var currentSearch = ++_this.searchCounter;
        _this.onLoading(), _this.search(value).then(function(results) {
          currentSearch === _this.searchCounter && (_this.results = results, _this.onLoaded(), 0 !== _this.results.length ? (_this.selectedIndex = _this.autoSelect ? 0 : -1, _this.onUpdate(_this.results, _this.selectedIndex), _this.showResults()) : _this.hideResults())
        })
      }), _defineProperty(this, "showResults", function() {
        _this.setAttribute("aria-expanded", !0), _this.onShow()
      }), _defineProperty(this, "hideResults", function() {
        _this.selectedIndex = -1, _this.results = [], _this.setAttribute("aria-expanded", !1), _this.setAttribute("aria-activedescendant", ""), _this.onUpdate(_this.results, _this.selectedIndex), _this.onHide()
      }), _defineProperty(this, "checkSelectedResultVisible", function(resultsElement) {
        var selectedResultElement = resultsElement.querySelector('[data-result-index="'.concat(_this.selectedIndex, '"]'));
        if (selectedResultElement) {
          var resultsPosition = resultsElement.getBoundingClientRect(),
            selectedPosition = selectedResultElement.getBoundingClientRect();
          selectedPosition.top < resultsPosition.top ? resultsElement.scrollTop -= resultsPosition.top - selectedPosition.top : selectedPosition.bottom > resultsPosition.bottom && (resultsElement.scrollTop += selectedPosition.bottom - resultsPosition.bottom)
        }
      }), this.search = (value = search, Boolean(value && "function" == typeof value.then) ? search : function(value) {
        return Promise.resolve(search(value))
      }), this.autoSelect = autoSelect, this.setValue = setValue, this.setAttribute = setAttribute, this.onUpdate = onUpdate, this.onSubmit = onSubmit, this.onShow = onShow, this.onHide = onHide, this.onLoading = onLoading, this.onLoaded = onLoaded
    }
    var matches = function(element, selector) {
        return element.matches ? element.matches(selector) : element.msMatchesSelector ? element.msMatchesSelector(selector) : element.webkitMatchesSelector ? element.webkitMatchesSelector(selector) : null
      },
      closest = function(element, selector) {
        return element.closest ? element.closest(selector) : function(el, selector) {
          for (var element = el; element && 1 === element.nodeType;) {
            if (matches(element, selector)) return element;
            element = element.parentNode
          }
          return null
        }(element, selector)
      },
      idCounter = 0,
      Props = function() {
        function Props(index, selectedIndex, baseClass) {
          _classCallCheck(this, Props), this.id = "".concat(baseClass, "-result-").concat(index), this.class = "".concat(baseClass, "-result"), this["data-result-index"] = index, this.role = "option", index === selectedIndex && (this["aria-selected"] = "true")
        }
        var Constructor, protoProps, staticProps;
        return Constructor = Props, (protoProps = [{
          key: "toString",
          value: function() {
            var _this = this;
            return Object.keys(this).reduce(function(str, key) {
              return "".concat(str, " ").concat(key, '="').concat(_this[key], '"')
            }, "")
          }
        }]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Props
      }();
    return function Autocomplete(root) {
      var _this2 = this,
        _ref = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
        search = _ref.search,
        _ref$onSubmit = _ref.onSubmit,
        onSubmit = void 0 === _ref$onSubmit ? function() {} : _ref$onSubmit,
        _ref$baseClass = _ref.baseClass,
        baseClass = void 0 === _ref$baseClass ? "autocomplete" : _ref$baseClass,
        autoSelect = _ref.autoSelect,
        _ref$getResultValue = _ref.getResultValue,
        getResultValue = void 0 === _ref$getResultValue ? function(result) {
          return result
        } : _ref$getResultValue,
        renderResult = _ref.renderResult;
      _classCallCheck(this, Autocomplete), _defineProperty(this, "expanded", !1), _defineProperty(this, "loading", !1), _defineProperty(this, "position", {}), _defineProperty(this, "resetPosition", !0), _defineProperty(this, "initialize", function() {
        _this2.root.style.position = "relative", _this2.input.setAttribute("role", "combobox"), _this2.input.setAttribute("autocomplete", "off"), _this2.input.setAttribute("autocapitalize", "off"), _this2.input.setAttribute("autocorrect", "off"), _this2.input.setAttribute("spellcheck", "false"), _this2.input.setAttribute("aria-autocomplete", "list"), _this2.input.setAttribute("aria-haspopup", "listbox"), _this2.input.setAttribute("aria-expanded", "false"), _this2.resultList.setAttribute("role", "listbox"), _this2.resultList.style.position = "absolute", _this2.resultList.style.zIndex = "1", _this2.resultList.style.width = "100%", _this2.resultList.style.boxSizing = "border-box", _this2.resultList.id || (_this2.resultList.id = function(argument_0) {
          return "".concat(0 < arguments.length && void 0 !== argument_0 ? argument_0 : "").concat(++idCounter)
        }("".concat(_this2.baseClass, "-result-list-"))), _this2.input.setAttribute("aria-owns", _this2.resultList.id), document.body.addEventListener("click", _this2.handleDocumentClick), _this2.input.addEventListener("input", _this2.core.handleInput), _this2.input.addEventListener("keydown", _this2.core.handleKeyDown), _this2.input.addEventListener("focus", _this2.core.handleFocus), _this2.input.addEventListener("blur", _this2.core.handleBlur), _this2.resultList.addEventListener("mousedown", _this2.core.handleResultMouseDown), _this2.resultList.addEventListener("click", _this2.core.handleResultClick), _this2.updateStyle()
      }), _defineProperty(this, "setAttribute", function(attribute, value) {
        _this2.input.setAttribute(attribute, value)
      }), _defineProperty(this, "setValue", function(result) {
        _this2.input.value = result ? _this2.getResultValue(result) : ""
      }), _defineProperty(this, "renderResult", function(result, props) {
        return "<li ".concat(props, ">").concat(_this2.getResultValue(result), "</li>")
      }), _defineProperty(this, "handleUpdate", function(results, selectedIndex) {
        var element1, element2, position1, position2;
        _this2.resultList.innerHTML = "", results.forEach(function(result, index) {
          var props = new Props(index, selectedIndex, _this2.baseClass),
            resultHTML = _this2.renderResult(result, props);
          "string" == typeof resultHTML ? _this2.resultList.insertAdjacentHTML("beforeend", resultHTML) : _this2.resultList.insertAdjacentElement("beforeend", resultHTML)
        }), _this2.input.setAttribute("aria-activedescendant", -1 < selectedIndex ? "".concat(_this2.baseClass, "-result-").concat(selectedIndex) : ""), _this2.resetPosition && (_this2.resetPosition = !1, _this2.position = (element1 = _this2.input, element2 = _this2.resultList, position1 = element1.getBoundingClientRect(), position2 = element2.getBoundingClientRect(), position1.bottom + position2.height > window.innerHeight && window.innerHeight - position1.bottom < position1.top && 0 < window.pageYOffset + position1.top - position2.height ? "above" : "below"), _this2.updateStyle()), _this2.core.checkSelectedResultVisible(_this2.resultList)
      }), _defineProperty(this, "handleShow", function() {
        _this2.expanded = !0, _this2.updateStyle()
      }), _defineProperty(this, "handleHide", function() {
        _this2.expanded = !1, _this2.resetPosition = !0, _this2.updateStyle()
      }), _defineProperty(this, "handleLoading", function() {
        _this2.loading = !0, _this2.updateStyle()
      }), _defineProperty(this, "handleLoaded", function() {
        _this2.loading = !1, _this2.updateStyle()
      }), _defineProperty(this, "handleDocumentClick", function(event) {
        _this2.root.contains(event.target) || _this2.core.hideResults()
      }), _defineProperty(this, "updateStyle", function() {
        _this2.root.dataset.expanded = _this2.expanded, _this2.root.dataset.loading = _this2.loading, _this2.root.dataset.position = _this2.position, _this2.resultList.style.visibility = _this2.expanded ? "visible" : "hidden", _this2.resultList.style.pointerEvents = _this2.expanded ? "auto" : "none", "below" === _this2.position ? (_this2.resultList.style.bottom = null, _this2.resultList.style.top = "100%") : (_this2.resultList.style.top = null, _this2.resultList.style.bottom = "100%")
      }), this.root = "string" == typeof root ? document.querySelector(root) : root, this.input = this.root.querySelector("input"), this.resultList = this.root.querySelector("ul"), this.baseClass = baseClass, this.getResultValue = getResultValue, "function" == typeof renderResult && (this.renderResult = renderResult), this.core = new AutocompleteCore({
        search: search,
        autoSelect: autoSelect,
        setValue: this.setValue,
        setAttribute: this.setAttribute,
        onUpdate: this.handleUpdate,
        onSubmit: onSubmit,
        onShow: this.handleShow,
        onHide: this.handleHide,
        onLoading: this.handleLoading,
        onLoaded: this.handleLoaded
      }), this.initialize()
    }
  }(),
  carouselSwiper;
! function() {
  "use strict";
  var e, r, a = function(t, s) {
    function r(e) {
      return Math.floor(e)
    }

    function i() {
      var e = x.params.autoplay,
        a = x.slides.eq(x.activeIndex);
      a.attr("data-swiper-autoplay") && (e = a.attr("data-swiper-autoplay") || x.params.autoplay), x.autoplayTimeoutId = setTimeout(function() {
        x.params.loop ? (x.fixLoop(), x._slideNext(), x.emit("onAutoplay", x)) : x.isEnd ? s.autoplayStopOnLast ? x.stopAutoplay() : (x._slideTo(0), x.emit("onAutoplay", x)) : (x._slideNext(), x.emit("onAutoplay", x))
      }, e)
    }

    function n(a, t) {
      var s = e(a.target);
      if (!s.is(t))
        if ("string" == typeof t) s = s.parents(t);
        else if (t.nodeType) {
        var r;
        return s.parents().each(function(e, a) {
          a === t && (r = t)
        }), r ? t : void 0
      }
      if (0 !== s.length) return s[0]
    }

    function o(e, a) {
      a = a || {};
      var s = new(window.MutationObserver || window.WebkitMutationObserver)(function(e) {
        e.forEach(function(e) {
          x.onResize(!0), x.emit("onObserverUpdate", x, e)
        })
      });
      s.observe(e, {
        attributes: void 0 === a.attributes || a.attributes,
        childList: void 0 === a.childList || a.childList,
        characterData: void 0 === a.characterData || a.characterData
      }), x.observers.push(s)
    }

    function l(e) {
      e.originalEvent && (e = e.originalEvent);
      var a = e.keyCode || e.charCode;
      if (!x.params.allowSwipeToNext && (x.isHorizontal() && 39 === a || !x.isHorizontal() && 40 === a)) return !1;
      if (!x.params.allowSwipeToPrev && (x.isHorizontal() && 37 === a || !x.isHorizontal() && 38 === a)) return !1;
      if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
        if (37 === a || 39 === a || 38 === a || 40 === a) {
          var t = !1;
          if (0 < x.container.parents("." + x.params.slideClass).length && 0 === x.container.parents("." + x.params.slideActiveClass).length) return;
          var s_left = window.pageXOffset,
            s_top = window.pageYOffset,
            r = window.innerWidth,
            i = window.innerHeight,
            n = x.container.offset();
          x.rtl && (n.left = n.left - x.container[0].scrollLeft);
          for (var o = [
              [n.left, n.top],
              [n.left + x.width, n.top],
              [n.left, n.top + x.height],
              [n.left + x.width, n.top + x.height]
            ], l = 0; l < o.length; l++) {
            var p = o[l];
            p[0] >= s_left && p[0] <= s_left + r && p[1] >= s_top && p[1] <= s_top + i && (t = !0)
          }
          if (!t) return
        }
        x.isHorizontal() ? (37 !== a && 39 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !x.rtl || 37 === a && x.rtl) && x.slideNext(), (37 === a && !x.rtl || 39 === a && x.rtl) && x.slidePrev()) : (38 !== a && 40 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && x.slideNext(), 38 === a && x.slidePrev()), x.emit("onKeyPress", x, a)
      }
    }

    function d(e) {
      e.originalEvent && (e = e.originalEvent);
      var a = 0,
        t = x.rtl ? -1 : 1,
        s = function(e) {
          var a = 0,
            t = 0,
            s = 0,
            r = 0;
          return "detail" in e && (t = e.detail), "wheelDelta" in e && (t = -e.wheelDelta / 120), "wheelDeltaY" in e && (t = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (a = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (a = t, t = 0), s = 10 * a, r = 10 * t, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || r) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, r *= 40) : (s *= 800, r *= 800)), s && !a && (a = s < 1 ? -1 : 1), r && !t && (t = r < 1 ? -1 : 1), {
            spinX: a,
            spinY: t,
            pixelX: s,
            pixelY: r
          }
        }(e);
      if (x.params.mousewheelForceToAxis)
        if (x.isHorizontal()) {
          if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;
          a = s.pixelX * t
        } else {
          if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;
          a = s.pixelY
        }
      else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;
      if (0 !== a) {
        if (x.params.mousewheelInvert && (a = -a), x.params.freeMode) {
          var r = x.getWrapperTranslate() + a * x.params.mousewheelSensitivity,
            i = x.isBeginning,
            n = x.isEnd;
          if (r >= x.minTranslate() && (r = x.minTranslate()), r <= x.maxTranslate() && (r = x.maxTranslate()), x.setWrapperTransition(0), x.setWrapperTranslate(r), x.updateProgress(), x.updateActiveIndex(), (!i && x.isBeginning || !n && x.isEnd) && x.updateClasses(), x.params.freeModeSticky ? (clearTimeout(x.mousewheel.timeout), x.mousewheel.timeout = setTimeout(function() {
              x.slideReset()
            }, 300)) : x.params.lazyLoading && x.lazy && x.lazy.load(), x.emit("onScroll", x, e), x.params.autoplay && x.params.autoplayDisableOnInteraction && x.stopAutoplay(), 0 === r || r === x.maxTranslate()) return
        } else {
          if (60 < (new window.Date).getTime() - x.mousewheel.lastScrollTime)
            if (a < 0)
              if (x.isEnd && !x.params.loop || x.animating) {
                if (x.params.mousewheelReleaseOnEdges) return !0
              } else x.slideNext(), x.emit("onScroll", x, e);
          else if (x.isBeginning && !x.params.loop || x.animating) {
            if (x.params.mousewheelReleaseOnEdges) return !0
          } else x.slidePrev(), x.emit("onScroll", x, e);
          x.mousewheel.lastScrollTime = (new window.Date).getTime()
        }
        return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
      }
    }

    function m(a, t) {
      a = e(a);
      var s, r, i, n = x.rtl ? -1 : 1;
      s = a.attr("data-swiper-parallax") || "0", r = a.attr("data-swiper-parallax-x"), i = a.attr("data-swiper-parallax-y"), r || i ? (r = r || "0", i = i || "0") : x.isHorizontal() ? (r = s, i = "0") : (i = s, r = "0"), r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", i = 0 <= i.indexOf("%") ? parseInt(i, 10) * t + "%" : i * t + "px", a.transform("translate3d(" + r + ", " + i + ",0px)")
    }

    function u(e) {
      return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
    }
    if (!(this instanceof a)) return new a(t, s);
    var c = {
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        autoplay: !1,
        autoplayDisableOnInteraction: !0,
        autoplayStopOnLast: !1,
        iOSEdgeSwipeDetection: !1,
        iOSEdgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: !0
        },
        flip: {
          slideShadows: !0,
          limitRotation: !0
        },
        cube: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: .94
        },
        fade: {
          crossFade: !1
        },
        parallax: !1,
        zoom: !1,
        zoomMax: 3,
        zoomMin: 1,
        zoomToggle: !0,
        scrollbar: null,
        scrollbarHide: !0,
        scrollbarDraggable: !1,
        scrollbarSnapOnRelease: !1,
        keyboardControl: !1,
        mousewheelControl: !1,
        mousewheelReleaseOnEdges: !1,
        mousewheelInvert: !1,
        mousewheelForceToAxis: !1,
        mousewheelSensitivity: 1,
        mousewheelEventsTarged: "container",
        hashnav: !1,
        hashnavWatchState: !1,
        history: !1,
        replaceState: !1,
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        onlyExternal: !1,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        pagination: null,
        paginationElement: "span",
        paginationClickable: !1,
        paginationHide: !1,
        paginationBulletRender: null,
        paginationProgressRender: null,
        paginationFractionRender: null,
        paginationCustomRender: null,
        paginationType: "bullets",
        resistance: !0,
        resistanceRatio: .85,
        nextButton: null,
        prevButton: null,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        lazyLoading: !1,
        lazyLoadingInPrevNext: !1,
        lazyLoadingInPrevNextAmount: 1,
        lazyLoadingOnTransitionStart: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        control: void 0,
        controlInverse: !1,
        controlBy: "slide",
        normalizeSlideIndex: !0,
        allowSwipeToPrev: !0,
        allowSwipeToNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        buttonDisabledClass: "swiper-button-disabled",
        paginationCurrentClass: "swiper-pagination-current",
        paginationTotalClass: "swiper-pagination-total",
        paginationHiddenClass: "swiper-pagination-hidden",
        paginationProgressbarClass: "swiper-pagination-progressbar",
        paginationClickableClass: "swiper-pagination-clickable",
        paginationModifierClass: "swiper-pagination-",
        lazyLoadingClass: "swiper-lazy",
        lazyStatusLoadingClass: "swiper-lazy-loading",
        lazyStatusLoadedClass: "swiper-lazy-loaded",
        lazyPreloaderClass: "swiper-lazy-preloader",
        notificationClass: "swiper-notification",
        preloaderClass: "preloader",
        zoomContainerClass: "swiper-zoom-container",
        observer: !1,
        observeParents: !1,
        a11y: !1,
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        runCallbacksOnInit: !0
      },
      g = s && s.virtualTranslate;
    s = s || {};
    var h = {};
    for (var v in s)
      if ("object" != typeof s[v] || null === s[v] || s[v].nodeType || s[v] === window || s[v] === document || "undefined" != typeof Dom7 && s[v] instanceof Dom7 || "undefined" != typeof jQuery && s[v] instanceof jQuery) h[v] = s[v];
      else
        for (var f in h[v] = {}, s[v]) h[v][f] = s[v][f];
    for (var w in c)
      if (void 0 === s[w]) s[w] = c[w];
      else if ("object" == typeof s[w])
      for (var y in c[w]) void 0 === s[w][y] && (s[w][y] = c[w][y]);
    var x = this;
    if (x.params = s, x.originalParams = h, x.classNames = [], void 0 !== e && "undefined" != typeof Dom7 && (e = Dom7), (void 0 !== e || (e = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (x.$ = e, x.currentBreakpoint = void 0, x.getActiveBreakpoint = function() {
        if (!x.params.breakpoints) return !1;
        var e, a = !1,
          t = [];
        for (e in x.params.breakpoints) x.params.breakpoints.hasOwnProperty(e) && t.push(e);
        t.sort(function(e, a) {
          return parseInt(e, 10) > parseInt(a, 10)
        });
        for (var s = 0; s < t.length; s++)(e = t[s]) >= window.innerWidth && !a && (a = e);
        return a || "max"
      }, x.setBreakpoint = function() {
        var e = x.getActiveBreakpoint();
        if (e && x.currentBreakpoint !== e) {
          var a = e in x.params.breakpoints ? x.params.breakpoints[e] : x.originalParams,
            t = x.params.loop && a.slidesPerView !== x.params.slidesPerView;
          for (var s in a) x.params[s] = a[s];
          x.currentBreakpoint = e, t && x.destroyLoop && x.reLoop(!0)
        }
      }, x.params.breakpoints && x.setBreakpoint(), x.container = e(t), 0 !== x.container.length)) {
      if (1 < x.container.length) {
        var T = [];
        return x.container.each(function() {
          T.push(new a(this, s))
        }), T
      }(x.container[0].swiper = x).container.data("swiper", x), x.classNames.push(x.params.containerModifierClass + x.params.direction), x.params.freeMode && x.classNames.push(x.params.containerModifierClass + "free-mode"), x.support.flexbox || (x.classNames.push(x.params.containerModifierClass + "no-flexbox"), x.params.slidesPerColumn = 1), x.params.autoHeight && x.classNames.push(x.params.containerModifierClass + "autoheight"), (x.params.parallax || x.params.watchSlidesVisibility) && (x.params.watchSlidesProgress = !0), x.params.touchReleaseOnEdges && (x.params.resistanceRatio = 0), 0 <= ["cube", "coverflow", "flip"].indexOf(x.params.effect) && (x.support.transforms3d ? (x.params.watchSlidesProgress = !0, x.classNames.push(x.params.containerModifierClass + "3d")) : x.params.effect = "slide"), "slide" !== x.params.effect && x.classNames.push(x.params.containerModifierClass + x.params.effect), "cube" === x.params.effect && (x.params.resistanceRatio = 0, x.params.slidesPerView = 1, x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.centeredSlides = !1, x.params.spaceBetween = 0, x.params.virtualTranslate = !0), "fade" !== x.params.effect && "flip" !== x.params.effect || (x.params.slidesPerView = 1, x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.watchSlidesProgress = !0, void(x.params.spaceBetween = 0) === g && (x.params.virtualTranslate = !0)), x.params.grabCursor && x.support.touch && (x.params.grabCursor = !1), x.wrapper = x.container.children("." + x.params.wrapperClass), x.params.pagination && (x.paginationContainer = e(x.params.pagination), x.params.uniqueNavElements && "string" == typeof x.params.pagination && 1 < x.paginationContainer.length && 1 === x.container.find(x.params.pagination).length && (x.paginationContainer = x.container.find(x.params.pagination)), "bullets" === x.params.paginationType && x.params.paginationClickable ? x.paginationContainer.addClass(x.params.paginationModifierClass + "clickable") : x.params.paginationClickable = !1, x.paginationContainer.addClass(x.params.paginationModifierClass + x.params.paginationType)), (x.params.nextButton || x.params.prevButton) && (x.params.nextButton && (x.nextButton = e(x.params.nextButton), x.params.uniqueNavElements && "string" == typeof x.params.nextButton && 1 < x.nextButton.length && 1 === x.container.find(x.params.nextButton).length && (x.nextButton = x.container.find(x.params.nextButton))), x.params.prevButton && (x.prevButton = e(x.params.prevButton), x.params.uniqueNavElements && "string" == typeof x.params.prevButton && 1 < x.prevButton.length && 1 === x.container.find(x.params.prevButton).length && (x.prevButton = x.container.find(x.params.prevButton)))), x.isHorizontal = function() {
        return "horizontal" === x.params.direction
      }, x.rtl = x.isHorizontal() && ("rtl" === x.container[0].dir.toLowerCase() || "rtl" === x.container.css("direction")), x.rtl && x.classNames.push(x.params.containerModifierClass + "rtl"), x.rtl && (x.wrongRTL = "-webkit-box" === x.wrapper.css("display")), 1 < x.params.slidesPerColumn && x.classNames.push(x.params.containerModifierClass + "multirow"), x.device.android && x.classNames.push(x.params.containerModifierClass + "android"), x.container.addClass(x.classNames.join(" ")), x.translate = 0, x.progress = 0, x.velocity = 0, x.lockSwipeToNext = function() {
        (x.params.allowSwipeToNext = !1) === x.params.allowSwipeToPrev && x.params.grabCursor && x.unsetGrabCursor()
      }, x.lockSwipeToPrev = function() {
        (x.params.allowSwipeToPrev = !1) === x.params.allowSwipeToNext && x.params.grabCursor && x.unsetGrabCursor()
      }, x.lockSwipes = function() {
        x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !1, x.params.grabCursor && x.unsetGrabCursor()
      }, x.unlockSwipeToNext = function() {
        (x.params.allowSwipeToNext = !0) === x.params.allowSwipeToPrev && x.params.grabCursor && x.setGrabCursor()
      }, x.unlockSwipeToPrev = function() {
        (x.params.allowSwipeToPrev = !0) === x.params.allowSwipeToNext && x.params.grabCursor && x.setGrabCursor()
      }, x.unlockSwipes = function() {
        x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !0, x.params.grabCursor && x.setGrabCursor()
      }, x.setGrabCursor = function(e) {
        x.container[0].style.cursor = "move", x.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", x.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", x.container[0].style.cursor = e ? "grabbing" : "grab"
      }, x.unsetGrabCursor = function() {
        x.container[0].style.cursor = ""
      }, x.params.grabCursor && x.setGrabCursor(), x.imagesToLoad = [], x.imagesLoaded = 0, x.loadImage = function(e, a, t, s, r, i) {
        function n() {
          i && i()
        }
        var o;
        e.complete && r ? n() : a ? ((o = new window.Image).onload = n, o.onerror = n, s && (o.sizes = s), t && (o.srcset = t), a && (o.src = a)) : n()
      }, x.preloadImages = function() {
        function e() {
          null != x && x && (void 0 !== x.imagesLoaded && x.imagesLoaded++, x.imagesLoaded === x.imagesToLoad.length && (x.params.updateOnImagesReady && x.update(), x.emit("onImagesReady", x)))
        }
        x.imagesToLoad = x.container.find("img");
        for (var a = 0; a < x.imagesToLoad.length; a++) x.loadImage(x.imagesToLoad[a], x.imagesToLoad[a].currentSrc || x.imagesToLoad[a].getAttribute("src"), x.imagesToLoad[a].srcset || x.imagesToLoad[a].getAttribute("srcset"), x.imagesToLoad[a].sizes || x.imagesToLoad[a].getAttribute("sizes"), !0, e)
      }, x.autoplayTimeoutId = void 0, x.autoplaying = !1, x.autoplayPaused = !1, x.startAutoplay = function() {
        return void 0 === x.autoplayTimeoutId && !!x.params.autoplay && !x.autoplaying && (x.autoplaying = !0, x.emit("onAutoplayStart", x), void i())
      }, x.stopAutoplay = function(e) {
        x.autoplayTimeoutId && (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplaying = !1, x.autoplayTimeoutId = void 0, x.emit("onAutoplayStop", x))
      }, x.pauseAutoplay = function(e) {
        x.autoplayPaused || (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplayPaused = !0, 0 === e ? (x.autoplayPaused = !1, i()) : x.wrapper.transitionEnd(function() {
          x && (x.autoplayPaused = !1, x.autoplaying ? i() : x.stopAutoplay())
        }))
      }, x.minTranslate = function() {
        return -x.snapGrid[0]
      }, x.maxTranslate = function() {
        return -x.snapGrid[x.snapGrid.length - 1]
      }, x.updateAutoHeight = function() {
        var e, a = [],
          t = 0;
        if ("auto" !== x.params.slidesPerView && 1 < x.params.slidesPerView)
          for (e = 0; e < Math.ceil(x.params.slidesPerView); e++) {
            var s = x.activeIndex + e;
            if (s > x.slides.length) break;
            a.push(x.slides.eq(s)[0])
          } else a.push(x.slides.eq(x.activeIndex)[0]);
        for (e = 0; e < a.length; e++)
          if (void 0 !== a[e]) {
            var r = a[e].offsetHeight;
            t = t < r ? r : t
          } t && x.wrapper.css("height", t + "px")
      }, x.updateContainerSize = function() {
        var e, a;
        e = void 0 !== x.params.width ? x.params.width : x.container[0].clientWidth, a = void 0 !== x.params.height ? x.params.height : x.container[0].clientHeight, 0 === e && x.isHorizontal() || 0 === a && !x.isHorizontal() || (e = e - parseInt(x.container.css("padding-left"), 10) - parseInt(x.container.css("padding-right"), 10), a = a - parseInt(x.container.css("padding-top"), 10) - parseInt(x.container.css("padding-bottom"), 10), x.width = e, x.height = a, x.size = x.isHorizontal() ? x.width : x.height)
      }, x.updateSlidesSize = function() {
        x.slides = x.wrapper.children("." + x.params.slideClass), x.snapGrid = [], x.slidesGrid = [], x.slidesSizesGrid = [];
        var e, a = x.params.spaceBetween,
          t = -x.params.slidesOffsetBefore,
          s = 0,
          i = 0;
        if (void 0 !== x.size) {
          var n;
          "string" == typeof a && 0 <= a.indexOf("%") && (a = parseFloat(a.replace("%", "")) / 100 * x.size), x.virtualSize = -a, x.rtl ? x.slides.css({
            marginLeft: "",
            marginTop: ""
          }) : x.slides.css({
            marginRight: "",
            marginBottom: ""
          }), 1 < x.params.slidesPerColumn && (n = Math.floor(x.slides.length / x.params.slidesPerColumn) === x.slides.length / x.params.slidesPerColumn ? x.slides.length : Math.ceil(x.slides.length / x.params.slidesPerColumn) * x.params.slidesPerColumn, "auto" !== x.params.slidesPerView && "row" === x.params.slidesPerColumnFill && (n = Math.max(n, x.params.slidesPerView * x.params.slidesPerColumn)));
          var o, h, l = x.params.slidesPerColumn,
            p = n / l,
            d = p - (x.params.slidesPerColumn * p - x.slides.length);
          for (e = 0; e < x.slides.length; e++) {
            o = 0;
            var u, c, g, m = x.slides.eq(e);
            if (1 < x.params.slidesPerColumn) "column" === x.params.slidesPerColumnFill ? (g = e - (c = Math.floor(e / l)) * l, (d < c || c === d && g === l - 1) && ++g >= l && (g = 0, c++), u = c + g * n / l, m.css({
              "-webkit-box-ordinal-group": u,
              "-moz-box-ordinal-group": u,
              "-ms-flex-order": u,
              "-webkit-order": u,
              order: u
            })) : c = e - (g = Math.floor(e / p)) * p, m.css("margin-" + (x.isHorizontal() ? "top" : "left"), 0 !== g && x.params.spaceBetween && x.params.spaceBetween + "px").attr("data-swiper-column", c).attr("data-swiper-row", g);
            "none" !== m.css("display") && ("auto" === x.params.slidesPerView ? (o = x.isHorizontal() ? m.outerWidth(!0) : m.outerHeight(!0), x.params.roundLengths && (o = r(o))) : (o = (x.size - (x.params.slidesPerView - 1) * a) / x.params.slidesPerView, x.params.roundLengths && (o = r(o)), x.isHorizontal() ? x.slides[e].style.width = o + "px" : x.slides[e].style.height = o + "px"), x.slides[e].swiperSlideSize = o, x.slidesSizesGrid.push(o), x.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === s && 0 !== e && (t = t - x.size / 2 - a), 0 === e && (t = t - x.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % x.params.slidesPerGroup == 0 && x.snapGrid.push(t), x.slidesGrid.push(t)) : (i % x.params.slidesPerGroup == 0 && x.snapGrid.push(t), x.slidesGrid.push(t), t = t + o + a), x.virtualSize += o + a, s = o, i++)
          }
          if (x.virtualSize = Math.max(x.virtualSize, x.size) + x.params.slidesOffsetAfter, x.rtl && x.wrongRTL && ("slide" === x.params.effect || "coverflow" === x.params.effect) && x.wrapper.css({
              width: x.virtualSize + x.params.spaceBetween + "px"
            }), x.support.flexbox && !x.params.setWrapperSize || (x.isHorizontal() ? x.wrapper.css({
              width: x.virtualSize + x.params.spaceBetween + "px"
            }) : x.wrapper.css({
              height: x.virtualSize + x.params.spaceBetween + "px"
            })), 1 < x.params.slidesPerColumn && (x.virtualSize = (o + x.params.spaceBetween) * n, x.virtualSize = Math.ceil(x.virtualSize / x.params.slidesPerColumn) - x.params.spaceBetween, x.isHorizontal() ? x.wrapper.css({
              width: x.virtualSize + x.params.spaceBetween + "px"
            }) : x.wrapper.css({
              height: x.virtualSize + x.params.spaceBetween + "px"
            }), x.params.centeredSlides)) {
            for (h = [], e = 0; e < x.snapGrid.length; e++) x.snapGrid[e] < x.virtualSize + x.snapGrid[0] && h.push(x.snapGrid[e]);
            x.snapGrid = h
          }
          if (!x.params.centeredSlides) {
            for (h = [], e = 0; e < x.snapGrid.length; e++) x.snapGrid[e] <= x.virtualSize - x.size && h.push(x.snapGrid[e]);
            x.snapGrid = h, 1 < Math.floor(x.virtualSize - x.size) - Math.floor(x.snapGrid[x.snapGrid.length - 1]) && x.snapGrid.push(x.virtualSize - x.size)
          }
          0 === x.snapGrid.length && (x.snapGrid = [0]), 0 !== x.params.spaceBetween && (x.isHorizontal() ? x.rtl ? x.slides.css({
            marginLeft: a + "px"
          }) : x.slides.css({
            marginRight: a + "px"
          }) : x.slides.css({
            marginBottom: a + "px"
          })), x.params.watchSlidesProgress && x.updateSlidesOffset()
        }
      }, x.updateSlidesOffset = function() {
        for (var e = 0; e < x.slides.length; e++) x.slides[e].swiperSlideOffset = x.isHorizontal() ? x.slides[e].offsetLeft : x.slides[e].offsetTop
      }, x.currentSlidesPerView = function() {
        var e, a, t = 1;
        if (x.params.centeredSlides) {
          var s, r = x.slides[x.activeIndex].swiperSlideSize;
          for (e = x.activeIndex + 1; e < x.slides.length; e++) x.slides[e] && !s && (t++, (r += x.slides[e].swiperSlideSize) > x.size && (s = !0));
          for (a = x.activeIndex - 1; 0 <= a; a--) x.slides[a] && !s && (t++, (r += x.slides[a].swiperSlideSize) > x.size && (s = !0))
        } else
          for (e = x.activeIndex + 1; e < x.slides.length; e++) x.slidesGrid[e] - x.slidesGrid[x.activeIndex] < x.size && t++;
        return t
      }, x.updateSlidesProgress = function(e) {
        if (void 0 === e && (e = x.translate || 0), 0 !== x.slides.length) {
          void 0 === x.slides[0].swiperSlideOffset && x.updateSlidesOffset();
          var a = -e;
          x.rtl && (a = e), x.slides.removeClass(x.params.slideVisibleClass);
          for (var t = 0; t < x.slides.length; t++) {
            var s = x.slides[t],
              r = (a + (x.params.centeredSlides ? x.minTranslate() : 0) - s.swiperSlideOffset) / (s.swiperSlideSize + x.params.spaceBetween);
            if (x.params.watchSlidesVisibility) {
              var i = -(a - s.swiperSlideOffset),
                n = i + x.slidesSizesGrid[t];
              (0 <= i && i < x.size || 0 < n && n <= x.size || i <= 0 && n >= x.size) && x.slides.eq(t).addClass(x.params.slideVisibleClass)
            }
            s.progress = x.rtl ? -r : r
          }
        }
      }, x.updateProgress = function(e) {
        void 0 === e && (e = x.translate || 0);
        var a = x.maxTranslate() - x.minTranslate(),
          t = x.isBeginning,
          s = x.isEnd;
        0 == a ? (x.progress = 0, x.isBeginning = x.isEnd = !0) : (x.progress = (e - x.minTranslate()) / a, x.isBeginning = x.progress <= 0, x.isEnd = 1 <= x.progress), x.isBeginning && !t && x.emit("onReachBeginning", x), x.isEnd && !s && x.emit("onReachEnd", x), x.params.watchSlidesProgress && x.updateSlidesProgress(e), x.emit("onProgress", x, x.progress)
      }, x.updateActiveIndex = function() {
        var e, a, t, s = x.rtl ? x.translate : -x.translate;
        for (a = 0; a < x.slidesGrid.length; a++) void 0 !== x.slidesGrid[a + 1] ? s >= x.slidesGrid[a] && s < x.slidesGrid[a + 1] - (x.slidesGrid[a + 1] - x.slidesGrid[a]) / 2 ? e = a : s >= x.slidesGrid[a] && s < x.slidesGrid[a + 1] && (e = a + 1) : s >= x.slidesGrid[a] && (e = a);
        x.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), (t = Math.floor(e / x.params.slidesPerGroup)) >= x.snapGrid.length && (t = x.snapGrid.length - 1), e !== x.activeIndex && (x.snapIndex = t, x.previousIndex = x.activeIndex, x.activeIndex = e, x.updateClasses(), x.updateRealIndex())
      }, x.updateRealIndex = function() {
        x.realIndex = parseInt(x.slides.eq(x.activeIndex).attr("data-swiper-slide-index") || x.activeIndex, 10)
      }, x.updateClasses = function() {
        x.slides.removeClass(x.params.slideActiveClass + " " + x.params.slideNextClass + " " + x.params.slidePrevClass + " " + x.params.slideDuplicateActiveClass + " " + x.params.slideDuplicateNextClass + " " + x.params.slideDuplicatePrevClass);
        var a = x.slides.eq(x.activeIndex);
        a.addClass(x.params.slideActiveClass), s.loop && (a.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass));
        var t = a.next("." + x.params.slideClass).addClass(x.params.slideNextClass);
        x.params.loop && 0 === t.length && (t = x.slides.eq(0)).addClass(x.params.slideNextClass);
        var r = a.prev("." + x.params.slideClass).addClass(x.params.slidePrevClass);
        if (x.params.loop && 0 === r.length && (r = x.slides.eq(-1)).addClass(x.params.slidePrevClass), s.loop && (t.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass), r.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass)), x.paginationContainer && 0 < x.paginationContainer.length) {
          var i, n = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length;
          if (x.params.loop ? ((i = Math.ceil((x.activeIndex - x.loopedSlides) / x.params.slidesPerGroup)) > x.slides.length - 1 - 2 * x.loopedSlides && (i -= x.slides.length - 2 * x.loopedSlides), n - 1 < i && (i -= n), i < 0 && "bullets" !== x.params.paginationType && (i = n + i)) : i = void 0 !== x.snapIndex ? x.snapIndex : x.activeIndex || 0, "bullets" === x.params.paginationType && x.bullets && 0 < x.bullets.length && (x.bullets.removeClass(x.params.bulletActiveClass), 1 < x.paginationContainer.length ? x.bullets.each(function() {
              e(this).index() === i && e(this).addClass(x.params.bulletActiveClass)
            }) : x.bullets.eq(i).addClass(x.params.bulletActiveClass)), "fraction" === x.params.paginationType && (x.paginationContainer.find("." + x.params.paginationCurrentClass).text(i + 1), x.paginationContainer.find("." + x.params.paginationTotalClass).text(n)), "progress" === x.params.paginationType) {
            var o = (i + 1) / n,
              l = o,
              p = 1;
            x.isHorizontal() || (p = o, l = 1), x.paginationContainer.find("." + x.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")").transition(x.params.speed)
          }
          "custom" === x.params.paginationType && x.params.paginationCustomRender && (x.paginationContainer.html(x.params.paginationCustomRender(x, i + 1, n)), x.emit("onPaginationRendered", x, x.paginationContainer[0]))
        }
        x.params.loop || (x.params.prevButton && x.prevButton && 0 < x.prevButton.length && (x.isBeginning ? (x.prevButton.addClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.disable(x.prevButton)) : (x.prevButton.removeClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.enable(x.prevButton))), x.params.nextButton && x.nextButton && 0 < x.nextButton.length && (x.isEnd ? (x.nextButton.addClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.disable(x.nextButton)) : (x.nextButton.removeClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.enable(x.nextButton))))
      }, x.updatePagination = function() {
        if (x.params.pagination && x.paginationContainer && 0 < x.paginationContainer.length) {
          var e = "";
          if ("bullets" === x.params.paginationType) {
            for (var a = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length, t = 0; t < a; t++) e += x.params.paginationBulletRender ? x.params.paginationBulletRender(x, t, x.params.bulletClass) : "<" + x.params.paginationElement + ' class="' + x.params.bulletClass + '"></' + x.params.paginationElement + ">";
            x.paginationContainer.html(e), x.bullets = x.paginationContainer.find("." + x.params.bulletClass), x.params.paginationClickable && x.params.a11y && x.a11y && x.a11y.initPagination()
          }
          "fraction" === x.params.paginationType && (e = x.params.paginationFractionRender ? x.params.paginationFractionRender(x, x.params.paginationCurrentClass, x.params.paginationTotalClass) : '<span class="' + x.params.paginationCurrentClass + '"></span> / <span class="' + x.params.paginationTotalClass + '"></span>', x.paginationContainer.html(e)), "progress" === x.params.paginationType && (e = x.params.paginationProgressRender ? x.params.paginationProgressRender(x, x.params.paginationProgressbarClass) : '<span class="' + x.params.paginationProgressbarClass + '"></span>', x.paginationContainer.html(e)), "custom" !== x.params.paginationType && x.emit("onPaginationRendered", x, x.paginationContainer[0])
        }
      }, x.update = function(e) {
        function a() {
          x.rtl, x.translate, t = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate()), x.setWrapperTranslate(t), x.updateActiveIndex(), x.updateClasses()
        }
        var t;
        x && (x.updateContainerSize(), x.updateSlidesSize(), x.updateProgress(), x.updatePagination(), x.updateClasses(), x.params.scrollbar && x.scrollbar && x.scrollbar.set(), e ? (x.controller && x.controller.spline && (x.controller.spline = void 0), x.params.freeMode ? (a(), x.params.autoHeight && x.updateAutoHeight()) : (("auto" === x.params.slidesPerView || 1 < x.params.slidesPerView) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0)) || a()) : x.params.autoHeight && x.updateAutoHeight())
      }, x.onResize = function(e) {
        x.params.onBeforeResize && x.params.onBeforeResize(x), x.params.breakpoints && x.setBreakpoint();
        var a = x.params.allowSwipeToPrev,
          t = x.params.allowSwipeToNext;
        x.params.allowSwipeToPrev = x.params.allowSwipeToNext = !0, x.updateContainerSize(), x.updateSlidesSize(), ("auto" === x.params.slidesPerView || x.params.freeMode || e) && x.updatePagination(), x.params.scrollbar && x.scrollbar && x.scrollbar.set(), x.controller && x.controller.spline && (x.controller.spline = void 0);
        var s = !1;
        if (x.params.freeMode) {
          var r = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate());
          x.setWrapperTranslate(r), x.updateActiveIndex(), x.updateClasses(), x.params.autoHeight && x.updateAutoHeight()
        } else x.updateClasses(), s = ("auto" === x.params.slidesPerView || 1 < x.params.slidesPerView) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0);
        x.params.lazyLoading && !s && x.lazy && x.lazy.load(), x.params.allowSwipeToPrev = a, x.params.allowSwipeToNext = t, x.params.onAfterResize && x.params.onAfterResize(x)
      }, x.touchEventsDesktop = {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup"
      }, window.navigator.pointerEnabled ? x.touchEventsDesktop = {
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup"
      } : window.navigator.msPointerEnabled && (x.touchEventsDesktop = {
        start: "MSPointerDown",
        move: "MSPointerMove",
        end: "MSPointerUp"
      }), x.touchEvents = {
        start: x.support.touch || !x.params.simulateTouch ? "touchstart" : x.touchEventsDesktop.start,
        move: x.support.touch || !x.params.simulateTouch ? "touchmove" : x.touchEventsDesktop.move,
        end: x.support.touch || !x.params.simulateTouch ? "touchend" : x.touchEventsDesktop.end
      }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === x.params.touchEventsTarget ? x.container : x.wrapper).addClass("swiper-wp8-" + x.params.direction), x.initEvents = function(e) {
        var a = e ? "off" : "on",
          t = e ? "removeEventListener" : "addEventListener",
          r = "container" === x.params.touchEventsTarget ? x.container[0] : x.wrapper[0],
          i = x.support.touch ? r : document,
          n = !!x.params.nested;
        if (x.browser.ie) r[t](x.touchEvents.start, x.onTouchStart, !1), i[t](x.touchEvents.move, x.onTouchMove, n), i[t](x.touchEvents.end, x.onTouchEnd, !1);
        else {
          if (x.support.touch) {
            var o = !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
              passive: !0,
              capture: !1
            };
            r[t](x.touchEvents.start, x.onTouchStart, o), r[t](x.touchEvents.move, x.onTouchMove, n), r[t](x.touchEvents.end, x.onTouchEnd, o)
          }(s.simulateTouch && !x.device.ios && !x.device.android || s.simulateTouch && !x.support.touch && x.device.ios) && (r[t]("mousedown", x.onTouchStart, !1), document[t]("mousemove", x.onTouchMove, n), document[t]("mouseup", x.onTouchEnd, !1))
        }
        window[t]("resize", x.onResize), x.params.nextButton && x.nextButton && 0 < x.nextButton.length && (x.nextButton[a]("click", x.onClickNext), x.params.a11y && x.a11y && x.nextButton[a]("keydown", x.a11y.onEnterKey)), x.params.prevButton && x.prevButton && 0 < x.prevButton.length && (x.prevButton[a]("click", x.onClickPrev), x.params.a11y && x.a11y && x.prevButton[a]("keydown", x.a11y.onEnterKey)), x.params.pagination && x.params.paginationClickable && (x.paginationContainer[a]("click", "." + x.params.bulletClass, x.onClickIndex), x.params.a11y && x.a11y && x.paginationContainer[a]("keydown", "." + x.params.bulletClass, x.a11y.onEnterKey)), (x.params.preventClicks || x.params.preventClicksPropagation) && r[t]("click", x.preventClicks, !0)
      }, x.attachEvents = function() {
        x.initEvents()
      }, x.detachEvents = function() {
        x.initEvents(!0)
      }, x.allowClick = !0, x.preventClicks = function(e) {
        x.allowClick || (x.params.preventClicks && e.preventDefault(), x.params.preventClicksPropagation && x.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
      }, x.onClickNext = function(e) {
        e.preventDefault(), x.isEnd && !x.params.loop || x.slideNext()
      }, x.onClickPrev = function(e) {
        e.preventDefault(), x.isBeginning && !x.params.loop || x.slidePrev()
      }, x.onClickIndex = function(a) {
        a.preventDefault();
        var t = e(this).index() * x.params.slidesPerGroup;
        x.params.loop && (t += x.loopedSlides), x.slideTo(t)
      }, x.updateClickedSlide = function(a) {
        var t = n(a, "." + x.params.slideClass),
          s = !1;
        if (t)
          for (var r = 0; r < x.slides.length; r++) x.slides[r] === t && (s = !0);
        if (!t || !s) return x.clickedSlide = void 0, void(x.clickedIndex = void 0);
        if (x.clickedSlide = t, x.clickedIndex = e(t).index(), x.params.slideToClickedSlide && void 0 !== x.clickedIndex && x.clickedIndex !== x.activeIndex) {
          var i, o = x.clickedIndex,
            l = "auto" === x.params.slidesPerView ? x.currentSlidesPerView() : x.params.slidesPerView;
          if (x.params.loop) {
            if (x.animating) return;
            i = parseInt(e(x.clickedSlide).attr("data-swiper-slide-index"), 10), x.params.centeredSlides ? o < x.loopedSlides - l / 2 || o > x.slides.length - x.loopedSlides + l / 2 ? (x.fixLoop(), o = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
              x.slideTo(o)
            }, 0)) : x.slideTo(o) : o > x.slides.length - l ? (x.fixLoop(), o = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
              x.slideTo(o)
            }, 0)) : x.slideTo(o)
          } else x.slideTo(o)
        }
      };
      var b, C, S, z, M, P, E, I, k, D, G, X, L = "input, select, textarea, button, video",
        B = Date.now(),
        H = [];
      for (var Y in x.animating = !1, x.touches = {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        }, x.onTouchStart = function(a) {
          if (a.originalEvent && (a = a.originalEvent), (G = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) {
            if (x.params.noSwiping && n(a, "." + x.params.noSwipingClass)) return void(x.allowClick = !0);
            if (!x.params.swipeHandler || n(a, x.params.swipeHandler)) {
              var t = x.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                s = x.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
              if (!(x.device.ios && x.params.iOSEdgeSwipeDetection && t <= x.params.iOSEdgeSwipeThreshold)) {
                if (S = !(C = !(b = !0)), X = M = void 0, x.touches.startX = t, x.touches.startY = s, z = Date.now(), x.allowClick = !0, x.updateContainerSize(), x.swipeDirection = void 0, 0 < x.params.threshold && (I = !1), "touchstart" !== a.type) {
                  var r = !0;
                  e(a.target).is(L) && (r = !1), document.activeElement && e(document.activeElement).is(L) && document.activeElement.blur(), r && a.preventDefault()
                }
                x.emit("onTouchStart", x, a)
              }
            }
          }
        }, x.onTouchMove = function(a) {
          if (a.originalEvent && (a = a.originalEvent), !G || "mousemove" !== a.type) {
            if (a.preventedByNestedSwiper) return x.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, void(x.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY);
            if (x.params.onlyExternal) return x.allowClick = !1, void(b && (x.touches.startX = x.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, x.touches.startY = x.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, z = Date.now()));
            if (G && x.params.touchReleaseOnEdges && !x.params.loop)
              if (x.isHorizontal()) {
                if (x.touches.currentX < x.touches.startX && x.translate <= x.maxTranslate() || x.touches.currentX > x.touches.startX && x.translate >= x.minTranslate()) return
              } else if (x.touches.currentY < x.touches.startY && x.translate <= x.maxTranslate() || x.touches.currentY > x.touches.startY && x.translate >= x.minTranslate()) return;
            if (G && document.activeElement && a.target === document.activeElement && e(a.target).is(L)) return C = !0, void(x.allowClick = !1);
            if (S && x.emit("onTouchMove", x, a), !(a.targetTouches && 1 < a.targetTouches.length)) {
              var t;
              if (x.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, x.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, void 0 === M) M = !(x.isHorizontal() && x.touches.currentY === x.touches.startY || !x.isHorizontal() && x.touches.currentX === x.touches.startX) && (t = 180 * Math.atan2(Math.abs(x.touches.currentY - x.touches.startY), Math.abs(x.touches.currentX - x.touches.startX)) / Math.PI, x.isHorizontal() ? t > x.params.touchAngle : 90 - t > x.params.touchAngle);
              if (M && x.emit("onTouchMoveOpposite", x, a), void 0 === X && (x.touches.currentX === x.touches.startX && x.touches.currentY === x.touches.startY || (X = !0)), b) {
                if (M) return void(b = !1);
                if (X) {
                  x.allowClick = !1, x.emit("onSliderMove", x, a), a.preventDefault(), x.params.touchMoveStopPropagation && !x.params.nested && a.stopPropagation(), C || (s.loop && x.fixLoop(), E = x.getWrapperTranslate(), x.setWrapperTransition(0), x.animating && x.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), x.params.autoplay && x.autoplaying && (x.params.autoplayDisableOnInteraction ? x.stopAutoplay() : x.pauseAutoplay()), D = !1, !x.params.grabCursor || !0 !== x.params.allowSwipeToNext && !0 !== x.params.allowSwipeToPrev || x.setGrabCursor(!0)), C = !0;
                  var r = x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY;
                  r *= x.params.touchRatio, x.rtl && (r = -r), x.swipeDirection = 0 < r ? "prev" : "next", P = r + E;
                  var i = !0;
                  if (0 < r && P > x.minTranslate() ? (i = !1, x.params.resistance && (P = x.minTranslate() - 1 + Math.pow(-x.minTranslate() + E + r, x.params.resistanceRatio))) : r < 0 && P < x.maxTranslate() && (i = !1, x.params.resistance && (P = x.maxTranslate() + 1 - Math.pow(x.maxTranslate() - E - r, x.params.resistanceRatio))), i && (a.preventedByNestedSwiper = !0), !x.params.allowSwipeToNext && "next" === x.swipeDirection && P < E && (P = E), !x.params.allowSwipeToPrev && "prev" === x.swipeDirection && E < P && (P = E), 0 < x.params.threshold) {
                    if (!(Math.abs(r) > x.params.threshold || I)) return void(P = E);
                    if (!I) return I = !0, x.touches.startX = x.touches.currentX, x.touches.startY = x.touches.currentY, P = E, void(x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY)
                  }
                  x.params.followFinger && ((x.params.freeMode || x.params.watchSlidesProgress) && x.updateActiveIndex(), x.params.freeMode && (0 === H.length && H.push({
                    position: x.touches[x.isHorizontal() ? "startX" : "startY"],
                    time: z
                  }), H.push({
                    position: x.touches[x.isHorizontal() ? "currentX" : "currentY"],
                    time: (new window.Date).getTime()
                  })), x.updateProgress(P), x.setWrapperTranslate(P))
                }
              }
            }
          }
        }, x.onTouchEnd = function(a) {
          if (a.originalEvent && (a = a.originalEvent), S && x.emit("onTouchEnd", x, a), S = !1, b) {
            x.params.grabCursor && C && b && (!0 === x.params.allowSwipeToNext || !0 === x.params.allowSwipeToPrev) && x.setGrabCursor(!1);
            var r, t = Date.now(),
              s = t - z;
            if (x.allowClick && (x.updateClickedSlide(a), x.emit("onTap", x, a), s < 300 && 300 < t - B && (k && clearTimeout(k), k = setTimeout(function() {
                x && (x.params.paginationHide && 0 < x.paginationContainer.length && !e(a.target).hasClass(x.params.bulletClass) && x.paginationContainer.toggleClass(x.params.paginationHiddenClass), x.emit("onClick", x, a))
              }, 300)), s < 300 && t - B < 300 && (k && clearTimeout(k), x.emit("onDoubleTap", x, a))), B = Date.now(), setTimeout(function() {
                x && (x.allowClick = !0)
              }, 0), !b || !C || !x.swipeDirection || 0 === x.touches.diff || P === E) return void(b = C = !1);
            if (b = C = !1, r = x.params.followFinger ? x.rtl ? x.translate : -x.translate : -P, x.params.freeMode) {
              if (r < -x.minTranslate()) return void x.slideTo(x.activeIndex);
              if (r > -x.maxTranslate()) return void(x.slides.length < x.snapGrid.length ? x.slideTo(x.snapGrid.length - 1) : x.slideTo(x.slides.length - 1));
              if (x.params.freeModeMomentum) {
                if (1 < H.length) {
                  var i = H.pop(),
                    n = H.pop(),
                    o = i.position - n.position,
                    l = i.time - n.time;
                  x.velocity = o / l, x.velocity = x.velocity / 2, Math.abs(x.velocity) < x.params.freeModeMinimumVelocity && (x.velocity = 0), (150 < l || 300 < (new window.Date).getTime() - i.time) && (x.velocity = 0)
                } else x.velocity = 0;
                x.velocity = x.velocity * x.params.freeModeMomentumVelocityRatio, H.length = 0;
                var p = 1e3 * x.params.freeModeMomentumRatio,
                  d = x.velocity * p,
                  m = x.translate + d;
                x.rtl && (m = -m);
                var u, c = !1,
                  g = 20 * Math.abs(x.velocity) * x.params.freeModeMomentumBounceRatio;
                if (m < x.maxTranslate()) x.params.freeModeMomentumBounce ? (m + x.maxTranslate() < -g && (m = x.maxTranslate() - g), u = x.maxTranslate(), D = c = !0) : m = x.maxTranslate();
                else if (m > x.minTranslate()) x.params.freeModeMomentumBounce ? (m - x.minTranslate() > g && (m = x.minTranslate() + g), u = x.minTranslate(), D = c = !0) : m = x.minTranslate();
                else if (x.params.freeModeSticky) {
                  var h, v = 0;
                  for (v = 0; v < x.snapGrid.length; v += 1)
                    if (x.snapGrid[v] > -m) {
                      h = v;
                      break
                    } m = Math.abs(x.snapGrid[h] - m) < Math.abs(x.snapGrid[h - 1] - m) || "next" === x.swipeDirection ? x.snapGrid[h] : x.snapGrid[h - 1], x.rtl || (m = -m)
                }
                if (0 !== x.velocity) p = x.rtl ? Math.abs((-m - x.translate) / x.velocity) : Math.abs((m - x.translate) / x.velocity);
                else if (x.params.freeModeSticky) return void x.slideReset();
                x.params.freeModeMomentumBounce && c ? (x.updateProgress(u), x.setWrapperTransition(p), x.setWrapperTranslate(m), x.onTransitionStart(), x.animating = !0, x.wrapper.transitionEnd(function() {
                  x && D && (x.emit("onMomentumBounce", x), x.setWrapperTransition(x.params.speed), x.setWrapperTranslate(u), x.wrapper.transitionEnd(function() {
                    x && x.onTransitionEnd()
                  }))
                })) : x.velocity ? (x.updateProgress(m), x.setWrapperTransition(p), x.setWrapperTranslate(m), x.onTransitionStart(), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function() {
                  x && x.onTransitionEnd()
                }))) : x.updateProgress(m), x.updateActiveIndex()
              }
              return void((!x.params.freeModeMomentum || s >= x.params.longSwipesMs) && (x.updateProgress(), x.updateActiveIndex()))
            }
            var f, w = 0,
              y = x.slidesSizesGrid[0];
            for (f = 0; f < x.slidesGrid.length; f += x.params.slidesPerGroup) void 0 !== x.slidesGrid[f + x.params.slidesPerGroup] ? r >= x.slidesGrid[f] && r < x.slidesGrid[f + x.params.slidesPerGroup] && (w = f, y = x.slidesGrid[f + x.params.slidesPerGroup] - x.slidesGrid[f]) : r >= x.slidesGrid[f] && (w = f, y = x.slidesGrid[x.slidesGrid.length - 1] - x.slidesGrid[x.slidesGrid.length - 2]);
            var T = (r - x.slidesGrid[w]) / y;
            if (s > x.params.longSwipesMs) {
              if (!x.params.longSwipes) return void x.slideTo(x.activeIndex);
              "next" === x.swipeDirection && (T >= x.params.longSwipesRatio ? x.slideTo(w + x.params.slidesPerGroup) : x.slideTo(w)), "prev" === x.swipeDirection && (T > 1 - x.params.longSwipesRatio ? x.slideTo(w + x.params.slidesPerGroup) : x.slideTo(w))
            } else {
              if (!x.params.shortSwipes) return void x.slideTo(x.activeIndex);
              "next" === x.swipeDirection && x.slideTo(w + x.params.slidesPerGroup), "prev" === x.swipeDirection && x.slideTo(w)
            }
          }
        }, x._slideTo = function(e, a) {
          return x.slideTo(e, a, !0, !0)
        }, x.slideTo = function(e, a, t, s) {
          void 0 === t && (t = !0), void 0 === e && (e = 0), e < 0 && (e = 0), x.snapIndex = Math.floor(e / x.params.slidesPerGroup), x.snapIndex >= x.snapGrid.length && (x.snapIndex = x.snapGrid.length - 1);
          var r = -x.snapGrid[x.snapIndex];
          if (x.params.autoplay && x.autoplaying && (s || !x.params.autoplayDisableOnInteraction ? x.pauseAutoplay(a) : x.stopAutoplay()), x.updateProgress(r), x.params.normalizeSlideIndex)
            for (var i = 0; i < x.slidesGrid.length; i++) - Math.floor(100 * r) >= Math.floor(100 * x.slidesGrid[i]) && (e = i);
          return !(!x.params.allowSwipeToNext && r < x.translate && r < x.minTranslate() || !x.params.allowSwipeToPrev && r > x.translate && r > x.maxTranslate() && (x.activeIndex || 0) !== e || (void 0 === a && (a = x.params.speed), x.previousIndex = x.activeIndex || 0, x.activeIndex = e, x.updateRealIndex(), x.rtl && -r === x.translate || !x.rtl && r === x.translate ? (x.params.autoHeight && x.updateAutoHeight(), x.updateClasses(), "slide" !== x.params.effect && x.setWrapperTranslate(r), 1) : (x.updateClasses(), x.onTransitionStart(t), 0 === a || x.browser.lteIE9 ? (x.setWrapperTranslate(r), x.setWrapperTransition(0), x.onTransitionEnd(t)) : (x.setWrapperTranslate(r), x.setWrapperTransition(a), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function() {
            x && x.onTransitionEnd(t)
          }))), 0)))
        }, x.onTransitionStart = function(e) {
          void 0 === e && (e = !0), x.params.autoHeight && x.updateAutoHeight(), x.lazy && x.lazy.onTransitionStart(), e && (x.emit("onTransitionStart", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeStart", x), x.activeIndex > x.previousIndex ? x.emit("onSlideNextStart", x) : x.emit("onSlidePrevStart", x)))
        }, x.onTransitionEnd = function(e) {
          x.animating = !1, x.setWrapperTransition(0), void 0 === e && (e = !0), x.lazy && x.lazy.onTransitionEnd(), e && (x.emit("onTransitionEnd", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeEnd", x), x.activeIndex > x.previousIndex ? x.emit("onSlideNextEnd", x) : x.emit("onSlidePrevEnd", x))), x.params.history && x.history && x.history.setHistory(x.params.history, x.activeIndex), x.params.hashnav && x.hashnav && x.hashnav.setHash()
        }, x.slideNext = function(e, a, t) {
          return x.params.loop ? !x.animating && (x.fixLoop(), x.container[0].clientLeft, x.slideTo(x.activeIndex + x.params.slidesPerGroup, a, e, t)) : x.slideTo(x.activeIndex + x.params.slidesPerGroup, a, e, t)
        }, x._slideNext = function(e) {
          return x.slideNext(!0, e, !0)
        }, x.slidePrev = function(e, a, t) {
          return x.params.loop ? !x.animating && (x.fixLoop(), x.container[0].clientLeft, x.slideTo(x.activeIndex - 1, a, e, t)) : x.slideTo(x.activeIndex - 1, a, e, t)
        }, x._slidePrev = function(e) {
          return x.slidePrev(!0, e, !0)
        }, x.slideReset = function(e, a, t) {
          return x.slideTo(x.activeIndex, a, e)
        }, x.disableTouchControl = function() {
          return x.params.onlyExternal = !0
        }, x.enableTouchControl = function() {
          return !(x.params.onlyExternal = !1)
        }, x.setWrapperTransition = function(e, a) {
          x.wrapper.transition(e), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTransition(e), x.params.parallax && x.parallax && x.parallax.setTransition(e), x.params.scrollbar && x.scrollbar && x.scrollbar.setTransition(e), x.params.control && x.controller && x.controller.setTransition(e, a), x.emit("onSetTransition", x, e)
        }, x.setWrapperTranslate = function(e, a, t) {
          var s = 0,
            i = 0;
          x.isHorizontal() ? s = x.rtl ? -e : e : i = e, x.params.roundLengths && (s = r(s), i = r(i)), x.params.virtualTranslate || (x.support.transforms3d ? x.wrapper.transform("translate3d(" + s + "px, " + i + "px, 0px)") : x.wrapper.transform("translate(" + s + "px, " + i + "px)")), x.translate = x.isHorizontal() ? s : i;
          var o = x.maxTranslate() - x.minTranslate();
          (0 == o ? 0 : (e - x.minTranslate()) / o) !== x.progress && x.updateProgress(e), a && x.updateActiveIndex(), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTranslate(x.translate), x.params.parallax && x.parallax && x.parallax.setTranslate(x.translate), x.params.scrollbar && x.scrollbar && x.scrollbar.setTranslate(x.translate), x.params.control && x.controller && x.controller.setTranslate(x.translate, t), x.emit("onSetTranslate", x, x.translate)
        }, x.getTranslate = function(e, a) {
          var t, s, r, i;
          return void 0 === a && (a = "x"), x.params.virtualTranslate ? x.rtl ? -x.translate : x.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (6 < (s = r.transform || r.webkitTransform).split(",").length && (s = s.split(", ").map(function(e) {
            return e.replace(",", ".")
          }).join(", ")), i = new window.WebKitCSSMatrix("none" === s ? "" : s)) : t = (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), x.rtl && s && (s = -s), s || 0)
        }, x.getWrapperTranslate = function(e) {
          return void 0 === e && (e = x.isHorizontal() ? "x" : "y"), x.getTranslate(x.wrapper[0], e)
        }, x.observers = [], x.initObservers = function() {
          if (x.params.observeParents)
            for (var e = x.container.parents(), a = 0; a < e.length; a++) o(e[a]);
          o(x.container[0], {
            childList: !1
          }), o(x.wrapper[0], {
            attributes: !1
          })
        }, x.disconnectObservers = function() {
          for (var e = 0; e < x.observers.length; e++) x.observers[e].disconnect();
          x.observers = []
        }, x.createLoop = function() {
          x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove();
          var a = x.wrapper.children("." + x.params.slideClass);
          "auto" !== x.params.slidesPerView || x.params.loopedSlides || (x.params.loopedSlides = a.length), x.loopedSlides = parseInt(x.params.loopedSlides || x.params.slidesPerView, 10), x.loopedSlides = x.loopedSlides + x.params.loopAdditionalSlides, x.loopedSlides > a.length && (x.loopedSlides = a.length);
          var t, s = [],
            r = [];
          for (a.each(function(t, i) {
              var n = e(this);
              t < x.loopedSlides && r.push(i), t < a.length && t >= a.length - x.loopedSlides && s.push(i), n.attr("data-swiper-slide-index", t)
            }), t = 0; t < r.length; t++) x.wrapper.append(e(r[t].cloneNode(!0)).addClass(x.params.slideDuplicateClass));
          for (t = s.length - 1; 0 <= t; t--) x.wrapper.prepend(e(s[t].cloneNode(!0)).addClass(x.params.slideDuplicateClass))
        }, x.destroyLoop = function() {
          x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove(), x.slides.removeAttr("data-swiper-slide-index")
        }, x.reLoop = function(e) {
          var a = x.activeIndex - x.loopedSlides;
          x.destroyLoop(), x.createLoop(), x.updateSlidesSize(), e && x.slideTo(a + x.loopedSlides, 0, !1)
        }, x.fixLoop = function() {
          var e;
          x.activeIndex < x.loopedSlides ? (e = x.slides.length - 3 * x.loopedSlides + x.activeIndex, e += x.loopedSlides, x.slideTo(e, 0, !1, !0)) : ("auto" === x.params.slidesPerView && x.activeIndex >= 2 * x.loopedSlides || x.activeIndex > x.slides.length - 2 * x.params.slidesPerView) && (e = -x.slides.length + x.activeIndex + x.loopedSlides, e += x.loopedSlides, x.slideTo(e, 0, !1, !0))
        }, x.appendSlide = function(e) {
          if (x.params.loop && x.destroyLoop(), "object" == typeof e && e.length)
            for (var a = 0; a < e.length; a++) e[a] && x.wrapper.append(e[a]);
          else x.wrapper.append(e);
          x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0)
        }, x.prependSlide = function(e) {
          x.params.loop && x.destroyLoop();
          var a = x.activeIndex + 1;
          if ("object" == typeof e && e.length) {
            for (var t = 0; t < e.length; t++) e[t] && x.wrapper.prepend(e[t]);
            a = x.activeIndex + e.length
          } else x.wrapper.prepend(e);
          x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), x.slideTo(a, 0, !1)
        }, x.removeSlide = function(e) {
          x.params.loop && (x.destroyLoop(), x.slides = x.wrapper.children("." + x.params.slideClass));
          var a, t = x.activeIndex;
          if ("object" == typeof e && e.length) {
            for (var s = 0; s < e.length; s++) a = e[s], x.slides[a] && x.slides.eq(a).remove(), a < t && t--;
            t = Math.max(t, 0)
          } else a = e, x.slides[a] && x.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);
          x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), x.params.loop ? x.slideTo(t + x.loopedSlides, 0, !1) : x.slideTo(t, 0, !1)
        }, x.removeAllSlides = function() {
          for (var e = [], a = 0; a < x.slides.length; a++) e.push(a);
          x.removeSlide(e)
        }, x.effects = {
          fade: {
            setTranslate: function() {
              for (var e = 0; e < x.slides.length; e++) {
                var a = x.slides.eq(e),
                  s = -a[0].swiperSlideOffset;
                x.params.virtualTranslate || (s -= x.translate);
                var r = 0;
                x.isHorizontal() || (r = s, s = 0);
                var i = x.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                a.css({
                  opacity: i
                }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
              }
            },
            setTransition: function(e) {
              if (x.slides.transition(e), x.params.virtualTranslate && 0 !== e) {
                var a = !1;
                x.slides.transitionEnd(function() {
                  if (!a && x) {
                    a = !0, x.animating = !1;
                    for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) x.wrapper.trigger(e[t])
                  }
                })
              }
            }
          },
          flip: {
            setTranslate: function() {
              for (var a = 0; a < x.slides.length; a++) {
                var t = x.slides.eq(a),
                  s = t[0].progress;
                x.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));
                var n = -180 * s,
                  o = 0,
                  l = -t[0].swiperSlideOffset,
                  p = 0;
                if (x.isHorizontal() ? x.rtl && (n = -n) : (p = l, o = -n, n = l = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + x.slides.length, x.params.flip.slideShadows) {
                  var d = x.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                    m = x.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                  0 === d.length && (d = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === m.length && (m = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(m)), d.length && (d[0].style.opacity = Math.max(-s, 0)), m.length && (m[0].style.opacity = Math.max(s, 0))
                }
                t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
              }
            },
            setTransition: function(a) {
              if (x.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a), x.params.virtualTranslate && 0 !== a) {
                var t = !1;
                x.slides.eq(x.activeIndex).transitionEnd(function() {
                  if (!t && x && e(this).hasClass(x.params.slideActiveClass)) {
                    t = !0, x.animating = !1;
                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < a.length; s++) x.wrapper.trigger(a[s])
                  }
                })
              }
            }
          },
          cube: {
            setTranslate: function() {
              var a, t = 0;
              x.params.cube.shadow && (x.isHorizontal() ? (0 === (a = x.wrapper.find(".swiper-cube-shadow")).length && (a = e('<div class="swiper-cube-shadow"></div>'), x.wrapper.append(a)), a.css({
                height: x.width + "px"
              })) : 0 === (a = x.container.find(".swiper-cube-shadow")).length && (a = e('<div class="swiper-cube-shadow"></div>'), x.container.append(a)));
              for (var s = 0; s < x.slides.length; s++) {
                var r = x.slides.eq(s),
                  i = 90 * s,
                  n = Math.floor(i / 360);
                x.rtl && (i = -i, n = Math.floor(-i / 360));
                var o = Math.max(Math.min(r[0].progress, 1), -1),
                  l = 0,
                  p = 0,
                  d = 0;
                s % 4 == 0 ? (l = 4 * -n * x.size, d = 0) : (s - 1) % 4 == 0 ? (l = 0, d = 4 * -n * x.size) : (s - 2) % 4 == 0 ? (l = x.size + 4 * n * x.size, d = x.size) : (s - 3) % 4 == 0 && (l = -x.size, d = 3 * x.size + 4 * x.size * n), x.rtl && (l = -l), x.isHorizontal() || (p = l, l = 0);
                var m = "rotateX(" + (x.isHorizontal() ? 0 : -i) + "deg) rotateY(" + (x.isHorizontal() ? i : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                if (o <= 1 && -1 < o && (t = 90 * s + 90 * o, x.rtl && (t = 90 * -s - 90 * o)), r.transform(m), x.params.cube.slideShadows) {
                  var u = x.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                    c = x.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                  0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), r.append(u)), 0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(c)), u.length && (u[0].style.opacity = Math.max(-o, 0)), c.length && (c[0].style.opacity = Math.max(o, 0))
                }
              }
              if (x.wrapper.css({
                  "-webkit-transform-origin": "50% 50% -" + x.size / 2 + "px",
                  "-moz-transform-origin": "50% 50% -" + x.size / 2 + "px",
                  "-ms-transform-origin": "50% 50% -" + x.size / 2 + "px",
                  "transform-origin": "50% 50% -" + x.size / 2 + "px"
                }), x.params.cube.shadow)
                if (x.isHorizontal()) a.transform("translate3d(0px, " + (x.width / 2 + x.params.cube.shadowOffset) + "px, " + -x.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + x.params.cube.shadowScale + ")");
                else {
                  var g = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                    h = 1.5 - (Math.sin(2 * g * Math.PI / 360) / 2 + Math.cos(2 * g * Math.PI / 360) / 2),
                    v = x.params.cube.shadowScale,
                    f = x.params.cube.shadowScale / h,
                    w = x.params.cube.shadowOffset;
                  a.transform("scale3d(" + v + ", 1, " + f + ") translate3d(0px, " + (x.height / 2 + w) + "px, " + -x.height / 2 / f + "px) rotateX(-90deg)")
                } var y = x.isSafari || x.isUiWebView ? -x.size / 2 : 0;
              x.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (x.isHorizontal() ? 0 : t) + "deg) rotateY(" + (x.isHorizontal() ? -t : 0) + "deg)")
            },
            setTransition: function(e) {
              x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), x.params.cube.shadow && !x.isHorizontal() && x.container.find(".swiper-cube-shadow").transition(e)
            }
          },
          coverflow: {
            setTranslate: function() {
              for (var a = x.translate, t = x.isHorizontal() ? -a + x.width / 2 : -a + x.height / 2, s = x.isHorizontal() ? x.params.coverflow.rotate : -x.params.coverflow.rotate, r = x.params.coverflow.depth, i = 0, n = x.slides.length; i < n; i++) {
                var o = x.slides.eq(i),
                  l = x.slidesSizesGrid[i],
                  d = (t - o[0].swiperSlideOffset - l / 2) / l * x.params.coverflow.modifier,
                  m = x.isHorizontal() ? s * d : 0,
                  u = x.isHorizontal() ? 0 : s * d,
                  c = -r * Math.abs(d),
                  g = x.isHorizontal() ? 0 : x.params.coverflow.stretch * d,
                  h = x.isHorizontal() ? x.params.coverflow.stretch * d : 0;
                Math.abs(h) < .001 && (h = 0), Math.abs(g) < .001 && (g = 0), Math.abs(c) < .001 && (c = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0);
                var v = "translate3d(" + h + "px," + g + "px," + c + "px)  rotateX(" + u + "deg) rotateY(" + m + "deg)";
                if (o.transform(v), o[0].style.zIndex = 1 - Math.abs(Math.round(d)), x.params.coverflow.slideShadows) {
                  var f = x.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                    w = x.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                  0 === f.length && (f = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), o.append(f)), 0 === w.length && (w = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), f.length && (f[0].style.opacity = 0 < d ? d : 0), w.length && (w[0].style.opacity = 0 < -d ? -d : 0)
                }
              }
              x.browser.ie && (x.wrapper[0].style.perspectiveOrigin = t + "px 50%")
            },
            setTransition: function(e) {
              x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
          }
        }, x.lazy = {
          initialImageLoaded: !1,
          loadImageInSlide: function(a, t) {
            if (void 0 !== a && (void 0 === t && (t = !0), 0 !== x.slides.length)) {
              var s = x.slides.eq(a),
                r = s.find("." + x.params.lazyLoadingClass + ":not(." + x.params.lazyStatusLoadedClass + "):not(." + x.params.lazyStatusLoadingClass + ")");
              !s.hasClass(x.params.lazyLoadingClass) || s.hasClass(x.params.lazyStatusLoadedClass) || s.hasClass(x.params.lazyStatusLoadingClass) || (r = r.add(s[0])), 0 !== r.length && r.each(function() {
                var a = e(this);
                a.addClass(x.params.lazyStatusLoadingClass);
                var r = a.attr("data-background"),
                  i = a.attr("data-src"),
                  n = a.attr("data-srcset"),
                  o = a.attr("data-sizes");
                x.loadImage(a[0], i || r, n, o, !1, function() {
                  if (null != x && x) {
                    if (r ? (a.css("background-image", 'url("' + r + '")'), a.removeAttr("data-background")) : (n && (a.attr("srcset", n), a.removeAttr("data-srcset")), o && (a.attr("sizes", o), a.removeAttr("data-sizes")), i && (a.attr("src", i), a.removeAttr("data-src"))), a.addClass(x.params.lazyStatusLoadedClass).removeClass(x.params.lazyStatusLoadingClass), s.find("." + x.params.lazyPreloaderClass + ", ." + x.params.preloaderClass).remove(), x.params.loop && t) {
                      var e = s.attr("data-swiper-slide-index");
                      if (s.hasClass(x.params.slideDuplicateClass)) {
                        var l = x.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + x.params.slideDuplicateClass + ")");
                        x.lazy.loadImageInSlide(l.index(), !1)
                      } else {
                        var p = x.wrapper.children("." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                        x.lazy.loadImageInSlide(p.index(), !1)
                      }
                    }
                    x.emit("onLazyImageReady", x, s[0], a[0])
                  }
                }), x.emit("onLazyImageLoad", x, s[0], a[0])
              })
            }
          },
          load: function() {
            var a, t = x.params.slidesPerView;
            if ("auto" === t && (t = 0), x.lazy.initialImageLoaded || (x.lazy.initialImageLoaded = !0), x.params.watchSlidesVisibility) x.wrapper.children("." + x.params.slideVisibleClass).each(function() {
              x.lazy.loadImageInSlide(e(this).index())
            });
            else if (1 < t)
              for (a = x.activeIndex; a < x.activeIndex + t; a++) x.slides[a] && x.lazy.loadImageInSlide(a);
            else x.lazy.loadImageInSlide(x.activeIndex);
            if (x.params.lazyLoadingInPrevNext)
              if (1 < t || x.params.lazyLoadingInPrevNextAmount && 1 < x.params.lazyLoadingInPrevNextAmount) {
                var s = x.params.lazyLoadingInPrevNextAmount,
                  r = t,
                  i = Math.min(x.activeIndex + r + Math.max(s, r), x.slides.length),
                  n = Math.max(x.activeIndex - Math.max(r, s), 0);
                for (a = x.activeIndex + t; a < i; a++) x.slides[a] && x.lazy.loadImageInSlide(a);
                for (a = n; a < x.activeIndex; a++) x.slides[a] && x.lazy.loadImageInSlide(a)
              } else {
                var o = x.wrapper.children("." + x.params.slideNextClass);
                0 < o.length && x.lazy.loadImageInSlide(o.index());
                var l = x.wrapper.children("." + x.params.slidePrevClass);
                0 < l.length && x.lazy.loadImageInSlide(l.index())
              }
          },
          onTransitionStart: function() {
            x.params.lazyLoading && (x.params.lazyLoadingOnTransitionStart || !x.params.lazyLoadingOnTransitionStart && !x.lazy.initialImageLoaded) && x.lazy.load()
          },
          onTransitionEnd: function() {
            x.params.lazyLoading && !x.params.lazyLoadingOnTransitionStart && x.lazy.load()
          }
        }, x.scrollbar = {
          isTouched: !1,
          setDragPosition: function(e) {
            var a = x.scrollbar,
              s = (x.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - a.track.offset()[x.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
              r = -x.minTranslate() * a.moveDivider,
              i = -x.maxTranslate() * a.moveDivider;
            s < r ? s = r : i < s && (s = i), s = -s / a.moveDivider, x.updateProgress(s), x.setWrapperTranslate(s, !0)
          },
          dragStart: function(e) {
            var a = x.scrollbar;
            a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), x.params.scrollbarHide && a.track.css("opacity", 1), x.wrapper.transition(100), a.drag.transition(100), x.emit("onScrollbarDragStart", x)
          },
          dragMove: function(e) {
            var a = x.scrollbar;
            a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), x.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), x.emit("onScrollbarDragMove", x))
          },
          dragEnd: function(e) {
            var a = x.scrollbar;
            a.isTouched && (a.isTouched = !1, x.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function() {
              a.track.css("opacity", 0), a.track.transition(400)
            }, 1e3)), x.emit("onScrollbarDragEnd", x), x.params.scrollbarSnapOnRelease && x.slideReset())
          },
          draggableEvents: !1 !== x.params.simulateTouch || x.support.touch ? x.touchEvents : x.touchEventsDesktop,
          enableDraggable: function() {
            var a = x.scrollbar,
              t = x.support.touch ? a.track : document;
            e(a.track).on(a.draggableEvents.start, a.dragStart), e(t).on(a.draggableEvents.move, a.dragMove), e(t).on(a.draggableEvents.end, a.dragEnd)
          },
          disableDraggable: function() {
            var a = x.scrollbar,
              t = x.support.touch ? a.track : document;
            e(a.track).off(a.draggableEvents.start, a.dragStart), e(t).off(a.draggableEvents.move, a.dragMove), e(t).off(a.draggableEvents.end, a.dragEnd)
          },
          set: function() {
            if (x.params.scrollbar) {
              var a = x.scrollbar;
              a.track = e(x.params.scrollbar), x.params.uniqueNavElements && "string" == typeof x.params.scrollbar && 1 < a.track.length && 1 === x.container.find(x.params.scrollbar).length && (a.track = x.container.find(x.params.scrollbar)), a.drag = a.track.find(".swiper-scrollbar-drag"), 0 === a.drag.length && (a.drag = e('<div class="swiper-scrollbar-drag"></div>'), a.track.append(a.drag)), a.drag[0].style.width = "", a.drag[0].style.height = "", a.trackSize = x.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight, a.divider = x.size / x.virtualSize, a.moveDivider = a.divider * (a.trackSize / x.size), a.dragSize = a.trackSize * a.divider, x.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px", 1 <= a.divider ? a.track[0].style.display = "none" : a.track[0].style.display = "", x.params.scrollbarHide && (a.track[0].style.opacity = 0)
            }
          },
          setTranslate: function() {
            if (x.params.scrollbar) {
              var e, a = x.scrollbar,
                t = (x.translate, a.dragSize);
              e = (a.trackSize - a.dragSize) * x.progress, x.rtl && x.isHorizontal() ? 0 < (e = -e) ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), x.isHorizontal() ? (x.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (x.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), x.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                a.track[0].style.opacity = 0, a.track.transition(400)
              }, 1e3))
            }
          },
          setTransition: function(e) {
            x.params.scrollbar && x.scrollbar.drag.transition(e)
          }
        }, x.controller = {
          LinearSpline: function(e, a) {
            var s, r, t = function() {
              var e, a, t;
              return function(s, r) {
                for (a = -1, e = s.length; 1 < e - a;) s[t = e + a >> 1] <= r ? a = t : e = t;
                return e
              }
            }();
            this.x = e, this.y = a, this.lastIndex = e.length - 1, this.x.length, this.interpolate = function(e) {
              return e ? (r = t(this.x, e), s = r - 1, (e - this.x[s]) * (this.y[r] - this.y[s]) / (this.x[r] - this.x[s]) + this.y[s]) : 0
            }
          },
          getInterpolateFunction: function(e) {
            x.controller.spline || (x.controller.spline = x.params.loop ? new x.controller.LinearSpline(x.slidesGrid, e.slidesGrid) : new x.controller.LinearSpline(x.snapGrid, e.snapGrid))
          },
          setTranslate: function(e, t) {
            function s(a) {
              e = a.rtl && "horizontal" === a.params.direction ? -x.translate : x.translate, "slide" === x.params.controlBy && (x.controller.getInterpolateFunction(a), i = -x.controller.spline.interpolate(-e)), i && "container" !== x.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (x.maxTranslate() - x.minTranslate()), i = (e - x.minTranslate()) * r + a.minTranslate()), x.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, x), a.updateActiveIndex()
            }
            var r, i, n = x.params.control;
            if (Array.isArray(n))
              for (var o = 0; o < n.length; o++) n[o] !== t && n[o] instanceof a && s(n[o]);
            else n instanceof a && t !== n && s(n)
          },
          setTransition: function(e, t) {
            function s(a) {
              a.setWrapperTransition(e, x), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                i && (a.params.loop && "slide" === x.params.controlBy && a.fixLoop(), a.onTransitionEnd())
              }))
            }
            var r, i = x.params.control;
            if (Array.isArray(i))
              for (r = 0; r < i.length; r++) i[r] !== t && i[r] instanceof a && s(i[r]);
            else i instanceof a && t !== i && s(i)
          }
        }, x.hashnav = {
          onHashCange: function(e, a) {
            var t = document.location.hash.replace("#", "");
            t !== x.slides.eq(x.activeIndex).attr("data-hash") && x.slideTo(x.wrapper.children("." + x.params.slideClass + '[data-hash="' + t + '"]').index())
          },
          attachEvents: function(a) {
            var t = a ? "off" : "on";
            e(window)[t]("hashchange", x.hashnav.onHashCange)
          },
          setHash: function() {
            if (x.hashnav.initialized && x.params.hashnav)
              if (x.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + x.slides.eq(x.activeIndex).attr("data-hash") || "");
              else {
                var e = x.slides.eq(x.activeIndex),
                  a = e.attr("data-hash") || e.attr("data-history");
                document.location.hash = a || ""
              }
          },
          init: function() {
            if (x.params.hashnav && !x.params.history) {
              x.hashnav.initialized = !0;
              var e = document.location.hash.replace("#", "");
              if (e)
                for (var a = 0, t = x.slides.length; a < t; a++) {
                  var s = x.slides.eq(a);
                  if ((s.attr("data-hash") || s.attr("data-history")) === e && !s.hasClass(x.params.slideDuplicateClass)) {
                    var i = s.index();
                    x.slideTo(i, 0, x.params.runCallbacksOnInit, !0)
                  }
                }
              x.params.hashnavWatchState && x.hashnav.attachEvents()
            }
          },
          destroy: function() {
            x.params.hashnavWatchState && x.hashnav.attachEvents(!0)
          }
        }, x.history = {
          init: function() {
            if (x.params.history) {
              if (!window.history || !window.history.pushState) return x.params.history = !1, void(x.params.hashnav = !0);
              x.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, x.params.runCallbacksOnInit), x.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
            }
          },
          setHistoryPopState: function() {
            x.history.paths = x.history.getPathValues(), x.history.scrollToSlide(x.params.speed, x.history.paths.value, !1)
          },
          getPathValues: function() {
            var e = window.location.pathname.slice(1).split("/"),
              a = e.length;
            return {
              key: e[a - 2],
              value: e[a - 1]
            }
          },
          setHistory: function(e, a) {
            if (x.history.initialized && x.params.history) {
              var t = x.slides.eq(a),
                s = this.slugify(t.attr("data-history"));
              window.location.pathname.includes(e) || (s = e + "/" + s), x.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s)
            }
          },
          slugify: function(e) {
            return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
          },
          scrollToSlide: function(e, a, t) {
            if (a)
              for (var s = 0, r = x.slides.length; s < r; s++) {
                var i = x.slides.eq(s);
                if (this.slugify(i.attr("data-history")) === a && !i.hasClass(x.params.slideDuplicateClass)) {
                  var o = i.index();
                  x.slideTo(o, e, t)
                }
              } else x.slideTo(0, e, t)
          }
        }, x.disableKeyboardControl = function() {
          x.params.keyboardControl = !1, e(document).off("keydown", l)
        }, x.enableKeyboardControl = function() {
          x.params.keyboardControl = !0, e(document).on("keydown", l)
        }, x.mousewheel = {
          event: !1,
          lastScrollTime: (new window.Date).getTime()
        }, x.params.mousewheelControl && (x.mousewheel.event = -1 < navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
          var e = "onwheel" in document;
          if (!e) {
            var a = document.createElement("div");
            a.setAttribute("onwheel", "return;"), e = "function" == typeof a.onwheel
          }
          return !e && document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "") && (e = document.implementation.hasFeature("Events.wheel", "3.0")), e
        }() ? "wheel" : "mousewheel"), x.disableMousewheelControl = function() {
          if (!x.mousewheel.event) return !1;
          var a = x.container;
          return "container" !== x.params.mousewheelEventsTarged && (a = e(x.params.mousewheelEventsTarged)), a.off(x.mousewheel.event, d), !(x.params.mousewheelControl = !1)
        }, x.enableMousewheelControl = function() {
          if (!x.mousewheel.event) return !1;
          var a = x.container;
          return "container" !== x.params.mousewheelEventsTarged && (a = e(x.params.mousewheelEventsTarged)), a.on(x.mousewheel.event, d), x.params.mousewheelControl = !0
        }, x.parallax = {
          setTranslate: function() {
            x.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
              m(this, x.progress)
            }), x.slides.each(function() {
              var a = e(this);
              a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                m(this, Math.min(Math.max(a[0].progress, -1), 1))
              })
            })
          },
          setTransition: function(a) {
            void 0 === a && (a = x.params.speed), x.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
              var t = e(this),
                s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || a;
              0 === a && (s = 0), t.transition(s)
            })
          }
        }, x.zoom = {
          scale: 1,
          currentScale: 1,
          isScaling: !1,
          gesture: {
            slide: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            image: void 0,
            imageWrap: void 0,
            zoomMax: x.params.zoomMax
          },
          image: {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
          },
          velocity: {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0
          },
          getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2) return 1;
            var a = e.targetTouches[0].pageX,
              t = e.targetTouches[0].pageY,
              s = e.targetTouches[1].pageX,
              r = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(s - a, 2) + Math.pow(r - t, 2))
          },
          onGestureStart: function(a) {
            var t = x.zoom;
            if (!x.support.gestures) {
              if ("touchstart" !== a.type || "touchstart" === a.type && a.targetTouches.length < 2) return;
              t.gesture.scaleStart = t.getDistanceBetweenTouches(a)
            }
            t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = e(this), 0 === t.gesture.slide.length && (t.gesture.slide = x.slides.eq(x.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + x.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || x.params.zoomMax, 0 !== t.gesture.imageWrap.length) ? (t.gesture.image.transition(0), t.isScaling = !0) : t.gesture.image = void 0
          },
          onGestureChange: function(e) {
            var a = x.zoom;
            if (!x.support.gestures) {
              if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
              a.gesture.scaleMove = a.getDistanceBetweenTouches(e)
            }
            a.gesture.image && 0 !== a.gesture.image.length && (x.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < x.params.zoomMin && (a.scale = x.params.zoomMin + 1 - Math.pow(x.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
          },
          onGestureEnd: function(e) {
            var a = x.zoom;
            !x.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), x.params.zoomMin), a.gesture.image.transition(x.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0))
          },
          onTouchStart: function(e, a) {
            var t = e.zoom;
            t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY))
          },
          onTouchMove: function(e) {
            var a = x.zoom;
            if (a.gesture.image && 0 !== a.gesture.image.length && (x.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
              a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = x.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = x.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), x.rtl && (a.image.startX = -a.image.startX), x.rtl && (a.image.startY = -a.image.startY));
              var t = a.image.width * a.scale,
                s = a.image.height * a.scale;
              if (!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
                if (a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - s / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) {
                  if (x.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x) return void(a.image.isTouched = !1);
                  if (!x.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y) return void(a.image.isTouched = !1)
                }
                e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)")
              }
            }
          },
          onTouchEnd: function(e, a) {
            var t = e.zoom;
            if (t.gesture.image && 0 !== t.gesture.image.length) {
              if (!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void(t.image.isMoved = !1);
              t.image.isTouched = !1, t.image.isMoved = !1;
              var s = 300,
                r = 300,
                i = t.velocity.x * s,
                n = t.image.currentX + i,
                o = t.velocity.y * r,
                l = t.image.currentY + o;
              0 !== t.velocity.x && (s = Math.abs((n - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (r = Math.abs((l - t.image.currentY) / t.velocity.y));
              var p = Math.max(s, r);
              t.image.currentX = n, t.image.currentY = l;
              var d = t.image.width * t.scale,
                m = t.image.height * t.scale;
              t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - m / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
            }
          },
          onTransitionEnd: function(e) {
            var a = e.zoom;
            a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1)
          },
          toggleZoom: function(a, t) {
            var r, i, l, p, d, m, u, c, g, h, v, f, w, y, x, T, s = a.zoom;
            s.gesture.slide || (s.gesture.slide = a.clickedSlide ? e(a.clickedSlide) : a.slides.eq(a.activeIndex), s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + a.params.zoomContainerClass)), s.gesture.image && 0 !== s.gesture.image.length && (i = void 0 === s.image.touchesStart.x && t ? (r = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (r = s.image.touchesStart.x, s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-swiper-zoom") || a.params.zoomMax, t ? (x = s.gesture.slide[0].offsetWidth, T = s.gesture.slide[0].offsetHeight, l = s.gesture.slide.offset().left + x / 2 - r, p = s.gesture.slide.offset().top + T / 2 - i, u = s.gesture.image[0].offsetWidth, c = s.gesture.image[0].offsetHeight, g = u * s.scale, h = c * s.scale, w = -(v = Math.min(x / 2 - g / 2, 0)), y = -(f = Math.min(T / 2 - h / 2, 0)), (d = l * s.scale) < v && (d = v), w < d && (d = w), (m = p * s.scale) < f && (m = f), y < m && (m = y)) : m = d = 0, s.gesture.imageWrap.transition(300).transform("translate3d(" + d + "px, " + m + "px,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")")))
          },
          attachEvents: function(a) {
            var t = a ? "off" : "on";
            if (x.params.zoom) {
              var s = (x.slides, !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                passive: !0,
                capture: !1
              });
              x.support.gestures ? (x.slides[t]("gesturestart", x.zoom.onGestureStart, s), x.slides[t]("gesturechange", x.zoom.onGestureChange, s), x.slides[t]("gestureend", x.zoom.onGestureEnd, s)) : "touchstart" === x.touchEvents.start && (x.slides[t](x.touchEvents.start, x.zoom.onGestureStart, s), x.slides[t](x.touchEvents.move, x.zoom.onGestureChange, s), x.slides[t](x.touchEvents.end, x.zoom.onGestureEnd, s)), x[t]("touchStart", x.zoom.onTouchStart), x.slides.each(function(a, s) {
                0 < e(s).find("." + x.params.zoomContainerClass).length && e(s)[t](x.touchEvents.move, x.zoom.onTouchMove)
              }), x[t]("touchEnd", x.zoom.onTouchEnd), x[t]("transitionEnd", x.zoom.onTransitionEnd), x.params.zoomToggle && x.on("doubleTap", x.zoom.toggleZoom)
            }
          },
          init: function() {
            x.zoom.attachEvents()
          },
          destroy: function() {
            x.zoom.attachEvents(!0)
          }
        }, x._plugins = [], x.plugins) {
        var A = x.plugins[Y](x, x.params[Y]);
        A && x._plugins.push(A)
      }
      return x.callPlugins = function(e) {
        for (var a = 0; a < x._plugins.length; a++) e in x._plugins[a] && x._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
      }, x.emitterEventListeners = {}, x.emit = function(e) {
        var a;
        if (x.params[e] && x.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), x.emitterEventListeners[e])
          for (a = 0; a < x.emitterEventListeners[e].length; a++) x.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        x.callPlugins && x.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
      }, x.on = function(e, a) {
        return e = u(e), x.emitterEventListeners[e] || (x.emitterEventListeners[e] = []), x.emitterEventListeners[e].push(a), x
      }, x.off = function(e, a) {
        var t;
        if (e = u(e), void 0 === a) return x.emitterEventListeners[e] = [], x;
        if (x.emitterEventListeners[e] && 0 !== x.emitterEventListeners[e].length) {
          for (t = 0; t < x.emitterEventListeners[e].length; t++) x.emitterEventListeners[e][t] === a && x.emitterEventListeners[e].splice(t, 1);
          return x
        }
      }, x.once = function(e, a) {
        e = u(e);
        var t = function() {
          a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), x.off(e, t)
        };
        return x.on(e, t), x
      }, x.a11y = {
        makeFocusable: function(e) {
          return e.attr("tabIndex", "0"), e
        },
        addRole: function(e, a) {
          return e.attr("role", a), e
        },
        addLabel: function(e, a) {
          return e.attr("aria-label", a), e
        },
        disable: function(e) {
          return e.attr("aria-disabled", !0), e
        },
        enable: function(e) {
          return e.attr("aria-disabled", !1), e
        },
        onEnterKey: function(a) {
          13 === a.keyCode && (e(a.target).is(x.params.nextButton) ? (x.onClickNext(a), x.isEnd ? x.a11y.notify(x.params.lastSlideMessage) : x.a11y.notify(x.params.nextSlideMessage)) : e(a.target).is(x.params.prevButton) && (x.onClickPrev(a), x.isBeginning ? x.a11y.notify(x.params.firstSlideMessage) : x.a11y.notify(x.params.prevSlideMessage)), e(a.target).is("." + x.params.bulletClass) && e(a.target)[0].click())
        },
        liveRegion: e('<span class="' + x.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
        notify: function(e) {
          var a = x.a11y.liveRegion;
          0 !== a.length && (a.html(""), a.html(e))
        },
        init: function() {
          x.params.nextButton && x.nextButton && 0 < x.nextButton.length && (x.a11y.makeFocusable(x.nextButton), x.a11y.addRole(x.nextButton, "button"), x.a11y.addLabel(x.nextButton, x.params.nextSlideMessage)), x.params.prevButton && x.prevButton && 0 < x.prevButton.length && (x.a11y.makeFocusable(x.prevButton), x.a11y.addRole(x.prevButton, "button"), x.a11y.addLabel(x.prevButton, x.params.prevSlideMessage)), e(x.container).append(x.a11y.liveRegion)
        },
        initPagination: function() {
          x.params.pagination && x.params.paginationClickable && x.bullets && x.bullets.length && x.bullets.each(function() {
            var a = e(this);
            x.a11y.makeFocusable(a), x.a11y.addRole(a, "button"), x.a11y.addLabel(a, x.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
          })
        },
        destroy: function() {
          x.a11y.liveRegion && 0 < x.a11y.liveRegion.length && x.a11y.liveRegion.remove()
        }
      }, x.init = function() {
        x.params.loop && x.createLoop(), x.updateContainerSize(), x.updateSlidesSize(), x.updatePagination(), x.params.scrollbar && x.scrollbar && (x.scrollbar.set(), x.params.scrollbarDraggable && x.scrollbar.enableDraggable()), "slide" !== x.params.effect && x.effects[x.params.effect] && (x.params.loop || x.updateProgress(), x.effects[x.params.effect].setTranslate()), x.params.loop ? x.slideTo(x.params.initialSlide + x.loopedSlides, 0, x.params.runCallbacksOnInit) : (x.slideTo(x.params.initialSlide, 0, x.params.runCallbacksOnInit), 0 === x.params.initialSlide && (x.parallax && x.params.parallax && x.parallax.setTranslate(), x.lazy && x.params.lazyLoading && (x.lazy.load(), x.lazy.initialImageLoaded = !0))), x.attachEvents(), x.params.observer && x.support.observer && x.initObservers(), x.params.preloadImages && !x.params.lazyLoading && x.preloadImages(), x.params.zoom && x.zoom && x.zoom.init(), x.params.autoplay && x.startAutoplay(), x.params.keyboardControl && x.enableKeyboardControl && x.enableKeyboardControl(), x.params.mousewheelControl && x.enableMousewheelControl && x.enableMousewheelControl(), x.params.hashnavReplaceState && (x.params.replaceState = x.params.hashnavReplaceState), x.params.history && x.history && x.history.init(), x.params.hashnav && x.hashnav && x.hashnav.init(), x.params.a11y && x.a11y && x.a11y.init(), x.emit("onInit", x)
      }, x.cleanupStyles = function() {
        x.container.removeClass(x.classNames.join(" ")).removeAttr("style"), x.wrapper.removeAttr("style"), x.slides && x.slides.length && x.slides.removeClass([x.params.slideVisibleClass, x.params.slideActiveClass, x.params.slideNextClass, x.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), x.paginationContainer && x.paginationContainer.length && x.paginationContainer.removeClass(x.params.paginationHiddenClass), x.bullets && x.bullets.length && x.bullets.removeClass(x.params.bulletActiveClass), x.params.prevButton && e(x.params.prevButton).removeClass(x.params.buttonDisabledClass), x.params.nextButton && e(x.params.nextButton).removeClass(x.params.buttonDisabledClass), x.params.scrollbar && x.scrollbar && (x.scrollbar.track && x.scrollbar.track.length && x.scrollbar.track.removeAttr("style"), x.scrollbar.drag && x.scrollbar.drag.length && x.scrollbar.drag.removeAttr("style"))
      }, x.destroy = function(e, a) {
        x.detachEvents(), x.stopAutoplay(), x.params.scrollbar && x.scrollbar && x.params.scrollbarDraggable && x.scrollbar.disableDraggable(), x.params.loop && x.destroyLoop(), a && x.cleanupStyles(), x.disconnectObservers(), x.params.zoom && x.zoom && x.zoom.destroy(), x.params.keyboardControl && x.disableKeyboardControl && x.disableKeyboardControl(), x.params.mousewheelControl && x.disableMousewheelControl && x.disableMousewheelControl(), x.params.a11y && x.a11y && x.a11y.destroy(), x.params.history && !x.params.replaceState && window.removeEventListener("popstate", x.history.setHistoryPopState), x.params.hashnav && x.hashnav && x.hashnav.destroy(), x.emit("onDestroy"), !1 !== e && (x = null)
      }, x.init(), x
    }
  };
  a.prototype = {
    isSafari: function() {
      var e = window.navigator.userAgent.toLowerCase();
      return 0 <= e.indexOf("safari") && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
    }(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
    isArray: function(e) {
      return "[object Array]" === Object.prototype.toString.apply(e)
    },
    browser: {
      ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      ieTouch: window.navigator.msPointerEnabled && 1 < window.navigator.msMaxTouchPoints || window.navigator.pointerEnabled && 1 < window.navigator.maxTouchPoints,
      lteIE9: function() {
        var e = document.createElement("div");
        return e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === e.getElementsByTagName("i").length
      }()
    },
    device: function() {
      var e = window.navigator.userAgent,
        a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        t = e.match(/(iPad).*OS\s([\d_]+)/),
        s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        r = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      return {
        ios: t || r || s,
        android: a
      }
    }(),
    support: {
      touch: window.Modernizr && !0 === Modernizr.touch || !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
      transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function() {
        var e = document.createElement("div").style;
        return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
      }(),
      flexbox: function() {
        for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
          if (a[t] in e) return !0
      }(),
      observer: "MutationObserver" in window || "WebkitMutationObserver" in window,
      passiveListener: function() {
        var e = !1;
        try {
          var a = Object.defineProperty({}, "passive", {
            get: function() {
              e = !0
            }
          });
          window.addEventListener("testPassiveListener", null, a)
        } catch (e) {}
        return e
      }(),
      gestures: "ongesturestart" in window
    },
    plugins: {}
  };
  for (var t = ["jQuery", "Zepto", "Dom7"], s = 0; s < t.length; s++) window[t[s]] && function(e) {
    e.fn.swiper = function(t) {
      var s;
      return e(this).each(function() {
        var e = new a(this, t);
        s = s || e
      }), s
    }
  }(window[t[s]]);
  (r = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7) && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function(e) {
    function a(i) {
      if (i.target === this)
        for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a)
    }
    var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
      r = this;
    if (e)
      for (t = 0; t < s.length; t++) r.on(s[t], a);
    return this
  }), "transform" in r.fn || (r.fn.transform = function(e) {
    for (var a = 0; a < this.length; a++) {
      var t = this[a].style;
      t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
    }
    return this
  }), "transition" in r.fn || (r.fn.transition = function(e) {
    "string" != typeof e && (e += "ms");
    for (var a = 0; a < this.length; a++) {
      var t = this[a].style;
      t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
    }
    return this
  }), "outerWidth" in r.fn || (r.fn.outerWidth = function(e) {
    return 0 < this.length ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
  })), window.Swiper = a
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper
  }),
  function(t) {
    function z() {
      for (var a = 0; a < g.length; a++) g[a][0](g[a][1]);
      m = !(g = [])
    }

    function n(a, b) {
      g.push([a, b]), m || (m = !0, A(z, 0))
    }

    function u(a) {
      var c = (b = a.owner).state_,
        b = b.data_,
        h = a[c];
      if (a = a.then, "function" == typeof h) {
        c = l;
        try {
          b = h(b)
        } catch (d) {
          k(a, d)
        }
      }
      v(a, b) || (c === l && p(a, b), c === q && k(a, b))
    }

    function v(a, b) {
      var c;
      try {
        if (a === b) throw new TypeError("A promises callback cannot return that same promise.");
        if (b && ("function" == typeof b || "object" == typeof b)) {
          var h = b.then;
          if ("function" == typeof h) return h.call(b, function(d) {
            c || (c = !0, b !== d ? p(a, d) : w(a, d))
          }, function(b) {
            c || (c = !0, k(a, b))
          }), !0
        }
      } catch (d) {
        return c || k(a, d), !0
      }
      return !1
    }

    function p(a, b) {
      a !== b && v(a, b) || w(a, b)
    }

    function w(a, b) {
      a.state_ === r && (a.state_ = x, a.data_ = b, n(C, a))
    }

    function k(a, b) {
      a.state_ === r && (a.state_ = x, a.data_ = b, n(D, a))
    }

    function y(a) {
      var b = a.then_;
      for (a.then_ = void 0, a = 0; a < b.length; a++) u(b[a])
    }

    function C(a) {
      a.state_ = l, y(a)
    }

    function D(a) {
      a.state_ = q, y(a)
    }

    function e(a) {
      if ("function" != typeof a) throw new TypeError("Promise constructor takes a function argument");
      if (!1 == this instanceof e) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      this.then_ = [],
        function(a, b) {
          function h(a) {
            k(b, a)
          }
          try {
            a(function(a) {
              p(b, a)
            }, h)
          } catch (d) {
            h(d)
          }
        }(a, this)
    }
    var a, f = t.Promise,
      s = f && "resolve" in f && "reject" in f && "all" in f && "race" in f && (new f(function(b) {
        a = b
      }), "function" == typeof a);
    "undefined" != typeof exports && exports ? (exports.Promise = s ? f : e, exports.Polyfill = e) : "function" == typeof define && define.amd ? define(function() {
      return s ? f : e
    }) : s || (t.Promise = e);

    function E() {}
    var m, r = "pending",
      x = "sealed",
      l = "fulfilled",
      q = "rejected",
      A = "undefined" != typeof setImmediate ? setImmediate : setTimeout,
      g = [];
    e.prototype = {
      constructor: e,
      state_: r,
      then_: null,
      data_: void 0,
      then: function(a, b) {
        var c = {
          owner: this,
          then: new this.constructor(E),
          fulfilled: a,
          rejected: b
        };
        return this.state_ === l || this.state_ === q ? n(u, c) : this.then_.push(c), c.then
      },
      catch: function(a) {
        return this.then(null, a)
      }
    }, e.all = function(a) {
      if ("[object Array]" !== Object.prototype.toString.call(a)) throw new TypeError("You must pass an array to Promise.all().");
      return new this(function(b, c) {
        function h(a) {
          return e++,
            function(c) {
              d[a] = c, --e || b(d)
            }
        }
        for (var g, d = [], e = 0, f = 0; f < a.length; f++)(g = a[f]) && "function" == typeof g.then ? g.then(h(f), c) : d[f] = g;
        e || b(d)
      })
    }, e.race = function(a) {
      if ("[object Array]" !== Object.prototype.toString.call(a)) throw new TypeError("You must pass an array to Promise.race().");
      return new this(function(b, c) {
        for (var d, e = 0; e < a.length; e++)(d = a[e]) && "function" == typeof d.then ? d.then(b, c) : b(d)
      })
    }, e.resolve = function(a) {
      return a && "object" == typeof a && a.constructor === this ? a : new this(function(b) {
        b(a)
      })
    }, e.reject = function(a) {
      return new this(function(b, c) {
        c(a)
      })
    }
  }("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this),
  function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof module && module.exports ? module.exports = factory(require("jquery")) : factory(jQuery)
  }(function($) {
    $.extend($.fn, {
      validate: function(options) {
        if (this.length) {
          var validator = $.data(this[0], "validator");
          return validator || (this.attr("novalidate", "novalidate"), validator = new $.validator(options, this[0]), $.data(this[0], "validator", validator), validator.settings.onsubmit && (this.on("click.validate", ":submit", function(event) {
            validator.submitButton = event.currentTarget, $(this).hasClass("cancel") && (validator.cancelSubmit = !0), void 0 !== $(this).attr("formnovalidate") && (validator.cancelSubmit = !0)
          }), this.on("submit.validate", function(event) {
            function handle() {
              var hidden, result;
              return validator.submitButton && (validator.settings.submitHandler || validator.formSubmitted) && (hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm)), !validator.settings.submitHandler || (result = validator.settings.submitHandler.call(validator, validator.currentForm, event), hidden && hidden.remove(), void 0 !== result && result)
            }
            return validator.settings.debug && event.preventDefault(), validator.cancelSubmit ? (validator.cancelSubmit = !1, handle()) : validator.form() ? validator.pendingRequest ? !(validator.formSubmitted = !0) : handle() : (validator.focusInvalid(), !1)
          })), validator)
        }
        options && options.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
      },
      valid: function() {
        var valid, validator, errorList;
        return $(this[0]).is("form") ? valid = this.validate().form() : (errorList = [], valid = !0, validator = $(this[0].form).validate(), this.each(function() {
          (valid = validator.element(this) && valid) || (errorList = errorList.concat(validator.errorList))
        }), validator.errorList = errorList), valid
      },
      rules: function(command, argument) {
        var settings, staticRules, existingRules, data, param, filtered, element = this[0];
        if (null != element && (!element.form && element.hasAttribute("contenteditable") && (element.form = this.closest("form")[0], element.name = this.attr("name")), null != element.form)) {
          if (command) switch (staticRules = (settings = $.data(element.form, "validator").settings).rules, existingRules = $.validator.staticRules(element), command) {
            case "add":
              $.extend(existingRules, $.validator.normalizeRule(argument)), delete existingRules.messages, staticRules[element.name] = existingRules, argument.messages && (settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages));
              break;
            case "remove":
              return argument ? (filtered = {}, $.each(argument.split(/\s/), function(index, method) {
                filtered[method] = existingRules[method], delete existingRules[method]
              }), filtered) : (delete staticRules[element.name], existingRules)
          }
          return (data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element)).required && (param = data.required, delete data.required, data = $.extend({
            required: param
          }, data)), data.remote && (param = data.remote, delete data.remote, data = $.extend(data, {
            remote: param
          })), data
        }
      }
    }), $.extend($.expr.pseudos || $.expr[":"], {
      blank: function(a) {
        return !$.trim("" + $(a).val())
      },
      filled: function(a) {
        var val = $(a).val();
        return null !== val && !!$.trim("" + val)
      },
      unchecked: function(a) {
        return !$(a).prop("checked")
      }
    }), $.validator = function(options, form) {
      this.settings = $.extend(!0, {}, $.validator.defaults, options), this.currentForm = form, this.init()
    }, $.validator.format = function(source, params) {
      return 1 === arguments.length ? function() {
        var args = $.makeArray(arguments);
        return args.unshift(source), $.validator.format.apply(this, args)
      } : (void 0 === params || (2 < arguments.length && params.constructor !== Array && (params = $.makeArray(arguments).slice(1)), params.constructor !== Array && (params = [params]), $.each(params, function(i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
          return n
        })
      })), source)
    }, $.extend($.validator, {
      defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        pendingClass: "pending",
        validClass: "valid",
        errorElement: "label",
        focusCleanup: !1,
        focusInvalid: !0,
        errorContainer: $([]),
        errorLabelContainer: $([]),
        onsubmit: !0,
        ignore: ":hidden",
        ignoreTitle: !1,
        onfocusin: function(element) {
          this.lastActive = element, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(element)))
        },
        onfocusout: function(element) {
          this.checkable(element) || !(element.name in this.submitted) && this.optional(element) || this.element(element)
        },
        onkeyup: function(element, event) {
          9 === event.which && "" === this.elementValue(element) || -1 !== $.inArray(event.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) || (element.name in this.submitted || element.name in this.invalid) && this.element(element)
        },
        onclick: function(element) {
          element.name in this.submitted ? this.element(element) : element.parentNode.name in this.submitted && this.element(element.parentNode)
        },
        highlight: function(element, errorClass, validClass) {
          "radio" === element.type ? this.findByName(element.name).addClass(errorClass).removeClass(validClass) : $(element).addClass(errorClass).removeClass(validClass)
        },
        unhighlight: function(element, errorClass, validClass) {
          "radio" === element.type ? this.findByName(element.name).removeClass(errorClass).addClass(validClass) : $(element).removeClass(errorClass).addClass(validClass)
        }
      },
      setDefaults: function(settings) {
        $.extend($.validator.defaults, settings)
      },
      messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        equalTo: "Please enter the same value again.",
        maxlength: $.validator.format("Please enter no more than {0} characters."),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Please enter a value less than or equal to {0}."),
        min: $.validator.format("Please enter a value greater than or equal to {0}."),
        step: $.validator.format("Please enter a multiple of {0}.")
      },
      autoCreateRanges: !1,
      prototype: {
        init: function() {
          this.labelContainer = $(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm), this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
          var rules, groups = this.groups = {};

          function delegate(event) {
            !this.form && this.hasAttribute("contenteditable") && (this.form = $(this).closest("form")[0], this.name = $(this).attr("name"));
            var validator = $.data(this.form, "validator"),
              eventType = "on" + event.type.replace(/^validate/, ""),
              settings = validator.settings;
            settings[eventType] && !$(this).is(settings.ignore) && settings[eventType].call(validator, this, event)
          }
          $.each(this.settings.groups, function(key, value) {
            "string" == typeof value && (value = value.split(/\s/)), $.each(value, function(index, name) {
              groups[name] = key
            })
          }), rules = this.settings.rules, $.each(rules, function(key, value) {
            rules[key] = $.validator.normalizeRule(value)
          }), $(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel']:not([type='tel'][validateMaskLength]), [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate).on("focusout.validate", "[validateMaskLength]", delegate).on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate), this.settings.invalidHandler && $(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
        },
        form: function() {
          return this.checkForm(), $.extend(this.submitted, this.errorMap), this.invalid = $.extend({}, this.errorMap), this.valid() || $(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
        },
        checkForm: function() {
          this.prepareForm();
          for (var i = 0, elements = this.currentElements = this.elements(); elements[i]; i++) this.check(elements[i]);
          return this.valid()
        },
        element: function(element) {
          var rs, group, cleanElement = this.clean(element),
            checkElement = this.validationTargetFor(cleanElement),
            v = this,
            result = !0;
          return void 0 === checkElement ? delete this.invalid[cleanElement.name] : (this.prepareElement(checkElement), this.currentElements = $(checkElement), (group = this.groups[checkElement.name]) && $.each(this.groups, function(name, testgroup) {
            testgroup === group && name !== checkElement.name && (cleanElement = v.validationTargetFor(v.clean(v.findByName(name)))) && cleanElement.name in v.invalid && (v.currentElements.push(cleanElement), result = v.check(cleanElement) && result)
          }), rs = !1 !== this.check(checkElement), result = result && rs, this.invalid[checkElement.name] = !rs, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), $(element).attr("aria-invalid", !rs)), result
        },
        showErrors: function(errors) {
          if (errors) {
            var validator = this;
            $.extend(this.errorMap, errors), this.errorList = $.map(this.errorMap, function(message, name) {
              return {
                message: message,
                element: validator.findByName(name)[0]
              }
            }), this.successList = $.grep(this.successList, function(element) {
              return !(element.name in errors)
            })
          }
          this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
        },
        resetForm: function() {
          $.fn.resetForm && $(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
          var elements = this.elements().removeData("previousValue").removeAttr("aria-invalid");
          this.resetElements(elements)
        },
        resetElements: function(elements) {
          var i;
          if (this.settings.unhighlight)
            for (i = 0; elements[i]; i++) this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, ""), this.findByName(elements[i].name).removeClass(this.settings.validClass);
          else elements.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
        },
        numberOfInvalids: function() {
          return this.objectLength(this.invalid)
        },
        objectLength: function(obj) {
          var i, count = 0;
          for (i in obj) void 0 !== obj[i] && null !== obj[i] && !1 !== obj[i] && count++;
          return count
        },
        hideErrors: function() {
          this.hideThese(this.toHide)
        },
        hideThese: function(errors) {
          errors.not(this.containers).text(""), this.addWrapper(errors).hide()
        },
        valid: function() {
          return 0 === this.size()
        },
        size: function() {
          return this.errorList.length
        },
        focusInvalid: function() {
          if (this.settings.focusInvalid) try {
            $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
          } catch (e) {}
        },
        findLastActive: function() {
          var lastActive = this.lastActive;
          return lastActive && 1 === $.grep(this.errorList, function(n) {
            return n.element.name === lastActive.name
          }).length && lastActive
        },
        elements: function() {
          var validator = this,
            rulesCache = {};
          return $(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
            var name = this.name || $(this).attr("name");
            return !name && validator.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = $(this).closest("form")[0], this.name = name), !(name in rulesCache || !validator.objectLength($(this).rules())) && (rulesCache[name] = !0)
          })
        },
        clean: function(selector) {
          return $(selector)[0]
        },
        errors: function() {
          var errorClass = this.settings.errorClass.split(" ").join(".");
          return $(this.settings.errorElement + "." + errorClass, this.errorContext)
        },
        resetInternals: function() {
          this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = $([]), this.toHide = $([])
        },
        reset: function() {
          this.resetInternals(), this.currentElements = $([])
        },
        prepareForm: function() {
          this.reset(), this.toHide = this.errors().add(this.containers)
        },
        prepareElement: function(element) {
          this.reset(), this.toHide = this.errorsFor(element)
        },
        elementValue: function(element) {
          var val, idx, $element = $(element),
            type = element.type;
          return "radio" === type || "checkbox" === type ? this.findByName(element.name).filter(":checked").val() : "number" === type && void 0 !== element.validity ? element.validity.badInput ? "NaN" : $element.val() : (val = element.hasAttribute("contenteditable") ? $element.text() : $element.val(), "file" === type ? "C:\\fakepath\\" === val.substr(0, 12) ? val.substr(12) : 0 <= (idx = val.lastIndexOf("/")) ? val.substr(idx + 1) : 0 <= (idx = val.lastIndexOf("\\")) ? val.substr(idx + 1) : val : "string" == typeof val ? val.replace(/\r/g, "") : val)
        },
        check: function(element) {
          element = this.validationTargetFor(this.clean(element));
          var result, method, rule, normalizer, rules = $(element).rules(),
            rulesCount = $.map(rules, function(n, i) {
              return i
            }).length,
            dependencyMismatch = !1,
            val = this.elementValue(element);
          if ("function" == typeof rules.normalizer ? normalizer = rules.normalizer : "function" == typeof this.settings.normalizer && (normalizer = this.settings.normalizer), normalizer) {
            if ("string" != typeof(val = normalizer.call(element, val))) throw new TypeError("The normalizer should return a string value.");
            delete rules.normalizer
          }
          for (method in rules) {
            rule = {
              method: method,
              parameters: rules[method]
            };
            try {
              if ("dependency-mismatch" === (result = $.validator.methods[method].call(this, val, element, rule.parameters)) && 1 === rulesCount) {
                dependencyMismatch = !0;
                continue
              }
              if (dependencyMismatch = !1, "pending" === result) return void(this.toHide = this.toHide.not(this.errorsFor(element)));
              if (!result) return this.formatAndAdd(element, rule), !1
            } catch (e) {
              this.settings.debug && window.console && console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e), e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.")
            }
          }
          if (!dependencyMismatch) return this.objectLength(rules) && this.successList.push(element), !0
        },
        customDataMessage: function(element, method) {
          return $(element).data("msg" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()) || $(element).data("msg")
        },
        customMessage: function(name, method) {
          var m = this.settings.messages[name];
          return m && (m.constructor === String ? m : m[method])
        },
        findDefined: function() {
          for (var i = 0; i < arguments.length; i++)
            if (void 0 !== arguments[i]) return arguments[i]
        },
        defaultMessage: function(element, rule) {
          "string" == typeof rule && (rule = {
            method: rule
          });
          var message = this.findDefined(this.customMessage(element.name, rule.method), this.customDataMessage(element, rule.method), !this.settings.ignoreTitle && element.title || void 0, $.validator.messages[rule.method], "<strong>Warning: No message defined for " + element.name + "</strong>"),
            theregex = /\$?\{(\d+)\}/g;
          return "function" == typeof message ? message = message.call(this, rule.parameters, element) : theregex.test(message) && (message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters)), message
        },
        formatAndAdd: function(element, rule) {
          var message = this.defaultMessage(element, rule);
          this.errorList.push({
            message: message,
            element: element,
            method: rule.method
          }), this.errorMap[element.name] = message, this.submitted[element.name] = message
        },
        addWrapper: function(toToggle) {
          return this.settings.wrapper && (toToggle = toToggle.add(toToggle.parent(this.settings.wrapper))), toToggle
        },
        defaultShowErrors: function() {
          var i, elements, error;
          for (i = 0; this.errorList[i]; i++) error = this.errorList[i], this.settings.highlight && this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass), this.showLabel(error.element, error.message);
          if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
            for (i = 0; this.successList[i]; i++) this.showLabel(this.successList[i]);
          if (this.settings.unhighlight)
            for (i = 0, elements = this.validElements(); elements[i]; i++) this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
          this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
        },
        validElements: function() {
          return this.currentElements.not(this.invalidElements())
        },
        invalidElements: function() {
          return $(this.errorList).map(function() {
            return this.element
          })
        },
        showLabel: function(element, message) {
          var place, group, errorID, v, error = this.errorsFor(element),
            elementID = this.idOrName(element),
            describedBy = $(element).attr("aria-describedby");
          error.length ? (error.removeClass(this.settings.validClass).addClass(this.settings.errorClass), error.html(message)) : (place = error = $("<" + this.settings.errorElement + ">").attr("id", elementID + "-error").addClass(this.settings.errorClass).html(message || ""), this.settings.wrapper && (place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(place) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, place, $(element)) : place.insertAfter(element), error.is("label") ? error.attr("for", elementID) : 0 === error.parents("label[for='" + this.escapeCssMeta(elementID) + "']").length && (errorID = error.attr("id"), describedBy ? describedBy.match(new RegExp("\\b" + this.escapeCssMeta(errorID) + "\\b")) || (describedBy += " " + errorID) : describedBy = errorID, $(element).attr("aria-describedby", describedBy), (group = this.groups[element.name]) && (v = this, $.each(v.groups, function(name, testgroup) {
            testgroup === group && $("[name='" + v.escapeCssMeta(name) + "']", v.currentForm).attr("aria-describedby", error.attr("id"))
          })))), !message && this.settings.success && (error.text(""), "string" == typeof this.settings.success ? error.addClass(this.settings.success) : this.settings.success(error, element)), this.toShow = this.toShow.add(error)
        },
        errorsFor: function(element) {
          var name = this.escapeCssMeta(this.idOrName(element)),
            describer = $(element).attr("aria-describedby"),
            selector = "label[for='" + name + "'], label[for='" + name + "'] *";
          return describer && (selector = selector + ", #" + this.escapeCssMeta(describer).replace(/\s+/g, ", #")), this.errors().filter(selector)
        },
        escapeCssMeta: function(string) {
          return string.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
        },
        idOrName: function(element) {
          return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name)
        },
        validationTargetFor: function(element) {
          return this.checkable(element) && (element = this.findByName(element.name)), $(element).not(this.settings.ignore)[0]
        },
        checkable: function(element) {
          return /radio|checkbox/i.test(element.type)
        },
        findByName: function(name) {
          return $(this.currentForm).find("[name='" + this.escapeCssMeta(name) + "']")
        },
        getLength: function(value, element) {
          switch (element.nodeName.toLowerCase()) {
            case "select":
              return $("option:selected", element).length;
            case "input":
              if (this.checkable(element)) return this.findByName(element.name).filter(":checked").length
          }
          return value.length
        },
        depend: function(param, element) {
          return !this.dependTypes[typeof param] || this.dependTypes[typeof param](param, element)
        },
        dependTypes: {
          boolean: function(param) {
            return param
          },
          string: function(param, element) {
            return !!$(param, element.form).length
          },
          function: function(param, element) {
            return param(element)
          }
        },
        optional: function(element) {
          var val = this.elementValue(element);
          return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch"
        },
        startRequest: function(element) {
          this.pending[element.name] || (this.pendingRequest++, $(element).addClass(this.settings.pendingClass), this.pending[element.name] = !0)
        },
        stopRequest: function(element, valid) {
          this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[element.name], $(element).removeClass(this.settings.pendingClass), valid && 0 === this.pendingRequest && this.formSubmitted && this.form() ? ($(this.currentForm).submit(), this.submitButton && $("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !valid && 0 === this.pendingRequest && this.formSubmitted && ($(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
        },
        previousValue: function(element, method) {
          return method = "string" == typeof method && method || "remote", $.data(element, "previousValue") || $.data(element, "previousValue", {
            old: null,
            valid: !0,
            message: this.defaultMessage(element, {
              method: method
            })
          })
        },
        destroy: function() {
          this.resetForm(), $(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
        }
      },
      classRuleSettings: {
        required: {
          required: !0
        },
        email: {
          email: !0
        },
        url: {
          url: !0
        },
        date: {
          date: !0
        },
        dateISO: {
          dateISO: !0
        },
        number: {
          number: !0
        },
        digits: {
          digits: !0
        },
        creditcard: {
          creditcard: !0
        }
      },
      addClassRules: function(className, rules) {
        className.constructor === String ? this.classRuleSettings[className] = rules : $.extend(this.classRuleSettings, className)
      },
      classRules: function(element) {
        var rules = {},
          classes = $(element).attr("class");
        return classes && $.each(classes.split(" "), function() {
          this in $.validator.classRuleSettings && $.extend(rules, $.validator.classRuleSettings[this])
        }), rules
      },
      normalizeAttributeRule: function(rules, type, method, value) {
        /min|max|step/.test(method) && (null === type || /number|range|text/.test(type)) && (value = Number(value), isNaN(value) && (value = void 0)), value || 0 === value ? rules[method] = value : type === method && "range" !== type && (rules[method] = !0)
      },
      attributeRules: function(element) {
        var method, value, rules = {},
          $element = $(element),
          type = element.getAttribute("type");
        for (method in $.validator.methods) value = "required" === method || "validateMaskLength" === method ? ("" === (value = element.getAttribute(method)) && (value = !0), !!value) : $element.attr(method), this.normalizeAttributeRule(rules, type, method, value);
        return rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) && delete rules.maxlength, rules
      },
      dataRules: function(element) {
        var method, value, rules = {},
          $element = $(element),
          type = element.getAttribute("type");
        for (method in $.validator.methods) value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()), this.normalizeAttributeRule(rules, type, method, value);
        return rules
      },
      staticRules: function(element) {
        var rules = {},
          validator = $.data(element.form, "validator");
        return validator.settings.rules && (rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {}), rules
      },
      normalizeRules: function(rules, element) {
        return $.each(rules, function(prop, val) {
          if (!1 !== val) {
            if (val.param || val.depends) {
              var keepRule = !0;
              switch (typeof val.depends) {
                case "string":
                  keepRule = !!$(val.depends, element.form).length;
                  break;
                case "function":
                  keepRule = val.depends.call(element, element)
              }
              keepRule ? rules[prop] = void 0 === val.param || val.param : ($.data(element.form, "validator").resetElements($(element)), delete rules[prop])
            }
          } else delete rules[prop]
        }), $.each(rules, function(rule, parameter) {
          rules[rule] = $.isFunction(parameter) && "normalizer" !== rule ? parameter(element) : parameter
        }), $.each(["minlength", "maxlength"], function() {
          rules[this] && (rules[this] = Number(rules[this]))
        }), $.each(["rangelength", "range"], function() {
          var parts;
          rules[this] && ($.isArray(rules[this]) ? rules[this] = [Number(rules[this][0]), Number(rules[this][1])] : "string" == typeof rules[this] && (parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/), rules[this] = [Number(parts[0]), Number(parts[1])]))
        }), $.validator.autoCreateRanges && (null != rules.min && null != rules.max && (rules.range = [rules.min, rules.max], delete rules.min, delete rules.max), null != rules.minlength && null != rules.maxlength && (rules.rangelength = [rules.minlength, rules.maxlength], delete rules.minlength, delete rules.maxlength)), rules
      },
      normalizeRule: function(data) {
        if ("string" == typeof data) {
          var transformed = {};
          $.each(data.split(/\s/), function() {
            transformed[this] = !0
          }), data = transformed
        }
        return data
      },
      addMethod: function(name, method, message) {
        $.validator.methods[name] = method, $.validator.messages[name] = void 0 !== message ? message : $.validator.messages[name], method.length < 3 && $.validator.addClassRules(name, $.validator.normalizeRule(name))
      },
      methods: {
        validateMaskLength: function(value, element, param) {
          if (element.getAttribute("data-mask-input")) {
            if (element.getAttribute("data-mask-input").match(/[^{}]+(?=\})/g)) var rawValue = element.getAttribute("data-mask-input").match(/[^{}]+(?=\})/g),
              maskAttrLength = parseInt(0 < rawValue[0].split(",").length ? rawValue[0].split(",")[0] : 0);
            else maskAttrLength = element.getAttribute("data-mask-input").match(/\d/g).length ? element.getAttribute("data-mask-input").match(/\d/g).length : 0;
            return maskAttrLength <= value.match(/\d/g).length
          }
          return this.optional(element)
        },
        required: function(value, element, param) {
          if (!this.depend(param, element)) return "dependency-mismatch";
          if ("select" !== element.nodeName.toLowerCase()) return this.checkable(element) ? 0 < this.getLength(value, element) : 0 < value.length;
          var val = $(element).val();
          return val && 0 < val.length
        },
        email: function(value, element) {
          return 0 < value.length ? this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toLowerCase()) : this.optional(element) || !1
        },
        url: function(value, element) {
          return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
        },
        date: function(value, element) {
          return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString())
        },
        dateISO: function(value, element) {
          return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
        },
        number: function(value, element) {
          return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
        },
        digits: function(value, element) {
          return this.optional(element) || /^\d+$/.test(value)
        },
        minlength: function(value, element, param) {
          var length = $.isArray(value) ? value.length : this.getLength(value, element);
          return this.optional(element) || param <= length
        },
        maxlength: function(value, element, param) {
          var length = $.isArray(value) ? value.length : this.getLength(value, element);
          return this.optional(element) || length <= param
        },
        rangelength: function(value, element, param) {
          var length = $.isArray(value) ? value.length : this.getLength(value, element);
          return this.optional(element) || length >= param[0] && length <= param[1]
        },
        min: function(value, element, param) {
          return this.optional(element) || param <= value
        },
        max: function(value, element, param) {
          return this.optional(element) || value <= param
        },
        range: function(value, element, param) {
          return this.optional(element) || value >= param[0] && value <= param[1]
        },
        step: function(value, element, param) {
          function decimalPlaces(num) {
            var match = ("" + num).match(/(?:\.(\d+))?$/);
            return match && match[1] ? match[1].length : 0
          }

          function toInt(num) {
            return Math.round(num * Math.pow(10, decimals))
          }
          var decimals, type = $(element).attr("type"),
            errorMessage = "Step attribute on input type " + type + " is not supported.",
            re = new RegExp("\\b" + type + "\\b"),
            valid = !0;
          if (type && !re.test(["text", "number", "range"].join())) throw new Error(errorMessage);
          return decimals = decimalPlaces(param), (decimalPlaces(value) > decimals || toInt(value) % toInt(param) != 0) && (valid = !1), this.optional(element) || valid
        },
        equalTo: function(value, element, param) {
          var target = $(param);
          return this.settings.onfocusout && target.not(".validate-equalTo-blur").length && target.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
            $(element).valid()
          }), value === target.val()
        },
        remote: function(value, element, param, method) {
          if (this.optional(element)) return "dependency-mismatch";
          method = "string" == typeof method && method || "remote";
          var validator, data, optionDataString, previous = this.previousValue(element, method);
          return this.settings.messages[element.name] || (this.settings.messages[element.name] = {}), previous.originalMessage = previous.originalMessage || this.settings.messages[element.name][method], this.settings.messages[element.name][method] = previous.message, param = "string" == typeof param && {
            url: param
          } || param, optionDataString = $.param($.extend({
            data: value
          }, param.data)), previous.old === optionDataString ? previous.valid : (previous.old = optionDataString, (validator = this).startRequest(element), (data = {})[element.name] = value, $.ajax($.extend(!0, {
            mode: "abort",
            port: "validate" + element.name,
            dataType: "json",
            data: data,
            context: validator.currentForm,
            success: function(response) {
              var errors, message, submitted, valid = !0 === response || "true" === response;
              validator.settings.messages[element.name][method] = previous.originalMessage, valid ? (submitted = validator.formSubmitted, validator.resetInternals(), validator.toHide = validator.errorsFor(element), validator.formSubmitted = submitted, validator.successList.push(element), validator.invalid[element.name] = !1, validator.showErrors()) : (errors = {}, message = response || validator.defaultMessage(element, {
                method: method,
                parameters: value
              }), errors[element.name] = previous.message = message, validator.invalid[element.name] = !0, validator.showErrors(errors)), previous.valid = valid, validator.stopRequest(element, valid)
            }
          }, param)), "pending")
        }
      }
    });
    var ajax, pendingRequests = {};
    return $.ajaxPrefilter ? $.ajaxPrefilter(function(settings, _, xhr) {
      var port = settings.port;
      "abort" === settings.mode && (pendingRequests[port] && pendingRequests[port].abort(), pendingRequests[port] = xhr)
    }) : (ajax = $.ajax, $.ajax = function(settings) {
      var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
        port = ("port" in settings ? settings : $.ajaxSettings).port;
      return "abort" === mode ? (pendingRequests[port] && pendingRequests[port].abort(), pendingRequests[port] = ajax.apply(this, arguments), pendingRequests[port]) : ajax.apply(this, arguments)
    }), $
  }),
  function(window, angular) {
    "use strict";
    var bind, extend, forEach, isDefined, lowercase, noop, nodeContains, htmlParser, htmlSanitizeWriter, $sanitizeMinErr = angular.$$minErr("$sanitize");
    angular.module("ngSanitize", []).provider("$sanitize", function() {
      var svgEnabled = !1;
      this.$get = ["$$sanitizeUri", function($$sanitizeUri) {
        return svgEnabled && extend(validElements, svgElements),
          function(html) {
            var buf = [];
            return htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
              return !/^unsafe:/.test($$sanitizeUri(uri, isImage))
            })), buf.join("")
          }
      }], this.enableSvg = function(enableSvg) {
        return isDefined(enableSvg) ? (svgEnabled = enableSvg, this) : svgEnabled
      }, bind = angular.bind, extend = angular.extend, forEach = angular.forEach, isDefined = angular.isDefined, lowercase = angular.lowercase, noop = angular.noop, htmlParser = function(html, handler) {
        null == html ? html = "" : "string" != typeof html && (html = "" + html);
        var inertBodyElement = getInertBodyElement(html);
        if (!inertBodyElement) return "";
        var mXSSAttempts = 5;
        do {
          if (0 === mXSSAttempts) throw $sanitizeMinErr("uinput", "Failed to sanitize html because the input is unstable");
          mXSSAttempts--, html = inertBodyElement.innerHTML, inertBodyElement = getInertBodyElement(html)
        } while (html !== inertBodyElement.innerHTML);
        var node = inertBodyElement.firstChild;
        for (; node;) {
          switch (node.nodeType) {
            case 1:
              handler.start(node.nodeName.toLowerCase(), attrToMap(node.attributes));
              break;
            case 3:
              handler.chars(node.textContent)
          }
          var nextNode;
          if (!((nextNode = node.firstChild) || (1 === node.nodeType && handler.end(node.nodeName.toLowerCase()), nextNode = getNonDescendant("nextSibling", node))))
            for (; null == nextNode && (node = getNonDescendant("parentNode", node)) !== inertBodyElement;) nextNode = getNonDescendant("nextSibling", node), 1 === node.nodeType && handler.end(node.nodeName.toLowerCase());
          node = nextNode
        }
        for (; node = inertBodyElement.firstChild;) inertBodyElement.removeChild(node)
      }, htmlSanitizeWriter = function(buf, uriValidator) {
        var ignoreCurrentElement = !1,
          out = bind(buf, buf.push);
        return {
          start: function(tag, attrs) {
            tag = lowercase(tag), !ignoreCurrentElement && blockedElements[tag] && (ignoreCurrentElement = tag), ignoreCurrentElement || !0 !== validElements[tag] || (out("<"), out(tag), forEach(attrs, function(value, key) {
              var lkey = lowercase(key),
                isImage = "img" === tag && "src" === lkey || "background" === lkey;
              !0 !== validAttrs[lkey] || !0 === uriAttrs[lkey] && !uriValidator(value, isImage) || (out(" "), out(key), out('="'), out(encodeEntities(value)), out('"'))
            }), out(">"))
          },
          end: function(tag) {
            tag = lowercase(tag), ignoreCurrentElement || !0 !== validElements[tag] || !0 === voidElements[tag] || (out("</"), out(tag), out(">")), tag == ignoreCurrentElement && (ignoreCurrentElement = !1)
          },
          chars: function(chars) {
            ignoreCurrentElement || out(encodeEntities(chars))
          }
        }
      }, nodeContains = window.Node.prototype.contains || function(arg) {
        return !!(16 & this.compareDocumentPosition(arg))
      };
      var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        NON_ALPHANUMERIC_REGEXP = /([^#-~ |!])/g,
        voidElements = toMap("area,br,col,hr,img,wbr"),
        optionalEndTagBlockElements = toMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        optionalEndTagInlineElements = toMap("rp,rt"),
        optionalEndTagElements = extend({}, optionalEndTagInlineElements, optionalEndTagBlockElements),
        blockElements = extend({}, optionalEndTagBlockElements, toMap("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),
        inlineElements = extend({}, optionalEndTagInlineElements, toMap("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
        svgElements = toMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),
        blockedElements = toMap("script,style"),
        validElements = extend({}, voidElements, blockElements, inlineElements, optionalEndTagElements),
        uriAttrs = toMap("background,cite,href,longdesc,src,xlink:href,xml:base"),
        htmlAttrs = toMap("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
        svgAttrs = toMap("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0),
        validAttrs = extend({}, uriAttrs, svgAttrs, htmlAttrs);

      function toMap(str, lowercaseKeys) {
        var i, obj = {},
          items = str.split(",");
        for (i = 0; i < items.length; i++) obj[lowercaseKeys ? lowercase(items[i]) : items[i]] = !0;
        return obj
      }
      var getInertBodyElement = function(window, document) {
        var inertDocument;
        if (!document || !document.implementation) throw $sanitizeMinErr("noinert", "Can't create an inert html document");
        var inertBodyElement = ((inertDocument = document.implementation.createHTMLDocument("inert")).documentElement || inertDocument.getDocumentElement()).querySelector("body");
        return inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>', inertBodyElement.querySelector("svg") ? (inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">', inertBodyElement.querySelector("svg img") ? function(html) {
          html = "<remove></remove>" + html;
          try {
            var body = (new window.DOMParser).parseFromString(html, "text/html").body;
            return body.firstChild.remove(), body
          } catch (e) {
            return
          }
        } : function(html) {
          inertBodyElement.innerHTML = html, document.documentMode && stripCustomNsAttrs(inertBodyElement);
          return inertBodyElement
        }) : function(html) {
          html = "<remove></remove>" + html;
          try {
            html = encodeURI(html)
          } catch (e) {
            return
          }
          var xhr = new window.XMLHttpRequest;
          xhr.responseType = "document", xhr.open("GET", "data:text/html;charset=utf-8," + html, !1), xhr.send(null);
          var body = xhr.response.body;
          return body.firstChild.remove(), body
        }
      }(window, window.document);

      function attrToMap(attrs) {
        for (var map = {}, i = 0, ii = attrs.length; i < ii; i++) {
          var attr = attrs[i];
          map[attr.name] = attr.value
        }
        return map
      }

      function encodeEntities(value) {
        return value.replace(/&/g, "&amp;").replace(SURROGATE_PAIR_REGEXP, function(value) {
          return "&#" + (1024 * (value.charCodeAt(0) - 55296) + (value.charCodeAt(1) - 56320) + 65536) + ";"
        }).replace(NON_ALPHANUMERIC_REGEXP, function(value) {
          return "&#" + value.charCodeAt(0) + ";"
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
      }

      function stripCustomNsAttrs(node) {
        for (; node;) {
          if (node.nodeType === window.Node.ELEMENT_NODE)
            for (var attrs = node.attributes, i = 0, l = attrs.length; i < l; i++) {
              var attrNode = attrs[i],
                attrName = attrNode.name.toLowerCase();
              "xmlns:ns1" !== attrName && 0 !== attrName.lastIndexOf("ns1:", 0) || (node.removeAttributeNode(attrNode), i--, l--)
            }
          var nextNode = node.firstChild;
          nextNode && stripCustomNsAttrs(nextNode), node = getNonDescendant("nextSibling", node)
        }
      }

      function getNonDescendant(propName, node) {
        var nextNode = node[propName];
        if (nextNode && nodeContains.call(node, nextNode)) throw $sanitizeMinErr("elclob", "Failed to sanitize html because the element is clobbered: {0}", node.outerHTML || node.outerText);
        return nextNode
      }
    }).info({
      angularVersion: "1.6.9"
    }), angular.module("ngSanitize").filter("linky", ["$sanitize", function($sanitize) {
      var LINKY_URL_REGEXP = /((s?ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
        MAILTO_REGEXP = /^mailto:/i,
        linkyMinErr = angular.$$minErr("linky"),
        isDefined = angular.isDefined,
        isFunction = angular.isFunction,
        isObject = angular.isObject,
        isString = angular.isString;
      return function(text, target, attributes) {
        if (null == text || "" === text) return text;
        if (!isString(text)) throw linkyMinErr("notstring", "Expected string but received: {0}", text);
        for (var match, url, i, attributesFn = isFunction(attributes) ? attributes : isObject(attributes) ? function() {
            return attributes
          } : function() {
            return {}
          }, raw = text, html = []; match = raw.match(LINKY_URL_REGEXP);) url = match[0], match[2] || match[4] || (url = (match[3] ? "http://" : "mailto:") + url), i = match.index, addText(raw.substr(0, i)), addLink(url, match[0].replace(MAILTO_REGEXP, "")), raw = raw.substring(i + match[0].length);
        return addText(raw), $sanitize(html.join(""));

        function addText(text) {
          var chars, buf;
          text && html.push((chars = text, htmlSanitizeWriter(buf = [], noop).chars(chars), buf.join("")))
        }

        function addLink(url, text) {
          var key, linkAttributes = attributesFn(url);
          for (key in html.push("<a "), linkAttributes) html.push(key + '="' + linkAttributes[key] + '" ');
          !isDefined(target) || "target" in linkAttributes || html.push('target="', target, '" '), html.push('href="', url.replace(/"/g, "&quot;"), '">'), addText(text), html.push("</a>")
        }
      }
    }])
  }(window, window.angular),
  function() {
    var Dropzone, Emitter, camelize, contentLoaded, detectVerticalSquash, drawImageIOSFix, noop, without, __slice = [].slice,
      __hasProp = {}.hasOwnProperty;
    noop = function() {}, Emitter = function() {
      function Emitter() {}
      return Emitter.prototype.addEventListener = Emitter.prototype.on, Emitter.prototype.on = function(event, fn) {
        return this._callbacks = this._callbacks || {}, this._callbacks[event] || (this._callbacks[event] = []), this._callbacks[event].push(fn), this
      }, Emitter.prototype.emit = function() {
        var args, callbacks, event, _i, _len;
        if (event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [], this._callbacks = this._callbacks || {}, callbacks = this._callbacks[event])
          for (_i = 0, _len = callbacks.length; _i < _len; _i++) callbacks[_i].apply(this, args);
        return this
      }, Emitter.prototype.removeListener = Emitter.prototype.off, Emitter.prototype.removeAllListeners = Emitter.prototype.off, Emitter.prototype.removeEventListener = Emitter.prototype.off, Emitter.prototype.off = function(event, fn) {
        var callbacks, i, _i, _len;
        if (!this._callbacks || 0 === arguments.length) return this._callbacks = {}, this;
        if (!(callbacks = this._callbacks[event])) return this;
        if (1 === arguments.length) return delete this._callbacks[event], this;
        for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i)
          if (callbacks[i] === fn) {
            callbacks.splice(i, 1);
            break
          } return this
      }, Emitter
    }(), (Dropzone = function() {
      var extend, resolveOption;

      function Dropzone(element, options) {
        var elementOptions, fallback, _ref;
        if (this.element = element, this.version = Dropzone.version, this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, ""), this.clickableElements = [], this.listeners = [], this.files = [], "string" == typeof this.element && (this.element = document.querySelector(this.element)), !this.element || null == this.element.nodeType) throw new Error("Invalid dropzone element.");
        if (this.element.dropzone, Dropzone.instances.push(this), this.element.dropzone = this, elementOptions = null != (_ref = Dropzone.optionsForElement(this.element)) ? _ref : {}, this.options = extend({}, this.defaultOptions, elementOptions, null != options ? options : {}), this.options.forceFallback || !Dropzone.isBrowserSupported()) return this.options.fallback.call(this);
        if (null == this.options.url && (this.options.url = this.element.getAttribute("action")), this.options.url, this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
        this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes, delete this.options.acceptedMimeTypes), this.options.method = this.options.method.toUpperCase(), (fallback = this.getExistingFallback()) && fallback.parentNode && fallback.parentNode.removeChild(fallback), !1 !== this.options.previewsContainer && (this.options.previewsContainer ? this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer") : this.previewsContainer = this.element), this.options.clickable && (!0 === this.options.clickable ? this.clickableElements = [this.element] : this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable")), this.init()
      }
      return function(child, parent) {
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);

        function ctor() {
          this.constructor = child
        }
        ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype
      }(Dropzone, Emitter), Dropzone.prototype.Emitter = Emitter, Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"], Dropzone.prototype.defaultOptions = {
        url: null,
        method: "post",
        withCredentials: !1,
        parallelUploads: 2,
        uploadMultiple: !1,
        maxFilesize: 256,
        paramName: "file",
        createImageThumbnails: !0,
        maxThumbnailFilesize: 10,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        filesizeBase: 1e3,
        maxFiles: null,
        params: {},
        clickable: !0,
        ignoreHiddenFiles: !0,
        acceptedFiles: null,
        acceptedMimeTypes: null,
        autoProcessQueue: !0,
        autoQueue: !0,
        addRemoveLinks: !1,
        previewsContainer: null,
        hiddenInputContainer: "body",
        capture: null,
        renameFilename: null,
        dictDefaultMessage: "Drop files here to upload",
        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
        dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
        dictInvalidFileType: "You can't upload files of this type.",
        dictResponseError: "Server responded with {{statusCode}} code.",
        dictCancelUpload: "Cancel upload",
        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
        dictRemoveFile: "Remove file",
        dictRemoveFileConfirmation: null,
        dictMaxFilesExceeded: "You can not upload any more files.",
        accept: function(file, done) {
          return done()
        },
        init: function() {
          return noop
        },
        forceFallback: !1,
        fallback: function() {
          var child, messageElement, span, _i, _len, _ref;
          for (this.element.className = this.element.className + " dz-browser-not-supported", _i = 0, _len = (_ref = this.element.getElementsByTagName("div")).length; _i < _len; _i++) child = _ref[_i], /(^| )dz-message($| )/.test(child.className) && ((messageElement = child).className = "dz-message");
          return messageElement || (messageElement = Dropzone.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(messageElement)), (span = messageElement.getElementsByTagName("span")[0]) && (null != span.textContent ? span.textContent = this.options.dictFallbackMessage : null != span.innerText && (span.innerText = this.options.dictFallbackMessage)), this.element.appendChild(this.getFallbackForm())
        },
        resize: function(file) {
          var info, srcRatio, trgRatio;
          return info = {
            srcX: 0,
            srcY: 0,
            srcWidth: file.width,
            srcHeight: file.height
          }, srcRatio = file.width / file.height, info.optWidth = this.options.thumbnailWidth, info.optHeight = this.options.thumbnailHeight, null == info.optWidth && null == info.optHeight ? (info.optWidth = info.srcWidth, info.optHeight = info.srcHeight) : null == info.optWidth ? info.optWidth = srcRatio * info.optHeight : null == info.optHeight && (info.optHeight = 1 / srcRatio * info.optWidth), trgRatio = info.optWidth / info.optHeight, file.height < info.optHeight || file.width < info.optWidth ? (info.trgHeight = info.srcHeight, info.trgWidth = info.srcWidth) : trgRatio < srcRatio ? (info.srcHeight = file.height, info.srcWidth = info.srcHeight * trgRatio) : (info.srcWidth = file.width, info.srcHeight = info.srcWidth / trgRatio), info.srcX = (file.width - info.srcWidth) / 2, info.srcY = (file.height - info.srcHeight) / 2, info
        },
        drop: function(e) {
          return this.element.classList.remove("dz-drag-hover")
        },
        dragstart: noop,
        dragend: function(e) {
          return this.element.classList.remove("dz-drag-hover")
        },
        dragenter: function(e) {
          return this.element.classList.add("dz-drag-hover")
        },
        dragover: function(e) {
          return this.element.classList.add("dz-drag-hover")
        },
        dragleave: function(e) {
          return this.element.classList.remove("dz-drag-hover")
        },
        paste: noop,
        reset: function() {
          return this.element.classList.remove("dz-started")
        },
        addedfile: function(file) {
          var removeFileEvent, removeLink, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results, _this;
          if (this.element === this.previewsContainer && this.element.classList.add("dz-started"), this.previewsContainer) {
            for (file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim()), file.previewTemplate = file.previewElement, this.previewsContainer.appendChild(file.previewElement), _i = 0, _len = (_ref = file.previewElement.querySelectorAll("[data-dz-name]")).length; _i < _len; _i++) _ref[_i].textContent = this._renameFilename(file.name);
            for (_j = 0, _len1 = (_ref1 = file.previewElement.querySelectorAll("[data-dz-size]")).length; _j < _len1; _j++) _ref1[_j].innerHTML = this.filesize(file.size);
            for (this.options.addRemoveLinks && (file._removeLink = Dropzone.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), file.previewElement.appendChild(file._removeLink)), _this = this, removeFileEvent = function(e) {
                return e.preventDefault(), e.stopPropagation(), file.status === Dropzone.UPLOADING ? Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {
                  return _this.removeFile(file)
                }) : _this.options.dictRemoveFileConfirmation ? Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {
                  return _this.removeFile(file)
                }) : _this.removeFile(file)
              }, _results = [], _k = 0, _len2 = (_ref2 = file.previewElement.querySelectorAll("[data-dz-remove]")).length; _k < _len2; _k++) removeLink = _ref2[_k], _results.push(removeLink.addEventListener("click", removeFileEvent));
            return _results
          }
        },
        removedfile: function(file) {
          var _ref;
          return file.previewElement && null != (_ref = file.previewElement) && _ref.parentNode.removeChild(file.previewElement), this._updateMaxFilesReachedClass()
        },
        thumbnail: function(file, dataUrl) {
          var thumbnailElement, _i, _len, _ref;
          if (file.previewElement) {
            for (file.previewElement.classList.remove("dz-file-preview"), _i = 0, _len = (_ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]")).length; _i < _len; _i++)(thumbnailElement = _ref[_i]).alt = file.name, thumbnailElement.src = dataUrl;
            return setTimeout(function() {
              return file.previewElement.classList.add("dz-image-preview")
            }, 1)
          }
        },
        error: function(file, message) {
          var node, _i, _len, _ref, _results;
          if (file.previewElement) {
            for (file.previewElement.classList.add("dz-error"), "String" != typeof message && message.error && (message = message.error), _results = [], _i = 0, _len = (_ref = file.previewElement.querySelectorAll("[data-dz-errormessage]")).length; _i < _len; _i++) node = _ref[_i], _results.push(node.textContent = message);
            return _results
          }
        },
        errormultiple: noop,
        processing: function(file) {
          if (file.previewElement && (file.previewElement.classList.add("dz-processing"), file._removeLink)) return file._removeLink.textContent = this.options.dictCancelUpload
        },
        processingmultiple: noop,
        uploadprogress: function(file, progress, bytesSent) {
          var node, _i, _len, _ref, _results;
          if (file.previewElement) {
            for (_results = [], _i = 0, _len = (_ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]")).length; _i < _len; _i++) "PROGRESS" === (node = _ref[_i]).nodeName ? _results.push(node.value = progress) : _results.push(node.style.width = progress + "%");
            return _results
          }
        },
        totaluploadprogress: noop,
        sending: noop,
        sendingmultiple: noop,
        success: function(file) {
          if (file.previewElement) return file.previewElement.classList.add("dz-success")
        },
        successmultiple: noop,
        canceled: function(file) {
          return this.emit("error", file, "Upload canceled.")
        },
        canceledmultiple: noop,
        complete: function(file) {
          if (file._removeLink && (file._removeLink.textContent = this.options.dictRemoveFile), file.previewElement) return file.previewElement.classList.add("dz-complete")
        },
        completemultiple: noop,
        maxfilesexceeded: noop,
        maxfilesreached: noop,
        queuecomplete: noop,
        addedfiles: noop,
        previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'
      }, extend = function() {
        var key, object, objects, target, val, _i, _len;
        for (target = arguments[0], _i = 0, _len = (objects = 2 <= arguments.length ? __slice.call(arguments, 1) : []).length; _i < _len; _i++)
          for (key in object = objects[_i]) val = object[key], target[key] = val;
        return target
      }, Dropzone.prototype.getAcceptedFiles = function() {
        var file, _i, _len, _ref, _results;
        for (_results = [], _i = 0, _len = (_ref = this.files).length; _i < _len; _i++)(file = _ref[_i]).accepted && _results.push(file);
        return _results
      }, Dropzone.prototype.getRejectedFiles = function() {
        var file, _i, _len, _ref, _results;
        for (_results = [], _i = 0, _len = (_ref = this.files).length; _i < _len; _i++)(file = _ref[_i]).accepted || _results.push(file);
        return _results
      }, Dropzone.prototype.getFilesWithStatus = function(status) {
        var file, _i, _len, _ref, _results;
        for (_results = [], _i = 0, _len = (_ref = this.files).length; _i < _len; _i++)(file = _ref[_i]).status === status && _results.push(file);
        return _results
      }, Dropzone.prototype.getQueuedFiles = function() {
        return this.getFilesWithStatus(Dropzone.QUEUED)
      }, Dropzone.prototype.getUploadingFiles = function() {
        return this.getFilesWithStatus(Dropzone.UPLOADING)
      }, Dropzone.prototype.getAddedFiles = function() {
        return this.getFilesWithStatus(Dropzone.ADDED)
      }, Dropzone.prototype.getActiveFiles = function() {
        var file, _i, _len, _ref, _results;
        for (_results = [], _i = 0, _len = (_ref = this.files).length; _i < _len; _i++)(file = _ref[_i]).status !== Dropzone.UPLOADING && file.status !== Dropzone.QUEUED || _results.push(file);
        return _results
      }, Dropzone.prototype.init = function() {
        var eventName, noPropagation, setupHiddenFileInput, _i, _len, _ref, _ref1, _this;
        for ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(Dropzone.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length && (_this = this, (setupHiddenFileInput = function() {
            return _this.hiddenFileInput && _this.hiddenFileInput.parentNode.removeChild(_this.hiddenFileInput), _this.hiddenFileInput = document.createElement("input"), _this.hiddenFileInput.setAttribute("type", "file"), (null == _this.options.maxFiles || 1 < _this.options.maxFiles) && _this.hiddenFileInput.setAttribute("multiple", "multiple"), _this.hiddenFileInput.className = "dz-hidden-input", null != _this.options.acceptedFiles && _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles), null != _this.options.capture && _this.hiddenFileInput.setAttribute("capture", _this.options.capture), _this.hiddenFileInput.style.visibility = "hidden", _this.hiddenFileInput.style.position = "absolute", _this.hiddenFileInput.style.top = "0", _this.hiddenFileInput.style.left = "0", _this.hiddenFileInput.style.height = "0", _this.hiddenFileInput.style.width = "0", document.querySelector(_this.options.hiddenInputContainer).appendChild(_this.hiddenFileInput), _this.hiddenFileInput.addEventListener("change", function() {
              var file, files, _i, _len;
              if ((files = _this.hiddenFileInput.files).length)
                for (_i = 0, _len = files.length; _i < _len; _i++) file = files[_i], _this.addFile(file);
              return _this.emit("addedfiles", files), setupHiddenFileInput()
            })
          })()), this.URL = null != (_ref = window.URL) ? _ref : window.webkitURL, _i = 0, _len = (_ref1 = this.events).length; _i < _len; _i++) eventName = _ref1[_i], this.on(eventName, this.options[eventName]);
        return this.on("uploadprogress", function(_this) {
          return function() {
            return _this.updateTotalUploadProgress()
          }
        }(this)), this.on("removedfile", function(_this) {
          return function() {
            return _this.updateTotalUploadProgress()
          }
        }(this)), this.on("canceled", function(_this) {
          return function(file) {
            return _this.emit("complete", file)
          }
        }(this)), this.on("complete", function(_this) {
          return function(file) {
            if (0 === _this.getAddedFiles().length && 0 === _this.getUploadingFiles().length && 0 === _this.getQueuedFiles().length) return setTimeout(function() {
              return _this.emit("queuecomplete")
            }, 0)
          }
        }(this)), noPropagation = function(e) {
          return e.stopPropagation(), e.preventDefault ? e.preventDefault() : e.returnValue = !1
        }, this.listeners = [{
          element: this.element,
          events: {
            dragstart: function(_this) {
              return function(e) {
                return _this.emit("dragstart", e)
              }
            }(this),
            dragenter: function(_this) {
              return function(e) {
                return noPropagation(e), _this.emit("dragenter", e)
              }
            }(this),
            dragover: function(_this) {
              return function(e) {
                var efct;
                try {
                  efct = e.dataTransfer.effectAllowed
                } catch (_error) {}
                return e.dataTransfer.dropEffect = "move" === efct || "linkMove" === efct ? "move" : "copy", noPropagation(e), _this.emit("dragover", e)
              }
            }(this),
            dragleave: function(_this) {
              return function(e) {
                return _this.emit("dragleave", e)
              }
            }(this),
            drop: function(_this) {
              return function(e) {
                return noPropagation(e), _this.drop(e)
              }
            }(this),
            dragend: function(_this) {
              return function(e) {
                return _this.emit("dragend", e)
              }
            }(this)
          }
        }], this.clickableElements.forEach(function(_this) {
          return function(clickableElement) {
            return _this.listeners.push({
              element: clickableElement,
              events: {
                click: function(evt) {
                  return clickableElement === _this.element && evt.target !== _this.element && !Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")) || _this.hiddenFileInput.click(), !0
                }
              }
            })
          }
        }(this)), this.enable(), this.options.init.call(this)
      }, Dropzone.prototype.destroy = function() {
        var _ref;
        return this.disable(), this.removeAllFiles(!0), (null != (_ref = this.hiddenFileInput) ? _ref.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone, Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1)
      }, Dropzone.prototype.updateTotalUploadProgress = function() {
        var file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, _ref;
        if (totalBytes = totalBytesSent = 0, this.getActiveFiles().length) {
          for (_i = 0, _len = (_ref = this.getActiveFiles()).length; _i < _len; _i++) totalBytesSent += (file = _ref[_i]).upload.bytesSent, totalBytes += file.upload.total;
          totalUploadProgress = 100 * totalBytesSent / totalBytes
        } else totalUploadProgress = 100;
        return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent)
      }, Dropzone.prototype._getParamName = function(n) {
        return "function" == typeof this.options.paramName ? this.options.paramName(n) : this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "")
      }, Dropzone.prototype._renameFilename = function(name) {
        return "function" != typeof this.options.renameFilename ? name : this.options.renameFilename(name)
      }, Dropzone.prototype.getFallbackForm = function() {
        var existingFallback, fields, fieldsString, form;
        return (existingFallback = this.getExistingFallback()) ? existingFallback : (fieldsString = '<div class="dz-fallback">', this.options.dictFallbackText && (fieldsString += "<p>" + this.options.dictFallbackText + "</p>"), fieldsString += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>', fields = Dropzone.createElement(fieldsString), "FORM" !== this.element.tagName ? (form = Dropzone.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>')).appendChild(fields) : (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)), null != form ? form : fields)
      }, Dropzone.prototype.getExistingFallback = function() {
        var fallback, getFallback, tagName, _i, _len, _ref;
        for (getFallback = function(elements) {
            var el, _i, _len;
            for (_i = 0, _len = elements.length; _i < _len; _i++)
              if (el = elements[_i], /(^| )fallback($| )/.test(el.className)) return el
          }, _i = 0, _len = (_ref = ["div", "form"]).length; _i < _len; _i++)
          if (tagName = _ref[_i], fallback = getFallback(this.element.getElementsByTagName(tagName))) return fallback
      }, Dropzone.prototype.setupEventListeners = function() {
        var elementListeners, event, listener, _i, _len, _ref, _results;
        for (_results = [], _i = 0, _len = (_ref = this.listeners).length; _i < _len; _i++) elementListeners = _ref[_i], _results.push(function() {
          var _ref1, _results1;
          for (event in _results1 = [], _ref1 = elementListeners.events) listener = _ref1[event], _results1.push(elementListeners.element.addEventListener(event, listener, !1));
          return _results1
        }());
        return _results
      }, Dropzone.prototype.removeEventListeners = function() {
        var elementListeners, event, listener, _i, _len, _ref, _results;
        for (_results = [], _i = 0, _len = (_ref = this.listeners).length; _i < _len; _i++) elementListeners = _ref[_i], _results.push(function() {
          var _ref1, _results1;
          for (event in _results1 = [], _ref1 = elementListeners.events) listener = _ref1[event], _results1.push(elementListeners.element.removeEventListener(event, listener, !1));
          return _results1
        }());
        return _results
      }, Dropzone.prototype.disable = function() {
        var file, _i, _len, _ref, _results;
        for (this.clickableElements.forEach(function(element) {
            return element.classList.remove("dz-clickable")
          }), this.removeEventListeners(), _results = [], _i = 0, _len = (_ref = this.files).length; _i < _len; _i++) file = _ref[_i], _results.push(this.cancelUpload(file));
        return _results
      }, Dropzone.prototype.enable = function() {
        return this.clickableElements.forEach(function(element) {
          return element.classList.add("dz-clickable")
        }), this.setupEventListeners()
      }, Dropzone.prototype.filesize = function(size) {
        var i, selectedSize, selectedUnit, unit, units, _i, _len;
        if (selectedUnit = "b", (selectedSize = 0) < size) {
          for (i = _i = 0, _len = (units = ["TB", "GB", "MB", "KB", "b"]).length; _i < _len; i = ++_i)
            if (unit = units[i], Math.pow(this.options.filesizeBase, 4 - i) / 10 <= size) {
              selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i), selectedUnit = unit;
              break
            } selectedSize = Math.round(10 * selectedSize) / 10
        }
        return "<strong>" + selectedSize + "</strong> " + selectedUnit
      }, Dropzone.prototype._updateMaxFilesReachedClass = function() {
        return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
      }, Dropzone.prototype.drop = function(e) {
        var files, items;
        e.dataTransfer && (this.emit("drop", e), files = e.dataTransfer.files, this.emit("addedfiles", files), files.length && ((items = e.dataTransfer.items) && items.length && null != items[0].webkitGetAsEntry ? this._addFilesFromItems(items) : this.handleFiles(files)))
      }, Dropzone.prototype.paste = function(e) {
        var items, _ref;
        if (null != (null != e && null != (_ref = e.clipboardData) ? _ref.items : void 0)) return this.emit("paste", e), (items = e.clipboardData.items).length ? this._addFilesFromItems(items) : void 0
      }, Dropzone.prototype.handleFiles = function(files) {
        var file, _i, _len, _results;
        for (_results = [], _i = 0, _len = files.length; _i < _len; _i++) file = files[_i], _results.push(this.addFile(file));
        return _results
      }, Dropzone.prototype._addFilesFromItems = function(items) {
        var entry, item, _i, _len, _results;
        for (_results = [], _i = 0, _len = items.length; _i < _len; _i++) null != (item = items[_i]).webkitGetAsEntry && (entry = item.webkitGetAsEntry()) ? entry.isFile ? _results.push(this.addFile(item.getAsFile())) : entry.isDirectory ? _results.push(this._addFilesFromDirectory(entry, entry.name)) : _results.push(void 0) : null != item.getAsFile && (null == item.kind || "file" === item.kind) ? _results.push(this.addFile(item.getAsFile())) : _results.push(void 0);
        return _results
      }, Dropzone.prototype._addFilesFromDirectory = function(directory, path) {
        var dirReader, errorHandler, readEntries, _this;
        return dirReader = directory.createReader(), errorHandler = function(error) {
          return "undefined" != typeof console && null !== console && "function" == typeof console.log ? console.log(error) : void 0
        }, _this = this, (readEntries = function() {
          return dirReader.readEntries(function(entries) {
            var entry, _i, _len;
            if (0 < entries.length) {
              for (_i = 0, _len = entries.length; _i < _len; _i++)(entry = entries[_i]).isFile ? entry.file(function(file) {
                if (!_this.options.ignoreHiddenFiles || "." !== file.name.substring(0, 1)) return file.fullPath = path + "/" + file.name, _this.addFile(file)
              }) : entry.isDirectory && _this._addFilesFromDirectory(entry, path + "/" + entry.name);
              readEntries()
            }
            return null
          }, errorHandler)
        })()
      }, Dropzone.prototype.accept = function(file, done) {
        return file.size > 1024 * this.options.maxFilesize * 1024 ? done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : Dropzone.isValidFile(file, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", file)) : this.options.accept.call(this, file, done) : done(this.options.dictInvalidFileType)
      }, Dropzone.prototype.addFile = function(file) {
        return file.upload = {
          progress: 0,
          total: file.size,
          bytesSent: 0
        }, this.files.push(file), file.status = Dropzone.ADDED, this.emit("addedfile", file), this._enqueueThumbnail(file), this.accept(file, (_this = this, function(error) {
          return error ? (file.accepted = !1, _this._errorProcessing([file], error)) : (file.accepted = !0, _this.options.autoQueue && _this.enqueueFile(file)), _this._updateMaxFilesReachedClass()
        }));
        var _this
      }, Dropzone.prototype.enqueueFiles = function(files) {
        var file, _i, _len;
        for (_i = 0, _len = files.length; _i < _len; _i++) file = files[_i], this.enqueueFile(file);
        return null
      }, Dropzone.prototype.enqueueFile = function(file) {
        if (file.status !== Dropzone.ADDED || !0 !== file.accepted) throw new Error("This file can't be queued because it has already been processed or was rejected.");
        if (file.status = Dropzone.QUEUED, this.options.autoProcessQueue) return setTimeout((_this = this, function() {
          return _this.processQueue()
        }), 0);
        var _this
      }, Dropzone.prototype._thumbnailQueue = [], Dropzone.prototype._processingThumbnail = !1, Dropzone.prototype._enqueueThumbnail = function(file) {
        if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= 1024 * this.options.maxThumbnailFilesize * 1024) return this._thumbnailQueue.push(file), setTimeout((_this = this, function() {
          return _this._processThumbnailQueue()
        }), 0);
        var _this
      }, Dropzone.prototype._processThumbnailQueue = function() {
        var _this;
        if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length) return this._processingThumbnail = !0, this.createThumbnail(this._thumbnailQueue.shift(), (_this = this, function() {
          return _this._processingThumbnail = !1, _this._processThumbnailQueue()
        }))
      }, Dropzone.prototype.removeFile = function(file) {
        if (file.status === Dropzone.UPLOADING && this.cancelUpload(file), this.files = without(this.files, file), this.emit("removedfile", file), 0 === this.files.length) return this.emit("reset")
      }, Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {
        var file, _i, _len, _ref;
        for (null == cancelIfNecessary && (cancelIfNecessary = !1), _i = 0, _len = (_ref = this.files.slice()).length; _i < _len; _i++)(file = _ref[_i]).status === Dropzone.UPLOADING && !cancelIfNecessary || this.removeFile(file);
        return null
      }, Dropzone.prototype.createThumbnail = function(file, callback) {
        var fileReader, _this;
        return (fileReader = new FileReader).onload = (_this = this, function() {
          return "image/svg+xml" === file.type ? (_this.emit("thumbnail", file, fileReader.result), void(null != callback && callback())) : _this.createThumbnailFromUrl(file, fileReader.result, callback)
        }), fileReader.readAsDataURL(file)
      }, Dropzone.prototype.createThumbnailFromUrl = function(file, imageUrl, callback, crossOrigin) {
        var img, _this;
        return img = document.createElement("img"), crossOrigin && (img.crossOrigin = crossOrigin), img.onload = (_this = this, function() {
          var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;
          if (file.width = img.width, file.height = img.height, null == (resizeInfo = _this.options.resize.call(_this, file)).trgWidth && (resizeInfo.trgWidth = resizeInfo.optWidth), null == resizeInfo.trgHeight && (resizeInfo.trgHeight = resizeInfo.optHeight), ctx = (canvas = document.createElement("canvas")).getContext("2d"), canvas.width = resizeInfo.trgWidth, canvas.height = resizeInfo.trgHeight, drawImageIOSFix(ctx, img, null != (_ref = resizeInfo.srcX) ? _ref : 0, null != (_ref1 = resizeInfo.srcY) ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, null != (_ref2 = resizeInfo.trgX) ? _ref2 : 0, null != (_ref3 = resizeInfo.trgY) ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight), thumbnail = canvas.toDataURL("image/png"), _this.emit("thumbnail", file, thumbnail), null != callback) return callback()
        }), null != callback && (img.onerror = callback), img.src = imageUrl
      }, Dropzone.prototype.processQueue = function() {
        var i, parallelUploads, processingLength, queuedFiles;
        if (!((parallelUploads = this.options.parallelUploads) <= (i = processingLength = this.getUploadingFiles().length)) && 0 < (queuedFiles = this.getQueuedFiles()).length) {
          if (this.options.uploadMultiple) return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
          for (; i < parallelUploads;) {
            if (!queuedFiles.length) return;
            this.processFile(queuedFiles.shift()), i++
          }
        }
      }, Dropzone.prototype.processFile = function(file) {
        return this.processFiles([file])
      }, Dropzone.prototype.processFiles = function(files) {
        var file, _i, _len;
        for (_i = 0, _len = files.length; _i < _len; _i++)(file = files[_i]).processing = !0, file.status = Dropzone.UPLOADING, this.emit("processing", file);
        return this.options.uploadMultiple && this.emit("processingmultiple", files), this.uploadFiles(files)
      }, Dropzone.prototype._getFilesWithXhr = function(xhr) {
        var file;
        return function() {
          var _i, _len, _ref, _results;
          for (_results = [], _i = 0, _len = (_ref = this.files).length; _i < _len; _i++)(file = _ref[_i]).xhr === xhr && _results.push(file);
          return _results
        }.call(this)
      }, Dropzone.prototype.cancelUpload = function(file) {
        var groupedFile, groupedFiles, _i, _j, _len, _len1, _ref;
        if (file.status === Dropzone.UPLOADING) {
          for (_i = 0, _len = (groupedFiles = this._getFilesWithXhr(file.xhr)).length; _i < _len; _i++)(groupedFile = groupedFiles[_i]).status = Dropzone.CANCELED;
          for (file.xhr.abort(), _j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) groupedFile = groupedFiles[_j], this.emit("canceled", groupedFile);
          this.options.uploadMultiple && this.emit("canceledmultiple", groupedFiles)
        } else(_ref = file.status) !== Dropzone.ADDED && _ref !== Dropzone.QUEUED || (file.status = Dropzone.CANCELED, this.emit("canceled", file), this.options.uploadMultiple && this.emit("canceledmultiple", [file]));
        if (this.options.autoProcessQueue) return this.processQueue()
      }, resolveOption = function() {
        var args, option;
        return option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [], "function" == typeof option ? option.apply(this, args) : option
      }, Dropzone.prototype.uploadFile = function(file) {
        return this.uploadFiles([file])
      }, Dropzone.prototype.uploadFiles = function(files) {
        var file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, key, method, option, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _this;
        for (xhr = new XMLHttpRequest, _i = 0, _len = files.length; _i < _len; _i++)(file = files[_i]).xhr = xhr;
        for (headerName in method = resolveOption(this.options.method, files), url = resolveOption(this.options.url, files), xhr.open(method, url, !0), xhr.withCredentials = !!this.options.withCredentials, response = null, handleError = function() {
            var _j, _len1, _results;
            for (_results = [], _j = 0, _len1 = files.length; _j < _len1; _j++) file = files[_j], _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
            return _results
          }, updateProgress = function(_this) {
            return function(e) {
              var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
              if (null != e)
                for (progress = 100 * e.loaded / e.total, _j = 0, _len1 = files.length; _j < _len1; _j++)(file = files[_j]).upload = {
                  progress: progress,
                  total: e.total,
                  bytesSent: e.loaded
                };
              else {
                for (allFilesFinished = !0, progress = 100, _k = 0, _len2 = files.length; _k < _len2; _k++) 100 === (file = files[_k]).upload.progress && file.upload.bytesSent === file.upload.total || (allFilesFinished = !1), file.upload.progress = progress, file.upload.bytesSent = file.upload.total;
                if (allFilesFinished) return
              }
              for (_results = [], _l = 0, _len3 = files.length; _l < _len3; _l++) file = files[_l], _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
              return _results
            }
          }(_this = this), xhr.onload = function(_this) {
            return function(e) {
              var _ref;
              if (files[0].status !== Dropzone.CANCELED && 4 === xhr.readyState) {
                if (response = xhr.responseText, xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) try {
                  response = JSON.parse(response)
                } catch (_error) {
                  e = _error, response = "Invalid JSON response from server."
                }
                return updateProgress(), 200 <= (_ref = xhr.status) && _ref < 300 ? _this._finished(files, response, e) : handleError()
              }
            }
          }(this), xhr.onerror = function() {
            if (files[0].status !== Dropzone.CANCELED) return handleError()
          }, (null != (_ref = xhr.upload) ? _ref : xhr).onprogress = updateProgress, headers = {
            Accept: "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
          }, this.options.headers && extend(headers, this.options.headers), headers)(headerValue = headers[headerName]) && xhr.setRequestHeader(headerName, headerValue);
        if (formData = new FormData, this.options.params)
          for (key in _ref1 = this.options.params) value = _ref1[key], formData.append(key, value);
        for (_j = 0, _len1 = files.length; _j < _len1; _j++) file = files[_j], this.emit("sending", file, xhr, formData);
        if (this.options.uploadMultiple && this.emit("sendingmultiple", files, xhr, formData), "FORM" === this.element.tagName)
          for (_k = 0, _len2 = (_ref2 = this.element.querySelectorAll("input, textarea, select, button")).length; _k < _len2; _k++)
            if (inputName = (input = _ref2[_k]).getAttribute("name"), inputType = input.getAttribute("type"), "SELECT" === input.tagName && input.hasAttribute("multiple"))
              for (_l = 0, _len3 = (_ref3 = input.options).length; _l < _len3; _l++)(option = _ref3[_l]).selected && formData.append(inputName, option.value);
            else(!inputType || "checkbox" !== (_ref4 = inputType.toLowerCase()) && "radio" !== _ref4 || input.checked) && formData.append(inputName, input.value);
        for (i = _m = 0, _ref5 = files.length - 1; 0 <= _ref5 ? _m <= _ref5 : _ref5 <= _m; i = 0 <= _ref5 ? ++_m : --_m) formData.append(this._getParamName(i), files[i], this._renameFilename(files[i].name));
        return this.submitRequest(xhr, formData, files)
      }, Dropzone.prototype.submitRequest = function(xhr, formData, files) {
        return xhr.send(formData)
      }, Dropzone.prototype._finished = function(files, responseText, e) {
        var file, _i, _len;
        for (_i = 0, _len = files.length; _i < _len; _i++)(file = files[_i]).status = Dropzone.SUCCESS, this.emit("success", file, responseText, e), this.emit("complete", file);
        if (this.options.uploadMultiple && (this.emit("successmultiple", files, responseText, e), this.emit("completemultiple", files)), this.options.autoProcessQueue) return this.processQueue()
      }, Dropzone.prototype._errorProcessing = function(files, message, xhr) {
        var file, _i, _len;
        for (_i = 0, _len = files.length; _i < _len; _i++)(file = files[_i]).status = Dropzone.ERROR, this.emit("error", file, message, xhr), this.emit("complete", file);
        if (this.options.uploadMultiple && (this.emit("errormultiple", files, message, xhr), this.emit("completemultiple", files)), this.options.autoProcessQueue) return this.processQueue()
      }, Dropzone
    }()).version = "4.3.0", Dropzone.options = {}, Dropzone.optionsForElement = function(element) {
      return element.getAttribute("id") ? Dropzone.options[camelize(element.getAttribute("id"))] : void 0
    }, Dropzone.instances = [], Dropzone.forElement = function(element) {
      if ("string" == typeof element && (element = document.querySelector(element)), null == (null != element ? element.dropzone : void 0)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
      return element.dropzone
    }, Dropzone.autoDiscover = !0, Dropzone.discover = function() {
      var checkElements, dropzone, dropzones, _i, _len, _results;
      for (document.querySelectorAll ? dropzones = document.querySelectorAll(".dropzone") : (dropzones = [], (checkElements = function(elements) {
          var el, _i, _len, _results;
          for (_results = [], _i = 0, _len = elements.length; _i < _len; _i++) el = elements[_i], /(^| )dropzone($| )/.test(el.className) ? _results.push(dropzones.push(el)) : _results.push(void 0);
          return _results
        })(document.getElementsByTagName("div")), checkElements(document.getElementsByTagName("form"))), _results = [], _i = 0, _len = dropzones.length; _i < _len; _i++) dropzone = dropzones[_i], !1 !== Dropzone.optionsForElement(dropzone) ? _results.push(new Dropzone(dropzone)) : _results.push(void 0);
      return _results
    }, Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i], Dropzone.isBrowserSupported = function() {
      var capableBrowser, _i, _len, _ref;
      if (capableBrowser = !0, window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)
        if ("classList" in document.createElement("a"))
          for (_i = 0, _len = (_ref = Dropzone.blacklistedBrowsers).length; _i < _len; _i++) _ref[_i].test(navigator.userAgent) && (capableBrowser = !1);
        else capableBrowser = !1;
      else capableBrowser = !1;
      return capableBrowser
    }, without = function(list, rejectedItem) {
      var item, _i, _len, _results;
      for (_results = [], _i = 0, _len = list.length; _i < _len; _i++)(item = list[_i]) !== rejectedItem && _results.push(item);
      return _results
    }, camelize = function(str) {
      return str.replace(/[\-_](\w)/g, function(match) {
        return match.charAt(1).toUpperCase()
      })
    }, Dropzone.createElement = function(string) {
      var div;
      return (div = document.createElement("div")).innerHTML = string, div.childNodes[0]
    }, Dropzone.elementInside = function(element, container) {
      if (element === container) return !0;
      for (; element = element.parentNode;)
        if (element === container) return !0;
      return !1
    }, Dropzone.getElement = function(el, name) {
      var element;
      if ("string" == typeof el ? element = document.querySelector(el) : null != el.nodeType && (element = el), null == element) throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
      return element
    }, Dropzone.getElements = function(els, name) {
      var el, elements, _i, _j, _len, _len1, _ref;
      if (els instanceof Array) {
        elements = [];
        try {
          for (_i = 0, _len = els.length; _i < _len; _i++) el = els[_i], elements.push(this.getElement(el, name))
        } catch (_error) {
          elements = null
        }
      } else if ("string" == typeof els)
        for (elements = [], _j = 0, _len1 = (_ref = document.querySelectorAll(els)).length; _j < _len1; _j++) el = _ref[_j], elements.push(el);
      else null != els.nodeType && (elements = [els]);
      if (null == elements || !elements.length) throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
      return elements
    }, Dropzone.confirm = function(question, accepted, rejected) {
      return window.confirm(question) ? accepted() : null != rejected ? rejected() : void 0
    }, Dropzone.isValidFile = function(file, acceptedFiles) {
      var baseMimeType, mimeType, validType, _i, _len;
      if (!acceptedFiles) return !0;
      for (acceptedFiles = acceptedFiles.split(","), baseMimeType = (mimeType = file.type).replace(/\/.*$/, ""), _i = 0, _len = acceptedFiles.length; _i < _len; _i++)
        if ("." === (validType = (validType = acceptedFiles[_i]).trim()).charAt(0)) {
          if (-1 !== file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length)) return !0
        } else if (/\/\*$/.test(validType)) {
        if (baseMimeType === validType.replace(/\/.*$/, "")) return !0
      } else if (mimeType === validType) return !0;
      return !1
    }, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function(options) {
      return this.each(function() {
        return new Dropzone(this, options)
      })
    }), "undefined" != typeof module && null !== module ? module.exports = Dropzone : window.Dropzone = Dropzone, Dropzone.ADDED = "added", Dropzone.QUEUED = "queued", Dropzone.ACCEPTED = Dropzone.QUEUED, Dropzone.UPLOADING = "uploading", Dropzone.PROCESSING = Dropzone.UPLOADING, Dropzone.CANCELED = "canceled", Dropzone.ERROR = "error", Dropzone.SUCCESS = "success", detectVerticalSquash = function(img) {
      var canvas, ctx, data, ey, ih, py, ratio, sy;
      for (img.naturalWidth, ih = img.naturalHeight, (canvas = document.createElement("canvas")).width = 1, canvas.height = ih, (ctx = canvas.getContext("2d")).drawImage(img, 0, 0), data = ctx.getImageData(0, 0, 1, ih).data, sy = 0, py = ey = ih; sy < py;) 0 === data[4 * (py - 1) + 3] ? ey = py : sy = py, py = ey + sy >> 1;
      return 0 == (ratio = py / ih) ? 1 : ratio
    }, drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
      var vertSquashRatio;
      return vertSquashRatio = detectVerticalSquash(img), ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio)
    }, contentLoaded = function(win, fn) {
      var add, doc, done, init, poll, pre, rem, root, top;
      if (top = !(done = !1), doc = win.document, root = doc.documentElement, add = doc.addEventListener ? "addEventListener" : "attachEvent", rem = doc.addEventListener ? "removeEventListener" : "detachEvent", pre = doc.addEventListener ? "" : "on", init = function(e) {
          if ("readystatechange" !== e.type || "complete" === doc.readyState) return ("load" === e.type ? win : doc)[rem](pre + e.type, init, !1), !done && (done = !0) ? fn.call(win, e.type || e) : void 0
        }, poll = function() {
          try {
            root.doScroll("left")
          } catch (_error) {
            return void setTimeout(poll, 50)
          }
          return init("poll")
        }, "complete" !== doc.readyState) {
        if (doc.createEventObject && root.doScroll) {
          try {
            top = !win.frameElement
          } catch (_error) {}
          top && poll()
        }
        return doc[add](pre + "DOMContentLoaded", init, !1), doc[add](pre + "readystatechange", init, !1), win[add](pre + "load", init, !1)
      }
    }, Dropzone._autoDiscoverFunction = function() {
      if (Dropzone.autoDiscover) return Dropzone.discover()
    }, "function" != typeof window.Dropzone && contentLoaded(window, Dropzone._autoDiscoverFunction)
  }.call(this),
  function(root) {
    "use strict";

    function factory(angular, Dropzone) {
      angular.module("thatisuday.dropzone", []).provider("dropzoneOps", function() {
        var defOps = {};
        return {
          setOptions: function(newOps) {
            angular.extend(defOps, newOps)
          },
          $get: function() {
            return defOps
          }
        }
      }).directive("ngDropzone", ["$timeout", "dropzoneOps", function($timeout, dropzoneOps) {
        return {
          restrict: "AE",
          template: "<div></div>",
          replace: !0,
          scope: {
            options: "=?",
            callbacks: "=?",
            methods: "=?"
          },
          link: function(scope, iElem, iAttr) {
            scope.options = scope.options || {};
            var initOps = angular.extend({}, dropzoneOps, scope.options),
              dropzone = new Dropzone(iElem[0], initOps);
            scope.methods = scope.methods || {}, scope.methods.getDropzone = function() {
              return dropzone
            }, scope.methods.getAllFiles = function() {
              return dropzone.files
            };
            if (angular.forEach(["removeFile", "removeAllFiles", "processQueue", "getAcceptedFiles", "getRejectedFiles", "getQueuedFiles", "getUploadingFiles", "disable", "enable", "confirm", "createThumbnailFromUrl"], function(methodName) {
                scope.methods[methodName] = function() {
                  dropzone[methodName].apply(dropzone, arguments), scope.$$phase || scope.$root.$$phase || scope.$apply()
                }
              }), scope.callbacks) {
              angular.forEach(["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "removedfile", "thumbnail", "error", "processing", "uploadprogress", "sending", "success", "complete", "canceled", "maxfilesreached", "maxfilesexceeded", "processingmultiple", "sendingmultiple", "successmultiple", "completemultiple", "canceledmultiple", "totaluploadprogress", "reset", "queuecomplete"], function(method) {
                var callback = scope.callbacks[method] || angular.noop;
                dropzone.on(method, function() {
                  callback.apply(null, arguments), scope.$$phase || scope.$root.$$phase || scope.$apply()
                })
              })
            }
          }
        }
      }])
    }
    "object" == typeof module && module.exports ? module.exports = factory(require("angular"), require("dropzone")) : "function" == typeof define && define.amd ? define(["angular", "dropzone"], factory) : factory(root.angular, root.Dropzone)
  }(this),
  function($) {
    if (!$.fn.dotdotdot) {
      $.fn.dotdotdot = function(o) {
        if (0 == this.length) return $.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;
        if (1 < this.length) return this.each(function() {
          $(this).dotdotdot(o)
        });
        var $dot = this,
          orgContent = $dot.contents();
        $dot.data("dotdotdot") && $dot.trigger("destroy.dot"), $dot.data("dotdotdot-style", $dot.attr("style") || ""), $dot.css("word-wrap", "break-word"), "nowrap" === $dot.css("white-space") && $dot.css("white-space", "normal"), $dot.bind_events = function() {
          return $dot.bind("update.dot", function(e, c) {
            switch ($dot.removeClass("is-truncated"), e.preventDefault(), e.stopPropagation(), typeof opts.height) {
              case "number":
                opts.maxHeight = opts.height;
                break;
              case "function":
                opts.maxHeight = opts.height.call($dot[0]);
                break;
              default:
                opts.maxHeight = function($el) {
                  for (var h = $el.innerHeight(), a = ["paddingTop", "paddingBottom"], z = 0, l = a.length; z < l; z++) {
                    var m = parseInt($el.css(a[z]), 10);
                    isNaN(m) && (m = 0), h -= m
                  }
                  return h
                }($dot)
            }
            opts.maxHeight += opts.tolerance, void 0 !== c && (("string" == typeof c || "nodeType" in c && 1 === c.nodeType) && (c = $("<div />").append(c).contents()), c instanceof $ && (orgContent = c)), ($inr = $dot.wrapInner('<div class="dotdotdot" />').children()).contents().detach().end().append(orgContent.clone(!0)).find("br").replaceWith("  <br />  ").end().css({
              height: "auto",
              width: "auto",
              border: "none",
              padding: 0,
              margin: 0
            });
            var after = !1,
              trunc = !1;
            return conf.afterElement && ((after = conf.afterElement.clone(!0)).show(), conf.afterElement.detach()), test($inr, opts) && (trunc = "children" == opts.wrap ? function($elem, o, after) {
              var $elements = $elem.children(),
                isTruncated = !1;
              $elem.empty();
              for (var a = 0, l = $elements.length; a < l; a++) {
                var $e = $elements.eq(a);
                if ($elem.append($e), after && $elem.append(after), test($elem, o)) {
                  $e.remove(), isTruncated = !0;
                  break
                }
                after && after.detach()
              }
              return isTruncated
            }($inr, opts, after) : function ellipsis($elem, $d, $i, o, after) {
              var isTruncated = !1;
              $elem.contents().detach().each(function() {
                var e = this,
                  $e = $(e);
                if (void 0 === e) return !0;
                if ($e.is("script, .dotdotdot-keep")) $elem.append($e);
                else {
                  if (isTruncated) return !0;
                  $elem.append($e), !after || $e.is(o.after) || $e.find(o.after).length || $elem[$elem.is("a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style") ? "after" : "append"](after), test($i, o) && (isTruncated = 3 == e.nodeType ? ellipsisElement($e, $d, $i, o, after) : ellipsis($e, $d, $i, o, after)), isTruncated || after && after.detach()
                }
              });
              $d.addClass("is-truncated");
              return isTruncated
            }($inr, $dot, $inr, opts, after)), $inr.replaceWith($inr.contents()), $inr = null, $.isFunction(opts.callback) && opts.callback.call($dot[0], trunc, orgContent), conf.isTruncated = trunc
          }).bind("isTruncated.dot", function(e, fn) {
            return e.preventDefault(), e.stopPropagation(), "function" == typeof fn && fn.call($dot[0], conf.isTruncated), conf.isTruncated
          }).bind("originalContent.dot", function(e, fn) {
            return e.preventDefault(), e.stopPropagation(), "function" == typeof fn && fn.call($dot[0], orgContent), orgContent
          }).bind("destroy.dot", function(e) {
            e.preventDefault(), e.stopPropagation(), $dot.unwatch().unbind_events().contents().detach().end().append(orgContent).attr("style", $dot.data("dotdotdot-style") || "").removeClass("is-truncated").data("dotdotdot", !1)
          }), $dot
        }, $dot.unbind_events = function() {
          return $dot.unbind(".dot"), $dot
        }, $dot.watch = function() {
          if ($dot.unwatch(), "window" == opts.watch) {
            var $window = $(window),
              _wWidth = $window.width(),
              _wHeight = $window.height();
            $window.bind("resize.dot" + conf.dotId, function() {
              _wWidth == $window.width() && _wHeight == $window.height() && opts.windowResizeFix || (_wWidth = $window.width(), _wHeight = $window.height(), watchInt && clearInterval(watchInt), watchInt = setTimeout(function() {
                $dot.trigger("update.dot")
              }, 100))
            })
          } else watchOrg = getSizes($dot), watchInt = setInterval(function() {
            if ($dot.is(":visible")) {
              var watchNew = getSizes($dot);
              watchOrg.width == watchNew.width && watchOrg.height == watchNew.height || ($dot.trigger("update.dot"), watchOrg = watchNew)
            }
          }, 500);
          return $dot
        }, $dot.unwatch = function() {
          return $(window).unbind("resize.dot" + conf.dotId), watchInt && clearInterval(watchInt), $dot
        };
        var e, $i, opts = $.extend(!0, {}, $.fn.dotdotdot.defaults, o),
          conf = {},
          watchOrg = {},
          watchInt = null,
          $inr = null;
        return opts.lastCharacter.remove instanceof Array || (opts.lastCharacter.remove = $.fn.dotdotdot.defaultArrays.lastCharacter.remove), opts.lastCharacter.noEllipsis instanceof Array || (opts.lastCharacter.noEllipsis = $.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), conf.afterElement = (e = opts.after, $i = $dot, !!e && ("string" != typeof e ? !!e.jquery && e : !!(e = $(e, $i)).length && e)), conf.isTruncated = !1, conf.dotId = dotId++, $dot.data("dotdotdot", !0).bind_events().trigger("update.dot"), opts.watch && $dot.watch(), $dot
      }, $.fn.dotdotdot.defaults = {
        ellipsis: "... ",
        wrap: "word",
        fallbackToLetter: !0,
        lastCharacter: {},
        tolerance: 0,
        callback: null,
        after: null,
        height: null,
        watch: !1,
        windowResizeFix: !0
      }, $.fn.dotdotdot.defaultArrays = {
        lastCharacter: {
          remove: [" ", "　", ",", ";", ".", "!", "?"],
          noEllipsis: []
        }
      }, $.fn.dotdotdot.debug = function(msg) {};
      var dotId = 1,
        _orgHtml = $.fn.html;
      $.fn.html = function(str) {
        return null != str && !$.isFunction(str) && this.data("dotdotdot") ? this.trigger("update", [str]) : _orgHtml.apply(this, arguments)
      };
      var _orgText = $.fn.text;
      $.fn.text = function(str) {
        return null != str && !$.isFunction(str) && this.data("dotdotdot") ? (str = $("<div />").text(str).html(), this.trigger("update", [str])) : _orgText.apply(this, arguments)
      }
    }

    function ellipsisElement($e, $d, $i, o, after) {
      var e = $e[0];
      if (!e) return !1;
      var txt = getTextContent(e),
        space = -1 !== txt.indexOf(" ") ? " " : "　",
        separator = "letter" == o.wrap ? "" : space,
        textArr = txt.split(separator),
        position = -1,
        midPos = -1,
        startPos = 0,
        endPos = textArr.length - 1;
      for (o.fallbackToLetter && 0 == startPos && 0 == endPos && (separator = "", endPos = (textArr = txt.split(separator)).length - 1); startPos <= endPos && (0 != startPos || 0 != endPos);) {
        var m = Math.floor((startPos + endPos) / 2);
        if (m == midPos) break;
        midPos = m, setTextContent(e, textArr.slice(0, midPos + 1).join(separator) + o.ellipsis), $i.children().each(function() {
          $(this).toggle().toggle()
        }), test($i, o) ? (endPos = midPos, o.fallbackToLetter && 0 == startPos && 0 == endPos && (separator = "", midPos = position = -1, endPos = (textArr = textArr[startPos = 0].split(separator)).length - 1)) : startPos = position = midPos
      }
      if (-1 == position || 1 == textArr.length && 0 == textArr[0].length) {
        var $w = $e.parent();
        $e.detach();
        var afterLength = after && after.closest($w).length ? after.length : 0;
        if ($w.contents().length > afterLength ? e = findLastTextNode($w.contents().eq(-1 - afterLength), $d) : (e = findLastTextNode($w, $d, !0), afterLength || $w.detach()), e && (setTextContent(e, txt = addEllipsis(getTextContent(e), o)), afterLength && after)) {
          var $parent = after.parent();
          $(e).parent().append(after), $.trim($parent.html()) || $parent.remove()
        }
      } else setTextContent(e, txt = addEllipsis(textArr.slice(0, position + 1).join(separator), o));
      return !0
    }

    function test($i, o) {
      return $i.innerHeight() > o.maxHeight
    }

    function addEllipsis(txt, o) {
      for (; - 1 < $.inArray(txt.slice(-1), o.lastCharacter.remove);) txt = txt.slice(0, -1);
      return $.inArray(txt.slice(-1), o.lastCharacter.noEllipsis) < 0 && (txt += o.ellipsis), txt
    }

    function getSizes($d) {
      return {
        width: $d.innerWidth(),
        height: $d.innerHeight()
      }
    }

    function setTextContent(e, content) {
      e.innerText ? e.innerText = content : e.nodeValue ? e.nodeValue = content : e.textContent && (e.textContent = content)
    }

    function getTextContent(e) {
      return e.innerText ? e.innerText : e.nodeValue ? e.nodeValue : e.textContent ? e.textContent : ""
    }

    function getPrevNode(n) {
      for (;
        (n = n.previousSibling) && 1 !== n.nodeType && 3 !== n.nodeType;);
      return n
    }

    function findLastTextNode($el, $top, excludeCurrent) {
      var p, e = $el && $el[0];
      if (e) {
        if (!excludeCurrent) {
          if (3 === e.nodeType) return e;
          if ($.trim($el.text())) return findLastTextNode($el.contents().last(), $top)
        }
        for (p = getPrevNode(e); !p;) {
          if (($el = $el.parent()).is($top) || !$el.length) return !1;
          p = getPrevNode($el[0])
        }
        if (p) return findLastTextNode($(p), $top)
      }
      return !1
    }
  }(jQuery), jQuery(document).ready(function($) {
    $(".dot-ellipsis").each(function() {
      var watch_window = $(this).hasClass("dot-resize-update"),
        watch_timer = $(this).hasClass("dot-timer-update"),
        height = 0,
        classList = $(this).attr("class").split(/\s+/);
      $.each(classList, function(index, item) {
        var matchResult = item.match(/^dot-height-(\d+)$/);
        null !== matchResult && (height = Number(matchResult[1]))
      });
      var x = new Object;
      watch_timer && (x.watch = !0), watch_window && (x.watch = "window"), 0 < height && (x.height = height), $(this).dotdotdot(x)
    })
  }), jQuery(window).on("load", function() {
    jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot")
  }),
  function(factory) {
    "undefined" != typeof module && module.exports ? module.exports = factory : factory(jQuery, window, document)
  }(function($) {
    var pluginNS, defaults, totalInstances, liveTimers, oldIE, touchActive, touchable, classes, methods, _selector, _theme, removeLiveTimers, _findAxis, _findScrollButtonsType, _pluginMarkup, _contentWidth, _expandContentHorizontally, _scrollButtons, _maxHeight, _setDraggerLength, _scrollRatio, _onDragClasses, _overflowed, _resetContentPosition, _bindEvents, _unbindEvents, _scrollbarVisibility, _coordinates, _draggable, _contentDraggable, _selectable, _mousewheel, _canAccessIFrame, _disableMousewheel, _draggerRail, _focus, _wrapperScroll, _buttons, _keyboard, _sequentialScroll, _arr, _to, _autoUpdate, _stop, _scrollTo, _tweenTo, _getTime, _stopTween, _delete, _mouseBtnLeft, _pointerTouch, _isNumeric, _childPos, _rjs, _njs, _dlp;
    _rjs = "function" == typeof define && define.amd, _njs = "undefined" != typeof module && module.exports, _dlp = "https:" == document.location.protocol ? "https:" : "http:", _rjs || (_njs ? require("jquery-mousewheel")($) : $.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src=" + _dlp + "//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js%3E%3C/script%3E"))), pluginNS = "mCustomScrollbar", defaults = {
      setTop: 0,
      setLeft: 0,
      axis: "y",
      scrollbarPosition: "inside",
      scrollInertia: 950,
      autoDraggerLength: !0,
      alwaysShowScrollbar: 0,
      snapOffset: 0,
      mouseWheel: {
        enable: !0,
        scrollAmount: "auto",
        axis: "y",
        deltaFactor: "auto",
        disableOver: ["select", "option", "keygen", "datalist", "textarea"]
      },
      scrollButtons: {
        scrollType: "stepless",
        scrollAmount: "auto"
      },
      keyboard: {
        enable: !0,
        scrollType: "stepless",
        scrollAmount: "auto"
      },
      contentTouchScroll: 25,
      advanced: {
        autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
        updateOnContentResize: !0,
        updateOnImageLoad: !0,
        autoUpdateTimeout: 60
      },
      theme: "light",
      callbacks: {
        onTotalScrollOffset: 0,
        onTotalScrollBackOffset: 0,
        alwaysTriggerOffsets: !0
      }
    }, totalInstances = 0, liveTimers = {}, oldIE = window.attachEvent && !window.addEventListener ? 1 : 0, touchActive = !1, classes = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"], methods = {
      init: function(options) {
        options = $.extend(!0, {}, defaults, options);
        var selector = _selector.call(this);
        if (options.live) {
          var liveSelector = options.liveSelector || this.selector || ".mCustomScrollbar",
            $liveSelector = $(liveSelector);
          if ("off" === options.live) return void removeLiveTimers(liveSelector);
          liveTimers[liveSelector] = setTimeout(function() {
            $liveSelector.mCustomScrollbar(options), "once" === options.live && $liveSelector.length && removeLiveTimers(liveSelector)
          }, 500)
        } else removeLiveTimers(liveSelector);
        return options.setWidth = options.set_width ? options.set_width : options.setWidth, options.setHeight = options.set_height ? options.set_height : options.setHeight, options.axis = options.horizontalScroll ? "x" : _findAxis(options.axis), options.scrollInertia = 0 < options.scrollInertia && options.scrollInertia < 17 ? 17 : options.scrollInertia, "object" != typeof options.mouseWheel && 1 == options.mouseWheel && (options.mouseWheel = {
          enable: !0,
          scrollAmount: "auto",
          axis: "y",
          preventDefault: !1,
          deltaFactor: "auto",
          normalizeDelta: !1,
          invert: !1
        }), options.mouseWheel.scrollAmount = options.mouseWheelPixels ? options.mouseWheelPixels : options.mouseWheel.scrollAmount, options.mouseWheel.normalizeDelta = options.advanced.normalizeMouseWheelDelta ? options.advanced.normalizeMouseWheelDelta : options.mouseWheel.normalizeDelta, options.scrollButtons.scrollType = _findScrollButtonsType(options.scrollButtons.scrollType), _theme(options), $(selector).each(function() {
          var $this = $(this);
          if (!$this.data("mCS")) {
            $this.data("mCS", {
              idx: ++totalInstances,
              opt: options,
              scrollRatio: {
                y: null,
                x: null
              },
              overflowed: null,
              contentReset: {
                y: null,
                x: null
              },
              bindEvents: !1,
              tweenRunning: !1,
              sequential: {},
              langDir: $this.css("direction"),
              cbOffsets: null,
              trigger: null
            });
            var d = $this.data("mCS"),
              o = d.opt,
              htmlDataAxis = $this.data("mcs-axis"),
              htmlDataSbPos = $this.data("mcs-scrollbar-position"),
              htmlDataTheme = $this.data("mcs-theme");
            htmlDataAxis && (o.axis = htmlDataAxis), htmlDataSbPos && (o.scrollbarPosition = htmlDataSbPos), htmlDataTheme && (o.theme = htmlDataTheme, _theme(o)), _pluginMarkup.call(this), $("#mCSB_" + d.idx + "_container img:not(." + classes[2] + ")").addClass(classes[2]), methods.update.call(null, $this)
          }
        })
      },
      update: function(el, cb) {
        var selector = el || _selector.call(this);
        return $(selector).each(function() {
          var $this = $(this);
          if ($this.data("mCS")) {
            var d = $this.data("mCS"),
              o = d.opt,
              mCSB_container = $("#mCSB_" + d.idx + "_container"),
              mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];
            if (!mCSB_container.length) return;
            d.tweenRunning && _stop($this), $this.hasClass(classes[3]) && $this.removeClass(classes[3]), $this.hasClass(classes[4]) && $this.removeClass(classes[4]), _maxHeight.call(this), _expandContentHorizontally.call(this), "y" === o.axis || o.advanced.autoExpandHorizontalScroll || mCSB_container.css("width", _contentWidth(mCSB_container.children())), d.overflowed = _overflowed.call(this), _scrollbarVisibility.call(this), o.autoDraggerLength && _setDraggerLength.call(this), _scrollRatio.call(this), _bindEvents.call(this);
            var to = [Math.abs(mCSB_container[0].offsetTop), Math.abs(mCSB_container[0].offsetLeft)];
            "x" !== o.axis && (d.overflowed[0] ? mCSB_dragger[0].height() > mCSB_dragger[0].parent().height() ? _resetContentPosition.call(this) : (_scrollTo($this, to[0].toString(), {
              dir: "y",
              dur: 0,
              overwrite: "none"
            }), d.contentReset.y = null) : (_resetContentPosition.call(this), "y" === o.axis ? _unbindEvents.call(this) : "yx" === o.axis && d.overflowed[1] && _scrollTo($this, to[1].toString(), {
              dir: "x",
              dur: 0,
              overwrite: "none"
            }))), "y" !== o.axis && (d.overflowed[1] ? mCSB_dragger[1].width() > mCSB_dragger[1].parent().width() ? _resetContentPosition.call(this) : (_scrollTo($this, to[1].toString(), {
              dir: "x",
              dur: 0,
              overwrite: "none"
            }), d.contentReset.x = null) : (_resetContentPosition.call(this), "x" === o.axis ? _unbindEvents.call(this) : "yx" === o.axis && d.overflowed[0] && _scrollTo($this, to[0].toString(), {
              dir: "y",
              dur: 0,
              overwrite: "none"
            }))), cb && d && (2 === cb && o.callbacks.onImageLoad && "function" == typeof o.callbacks.onImageLoad ? o.callbacks.onImageLoad.call(this) : 3 === cb && o.callbacks.onSelectorChange && "function" == typeof o.callbacks.onSelectorChange ? o.callbacks.onSelectorChange.call(this) : o.callbacks.onUpdate && "function" == typeof o.callbacks.onUpdate && o.callbacks.onUpdate.call(this)), _autoUpdate.call(this)
          }
        })
      },
      scrollTo: function(val, options) {
        if (void 0 !== val && null != val) {
          var selector = _selector.call(this);
          return $(selector).each(function() {
            var $this = $(this);
            if ($this.data("mCS")) {
              var d = $this.data("mCS"),
                o = d.opt,
                methodDefaults = {
                  trigger: "external",
                  scrollInertia: o.scrollInertia,
                  scrollEasing: "mcsEaseInOut",
                  moveDragger: !1,
                  timeout: 60,
                  callbacks: !0,
                  onStart: !0,
                  onUpdate: !0,
                  onComplete: !0
                },
                methodOptions = $.extend(!0, {}, methodDefaults, options),
                to = _arr.call(this, val),
                dur = 0 < methodOptions.scrollInertia && methodOptions.scrollInertia < 17 ? 17 : methodOptions.scrollInertia;
              to[0] = _to.call(this, to[0], "y"), to[1] = _to.call(this, to[1], "x"), methodOptions.moveDragger && (to[0] *= d.scrollRatio.y, to[1] *= d.scrollRatio.x), methodOptions.dur = dur, setTimeout(function() {
                null !== to[0] && void 0 !== to[0] && "x" !== o.axis && d.overflowed[0] && (methodOptions.dir = "y", methodOptions.overwrite = "all", _scrollTo($this, to[0].toString(), methodOptions)), null !== to[1] && void 0 !== to[1] && "y" !== o.axis && d.overflowed[1] && (methodOptions.dir = "x", methodOptions.overwrite = "none", _scrollTo($this, to[1].toString(), methodOptions))
              }, methodOptions.timeout)
            }
          })
        }
      },
      stop: function() {
        var selector = _selector.call(this);
        return $(selector).each(function() {
          var $this = $(this);
          $this.data("mCS") && _stop($this)
        })
      },
      disable: function(r) {
        var selector = _selector.call(this);
        return $(selector).each(function() {
          var $this = $(this);
          if ($this.data("mCS")) {
            $this.data("mCS");
            _autoUpdate.call(this, "remove"), _unbindEvents.call(this), r && _resetContentPosition.call(this), _scrollbarVisibility.call(this, !0), $this.addClass(classes[3])
          }
        })
      },
      destroy: function() {
        var selector = _selector.call(this);
        return $(selector).each(function() {
          var $this = $(this);
          if ($this.data("mCS")) {
            var d = $this.data("mCS"),
              o = d.opt,
              mCustomScrollBox = $("#mCSB_" + d.idx),
              mCSB_container = $("#mCSB_" + d.idx + "_container"),
              scrollbar = $(".mCSB_" + d.idx + "_scrollbar");
            o.live && removeLiveTimers(o.liveSelector || $(selector).selector), _autoUpdate.call(this, "remove"), _unbindEvents.call(this), _resetContentPosition.call(this), $this.removeData("mCS"), _delete(this, "mcs"), scrollbar.remove(), mCSB_container.find("img." + classes[2]).removeClass(classes[2]), mCustomScrollBox.replaceWith(mCSB_container.contents()), $this.removeClass(pluginNS + " _mCS_" + d.idx + " " + classes[6] + " " + classes[7] + " " + classes[5] + " " + classes[3]).addClass(classes[4])
          }
        })
      }
    }, _selector = function() {
      return "object" != typeof $(this) || $(this).length < 1 ? ".mCustomScrollbar" : this
    }, _theme = function(obj) {
      obj.autoDraggerLength = !(-1 < $.inArray(obj.theme, ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"])) && obj.autoDraggerLength, obj.autoExpandScrollbar = !(-1 < $.inArray(obj.theme, ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"])) && obj.autoExpandScrollbar, obj.scrollButtons.enable = !(-1 < $.inArray(obj.theme, ["minimal", "minimal-dark"])) && obj.scrollButtons.enable, obj.autoHideScrollbar = -1 < $.inArray(obj.theme, ["minimal", "minimal-dark"]) || obj.autoHideScrollbar, obj.scrollbarPosition = -1 < $.inArray(obj.theme, ["minimal", "minimal-dark"]) ? "outside" : obj.scrollbarPosition
    }, removeLiveTimers = function(selector) {
      liveTimers[selector] && (clearTimeout(liveTimers[selector]), _delete(liveTimers, selector))
    }, _findAxis = function(val) {
      return "yx" === val || "xy" === val || "auto" === val ? "yx" : "x" === val || "horizontal" === val ? "x" : "y"
    }, _findScrollButtonsType = function(val) {
      return "stepped" === val || "pixels" === val || "step" === val || "click" === val ? "stepped" : "stepless"
    }, _pluginMarkup = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        expandClass = o.autoExpandScrollbar ? " " + classes[1] + "_expand" : "",
        scrollbar = ["<div id='mCSB_" + d.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + d.idx + "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_vertical" + expandClass + "'><div class='" + classes[12] + "'><div id='mCSB_" + d.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + d.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + d.idx + "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_horizontal" + expandClass + "'><div class='" + classes[12] + "'><div id='mCSB_" + d.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
        wrapperClass = "yx" === o.axis ? "mCSB_vertical_horizontal" : "x" === o.axis ? "mCSB_horizontal" : "mCSB_vertical",
        scrollbars = "yx" === o.axis ? scrollbar[0] + scrollbar[1] : "x" === o.axis ? scrollbar[1] : scrollbar[0],
        contentWrapper = "yx" === o.axis ? "<div id='mCSB_" + d.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
        autoHideClass = o.autoHideScrollbar ? " " + classes[6] : "",
        scrollbarDirClass = "x" !== o.axis && "rtl" === d.langDir ? " " + classes[7] : "";
      o.setWidth && $this.css("width", o.setWidth), o.setHeight && $this.css("height", o.setHeight), o.setLeft = "y" !== o.axis && "rtl" === d.langDir ? "989999px" : o.setLeft, $this.addClass(pluginNS + " _mCS_" + d.idx + autoHideClass + scrollbarDirClass).wrapInner("<div id='mCSB_" + d.idx + "' class='mCustomScrollBox mCS-" + o.theme + " " + wrapperClass + "'><div id='mCSB_" + d.idx + "_container' class='mCSB_container' style='position:relative; top:" + o.setTop + "; left:" + o.setLeft + ";' dir=" + d.langDir + " /></div>");
      var mCustomScrollBox = $("#mCSB_" + d.idx),
        mCSB_container = $("#mCSB_" + d.idx + "_container");
      "y" === o.axis || o.advanced.autoExpandHorizontalScroll || mCSB_container.css("width", _contentWidth(mCSB_container.children())), "outside" === o.scrollbarPosition ? ("static" === $this.css("position") && $this.css("position", "relative"), $this.css("overflow", "visible"), mCustomScrollBox.addClass("mCSB_outside").after(scrollbars)) : (mCustomScrollBox.addClass("mCSB_inside").append(scrollbars), mCSB_container.wrap(contentWrapper)), _scrollButtons.call(this);
      var mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];
      mCSB_dragger[0].css("min-height", mCSB_dragger[0].height()), mCSB_dragger[1].css("min-width", mCSB_dragger[1].width())
    }, _contentWidth = function(el) {
      return Math.max.apply(Math, el.map(function() {
        return $(this).outerWidth(!0)
      }).get())
    }, _expandContentHorizontally = function() {
      var d = $(this).data("mCS"),
        o = d.opt,
        mCSB_container = $("#mCSB_" + d.idx + "_container");
      o.advanced.autoExpandHorizontalScroll && "y" !== o.axis && mCSB_container.css({
        position: "absolute",
        width: "auto"
      }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
        width: Math.ceil(mCSB_container[0].getBoundingClientRect().right + .4) - Math.floor(mCSB_container[0].getBoundingClientRect().left),
        position: "relative"
      }).unwrap()
    }, _scrollButtons = function() {
      var d = $(this).data("mCS"),
        o = d.opt,
        mCSB_scrollTools = $(".mCSB_" + d.idx + "_scrollbar:first"),
        tabindex = _isNumeric(o.scrollButtons.tabindex) ? "tabindex='" + o.scrollButtons.tabindex + "'" : "",
        btnHTML = ["<a href='#' class='" + classes[13] + "' oncontextmenu='return false;' " + tabindex + " />", "<a href='#' class='" + classes[14] + "' oncontextmenu='return false;' " + tabindex + " />", "<a href='#' class='" + classes[15] + "' oncontextmenu='return false;' " + tabindex + " />", "<a href='#' class='" + classes[16] + "' oncontextmenu='return false;' " + tabindex + " />"],
        btn = ["x" === o.axis ? btnHTML[2] : btnHTML[0], "x" === o.axis ? btnHTML[3] : btnHTML[1], btnHTML[2], btnHTML[3]];
      o.scrollButtons.enable && mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3])
    }, _maxHeight = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        mCustomScrollBox = $("#mCSB_" + d.idx),
        mh = $this.css("max-height") || "none",
        pct = -1 !== mh.indexOf("%"),
        bs = $this.css("box-sizing");
      if ("none" !== mh) {
        var val = pct ? $this.parent().height() * parseInt(mh) / 100 : parseInt(mh);
        "border-box" === bs && (val -= $this.innerHeight() - $this.height() + ($this.outerHeight() - $this.innerHeight())), mCustomScrollBox.css("max-height", Math.round(val))
      }
    }, _setDraggerLength = function() {
      var d = $(this).data("mCS"),
        mCustomScrollBox = $("#mCSB_" + d.idx),
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
        ratio = [mCustomScrollBox.height() / mCSB_container.outerHeight(!1), mCustomScrollBox.width() / mCSB_container.outerWidth(!1)],
        l = [parseInt(mCSB_dragger[0].css("min-height")), Math.round(ratio[0] * mCSB_dragger[0].parent().height()), parseInt(mCSB_dragger[1].css("min-width")), Math.round(ratio[1] * mCSB_dragger[1].parent().width())],
        h = oldIE && l[1] < l[0] ? l[0] : l[1],
        w = oldIE && l[3] < l[2] ? l[2] : l[3];
      mCSB_dragger[0].css({
        height: h,
        "max-height": mCSB_dragger[0].parent().height() - 10
      }).find(".mCSB_dragger_bar").css({
        "line-height": l[0] + "px"
      }), mCSB_dragger[1].css({
        width: w,
        "max-width": mCSB_dragger[1].parent().width() - 10
      })
    }, _scrollRatio = function() {
      var d = $(this).data("mCS"),
        mCustomScrollBox = $("#mCSB_" + d.idx),
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
        scrollAmount = [mCSB_container.outerHeight(!1) - mCustomScrollBox.height(), mCSB_container.outerWidth(!1) - mCustomScrollBox.width()],
        ratio = [scrollAmount[0] / (mCSB_dragger[0].parent().height() - mCSB_dragger[0].height()), scrollAmount[1] / (mCSB_dragger[1].parent().width() - mCSB_dragger[1].width())];
      d.scrollRatio = {
        y: ratio[0],
        x: ratio[1]
      }
    }, _onDragClasses = function(el, action, xpnd) {
      var expandClass = xpnd ? classes[0] + "_expanded" : "",
        scrollbar = el.closest(".mCSB_scrollTools");
      "active" === action ? (el.toggleClass(classes[0] + " " + expandClass), scrollbar.toggleClass(classes[1]), el[0]._draggable = el[0]._draggable ? 0 : 1) : el[0]._draggable || ("hide" === action ? (el.removeClass(classes[0]), scrollbar.removeClass(classes[1])) : (el.addClass(classes[0]), scrollbar.addClass(classes[1])))
    }, _overflowed = function() {
      var d = $(this).data("mCS"),
        mCustomScrollBox = $("#mCSB_" + d.idx),
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        contentHeight = null == d.overflowed ? mCSB_container.height() : mCSB_container.outerHeight(!1),
        contentWidth = null == d.overflowed ? mCSB_container.width() : mCSB_container.outerWidth(!1);
      return [contentHeight > mCustomScrollBox.height(), contentWidth > mCustomScrollBox.width()]
    }, _resetContentPosition = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        mCustomScrollBox = $("#mCSB_" + d.idx),
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];
      if (_stop($this), ("x" !== o.axis && !d.overflowed[0] || "y" === o.axis && d.overflowed[0]) && (mCSB_dragger[0].add(mCSB_container).css("top", 0), _scrollTo($this, "_resetY")), "y" !== o.axis && !d.overflowed[1] || "x" === o.axis && d.overflowed[1]) {
        var cx = dx = 0;
        "rtl" === d.langDir && (cx = mCustomScrollBox.width() - mCSB_container.outerWidth(!1), dx = Math.abs(cx / d.scrollRatio.x)), mCSB_container.css("left", cx), mCSB_dragger[1].css("left", dx), _scrollTo($this, "_resetX")
      }
    }, _bindEvents = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt;
      if (!d.bindEvents) {
        if (_draggable.call(this), o.contentTouchScroll && _contentDraggable.call(this), _selectable.call(this), o.mouseWheel.enable) {
          var mousewheelTimeout;
          ! function _mwt() {
            mousewheelTimeout = setTimeout(function() {
              $.event.special.mousewheel ? (clearTimeout(mousewheelTimeout), _mousewheel.call($this[0])) : _mwt()
            }, 100)
          }()
        }
        _draggerRail.call(this), _wrapperScroll.call(this), o.advanced.autoScrollOnFocus && _focus.call(this), o.scrollButtons.enable && _buttons.call(this), o.keyboard.enable && _keyboard.call(this), d.bindEvents = !0
      }
    }, _unbindEvents = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        namespace = "mCS_" + d.idx,
        sb = ".mCSB_" + d.idx + "_scrollbar",
        sel = $("#mCSB_" + d.idx + ",#mCSB_" + d.idx + "_container,#mCSB_" + d.idx + "_container_wrapper," + sb + " ." + classes[12] + ",#mCSB_" + d.idx + "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal," + sb + ">a"),
        mCSB_container = $("#mCSB_" + d.idx + "_container");
      o.advanced.releaseDraggableSelectors && sel.add($(o.advanced.releaseDraggableSelectors)), d.bindEvents && ($(document).unbind("." + namespace), sel.each(function() {
        $(this).unbind("." + namespace)
      }), clearTimeout($this[0]._focusTimeout), _delete($this[0], "_focusTimeout"), clearTimeout(d.sequential.step), _delete(d.sequential, "step"), clearTimeout(mCSB_container[0].onCompleteTimeout), _delete(mCSB_container[0], "onCompleteTimeout"), d.bindEvents = !1)
    }, _scrollbarVisibility = function(disabled) {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        contentWrapper = $("#mCSB_" + d.idx + "_container_wrapper"),
        content = contentWrapper.length ? contentWrapper : $("#mCSB_" + d.idx + "_container"),
        scrollbar = [$("#mCSB_" + d.idx + "_scrollbar_vertical"), $("#mCSB_" + d.idx + "_scrollbar_horizontal")],
        mCSB_dragger = [scrollbar[0].find(".mCSB_dragger"), scrollbar[1].find(".mCSB_dragger")];
      "x" !== o.axis && (d.overflowed[0] && !disabled ? (scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display", "block"), content.removeClass(classes[8] + " " + classes[10])) : (o.alwaysShowScrollbar ? (2 !== o.alwaysShowScrollbar && mCSB_dragger[0].css("display", "none"), content.removeClass(classes[10])) : (scrollbar[0].css("display", "none"), content.addClass(classes[10])), content.addClass(classes[8]))), "y" !== o.axis && (d.overflowed[1] && !disabled ? (scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display", "block"), content.removeClass(classes[9] + " " + classes[11])) : (o.alwaysShowScrollbar ? (2 !== o.alwaysShowScrollbar && mCSB_dragger[1].css("display", "none"), content.removeClass(classes[11])) : (scrollbar[1].css("display", "none"), content.addClass(classes[11])), content.addClass(classes[9]))), d.overflowed[0] || d.overflowed[1] ? $this.removeClass(classes[5]) : $this.addClass(classes[5])
    }, _coordinates = function(e) {
      switch (e.type) {
        case "pointerdown":
        case "MSPointerDown":
        case "pointermove":
        case "MSPointerMove":
        case "pointerup":
        case "MSPointerUp":
          return e.target.ownerDocument !== document ? [e.originalEvent.screenY, e.originalEvent.screenX, !1] : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
        case "touchstart":
        case "touchmove":
        case "touchend":
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
            touches = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
          return e.target.ownerDocument !== document ? [touch.screenY, touch.screenX, 1 < touches] : [touch.pageY, touch.pageX, 1 < touches];
        default:
          return [e.pageY, e.pageX, !1]
      }
    }, _draggable = function() {
      var draggable, dragY, dragX, $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        namespace = "mCS_" + d.idx,
        draggerId = ["mCSB_" + d.idx + "_dragger_vertical", "mCSB_" + d.idx + "_dragger_horizontal"],
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        mCSB_dragger = $("#" + draggerId[0] + ",#" + draggerId[1]),
        rds = o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger;

      function _iframe(evt) {
        var el = mCSB_container.find("iframe");
        if (el.length) {
          var val = evt ? "auto" : "none";
          el.css("pointer-events", val)
        }
      }

      function _drag(dragY, dragX, y, x) {
        if (mCSB_container[0].idleTimer = o.scrollInertia < 233 ? 250 : 0, draggable.attr("id") === draggerId[1]) var dir = "x",
          to = (draggable[0].offsetLeft - dragX + x) * d.scrollRatio.x;
        else dir = "y", to = (draggable[0].offsetTop - dragY + y) * d.scrollRatio.y;
        _scrollTo($this, to.toString(), {
          dir: dir,
          drag: !0
        })
      }
      mCSB_dragger.bind("mousedown." + namespace + " touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, function(e) {
        if (e.stopImmediatePropagation(), e.preventDefault(), _mouseBtnLeft(e)) {
          touchActive = !0, oldIE && (document.onselectstart = function() {
            return !1
          }), _iframe(!1), _stop($this);
          var offset = (draggable = $(this)).offset(),
            y = _coordinates(e)[0] - offset.top,
            x = _coordinates(e)[1] - offset.left,
            h = draggable.height() + offset.top,
            w = draggable.width() + offset.left;
          y < h && 0 < y && x < w && 0 < x && (dragY = y, dragX = x), _onDragClasses(draggable, "active", o.autoExpandScrollbar)
        }
      }).bind("touchmove." + namespace, function(e) {
        e.stopImmediatePropagation(), e.preventDefault();
        var offset = draggable.offset(),
          y = _coordinates(e)[0] - offset.top,
          x = _coordinates(e)[1] - offset.left;
        _drag(dragY, dragX, y, x)
      }), $(document).bind("mousemove." + namespace + " pointermove." + namespace + " MSPointerMove." + namespace, function(e) {
        if (draggable) {
          var offset = draggable.offset(),
            y = _coordinates(e)[0] - offset.top,
            x = _coordinates(e)[1] - offset.left;
          if (dragY === y) return;
          _drag(dragY, dragX, y, x)
        }
      }).add(rds).bind("mouseup." + namespace + " touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace, function(e) {
        draggable && (_onDragClasses(draggable, "active", o.autoExpandScrollbar), draggable = null), touchActive = !1, oldIE && (document.onselectstart = null), _iframe(!0)
      })
    }, _contentDraggable = function() {
      var dragY, dragX, touchStartY, touchStartX, startTime, runningTime, endTime, distance, speed, amount, durB, touchDrag, docDrag, $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        namespace = "mCS_" + d.idx,
        mCustomScrollBox = $("#mCSB_" + d.idx),
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
        touchMoveY = [],
        touchMoveX = [],
        durA = 0,
        overwrite = "yx" === o.axis ? "none" : "all",
        touchIntent = [],
        iframe = mCSB_container.find("iframe"),
        events = ["touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, "touchmove." + namespace + " pointermove." + namespace + " MSPointerMove." + namespace, "touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace];

      function _onTouchstart(e) {
        if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) touchable = 0;
        else {
          touchable = 1, docDrag = touchDrag = 0, $this.removeClass("mCS_touch_action");
          var offset = mCSB_container.offset();
          dragY = _coordinates(e)[0] - offset.top, dragX = _coordinates(e)[1] - offset.left, touchIntent = [_coordinates(e)[0], _coordinates(e)[1]]
        }
      }

      function _onTouchmove(e) {
        if (_pointerTouch(e) && !touchActive && !_coordinates(e)[2] && (e.stopImmediatePropagation(), !docDrag || touchDrag)) {
          runningTime = _getTime();
          var offset = mCustomScrollBox.offset(),
            y = _coordinates(e)[0] - offset.top,
            x = _coordinates(e)[1] - offset.left;
          if (touchMoveY.push(y), touchMoveX.push(x), touchIntent[2] = Math.abs(_coordinates(e)[0] - touchIntent[0]), touchIntent[3] = Math.abs(_coordinates(e)[1] - touchIntent[1]), d.overflowed[0]) var limit = mCSB_dragger[0].parent().height() - mCSB_dragger[0].height(),
            prevent = 0 < dragY - y && y - dragY > -limit * d.scrollRatio.y && (2 * touchIntent[3] < touchIntent[2] || "yx" === o.axis);
          if (d.overflowed[1]) var limitX = mCSB_dragger[1].parent().width() - mCSB_dragger[1].width(),
            preventX = 0 < dragX - x && x - dragX > -limitX * d.scrollRatio.x && (2 * touchIntent[2] < touchIntent[3] || "yx" === o.axis);
          prevent || preventX ? (e.preventDefault(), touchDrag = 1) : (docDrag = 1, $this.addClass("mCS_touch_action")), amount = "yx" === o.axis ? [dragY - y, dragX - x] : "x" === o.axis ? [null, dragX - x] : [dragY - y, null], mCSB_container[0].idleTimer = 250, d.overflowed[0] && _drag(amount[0], durA, "mcsLinearOut", "y", "all", !0), d.overflowed[1] && _drag(amount[1], durA, "mcsLinearOut", "x", overwrite, !0)
        }
      }

      function _onTouchstart2(e) {
        if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) touchable = 0;
        else {
          touchable = 1, e.stopImmediatePropagation(), _stop($this), startTime = _getTime();
          var offset = mCustomScrollBox.offset();
          touchStartY = _coordinates(e)[0] - offset.top, touchStartX = _coordinates(e)[1] - offset.left, touchMoveY = [], touchMoveX = []
        }
      }

      function _onTouchend(e) {
        if (_pointerTouch(e) && !touchActive && !_coordinates(e)[2]) {
          e.stopImmediatePropagation(), docDrag = touchDrag = 0, endTime = _getTime();
          var offset = mCustomScrollBox.offset(),
            y = _coordinates(e)[0] - offset.top,
            x = _coordinates(e)[1] - offset.left;
          if (!(30 < endTime - runningTime)) {
            var slow = (speed = 1e3 / (endTime - startTime)) < 2.5,
              diff = slow ? [touchMoveY[touchMoveY.length - 2], touchMoveX[touchMoveX.length - 2]] : [0, 0];
            distance = slow ? [y - diff[0], x - diff[1]] : [y - touchStartY, x - touchStartX];
            var absDistance = [Math.abs(distance[0]), Math.abs(distance[1])];
            speed = slow ? [Math.abs(distance[0] / 4), Math.abs(distance[1] / 4)] : [speed, speed];
            var a = [Math.abs(mCSB_container[0].offsetTop) - distance[0] * _m(absDistance[0] / speed[0], speed[0]), Math.abs(mCSB_container[0].offsetLeft) - distance[1] * _m(absDistance[1] / speed[1], speed[1])];
            amount = "yx" === o.axis ? [a[0], a[1]] : "x" === o.axis ? [null, a[1]] : [a[0], null], durB = [4 * absDistance[0] + o.scrollInertia, 4 * absDistance[1] + o.scrollInertia];
            var md = parseInt(o.contentTouchScroll) || 0;
            amount[0] = md < absDistance[0] ? amount[0] : 0, amount[1] = md < absDistance[1] ? amount[1] : 0, d.overflowed[0] && _drag(amount[0], durB[0], "mcsEaseOut", "y", overwrite, !1), d.overflowed[1] && _drag(amount[1], durB[1], "mcsEaseOut", "x", overwrite, !1)
          }
        }
      }

      function _m(ds, s) {
        var r = [1.5 * s, 2 * s, s / 1.5, s / 2];
        return 90 < ds ? 4 < s ? r[0] : r[3] : 60 < ds ? 3 < s ? r[3] : r[2] : 30 < ds ? 8 < s ? r[1] : 6 < s ? r[0] : 4 < s ? s : r[2] : 8 < s ? s : r[3]
      }

      function _drag(amount, dur, easing, dir, overwrite, drag) {
        amount && _scrollTo($this, amount.toString(), {
          dur: dur,
          scrollEasing: easing,
          dir: dir,
          overwrite: overwrite,
          drag: drag
        })
      }
      mCSB_container.bind(events[0], function(e) {
        _onTouchstart(e)
      }).bind(events[1], function(e) {
        _onTouchmove(e)
      }), mCustomScrollBox.bind(events[0], function(e) {
        _onTouchstart2(e)
      }).bind(events[2], function(e) {
        _onTouchend(e)
      }), iframe.length && iframe.each(function() {
        $(this).load(function() {
          _canAccessIFrame(this) && $(this.contentDocument || this.contentWindow.document).bind(events[0], function(e) {
            _onTouchstart(e), _onTouchstart2(e)
          }).bind(events[1], function(e) {
            _onTouchmove(e)
          }).bind(events[2], function(e) {
            _onTouchend(e)
          })
        })
      })
    }, _selectable = function() {
      var action, $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        seq = d.sequential,
        namespace = "mCS_" + d.idx,
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        wrapper = mCSB_container.parent();

      function _seq(a, c, s) {
        seq.type = s && action ? "stepped" : "stepless", seq.scrollAmount = 10, _sequentialScroll($this, a, c, "mcsLinearOut", s ? 60 : null)
      }
      mCSB_container.bind("mousedown." + namespace, function(e) {
        touchable || action || (action = 1, touchActive = !0)
      }).add(document).bind("mousemove." + namespace, function(e) {
        if (!touchable && action && (window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type && document.selection.createRange().text)) {
          var offset = mCSB_container.offset(),
            y = _coordinates(e)[0] - offset.top + mCSB_container[0].offsetTop,
            x = _coordinates(e)[1] - offset.left + mCSB_container[0].offsetLeft;
          0 < y && y < wrapper.height() && 0 < x && x < wrapper.width() ? seq.step && _seq("off", null, "stepped") : ("x" !== o.axis && d.overflowed[0] && (y < 0 ? _seq("on", 38) : y > wrapper.height() && _seq("on", 40)), "y" !== o.axis && d.overflowed[1] && (x < 0 ? _seq("on", 37) : x > wrapper.width() && _seq("on", 39)))
        }
      }).bind("mouseup." + namespace, function(e) {
        touchable || (action && (action = 0, _seq("off", null)), touchActive = !1)
      })
    }, _mousewheel = function() {
      if ($(this).data("mCS")) {
        var $this = $(this),
          d = $this.data("mCS"),
          o = d.opt,
          namespace = "mCS_" + d.idx,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
          iframe = $("#mCSB_" + d.idx + "_container").find("iframe");
        iframe.length && iframe.each(function() {
          $(this).load(function() {
            _canAccessIFrame(this) && $(this.contentDocument || this.contentWindow.document).bind("mousewheel." + namespace, function(e, delta) {
              _onMousewheel(e, delta)
            })
          })
        }), mCustomScrollBox.bind("mousewheel." + namespace, function(e, delta) {
          _onMousewheel(e, delta)
        })
      }

      function _onMousewheel(e, delta) {
        if (_stop($this), !_disableMousewheel($this, e.target)) {
          var deltaFactor = "auto" !== o.mouseWheel.deltaFactor ? parseInt(o.mouseWheel.deltaFactor) : oldIE && e.deltaFactor < 100 ? 100 : e.deltaFactor || 100;
          if ("x" === o.axis || "x" === o.mouseWheel.axis) var dir = "x",
            px = [Math.round(deltaFactor * d.scrollRatio.x), parseInt(o.mouseWheel.scrollAmount)],
            amount = "auto" !== o.mouseWheel.scrollAmount ? px[1] : px[0] >= mCustomScrollBox.width() ? .9 * mCustomScrollBox.width() : px[0],
            contentPos = Math.abs($("#mCSB_" + d.idx + "_container")[0].offsetLeft),
            draggerPos = mCSB_dragger[1][0].offsetLeft,
            limit = mCSB_dragger[1].parent().width() - mCSB_dragger[1].width(),
            dlt = e.deltaX || e.deltaY || delta;
          else dir = "y", px = [Math.round(deltaFactor * d.scrollRatio.y), parseInt(o.mouseWheel.scrollAmount)], amount = "auto" !== o.mouseWheel.scrollAmount ? px[1] : px[0] >= mCustomScrollBox.height() ? .9 * mCustomScrollBox.height() : px[0], contentPos = Math.abs($("#mCSB_" + d.idx + "_container")[0].offsetTop), draggerPos = mCSB_dragger[0][0].offsetTop, limit = mCSB_dragger[0].parent().height() - mCSB_dragger[0].height(), dlt = e.deltaY || delta;
          "y" === dir && !d.overflowed[0] || "x" === dir && !d.overflowed[1] || ((o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) && (dlt = -dlt), o.mouseWheel.normalizeDelta && (dlt = dlt < 0 ? -1 : 1), (0 < dlt && 0 !== draggerPos || dlt < 0 && draggerPos !== limit || o.mouseWheel.preventDefault) && (e.stopImmediatePropagation(), e.preventDefault()), _scrollTo($this, (contentPos - dlt * amount).toString(), {
            dir: dir
          }))
        }
      }
    }, _canAccessIFrame = function(iframe) {
      var html = null;
      try {
        html = (iframe.contentDocument || iframe.contentWindow.document).body.innerHTML
      } catch (err) {}
      return null !== html
    }, _disableMousewheel = function(el, target) {
      var tag = target.nodeName.toLowerCase(),
        tags = el.data("mCS").opt.mouseWheel.disableOver;
      return -1 < $.inArray(tag, tags) && !(-1 < $.inArray(tag, ["select", "textarea"]) && !$(target).is(":focus"))
    }, _draggerRail = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        namespace = "mCS_" + d.idx,
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        wrapper = mCSB_container.parent();
      $(".mCSB_" + d.idx + "_scrollbar ." + classes[12]).bind("touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, function(e) {
        touchActive = !0
      }).bind("touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace, function(e) {
        touchActive = !1
      }).bind("click." + namespace, function(e) {
        if ($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")) {
          _stop($this);
          var el = $(this),
            mCSB_dragger = el.find(".mCSB_dragger");
          if (0 < el.parent(".mCSB_scrollTools_horizontal").length) {
            if (!d.overflowed[1]) return;
            var dir = "x",
              clickDir = e.pageX > mCSB_dragger.offset().left ? -1 : 1,
              to = Math.abs(mCSB_container[0].offsetLeft) - clickDir * (.9 * wrapper.width())
          } else {
            if (!d.overflowed[0]) return;
            dir = "y", clickDir = e.pageY > mCSB_dragger.offset().top ? -1 : 1, to = Math.abs(mCSB_container[0].offsetTop) - clickDir * (.9 * wrapper.height())
          }
          _scrollTo($this, to.toString(), {
            dir: dir,
            scrollEasing: "mcsEaseInOut"
          })
        }
      })
    }, _focus = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        namespace = "mCS_" + d.idx,
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        wrapper = mCSB_container.parent();
      mCSB_container.bind("focusin." + namespace, function(e) {
        var el = $(document.activeElement),
          nested = mCSB_container.find(".mCustomScrollBox").length;
        el.is(o.advanced.autoScrollOnFocus) && (_stop($this), clearTimeout($this[0]._focusTimeout), $this[0]._focusTimer = nested ? 17 * nested : 0, $this[0]._focusTimeout = setTimeout(function() {
          var to = [_childPos(el)[0], _childPos(el)[1]],
            contentPos = [mCSB_container[0].offsetTop, mCSB_container[0].offsetLeft],
            isVisible = [0 <= contentPos[0] + to[0] && contentPos[0] + to[0] < wrapper.height() - el.outerHeight(!1), 0 <= contentPos[1] + to[1] && contentPos[0] + to[1] < wrapper.width() - el.outerWidth(!1)],
            overwrite = "yx" !== o.axis || isVisible[0] || isVisible[1] ? "all" : "none";
          "x" === o.axis || isVisible[0] || _scrollTo($this, to[0].toString(), {
            dir: "y",
            scrollEasing: "mcsEaseInOut",
            overwrite: overwrite,
            dur: 0
          }), "y" === o.axis || isVisible[1] || _scrollTo($this, to[1].toString(), {
            dir: "x",
            scrollEasing: "mcsEaseInOut",
            overwrite: overwrite,
            dur: 0
          })
        }, $this[0]._focusTimer))
      })
    }, _wrapperScroll = function() {
      var d = $(this).data("mCS"),
        namespace = "mCS_" + d.idx,
        wrapper = $("#mCSB_" + d.idx + "_container").parent();
      wrapper.bind("scroll." + namespace, function(e) {
        0 === wrapper.scrollTop() && 0 === wrapper.scrollLeft() || $(".mCSB_" + d.idx + "_scrollbar").css("visibility", "hidden")
      })
    }, _buttons = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        seq = d.sequential,
        namespace = "mCS_" + d.idx,
        sel = ".mCSB_" + d.idx + "_scrollbar";
      $(sel + ">a").bind("mousedown." + namespace + " touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace + " mouseup." + namespace + " touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace + " mouseout." + namespace + " pointerout." + namespace + " MSPointerOut." + namespace + " click." + namespace, function(e) {
        if (e.preventDefault(), _mouseBtnLeft(e)) {
          var btnClass = $(this).attr("class");
          switch (seq.type = o.scrollButtons.scrollType, e.type) {
            case "mousedown":
            case "touchstart":
            case "pointerdown":
            case "MSPointerDown":
              if ("stepped" === seq.type) return;
              touchActive = !0, d.tweenRunning = !1, _seq("on", btnClass);
              break;
            case "mouseup":
            case "touchend":
            case "pointerup":
            case "MSPointerUp":
            case "mouseout":
            case "pointerout":
            case "MSPointerOut":
              if ("stepped" === seq.type) return;
              touchActive = !1, seq.dir && _seq("off", btnClass);
              break;
            case "click":
              if ("stepped" !== seq.type || d.tweenRunning) return;
              _seq("on", btnClass)
          }
        }

        function _seq(a, c) {
          seq.scrollAmount = o.snapAmount || o.scrollButtons.scrollAmount, _sequentialScroll($this, a, c)
        }
      })
    }, _keyboard = function() {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        seq = d.sequential,
        namespace = "mCS_" + d.idx,
        mCustomScrollBox = $("#mCSB_" + d.idx),
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        wrapper = mCSB_container.parent(),
        editables = "input,textarea,select,datalist,keygen,[contenteditable='true']",
        iframe = mCSB_container.find("iframe"),
        events = ["blur." + namespace + " keydown." + namespace + " keyup." + namespace];

      function _onKeyboard(e) {
        switch (e.type) {
          case "blur":
            d.tweenRunning && seq.dir && _seq("off", null);
            break;
          case "keydown":
          case "keyup":
            var code = e.keyCode ? e.keyCode : e.which,
              action = "on";
            if ("x" !== o.axis && (38 === code || 40 === code) || "y" !== o.axis && (37 === code || 39 === code)) {
              if ((38 === code || 40 === code) && !d.overflowed[0] || (37 === code || 39 === code) && !d.overflowed[1]) return;
              "keyup" === e.type && (action = "off"), $(document.activeElement).is(editables) || (e.preventDefault(), e.stopImmediatePropagation(), _seq(action, code))
            } else if (33 === code || 34 === code) {
              if ((d.overflowed[0] || d.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type) {
                _stop($this);
                var keyboardDir = 34 === code ? -1 : 1;
                if ("x" === o.axis || "yx" === o.axis && d.overflowed[1] && !d.overflowed[0]) var dir = "x",
                  to = Math.abs(mCSB_container[0].offsetLeft) - keyboardDir * (.9 * wrapper.width());
                else dir = "y", to = Math.abs(mCSB_container[0].offsetTop) - keyboardDir * (.9 * wrapper.height());
                _scrollTo($this, to.toString(), {
                  dir: dir,
                  scrollEasing: "mcsEaseInOut"
                })
              }
            } else if ((35 === code || 36 === code) && !$(document.activeElement).is(editables) && ((d.overflowed[0] || d.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type)) {
              if ("x" === o.axis || "yx" === o.axis && d.overflowed[1] && !d.overflowed[0]) dir = "x", to = 35 === code ? Math.abs(wrapper.width() - mCSB_container.outerWidth(!1)) : 0;
              else dir = "y", to = 35 === code ? Math.abs(wrapper.height() - mCSB_container.outerHeight(!1)) : 0;
              _scrollTo($this, to.toString(), {
                dir: dir,
                scrollEasing: "mcsEaseInOut"
              })
            }
        }

        function _seq(a, c) {
          seq.type = o.keyboard.scrollType, seq.scrollAmount = o.snapAmount || o.keyboard.scrollAmount, "stepped" === seq.type && d.tweenRunning || _sequentialScroll($this, a, c)
        }
      }
      iframe.length && iframe.each(function() {
        $(this).load(function() {
          _canAccessIFrame(this) && $(this.contentDocument || this.contentWindow.document).bind(events[0], function(e) {
            _onKeyboard(e)
          })
        })
      }), mCustomScrollBox.attr("tabindex", "0").bind(events[0], function(e) {
        _onKeyboard(e)
      })
    }, _sequentialScroll = function(el, action, trigger, e, s) {
      var d = el.data("mCS"),
        o = d.opt,
        seq = d.sequential,
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        once = "stepped" === seq.type,
        steplessSpeed = o.scrollInertia < 26 ? 26 : o.scrollInertia,
        steppedSpeed = o.scrollInertia < 1 ? 17 : o.scrollInertia;
      switch (action) {
        case "on":
          if (seq.dir = [trigger === classes[16] || trigger === classes[15] || 39 === trigger || 37 === trigger ? "x" : "y", trigger === classes[13] || trigger === classes[15] || 38 === trigger || 37 === trigger ? -1 : 1], _stop(el), _isNumeric(trigger) && "stepped" === seq.type) return;
          _on(once);
          break;
        case "off":
          clearTimeout(seq.step), _delete(seq, "step"), _stop(el), (once || d.tweenRunning && seq.dir) && _on(!0)
      }

      function _on(once) {
        var c = "stepped" !== seq.type,
          t = s || (once ? c ? steplessSpeed / 1.5 : steppedSpeed : 1e3 / 60),
          m = once ? c ? 7.5 : 40 : 2.5,
          contentPos = [Math.abs(mCSB_container[0].offsetTop), Math.abs(mCSB_container[0].offsetLeft)],
          ratio = [10 < d.scrollRatio.y ? 10 : d.scrollRatio.y, 10 < d.scrollRatio.x ? 10 : d.scrollRatio.x],
          amount = "x" === seq.dir[0] ? contentPos[1] + seq.dir[1] * (ratio[1] * m) : contentPos[0] + seq.dir[1] * (ratio[0] * m),
          px = "x" === seq.dir[0] ? contentPos[1] + seq.dir[1] * parseInt(seq.scrollAmount) : contentPos[0] + seq.dir[1] * parseInt(seq.scrollAmount),
          to = "auto" !== seq.scrollAmount ? px : amount,
          easing = e || (once ? c ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"),
          onComplete = !!once;
        once && t < 17 && (to = "x" === seq.dir[0] ? contentPos[1] : contentPos[0]), _scrollTo(el, to.toString(), {
          dir: seq.dir[0],
          scrollEasing: easing,
          dur: t,
          onComplete: onComplete
        }), once ? seq.dir = !1 : (clearTimeout(seq.step), seq.step = setTimeout(function() {
          _on()
        }, t))
      }
    }, _arr = function(val) {
      var o = $(this).data("mCS").opt,
        vals = [];
      return "function" == typeof val && (val = val()), val instanceof Array ? vals = 1 < val.length ? [val[0], val[1]] : "x" === o.axis ? [null, val[0]] : [val[0], null] : (vals[0] = val.y ? val.y : val.x || "x" === o.axis ? null : val, vals[1] = val.x ? val.x : val.y || "y" === o.axis ? null : val), "function" == typeof vals[0] && (vals[0] = vals[0]()), "function" == typeof vals[1] && (vals[1] = vals[1]()), vals
    }, _to = function(val, dir) {
      if (null != val && void 0 !== val) {
        var $this = $(this),
          d = $this.data("mCS"),
          o = d.opt,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          t = typeof val,
          contentLength = "x" === (dir = dir || ("x" === o.axis ? "x" : "y")) ? mCSB_container.outerWidth(!1) : mCSB_container.outerHeight(!1),
          contentPos = "x" === dir ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
          cssProp = "x" === dir ? "left" : "top";
        switch (t) {
          case "function":
            return val();
          case "object":
            if (!(obj = val.jquery ? val : $(val)).length) return;
            return "x" === dir ? _childPos(obj)[1] : _childPos(obj)[0];
          case "string":
          case "number":
            if (_isNumeric(val)) return Math.abs(val);
            if (-1 !== val.indexOf("%")) return Math.abs(contentLength * parseInt(val) / 100);
            if (-1 !== val.indexOf("-=")) return Math.abs(contentPos - parseInt(val.split("-=")[1]));
            if (-1 !== val.indexOf("+=")) {
              var p = contentPos + parseInt(val.split("+=")[1]);
              return 0 <= p ? 0 : Math.abs(p)
            }
            if (-1 !== val.indexOf("px") && _isNumeric(val.split("px")[0])) return Math.abs(val.split("px")[0]);
            if ("top" === val || "left" === val) return 0;
            if ("bottom" === val) return Math.abs(wrapper.height() - mCSB_container.outerHeight(!1));
            if ("right" === val) return Math.abs(wrapper.width() - mCSB_container.outerWidth(!1));
            if ("first" !== val && "last" !== val) return $(val).length ? "x" === dir ? _childPos($(val))[1] : _childPos($(val))[0] : (mCSB_container.css(cssProp, val), void methods.update.call(null, $this[0]));
            var obj = mCSB_container.find(":" + val);
            return "x" === dir ? _childPos(obj)[1] : _childPos(obj)[0]
        }
      }
    }, _autoUpdate = function(rem) {
      var $this = $(this),
        d = $this.data("mCS"),
        o = d.opt,
        mCSB_container = $("#mCSB_" + d.idx + "_container");
      if (rem) return clearTimeout(mCSB_container[0].autoUpdate), void _delete(mCSB_container[0], "autoUpdate");
      var newSelSize, ns, newImgsLen, wrapper = mCSB_container.parent(),
        scrollbar = [$("#mCSB_" + d.idx + "_scrollbar_vertical"), $("#mCSB_" + d.idx + "_scrollbar_horizontal")],
        scrollbarSize = function() {
          return [scrollbar[0].is(":visible") ? scrollbar[0].outerHeight(!0) : 0, scrollbar[1].is(":visible") ? scrollbar[1].outerWidth(!0) : 0]
        },
        oldSelSize = sizesSum(),
        os = [mCSB_container.outerHeight(!1), mCSB_container.outerWidth(!1), wrapper.height(), wrapper.width(), scrollbarSize()[0], scrollbarSize()[1]],
        oldImgsLen = imgSum();

      function imgSum() {
        var total = 0;
        return o.advanced.updateOnImageLoad && (total = mCSB_container.find("img").length), total
      }

      function imgLoader(el) {
        if ($(el).hasClass(classes[2])) doUpd();
        else {
          var contextObject, delegateMethod, img = new Image;
          img.onload = (contextObject = img, delegateMethod = function() {
            this.onload = null, $(el).addClass(classes[2]), doUpd(2)
          }, function() {
            return delegateMethod.apply(contextObject, arguments)
          }), img.src = el.src
        }
      }

      function sizesSum() {
        !0 === o.advanced.updateOnSelectorChange && (o.advanced.updateOnSelectorChange = "*");
        var total = 0,
          sel = mCSB_container.find(o.advanced.updateOnSelectorChange);
        return o.advanced.updateOnSelectorChange && 0 < sel.length && sel.each(function() {
          total += $(this).height() + $(this).width()
        }), total
      }

      function doUpd(cb) {
        clearTimeout(mCSB_container[0].autoUpdate), methods.update.call(null, $this[0], cb)
      }! function upd() {
        clearTimeout(mCSB_container[0].autoUpdate);
        if (0 === $this.parents("html").length) return void($this = null);
        mCSB_container[0].autoUpdate = setTimeout(function() {
          if (o.advanced.updateOnSelectorChange && (newSelSize = sizesSum()) !== oldSelSize) return doUpd(3), void(oldSelSize = newSelSize);
          o.advanced.updateOnContentResize && ((ns = [mCSB_container.outerHeight(!1), mCSB_container.outerWidth(!1), wrapper.height(), wrapper.width(), scrollbarSize()[0], scrollbarSize()[1]])[0] === os[0] && ns[1] === os[1] && ns[2] === os[2] && ns[3] === os[3] && ns[4] === os[4] && ns[5] === os[5] || (doUpd(ns[0] !== os[0] || ns[1] !== os[1]), os = ns)), o.advanced.updateOnImageLoad && (newImgsLen = imgSum()) !== oldImgsLen && (mCSB_container.find("img").each(function() {
            imgLoader(this)
          }), oldImgsLen = newImgsLen), (o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad) && upd()
        }, o.advanced.autoUpdateTimeout)
      }()
    }, _stop = function(el) {
      var d = el.data("mCS");
      $("#mCSB_" + d.idx + "_container,#mCSB_" + d.idx + "_container_wrapper,#mCSB_" + d.idx + "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal").each(function() {
        _stopTween.call(this)
      })
    }, _scrollTo = function(el, to, options) {
      var d = el.data("mCS"),
        o = d.opt,
        defaults = {
          trigger: "internal",
          dir: "y",
          scrollEasing: "mcsEaseOut",
          drag: !1,
          dur: o.scrollInertia,
          overwrite: "all",
          callbacks: !0,
          onStart: !0,
          onUpdate: !0,
          onComplete: !0
        },
        dur = [(options = $.extend(defaults, options)).dur, options.drag ? 0 : options.dur],
        mCustomScrollBox = $("#mCSB_" + d.idx),
        mCSB_container = $("#mCSB_" + d.idx + "_container"),
        wrapper = mCSB_container.parent(),
        totalScrollOffsets = o.callbacks.onTotalScrollOffset ? _arr.call(el, o.callbacks.onTotalScrollOffset) : [0, 0],
        totalScrollBackOffsets = o.callbacks.onTotalScrollBackOffset ? _arr.call(el, o.callbacks.onTotalScrollBackOffset) : [0, 0];
      if (d.trigger = options.trigger, 0 === wrapper.scrollTop() && 0 === wrapper.scrollLeft() || ($(".mCSB_" + d.idx + "_scrollbar").css("visibility", "visible"), wrapper.scrollTop(0).scrollLeft(0)), "_resetY" !== to || d.contentReset.y || (_cb("onOverflowYNone") && o.callbacks.onOverflowYNone.call(el[0]), d.contentReset.y = 1), "_resetX" !== to || d.contentReset.x || (_cb("onOverflowXNone") && o.callbacks.onOverflowXNone.call(el[0]), d.contentReset.x = 1), "_resetY" !== to && "_resetX" !== to) {
        switch (!d.contentReset.y && el[0].mcs || !d.overflowed[0] || (_cb("onOverflowY") && o.callbacks.onOverflowY.call(el[0]), d.contentReset.x = null), !d.contentReset.x && el[0].mcs || !d.overflowed[1] || (_cb("onOverflowX") && o.callbacks.onOverflowX.call(el[0]), d.contentReset.x = null), o.snapAmount && (to = function(to, amount, offset) {
          return Math.round(to / amount) * amount - offset
        }(to, o.snapAmount, o.snapOffset)), options.dir) {
          case "x":
            var mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_horizontal"),
              property = "left",
              contentPos = mCSB_container[0].offsetLeft,
              limit = [mCustomScrollBox.width() - mCSB_container.outerWidth(!1), mCSB_dragger.parent().width() - mCSB_dragger.width()],
              scrollTo = [to, 0 === to ? 0 : to / d.scrollRatio.x],
              tso = totalScrollOffsets[1],
              tsbo = totalScrollBackOffsets[1],
              totalScrollOffset = 0 < tso ? tso / d.scrollRatio.x : 0,
              totalScrollBackOffset = 0 < tsbo ? tsbo / d.scrollRatio.x : 0;
            break;
          case "y":
            mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_vertical"), property = "top", contentPos = mCSB_container[0].offsetTop, limit = [mCustomScrollBox.height() - mCSB_container.outerHeight(!1), mCSB_dragger.parent().height() - mCSB_dragger.height()], scrollTo = [to, 0 === to ? 0 : to / d.scrollRatio.y], tso = totalScrollOffsets[0], tsbo = totalScrollBackOffsets[0], totalScrollOffset = 0 < tso ? tso / d.scrollRatio.y : 0, totalScrollBackOffset = 0 < tsbo ? tsbo / d.scrollRatio.y : 0
        }
        scrollTo[1] < 0 || 0 === scrollTo[0] && 0 === scrollTo[1] ? scrollTo = [0, 0] : scrollTo[1] >= limit[1] ? scrollTo = [limit[0], limit[1]] : scrollTo[0] = -scrollTo[0], el[0].mcs || (_mcs(), _cb("onInit") && o.callbacks.onInit.call(el[0])), clearTimeout(mCSB_container[0].onCompleteTimeout), !d.tweenRunning && (0 === contentPos && 0 <= scrollTo[0] || contentPos === limit[0] && scrollTo[0] <= limit[0]) || (_tweenTo(mCSB_dragger[0], property, Math.round(scrollTo[1]), dur[1], options.scrollEasing), _tweenTo(mCSB_container[0], property, Math.round(scrollTo[0]), dur[0], options.scrollEasing, options.overwrite, {
          onStart: function() {
            options.callbacks && options.onStart && !d.tweenRunning && (_cb("onScrollStart") && (_mcs(), o.callbacks.onScrollStart.call(el[0])), d.tweenRunning = !0, _onDragClasses(mCSB_dragger), d.cbOffsets = [o.callbacks.alwaysTriggerOffsets || contentPos >= limit[0] + tso, o.callbacks.alwaysTriggerOffsets || contentPos <= -tsbo])
          },
          onUpdate: function() {
            options.callbacks && options.onUpdate && _cb("whileScrolling") && (_mcs(), o.callbacks.whileScrolling.call(el[0]))
          },
          onComplete: function() {
            if (options.callbacks && options.onComplete) {
              "yx" === o.axis && clearTimeout(mCSB_container[0].onCompleteTimeout);
              var t = mCSB_container[0].idleTimer || 0;
              mCSB_container[0].onCompleteTimeout = setTimeout(function() {
                _cb("onScroll") && (_mcs(), o.callbacks.onScroll.call(el[0])), _cb("onTotalScroll") && scrollTo[1] >= limit[1] - totalScrollOffset && d.cbOffsets[0] && (_mcs(), o.callbacks.onTotalScroll.call(el[0])), _cb("onTotalScrollBack") && scrollTo[1] <= totalScrollBackOffset && d.cbOffsets[1] && (_mcs(), o.callbacks.onTotalScrollBack.call(el[0])), d.tweenRunning = !1, mCSB_container[0].idleTimer = 0, _onDragClasses(mCSB_dragger, "hide")
              }, t)
            }
          }
        }))
      }

      function _cb(cb) {
        return d && o.callbacks[cb] && "function" == typeof o.callbacks[cb]
      }

      function _mcs() {
        var cp = [mCSB_container[0].offsetTop, mCSB_container[0].offsetLeft],
          dp = [mCSB_dragger[0].offsetTop, mCSB_dragger[0].offsetLeft],
          cl = [mCSB_container.outerHeight(!1), mCSB_container.outerWidth(!1)],
          pl = [mCustomScrollBox.height(), mCustomScrollBox.width()];
        el[0].mcs = {
          content: mCSB_container,
          top: cp[0],
          left: cp[1],
          draggerTop: dp[0],
          draggerLeft: dp[1],
          topPct: Math.round(100 * Math.abs(cp[0]) / (Math.abs(cl[0]) - pl[0])),
          leftPct: Math.round(100 * Math.abs(cp[1]) / (Math.abs(cl[1]) - pl[1])),
          direction: options.dir
        }
      }
    }, _tweenTo = function(el, prop, to, duration, easing, overwrite, callbacks) {
      el._mTween || (el._mTween = {
        top: {},
        left: {}
      });
      var _delay, _request, onStart = (callbacks = callbacks || {}).onStart || function() {},
        onUpdate = callbacks.onUpdate || function() {},
        onComplete = callbacks.onComplete || function() {},
        startTime = _getTime(),
        progress = 0,
        from = el.offsetTop,
        elStyle = el.style,
        tobj = el._mTween[prop];
      "left" === prop && (from = el.offsetLeft);
      var diff = to - from;

      function _step() {
        tobj.stop || (progress || onStart.call(), progress = _getTime() - startTime, _tween(), progress >= tobj.time && (tobj.time = progress > tobj.time ? progress + _delay - (progress - tobj.time) : progress + _delay - 1, tobj.time < progress + 1 && (tobj.time = progress + 1)), tobj.time < duration ? tobj.id = _request(_step) : onComplete.call())
      }

      function _tween() {
        0 < duration ? (tobj.currVal = function(t, b, c, d, type) {
          switch (type) {
            case "linear":
            case "mcsLinear":
              return c * t / d + b;
            case "mcsLinearOut":
              return t /= d, t--, c * Math.sqrt(1 - t * t) + b;
            case "easeInOutSmooth":
              return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b;
            case "easeInOutStrong":
              return (t /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (t - 1)) + b : (t--, c / 2 * (2 - Math.pow(2, -10 * t)) + b);
            case "easeInOut":
            case "mcsEaseInOut":
              return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
            case "easeOutSmooth":
              return t /= d, -c * (--t * t * t * t - 1) + b;
            case "easeOutStrong":
              return c * (1 - Math.pow(2, -10 * t / d)) + b;
            case "easeOut":
            case "mcsEaseOut":
            default:
              var ts = (t /= d) * t,
                tc = ts * t;
              return b + c * (.499999999999997 * tc * ts + -2.5 * ts * ts + 5.5 * tc + -6.5 * ts + 4 * t)
          }
        }(tobj.time, from, diff, duration, easing), elStyle[prop] = Math.round(tobj.currVal) + "px") : elStyle[prop] = to + "px", onUpdate.call()
      }
      tobj.stop = 0, "none" !== overwrite && function() {
        if (null == tobj.id) return;
        window.requestAnimationFrame ? window.cancelAnimationFrame(tobj.id) : clearTimeout(tobj.id);
        tobj.id = null
      }(), _delay = 1e3 / 60, tobj.time = progress + _delay, _request = window.requestAnimationFrame ? window.requestAnimationFrame : function(f) {
        return _tween(), setTimeout(f, .01)
      }, tobj.id = _request(_step)
    }, _getTime = function() {
      return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
    }, _stopTween = function() {
      var el = this;
      el._mTween || (el._mTween = {
        top: {},
        left: {}
      });
      for (var props = ["top", "left"], i = 0; i < props.length; i++) {
        var prop = props[i];
        el._mTween[prop].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(el._mTween[prop].id) : clearTimeout(el._mTween[prop].id), el._mTween[prop].id = null, el._mTween[prop].stop = 1)
      }
    }, _delete = function(c, m) {
      try {
        delete c[m]
      } catch (e) {
        c[m] = null
      }
    }, _mouseBtnLeft = function(e) {
      return !(e.which && 1 !== e.which)
    }, _pointerTouch = function(e) {
      var t = e.originalEvent.pointerType;
      return !(t && "touch" !== t && 2 !== t)
    }, _isNumeric = function(val) {
      return !isNaN(parseFloat(val)) && isFinite(val)
    }, _childPos = function(el) {
      var p = el.parents(".mCSB_container");
      return [el.offset().top - p.offset().top, el.offset().left - p.offset().left]
    }, $.fn[pluginNS] = function(method) {
      return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist") : methods.init.apply(this, arguments)
    }, $[pluginNS] = function(method) {
      return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist") : methods.init.apply(this, arguments)
    }, $[pluginNS].defaults = defaults, window[pluginNS] = !0, $(window).load(function() {
      $(".mCustomScrollbar")[pluginNS](), $.extend($.expr[":"], {
        mcsInView: $.expr[":"].mcsInView || function(el) {
          var wrapper, cPos, $el = $(el),
            content = $el.parents(".mCSB_container");
          if (content.length) return wrapper = content.parent(), 0 <= (cPos = [content[0].offsetTop, content[0].offsetLeft])[0] + _childPos($el)[0] && cPos[0] + _childPos($el)[0] < wrapper.height() - $el.outerHeight(!1) && 0 <= cPos[1] + _childPos($el)[1] && cPos[1] + _childPos($el)[1] < wrapper.width() - $el.outerWidth(!1)
        },
        mcsOverflow: $.expr[":"].mcsOverflow || function(el) {
          var d = $(el).data("mCS");
          if (d) return d.overflowed[0] || d.overflowed[1]
        }
      })
    })
  }),
  function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? module.exports = factory : factory(jQuery)
  }(function($) {
    var nullLowestDeltaTimeout, lowestDelta, toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      toBind = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      slice = Array.prototype.slice;
    if ($.event.fixHooks)
      for (var i = toFix.length; i;) $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
    var special = $.event.special.mousewheel = {
      version: "3.1.12",
      setup: function() {
        if (this.addEventListener)
          for (var i = toBind.length; i;) this.addEventListener(toBind[--i], handler, !1);
        else this.onmousewheel = handler;
        $.data(this, "mousewheel-line-height", special.getLineHeight(this)), $.data(this, "mousewheel-page-height", special.getPageHeight(this))
      },
      teardown: function() {
        if (this.removeEventListener)
          for (var i = toBind.length; i;) this.removeEventListener(toBind[--i], handler, !1);
        else this.onmousewheel = null;
        $.removeData(this, "mousewheel-line-height"), $.removeData(this, "mousewheel-page-height")
      },
      getLineHeight: function(elem) {
        var $elem = $(elem),
          $parent = $elem["offsetParent" in $.fn ? "offsetParent" : "parent"]();
        return $parent.length || ($parent = $("body")), parseInt($parent.css("fontSize"), 10) || parseInt($elem.css("fontSize"), 10) || 16
      },
      getPageHeight: function(elem) {
        return $(elem).height()
      },
      settings: {
        adjustOldDeltas: !0,
        normalizeOffset: !0
      }
    };

    function handler(event) {
      var absDelta, orgEvent = event || window.event,
        args = slice.call(arguments, 1),
        delta = 0,
        deltaX = 0,
        deltaY = 0,
        offsetX = 0,
        offsetY = 0;
      if ((event = $.event.fix(orgEvent)).type = "mousewheel", "detail" in orgEvent && (deltaY = -1 * orgEvent.detail), "wheelDelta" in orgEvent && (deltaY = orgEvent.wheelDelta), "wheelDeltaY" in orgEvent && (deltaY = orgEvent.wheelDeltaY), "wheelDeltaX" in orgEvent && (deltaX = -1 * orgEvent.wheelDeltaX), "axis" in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS && (deltaX = -1 * deltaY, deltaY = 0), delta = 0 === deltaY ? deltaX : deltaY, "deltaY" in orgEvent && (delta = deltaY = -1 * orgEvent.deltaY), "deltaX" in orgEvent && (deltaX = orgEvent.deltaX, 0 === deltaY && (delta = -1 * deltaX)), 0 !== deltaY || 0 !== deltaX) {
        if (1 === orgEvent.deltaMode) {
          var lineHeight = $.data(this, "mousewheel-line-height");
          delta *= lineHeight, deltaY *= lineHeight, deltaX *= lineHeight
        } else if (2 === orgEvent.deltaMode) {
          var pageHeight = $.data(this, "mousewheel-page-height");
          delta *= pageHeight, deltaY *= pageHeight, deltaX *= pageHeight
        }
        if (absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX)), (!lowestDelta || absDelta < lowestDelta) && shouldAdjustOldDeltas(orgEvent, lowestDelta = absDelta) && (lowestDelta /= 40), shouldAdjustOldDeltas(orgEvent, absDelta) && (delta /= 40, deltaX /= 40, deltaY /= 40), delta = Math[1 <= delta ? "floor" : "ceil"](delta / lowestDelta), deltaX = Math[1 <= deltaX ? "floor" : "ceil"](deltaX / lowestDelta), deltaY = Math[1 <= deltaY ? "floor" : "ceil"](deltaY / lowestDelta), special.settings.normalizeOffset && this.getBoundingClientRect) {
          var boundingRect = this.getBoundingClientRect();
          offsetX = event.clientX - boundingRect.left, offsetY = event.clientY - boundingRect.top
        }
        return event.deltaX = deltaX, event.deltaY = deltaY, event.deltaFactor = lowestDelta, event.offsetX = offsetX, event.offsetY = offsetY, event.deltaMode = 0, args.unshift(event, delta, deltaX, deltaY), nullLowestDeltaTimeout && clearTimeout(nullLowestDeltaTimeout), nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200), ($.event.dispatch || $.event.handle).apply(this, args)
      }
    }

    function nullLowestDelta() {
      lowestDelta = null
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
      return special.settings.adjustOldDeltas && "mousewheel" === orgEvent.type && absDelta % 120 == 0
    }
    $.fn.extend({
      mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
      },
      unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn)
      }
    })
  }),
  function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? factory(require("jquery")) : factory(window.jQuery || window.Zepto)
  }(function($) {
    function MagnificPopup() {}

    function _mfpOn(name, f) {
      mfp.ev.on("mfp" + name + ".mfp", f)
    }

    function _getEl(className, appendTo, html, raw) {
      var el = document.createElement("div");
      return el.className = "mfp-" + className, html && (el.innerHTML = html), raw ? appendTo && appendTo.appendChild(el) : (el = $(el), appendTo && el.appendTo(appendTo)), el
    }

    function _mfpTrigger(e, data) {
      mfp.ev.triggerHandler("mfp" + e, data), mfp.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), mfp.st.callbacks[e] && mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]))
    }

    function _getCloseBtn(type) {
      return type === _currPopupType && mfp.currTemplate.closeBtn || (mfp.currTemplate.closeBtn = $(mfp.st.closeMarkup.replace("%title%", mfp.st.tClose)), _currPopupType = type), mfp.currTemplate.closeBtn
    }

    function _checkInstance() {
      $.magnificPopup.instance || ((mfp = new MagnificPopup).init(), $.magnificPopup.instance = mfp)
    }
    var mfp, _prevStatus, _document, _prevContentType, _wrapClasses, _currPopupType, _isJQ = !!window.jQuery,
      _window = $(window);
    MagnificPopup.prototype = {
      constructor: MagnificPopup,
      init: function() {
        var appVersion = navigator.appVersion;
        mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener, mfp.isAndroid = /android/gi.test(appVersion), mfp.isIOS = /iphone|ipad|ipod/gi.test(appVersion), mfp.supportsTransition = function() {
          var s = document.createElement("p").style,
            v = ["ms", "O", "Moz", "Webkit"];
          if (void 0 !== s.transition) return !0;
          for (; v.length;)
            if (v.pop() + "Transition" in s) return !0;
          return !1
        }(), mfp.probablyMobile = mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), _document = $(document), mfp.popupsCache = {}
      },
      open: function(data) {
        var i;
        if (!1 === data.isObj) {
          mfp.items = data.items.toArray(), mfp.index = 0;
          var item, items = data.items;
          for (i = 0; i < items.length; i++)
            if ((item = items[i]).parsed && (item = item.el[0]), item === data.el[0]) {
              mfp.index = i;
              break
            }
        } else mfp.items = $.isArray(data.items) ? data.items : [data.items], mfp.index = data.index || 0;
        if (!mfp.isOpen) {
          mfp.types = [], _wrapClasses = "", data.mainEl && data.mainEl.length ? mfp.ev = data.mainEl.eq(0) : mfp.ev = _document, data.key ? (mfp.popupsCache[data.key] || (mfp.popupsCache[data.key] = {}), mfp.currTemplate = mfp.popupsCache[data.key]) : mfp.currTemplate = {}, mfp.st = $.extend(!0, {}, $.magnificPopup.defaults, data), mfp.fixedContentPos = "auto" === mfp.st.fixedContentPos ? !mfp.probablyMobile : mfp.st.fixedContentPos, mfp.st.modal && (mfp.st.closeOnContentClick = !1, mfp.st.closeOnBgClick = !1, mfp.st.showCloseBtn = !1, mfp.st.enableEscapeKey = !1), mfp.bgOverlay || (mfp.bgOverlay = _getEl("bg").on("click.mfp", function() {
            mfp.close()
          }), mfp.wrap = _getEl("wrap").attr("tabindex", -1).on("click.mfp", function(e) {
            mfp._checkIfClose(e.target) && mfp.close()
          }), mfp.container = _getEl("container", mfp.wrap)), mfp.contentContainer = _getEl("content"), mfp.st.preloader && (mfp.preloader = _getEl("preloader", mfp.container, mfp.st.tLoading));
          var modules = $.magnificPopup.modules;
          for (i = 0; i < modules.length; i++) {
            var n = modules[i];
            n = n.charAt(0).toUpperCase() + n.slice(1), mfp["init" + n].call(mfp)
          }
          _mfpTrigger("BeforeOpen"), mfp.st.showCloseBtn && (mfp.st.closeBtnInside ? (_mfpOn("MarkupParse", function(e, template, values, item) {
            values.close_replaceWith = _getCloseBtn(item.type)
          }), _wrapClasses += " mfp-close-btn-in") : mfp.wrap.append(_getCloseBtn())), mfp.st.alignTop && (_wrapClasses += " mfp-align-top"), mfp.fixedContentPos ? mfp.wrap.css({
            overflow: mfp.st.overflowY,
            overflowX: "hidden",
            overflowY: mfp.st.overflowY
          }) : mfp.wrap.css({
            top: _window.scrollTop(),
            position: "absolute"
          }), !1 !== mfp.st.fixedBgPos && ("auto" !== mfp.st.fixedBgPos || mfp.fixedContentPos) || mfp.bgOverlay.css({
            height: _document.height(),
            position: "absolute"
          }), mfp.st.enableEscapeKey && _document.on("keyup.mfp", function(e) {
            27 === e.keyCode && mfp.close()
          }), _window.on("resize.mfp", function() {
            mfp.updateSize()
          }), mfp.st.closeOnContentClick || (_wrapClasses += " mfp-auto-cursor"), _wrapClasses && mfp.wrap.addClass(_wrapClasses);
          var windowHeight = mfp.wH = _window.height(),
            windowStyles = {};
          if (mfp.fixedContentPos && mfp._hasScrollBar(windowHeight)) {
            var s = mfp._getScrollbarSize();
            s && (windowStyles.marginRight = s)
          }
          mfp.fixedContentPos && (mfp.isIE7 ? $("body, html").css("overflow", "hidden") : windowStyles.overflow = "hidden");
          var classesToadd = mfp.st.mainClass;
          return mfp.isIE7 && (classesToadd += " mfp-ie7"), classesToadd && mfp._addClassToMFP(classesToadd), mfp.updateItemHTML(), _mfpTrigger("BuildControls"), $("html").css(windowStyles), mfp.bgOverlay.add(mfp.wrap).prependTo(mfp.st.prependTo || $(document.body)), mfp._lastFocusedEl = document.activeElement, setTimeout(function() {
            mfp.content ? (mfp._addClassToMFP("mfp-ready"), mfp._setFocus()) : mfp.bgOverlay.addClass("mfp-ready"), _document.on("focusin.mfp", mfp._onFocusIn)
          }, 16), mfp.isOpen = !0, mfp.updateSize(windowHeight), _mfpTrigger("Open"), data
        }
        mfp.updateItemHTML()
      },
      close: function() {
        mfp.isOpen && (_mfpTrigger("BeforeClose"), mfp.isOpen = !1, mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition ? (mfp._addClassToMFP("mfp-removing"), setTimeout(function() {
          mfp._close()
        }, mfp.st.removalDelay)) : mfp._close())
      },
      _close: function() {
        _mfpTrigger("Close");
        var classesToRemove = "mfp-removing mfp-ready ";
        if (mfp.bgOverlay.detach(), mfp.wrap.detach(), mfp.container.empty(), mfp.st.mainClass && (classesToRemove += mfp.st.mainClass + " "), mfp._removeClassFromMFP(classesToRemove), mfp.fixedContentPos) {
          var windowStyles = {
            marginRight: ""
          };
          mfp.isIE7 ? $("body, html").css("overflow", "") : windowStyles.overflow = "", $("html").css(windowStyles)
        }
        _document.off("keyup.mfp focusin.mfp"), mfp.ev.off(".mfp"), mfp.wrap.attr("class", "mfp-wrap").removeAttr("style"), mfp.bgOverlay.attr("class", "mfp-bg"), mfp.container.attr("class", "mfp-container"), !mfp.st.showCloseBtn || mfp.st.closeBtnInside && !0 !== mfp.currTemplate[mfp.currItem.type] || mfp.currTemplate.closeBtn && mfp.currTemplate.closeBtn.detach(), mfp.st.autoFocusLast && mfp._lastFocusedEl && $(mfp._lastFocusedEl).focus(), mfp.currItem = null, mfp.content = null, mfp.currTemplate = null, mfp.prevHeight = 0, _mfpTrigger("AfterClose")
      },
      updateSize: function(winHeight) {
        if (mfp.isIOS) {
          var zoomLevel = document.documentElement.clientWidth / window.innerWidth,
            height = window.innerHeight * zoomLevel;
          mfp.wrap.css("height", height), mfp.wH = height
        } else mfp.wH = winHeight || _window.height();
        mfp.fixedContentPos || mfp.wrap.css("height", mfp.wH), _mfpTrigger("Resize")
      },
      updateItemHTML: function() {
        var item = mfp.items[mfp.index];
        mfp.contentContainer.detach(), mfp.content && mfp.content.detach(), item.parsed || (item = mfp.parseEl(mfp.index));
        var type = item.type;
        if (_mfpTrigger("BeforeChange", [mfp.currItem ? mfp.currItem.type : "", type]), mfp.currItem = item, !mfp.currTemplate[type]) {
          var markup = !!mfp.st[type] && mfp.st[type].markup;
          _mfpTrigger("FirstMarkupParse", markup), mfp.currTemplate[type] = !markup || $(markup)
        }
        _prevContentType && _prevContentType !== item.type && mfp.container.removeClass("mfp-" + _prevContentType + "-holder");
        var newContent = mfp["get" + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
        mfp.appendContent(newContent, type), item.preloaded = !0, _mfpTrigger("Change", item), _prevContentType = item.type, mfp.container.prepend(mfp.contentContainer), _mfpTrigger("AfterChange")
      },
      appendContent: function(newContent, type) {
        (mfp.content = newContent) ? mfp.st.showCloseBtn && mfp.st.closeBtnInside && !0 === mfp.currTemplate[type] ? mfp.content.find(".mfp-close").length || mfp.content.append(_getCloseBtn()) : mfp.content = newContent: mfp.content = "", _mfpTrigger("BeforeAppend"), mfp.container.addClass("mfp-" + type + "-holder"), mfp.contentContainer.append(mfp.content)
      },
      parseEl: function(index) {
        var type, item = mfp.items[index];
        if ((item = item.tagName ? {
            el: $(item)
          } : (type = item.type, {
            data: item,
            src: item.src
          })).el) {
          for (var types = mfp.types, i = 0; i < types.length; i++)
            if (item.el.hasClass("mfp-" + types[i])) {
              type = types[i];
              break
            } item.src = item.el.attr("data-mfp-src"), item.src || (item.src = item.el.attr("href"))
        }
        return item.type = type || mfp.st.type || "inline", item.index = index, item.parsed = !0, mfp.items[index] = item, _mfpTrigger("ElementParse", item), mfp.items[index]
      },
      addGroup: function(el, options) {
        function eHandler(e) {
          e.mfpEl = this, mfp._openClick(e, el, options)
        }
        var eName = "click.magnificPopup";
        (options = options || {}).mainEl = el, options.items ? (options.isObj = !0, el.off(eName).on(eName, eHandler)) : (options.isObj = !1, options.delegate ? el.off(eName).on(eName, options.delegate, eHandler) : (options.items = el).off(eName).on(eName, eHandler))
      },
      _openClick: function(e, el, options) {
        if ((void 0 !== options.midClick ? options.midClick : $.magnificPopup.defaults.midClick) || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
          var disableOn = void 0 !== options.disableOn ? options.disableOn : $.magnificPopup.defaults.disableOn;
          if (disableOn)
            if ($.isFunction(disableOn)) {
              if (!disableOn.call(mfp)) return !0
            } else if (_window.width() < disableOn) return !0;
          e.type && (e.preventDefault(), mfp.isOpen && e.stopPropagation()), options.el = $(e.mfpEl), options.delegate && (options.items = el.find(options.delegate)), mfp.open(options)
        }
      },
      updateStatus: function(status, text) {
        if (mfp.preloader) {
          _prevStatus !== status && mfp.container.removeClass("mfp-s-" + _prevStatus), text || "loading" !== status || (text = mfp.st.tLoading);
          var data = {
            status: status,
            text: text
          };
          _mfpTrigger("UpdateStatus", data), status = data.status, text = data.text, mfp.preloader.html(text), mfp.preloader.find("a").on("click", function(e) {
            e.stopImmediatePropagation()
          }), mfp.container.addClass("mfp-s-" + status), _prevStatus = status
        }
      },
      _checkIfClose: function(target) {
        if (!$(target).hasClass("mfp-prevent-close")) {
          var closeOnContent = mfp.st.closeOnContentClick,
            closeOnBg = mfp.st.closeOnBgClick;
          if (closeOnContent && closeOnBg) return !0;
          if (!mfp.content || $(target).hasClass("mfp-close") || mfp.preloader && target === mfp.preloader[0]) return !0;
          if (target === mfp.content[0] || $.contains(mfp.content[0], target)) {
            if (closeOnContent) return !0
          } else if (closeOnBg && $.contains(document, target)) return !0;
          return !1
        }
      },
      _addClassToMFP: function(cName) {
        mfp.bgOverlay.addClass(cName), mfp.wrap.addClass(cName)
      },
      _removeClassFromMFP: function(cName) {
        this.bgOverlay.removeClass(cName), mfp.wrap.removeClass(cName)
      },
      _hasScrollBar: function(winHeight) {
        return (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height())
      },
      _setFocus: function() {
        (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus()
      },
      _onFocusIn: function(e) {
        if (e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target)) return mfp._setFocus(), !1
      },
      _parseMarkup: function(template, values, item) {
        var arr;
        item.data && (values = $.extend(item.data, values)), _mfpTrigger("MarkupParse", [template, values, item]), $.each(values, function(key, value) {
          if (void 0 === value || !1 === value) return !0;
          if (1 < (arr = key.split("_")).length) {
            var el = template.find(".mfp-" + arr[0]);
            if (0 < el.length) {
              var attr = arr[1];
              "replaceWith" === attr ? el[0] !== value[0] && el.replaceWith(value) : "img" === attr ? el.is("img") ? el.attr("src", value) : el.replaceWith($("<img>").attr("src", value).attr("class", el.attr("class"))) : el.attr(arr[1], value)
            }
          } else template.find(".mfp-" + key).html(value)
        })
      },
      _getScrollbarSize: function() {
        if (void 0 === mfp.scrollbarSize) {
          var scrollDiv = document.createElement("div");
          scrollDiv.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(scrollDiv), mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth, document.body.removeChild(scrollDiv)
        }
        return mfp.scrollbarSize
      }
    }, $.magnificPopup = {
      instance: null,
      proto: MagnificPopup.prototype,
      modules: [],
      open: function(options, index) {
        return _checkInstance(), (options = options ? $.extend(!0, {}, options) : {}).isObj = !0, options.index = index || 0, this.instance.open(options)
      },
      close: function() {
        return $.magnificPopup.instance && $.magnificPopup.instance.close()
      },
      registerModule: function(name, module) {
        module.options && ($.magnificPopup.defaults[name] = module.options), $.extend(this.proto, module.proto), this.modules.push(name)
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0
      }
    }, $.fn.magnificPopup = function(options) {
      _checkInstance();
      var jqEl = $(this);
      if ("string" == typeof options)
        if ("open" === options) {
          var items, itemOpts = _isJQ ? jqEl.data("magnificPopup") : jqEl[0].magnificPopup,
            index = parseInt(arguments[1], 10) || 0;
          items = itemOpts.items ? itemOpts.items[index] : (items = jqEl, itemOpts.delegate && (items = items.find(itemOpts.delegate)), items.eq(index)), mfp._openClick({
            mfpEl: items
          }, jqEl, itemOpts)
        } else mfp.isOpen && mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
      else options = $.extend(!0, {}, options), _isJQ ? jqEl.data("magnificPopup", options) : jqEl[0].magnificPopup = options, mfp.addGroup(jqEl, options);
      return jqEl
    };

    function _putInlineElementsBack() {
      _lastInlineElement && (_inlinePlaceholder.after(_lastInlineElement.addClass(_hiddenClass)).detach(), _lastInlineElement = null)
    }
    var _hiddenClass, _inlinePlaceholder, _lastInlineElement;
    $.magnificPopup.registerModule("inline", {
      options: {
        hiddenClass: "hide",
        markup: "",
        tNotFound: "Content not found"
      },
      proto: {
        initInline: function() {
          mfp.types.push("inline"), _mfpOn("Close.inline", function() {
            _putInlineElementsBack()
          })
        },
        getInline: function(item, template) {
          if (_putInlineElementsBack(), item.src) {
            var inlineSt = mfp.st.inline,
              el = $(item.src);
            if (el.length) {
              var parent = el[0].parentNode;
              parent && parent.tagName && (_inlinePlaceholder || (_hiddenClass = inlineSt.hiddenClass, _inlinePlaceholder = _getEl(_hiddenClass), _hiddenClass = "mfp-" + _hiddenClass), _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass)), mfp.updateStatus("ready")
            } else mfp.updateStatus("error", inlineSt.tNotFound), el = $("<div>");
            return item.inlineElement = el
          }
          return mfp.updateStatus("ready"), mfp._parseMarkup(template, {}, item), template
        }
      }
    });

    function _removeAjaxCursor() {
      _ajaxCur && $(document.body).removeClass(_ajaxCur)
    }

    function _destroyAjaxRequest() {
      _removeAjaxCursor(), mfp.req && mfp.req.abort()
    }
    var _ajaxCur;
    $.magnificPopup.registerModule("ajax", {
      options: {
        settings: null,
        cursor: "mfp-ajax-cur",
        tError: '<a href="%url%">The content</a> could not be loaded.'
      },
      proto: {
        initAjax: function() {
          mfp.types.push("ajax"), _ajaxCur = mfp.st.ajax.cursor, _mfpOn("Close.ajax", _destroyAjaxRequest), _mfpOn("BeforeChange.ajax", _destroyAjaxRequest)
        },
        getAjax: function(item) {
          _ajaxCur && $(document.body).addClass(_ajaxCur), mfp.updateStatus("loading");
          var opts = $.extend({
            url: item.src,
            success: function(data, textStatus, jqXHR) {
              var temp = {
                data: data,
                xhr: jqXHR
              };
              _mfpTrigger("ParseAjax", temp), mfp.appendContent($(temp.data), "ajax"), item.finished = !0, _removeAjaxCursor(), mfp._setFocus(), setTimeout(function() {
                mfp.wrap.addClass("mfp-ready")
              }, 16), mfp.updateStatus("ready"), _mfpTrigger("AjaxContentAdded")
            },
            error: function() {
              _removeAjaxCursor(), item.finished = item.loadError = !0, mfp.updateStatus("error", mfp.st.ajax.tError.replace("%url%", item.src))
            }
          }, mfp.st.ajax.settings);
          return mfp.req = $.ajax(opts), ""
        }
      }
    });
    var _imgInterval;
    $.magnificPopup.registerModule("image", {
      options: {
        markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
        cursor: "mfp-zoom-out-cur",
        titleSrc: "title",
        verticalFit: !0,
        tError: '<a href="%url%">The image</a> could not be loaded.'
      },
      proto: {
        initImage: function() {
          var imgSt = mfp.st.image,
            ns = ".image";
          mfp.types.push("image"), _mfpOn("Open" + ns, function() {
            "image" === mfp.currItem.type && imgSt.cursor && $(document.body).addClass(imgSt.cursor)
          }), _mfpOn("Close" + ns, function() {
            imgSt.cursor && $(document.body).removeClass(imgSt.cursor), _window.off("resize.mfp")
          }), _mfpOn("Resize" + ns, mfp.resizeImage), mfp.isLowIE && _mfpOn("AfterChange", mfp.resizeImage)
        },
        resizeImage: function() {
          var item = mfp.currItem;
          if (item && item.img && mfp.st.image.verticalFit) {
            var decr = 0;
            mfp.isLowIE && (decr = parseInt(item.img.css("padding-top"), 10) + parseInt(item.img.css("padding-bottom"), 10)), item.img.css("max-height", mfp.wH - decr)
          }
        },
        _onImageHasSize: function(item) {
          item.img && (item.hasSize = !0, _imgInterval && clearInterval(_imgInterval), item.isCheckingImgSize = !1, _mfpTrigger("ImageHasSize", item), item.imgHidden && (mfp.content && mfp.content.removeClass("mfp-loading"), item.imgHidden = !1))
        },
        findImageSize: function(item) {
          var counter = 0,
            img = item.img[0],
            mfpSetInterval = function(delay) {
              _imgInterval && clearInterval(_imgInterval), _imgInterval = setInterval(function() {
                0 < img.naturalWidth ? mfp._onImageHasSize(item) : (200 < counter && clearInterval(_imgInterval), 3 === ++counter ? mfpSetInterval(10) : 40 === counter ? mfpSetInterval(50) : 100 === counter && mfpSetInterval(500))
              }, delay)
            };
          mfpSetInterval(1)
        },
        getImage: function(item, template) {
          var guard = 0,
            onLoadComplete = function() {
              item && (item.img[0].complete ? (item.img.off(".mfploader"), item === mfp.currItem && (mfp._onImageHasSize(item), mfp.updateStatus("ready")), item.hasSize = !0, item.loaded = !0, _mfpTrigger("ImageLoadComplete")) : ++guard < 200 ? setTimeout(onLoadComplete, 100) : onLoadError())
            },
            onLoadError = function() {
              item && (item.img.off(".mfploader"), item === mfp.currItem && (mfp._onImageHasSize(item), mfp.updateStatus("error", imgSt.tError.replace("%url%", item.src))), item.hasSize = !0, item.loaded = !0, item.loadError = !0)
            },
            imgSt = mfp.st.image,
            el = template.find(".mfp-img");
          if (el.length) {
            var img = document.createElement("img");
            img.className = "mfp-img", item.el && item.el.find("img").length && (img.alt = item.el.find("img").attr("alt")), item.img = $(img).on("load.mfploader", onLoadComplete).on("error.mfploader", onLoadError), img.src = item.src, el.is("img") && (item.img = item.img.clone()), 0 < (img = item.img[0]).naturalWidth ? item.hasSize = !0 : img.width || (item.hasSize = !1)
          }
          return mfp._parseMarkup(template, {
            title: function(item) {
              if (item.data && void 0 !== item.data.title) return item.data.title;
              var src = mfp.st.image.titleSrc;
              if (src) {
                if ($.isFunction(src)) return src.call(mfp, item);
                if (item.el) return item.el.attr(src) || ""
              }
              return ""
            }(item),
            img_replaceWith: item.img
          }, item), mfp.resizeImage(), item.hasSize ? (_imgInterval && clearInterval(_imgInterval), item.loadError ? (template.addClass("mfp-loading"), mfp.updateStatus("error", imgSt.tError.replace("%url%", item.src))) : (template.removeClass("mfp-loading"), mfp.updateStatus("ready"))) : (mfp.updateStatus("loading"), item.loading = !0, item.hasSize || (item.imgHidden = !0, template.addClass("mfp-loading"), mfp.findImageSize(item))), template
        }
      }
    });
    var hasMozTransform;
    $.magnificPopup.registerModule("zoom", {
      options: {
        enabled: !1,
        easing: "ease-in-out",
        duration: 300,
        opener: function(element) {
          return element.is("img") ? element : element.find("img")
        }
      },
      proto: {
        initZoom: function() {
          var image, zoomSt = mfp.st.zoom,
            ns = ".zoom";
          if (zoomSt.enabled && mfp.supportsTransition) {
            function getElToAnimate(image) {
              var newImg = image.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                transition = "all " + zoomSt.duration / 1e3 + "s " + zoomSt.easing,
                cssObj = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden"
                },
                t = "transition";
              return cssObj["-webkit-" + t] = cssObj["-moz-" + t] = cssObj["-o-" + t] = cssObj[t] = transition, newImg.css(cssObj), newImg
            }

            function showMainContent() {
              mfp.content.css("visibility", "visible")
            }
            var openTimeout, animatedImg, duration = zoomSt.duration;
            _mfpOn("BuildControls" + ns, function() {
              if (mfp._allowZoom()) {
                if (clearTimeout(openTimeout), mfp.content.css("visibility", "hidden"), !(image = mfp._getItemToZoom())) return void showMainContent();
                (animatedImg = getElToAnimate(image)).css(mfp._getOffset()), mfp.wrap.append(animatedImg), openTimeout = setTimeout(function() {
                  animatedImg.css(mfp._getOffset(!0)), openTimeout = setTimeout(function() {
                    showMainContent(), setTimeout(function() {
                      animatedImg.remove(), image = animatedImg = null, _mfpTrigger("ZoomAnimationEnded")
                    }, 16)
                  }, duration)
                }, 16)
              }
            }), _mfpOn("BeforeClose" + ns, function() {
              if (mfp._allowZoom()) {
                if (clearTimeout(openTimeout), mfp.st.removalDelay = duration, !image) {
                  if (!(image = mfp._getItemToZoom())) return;
                  animatedImg = getElToAnimate(image)
                }
                animatedImg.css(mfp._getOffset(!0)), mfp.wrap.append(animatedImg), mfp.content.css("visibility", "hidden"), setTimeout(function() {
                  animatedImg.css(mfp._getOffset())
                }, 16)
              }
            }), _mfpOn("Close" + ns, function() {
              mfp._allowZoom() && (showMainContent(), animatedImg && animatedImg.remove(), image = null)
            })
          }
        },
        _allowZoom: function() {
          return "image" === mfp.currItem.type
        },
        _getItemToZoom: function() {
          return !!mfp.currItem.hasSize && mfp.currItem.img
        },
        _getOffset: function(isLarge) {
          var el, offset = (el = isLarge ? mfp.currItem.img : mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem)).offset(),
            paddingTop = parseInt(el.css("padding-top"), 10),
            paddingBottom = parseInt(el.css("padding-bottom"), 10);
          offset.top -= $(window).scrollTop() - paddingTop;
          var obj = {
            width: el.width(),
            height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
          };
          return void 0 === hasMozTransform && (hasMozTransform = void 0 !== document.createElement("p").style.MozTransform), hasMozTransform ? obj["-moz-transform"] = obj.transform = "translate(" + offset.left + "px," + offset.top + "px)" : (obj.left = offset.left, obj.top = offset.top), obj
        }
      }
    });

    function _fixIframeBugs(isShowing) {
      if (mfp.currTemplate.iframe) {
        var el = mfp.currTemplate.iframe.find("iframe");
        el.length && (isShowing || (el[0].src = "//about:blank"), mfp.isIE8 && el.css("display", isShowing ? "block" : "none"))
      }
    }
    $.magnificPopup.registerModule("iframe", {
      options: {
        markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
        srcAction: "iframe_src",
        patterns: {
          youtube: {
            index: "youtube.com",
            id: "v=",
            src: "//www.youtube.com/embed/%id%?autoplay=1"
          },
          vimeo: {
            index: "vimeo.com/",
            id: "/",
            src: "//player.vimeo.com/video/%id%?autoplay=1"
          },
          gmaps: {
            index: "//maps.google.",
            src: "%id%&output=embed"
          }
        }
      },
      proto: {
        initIframe: function() {
          mfp.types.push("iframe"), _mfpOn("BeforeChange", function(e, prevType, newType) {
            prevType !== newType && ("iframe" === prevType ? _fixIframeBugs() : "iframe" === newType && _fixIframeBugs(!0))
          }), _mfpOn("Close.iframe", function() {
            _fixIframeBugs()
          })
        },
        getIframe: function(item, template) {
          var embedSrc = item.src,
            iframeSt = mfp.st.iframe;
          $.each(iframeSt.patterns, function() {
            if (-1 < embedSrc.indexOf(this.index)) return this.id && (embedSrc = "string" == typeof this.id ? embedSrc.substr(embedSrc.lastIndexOf(this.id) + this.id.length, embedSrc.length) : this.id.call(this, embedSrc)), embedSrc = this.src.replace("%id%", embedSrc), !1
          });
          var dataObj = {};
          return iframeSt.srcAction && (dataObj[iframeSt.srcAction] = embedSrc), mfp._parseMarkup(template, dataObj, item), mfp.updateStatus("ready"), template
        }
      }
    });

    function _getLoopedId(index) {
      var numSlides = mfp.items.length;
      return numSlides - 1 < index ? index - numSlides : index < 0 ? numSlides + index : index
    }

    function _replaceCurrTotal(text, curr, total) {
      return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total)
    }
    $.magnificPopup.registerModule("gallery", {
      options: {
        enabled: !1,
        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
        preload: [0, 2],
        navigateByImgClick: !0,
        arrows: !0,
        tPrev: "Previous (Left arrow key)",
        tNext: "Next (Right arrow key)",
        tCounter: "%curr% of %total%"
      },
      proto: {
        initGallery: function() {
          var gSt = mfp.st.gallery,
            ns = ".mfp-gallery";
          if (mfp.direction = !0, !gSt || !gSt.enabled) return !1;
          _wrapClasses += " mfp-gallery", _mfpOn("Open" + ns, function() {
            gSt.navigateByImgClick && mfp.wrap.on("click" + ns, ".mfp-img", function() {
              if (1 < mfp.items.length) return mfp.next(), !1
            }), _document.on("keydown" + ns, function(e) {
              37 === e.keyCode ? mfp.prev() : 39 === e.keyCode && mfp.next()
            })
          }), _mfpOn("UpdateStatus" + ns, function(e, data) {
            data.text && (data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length))
          }), _mfpOn("MarkupParse" + ns, function(e, element, values, item) {
            var l = mfp.items.length;
            values.counter = 1 < l ? _replaceCurrTotal(gSt.tCounter, item.index, l) : ""
          }), _mfpOn("BuildControls" + ns, function() {
            if (1 < mfp.items.length && gSt.arrows && !mfp.arrowLeft) {
              var markup = gSt.arrowMarkup,
                arrowLeft = mfp.arrowLeft = $(markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, "left")).addClass("mfp-prevent-close"),
                arrowRight = mfp.arrowRight = $(markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, "right")).addClass("mfp-prevent-close");
              arrowLeft.click(function() {
                mfp.prev()
              }), arrowRight.click(function() {
                mfp.next()
              }), mfp.container.append(arrowLeft.add(arrowRight))
            }
          }), _mfpOn("Change" + ns, function() {
            mfp._preloadTimeout && clearTimeout(mfp._preloadTimeout), mfp._preloadTimeout = setTimeout(function() {
              mfp.preloadNearbyImages(), mfp._preloadTimeout = null
            }, 16)
          }), _mfpOn("Close" + ns, function() {
            _document.off(ns), mfp.wrap.off("click" + ns), mfp.arrowRight = mfp.arrowLeft = null
          })
        },
        next: function() {
          mfp.direction = !0, mfp.index = _getLoopedId(mfp.index + 1), mfp.updateItemHTML()
        },
        prev: function() {
          mfp.direction = !1, mfp.index = _getLoopedId(mfp.index - 1), mfp.updateItemHTML()
        },
        goTo: function(newIndex) {
          mfp.direction = newIndex >= mfp.index, mfp.index = newIndex, mfp.updateItemHTML()
        },
        preloadNearbyImages: function() {
          var i, p = mfp.st.gallery.preload,
            preloadBefore = Math.min(p[0], mfp.items.length),
            preloadAfter = Math.min(p[1], mfp.items.length);
          for (i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) mfp._preloadItem(mfp.index + i);
          for (i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) mfp._preloadItem(mfp.index - i)
        },
        _preloadItem: function(index) {
          if (index = _getLoopedId(index), !mfp.items[index].preloaded) {
            var item = mfp.items[index];
            item.parsed || (item = mfp.parseEl(index)), _mfpTrigger("LazyLoad", item), "image" === item.type && (item.img = $('<img class="mfp-img" />').on("load.mfploader", function() {
              item.hasSize = !0
            }).on("error.mfploader", function() {
              item.hasSize = !0, item.loadError = !0, _mfpTrigger("LazyLoadError", item)
            }).attr("src", item.src)), item.preloaded = !0
          }
        }
      }
    });
    $.magnificPopup.registerModule("retina", {
      options: {
        replaceSrc: function(item) {
          return item.src.replace(/\.\w+$/, function(m) {
            return "@2x" + m
          })
        },
        ratio: 1
      },
      proto: {
        initRetina: function() {
          if (1 < window.devicePixelRatio) {
            var st = mfp.st.retina,
              ratio = st.ratio;
            1 < (ratio = isNaN(ratio) ? ratio() : ratio) && (_mfpOn("ImageHasSize.retina", function(e, item) {
              item.img.css({
                "max-width": item.img[0].naturalWidth / ratio,
                width: "100%"
              })
            }), _mfpOn("ElementParse.retina", function(e, item) {
              item.src = st.replaceSrc(item, ratio)
            }))
          }
        }
      }
    }), _checkInstance()
  }),
  function(root, factory) {
    "function" == typeof define && define.amd ? define([], function() {
      return root.svg4everybody = factory()
    }) : "object" == typeof module && module.exports ? module.exports = factory() : root.svg4everybody = factory()
  }(this, function() {
    function embed(parent, svg, target) {
      if (target) {
        var fragment = document.createDocumentFragment(),
          viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
        viewBox && svg.setAttribute("viewBox", viewBox);
        for (var clone = target.cloneNode(!0); clone.childNodes.length;) fragment.appendChild(clone.firstChild);
        parent.appendChild(fragment)
      }
    }

    function loadreadystatechange(xhr) {
      xhr.onreadystatechange = function() {
        if (4 === xhr.readyState) {
          var cachedDocument = xhr._cachedDocument;
          cachedDocument || ((cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), xhr._embeds.splice(0).map(function(item) {
            var target = xhr._cachedTarget[item.id];
            target = target || (xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), embed(item.parent, item.svg, target)
          })
        }
      }, xhr.onreadystatechange()
    }

    function getSVGAncestor(node) {
      for (var svg = node;
        "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode););
      return svg
    }
    return function(rawopts) {
      var polyfill, opts = Object(rawopts),
        inIframe = window.top !== window.self;
      polyfill = "polyfill" in opts ? opts.polyfill : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 || (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537 || /\bEdge\/.(\d+)\b/.test(navigator.userAgent) && inIframe;
      var requests = {},
        requestAnimationFrame = window.requestAnimationFrame || setTimeout,
        uses = document.getElementsByTagName("use"),
        numberOfSvgUseElementsToBypass = 0;
      polyfill && function oninterval() {
        for (var index = 0; index < uses.length;) {
          var use = uses[index],
            parent = use.parentNode,
            svg = getSVGAncestor(parent),
            src = use.getAttribute("xlink:href") || use.getAttribute("href");
          if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), svg && src) {
            if (polyfill)
              if (!opts.validate || opts.validate(src, svg, use)) {
                parent.removeChild(use);
                var srcSplit = src.split("#"),
                  url = srcSplit.shift(),
                  id = srcSplit.join("#");
                if (url.length) {
                  var xhr = requests[url];
                  xhr || ((xhr = requests[url] = new XMLHttpRequest).open("GET", url), xhr.send(), xhr._embeds = []), xhr._embeds.push({
                    parent: parent,
                    svg: svg,
                    id: id
                  }), loadreadystatechange(xhr)
                } else embed(parent, svg, document.getElementById(id))
              } else ++index, ++numberOfSvgUseElementsToBypass
          } else ++index
        }(!uses.length || 0 < uses.length - numberOfSvgUseElementsToBypass) && requestAnimationFrame(oninterval, 67)
      }()
    }
  }),
  function(factory) {
    "function" == typeof define && define.amd ? define(["./dependencyLibs/inputmask.dependencyLib", "./global/window", "./global/document"], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./global/window"), require("./global/document")) : window.Inputmask = factory(window.dependencyLib || jQuery, window, document)
  }(function($, window, document, undefined) {
    function Inputmask(alias, options, internal) {
      if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
      this.el = undefined, this.events = {}, this.maskset = undefined, !(this.refreshValue = !1) !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}).alias = alias, this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && options.definitions !== undefined, this.userOptions = options || {}, this.isRTL = this.opts.numericInput, resolveAlias(this.opts.alias, options, this.opts))
    }

    function resolveAlias(aliasStr, options, opts) {
      var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
      return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, undefined, opts), $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1)
    }

    function generateMaskSet(opts, nocache) {
      function generateMask(mask, metadata, opts) {
        var regexMask = !1;
        if (null !== mask && "" !== mask || (mask = (regexMask = null !== opts.regex) ? (mask = opts.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
          var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
          mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end
        }
        var masksetDefinition, maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
        return Inputmask.prototype.masksCache[maskdefKey] === undefined || !0 === nocache ? (masksetDefinition = {
          mask: mask,
          maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
          validPositions: {},
          _buffer: undefined,
          buffer: undefined,
          tests: {},
          metadata: metadata,
          maskLength: undefined
        }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition
      }
      if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
        if (1 < opts.mask.length) {
          opts.keepStatic = null === opts.keepStatic || opts.keepStatic;
          var altMask = opts.groupmarker.start;
          return $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
            1 < altMask.length && (altMask += opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start), msk.mask === undefined || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask
          }), generateMask(altMask += opts.groupmarker.end, opts.mask, opts)
        }
        opts.mask = opts.mask.pop()
      }
      return opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts)
    }

    function maskScope(actionObj, maskset, opts) {
      function getMaskTemplate(baseOnInput, minimalPos, includeMode) {
        minimalPos = minimalPos || 0;
        for (var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition(); !0 === baseOnInput && getMaskSet().validPositions[pos] ? (test = (testPos = getMaskSet().validPositions[pos]).match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))) : (test = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).match, ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))), pos++, (maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || pos < minimalPos;);
        return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), getMaskSet().maskLength = pos + 1, maskTemplate
      }

      function getMaskSet() {
        return maskset
      }

      function resetMaskSet(soft) {
        var maskset = getMaskSet();
        maskset.buffer = undefined, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0)
      }

      function getLastValidPosition(closestTo, strict, validPositions) {
        var before = -1,
          after = -1,
          valids = validPositions || getMaskSet().validPositions;
        for (var posNdx in closestTo === undefined && (closestTo = -1), valids) {
          var psNdx = parseInt(posNdx);
          valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx))
        }
        return -1 !== before && 1 < closestTo - before || after < closestTo ? before : after
      }

      function stripValidPositions(start, end, nocheck, strict) {
        var i, startPos = start,
          positionsClone = $.extend(!0, {}, getMaskSet().validPositions),
          needsValidation = !1;
        for (getMaskSet().p = start, i = end - 1; startPos <= i; i--) getMaskSet().validPositions[i] !== undefined && (!0 !== nocheck && (!getMaskSet().validPositions[i].match.optionality && function(pos) {
          var posMatch = getMaskSet().validPositions[pos];
          if (posMatch === undefined || null !== posMatch.match.fn) return 0;
          var prevMatch = getMaskSet().validPositions[pos - 1],
            nextMatch = getMaskSet().validPositions[pos + 1];
          return prevMatch !== undefined && nextMatch !== undefined
        }(i) || !1 === opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts)) || delete getMaskSet().validPositions[i]);
        for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition();) {
          for (; getMaskSet().validPositions[startPos] !== undefined;) startPos++;
          if (i < startPos && (i = startPos + 1), getMaskSet().validPositions[i] === undefined && isMask(i)) i++;
          else {
            var t = getTestTemplate(i);
            !1 === needsValidation && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def ? (getMaskSet().validPositions[startPos] = $.extend(!0, {}, positionsClone[startPos]), getMaskSet().validPositions[startPos].input = t.input, delete getMaskSet().validPositions[i], i++) : positionCanMatchDefinition(startPos, t.match.def) ? !1 !== isValid(startPos, t.input || getPlaceholder(i), !0) && (delete getMaskSet().validPositions[i], i++, needsValidation = !0) : isMask(i) || (i++, startPos--), startPos++
          }
        }
        resetMaskSet(!0)
      }

      function determineTestTemplate(tests, guessNextBest) {
        for (var testPos, testPositions = tests, lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation].toString().split(",") : [], ndx = 0; ndx < testPositions.length && (!((testPos = testPositions[ndx]).match && (opts.greedy && !0 !== testPos.match.optionalQuantifier || (!1 === testPos.match.optionality || !1 === testPos.match.newBlockMarker) && !0 !== testPos.match.optionalQuantifier) && (lvTest.alternation === undefined || lvTest.alternation !== testPos.alternation || testPos.locator[lvTest.alternation] !== undefined && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr))) || !0 === guessNextBest && (null !== testPos.match.fn || /[0-9a-bA-Z]/.test(testPos.match.def))); ndx++);
        return testPos
      }

      function getTestTemplate(pos, ndxIntlzr, tstPs) {
        return getMaskSet().validPositions[pos] || determineTestTemplate(getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs))
      }

      function getTest(pos) {
        return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos] : getTests(pos)[0]
      }

      function positionCanMatchDefinition(pos, def) {
        for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++)
          if (tests[tndx].match && tests[tndx].match.def === def) {
            valid = !0;
            break
          } return valid
      }

      function getTests(pos, ndxIntlzr, tstPs) {
        function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
          function handleMatch(match, loopNdx, quantifierRecurse) {
            function isFirstMatch(latestMatch, tokenGroup) {
              var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
              return firstMatch || $.each(tokenGroup.matches, function(ndx, match) {
                if (!0 === match.isQuantifier && (firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]))) return !1
              }), firstMatch
            }

            function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
              var bestMatch, indexPos;
              if (getMaskSet().validPositions[pos - 1] && targetAlternation && getMaskSet().tests[pos])
                for (var vpAlternation = getMaskSet().validPositions[pos - 1].locator, tpAlternation = getMaskSet().tests[pos][0].locator, i = 0; i < targetAlternation; i++)
                  if (vpAlternation[i] !== tpAlternation[i]) return vpAlternation.slice(targetAlternation + 1);
              return (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [getMaskSet().validPositions[pos]], function(ndx, lmnt) {
                var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation,
                  ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                (indexPos === undefined || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos)
              }), bestMatch ? bestMatch.locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1) : targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined
            }
            if (1e4 < testPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
            if (testPos === pos && match.matches === undefined) return matches.push({
              match: match,
              locator: loopNdx.reverse(),
              cd: cacheDependency
            }), !0;
            if (match.matches !== undefined) {
              if (match.isGroup && quantifierRecurse !== match) {
                if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0
              } else if (match.isOptional) {
                var optionalToken = match;
                if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                  if (!isFirstMatch(latestMatch = matches[matches.length - 1].match, optionalToken)) return !0;
                  insertStop = !0, testPos = pos
                }
              } else if (match.isAlternator) {
                var maltMatches, alternateToken = match,
                  malternateMatches = [],
                  currentMatches = matches.slice(),
                  loopNdxCnt = loopNdx.length,
                  altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                if (-1 === altIndex || "string" == typeof altIndex) {
                  var amndx, currentPos = testPos,
                    ndxInitializerClone = ndxInitializer.slice(),
                    altIndexArr = [];
                  if ("string" == typeof altIndex) altIndexArr = altIndex.split(",");
                  else
                    for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx);
                  for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                    if (amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), !0 !== (match = handleMatch(alternateToken.matches[amndx] || maskToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) || match) && match !== undefined && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length) {
                      var ntndx = $.inArray(match, maskToken.matches) + 1;
                      maskToken.matches.length > ntndx && (match = handleMatch(maskToken.matches[ntndx], [ntndx].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse)) && (altIndexArr.push(ntndx.toString()), $.each(matches, function(ndx, lmnt) {
                        lmnt.alternation = loopNdx.length - 1
                      }))
                    }
                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                      var altMatch = maltMatches[ndx1],
                        dropMatch = !1;
                      altMatch.alternation = altMatch.alternation || loopNdxCnt;
                      for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                        var altMatch2 = malternateMatches[ndx2];
                        if ("string" != typeof altIndex || -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                          if (altMatch.match.nativeDef === altMatch2.match.nativeDef || altMatch.match.def === altMatch2.match.nativeDef || altMatch.match.nativeDef === altMatch2.match.def) {
                            dropMatch = !0, altMatch.alternation === altMatch2.alternation && -1 === altMatch2.locator[altMatch2.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) && (altMatch2.locator[altMatch2.alternation] = altMatch2.locator[altMatch2.alternation] + "," + altMatch.locator[altMatch.alternation], altMatch2.alternation = altMatch.alternation), altMatch.match.nativeDef === altMatch2.match.def && (altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation], malternateMatches.splice(malternateMatches.indexOf(altMatch2), 1, altMatch));
                            break
                          }
                          if (altMatch.match.def === altMatch2.match.def) {
                            dropMatch = !1;
                            break
                          }
                          if (null === altMatch.match.fn && null !== altMatch2.match.fn && altMatch2.match.fn.test(altMatch.match.def, getMaskSet(), pos, !1, opts, !1) || null !== altMatch.match.fn && null !== altMatch2.match.fn && altMatch2.match.fn.test(altMatch.match.def.replace(/[\[\]]/g, ""), getMaskSet(), pos, !1, opts, !1)) {
                            altMatch.alternation === altMatch2.alternation && -1 === altMatch.locator[altMatch.alternation].toString().indexOf(altMatch2.locator[altMatch2.alternation].toString().split("")[0]) && (altMatch.na = altMatch.na || altMatch.locator[altMatch.alternation].toString(), -1 === altMatch.na.indexOf(altMatch.locator[altMatch.alternation].toString().split("")[0]) && (altMatch.na = altMatch.na + "," + altMatch.locator[altMatch2.alternation].toString().split("")[0]), dropMatch = !0, altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation].toString().split("")[0] + "," + altMatch.locator[altMatch.alternation], malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                            break
                          }
                        }
                      }
                      dropMatch || malternateMatches.push(altMatch)
                    }
                  }
                  "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                    if (isFinite(ndx)) {
                      var alternation = lmnt.alternation,
                        altLocArr = lmnt.locator[alternation].toString().split(",");
                      lmnt.locator[alternation] = undefined, lmnt.alternation = undefined;
                      for (var alndx = 0; alndx < altLocArr.length; alndx++) - 1 !== $.inArray(altLocArr[alndx], altIndexArr) && (lmnt.locator[alternation] !== undefined ? (lmnt.locator[alternation] += ",", lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), lmnt.alternation = alternation);
                      if (lmnt.locator[alternation] !== undefined) return lmnt
                    }
                  })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice()
                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                if (match) return !0
              } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1])
                for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                  var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                  if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup)) {
                    if ((latestMatch = matches[matches.length - 1].match).optionalQuantifier = qndx > qt.quantifier.min - 1, isFirstMatch(latestMatch, tokenGroup)) {
                      if (qndx > qt.quantifier.min - 1) {
                        insertStop = !0, testPos = pos;
                        break
                      }
                      return !0
                    }
                    return !0
                  }
                } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0
            } else testPos++
          }
          for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++)
            if (!0 !== maskToken.matches[tndx].isQuantifier) {
              var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
              if (match && testPos === pos) return match;
              if (pos < testPos) break
            }
        }

        function filterTests(tests) {
          if (opts.keepStatic && 0 < pos && tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0) && !0 !== tests[0].match.optionality && !0 !== tests[0].match.optionalQuantifier && null === tests[0].match.fn && !/[0-9a-bA-Z]/.test(tests[0].match.def)) {
            if (getMaskSet().validPositions[pos - 1] === undefined) return [determineTestTemplate(tests)];
            if (getMaskSet().validPositions[pos - 1].alternation === tests[0].alternation) return [determineTestTemplate(tests)];
            if (getMaskSet().validPositions[pos - 1]) return [determineTestTemplate(tests)]
          }
          return tests
        }
        var latestMatch, tests, locator, maskTokens = getMaskSet().maskToken,
          testPos = ndxIntlzr ? tstPs : 0,
          ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
          matches = [],
          insertStop = !1,
          cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
        if (-1 < pos) {
          if (ndxIntlzr === undefined) {
            for (var test, previousPos = pos - 1;
              (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && -1 < previousPos;) previousPos--;
            test !== undefined && -1 < previousPos && (tests = test, locator = [], $.isArray(tests) || (tests = [tests]), 0 < tests.length && (tests[0].alternation === undefined ? 0 === (locator = determineTestTemplate(tests.slice()).locator.slice()).length && (locator = tests[0].locator.slice()) : $.each(tests, function(ndx, tst) {
              if ("" !== tst.def)
                if (0 === locator.length) locator = tst.locator.slice();
                else
                  for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i])
            })), cacheDependency = (ndxInitializer = locator).join(""), testPos = previousPos)
          }
          if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return filterTests(getMaskSet().tests[pos]);
          for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length && !(resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]) && testPos === pos || pos < testPos); mtndx++);
        }
        return 0 !== matches.length && !insertStop || matches.push({
          match: {
            fn: null,
            cardinality: 0,
            optionality: !0,
            casing: null,
            def: "",
            placeholder: ""
          },
          locator: [],
          cd: cacheDependency
        }), ndxIntlzr !== undefined && getMaskSet().tests[pos] ? filterTests($.extend(!0, [], matches)) : (getMaskSet().tests[pos] = $.extend(!0, [], matches), filterTests(getMaskSet().tests[pos]))
      }

      function getBufferTemplate() {
        return getMaskSet()._buffer === undefined && (getMaskSet()._buffer = getMaskTemplate(!1, 1), getMaskSet().buffer === undefined && (getMaskSet().buffer = getMaskSet()._buffer.slice())), getMaskSet()._buffer
      }

      function getBuffer(noCache) {
        return getMaskSet().buffer !== undefined && !0 !== noCache || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)), getMaskSet().buffer
      }

      function refreshFromBuffer(start, end, buffer) {
        var i, p;
        if (!0 === start) resetMaskSet(), start = 0, end = buffer.length;
        else
          for (i = start; i < end; i++) delete getMaskSet().validPositions[i];
        for (i = p = start; i < end; i++)
          if (resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter) {
            var valResult = isValid(p, buffer[i], !0, !0);
            !1 !== valResult && (resetMaskSet(!0), p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1)
          }
      }

      function checkAlternationMatch(altArr1, altArr2, na) {
        for (var naNdx, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = na !== undefined ? na.split(",") : [], i = 0; i < naArr.length; i++) - 1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
        for (var alndx = 0; alndx < altArr1.length; alndx++)
          if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
            isMatch = !0;
            break
          } return isMatch
      }

      function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
        function isSelection(posObj) {
          var selection = isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1;
          return selection && 0 === posObj.begin && posObj.end === getMaskSet().maskLength ? "full" : selection
        }

        function _isValid(position, c, strict) {
          var rslt = !1;
          return $.each(getTests(position), function(ndx, tst) {
            for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = test.cardinality; loopend < i; i--) chrs += getBufferElement(position - (i - 1));
            if (c && (chrs += c), getBuffer(!0), !1 !== (rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                c: getPlaceholder(position, test, !0) || test.def,
                pos: position
              })) {
              var elem = rslt.c !== undefined ? rslt.c : c;
              elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? getPlaceholder(position, test, !0) || test.def : elem;
              var validatedPos = position,
                possibleModifiedBuffer = getBuffer();
              if (rslt.remove !== undefined && ($.isArray(rslt.remove) || (rslt.remove = [rslt.remove]), $.each(rslt.remove.sort(function(a, b) {
                  return b - a
                }), function(ndx, lmnt) {
                  stripValidPositions(lmnt, lmnt + 1, !0)
                })), rslt.insert !== undefined && ($.isArray(rslt.insert) || (rslt.insert = [rslt.insert]), $.each(rslt.insert.sort(function(a, b) {
                  return a - b
                }), function(ndx, lmnt) {
                  isValid(lmnt.pos, lmnt.c, !0, fromSetValid)
                })), rslt.refreshFromBuffer) {
                var refresh = rslt.refreshFromBuffer;
                if (refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), rslt.pos === undefined && rslt.c === undefined) return rslt.pos = getLastValidPosition(), !1;
                if ((validatedPos = rslt.pos !== undefined ? rslt.pos : position) !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0, fromSetValid)), !1
              } else if (!0 !== rslt && rslt.pos !== undefined && rslt.pos !== position && (validatedPos = rslt.pos, refreshFromBuffer(position, validatedPos, getBuffer().slice()), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), !1;
              return (!0 === rslt || rslt.pos !== undefined || rslt.c !== undefined) && (0 < ndx && resetMaskSet(!0), setValidPosition(validatedPos, $.extend({}, tst, {
                input: function(elem, test, pos) {
                  switch (opts.casing || test.casing) {
                    case "upper":
                      elem = elem.toUpperCase();
                      break;
                    case "lower":
                      elem = elem.toLowerCase();
                      break;
                    case "title":
                      var posBefore = getMaskSet().validPositions[pos - 1];
                      elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                      break;
                    default:
                      if ($.isFunction(opts.casing)) {
                        var args = Array.prototype.slice.call(arguments);
                        args.push(getMaskSet().validPositions), elem = opts.casing.apply(this, args)
                      }
                  }
                  return elem
                }(elem, test, validatedPos)
              }), fromSetValid, isSelection(pos)) || (rslt = !1), !1)
            }
          }), rslt
        }

        function setValidPosition(pos, validTest, fromSetValid, isSelection) {
          if (isSelection || opts.insertMode && getMaskSet().validPositions[pos] !== undefined && fromSetValid === undefined) {
            var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions),
              lvp = getLastValidPosition(undefined, !0);
            for (i = pos; i <= lvp; i++) delete getMaskSet().validPositions[i];
            getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
            var j, valid = !0,
              vps = getMaskSet().validPositions,
              needsValidation = !1,
              initialLength = getMaskSet().maskLength;
            for (i = j = pos; i <= lvp; i++) {
              var t = positionsClone[i];
              if (t !== undefined)
                for (var posMatch = j; posMatch < getMaskSet().maskLength && (null === t.match.fn && vps[i] && (!0 === vps[i].match.optionalQuantifier || !0 === vps[i].match.optionality) || null != t.match.fn);) {
                  if (posMatch++, !1 === needsValidation && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def) getMaskSet().validPositions[posMatch] = $.extend(!0, {}, positionsClone[posMatch]), getMaskSet().validPositions[posMatch].input = t.input, fillMissingNonMask(posMatch), j = posMatch, valid = !0;
                  else if (positionCanMatchDefinition(posMatch, t.match.def)) {
                    var result = isValid(posMatch, t.input, !0, !0);
                    valid = !1 !== result, j = result.caret || result.insert ? getLastValidPosition() : posMatch, needsValidation = !0
                  } else if (!(valid = !0 === t.generatedInput) && posMatch >= getMaskSet().maskLength - 1) break;
                  if (getMaskSet().maskLength < initialLength && (getMaskSet().maskLength = initialLength), valid) break
                }
              if (!valid) break
            }
            if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), resetMaskSet(!0), !1
          } else getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
          return resetMaskSet(!0), !0
        }

        function fillMissingNonMask(maskPos) {
          for (var pndx = maskPos - 1; - 1 < pndx && !getMaskSet().validPositions[pndx]; pndx--);
          var testTemplate, testsFromPos;
          for (pndx++; pndx < maskPos; pndx++) getMaskSet().validPositions[pndx] === undefined && (!1 === opts.jitMasking || opts.jitMasking > pndx) && ("" === (testsFromPos = getTests(pndx, getTestTemplate(pndx - 1).locator, pndx - 1).slice())[testsFromPos.length - 1].match.def && testsFromPos.pop(), (testTemplate = determineTestTemplate(testsFromPos)) && (testTemplate.match.def === opts.radixPointDefinitionSymbol || !isMask(pndx, !0) || $.inArray(opts.radixPoint, getBuffer()) < pndx && testTemplate.match.fn && testTemplate.match.fn.test(getPlaceholder(pndx), getMaskSet(), pndx, !1, opts)) && !1 !== (result = _isValid(pndx, getPlaceholder(pndx, testTemplate.match, !0) || (null == testTemplate.match.fn ? testTemplate.match.def : "" !== getPlaceholder(pndx) ? getPlaceholder(pndx) : getBuffer()[pndx]), !0)) && (getMaskSet().validPositions[result.pos || pndx].generatedInput = !0))
        }
        strict = !0 === strict;
        var maskPos = pos;
        pos.begin !== undefined && (maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin);
        var result = !0,
          positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
        if ($.isFunction(opts.preValidation) && !strict && !0 !== fromSetValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts)), !0 === result) {
          if (fillMissingNonMask(maskPos), isSelection(pos) && (handleRemove(undefined, Inputmask.keyCode.DELETE, pos, !0, !0), maskPos = getMaskSet().p), maskPos < getMaskSet().maskLength && (maxLength === undefined || maskPos < maxLength) && (result = _isValid(maskPos, c, strict), (!strict || !0 === fromSetValid) && !1 === result && !0 !== validateOnly)) {
            var currentPosValid = getMaskSet().validPositions[maskPos];
            if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
              if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && !isMask(maskPos, !0))
                for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++)
                  if (!1 !== (result = _isValid(nPos, c, strict))) {
                    ! function(originalPos, newPos) {
                      var vp = getMaskSet().validPositions[newPos];
                      if (vp)
                        for (var targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; ps < newPos; ps++)
                          if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, !0)) {
                            var tests = getTests(ps).slice(),
                              bestMatch = determineTestTemplate(tests, !0),
                              equality = -1;
                            "" === tests[tests.length - 1].match.def && tests.pop(), $.each(tests, function(ndx, tst) {
                              for (var i = 0; i < tll; i++) {
                                if (tst.locator[i] === undefined || !checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(","), tst.na)) {
                                  var targetAI = targetLocator[i],
                                    bestMatchAI = bestMatch.locator[i],
                                    tstAI = tst.locator[i];
                                  targetAI - bestMatchAI > Math.abs(targetAI - tstAI) && (bestMatch = tst);
                                  break
                                }
                                equality < i && (equality = i, bestMatch = tst)
                              }
                            }), (bestMatch = $.extend({}, bestMatch, {
                              input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def
                            })).generatedInput = !0, setValidPosition(ps, bestMatch, !0), getMaskSet().validPositions[newPos] = undefined, _isValid(newPos, vp.input, !0)
                          }
                    }(maskPos, result.pos !== undefined ? result.pos : nPos), maskPos = nPos;
                    break
                  }
            } else result = {
              caret: seekNext(maskPos)
            }
          }!1 === result && opts.keepStatic && !strict && !0 !== fromAlternate && (result = function(pos, c, strict) {
            var lastAlt, alternation, altPos, prevAltPos, i, validPos, altNdxs, decisionPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions),
              isValidRslt = !1,
              lAltPos = getLastValidPosition();
            for (prevAltPos = getMaskSet().validPositions[lAltPos]; 0 <= lAltPos; lAltPos--)
              if ((altPos = getMaskSet().validPositions[lAltPos]) && altPos.alternation !== undefined) {
                if (lastAlt = lAltPos, alternation = getMaskSet().validPositions[lastAlt].alternation, prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                prevAltPos = altPos
              } if (alternation !== undefined) {
              decisionPos = parseInt(lastAlt);
              var decisionTaker = prevAltPos.locator[prevAltPos.alternation || alternation] !== undefined ? prevAltPos.locator[prevAltPos.alternation || alternation] : altNdxs[0];
              0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]);
              var possibilityPos = getMaskSet().validPositions[decisionPos],
                prevPos = getMaskSet().validPositions[decisionPos - 1];
              $.each(getTests(decisionPos, prevPos ? prevPos.locator : undefined, decisionPos - 1), function(ndx, test) {
                altNdxs = test.locator[alternation] ? test.locator[alternation].toString().split(",") : [];
                for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                  var validInputs = [],
                    staticInputsBeforePos = 0,
                    staticInputsBeforePosAlternate = 0,
                    verifyValidInput = !1;
                  if (decisionTaker < altNdxs[mndx] && (test.na === undefined || -1 === $.inArray(altNdxs[mndx], test.na.split(",")) || -1 === $.inArray(decisionTaker.toString(), altNdxs))) {
                    getMaskSet().validPositions[decisionPos] = $.extend(!0, {}, test);
                    var possibilities = getMaskSet().validPositions[decisionPos].locator;
                    for (getMaskSet().validPositions[decisionPos].locator[alternation] = parseInt(altNdxs[mndx]), null == test.match.fn ? (possibilityPos.input !== test.match.def && ((verifyValidInput = !0) !== possibilityPos.generatedInput && validInputs.push(possibilityPos.input)), staticInputsBeforePosAlternate++, getMaskSet().validPositions[decisionPos].generatedInput = !/[0-9a-bA-Z]/.test(test.match.def), getMaskSet().validPositions[decisionPos].input = test.match.def) : getMaskSet().validPositions[decisionPos].input = possibilityPos.input, i = decisionPos + 1; i < getLastValidPosition(undefined, !0) + 1; i++)(validPos = getMaskSet().validPositions[i]) && !0 !== validPos.generatedInput && /[0-9a-bA-Z]/.test(validPos.input) ? validInputs.push(validPos.input) : i < pos && staticInputsBeforePos++, delete getMaskSet().validPositions[i];
                    for (verifyValidInput && validInputs[0] === test.match.def && validInputs.shift(), resetMaskSet(!0), isValidRslt = !0; 0 < validInputs.length;) {
                      var input = validInputs.shift();
                      if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition(undefined, !0) + 1, input, !1, fromSetValid, !0))) break
                    }
                    if (isValidRslt) {
                      getMaskSet().validPositions[decisionPos].locator = possibilities;
                      var targetLvp = getLastValidPosition(pos) + 1;
                      for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++)((validPos = getMaskSet().validPositions[i]) === undefined || null == validPos.match.fn) && i < pos + (staticInputsBeforePosAlternate - staticInputsBeforePos) && staticInputsBeforePosAlternate++;
                      isValidRslt = isValid((pos += staticInputsBeforePosAlternate - staticInputsBeforePos) > targetLvp ? targetLvp : pos, c, strict, fromSetValid, !0)
                    }
                    if (isValidRslt) return !1;
                    resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone)
                  }
                }
              })
            }
            return isValidRslt
          }(maskPos, c, strict)), !0 === result && (result = {
            pos: maskPos
          })
        }
        if ($.isFunction(opts.postValidation) && !1 !== result && !strict && !0 !== fromSetValid && !0 !== validateOnly) {
          var postResult = opts.postValidation(getBuffer(!0), result, opts);
          if (postResult.refreshFromBuffer && postResult.buffer) {
            var refresh = postResult.refreshFromBuffer;
            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, postResult.buffer)
          }
          result = !0 === postResult ? result : postResult
        }
        return result && result.pos === undefined && (result.pos = maskPos), !1 !== result && !0 !== validateOnly || (resetMaskSet(!0), getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result
      }

      function isMask(pos, strict) {
        var test = getTestTemplate(pos).match;
        if ("" === test.def && (test = getTest(pos).match), null != test.fn) return test.fn;
        if (!0 !== strict && -1 < pos) {
          var tests = getTests(pos);
          return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)
        }
        return !1
      }

      function seekNext(pos, newBlock) {
        var maskL = getMaskSet().maskLength;
        if (maskL <= pos) return maskL;
        var position = pos;
        for (1 < getTests(maskL + 1).length && (getMaskTemplate(!0, maskL + 1, !0), maskL = getMaskSet().maskLength); ++position < maskL && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position)) || !0 !== newBlock && !isMask(position)););
        return position
      }

      function seekPrevious(pos, newBlock) {
        var tests, position = pos;
        if (position <= 0) return 0;
        for (; 0 < --position && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position) && ((tests = getTests(position)).length < 2 || 2 === tests.length && "" === tests[1].match.def)););
        return position
      }

      function getBufferElement(position) {
        return getMaskSet().validPositions[position] === undefined ? getPlaceholder(position) : getMaskSet().validPositions[position].input
      }

      function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
        if (event && $.isFunction(opts.onBeforeWrite)) {
          var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
          if (result) {
            if (result.refreshFromBuffer) {
              var refresh = result.refreshFromBuffer;
              refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = getBuffer(!0)
            }
            caretPos !== undefined && (caretPos = result.caret !== undefined ? result.caret : caretPos)
          }
        }
        input !== undefined && (input.inputmask._valueSet(buffer.join("")), caretPos === undefined || event !== undefined && "blur" === event.type ? renderColorMask(input, caretPos, 0 === buffer.length) : android && event && "input" === event.type ? setTimeout(function() {
          caret(input, caretPos)
        }, 0) : caret(input, caretPos), !0 === triggerInputEvent && (skipInputEvent = !0, $(input).trigger("input")))
      }

      function getPlaceholder(pos, test, returnPL) {
        if ((test = test || getTest(pos).match).placeholder !== undefined || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
        if (null !== test.fn) return opts.placeholder.charAt(pos % opts.placeholder.length);
        if (-1 < pos && getMaskSet().validPositions[pos] === undefined) {
          var prevTest, tests = getTests(pos),
            staticAlternations = [];
          if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0))
            for (var i = 0; i < tests.length; i++)
              if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (null === tests[i].match.fn || prevTest === undefined || !1 !== tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts)) && (staticAlternations.push(tests[i]), null === tests[i].match.fn && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length)
        }
        return test.def
      }

      function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
        var inputValue = nptvl.slice(),
          charCodes = "",
          initialNdx = -1,
          result = undefined;
        if (resetMaskSet(), strict || !0 === opts.autoUnmask) initialNdx = seekNext(initialNdx);
        else {
          var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""),
            matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
          matches && 0 < matches.length && (inputValue.splice(0, matches.length * staticInput.length), initialNdx = seekNext(initialNdx))
        }
        if (-1 === initialNdx ? (getMaskSet().p = seekNext(initialNdx), initialNdx = 0) : getMaskSet().p = initialNdx, $.each(inputValue, function(ndx, charCode) {
            if (charCode !== undefined)
              if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, undefined, undefined, !0)) getMaskSet().p++;
              else {
                var keypress = new $.Event("_checkval");
                keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                var lvp = getLastValidPosition(undefined, !0),
                  lvTest = getMaskSet().validPositions[lvp],
                  nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : undefined, lvp);
                if (! function(ndx, charCodes) {
                    return -1 !== getBufferTemplate().slice(ndx, seekNext(ndx)).join("").indexOf(charCodes) && !isMask(ndx) && getTest(ndx).match.nativeDef === charCodes.charAt(charCodes.length - 1)
                  }(initialNdx, charCodes) || strict || opts.autoUnmask) {
                  var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                  result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, pos), initialNdx = pos + 1, charCodes = ""
                } else result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
                if (!1 !== result && !strict && $.isFunction(opts.onBeforeWrite)) {
                  var origResult = result;
                  if (result = opts.onBeforeWrite.call(inputmask, keypress, getBuffer(), result.forwardPosition, opts), (result = $.extend(origResult, result)) && result.refreshFromBuffer) {
                    var refresh = result.refreshFromBuffer;
                    refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer), resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret, result.forwardPosition = result.caret)
                  }
                }
              }
          }), writeOut) {
          var caretPos = undefined;
          document.activeElement === input && result && (caretPos = opts.numericInput ? seekPrevious(result.forwardPosition) : result.forwardPosition), writeBuffer(input, getBuffer(), caretPos, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type)
        }
      }

      function unmaskedvalue(input) {
        if (input) {
          if (input.inputmask === undefined) return input.value;
          input.inputmask && input.inputmask.refreshValue && EventHandlers.setValueEvent.call(input)
        }
        var umValue = [],
          vps = getMaskSet().validPositions;
        for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
        var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
        if ($.isFunction(opts.onUnMask)) {
          var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
          unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts)
        }
        return unmaskedValue
      }

      function caret(input, begin, end, notranslate) {
        function translatePosition(pos) {
          return !0 === notranslate || !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || (pos = getBuffer().join("").length - pos), pos
        }
        var range;
        if (begin === undefined) return input.setSelectionRange ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset) : document.selection && document.selection.createRange && (end = (begin = 0 - (range = document.selection.createRange()).duplicate().moveStart("character", -input.inputmask._valueGet().length)) + range.text.length), {
          begin: translatePosition(begin),
          end: translatePosition(end)
        };
        if (begin.begin !== undefined && (end = begin.end, begin = begin.begin), "number" == typeof begin) {
          begin = translatePosition(begin), end = "number" == typeof(end = translatePosition(end)) ? end : begin;
          var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
          if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, mobile || !1 !== opts.insertMode || begin !== end || end++, input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end;
          else if (window.getSelection) {
            if (range = document.createRange(), input.firstChild === undefined || null === input.firstChild) {
              var textNode = document.createTextNode("");
              input.appendChild(textNode)
            }
            range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);
            var sel = window.getSelection();
            sel.removeAllRanges(), sel.addRange(range)
          } else input.createTextRange && ((range = input.createTextRange()).collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select());
          renderColorMask(input, {
            begin: begin,
            end: end
          })
        }
      }

      function determineLastRequiredPosition(returnDefinition) {
        var pos, testPos, buffer = getBuffer(),
          bl = buffer.length,
          lvp = getLastValidPosition(),
          positions = {},
          lvTest = getMaskSet().validPositions[lvp],
          ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined;
        for (pos = lvp + 1; pos < buffer.length; pos++) ndxIntlzr = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
        var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
        for (pos = bl - 1; lvp < pos && ((testPos = positions[pos]).match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match); pos--) bl--;
        return returnDefinition ? {
          l: bl,
          def: positions[bl] ? positions[bl].match : undefined
        } : bl
      }

      function clearOptionalTail(buffer) {
        for (var validPos, rl = determineLastRequiredPosition(), bl = buffer.length, lv = getMaskSet().validPositions[getLastValidPosition()]; rl < bl && !isMask(rl, !0) && (validPos = lv !== undefined ? getTestTemplate(rl, lv.locator.slice(""), lv) : getTest(rl)) && !0 !== validPos.match.optionality && (!0 !== validPos.match.optionalQuantifier && !0 !== validPos.match.newBlockMarker || rl + 1 === bl && "" === (lv !== undefined ? getTestTemplate(rl + 1, lv.locator.slice(""), lv) : getTest(rl + 1)).match.def);) rl++;
        for (;
          (validPos = getMaskSet().validPositions[rl - 1]) && validPos && validPos.match.optionality && validPos.input === opts.skipOptionalPartCharacter;) rl--;
        return buffer.splice(rl), buffer
      }

      function isComplete(buffer) {
        if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
        if ("*" === opts.repeat) return undefined;
        var complete = !1,
          lrp = determineLastRequiredPosition(!0),
          aml = seekPrevious(lrp.l);
        if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
          complete = !0;
          for (var i = 0; i <= aml; i++) {
            var test = getTestTemplate(i).match;
            if (null !== test.fn && getMaskSet().validPositions[i] === undefined && !0 !== test.optionality && !0 !== test.optionalQuantifier || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
              complete = !1;
              break
            }
          }
        }
        return complete
      }

      function handleRemove(input, k, pos, strict, fromIsValid) {
        if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), isRTL)) {
          var pend = pos.end;
          pos.end = pos.begin, pos.begin = pend
        }
        k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || !1 === opts.insertMode) ? (pos.begin = seekPrevious(pos.begin), getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext(pos.end) + 1, getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.end++), stripValidPositions(pos.begin, pos.end, !1, strict), !0 !== strict && function() {
          if (opts.keepStatic) {
            for (var validInputs = [], lastAlt = getLastValidPosition(-1, !0), positionsClone = $.extend(!0, {}, getMaskSet().validPositions), prevAltPos = getMaskSet().validPositions[lastAlt]; 0 <= lastAlt; lastAlt--) {
              var altPos = getMaskSet().validPositions[lastAlt];
              if (altPos) {
                if (!0 !== altPos.generatedInput && /[0-9a-bA-Z]/.test(altPos.input) && validInputs.push(altPos.input), delete getMaskSet().validPositions[lastAlt], altPos.alternation !== undefined && altPos.locator[altPos.alternation] !== prevAltPos.locator[altPos.alternation]) break;
                prevAltPos = altPos
              }
            }
            if (-1 < lastAlt)
              for (getMaskSet().p = seekNext(getLastValidPosition(-1, !0)); 0 < validInputs.length;) {
                var keypress = new $.Event("keypress");
                keypress.which = validInputs.pop().charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p)
              } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone)
          }
        }();
        var lvp = getLastValidPosition(pos.begin, !0);
        if (lvp < pos.begin) getMaskSet().p = seekNext(lvp);
        else if (!0 !== strict && (getMaskSet().p = pos.begin, !0 !== fromIsValid))
          for (; getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined;) getMaskSet().p++
      }

      function initializeColorMask(input) {
        var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null),
          template = document.createElement("div");
        template.style.width = computedStyle.width, template.style.textAlign = computedStyle.textAlign, (colorMask = document.createElement("div")).className = "im-colormask", input.parentNode.insertBefore(colorMask, input), input.parentNode.removeChild(input), colorMask.appendChild(template), colorMask.appendChild(input), input.style.left = template.offsetLeft + "px", $(input).on("click", function(e) {
          return caret(input, function(clientx) {
            var caretPos, e = document.createElement("span");
            for (var style in computedStyle) isNaN(style) && -1 !== style.indexOf("font") && (e.style[style] = computedStyle[style]);
            e.style.textTransform = computedStyle.textTransform, e.style.letterSpacing = computedStyle.letterSpacing, e.style.position = "absolute", e.style.height = "auto", e.style.width = "auto", e.style.visibility = "hidden", e.style.whiteSpace = "nowrap", document.body.appendChild(e);
            var itl, inputText = input.inputmask._valueGet(),
              previousWidth = 0;
            for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
              if (e.innerHTML += inputText.charAt(caretPos) || "_", e.offsetWidth >= clientx) {
                var offset1 = clientx - previousWidth,
                  offset2 = e.offsetWidth - clientx;
                e.innerHTML = inputText.charAt(caretPos), caretPos = (offset1 -= e.offsetWidth / 3) < offset2 ? caretPos - 1 : caretPos;
                break
              }
              previousWidth = e.offsetWidth
            }
            return document.body.removeChild(e), caretPos
          }(e.clientX)), EventHandlers.clickEvent.call(input, [e])
        }), $(input).on("keydown", function(e) {
          e.shiftKey || !1 === opts.insertMode || setTimeout(function() {
            renderColorMask(input)
          }, 0)
        })
      }

      function renderColorMask(input, caretPos, clear) {
        function handleStatic() {
          isStatic || null !== test.fn && testPos.input !== undefined ? isStatic && (null !== test.fn && testPos.input !== undefined || "" === test.def) && (isStatic = !1, maskTemplate += "</span>") : (isStatic = !0, maskTemplate += "<span class='im-static'>")
        }

        function handleCaret(force) {
          !0 !== force && pos !== caretPos.begin || document.activeElement !== input || (maskTemplate += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>")
        }
        var test, testPos, ndxIntlzr, maskTemplate = "",
          isStatic = !1,
          pos = 0;
        if (colorMask !== undefined) {
          var buffer = getBuffer();
          if (caretPos === undefined ? caretPos = caret(input) : caretPos.begin === undefined && (caretPos = {
              begin: caretPos,
              end: caretPos
            }), !0 !== clear) {
            for (var lvp = getLastValidPosition(); handleCaret(), getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), handleStatic(), maskTemplate += buffer[pos]) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && (handleStatic(), maskTemplate += getPlaceholder(pos, test))), pos++, (maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || pos < lvp || isStatic;); - 1 === maskTemplate.indexOf("im-caret") && handleCaret(!0), isStatic && handleStatic()
          }
          var template = colorMask.getElementsByTagName("div")[0];
          template.innerHTML = maskTemplate, input.inputmask.positionColorMask(input, template)
        }
      }
      maskset = maskset || this.maskset, opts = opts || this.opts;
      var undoValue, $el, maxLength, colorMask, valueBuffer, inputmask = this,
        el = this.el,
        isRTL = this.isRTL,
        skipKeyPressEvent = !1,
        skipInputEvent = !1,
        ignorable = !1,
        mouseEnter = !1,
        EventRuler = {
          on: function(input, eventName, eventHandler) {
            function ev(e) {
              if (this.inputmask === undefined && "FORM" !== this.nodeName) {
                var imOpts = $.data(this, "_inputmask_opts");
                imOpts ? new Inputmask(imOpts).mask(this) : EventRuler.off(this)
              } else {
                if ("setvalue" === e.type || "FORM" === this.nodeName || !(this.disabled || this.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                  switch (e.type) {
                    case "input":
                      if (!0 === skipInputEvent) return skipInputEvent = !1, e.preventDefault();
                      break;
                    case "keydown":
                      skipInputEvent = skipKeyPressEvent = !1;
                      break;
                    case "keypress":
                      if (!0 === skipKeyPressEvent) return e.preventDefault();
                      skipKeyPressEvent = !0;
                      break;
                    case "click":
                      if (iemobile || iphone) {
                        var that = this,
                          args = arguments;
                        return setTimeout(function() {
                          eventHandler.apply(that, args)
                        }, 0), !1
                      }
                  }
                  var returnVal = eventHandler.apply(this, arguments);
                  return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal
                }
                e.preventDefault()
              }
            }
            input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev)
          },
          off: function(input, event) {
            var events;
            input.inputmask && input.inputmask.events && (event ? (events = [])[event] = input.inputmask.events[event] : events = input.inputmask.events, $.each(events, function(eventName, evArr) {
              for (; 0 < evArr.length;) {
                var ev = evArr.pop(); - 1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev)
              }
              delete input.inputmask.events[eventName]
            }))
          }
        },
        EventHandlers = {
          keydownEvent: function(e) {
            var el, isSupported, input = this,
              $input = $(input),
              k = e.keyCode,
              pos = caret(input);
            if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && (el = document.createElement("input"), (isSupported = "oncut" in el) || (el.setAttribute("oncut", "return;"), isSupported = "function" == typeof el.oncut), el = null, !isSupported)) e.preventDefault(), handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join("")), input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(getBuffer()) && $input.trigger("complete");
            else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
              e.preventDefault();
              var caretPos = seekNext(getLastValidPosition());
              opts.insertMode || caretPos !== getMaskSet().maskLength || e.shiftKey || caretPos--, caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0)
            } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? (!0 === e.shiftKey ? (null === getTest(pos.begin).match.fn && (pos.begin = seekNext(pos.begin)), pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), pos.end = seekNext(pos.begin, !0), pos.end < getMaskSet().maskLength && pos.end--), pos.begin < getMaskSet().maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || !1 === opts.insertMode && (k === Inputmask.keyCode.RIGHT ? setTimeout(function() {
              var caretPos = caret(input);
              caret(input, caretPos.begin)
            }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function() {
              var caretPos = caret(input);
              caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1)
            }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskSet().maskLength ? pos.begin : pos.begin - 1));
            opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables)
          },
          keypressEvent: function(e, checkval, writeOut, strict, ndx) {
            var input = this,
              $input = $(input),
              k = e.which || e.charCode || e.keyCode;
            if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), setTimeout(function() {
              $input.trigger("change")
            }, 0)), !0;
            if (k) {
              46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
              var forwardPosition, pos = checkval ? {
                  begin: ndx,
                  end: ndx
                } : caret(input),
                c = String.fromCharCode(k);
              getMaskSet().writeOutBuffer = !0;
              var valResult = isValid(pos, c, strict);
              if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = valResult.caret !== undefined ? valResult.caret : checkval ? valResult.pos + 1 : seekNext(valResult.pos), getMaskSet().p = forwardPosition), !1 !== writeOut && (setTimeout(function() {
                  opts.onKeyValidation.call(input, k, valResult, opts)
                }, 0), getMaskSet().writeOutBuffer && !1 !== valResult)) {
                var buffer = getBuffer();
                writeBuffer(input, buffer, opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition, e, !0 !== checkval), !0 !== checkval && setTimeout(function() {
                  !0 === isComplete(buffer) && $input.trigger("complete")
                }, 0)
              }
              if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult
            }
          },
          pasteEvent: function(e) {
            var tempValue, ev = e.originalEvent || e,
              $input = $(this),
              inputValue = this.inputmask._valueGet(!0),
              caretPos = caret(this);
            isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
            var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
              valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
            if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
            else {
              if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
              inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret
            }
            var pasteValue = inputValue;
            if ($.isFunction(opts.onBeforePaste)) {
              if (!1 === (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts))) return e.preventDefault();
              pasteValue = pasteValue || inputValue
            }
            return checkVal(this, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), writeBuffer(this, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), !0 === isComplete(getBuffer()) && $input.trigger("complete"), e.preventDefault()
          },
          inputFallBackEvent: function(e) {
            var input = this,
              inputValue = input.inputmask._valueGet();
            if (getBuffer().join("") !== inputValue) {
              var caretPos = caret(input);
              if (!1 === function(input, inputValue, caretPos) {
                  if ("." === inputValue.charAt(caretPos.begin - 1) && "" !== opts.radixPoint && ((inputValue = inputValue.split(""))[caretPos.begin - 1] = opts.radixPoint.charAt(0), inputValue = inputValue.join("")), inputValue.charAt(caretPos.begin - 1) === opts.radixPoint && inputValue.length > getBuffer().length) {
                    var keypress = new $.Event("keypress");
                    return keypress.which = opts.radixPoint.charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !0, !1, caretPos.begin - 1), !1
                  }
                }(input, inputValue, caretPos)) return !1;
              if (inputValue = inputValue.replace(new RegExp("(" + Inputmask.escapeRegex(getBufferTemplate().join("")) + ")*"), ""), !1 === function(input, inputValue, caretPos) {
                  if (iemobile) {
                    var inputChar = inputValue.replace(getBuffer().join(""), "");
                    if (1 === inputChar.length) {
                      var keypress = new $.Event("keypress");
                      return keypress.which = inputChar.charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !0, !1, getMaskSet().validPositions[caretPos.begin - 1] ? caretPos.begin : caretPos.begin - 1), !1
                    }
                  }
                }(input, inputValue, caretPos)) return !1;
              caretPos.begin > inputValue.length && (caret(input, inputValue.length), caretPos = caret(input));
              var buffer = getBuffer().join(""),
                frontPart = inputValue.substr(0, caretPos.begin),
                backPart = inputValue.substr(caretPos.begin),
                frontBufferPart = buffer.substr(0, caretPos.begin),
                backBufferPart = buffer.substr(caretPos.begin),
                selection = caretPos,
                entries = "",
                isEntry = !1;
              if (frontPart !== frontBufferPart) {
                selection.begin = 0;
                for (var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length, i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) selection.begin++;
                isEntry && (entries += frontPart.slice(selection.begin, selection.end))
              }
              backPart !== backBufferPart && (backPart.length > backBufferPart.length ? isEntry && (selection.end = selection.begin) : backPart.length < backBufferPart.length ? selection.end += backBufferPart.length - backPart.length : backPart.charAt(0) !== backBufferPart.charAt(0) && selection.end++), writeBuffer(input, getBuffer(), selection), 0 < entries.length ? $.each(entries.split(""), function(ndx, entry) {
                var keypress = new $.Event("keypress");
                keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress)
              }) : (selection.begin === selection.end - 1 && caret(input, seekPrevious(selection.begin + 1), selection.end), e.keyCode = Inputmask.keyCode.DELETE, EventHandlers.keydownEvent.call(input, e)), e.preventDefault()
            }
          },
          setValueEvent: function(e) {
            this.inputmask.refreshValue = !1;
            var value = this.inputmask._valueGet(!0);
            $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.split(""), checkVal(this, !0, !1, isRTL ? value.reverse() : value), undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && this.inputmask._valueGet() === getBufferTemplate().join("") && this.inputmask._valueSet("")
          },
          focusEvent: function(e) {
            var nptValue = this.inputmask._valueGet();
            opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) && (this.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(this, getBuffer(), seekNext(getLastValidPosition())) : !1 === mouseEnter && caret(this, seekNext(getLastValidPosition()))), !0 === opts.positionCaretOnTab && !1 === mouseEnter && "" !== nptValue && (writeBuffer(this, getBuffer(), caret(this)), EventHandlers.clickEvent.apply(this, [e, !0])), undoValue = getBuffer().join("")
          },
          mouseleaveEvent: function(e) {
            if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== this) {
              var buffer = getBuffer().slice(),
                nptValue = this.inputmask._valueGet();
              nptValue !== this.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), writeBuffer(this, buffer))
            }
          },
          clickEvent: function(e, tabbed) {
            var input = this;
            setTimeout(function() {
              if (document.activeElement === input) {
                var selectedCaret = caret(input);
                if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                  case "none":
                    break;
                  case "radixFocus":
                    if (function(clickPos) {
                        if ("" !== opts.radixPoint) {
                          var vps = getMaskSet().validPositions;
                          if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
                            if (clickPos < seekNext(-1)) return !0;
                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                            if (-1 !== radixPos) {
                              for (var vp in vps)
                                if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                              return !0
                            }
                          }
                        }
                        return !1
                      }(selectedCaret.begin)) {
                      var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                      caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                      break
                    }
                    default:
                      var clickPosition = selectedCaret.begin,
                        lvclickPosition = getLastValidPosition(clickPosition, !0),
                        lastPosition = seekNext(lvclickPosition);
                      if (clickPosition < lastPosition) caret(input, isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition));
                      else {
                        var lvp = getMaskSet().validPositions[lvclickPosition],
                          tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp),
                          placeholder = getPlaceholder(lastPosition, tt.match);
                        if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, !0) && tt.match.def === placeholder) {
                          var newPos = seekNext(lastPosition);
                          (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos)
                        }
                        caret(input, lastPosition)
                      }
                }
              }
            }, 0)
          },
          dblclickEvent: function(e) {
            var input = this;
            setTimeout(function() {
              caret(input, 0, seekNext(getLastValidPosition()))
            }, 0)
          },
          cutEvent: function(e) {
            var $input = $(this),
              pos = caret(this),
              ev = e.originalEvent || e,
              clipboardData = window.clipboardData || ev.clipboardData,
              clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
            clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), handleRemove(this, Inputmask.keyCode.DELETE, pos), writeBuffer(this, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), this.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared")
          },
          blurEvent: function(e) {
            var $input = $(this);
            if (this.inputmask) {
              var nptValue = this.inputmask._valueGet(),
                buffer = getBuffer().slice();
              "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), !1 === isComplete(buffer) && (setTimeout(function() {
                $input.trigger("incomplete")
              }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), writeBuffer(this, buffer, undefined, e)), undoValue !== getBuffer().join("") && (undoValue = buffer.join(""), $input.trigger("change"))
            }
          },
          mouseenterEvent: function(e) {
            mouseEnter = !0, document.activeElement !== this && opts.showMaskOnHover && this.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(this, getBuffer())
          },
          submitEvent: function(e) {
            undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), setTimeout(function() {
              writeBuffer(el, getBuffer())
            }, 0))
          },
          resetEvent: function(e) {
            el.inputmask.refreshValue = !0, setTimeout(function() {
              $el.trigger("setvalue")
            }, 0)
          }
        };
      if (Inputmask.prototype.positionColorMask = function(input, template) {
          input.style.left = template.offsetLeft + "px"
        }, actionObj !== undefined) switch (actionObj.action) {
        case "isComplete":
          return el = actionObj.el, isComplete(getBuffer());
        case "unmaskedvalue":
          return el !== undefined && actionObj.value === undefined || (valueBuffer = actionObj.value, valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer).split(""), checkVal(undefined, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts)), unmaskedvalue(el);
        case "mask":
          ! function(elem) {
            EventRuler.off(elem);
            var isSupported = function(input, opts) {
              var elementType = input.getAttribute("type"),
                isSupported = "INPUT" === input.tagName && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "TEXTAREA" === input.tagName;
              if (!isSupported)
                if ("INPUT" === input.tagName) {
                  var el = document.createElement("input");
                  el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null
                } else isSupported = "partial";
              return !1 !== isSupported ? function(npt) {
                function getter() {
                  return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this)
                }

                function setter(value) {
                  valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue")
                }
                var valueGet, valueSet;
                if (!npt.inputmask.__valueGet) {
                  if (!0 !== opts.noValuePatching) {
                    if (Object.getOwnPropertyDescriptor) {
                      "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function(object) {
                        return object.__proto__
                      } : function(object) {
                        return object.constructor.prototype
                      });
                      var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
                      valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                        get: getter,
                        set: setter,
                        configurable: !0
                      })) : "INPUT" !== npt.tagName && (valueGet = function() {
                        return this.textContent
                      }, valueSet = function(value) {
                        this.textContent = value
                      }, Object.defineProperty(npt, "value", {
                        get: getter,
                        set: setter,
                        configurable: !0
                      }))
                    } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));
                    npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet
                  }
                  npt.inputmask._valueGet = function(overruleRTL) {
                    return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el)
                  }, npt.inputmask._valueSet = function(value, overruleRTL) {
                    valueSet.call(this.el, null === value || value === undefined ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value)
                  }, valueGet === undefined && (valueGet = function() {
                    return this.value
                  }, valueSet = function(value) {
                    this.value = value
                  }, function(type) {
                    if ($.valHooks && ($.valHooks[type] === undefined || !0 !== $.valHooks[type].inputmaskpatch)) {
                      var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                          return elem.value
                        },
                        valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                          return elem.value = value, elem
                        };
                      $.valHooks[type] = {
                        get: function(elem) {
                          if (elem.inputmask) {
                            if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                            var result = valhookGet(elem);
                            return -1 !== getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : ""
                          }
                          return valhookGet(elem)
                        },
                        set: function(elem, value) {
                          var result, $elem = $(elem);
                          return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue"), result
                        },
                        inputmaskpatch: !0
                      }
                    }
                  }(npt.type), function(npt) {
                    EventRuler.on(npt, "mouseenter", function(event) {
                      var $input = $(this);
                      this.inputmask._valueGet() !== getBuffer().join("") && $input.trigger("setvalue")
                    })
                  }(npt))
                }
              }(input) : input.inputmask = undefined, isSupported
            }(elem, opts);
            if (!1 !== isSupported && ($el = $(el = elem), -1 === (maxLength = el !== undefined ? el.maxLength : undefined) && (maxLength = undefined), !0 === opts.colorMask && initializeColorMask(el), android && (el.hasOwnProperty("inputmode") && (el.inputmode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), "rtfm" === opts.androidHack && (!0 !== opts.colorMask && initializeColorMask(el), el.type = "password")), !0 === isSupported && (EventRuler.on(el, "submit", EventHandlers.submitEvent), EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), !0 !== opts.colorMask && EventRuler.on(el, "click", EventHandlers.clickEvent), EventRuler.on(el, "dblclick", EventHandlers.dblclickEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), EventRuler.on(el, "dragdrop", EventHandlers.pasteEvent), EventRuler.on(el, "drop", EventHandlers.pasteEvent), EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), android || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "compositionstart", $.noop), EventRuler.on(el, "compositionupdate", $.noop), EventRuler.on(el, "compositionend", $.noop), EventRuler.on(el, "keyup", $.noop), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), EventRuler.on(el, "beforeinput", $.noop)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
              var initialValue = $.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(!0), opts) || el.inputmask._valueGet(!0);
              "" !== initialValue && checkVal(el, !0, !1, isRTL ? initialValue.split("").reverse() : initialValue.split(""));
              var buffer = getBuffer().slice();
              undoValue = buffer.join(""), !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()))
            }
          }(el);
          break;
        case "format":
          return valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal(undefined, !0, !1, isRTL ? valueBuffer.reverse() : valueBuffer), actionObj.metadata ? {
            value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
            metadata: maskScope.call(this, {
              action: "getmetadata"
            }, maskset, opts)
          } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
        case "isValid":
          actionObj.value ? (valueBuffer = actionObj.value.split(""), checkVal(undefined, !0, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
          for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; rl < lmib && !isMask(lmib); lmib--);
          return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");
        case "getemptymask":
          return getBufferTemplate().join("");
        case "remove":
          return el && el.inputmask && ($el = $(el), el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(!0)), EventRuler.off(el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value") && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
            get: el.inputmask.__valueGet,
            set: el.inputmask.__valueSet,
            configurable: !0
          }) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = undefined), el;
        case "getmetadata":
          if ($.isArray(maskset.metadata)) {
            var maskTarget = getMaskTemplate(!0, 0, !1).join("");
            return $.each(maskset.metadata, function(ndx, mtdt) {
              if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1
            }), maskTarget
          }
          return maskset.metadata
      }
    }
    var ua = navigator.userAgent,
      mobile = /mobile/i.test(ua),
      iemobile = /iemobile/i.test(ua),
      iphone = /iphone/i.test(ua) && !iemobile,
      android = /android/i.test(ua) && !iemobile;
    return Inputmask.prototype = {
      dataAttribute: "data-inputmask",
      defaults: {
        placeholder: "_",
        optionalmarker: {
          start: "[",
          end: "]"
        },
        quantifiermarker: {
          start: "{",
          end: "}"
        },
        groupmarker: {
          start: "(",
          end: ")"
        },
        alternatormarker: "|",
        escapeChar: "\\",
        mask: null,
        regex: null,
        oncomplete: $.noop,
        onincomplete: $.noop,
        oncleared: $.noop,
        repeat: 0,
        greedy: !0,
        autoUnmask: !1,
        removeMaskOnSubmit: !1,
        clearMaskOnLostFocus: !0,
        insertMode: !0,
        clearIncomplete: !1,
        alias: null,
        onKeyDown: $.noop,
        onBeforeMask: null,
        onBeforePaste: function(pastedValue, opts) {
          return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue
        },
        onBeforeWrite: null,
        onUnMask: null,
        showMaskOnFocus: !0,
        showMaskOnHover: !0,
        onKeyValidation: $.noop,
        skipOptionalPartCharacter: " ",
        numericInput: !1,
        rightAlign: !1,
        undoOnEscape: !0,
        radixPoint: "",
        radixPointDefinitionSymbol: undefined,
        groupSeparator: "",
        keepStatic: null,
        positionCaretOnTab: !0,
        tabThrough: !1,
        supportsInputType: ["text", "tel", "password"],
        ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
        isComplete: null,
        canClearPosition: $.noop,
        preValidation: null,
        postValidation: null,
        staticDefinitionSymbol: undefined,
        jitMasking: !1,
        nullable: !0,
        inputEventOnly: !1,
        noValuePatching: !1,
        positionCaretOnClick: "lvp",
        casing: null,
        inputmode: "verbatim",
        colorMask: !1,
        androidHack: !1,
        importDataAttributes: !0
      },
      definitions: {
        9: {
          validator: "[0-9１-９]",
          cardinality: 1,
          definitionSymbol: "*"
        },
        a: {
          validator: "[A-Za-zА-яЁёÀ-ÿµ]",
          cardinality: 1,
          definitionSymbol: "*"
        },
        "*": {
          validator: "[0-9１-９A-Za-zА-яЁёÀ-ÿµ]",
          cardinality: 1
        }
      },
      aliases: {},
      masksCache: {},
      mask: function(elems) {
        var that = this;
        return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function(ndx, el) {
          var scopedOpts = $.extend(!0, {}, that.opts);
          ! function(npt, opts, userOptions, dataAttribute) {
            function importOption(option, optionData) {
              null !== (optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option)) && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData)
            }
            if (!0 === opts.importDataAttributes) {
              var option, dataoptions, optionData, p, attrOptions = npt.getAttribute(dataAttribute);
              if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(new RegExp("'", "g"), '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions)
                for (p in optionData = undefined, dataoptions)
                  if ("alias" === p.toLowerCase()) {
                    optionData = dataoptions[p];
                    break
                  } for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), opts) {
                if (dataoptions)
                  for (p in optionData = undefined, dataoptions)
                    if (p.toLowerCase() === option.toLowerCase()) {
                      optionData = dataoptions[p];
                      break
                    } importOption(option, optionData)
              }
            }
            $.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0)
          }(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute);
          var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
          maskset !== undefined && (el.inputmask !== undefined && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(undefined, undefined, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, (el.inputmask.el = el).inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {
            action: "mask"
          }))
        }), elems && elems[0] && elems[0].inputmask || this
      },
      option: function(options, noremask) {
        return "string" == typeof options ? this.opts[options] : "object" == typeof options ? ($.extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0
      },
      unmaskedvalue: function(value) {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "unmaskedvalue",
          value: value
        })
      },
      remove: function() {
        return maskScope.call(this, {
          action: "remove"
        })
      },
      getemptymask: function() {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "getemptymask"
        })
      },
      hasMaskedValue: function() {
        return !this.opts.autoUnmask
      },
      isComplete: function() {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "isComplete"
        })
      },
      getmetadata: function() {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "getmetadata"
        })
      },
      isValid: function(value) {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "isValid",
          value: value
        })
      },
      format: function(value, metadata) {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "format",
          value: value,
          metadata: metadata
        })
      },
      analyseMask: function(mask, regexMask, opts) {
        function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
          this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = {
            min: 1,
            max: 1
          }
        }

        function insertTestDefinition(mtoken, element, position) {
          position = position !== undefined ? position : mtoken.matches.length;
          var prevMatch = mtoken.matches[position - 1];
          if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
            fn: new RegExp(element, opts.casing ? "i" : ""),
            cardinality: 1,
            optionality: mtoken.isOptional,
            newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
            casing: null,
            def: element,
            placeholder: undefined,
            nativeDef: element
          }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function(ndx, lmnt) {
            prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
              fn: null,
              cardinality: 0,
              optionality: mtoken.isOptional,
              newBlockMarker: prevMatch === undefined || prevMatch.def !== lmnt && null !== prevMatch.fn,
              casing: null,
              def: opts.staticDefinitionSymbol || lmnt,
              placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
              nativeDef: lmnt
            })
          })), escaped = !1;
          else {
            var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];
            if (maskdef && !escaped) {
              for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
                var prevalidator = i <= prevalidatorsL ? prevalidators[i - 1] : [],
                  validator = prevalidator.validator,
                  cardinality = prevalidator.cardinality;
                mtoken.matches.splice(position++, 0, {
                  fn: validator ? "string" == typeof validator ? new RegExp(validator, opts.casing ? "i" : "") : new function() {
                    this.test = validator
                  } : new RegExp("."),
                  cardinality: cardinality || 1,
                  optionality: mtoken.isOptional,
                  newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                  casing: maskdef.casing,
                  def: maskdef.definitionSymbol || element,
                  placeholder: maskdef.placeholder,
                  nativeDef: element
                }), prevMatch = mtoken.matches[position - 1]
              }
              mtoken.matches.splice(position++, 0, {
                fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
                  this.test = maskdef.validator
                } : new RegExp("."),
                cardinality: maskdef.cardinality,
                optionality: mtoken.isOptional,
                newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                casing: maskdef.casing,
                def: maskdef.definitionSymbol || element,
                placeholder: maskdef.placeholder,
                nativeDef: element
              })
            } else mtoken.matches.splice(position++, 0, {
              fn: null,
              cardinality: 0,
              optionality: mtoken.isOptional,
              newBlockMarker: prevMatch === undefined || prevMatch.def !== element && null !== prevMatch.fn,
              casing: null,
              def: opts.staticDefinitionSymbol || element,
              placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
              nativeDef: element
            }), escaped = !1
          }
        }

        function defaultCase() {
          if (0 < openenings.length) {
            if (insertTestDefinition(currentOpeningToken = openenings[openenings.length - 1], m), currentOpeningToken.isAlternator) {
              alternator = openenings.pop();
              for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
              0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator)
            }
          } else insertTestDefinition(currentToken, m)
        }
        var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
          regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
          escaped = !1,
          currentToken = new MaskToken,
          openenings = [],
          maskTokens = [];
        for (regexMask && (opts.optionalmarker.start = undefined, opts.optionalmarker.end = undefined); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
          if (m = match[0], regexMask) switch (m.charAt(0)) {
            case "?":
              m = "{0,1}";
              break;
            case "+":
            case "*":
              m = "{" + m + "}"
          }
          if (escaped) defaultCase();
          else switch (m.charAt(0)) {
            case opts.escapeChar:
              escaped = !0, regexMask && defaultCase();
              break;
            case opts.optionalmarker.end:
            case opts.groupmarker.end:
              if ((openingToken = openenings.pop()).openGroup = !1, openingToken !== undefined)
                if (0 < openenings.length) {
                  if ((currentOpeningToken = openenings[openenings.length - 1]).matches.push(openingToken), currentOpeningToken.isAlternator) {
                    alternator = openenings.pop();
                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
                    0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator)
                  }
                } else currentToken.matches.push(openingToken);
              else defaultCase();
              break;
            case opts.optionalmarker.start:
              openenings.push(new MaskToken(!1, !0));
              break;
            case opts.groupmarker.start:
              openenings.push(new MaskToken(!0));
              break;
            case opts.quantifiermarker.start:
              var quantifier = new MaskToken(!1, !1, !0),
                mq = (m = m.replace(/[{}]/g, "")).split(","),
                mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
              if ("*" !== mq1 && "+" !== mq1 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                  min: mq0,
                  max: mq1
                }, 0 < openenings.length) {
                var matches = openenings[openenings.length - 1].matches;
                (match = matches.pop()).isGroup || ((groupToken = new MaskToken(!0)).matches.push(match), match = groupToken), matches.push(match), matches.push(quantifier)
              } else(match = currentToken.matches.pop()).isGroup || (regexMask && null === match.fn && "." === match.def && (match.fn = new RegExp(match.def, opts.casing ? "i" : "")), (groupToken = new MaskToken(!0)).matches.push(match), match = groupToken), currentToken.matches.push(match), currentToken.matches.push(quantifier);
              break;
            case opts.alternatormarker:
              if (0 < openenings.length) {
                var subToken = (currentOpeningToken = openenings[openenings.length - 1]).matches[currentOpeningToken.matches.length - 1];
                lastMatch = currentOpeningToken.openGroup && (subToken.matches === undefined || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : currentOpeningToken.matches.pop()
              } else lastMatch = currentToken.matches.pop();
              if (lastMatch.isAlternator) openenings.push(lastMatch);
              else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
                var alternatorGroup = new MaskToken(!(lastMatch.openGroup = !1));
                alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup)
              }
              break;
            default:
              defaultCase()
          }
        }
        for (; 0 < openenings.length;) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
        return 0 < currentToken.matches.length && (function verifyGroupMarker(maskToken) {
          maskToken && maskToken.matches && $.each(maskToken.matches, function(ndx, token) {
            var nextToken = maskToken.matches[ndx + 1];
            (nextToken === undefined || nextToken.matches === undefined || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker.start, 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker.end))), verifyGroupMarker(token)
          })
        }(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && function reverseTokens(maskToken) {
          for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches)
            if (maskToken.matches.hasOwnProperty(match)) {
              var intMatch = parseInt(match);
              if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                var qt = maskToken.matches[match];
                maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt)
              }
              maskToken.matches[match].matches !== undefined ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = ((st = maskToken.matches[match]) === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && (st = opts.groupmarker.start), st)
            } var st;
          return maskToken
        }(maskTokens[0]), maskTokens
      }
    }, Inputmask.extendDefaults = function(options) {
      $.extend(!0, Inputmask.prototype.defaults, options)
    }, Inputmask.extendDefinitions = function(definition) {
      $.extend(!0, Inputmask.prototype.definitions, definition)
    }, Inputmask.extendAliases = function(alias) {
      $.extend(!0, Inputmask.prototype.aliases, alias)
    }, Inputmask.format = function(value, options, metadata) {
      return Inputmask(options).format(value, metadata)
    }, Inputmask.unmask = function(value, options) {
      return Inputmask(options).unmaskedvalue(value)
    }, Inputmask.isValid = function(value, options) {
      return Inputmask(options).isValid(value)
    }, Inputmask.remove = function(elems) {
      $.each(elems, function(ndx, el) {
        el.inputmask && el.inputmask.remove()
      })
    }, Inputmask.escapeRegex = function(str) {
      return str.replace(new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim"), "\\$1")
    }, Inputmask.keyCode = {
      ALT: 18,
      BACKSPACE: 8,
      BACKSPACE_SAFARI: 127,
      CAPS_LOCK: 20,
      COMMA: 188,
      COMMAND: 91,
      COMMAND_LEFT: 91,
      COMMAND_RIGHT: 93,
      CONTROL: 17,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      MENU: 93,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SHIFT: 16,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      WINDOWS: 91,
      X: 88
    }, Inputmask
  }),
  function(factory) {
    "function" == typeof define && define.amd ? define(["jquery", "./inputmask"], factory) : "object" == typeof exports ? module.exports = factory(require("jquery"), require("./inputmask")) : factory(jQuery, window.Inputmask)
  }(function($, Inputmask) {
    return void 0 === $.fn.inputmask && ($.fn.inputmask = function(fn, options) {
      var nptmask, input = this[0];
      if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
        case "unmaskedvalue":
          return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();
        case "remove":
          return this.each(function() {
            this.inputmask && this.inputmask.remove()
          });
        case "getemptymask":
          return input && input.inputmask ? input.inputmask.getemptymask() : "";
        case "hasMaskedValue":
          return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();
        case "isComplete":
          return !input || !input.inputmask || input.inputmask.isComplete();
        case "getmetadata":
          return input && input.inputmask ? input.inputmask.getmetadata() : void 0;
        case "setvalue":
          $(input).val(options), input && void 0 === input.inputmask && $(input).triggerHandler("setvalue");
          break;
        case "option":
          if ("string" != typeof options) return this.each(function() {
            if (void 0 !== this.inputmask) return this.inputmask.option(options)
          });
          if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
          break;
        default:
          return options.alias = fn, nptmask = new Inputmask(options), this.each(function() {
            nptmask.mask(this)
          })
      } else {
        if ("object" == typeof fn) return nptmask = new Inputmask(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function() {
          if (void 0 !== this.inputmask) return this.inputmask.option(fn);
          nptmask.mask(this)
        }) : this.each(function() {
          nptmask.mask(this)
        });
        if (void 0 === fn) return this.each(function() {
          (nptmask = new Inputmask(options)).mask(this)
        })
      }
    }), $.fn.inputmask
  }),
  function(i) {
    i.fn.magnify = function(t) {
      t = i.extend({
        src: "",
        speed: 100,
        timeout: -1,
        finalWidth: null,
        finalHeight: null,
        magnifiedWidth: null,
        magnifiedHeight: null,
        limitBounds: !1,
        afterLoad: function() {}
      }, t);
      var e = this,
        n = i("html"),
        a = function(e) {
          var a = i(e),
            o = a.closest("a"),
            s = {};
          for (var f in t) s[f] = a.attr("data-magnify-" + f.toLowerCase());
          var l = s.src || t.src || o.attr("href") || "";
          if (l) {
            function k() {
              var i = d.offset();
              return w = {
                top: a.offset().top - i.top + parseInt(a.css("border-top-width")) + parseInt(a.css("padding-top")),
                left: a.offset().left - i.left + parseInt(a.css("border-left-width")) + parseInt(a.css("padding-left"))
              }, i.top += w.top, i.left += w.left, i
            }

            function H() {
              c.is(":visible") && c.fadeOut(t.speed, function() {
                n.removeClass("magnifying").trigger("magnifyend")
              })
            }
            var d, c, u, h, g, m, p, v, y, w, N = 0,
              b = 0;
            isNaN(+s.speed) || (t.speed = +s.speed), isNaN(+s.timeout) || (t.timeout = +s.timeout), isNaN(+s.finalWidth) || (t.finalWidth = +s.finalWidth), isNaN(+s.finalHeight) || (t.finalHeight = +s.finalHeight), isNaN(+s.magnifiedWidth) || (t.magnifiedWidth = +s.magnifiedWidth), isNaN(+s.magnifiedHeight) || (t.magnifiedHeight = +s.magnifiedHeight), "true" === s.limitBounds && (t.limitBounds = !0), "function" == typeof window[s.afterLoad] && (t.afterLoad = window[s.afterLoad]), a.data("originalStyle", a.attr("style"));
            var W = new Image;
            i(W).on({
              load: function() {
                var e, f;
                a.css("display", "block"), a.parent(".magnify").length || a.wrap('<div class="magnify"></div>'), d = a.parent(".magnify"), a.prev(".magnify-lens").length ? d.children(".magnify-lens").css("background-image", "url('" + l + "')") : a.before('<div class="magnify-lens loading" style="background:url(\'' + l + "') 0 0 no-repeat\"></div>"), (c = d.children(".magnify-lens")).removeClass("loading"), u = t.finalWidth || a.width(), h = t.finalHeight || a.height(), g = t.magnifiedWidth || W.width, m = t.magnifiedHeight || W.height, p = c.width(), v = c.height(), y = k(), t.limitBounds && (N = p / 2 / (g / u), b = v / 2 / (m / h)), g === W.width && m === W.height || c.css("background-size", g + "px " + m + "px"), a.data("zoomSize", {
                  width: g,
                  height: m
                }), W = null, t.afterLoad(), d.off().on({
                  "mousemove touchmove": function(i) {
                    if (i.preventDefault(), h) {
                      if (e = (i.pageX || i.originalEvent.touches[0].pageX) - y.left, f = (i.pageY || i.originalEvent.touches[0].pageY) - y.top, c.is(":animated") || (N < e && e < u - N && b < f && f < h - b ? c.is(":hidden") && (n.addClass("magnifying").trigger("magnifystart"), c.fadeIn(t.speed)) : H()), c.is(":visible")) {
                        var a = "";
                        if (g && m) {
                          var o = -Math.round(e / u * g - p / 2),
                            s = -Math.round(f / h * m - v / 2);
                          if (t.limitBounds) {
                            var l = -Math.round((u - N) / u * g - p / 2),
                              d = -Math.round((h - b) / h * m - v / 2);
                            0 < o ? o = 0 : o < l && (o = l), 0 < s ? s = 0 : s < d && (s = d)
                          }
                          a = o + "px " + s + "px"
                        }
                        c.css({
                          top: Math.round(f - v / 2) + w.top + "px",
                          left: Math.round(e - p / 2) + w.left + "px",
                          "background-position": a
                        })
                      }
                    } else r()
                  },
                  mouseenter: function() {
                    y = k()
                  },
                  mouseleave: H
                }), 0 <= t.timeout && d.on("touchend", function() {
                  setTimeout(H, t.timeout)
                }), i("body").not(d).on("touchstart", H);
                var x = a.attr("usemap");
                if (x) {
                  var I = i("map[name=" + x.slice(1) + "]");
                  a.after(I), d.click(function(t) {
                    if (t.clientX || t.clientY) {
                      c.hide();
                      var n = document.elementFromPoint(t.clientX || t.originalEvent.touches[0].clientX, t.clientY || t.originalEvent.touches[0].clientY);
                      "AREA" === n.nodeName ? n.click() : i("area", I).each(function() {
                        var t = i(this).attr("coords").split(",");
                        if (e >= t[0] && e <= t[2] && f >= t[1] && f <= t[3]) return this.click(), !1
                      })
                    }
                  })
                }
                o.length && (o.css("display", "inline-block"), !o.attr("href") || s.src || t.src || o.click(function(i) {
                  i.preventDefault()
                }))
              },
              error: function() {
                W = null
              }
            }), W.src = l
          }
        },
        o = 0,
        r = function() {
          clearTimeout(o), o = setTimeout(function() {
            e.destroy(), e.magnify(t)
          }, 100)
        };
      return this.destroy = function() {
        return this.each(function() {
          var t = i(this),
            e = t.prev("div.magnify-lens"),
            n = t.data("originalStyle");
          t.parent("div.magnify").length && e.length && (n ? t.attr("style", n) : t.removeAttr("style"), t.unwrap(), e.remove())
        }), i(window).off("resize", r), e
      }, i(window).resize(r), this.each(function() {
        a(this)
      })
    }
  }(jQuery),
  function(root, factory) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a0) {
      return factory(a0)
    }) : "object" == typeof module && module.exports ? module.exports = factory(require("jquery")) : factory(root.jQuery)
  }(this, function(jQuery) {
    ! function($) {
      "use strict";

      function includes(search) {
        if (null == this) throw new TypeError;
        var string = String(this);
        if (search && "[object RegExp]" == toString.call(search)) throw new TypeError;
        var stringLength = string.length,
          searchString = String(search),
          searchLength = searchString.length,
          position = 1 < arguments.length ? arguments[1] : void 0,
          pos = position ? Number(position) : 0;
        return pos != pos && (pos = 0), !(stringLength < searchLength + Math.min(Math.max(pos, 0), stringLength)) && -1 != indexOf.call(string, searchString, pos)
      }
      var toString, defineProperty, indexOf;
      String.prototype.includes || (toString = {}.toString, defineProperty = function() {
        try {
          var object = {},
            $defineProperty = Object.defineProperty,
            result = $defineProperty(object, object, object) && $defineProperty
        } catch (error) {}
        return result
      }(), indexOf = "".indexOf, defineProperty ? defineProperty(String.prototype, "includes", {
        value: includes,
        configurable: !0,
        writable: !0
      }) : String.prototype.includes = includes), String.prototype.startsWith || function() {
        function startsWith(search) {
          if (null == this) throw new TypeError;
          var string = String(this);
          if (search && "[object RegExp]" == toString.call(search)) throw new TypeError;
          var stringLength = string.length,
            searchString = String(search),
            searchLength = searchString.length,
            position = 1 < arguments.length ? arguments[1] : void 0,
            pos = position ? Number(position) : 0;
          pos != pos && (pos = 0);
          var start = Math.min(Math.max(pos, 0), stringLength);
          if (stringLength < searchLength + start) return !1;
          for (var index = -1; ++index < searchLength;)
            if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) return !1;
          return !0
        }
        var defineProperty = function() {
            try {
              var object = {},
                $defineProperty = Object.defineProperty,
                result = $defineProperty(object, object, object) && $defineProperty
            } catch (error) {}
            return result
          }(),
          toString = {}.toString;
        defineProperty ? defineProperty(String.prototype, "startsWith", {
          value: startsWith,
          configurable: !0,
          writable: !0
        }) : String.prototype.startsWith = startsWith
      }(), Object.keys || (Object.keys = function(o, k, r) {
        for (k in r = [], o) r.hasOwnProperty.call(o, k) && r.push(k);
        return r
      });
      var valHooks = {
        useDefault: !1,
        _set: $.valHooks.select.set
      };
      $.valHooks.select.set = function(elem, value) {
        return value && !valHooks.useDefault && $(elem).data("selected", !0), valHooks._set.apply(this, arguments)
      };
      var changed_arguments = null,
        EventIsSupported = function() {
          try {
            return new Event("change"), !0
          } catch (e) {
            return !1
          }
        }();

      function normalizeToBase(text) {
        return $.each([{
          re: /[\xC0-\xC6]/g,
          ch: "A"
        }, {
          re: /[\xE0-\xE6]/g,
          ch: "a"
        }, {
          re: /[\xC8-\xCB]/g,
          ch: "E"
        }, {
          re: /[\xE8-\xEB]/g,
          ch: "e"
        }, {
          re: /[\xCC-\xCF]/g,
          ch: "I"
        }, {
          re: /[\xEC-\xEF]/g,
          ch: "i"
        }, {
          re: /[\xD2-\xD6]/g,
          ch: "O"
        }, {
          re: /[\xF2-\xF6]/g,
          ch: "o"
        }, {
          re: /[\xD9-\xDC]/g,
          ch: "U"
        }, {
          re: /[\xF9-\xFC]/g,
          ch: "u"
        }, {
          re: /[\xC7-\xE7]/g,
          ch: "c"
        }, {
          re: /[\xD1]/g,
          ch: "N"
        }, {
          re: /[\xF1]/g,
          ch: "n"
        }], function() {
          text = text ? text.replace(this.re, this.ch) : ""
        }), text
      }
      $.fn.triggerNative = function(eventName) {
        var event, el = this[0];
        el.dispatchEvent ? (EventIsSupported ? event = new Event(eventName, {
          bubbles: !0
        }) : (event = document.createEvent("Event")).initEvent(eventName, !0, !1), el.dispatchEvent(event)) : el.fireEvent ? ((event = document.createEventObject()).eventType = eventName, el.fireEvent("on" + eventName, event)) : this.trigger(eventName)
      }, $.expr.pseudos.icontains = function(obj, index, meta) {
        var $obj = $(obj).find("a");
        return ($obj.data("tokens") || $obj.text()).toString().toUpperCase().includes(meta[3].toUpperCase())
      }, $.expr.pseudos.ibegins = function(obj, index, meta) {
        var $obj = $(obj).find("a");
        return ($obj.data("tokens") || $obj.text()).toString().toUpperCase().startsWith(meta[3].toUpperCase())
      }, $.expr.pseudos.aicontains = function(obj, index, meta) {
        var $obj = $(obj).find("a");
        return ($obj.data("tokens") || $obj.data("normalizedText") || $obj.text()).toString().toUpperCase().includes(meta[3].toUpperCase())
      }, $.expr.pseudos.aibegins = function(obj, index, meta) {
        var $obj = $(obj).find("a");
        return ($obj.data("tokens") || $obj.data("normalizedText") || $obj.text()).toString().toUpperCase().startsWith(meta[3].toUpperCase())
      };

      function createEscaper(map) {
        function escaper(match) {
          return map[match]
        }
        var source = "(?:" + Object.keys(map).join("|") + ")",
          testRegexp = RegExp(source),
          replaceRegexp = RegExp(source, "g");
        return function(string) {
          return string = null == string ? "" : "" + string, testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string
        }
      }
      var htmlEscape = createEscaper({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        }),
        htmlUnescape = createEscaper({
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#x27;": "'",
          "&#x60;": "`"
        }),
        Selectpicker = function(element, options) {
          valHooks.useDefault || ($.valHooks.select.set = valHooks._set, valHooks.useDefault = !0), this.$element = $(element), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = options, null === this.options.title && (this.options.title = this.$element.attr("title"));
          var winPad = this.options.windowPadding;
          "number" == typeof winPad && (this.options.windowPadding = [winPad, winPad, winPad, winPad]), this.val = Selectpicker.prototype.val, this.render = Selectpicker.prototype.render, this.refresh = Selectpicker.prototype.refresh, this.setStyle = Selectpicker.prototype.setStyle, this.selectAll = Selectpicker.prototype.selectAll, this.deselectAll = Selectpicker.prototype.deselectAll, this.destroy = Selectpicker.prototype.destroy, this.remove = Selectpicker.prototype.remove, this.show = Selectpicker.prototype.show, this.hide = Selectpicker.prototype.hide, this.init()
        };

      function Plugin(option) {
        var value, args = arguments,
          _option = option;
        [].shift.apply(args);
        var chain = this.each(function() {
          var $this = $(this);
          if ($this.is("select")) {
            var data = $this.data("selectpicker"),
              options = "object" == typeof _option && _option;
            if (data) {
              if (options)
                for (var i in options) options.hasOwnProperty(i) && (data.options[i] = options[i])
            } else {
              var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
              config.template = $.extend({}, Selectpicker.DEFAULTS.template, $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}, $this.data().template, options.template), $this.data("selectpicker", data = new Selectpicker(this, config))
            }
            "string" == typeof _option && (value = data[_option] instanceof Function ? data[_option].apply(data, args) : data.options[_option])
          }
        });
        return void 0 !== value ? value : chain
      }
      Selectpicker.VERSION = "1.12.4", Selectpicker.DEFAULTS = {
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results matched {0}",
        countSelectedText: function(numSelected, numTotal) {
          return 1 == numSelected ? "{0} item selected" : "{0} items selected"
        },
        maxOptionsText: function(numAll, numGroup) {
          return [1 == numAll ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == numGroup ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
        },
        selectAllText: "Select All",
        deselectAllText: "Deselect All",
        doneButton: !1,
        doneButtonText: "Close",
        multipleSeparator: ", ",
        styleBase: "btn",
        style: "btn-default",
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        width: !1,
        container: !1,
        hideDisabled: !1,
        showSubtext: !1,
        showIcon: !0,
        showContent: !0,
        dropupAuto: !0,
        header: !1,
        liveSearch: !1,
        liveSearchPlaceholder: null,
        liveSearchNormalize: !1,
        liveSearchStyle: "contains",
        actionsBox: !1,
        iconBase: "glyphicon",
        tickIcon: "glyphicon-ok",
        showTick: !1,
        template: {
          caret: '<span class="caret"></span>'
        },
        maxOptions: !1,
        mobile: !1,
        selectOnTab: !1,
        dropdownAlignRight: !1,
        windowPadding: 0
      }, Selectpicker.prototype = {
        constructor: Selectpicker,
        init: function() {
          var that = this,
            id = this.$element.attr("id");
          this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.$element.removeClass("bs-select-hidden"), !0 === this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), void 0 !== id && (this.$button.attr("data-id", id), $('label[for="' + id + '"]').click(function(e) {
            e.preventDefault(), that.$button.focus()
          })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
            "hide.bs.dropdown": function(e) {
              that.$menuInner.attr("aria-expanded", !1), that.$element.trigger("hide.bs.select", e)
            },
            "hidden.bs.dropdown": function(e) {
              that.$element.trigger("hidden.bs.select", e)
            },
            "show.bs.dropdown": function(e) {
              that.$menuInner.attr("aria-expanded", !0), that.$element.trigger("show.bs.select", e)
            },
            "shown.bs.dropdown": function(e) {
              that.$element.trigger("shown.bs.select", e)
            }
          }), that.$element[0].hasAttribute("required") && this.$element.on("invalid", function() {
            that.$button.addClass("bs-invalid"), that.$element.on({
              "focus.bs.select": function() {
                that.$button.focus(), that.$element.off("focus.bs.select")
              },
              "shown.bs.select": function() {
                that.$element.val(that.$element.val()).off("shown.bs.select")
              },
              "rendered.bs.select": function() {
                this.validity.valid && that.$button.removeClass("bs-invalid"), that.$element.off("rendered.bs.select")
              }
            }), that.$button.on("blur.bs.select", function() {
              that.$element.focus().blur(), that.$button.off("blur.bs.select")
            })
          }), setTimeout(function() {
            that.$element.trigger("loaded.bs.select")
          })
        },
        createDropdown: function() {
          var showTick = this.multiple || this.options.showTick ? " show-tick" : "",
            inputGroup = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
            autofocus = this.autofocus ? " autofocus" : "",
            header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
            searchbox = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search"></div>' : "",
            actionsbox = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
            donebutton = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
            drop = '<div class="btn-group bootstrap-select' + showTick + inputGroup + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open" role="combobox">' + header + searchbox + actionsbox + '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>' + donebutton + "</div></div>";
          return $(drop)
        },
        createView: function() {
          var $drop = this.createDropdown(),
            li = this.createLi();
          return $drop.find("ul")[0].innerHTML = li, $drop
        },
        reloadLi: function() {
          var li = this.createLi();
          this.$menuInner[0].innerHTML = li
        },
        createLi: function() {
          function generateLI(content, index, classes, optgroup) {
            return "<li" + (void 0 !== classes && "" !== classes ? ' class="' + classes + '"' : "") + (null != index ? ' data-original-index="' + index + '"' : "") + (null != optgroup ? 'data-optgroup="' + optgroup + '"' : "") + ">" + content + "</li>"
          }

          function generateA(text, classes, inline, tokens) {
            return '<a tabindex="0"' + (void 0 !== classes ? ' class="' + classes + '"' : "") + (inline ? ' style="' + inline + '"' : "") + (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape($(text).html())) + '"' : "") + (void 0 !== tokens || null !== tokens ? ' data-tokens="' + tokens + '"' : "") + ' role="option">' + text + '<span class="' + that.options.iconBase + " " + that.options.tickIcon + ' check-mark"></span></a>'
          }
          var that = this,
            _li = [],
            optID = 0,
            titleOption = document.createElement("option"),
            liIndex = -1;
          if (this.options.title && !this.multiple && (liIndex--, !this.$element.find(".bs-title-option").length)) {
            var element = this.$element[0];
            titleOption.className = "bs-title-option", titleOption.innerHTML = this.options.title, titleOption.value = "", element.insertBefore(titleOption, element.firstChild), void 0 === $(element.options[element.selectedIndex]).attr("selected") && void 0 === this.$element.data("selected") && (titleOption.selected = !0)
          }
          var $selectOptions = this.$element.find("option");
          return $selectOptions.each(function(index) {
            var $this = $(this);
            if (liIndex++, !$this.hasClass("bs-title-option")) {
              var prevHiddenIndex, optionClass = this.className || "",
                inline = htmlEscape(this.style.cssText),
                text = $this.data("content") ? $this.data("content") : $this.html(),
                tokens = $this.data("tokens") ? $this.data("tokens") : null,
                subtext = void 0 !== $this.data("subtext") ? '<small class="text-muted">' + $this.data("subtext") + "</small>" : "",
                icon = void 0 !== $this.data("icon") ? '<span class="' + that.options.iconBase + " " + $this.data("icon") + '"></span> ' : "",
                $parent = $this.parent(),
                isOptgroup = "OPTGROUP" === $parent[0].tagName,
                isOptgroupDisabled = isOptgroup && $parent[0].disabled,
                isDisabled = this.disabled || isOptgroupDisabled;
              if ("" !== icon && isDisabled && (icon = "<span>" + icon + "</span>"), that.options.hideDisabled && (isDisabled && !isOptgroup || isOptgroupDisabled)) return prevHiddenIndex = $this.data("prevHiddenIndex"), $this.next().data("prevHiddenIndex", void 0 !== prevHiddenIndex ? prevHiddenIndex : index), void liIndex--;
              if ($this.data("content") || (text = icon + '<span class="text">' + text + subtext + "</span>"), isOptgroup && !0 !== $this.data("divider")) {
                if (that.options.hideDisabled && isDisabled) {
                  if (void 0 === $parent.data("allOptionsDisabled")) {
                    var $options = $parent.children();
                    $parent.data("allOptionsDisabled", $options.filter(":disabled").length === $options.length)
                  }
                  if ($parent.data("allOptionsDisabled")) return void liIndex--
                }
                var optGroupClass = " " + $parent[0].className || "";
                if (0 === $this.index()) {
                  optID += 1;
                  var label = $parent[0].label,
                    labelSubtext = void 0 !== $parent.data("subtext") ? '<small class="text-muted">' + $parent.data("subtext") + "</small>" : "";
                  label = ($parent.data("icon") ? '<span class="' + that.options.iconBase + " " + $parent.data("icon") + '"></span> ' : "") + '<span class="text">' + htmlEscape(label) + labelSubtext + "</span>", 0 !== index && 0 < _li.length && (liIndex++, _li.push(generateLI("", null, "divider", optID + "div"))), liIndex++, _li.push(generateLI(label, null, "dropdown-header" + optGroupClass, optID))
                }
                if (that.options.hideDisabled && isDisabled) return void liIndex--;
                _li.push(generateLI(generateA(text, "opt " + optionClass + optGroupClass, inline, tokens), index, "", optID))
              } else if (!0 === $this.data("divider")) _li.push(generateLI("", index, "divider"));
              else if (!0 === $this.data("hidden")) prevHiddenIndex = $this.data("prevHiddenIndex"), $this.next().data("prevHiddenIndex", void 0 !== prevHiddenIndex ? prevHiddenIndex : index), _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, "hidden is-hidden"));
              else {
                var showDivider = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName;
                if (!showDivider && that.options.hideDisabled && void 0 !== (prevHiddenIndex = $this.data("prevHiddenIndex"))) {
                  var prevHidden = $selectOptions.eq(prevHiddenIndex)[0].previousElementSibling;
                  prevHidden && "OPTGROUP" === prevHidden.tagName && !prevHidden.disabled && (showDivider = !0)
                }
                showDivider && (liIndex++, _li.push(generateLI("", null, "divider", optID + "div"))), _li.push(generateLI(generateA(text, optionClass, inline, tokens), index))
              }
              that.liObj[index] = liIndex
            }
          }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), _li.join("")
        },
        findLis: function() {
          return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
        },
        render: function(updateLi) {
          var notDisabled, that = this,
            $selectOptions = this.$element.find("option");
          !1 !== updateLi && $selectOptions.each(function(index) {
            var $lis = that.findLis().eq(that.liObj[index]);
            that.setDisabled(index, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, $lis), that.setSelected(index, this.selected, $lis)
          }), this.togglePlaceholder(), this.tabIndex();
          var selectedItems = $selectOptions.map(function() {
              if (this.selected) {
                if (that.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                var subtext, $this = $(this),
                  icon = $this.data("icon") && that.options.showIcon ? '<i class="' + that.options.iconBase + " " + $this.data("icon") + '"></i> ' : "";
                return subtext = that.options.showSubtext && $this.data("subtext") && !that.multiple ? ' <small class="text-muted">' + $this.data("subtext") + "</small>" : "", void 0 !== $this.attr("title") ? $this.attr("title") : $this.data("content") && that.options.showContent ? $this.data("content").toString() : icon + $this.html() + subtext
              }
            }).toArray(),
            title = this.multiple ? selectedItems.join(this.options.multipleSeparator) : selectedItems[0];
          if (this.multiple && -1 < this.options.selectedTextFormat.indexOf("count")) {
            var max = this.options.selectedTextFormat.split(">");
            if (1 < max.length && selectedItems.length > max[1] || 1 == max.length && 2 <= selectedItems.length) {
              notDisabled = this.options.hideDisabled ? ", [disabled]" : "";
              var totalCount = $selectOptions.not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length;
              title = ("function" == typeof this.options.countSelectedText ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText).replace("{0}", selectedItems.length.toString()).replace("{1}", totalCount.toString())
            }
          }
          null == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (title = this.options.title), title = title || (void 0 !== this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", htmlUnescape($.trim(title.replace(/<[^>]*>?/g, "")))), this.$button.children(".filter-option").html(title), this.$element.trigger("rendered.bs.select")
        },
        setStyle: function(style, status) {
          this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
          var buttonClass = style || this.options.style;
          "add" == status ? this.$button.addClass(buttonClass) : "remove" == status ? this.$button.removeClass(buttonClass) : (this.$button.removeClass(this.options.style), this.$button.addClass(buttonClass))
        },
        liHeight: function(refresh) {
          if (refresh || !1 !== this.options.size && !this.sizeInfo) {
            var newElement = document.createElement("div"),
              menu = document.createElement("div"),
              menuInner = document.createElement("ul"),
              divider = document.createElement("li"),
              li = document.createElement("li"),
              a = document.createElement("a"),
              text = document.createElement("span"),
              header = this.options.header && 0 < this.$menu.find(".popover-title").length ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
              search = this.options.liveSearch ? document.createElement("div") : null,
              actions = this.options.actionsBox && this.multiple && 0 < this.$menu.find(".bs-actionsbox").length ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
              doneButton = this.options.doneButton && this.multiple && 0 < this.$menu.find(".bs-donebutton").length ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
            if (text.className = "text", newElement.className = this.$menu[0].parentNode.className + " open", menu.className = "dropdown-menu open", menuInner.className = "dropdown-menu inner", divider.className = "divider", text.appendChild(document.createTextNode("Inner text")), a.appendChild(text), li.appendChild(a), menuInner.appendChild(li), menuInner.appendChild(divider), header && menu.appendChild(header), search) {
              var input = document.createElement("input");
              search.className = "bs-searchbox", input.className = "form-control", search.appendChild(input), menu.appendChild(search)
            }
            actions && menu.appendChild(actions), menu.appendChild(menuInner), doneButton && menu.appendChild(doneButton), newElement.appendChild(menu), document.body.appendChild(newElement);
            var liHeight = a.offsetHeight,
              headerHeight = header ? header.offsetHeight : 0,
              searchHeight = search ? search.offsetHeight : 0,
              actionsHeight = actions ? actions.offsetHeight : 0,
              doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
              dividerHeight = $(divider).outerHeight(!0),
              menuStyle = "function" == typeof getComputedStyle && getComputedStyle(menu),
              $menu = menuStyle ? null : $(menu),
              menuPadding = {
                vert: parseInt(menuStyle ? menuStyle.paddingTop : $menu.css("paddingTop")) + parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css("paddingBottom")) + parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css("borderTopWidth")) + parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css("borderBottomWidth")),
                horiz: parseInt(menuStyle ? menuStyle.paddingLeft : $menu.css("paddingLeft")) + parseInt(menuStyle ? menuStyle.paddingRight : $menu.css("paddingRight")) + parseInt(menuStyle ? menuStyle.borderLeftWidth : $menu.css("borderLeftWidth")) + parseInt(menuStyle ? menuStyle.borderRightWidth : $menu.css("borderRightWidth"))
              },
              menuExtras = {
                vert: menuPadding.vert + parseInt(menuStyle ? menuStyle.marginTop : $menu.css("marginTop")) + parseInt(menuStyle ? menuStyle.marginBottom : $menu.css("marginBottom")) + 2,
                horiz: menuPadding.horiz + parseInt(menuStyle ? menuStyle.marginLeft : $menu.css("marginLeft")) + parseInt(menuStyle ? menuStyle.marginRight : $menu.css("marginRight")) + 2
              };
            document.body.removeChild(newElement), this.sizeInfo = {
              liHeight: liHeight,
              headerHeight: headerHeight,
              searchHeight: searchHeight,
              actionsHeight: actionsHeight,
              doneButtonHeight: doneButtonHeight,
              dividerHeight: dividerHeight,
              menuPadding: menuPadding,
              menuExtras: menuExtras
            }
          }
        },
        setSize: function() {
          if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), !1 !== this.options.size) {
            var menuHeight, menuWidth, getHeight, getWidth, selectOffsetTop, selectOffsetBot, selectOffsetLeft, selectOffsetRight, that = this,
              $menu = this.$menu,
              $menuInner = this.$menuInner,
              $window = $(window),
              selectHeight = this.$newElement[0].offsetHeight,
              selectWidth = this.$newElement[0].offsetWidth,
              liHeight = this.sizeInfo.liHeight,
              headerHeight = this.sizeInfo.headerHeight,
              searchHeight = this.sizeInfo.searchHeight,
              actionsHeight = this.sizeInfo.actionsHeight,
              doneButtonHeight = this.sizeInfo.doneButtonHeight,
              divHeight = this.sizeInfo.dividerHeight,
              menuPadding = this.sizeInfo.menuPadding,
              menuExtras = this.sizeInfo.menuExtras,
              notDisabled = this.options.hideDisabled ? ".disabled" : "",
              getPos = function() {
                var containerPos, pos = that.$newElement.offset(),
                  $container = $(that.options.container);
                that.options.container && !$container.is("body") ? ((containerPos = $container.offset()).top += parseInt($container.css("borderTopWidth")), containerPos.left += parseInt($container.css("borderLeftWidth"))) : containerPos = {
                  top: 0,
                  left: 0
                };
                var winPad = that.options.windowPadding;
                selectOffsetTop = pos.top - containerPos.top - $window.scrollTop(), selectOffsetBot = $window.height() - selectOffsetTop - selectHeight - containerPos.top - winPad[2], selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft(), selectOffsetRight = $window.width() - selectOffsetLeft - selectWidth - containerPos.left - winPad[1], selectOffsetTop -= winPad[0], selectOffsetLeft -= winPad[3]
              };
            if (getPos(), "auto" === this.options.size) {
              var getSize = function() {
                function hasClass(className, include) {
                  return function(element) {
                    return include ? element.classList ? element.classList.contains(className) : $(element).hasClass(className) : !(element.classList ? element.classList.contains(className) : $(element).hasClass(className))
                  }
                }
                var minHeight, lis = that.$menuInner[0].getElementsByTagName("li"),
                  lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass("hidden", !1)) : that.$lis.not(".hidden"),
                  optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass("dropdown-header", !0)) : lisVisible.filter(".dropdown-header");
                getPos(), menuHeight = selectOffsetBot - menuExtras.vert, menuWidth = selectOffsetRight - menuExtras.horiz, getWidth = that.options.container ? ($menu.data("height") || $menu.data("height", $menu.height()), getHeight = $menu.data("height"), $menu.data("width") || $menu.data("width", $menu.width()), $menu.data("width")) : (getHeight = $menu.height(), $menu.width()), that.options.dropupAuto && that.$newElement.toggleClass("dropup", selectOffsetBot < selectOffsetTop && menuHeight - menuExtras.vert < getHeight), that.$newElement.hasClass("dropup") && (menuHeight = selectOffsetTop - menuExtras.vert), "auto" === that.options.dropdownAlignRight && $menu.toggleClass("dropdown-menu-right", selectOffsetRight < selectOffsetLeft && menuWidth - menuExtras.horiz < getWidth - selectWidth), minHeight = 3 < lisVisible.length + optGroup.length ? 3 * liHeight + menuExtras.vert - 2 : 0, $menu.css({
                  "max-height": menuHeight + "px",
                  overflow: "hidden",
                  "min-height": minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + "px"
                }), $menuInner.css({
                  "max-height": menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert + "px",
                  "overflow-y": "auto",
                  "min-height": Math.max(minHeight - menuPadding.vert, 0) + "px"
                })
              };
              getSize(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", getSize), $window.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", getSize)
            } else if (this.options.size && "auto" != this.options.size && this.$lis.not(notDisabled).length > this.options.size) {
              var optIndex = this.$lis.not(".divider").not(notDisabled).children().slice(0, this.options.size).last().parent().index(),
                divLength = this.$lis.slice(0, optIndex + 1).filter(".divider").length;
              menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert, getHeight = that.options.container ? ($menu.data("height") || $menu.data("height", $menu.height()), $menu.data("height")) : $menu.height(), that.options.dropupAuto && this.$newElement.toggleClass("dropup", selectOffsetBot < selectOffsetTop && menuHeight - menuExtras.vert < getHeight), $menu.css({
                "max-height": menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + "px",
                overflow: "hidden",
                "min-height": ""
              }), $menuInner.css({
                "max-height": menuHeight - menuPadding.vert + "px",
                "overflow-y": "auto",
                "min-height": ""
              })
            }
          }
        },
        setWidth: function() {
          if ("auto" === this.options.width) {
            this.$menu.css("min-width", "0");
            var $selectClone = this.$menu.parent().clone().appendTo("body"),
              $selectClone2 = this.options.container ? this.$newElement.clone().appendTo("body") : $selectClone,
              ulWidth = $selectClone.children(".dropdown-menu").outerWidth(),
              btnWidth = $selectClone2.css("width", "auto").children("button").outerWidth();
            $selectClone.remove(), $selectClone2.remove(), this.$newElement.css("width", Math.max(ulWidth, btnWidth) + "px")
          } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
          this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
        },
        selectPosition: function() {
          this.$bsContainer = $('<div class="bs-container" />');

          function getPlacement($element) {
            that.$bsContainer.addClass($element.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", $element.hasClass("dropup")), pos = $element.offset(), $container.is("body") ? containerPos = {
              top: 0,
              left: 0
            } : ((containerPos = $container.offset()).top += parseInt($container.css("borderTopWidth")) - $container.scrollTop(), containerPos.left += parseInt($container.css("borderLeftWidth")) - $container.scrollLeft()), actualHeight = $element.hasClass("dropup") ? 0 : $element[0].offsetHeight, that.$bsContainer.css({
              top: pos.top - containerPos.top + actualHeight,
              left: pos.left - containerPos.left,
              width: $element[0].offsetWidth
            })
          }
          var pos, containerPos, actualHeight, that = this,
            $container = $(this.options.container);
          this.$button.on("click", function() {
            var $this = $(this);
            that.isDisabled() || (getPlacement(that.$newElement), that.$bsContainer.appendTo(that.options.container).toggleClass("open", !$this.hasClass("open")).append(that.$menu))
          }), $(window).on("resize scroll", function() {
            getPlacement(that.$newElement)
          }), this.$element.on("hide.bs.select", function() {
            that.$menu.data("height", that.$menu.height()), that.$bsContainer.detach()
          })
        },
        setSelected: function(index, selected, $lis) {
          $lis || (this.togglePlaceholder(), $lis = this.findLis().eq(this.liObj[index])), $lis.toggleClass("selected", selected).find("a").attr("aria-selected", selected)
        },
        setDisabled: function(index, disabled, $lis) {
          $lis = $lis || this.findLis().eq(this.liObj[index]), disabled ? $lis.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1).attr("aria-disabled", !0) : $lis.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0).attr("aria-disabled", !1)
        },
        isDisabled: function() {
          return this.$element[0].disabled
        },
        checkDisabled: function() {
          var that = this;
          this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1).attr("aria-disabled", !0)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled").attr("aria-disabled", !1)), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() {
            return !that.isDisabled()
          })
        },
        togglePlaceholder: function() {
          var value = this.$element.val();
          this.$button.toggleClass("bs-placeholder", null === value || "" === value || value.constructor === Array && 0 === value.length)
        },
        tabIndex: function() {
          this.$element.data("tabindex") !== this.$element.attr("tabindex") && -98 !== this.$element.attr("tabindex") && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98)
        },
        clickListener: function() {
          var that = this,
            $document = $(document);
          $document.data("spaceSelect", !1), this.$button.on("keyup", function(e) {
            /(32)/.test(e.keyCode.toString(10)) && $document.data("spaceSelect") && (e.preventDefault(), $document.data("spaceSelect", !1))
          }), this.$button.on("click", function() {
            that.setSize()
          }), this.$element.on("shown.bs.select", function() {
            if (that.options.liveSearch || that.multiple) {
              if (!that.multiple) {
                var selectedIndex = that.liObj[that.$element[0].selectedIndex];
                if ("number" != typeof selectedIndex || !1 === that.options.size) return;
                var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
                offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2, that.$menuInner[0].scrollTop = offset
              }
            } else that.$menuInner.find(".selected a").focus()
          }), this.$menuInner.on("click", "li a", function(e) {
            var $this = $(this),
              clickedIndex = $this.parent().data("originalIndex"),
              prevValue = that.$element.val(),
              prevIndex = that.$element.prop("selectedIndex"),
              triggerChange = !0;
            if (that.multiple && 1 !== that.options.maxOptions && e.stopPropagation(), e.preventDefault(), !that.isDisabled() && !$this.parent().hasClass("disabled")) {
              var $options = that.$element.find("option"),
                $option = $options.eq(clickedIndex),
                state = $option.prop("selected"),
                $optgroup = $option.parent("optgroup"),
                maxOptions = that.options.maxOptions,
                maxOptionsGrp = $optgroup.data("maxOptions") || !1;
              if (that.multiple) {
                if ($option.prop("selected", !state), that.setSelected(clickedIndex, !state), $this.blur(), !1 !== maxOptions || !1 !== maxOptionsGrp) {
                  var maxReached = maxOptions < $options.filter(":selected").length,
                    maxReachedGrp = maxOptionsGrp < $optgroup.find("option:selected").length;
                  if (maxOptions && maxReached || maxOptionsGrp && maxReachedGrp)
                    if (maxOptions && 1 == maxOptions) $options.prop("selected", !1), $option.prop("selected", !0), that.$menuInner.find(".selected").removeClass("selected"), that.setSelected(clickedIndex, !0);
                    else if (maxOptionsGrp && 1 == maxOptionsGrp) {
                    $optgroup.find("option:selected").prop("selected", !1), $option.prop("selected", !0);
                    var optgroupID = $this.parent().data("optgroup");
                    that.$menuInner.find('[data-optgroup="' + optgroupID + '"]').removeClass("selected"), that.setSelected(clickedIndex, !0)
                  } else {
                    var maxOptionsText = "string" == typeof that.options.maxOptionsText ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                      maxOptionsArr = "function" == typeof maxOptionsText ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                      maxTxt = maxOptionsArr[0].replace("{n}", maxOptions),
                      maxTxtGrp = maxOptionsArr[1].replace("{n}", maxOptionsGrp),
                      $notify = $('<div class="notify"></div>');
                    maxOptionsArr[2] && (maxTxt = maxTxt.replace("{var}", maxOptionsArr[2][1 < maxOptions ? 0 : 1]), maxTxtGrp = maxTxtGrp.replace("{var}", maxOptionsArr[2][1 < maxOptionsGrp ? 0 : 1])), $option.prop("selected", !1), that.$menu.append($notify), maxOptions && maxReached && ($notify.append($("<div>" + maxTxt + "</div>")), triggerChange = !1, that.$element.trigger("maxReached.bs.select")), maxOptionsGrp && maxReachedGrp && ($notify.append($("<div>" + maxTxtGrp + "</div>")), triggerChange = !1, that.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                      that.setSelected(clickedIndex, !1)
                    }, 10), $notify.delay(750).fadeOut(300, function() {
                      $(this).remove()
                    })
                  }
                }
              } else $options.prop("selected", !1), $option.prop("selected", !0), that.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected", !1), that.setSelected(clickedIndex, !0);
              !that.multiple || that.multiple && 1 === that.options.maxOptions ? that.$button.focus() : that.options.liveSearch && that.$searchbox.focus(), triggerChange && (prevValue != that.$element.val() && that.multiple || prevIndex != that.$element.prop("selectedIndex") && !that.multiple) && (changed_arguments = [clickedIndex, $option.prop("selected"), state], that.$element.triggerNative("change"))
            }
          }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(e) {
            e.currentTarget == this && (e.preventDefault(), e.stopPropagation(), that.options.liveSearch && !$(e.target).hasClass("close") ? that.$searchbox.focus() : that.$button.focus())
          }), this.$menuInner.on("click", ".divider, .dropdown-header", function(e) {
            e.preventDefault(), e.stopPropagation(), that.options.liveSearch ? that.$searchbox.focus() : that.$button.focus()
          }), this.$menu.on("click", ".popover-title .close", function() {
            that.$button.click()
          }), this.$searchbox.on("click", function(e) {
            e.stopPropagation()
          }), this.$menu.on("click", ".actions-btn", function(e) {
            that.options.liveSearch ? that.$searchbox.focus() : that.$button.focus(), e.preventDefault(), e.stopPropagation(), $(this).hasClass("bs-select-all") ? that.selectAll() : that.deselectAll()
          }), this.$element.change(function() {
            that.render(!1), that.$element.trigger("changed.bs.select", changed_arguments), changed_arguments = null
          })
        },
        liveSearchListener: function() {
          var that = this,
            $no_results = $('<li class="no-results"></li>');
          this.$button.on("click.dropdown.data-api", function() {
            that.$menuInner.find(".active").removeClass("active"), that.$searchbox.val() && (that.$searchbox.val(""), that.$lis.not(".is-hidden").removeClass("hidden"), $no_results.parent().length && $no_results.remove()), that.multiple || that.$menuInner.find(".selected").addClass("active"), setTimeout(function() {
              that.$searchbox.focus()
            }, 10)
          }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(e) {
            e.stopPropagation()
          }), this.$searchbox.on("input propertychange", function() {
            if (that.$lis.not(".is-hidden").removeClass("hidden"), that.$lis.filter(".active").removeClass("active"), $no_results.remove(), that.$searchbox.val()) {
              var $hideItems, $searchBase = that.$lis.not(".is-hidden, .divider, .dropdown-header");
              if (($hideItems = that.options.liveSearchNormalize ? $searchBase.not(":a" + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")') : $searchBase.not(":" + that._searchStyle() + '("' + that.$searchbox.val() + '")')).length === $searchBase.length) $no_results.html(that.options.noneResultsText.replace("{0}", '"' + htmlEscape(that.$searchbox.val()) + '"')), that.$menuInner.append($no_results), that.$lis.addClass("hidden");
              else {
                $hideItems.addClass("hidden");
                var $foundDiv, $lisVisible = that.$lis.not(".hidden");
                $lisVisible.each(function(index) {
                  var $this = $(this);
                  $this.hasClass("divider") ? void 0 === $foundDiv ? $this.addClass("hidden") : ($foundDiv && $foundDiv.addClass("hidden"), $foundDiv = $this) : $this.hasClass("dropdown-header") && $lisVisible.eq(index + 1).data("optgroup") !== $this.data("optgroup") ? $this.addClass("hidden") : $foundDiv = null
                }), $foundDiv && $foundDiv.addClass("hidden"), $searchBase.not(".hidden").first().addClass("active"), that.$menuInner.scrollTop(0)
              }
            }
          })
        },
        _searchStyle: function() {
          return {
            begins: "ibegins",
            startsWith: "ibegins"
          } [this.options.liveSearchStyle] || "icontains"
        },
        val: function(value) {
          return void 0 !== value ? (this.$element.val(value), this.render(), this.$element) : this.$element.val()
        },
        changeAll: function(status) {
          if (this.multiple) {
            void 0 === status && (status = !0), this.findLis();
            var $options = this.$element.find("option"),
              $lisVisible = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),
              lisVisLen = $lisVisible.length,
              selectedOptions = [];
            if (status) {
              if ($lisVisible.filter(".selected").length === $lisVisible.length) return
            } else if (0 === $lisVisible.filter(".selected").length) return;
            $lisVisible.toggleClass("selected", status);
            for (var i = 0; i < lisVisLen; i++) {
              var origIndex = $lisVisible[i].getAttribute("data-original-index");
              selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0]
            }
            $(selectedOptions).prop("selected", status), this.render(!1), this.togglePlaceholder(), this.$element.triggerNative("change")
          }
        },
        selectAll: function() {
          return this.changeAll(!0)
        },
        deselectAll: function() {
          return this.changeAll(!1)
        },
        toggle: function(e) {
          (e = e || window.event) && e.stopPropagation(), this.$button.trigger("click")
        },
        keydown: function(e) {
          var $items, index, prevIndex, isActive, $this = $(this),
            that = ($this.is("input") ? $this.parent().parent() : $this.parent()).data("this"),
            selector = ":not(.disabled, .hidden, .dropdown-header, .divider)",
            keyCodeMap = {
              32: " ",
              48: "0",
              49: "1",
              50: "2",
              51: "3",
              52: "4",
              53: "5",
              54: "6",
              55: "7",
              56: "8",
              57: "9",
              59: ";",
              65: "a",
              66: "b",
              67: "c",
              68: "d",
              69: "e",
              70: "f",
              71: "g",
              72: "h",
              73: "i",
              74: "j",
              75: "k",
              76: "l",
              77: "m",
              78: "n",
              79: "o",
              80: "p",
              81: "q",
              82: "r",
              83: "s",
              84: "t",
              85: "u",
              86: "v",
              87: "w",
              88: "x",
              89: "y",
              90: "z",
              96: "0",
              97: "1",
              98: "2",
              99: "3",
              100: "4",
              101: "5",
              102: "6",
              103: "7",
              104: "8",
              105: "9"
            };
          if (!(isActive = that.$newElement.hasClass("open")) && (48 <= e.keyCode && e.keyCode <= 57 || 96 <= e.keyCode && e.keyCode <= 105 || 65 <= e.keyCode && e.keyCode <= 90)) return that.options.container ? that.$button.trigger("click") : (that.setSize(), that.$menu.parent().addClass("open"), isActive = !0), void that.$searchbox.focus();
          if (that.options.liveSearch && /(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (e.preventDefault(), e.stopPropagation(), that.$menuInner.click(), that.$button.focus()), /(38|40)/.test(e.keyCode.toString(10))) {
            if (!($items = that.$lis.filter(selector)).length) return;
            index = that.options.liveSearch ? $items.index($items.filter(".active")) : $items.index($items.find("a").filter(":focus").parent()), prevIndex = that.$menuInner.data("prevIndex"), 38 == e.keyCode ? (!that.options.liveSearch && index != prevIndex || -1 == index || index--, index < 0 && (index += $items.length)) : 40 == e.keyCode && (!that.options.liveSearch && index != prevIndex || index++, index %= $items.length), that.$menuInner.data("prevIndex", index), that.options.liveSearch ? (e.preventDefault(), $this.hasClass("dropdown-toggle") || ($items.removeClass("active").eq(index).addClass("active").children("a").focus(), $this.focus())) : $items.eq(index).children("a").focus()
          } else if (!$this.is("input")) {
            var count, keyIndex = [];
            ($items = that.$lis.filter(selector)).each(function(i) {
              $.trim($(this).children("a").text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode] && keyIndex.push(i)
            }), count = $(document).data("keycount"), count++, $(document).data("keycount", count), $.trim($(":focus").text().toLowerCase()).substring(0, 1) != keyCodeMap[e.keyCode] ? (count = 1, $(document).data("keycount", count)) : count >= keyIndex.length && ($(document).data("keycount", 0), count > keyIndex.length && (count = 1)), $items.eq(keyIndex[count - 1]).children("a").focus()
          }
          if ((/(13|32)/.test(e.keyCode.toString(10)) || /(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab) && isActive) {
            if (/(32)/.test(e.keyCode.toString(10)) || e.preventDefault(), that.options.liveSearch) /(32)/.test(e.keyCode.toString(10)) || (that.$menuInner.find(".active a").click(), $this.focus());
            else {
              var elem = $(":focus");
              elem.click(), elem.focus(), e.preventDefault(), $(document).data("spaceSelect", !0)
            }
            $(document).data("keycount", 0)
          }(/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch) || /(27)/.test(e.keyCode.toString(10)) && !isActive) && (that.$menu.parent().removeClass("open"), that.options.container && that.$newElement.removeClass("open"), that.$button.focus())
        },
        mobile: function() {
          this.$element.addClass("mobile-device")
        },
        refresh: function() {
          this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
        },
        hide: function() {
          this.$newElement.hide()
        },
        show: function() {
          this.$newElement.show()
        },
        remove: function() {
          this.$newElement.remove(), this.$element.remove()
        },
        destroy: function() {
          this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
        }
      };
      var old = $.fn.selectpicker;
      $.fn.selectpicker = Plugin, $.fn.selectpicker.Constructor = Selectpicker, $.fn.selectpicker.noConflict = function() {
        return $.fn.selectpicker = old, this
      }, $(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', Selectpicker.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function(e) {
        e.stopPropagation()
      }), $(window).on("load.bs.select.data-api", function() {
        $(".selectpicker").each(function() {
          var $selectpicker = $(this);
          Plugin.call($selectpicker, $selectpicker.data())
        })
      })
    }(jQuery)
  }),
  function(root, factory) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a0) {
      return factory(a0)
    }) : "object" == typeof module && module.exports ? module.exports = factory(require("jquery")) : factory(root.jQuery)
  }(this, function(jQuery) {
    jQuery.fn.selectpicker.defaults = {
      noneSelectedText: "Ничего не выбрано",
      noneResultsText: "Совпадений не найдено {0}",
      countSelectedText: "Выбрано {0} из {1}",
      maxOptionsText: ["Достигнут предел ({n} {var} максимум)", "Достигнут предел в группе ({n} {var} максимум)", ["шт.", "шт."]],
      doneButtonText: "Закрыть",
      selectAllText: "Выбрать все",
      deselectAllText: "Отменить все",
      multipleSeparator: ", "
    }
  }),
  function($) {
    "use strict";

    function Dropdown(element) {
      $(element).on("click.bs.dropdown", this.toggle)
    }
    var toggle = '[data-toggle="dropdown"]';

    function getParent($this) {
      var selector = $this.attr("data-target"),
        $parent = (selector = selector || (selector = $this.attr("href")) && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "")) && $(selector);
      return $parent && $parent.length ? $parent : $this.parent()
    }

    function clearMenus(e) {
      e && 3 === e.which || ($(".dropdown-backdrop").remove(), $(toggle).each(function() {
        var $this = $(this),
          $parent = getParent($this),
          relatedTarget = {
            relatedTarget: this
          };
        $parent.hasClass("open") && (e && "click" == e.type && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target) || ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), e.isDefaultPrevented() || ($this.attr("aria-expanded", "false"), $parent.removeClass("open").trigger($.Event("hidden.bs.dropdown", relatedTarget)))))
      }))
    }
    Dropdown.VERSION = "3.3.7", Dropdown.prototype.toggle = function(e) {
      var $this = $(this);
      if (!$this.is(".disabled, :disabled")) {
        var $parent = getParent($this),
          isActive = $parent.hasClass("open");
        if (clearMenus(), !isActive) {
          "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
          var relatedTarget = {
            relatedTarget: this
          };
          if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
          $this.trigger("focus").attr("aria-expanded", "true"), $parent.toggleClass("open").trigger($.Event("shown.bs.dropdown", relatedTarget))
        }
        return !1
      }
    }, Dropdown.prototype.keydown = function(e) {
      if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
        var $this = $(this);
        if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
          var $parent = getParent($this),
            isActive = $parent.hasClass("open");
          if (!isActive && 27 != e.which || isActive && 27 == e.which) return 27 == e.which && $parent.find(toggle).trigger("focus"), $this.trigger("click");
          var $items = $parent.find(".dropdown-menu li:not(.disabled):visible a");
          if ($items.length) {
            var index = $items.index(e.target);
            38 == e.which && 0 < index && index--, 40 == e.which && index < $items.length - 1 && index++, ~index || (index = 0), $items.eq(index).trigger("focus")
          }
        }
      }
    };
    var old = $.fn.dropdown;
    $.fn.dropdown = function(option) {
      return this.each(function() {
        var $this = $(this),
          data = $this.data("bs.dropdown");
        data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this)
      })
    }, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
      return $.fn.dropdown = old, this
    }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
      e.stopPropagation()
    }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown)
  }(jQuery),
  function($) {
    "use strict";
    $.fn.emulateTransitionEnd = function(duration) {
      var called = !1,
        $el = this;
      $(this).one("bsTransitionEnd", function() {
        called = !0
      });
      return setTimeout(function() {
        called || $($el).trigger($.support.transition.end)
      }, duration), this
    }, $(function() {
      $.support.transition = function() {
        var el = document.createElement("bootstrap"),
          transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
          };
        for (var name in transEndEventNames)
          if (void 0 !== el.style[name]) return {
            end: transEndEventNames[name]
          };
        return !1
      }(), $.support.transition && ($.event.special.bsTransitionEnd = {
        bindType: $.support.transition.end,
        delegateType: $.support.transition.end,
        handle: function(e) {
          if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
        }
      })
    })
  }(jQuery),
  function($) {
    "use strict";
    var options = {
        customClass: "",
        labels: {
          up: "Up",
          down: "Down"
        }
      },
      pub = {
        defaults: function(opts) {
          return options = $.extend(options, opts || {}), $(this)
        },
        destroy: function() {
          return $(this).each(function(i) {
            var data = $(this).data("stepper");
            data && (data.$stepper.off(".stepper").find(".stepper-arrow").remove(), data.$input.unwrap().removeClass("stepper-input"))
          })
        },
        disable: function() {
          return $(this).each(function(i) {
            var data = $(this).data("stepper");
            data && (data.$input.attr("disabled", "disabled"), data.$stepper.addClass("disabled"))
          })
        },
        enable: function() {
          return $(this).each(function(i) {
            var data = $(this).data("stepper");
            data && (data.$input.attr("disabled", null), data.$stepper.removeClass("disabled"))
          })
        }
      };

    function _build($input, opts) {
      if (!$input.hasClass("stepper-input")) {
        opts = $.extend({}, opts, $input.data("stepper-options"));
        var min = parseFloat($input.attr("min")),
          max = parseFloat($input.attr("max")),
          step = parseFloat($input.attr("step")) || 1;
        $input.addClass("stepper-input").wrap('<div class="stepper ' + opts.customClass + '" />').after('<span class="stepper-arrow up">' + opts.labels.up + '</span><span class="stepper-arrow down">' + opts.labels.down + "</span>");
        var $stepper = $input.parent(".stepper"),
          data = $.extend({
            $stepper: $stepper,
            $input: $input,
            $arrow: $stepper.find(".stepper-arrow"),
            min: !isNaN(min) && min,
            max: !isNaN(max) && max,
            step: isNaN(step) ? 1 : step,
            timer: null
          }, opts);
        data.digits = (value = data.step, -1 < (test = String(value)).indexOf(".") ? test.length - test.indexOf(".") - 1 : 0), $input.is(":disabled") && $stepper.addClass("disabled"), $stepper.on("keypress", ".stepper-input", data, _onKeyup), $stepper.on("mousedown.stepper", ".stepper-arrow", data, _onMouseDown).data("stepper", data), $stepper.on("mouseleave.stepper", ".stepper-arrow", data, _onMouseUp).data("stepper", data)
      }
      var value, test
    }

    function _onKeyup(e) {
      var data = e.data;
      38 !== e.keyCode && 40 !== e.keyCode || (e.preventDefault(), _step(data, 38 === e.keyCode ? data.step : -data.step))
    }

    function _onMouseDown(e) {
      e.preventDefault(), e.stopPropagation(), _onMouseUp(e);
      var timer, time, callback, data = e.data;
      if (!data.$input.is(":disabled") && !data.$stepper.hasClass("disabled")) {
        var change = $(e.target).hasClass("up") ? data.step : -data.step;
        data.timer = (timer = data.timer, time = 125, callback = function() {
          _step(data, change)
        }, _clearTimer(timer), setInterval(callback, time)), _step(data, change), $("body").on("mouseup.stepper", data, _onMouseUp)
      }
    }

    function _onMouseUp(e) {
      e.preventDefault(), e.stopPropagation(), _clearTimer(e.data.timer), $("body").off(".stepper")
    }

    function _step(data, change) {
      var originalValue = parseFloat(data.$input.val()),
        value = change;
      isNaN(originalValue) ? value = !1 !== data.min ? data.min : 0 : !1 !== data.min && originalValue < data.min ? value = data.min : value += originalValue;
      var diff = (value - data.min) % data.step;
      0 != diff && (value -= diff), !1 !== data.min && value < data.min && (value = data.min), !1 !== data.max && value > data.max && (value -= data.step), value !== originalValue && (value = function(value, digits) {
        var exp = Math.pow(10, digits);
        return Math.round(value * exp) / exp
      }(value, data.digits), data.$input.val(value).trigger("change"))
    }

    function _clearTimer(timer) {
      timer && (clearInterval(timer), timer = null)
    }
    $.fn.stepper = function(method) {
      return pub[method] ? pub[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? this : function(opts) {
        opts = $.extend({}, options, opts || {});
        for (var $items = $(this), i = 0, count = $items.length; i < count; i++) _build($items.eq(i), opts);
        return $items
      }.apply(this, arguments)
    }, $.stepper = function(method) {
      "defaults" === method && pub.defaults.apply(this, Array.prototype.slice.call(arguments, 1))
    }
  }(jQuery),
  function(root, factory) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a0) {
      return factory(a0)
    }) : "object" == typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery)
  }(0, function($) {
    function core() {
      this.__$emitterPrivate = $({}), this.__$emitterPublic = $({}), this.__instancesLatestArr = [], this.__plugins = {}, this._env = env
    }
    var defaults = {
        animation: "fade",
        animationDuration: 350,
        content: null,
        contentAsHTML: !1,
        contentCloning: !1,
        debug: !0,
        delay: 300,
        delayTouch: [300, 500],
        functionInit: null,
        functionBefore: null,
        functionReady: null,
        functionAfter: null,
        functionFormat: null,
        IEmin: 6,
        interactive: !1,
        multiple: !1,
        parent: null,
        plugins: ["sideTip"],
        repositionOnScroll: !1,
        restoration: "none",
        selfDestruction: !0,
        theme: [],
        timer: 0,
        trackerInterval: 500,
        trackOrigin: !1,
        trackTooltip: !1,
        trigger: "hover",
        triggerClose: {
          click: !1,
          mouseleave: !1,
          originClick: !1,
          scroll: !1,
          tap: !1,
          touchleave: !1
        },
        triggerOpen: {
          click: !1,
          mouseenter: !1,
          tap: !1,
          touchstart: !1
        },
        updateAnimation: "rotate",
        zIndex: 9999999
      },
      win = "undefined" != typeof window ? window : null,
      env = {
        hasTouchCapability: !(!win || !("ontouchstart" in win || win.DocumentTouch && win.document instanceof win.DocumentTouch || win.navigator.maxTouchPoints)),
        hasTransitions: function() {
          if (!win) return !1;
          var s = (win.document.body || win.document.documentElement).style,
            p = "transition",
            v = ["Moz", "Webkit", "Khtml", "O", "ms"];
          if ("string" == typeof s[p]) return !0;
          p = p.charAt(0).toUpperCase() + p.substr(1);
          for (var i = 0; i < v.length; i++)
            if ("string" == typeof s[v[i] + p]) return !0;
          return !1
        }(),
        IE: !1,
        semVer: "4.2.5",
        window: win
      };

    function Ruler($tooltip) {
      this.$container, this.constraints = null, this.__$tooltip, this.__init($tooltip)
    }

    function areEqual(a, b) {
      var same = !0;
      return $.each(a, function(i, _) {
        if (void 0 === b[i] || a[i] !== b[i]) return same = !1
      }), same
    }

    function bodyContains($obj) {
      var id = $obj.attr("id"),
        el = id ? env.window.document.getElementById(id) : null;
      return el ? el === $obj[0] : $.contains(env.window.document.body, $obj[0])
    }
    core.prototype = {
      __bridge: function(constructor, obj, pluginName) {
        if (!obj[pluginName]) {
          function fn() {}
          fn.prototype = constructor;
          var pluginInstance = new fn;
          pluginInstance.__init && pluginInstance.__init(obj), $.each(constructor, function(methodName, fn) {
            0 != methodName.indexOf("__") && (obj[methodName] ? defaults.debug && console.log("The " + methodName + " method of the " + pluginName + " plugin conflicts with another plugin or native methods") : (obj[methodName] = function() {
              return pluginInstance[methodName].apply(pluginInstance, Array.prototype.slice.apply(arguments))
            }, obj[methodName].bridged = pluginInstance))
          }), obj[pluginName] = pluginInstance
        }
        return this
      },
      __setWindow: function(window) {
        return env.window = window, this
      },
      _getRuler: function($tooltip) {
        return new Ruler($tooltip)
      },
      _off: function() {
        return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _on: function() {
        return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _one: function() {
        return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _plugin: function(plugin) {
        if ("string" == typeof plugin) {
          var pluginName = plugin,
            p = null;
          return 0 < pluginName.indexOf(".") ? p = this.__plugins[pluginName] : $.each(this.__plugins, function(i, plugin) {
            if (plugin.name.substring(plugin.name.length - pluginName.length - 1) == "." + pluginName) return p = plugin, !1
          }), p
        }
        if (plugin.name.indexOf(".") < 0) throw new Error("Plugins must be namespaced");
        return (this.__plugins[plugin.name] = plugin).core && this.__bridge(plugin.core, this, plugin.name), this
      },
      _trigger: function() {
        var args = Array.prototype.slice.apply(arguments);
        return "string" == typeof args[0] && (args[0] = {
          type: args[0]
        }), this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, args), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, args), this
      },
      instances: function(selector) {
        var instances = [];
        return $(selector || ".tooltipstered").each(function() {
          var $this = $(this),
            ns = $this.data("tooltipster-ns");
          ns && $.each(ns, function(i, namespace) {
            instances.push($this.data(namespace))
          })
        }), instances
      },
      instancesLatest: function() {
        return this.__instancesLatestArr
      },
      off: function() {
        return this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      on: function() {
        return this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      one: function() {
        return this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      origins: function(selector) {
        return $((selector ? selector + " " : "") + ".tooltipstered").toArray()
      },
      setDefaults: function(d) {
        return $.extend(defaults, d), this
      },
      triggerHandler: function() {
        return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      }
    }, $.tooltipster = new core, $.Tooltipster = function(element, options) {
      this.__callbacks = {
        close: [],
        open: []
      }, this.__closingTime, this.__Content, this.__contentBcr, this.__destroyed = !1, this.__$emitterPrivate = $({}), this.__$emitterPublic = $({}), this.__enabled = !0, this.__garbageCollector, this.__Geometry, this.__lastPosition, this.__namespace = "tooltipster-" + Math.round(1e6 * Math.random()), this.__options, this.__$originParents, this.__pointerIsOverOrigin = !1, this.__previousThemes = [], this.__state = "closed", this.__timeouts = {
        close: [],
        open: null
      }, this.__touchEvents = [], this.__tracker = null, this._$origin, this._$tooltip, this.__init(element, options)
    }, $.Tooltipster.prototype = {
      __init: function(origin, options) {
        var self = this;
        if (self._$origin = $(origin), self.__options = $.extend(!0, {}, defaults, options), self.__optionsFormat(), !env.IE || env.IE >= self.__options.IEmin) {
          var initialTitle = null;
          if (void 0 === self._$origin.data("tooltipster-initialTitle") && (void 0 === (initialTitle = self._$origin.attr("title")) && (initialTitle = null), self._$origin.data("tooltipster-initialTitle", initialTitle)), null !== self.__options.content) self.__contentSet(self.__options.content);
          else {
            var $el, selector = self._$origin.attr("data-tooltip-content");
            selector && ($el = $(selector)), $el && $el[0] ? self.__contentSet($el.first()) : self.__contentSet(initialTitle)
          }
          self._$origin.removeAttr("title").addClass("tooltipstered"), self.__prepareOrigin(), self.__prepareGC(), $.each(self.__options.plugins, function(i, pluginName) {
            self._plug(pluginName)
          }), env.hasTouchCapability && $(env.window.document.body).on("touchmove." + self.__namespace + "-triggerOpen", function(event) {
            self._touchRecordEvent(event)
          }), self._on("created", function() {
            self.__prepareTooltip()
          })._on("repositioned", function(e) {
            self.__lastPosition = e.position
          })
        } else self.__options.disabled = !0
      },
      __contentInsert: function() {
        var $el = this._$tooltip.find(".tooltipster-content"),
          formattedContent = this.__Content;
        return this._trigger({
          type: "format",
          content: this.__Content,
          format: function(content) {
            formattedContent = content
          }
        }), this.__options.functionFormat && (formattedContent = this.__options.functionFormat.call(this, this, {
          origin: this._$origin[0]
        }, this.__Content)), "string" != typeof formattedContent || this.__options.contentAsHTML ? $el.empty().append(formattedContent) : $el.text(formattedContent), this
      },
      __contentSet: function(content) {
        return content instanceof $ && this.__options.contentCloning && (content = content.clone(!0)), this.__Content = content, this._trigger({
          type: "updated",
          content: content
        }), this
      },
      __destroyError: function() {
        throw new Error("This tooltip has been destroyed and cannot execute your method call.")
      },
      __geometry: function() {
        var $target = this._$origin,
          originIsArea = this._$origin.is("area");
        if (originIsArea) {
          var mapName = this._$origin.parent().attr("name");
          $target = $('img[usemap="#' + mapName + '"]')
        }
        var bcr = $target[0].getBoundingClientRect(),
          $document = $(env.window.document),
          $window = $(env.window),
          $parent = $target,
          geo = {
            available: {
              document: null,
              window: null
            },
            document: {
              size: {
                height: $document.height(),
                width: $document.width()
              }
            },
            window: {
              scroll: {
                left: env.window.scrollX || env.window.document.documentElement.scrollLeft,
                top: env.window.scrollY || env.window.document.documentElement.scrollTop
              },
              size: {
                height: $window.height(),
                width: $window.width()
              }
            },
            origin: {
              fixedLineage: !1,
              offset: {},
              size: {
                height: bcr.bottom - bcr.top,
                width: bcr.right - bcr.left
              },
              usemapImage: originIsArea ? $target[0] : null,
              windowOffset: {
                bottom: bcr.bottom,
                left: bcr.left,
                right: bcr.right,
                top: bcr.top
              }
            }
          };
        if (originIsArea) {
          var shape = this._$origin.attr("shape"),
            coords = this._$origin.attr("coords");
          if (coords && (coords = coords.split(","), $.map(coords, function(val, i) {
              coords[i] = parseInt(val)
            })), "default" != shape) switch (shape) {
            case "circle":
              var circleCenterLeft = coords[0],
                circleCenterTop = coords[1],
                circleRadius = coords[2],
                areaTopOffset = circleCenterTop - circleRadius,
                areaLeftOffset = circleCenterLeft - circleRadius;
              geo.origin.size.height = 2 * circleRadius, geo.origin.size.width = geo.origin.size.height, geo.origin.windowOffset.left += areaLeftOffset, geo.origin.windowOffset.top += areaTopOffset;
              break;
            case "rect":
              var areaLeft = coords[0],
                areaTop = coords[1],
                areaRight = coords[2],
                areaBottom = coords[3];
              geo.origin.size.height = areaBottom - areaTop, geo.origin.size.width = areaRight - areaLeft, geo.origin.windowOffset.left += areaLeft, geo.origin.windowOffset.top += areaTop;
              break;
            case "poly":
              for (var areaSmallestX = 0, areaSmallestY = 0, areaGreatestX = 0, areaGreatestY = 0, arrayAlternate = "even", i = 0; i < coords.length; i++) {
                var areaNumber = coords[i];
                arrayAlternate = "even" == arrayAlternate ? (areaGreatestX < areaNumber && (areaGreatestX = areaNumber, 0 === i && (areaSmallestX = areaGreatestX)), areaNumber < areaSmallestX && (areaSmallestX = areaNumber), "odd") : (areaGreatestY < areaNumber && (areaGreatestY = areaNumber, 1 == i && (areaSmallestY = areaGreatestY)), areaNumber < areaSmallestY && (areaSmallestY = areaNumber), "even")
              }
              geo.origin.size.height = areaGreatestY - areaSmallestY, geo.origin.size.width = areaGreatestX - areaSmallestX, geo.origin.windowOffset.left += areaSmallestX, geo.origin.windowOffset.top += areaSmallestY
          }
        }
        for (this._trigger({
            type: "geometry",
            edit: function(r) {
              geo.origin.size.height = r.height, geo.origin.windowOffset.left = r.left, geo.origin.windowOffset.top = r.top, geo.origin.size.width = r.width
            },
            geometry: {
              height: geo.origin.size.height,
              left: geo.origin.windowOffset.left,
              top: geo.origin.windowOffset.top,
              width: geo.origin.size.width
            }
          }), geo.origin.windowOffset.right = geo.origin.windowOffset.left + geo.origin.size.width, geo.origin.windowOffset.bottom = geo.origin.windowOffset.top + geo.origin.size.height, geo.origin.offset.left = geo.origin.windowOffset.left + geo.window.scroll.left, geo.origin.offset.top = geo.origin.windowOffset.top + geo.window.scroll.top, geo.origin.offset.bottom = geo.origin.offset.top + geo.origin.size.height, geo.origin.offset.right = geo.origin.offset.left + geo.origin.size.width, geo.available.document = {
            bottom: {
              height: geo.document.size.height - geo.origin.offset.bottom,
              width: geo.document.size.width
            },
            left: {
              height: geo.document.size.height,
              width: geo.origin.offset.left
            },
            right: {
              height: geo.document.size.height,
              width: geo.document.size.width - geo.origin.offset.right
            },
            top: {
              height: geo.origin.offset.top,
              width: geo.document.size.width
            }
          }, geo.available.window = {
            bottom: {
              height: Math.max(geo.window.size.height - Math.max(geo.origin.windowOffset.bottom, 0), 0),
              width: geo.window.size.width
            },
            left: {
              height: geo.window.size.height,
              width: Math.max(geo.origin.windowOffset.left, 0)
            },
            right: {
              height: geo.window.size.height,
              width: Math.max(geo.window.size.width - Math.max(geo.origin.windowOffset.right, 0), 0)
            },
            top: {
              height: Math.max(geo.origin.windowOffset.top, 0),
              width: geo.window.size.width
            }
          };
          "html" != $parent[0].tagName.toLowerCase();) {
          if ("fixed" == $parent.css("position")) {
            geo.origin.fixedLineage = !0;
            break
          }
          $parent = $parent.parent()
        }
        return geo
      },
      __optionsFormat: function() {
        return "number" == typeof this.__options.animationDuration && (this.__options.animationDuration = [this.__options.animationDuration, this.__options.animationDuration]), "number" == typeof this.__options.delay && (this.__options.delay = [this.__options.delay, this.__options.delay]), "number" == typeof this.__options.delayTouch && (this.__options.delayTouch = [this.__options.delayTouch, this.__options.delayTouch]), "string" == typeof this.__options.theme && (this.__options.theme = [this.__options.theme]), null === this.__options.parent ? this.__options.parent = $(env.window.document.body) : "string" == typeof this.__options.parent && (this.__options.parent = $(this.__options.parent)), "hover" == this.__options.trigger ? (this.__options.triggerOpen = {
          mouseenter: !0,
          touchstart: !0
        }, this.__options.triggerClose = {
          mouseleave: !0,
          originClick: !0,
          touchleave: !0
        }) : "click" == this.__options.trigger && (this.__options.triggerOpen = {
          click: !0,
          tap: !0
        }, this.__options.triggerClose = {
          click: !0,
          tap: !0
        }), this._trigger("options"), this
      },
      __prepareGC: function() {
        var self = this;
        return self.__options.selfDestruction ? self.__garbageCollector = setInterval(function() {
          var now = (new Date).getTime();
          self.__touchEvents = $.grep(self.__touchEvents, function(event, i) {
            return 6e4 < now - event.time
          }), bodyContains(self._$origin) || self.close(function() {
            self.destroy()
          })
        }, 2e4) : clearInterval(self.__garbageCollector), self
      },
      __prepareOrigin: function() {
        var self = this;
        if (self._$origin.off("." + self.__namespace + "-triggerOpen"), env.hasTouchCapability && self._$origin.on("touchstart." + self.__namespace + "-triggerOpen touchend." + self.__namespace + "-triggerOpen touchcancel." + self.__namespace + "-triggerOpen", function(event) {
            self._touchRecordEvent(event)
          }), self.__options.triggerOpen.click || self.__options.triggerOpen.tap && env.hasTouchCapability) {
          var eventNames = "";
          self.__options.triggerOpen.click && (eventNames += "click." + self.__namespace + "-triggerOpen "), self.__options.triggerOpen.tap && env.hasTouchCapability && (eventNames += "touchend." + self.__namespace + "-triggerOpen"), self._$origin.on(eventNames, function(event) {
            self._touchIsMeaningfulEvent(event) && self._open(event)
          })
        }
        if (self.__options.triggerOpen.mouseenter || self.__options.triggerOpen.touchstart && env.hasTouchCapability) {
          eventNames = "";
          self.__options.triggerOpen.mouseenter && (eventNames += "mouseenter." + self.__namespace + "-triggerOpen "), self.__options.triggerOpen.touchstart && env.hasTouchCapability && (eventNames += "touchstart." + self.__namespace + "-triggerOpen"), self._$origin.on(eventNames, function(event) {
            !self._touchIsTouchEvent(event) && self._touchIsEmulatedEvent(event) || (self.__pointerIsOverOrigin = !0, self._openShortly(event))
          })
        }
        if (self.__options.triggerClose.mouseleave || self.__options.triggerClose.touchleave && env.hasTouchCapability) {
          eventNames = "";
          self.__options.triggerClose.mouseleave && (eventNames += "mouseleave." + self.__namespace + "-triggerOpen "), self.__options.triggerClose.touchleave && env.hasTouchCapability && (eventNames += "touchend." + self.__namespace + "-triggerOpen touchcancel." + self.__namespace + "-triggerOpen"), self._$origin.on(eventNames, function(event) {
            self._touchIsMeaningfulEvent(event) && (self.__pointerIsOverOrigin = !1)
          })
        }
        return self
      },
      __prepareTooltip: function() {
        var self = this,
          p = self.__options.interactive ? "auto" : "";
        return self._$tooltip.attr("id", self.__namespace).css({
          "pointer-events": p,
          zIndex: self.__options.zIndex
        }), $.each(self.__previousThemes, function(i, theme) {
          self._$tooltip.removeClass(theme)
        }), $.each(self.__options.theme, function(i, theme) {
          self._$tooltip.addClass(theme)
        }), self.__previousThemes = $.merge([], self.__options.theme), self
      },
      __scrollHandler: function(event) {
        if (this.__options.triggerClose.scroll) this._close(event);
        else if (bodyContains(this._$origin) && bodyContains(this._$tooltip)) {
          var geo = null;
          if (event.target === env.window.document) this.__Geometry.origin.fixedLineage || this.__options.repositionOnScroll && this.reposition(event);
          else {
            geo = this.__geometry();
            var overflows = !1;
            if ("fixed" != this._$origin.css("position") && this.__$originParents.each(function(i, el) {
                var $el = $(el),
                  overflowX = $el.css("overflow-x"),
                  overflowY = $el.css("overflow-y");
                if ("visible" != overflowX || "visible" != overflowY) {
                  var bcr = el.getBoundingClientRect();
                  if ("visible" != overflowX && (geo.origin.windowOffset.left < bcr.left || geo.origin.windowOffset.right > bcr.right)) return !(overflows = !0);
                  if ("visible" != overflowY && (geo.origin.windowOffset.top < bcr.top || geo.origin.windowOffset.bottom > bcr.bottom)) return !(overflows = !0)
                }
                if ("fixed" == $el.css("position")) return !1
              }), overflows) this._$tooltip.css("visibility", "hidden");
            else if (this._$tooltip.css("visibility", "visible"), this.__options.repositionOnScroll) this.reposition(event);
            else {
              var offsetLeft = geo.origin.offset.left - this.__Geometry.origin.offset.left,
                offsetTop = geo.origin.offset.top - this.__Geometry.origin.offset.top;
              this._$tooltip.css({
                left: this.__lastPosition.coord.left + offsetLeft,
                top: this.__lastPosition.coord.top + offsetTop
              })
            }
          }
          this._trigger({
            type: "scroll",
            event: event,
            geo: geo
          })
        }
        return this
      },
      __stateSet: function(state) {
        return this.__state = state, this._trigger({
          type: "state",
          state: state
        }), this
      },
      __timeoutsClear: function() {
        return clearTimeout(this.__timeouts.open), this.__timeouts.open = null, $.each(this.__timeouts.close, function(i, timeout) {
          clearTimeout(timeout)
        }), this.__timeouts.close = [], this
      },
      __trackerStart: function() {
        var self = this,
          $content = self._$tooltip.find(".tooltipster-content");
        return self.__options.trackTooltip && (self.__contentBcr = $content[0].getBoundingClientRect()), self.__tracker = setInterval(function() {
          if (bodyContains(self._$origin) && bodyContains(self._$tooltip)) {
            if (self.__options.trackOrigin) {
              var g = self.__geometry(),
                identical = !1;
              areEqual(g.origin.size, self.__Geometry.origin.size) && (self.__Geometry.origin.fixedLineage ? areEqual(g.origin.windowOffset, self.__Geometry.origin.windowOffset) && (identical = !0) : areEqual(g.origin.offset, self.__Geometry.origin.offset) && (identical = !0)), identical || (self.__options.triggerClose.mouseleave ? self._close() : self.reposition())
            }
            if (self.__options.trackTooltip) {
              var currentBcr = $content[0].getBoundingClientRect();
              currentBcr.height === self.__contentBcr.height && currentBcr.width === self.__contentBcr.width || (self.reposition(), self.__contentBcr = currentBcr)
            }
          } else self._close()
        }, self.__options.trackerInterval), self
      },
      _close: function(event, callback, force) {
        var self = this,
          ok = !0;
        if (self._trigger({
            type: "close",
            event: event,
            stop: function() {
              ok = !1
            }
          }), ok || force) {
          callback && self.__callbacks.close.push(callback), self.__callbacks.open = [], self.__timeoutsClear();

          function finishCallbacks() {
            $.each(self.__callbacks.close, function(i, c) {
              c.call(self, self, {
                event: event,
                origin: self._$origin[0]
              })
            }), self.__callbacks.close = []
          }
          if ("closed" != self.__state) {
            var necessary = !0,
              newClosingTime = (new Date).getTime() + self.__options.animationDuration[1];
            if ("disappearing" == self.__state && newClosingTime > self.__closingTime && 0 < self.__options.animationDuration[1] && (necessary = !1), necessary) {
              self.__closingTime = newClosingTime, "disappearing" != self.__state && self.__stateSet("disappearing");

              function finish() {
                clearInterval(self.__tracker), self._trigger({
                  type: "closing",
                  event: event
                }), self._$tooltip.off("." + self.__namespace + "-triggerClose").removeClass("tooltipster-dying"), $(env.window).off("." + self.__namespace + "-triggerClose"), self.__$originParents.each(function(i, el) {
                  $(el).off("scroll." + self.__namespace + "-triggerClose")
                }), self.__$originParents = null, $(env.window.document.body).off("." + self.__namespace + "-triggerClose"), self._$origin.off("." + self.__namespace + "-triggerClose"), self._off("dismissable"), self.__stateSet("closed"), self._trigger({
                  type: "after",
                  event: event
                }), self.__options.functionAfter && self.__options.functionAfter.call(self, self, {
                  event: event,
                  origin: self._$origin[0]
                }), finishCallbacks()
              }
              env.hasTransitions ? (self._$tooltip.css({
                "-moz-animation-duration": self.__options.animationDuration[1] + "ms",
                "-ms-animation-duration": self.__options.animationDuration[1] + "ms",
                "-o-animation-duration": self.__options.animationDuration[1] + "ms",
                "-webkit-animation-duration": self.__options.animationDuration[1] + "ms",
                "animation-duration": self.__options.animationDuration[1] + "ms",
                "transition-duration": self.__options.animationDuration[1] + "ms"
              }), self._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"), 0 < self.__options.animationDuration[1] && self._$tooltip.delay(self.__options.animationDuration[1]), self._$tooltip.queue(finish)) : self._$tooltip.stop().fadeOut(self.__options.animationDuration[1], finish)
            }
          } else finishCallbacks()
        }
        return self
      },
      _off: function() {
        return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _on: function() {
        return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _one: function() {
        return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _open: function(event, callback) {
        var self = this;
        if (!self.__destroying && bodyContains(self._$origin) && self.__enabled) {
          var ok = !0;
          if ("closed" == self.__state && (self._trigger({
              type: "before",
              event: event,
              stop: function() {
                ok = !1
              }
            }), ok && self.__options.functionBefore && (ok = self.__options.functionBefore.call(self, self, {
              event: event,
              origin: self._$origin[0]
            }))), !1 !== ok && null !== self.__Content) {
            callback && self.__callbacks.open.push(callback), self.__callbacks.close = [], self.__timeoutsClear();

            function finish() {
              "stable" != self.__state && self.__stateSet("stable"), $.each(self.__callbacks.open, function(i, c) {
                c.call(self, self, {
                  origin: self._$origin[0],
                  tooltip: self._$tooltip[0]
                })
              }), self.__callbacks.open = []
            }
            var extraTime;
            if ("closed" !== self.__state) extraTime = 0, "disappearing" === self.__state ? (self.__stateSet("appearing"), env.hasTransitions ? (self._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"), 0 < self.__options.animationDuration[0] && self._$tooltip.delay(self.__options.animationDuration[0]), self._$tooltip.queue(finish)) : self._$tooltip.stop().fadeIn(finish)) : "stable" == self.__state && finish();
            else {
              if (self.__stateSet("appearing"), extraTime = self.__options.animationDuration[0], self.__contentInsert(), self.reposition(event, !0), env.hasTransitions ? (self._$tooltip.addClass("tooltipster-" + self.__options.animation).addClass("tooltipster-initial").css({
                  "-moz-animation-duration": self.__options.animationDuration[0] + "ms",
                  "-ms-animation-duration": self.__options.animationDuration[0] + "ms",
                  "-o-animation-duration": self.__options.animationDuration[0] + "ms",
                  "-webkit-animation-duration": self.__options.animationDuration[0] + "ms",
                  "animation-duration": self.__options.animationDuration[0] + "ms",
                  "transition-duration": self.__options.animationDuration[0] + "ms"
                }), setTimeout(function() {
                  "closed" != self.__state && (self._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"), 0 < self.__options.animationDuration[0] && self._$tooltip.delay(self.__options.animationDuration[0]), self._$tooltip.queue(finish))
                }, 0)) : self._$tooltip.css("display", "none").fadeIn(self.__options.animationDuration[0], finish), self.__trackerStart(), $(env.window).on("resize." + self.__namespace + "-triggerClose", function(e) {
                  var $ae = $(document.activeElement);
                  ($ae.is("input") || $ae.is("textarea")) && $.contains(self._$tooltip[0], $ae[0]) || self.reposition(e)
                }).on("scroll." + self.__namespace + "-triggerClose", function(e) {
                  self.__scrollHandler(e)
                }), self.__$originParents = self._$origin.parents(), self.__$originParents.each(function(i, parent) {
                  $(parent).on("scroll." + self.__namespace + "-triggerClose", function(e) {
                    self.__scrollHandler(e)
                  })
                }), self.__options.triggerClose.mouseleave || self.__options.triggerClose.touchleave && env.hasTouchCapability) {
                self._on("dismissable", function(event) {
                  event.dismissable ? event.delay ? (timeout = setTimeout(function() {
                    self._close(event.event)
                  }, event.delay), self.__timeouts.close.push(timeout)) : self._close(event) : clearTimeout(timeout)
                });
                var $elements = self._$origin,
                  eventNamesIn = "",
                  eventNamesOut = "",
                  timeout = null;
                self.__options.interactive && ($elements = $elements.add(self._$tooltip)), self.__options.triggerClose.mouseleave && (eventNamesIn += "mouseenter." + self.__namespace + "-triggerClose ", eventNamesOut += "mouseleave." + self.__namespace + "-triggerClose "), self.__options.triggerClose.touchleave && env.hasTouchCapability && (eventNamesIn += "touchstart." + self.__namespace + "-triggerClose", eventNamesOut += "touchend." + self.__namespace + "-triggerClose touchcancel." + self.__namespace + "-triggerClose"), $elements.on(eventNamesOut, function(event) {
                  if (self._touchIsTouchEvent(event) || !self._touchIsEmulatedEvent(event)) {
                    var delay = "mouseleave" == event.type ? self.__options.delay : self.__options.delayTouch;
                    self._trigger({
                      delay: delay[1],
                      dismissable: !0,
                      event: event,
                      type: "dismissable"
                    })
                  }
                }).on(eventNamesIn, function(event) {
                  !self._touchIsTouchEvent(event) && self._touchIsEmulatedEvent(event) || self._trigger({
                    dismissable: !1,
                    event: event,
                    type: "dismissable"
                  })
                })
              }
              self.__options.triggerClose.originClick && self._$origin.on("click." + self.__namespace + "-triggerClose", function(event) {
                self._touchIsTouchEvent(event) || self._touchIsEmulatedEvent(event) || self._close(event)
              }), (self.__options.triggerClose.click || self.__options.triggerClose.tap && env.hasTouchCapability) && setTimeout(function() {
                if ("closed" != self.__state) {
                  var eventNames = "",
                    $body = $(env.window.document.body);
                  self.__options.triggerClose.click && (eventNames += "click." + self.__namespace + "-triggerClose "), self.__options.triggerClose.tap && env.hasTouchCapability && (eventNames += "touchend." + self.__namespace + "-triggerClose"), $body.on(eventNames, function(event) {
                    self._touchIsMeaningfulEvent(event) && (self._touchRecordEvent(event), self.__options.interactive && $.contains(self._$tooltip[0], event.target) || self._close(event))
                  }), self.__options.triggerClose.tap && env.hasTouchCapability && $body.on("touchstart." + self.__namespace + "-triggerClose", function(event) {
                    self._touchRecordEvent(event)
                  })
                }
              }, 0), self._trigger("ready"), self.__options.functionReady && self.__options.functionReady.call(self, self, {
                origin: self._$origin[0],
                tooltip: self._$tooltip[0]
              })
            }
            if (0 < self.__options.timer) {
              timeout = setTimeout(function() {
                self._close()
              }, self.__options.timer + extraTime);
              self.__timeouts.close.push(timeout)
            }
          }
        }
        return self
      },
      _openShortly: function(event) {
        var self = this,
          ok = !0;
        if ("stable" != self.__state && "appearing" != self.__state && !self.__timeouts.open && (self._trigger({
            type: "start",
            event: event,
            stop: function() {
              ok = !1
            }
          }), ok)) {
          var delay = 0 == event.type.indexOf("touch") ? self.__options.delayTouch : self.__options.delay;
          delay[0] ? self.__timeouts.open = setTimeout(function() {
            self.__timeouts.open = null, self.__pointerIsOverOrigin && self._touchIsMeaningfulEvent(event) ? (self._trigger("startend"), self._open(event)) : self._trigger("startcancel")
          }, delay[0]) : (self._trigger("startend"), self._open(event))
        }
        return self
      },
      _optionsExtract: function(pluginName, defaultOptions) {
        var self = this,
          options = $.extend(!0, {}, defaultOptions),
          pluginOptions = self.__options[pluginName];
        return pluginOptions || (pluginOptions = {}, $.each(defaultOptions, function(optionName, value) {
          var o = self.__options[optionName];
          void 0 !== o && (pluginOptions[optionName] = o)
        })), $.each(options, function(optionName, value) {
          void 0 !== pluginOptions[optionName] && ("object" != typeof value || value instanceof Array || null == value || "object" != typeof pluginOptions[optionName] || pluginOptions[optionName] instanceof Array || null == pluginOptions[optionName] ? options[optionName] = pluginOptions[optionName] : $.extend(options[optionName], pluginOptions[optionName]))
        }), options
      },
      _plug: function(pluginName) {
        var plugin = $.tooltipster._plugin(pluginName);
        if (!plugin) throw new Error('The "' + pluginName + '" plugin is not defined');
        return plugin.instance && $.tooltipster.__bridge(plugin.instance, this, plugin.name), this
      },
      _touchIsEmulatedEvent: function(event) {
        for (var isEmulated = !1, now = (new Date).getTime(), i = this.__touchEvents.length - 1; 0 <= i; i--) {
          var e = this.__touchEvents[i];
          if (!(now - e.time < 500)) break;
          e.target === event.target && (isEmulated = !0)
        }
        return isEmulated
      },
      _touchIsMeaningfulEvent: function(event) {
        return this._touchIsTouchEvent(event) && !this._touchSwiped(event.target) || !this._touchIsTouchEvent(event) && !this._touchIsEmulatedEvent(event)
      },
      _touchIsTouchEvent: function(event) {
        return 0 == event.type.indexOf("touch")
      },
      _touchRecordEvent: function(event) {
        return this._touchIsTouchEvent(event) && (event.time = (new Date).getTime(), this.__touchEvents.push(event)), this
      },
      _touchSwiped: function(target) {
        for (var swiped = !1, i = this.__touchEvents.length - 1; 0 <= i; i--) {
          var e = this.__touchEvents[i];
          if ("touchmove" == e.type) {
            swiped = !0;
            break
          }
          if ("touchstart" == e.type && target === e.target) break
        }
        return swiped
      },
      _trigger: function() {
        var args = Array.prototype.slice.apply(arguments);
        return "string" == typeof args[0] && (args[0] = {
          type: args[0]
        }), args[0].instance = this, args[0].origin = this._$origin ? this._$origin[0] : null, args[0].tooltip = this._$tooltip ? this._$tooltip[0] : null, this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, args), $.tooltipster._trigger.apply($.tooltipster, args), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, args), this
      },
      _unplug: function(pluginName) {
        var self = this;
        if (self[pluginName]) {
          var plugin = $.tooltipster._plugin(pluginName);
          plugin.instance && $.each(plugin.instance, function(methodName, fn) {
            self[methodName] && self[methodName].bridged === self[pluginName] && delete self[methodName]
          }), self[pluginName].__destroy && self[pluginName].__destroy(), delete self[pluginName]
        }
        return self
      },
      close: function(callback) {
        return this.__destroyed ? this.__destroyError() : this._close(null, callback), this
      },
      content: function(content) {
        var self = this;
        if (void 0 === content) return self.__Content;
        if (self.__destroyed) self.__destroyError();
        else if (self.__contentSet(content), null !== self.__Content) {
          if ("closed" !== self.__state && (self.__contentInsert(), self.reposition(), self.__options.updateAnimation))
            if (env.hasTransitions) {
              var animation = self.__options.updateAnimation;
              self._$tooltip.addClass("tooltipster-update-" + animation), setTimeout(function() {
                "closed" != self.__state && self._$tooltip.removeClass("tooltipster-update-" + animation)
              }, 1e3)
            } else self._$tooltip.fadeTo(200, .5, function() {
              "closed" != self.__state && self._$tooltip.fadeTo(200, 1)
            })
        } else self._close();
        return self
      },
      destroy: function() {
        var self = this;
        if (self.__destroyed) self.__destroyError();
        else {
          "closed" != self.__state ? self.option("animationDuration", 0)._close(null, null, !0) : self.__timeoutsClear(), self._trigger("destroy"), self.__destroyed = !0, self._$origin.removeData(self.__namespace).off("." + self.__namespace + "-triggerOpen"), $(env.window.document.body).off("." + self.__namespace + "-triggerOpen");
          var ns = self._$origin.data("tooltipster-ns");
          if (ns)
            if (1 === ns.length) {
              var title = null;
              "previous" == self.__options.restoration ? title = self._$origin.data("tooltipster-initialTitle") : "current" == self.__options.restoration && (title = "string" == typeof self.__Content ? self.__Content : $("<div></div>").append(self.__Content).html()), title && self._$origin.attr("title", title), self._$origin.removeClass("tooltipstered"), self._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle")
            } else ns = $.grep(ns, function(el, i) {
              return el !== self.__namespace
            }), self._$origin.data("tooltipster-ns", ns);
          self._trigger("destroyed"), self._off(), self.off(), self.__Content = null, self.__$emitterPrivate = null, self.__$emitterPublic = null, self.__options.parent = null, self._$origin = null, self._$tooltip = null, $.tooltipster.__instancesLatestArr = $.grep($.tooltipster.__instancesLatestArr, function(el, i) {
            return self !== el
          }), clearInterval(self.__garbageCollector)
        }
        return self
      },
      disable: function() {
        return this.__destroyed ? this.__destroyError() : (this._close(), this.__enabled = !1), this
      },
      elementOrigin: function() {
        if (!this.__destroyed) return this._$origin[0];
        this.__destroyError()
      },
      elementTooltip: function() {
        return this._$tooltip ? this._$tooltip[0] : null
      },
      enable: function() {
        return this.__enabled = !0, this
      },
      hide: function(callback) {
        return this.close(callback)
      },
      instance: function() {
        return this
      },
      off: function() {
        return this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      on: function() {
        return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      one: function() {
        return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      open: function(callback) {
        return this.__destroyed ? this.__destroyError() : this._open(null, callback), this
      },
      option: function(o, val) {
        return void 0 === val ? this.__options[o] : (this.__destroyed ? this.__destroyError() : (this.__options[o] = val, this.__optionsFormat(), 0 <= $.inArray(o, ["trigger", "triggerClose", "triggerOpen"]) && this.__prepareOrigin(), "selfDestruction" === o && this.__prepareGC()), this)
      },
      reposition: function(event, tooltipIsDetached) {
        return this.__destroyed ? this.__destroyError() : "closed" != this.__state && bodyContains(this._$origin) && (tooltipIsDetached || bodyContains(this._$tooltip)) && (tooltipIsDetached || this._$tooltip.detach(), this.__Geometry = this.__geometry(), this._trigger({
          type: "reposition",
          event: event,
          helper: {
            geo: this.__Geometry
          }
        })), this
      },
      show: function(callback) {
        return this.open(callback)
      },
      status: function() {
        return {
          destroyed: this.__destroyed,
          enabled: this.__enabled,
          open: "closed" !== this.__state,
          state: this.__state
        }
      },
      triggerHandler: function() {
        return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      }
    }, $.fn.tooltipster = function() {
      var args = Array.prototype.slice.apply(arguments),
        contentCloningWarning = "You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.";
      if (0 === this.length) return this;
      if ("string" == typeof args[0]) {
        var v = "#*$~&";
        return this.each(function() {
          var ns = $(this).data("tooltipster-ns"),
            self = ns ? $(this).data(ns[0]) : null;
          if (!self) throw new Error("You called Tooltipster's \"" + args[0] + '" method on an uninitialized element');
          if ("function" != typeof self[args[0]]) throw new Error('Unknown method "' + args[0] + '"');
          1 < this.length && "content" == args[0] && (args[1] instanceof $ || "object" == typeof args[1] && null != args[1] && args[1].tagName) && !self.__options.contentCloning && self.__options.debug && console.log(contentCloningWarning);
          var resp = self[args[0]](args[1], args[2]);
          if (resp !== self || "instance" === args[0]) return v = resp, !1
        }), "#*$~&" !== v ? v : this
      }
      $.tooltipster.__instancesLatestArr = [];
      var multipleIsSet = args[0] && void 0 !== args[0].multiple,
        multiple = multipleIsSet && args[0].multiple || !multipleIsSet && defaults.multiple,
        contentIsSet = args[0] && void 0 !== args[0].content,
        content = contentIsSet && args[0].content || !contentIsSet && defaults.content,
        contentCloningIsSet = args[0] && void 0 !== args[0].contentCloning,
        contentCloning = contentCloningIsSet && args[0].contentCloning || !contentCloningIsSet && defaults.contentCloning,
        debugIsSet = args[0] && void 0 !== args[0].debug,
        debug = debugIsSet && args[0].debug || !debugIsSet && defaults.debug;
      return 1 < this.length && (content instanceof $ || "object" == typeof content && null != content && content.tagName) && !contentCloning && debug && console.log(contentCloningWarning), this.each(function() {
        var go = !1,
          $this = $(this),
          ns = $this.data("tooltipster-ns"),
          obj = null;
        ns ? multiple ? go = !0 : debug && (console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."), console.log(this)) : go = !0, go && (obj = new $.Tooltipster(this, args[0]), (ns = ns || []).push(obj.__namespace), $this.data("tooltipster-ns", ns), $this.data(obj.__namespace, obj), obj.__options.functionInit && obj.__options.functionInit.call(obj, obj, {
          origin: this
        }), obj._trigger("init")), $.tooltipster.__instancesLatestArr.push(obj)
      }), this
    }, Ruler.prototype = {
      __init: function($tooltip) {
        this.__$tooltip = $tooltip, this.__$tooltip.css({
          left: 0,
          overflow: "hidden",
          position: "absolute",
          top: 0
        }).find(".tooltipster-content").css("overflow", "auto"), this.$container = $('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(env.window.document.body)
      },
      __forceRedraw: function() {
        var $p = this.__$tooltip.parent();
        this.__$tooltip.detach(), this.__$tooltip.appendTo($p)
      },
      constrain: function(width, height) {
        return this.constraints = {
          width: width,
          height: height
        }, this.__$tooltip.css({
          display: "block",
          height: "",
          overflow: "auto",
          width: width
        }), this
      },
      destroy: function() {
        this.__$tooltip.detach().find(".tooltipster-content").css({
          display: "",
          overflow: ""
        }), this.$container.remove()
      },
      free: function() {
        return this.constraints = null, this.__$tooltip.css({
          display: "",
          height: "",
          overflow: "visible",
          width: ""
        }), this
      },
      measure: function() {
        this.__forceRedraw();
        var tooltipBcr = this.__$tooltip[0].getBoundingClientRect(),
          result = {
            size: {
              height: tooltipBcr.height || tooltipBcr.bottom - tooltipBcr.top,
              width: tooltipBcr.width || tooltipBcr.right - tooltipBcr.left
            }
          };
        if (this.constraints) {
          var $content = this.__$tooltip.find(".tooltipster-content"),
            height = this.__$tooltip.outerHeight(),
            contentBcr = $content[0].getBoundingClientRect(),
            fits = {
              height: height <= this.constraints.height,
              width: tooltipBcr.width <= this.constraints.width && contentBcr.width >= $content[0].scrollWidth - 1
            };
          result.fits = fits.height && fits.width
        }
        return env.IE && env.IE <= 11 && result.size.width !== env.window.document.documentElement.clientWidth && (result.size.width = Math.ceil(result.size.width) + 1), result
      }
    };
    var uA = navigator.userAgent.toLowerCase(); - 1 != uA.indexOf("msie") ? env.IE = parseInt(uA.split("msie")[1]) : -1 !== uA.toLowerCase().indexOf("trident") && -1 !== uA.indexOf(" rv:11") ? env.IE = 11 : -1 != uA.toLowerCase().indexOf("edge/") && (env.IE = parseInt(uA.toLowerCase().split("edge/")[1]));
    return $.tooltipster._plugin({
      name: "tooltipster.sideTip",
      instance: {
        __defaults: function() {
          return {
            arrow: !0,
            distance: 6,
            functionPosition: null,
            maxWidth: null,
            minIntersection: 16,
            minWidth: 0,
            position: null,
            side: "top",
            viewportAware: !0
          }
        },
        __init: function(instance) {
          var self = this;
          self.__instance = instance, self.__namespace = "tooltipster-sideTip-" + Math.round(1e6 * Math.random()), self.__previousState = "closed", self.__options, self.__optionsFormat(), self.__instance._on("state." + self.__namespace, function(event) {
            "closed" == event.state ? self.__close() : "appearing" == event.state && "closed" == self.__previousState && self.__create(), self.__previousState = event.state
          }), self.__instance._on("options." + self.__namespace, function() {
            self.__optionsFormat()
          }), self.__instance._on("reposition." + self.__namespace, function(e) {
            self.__reposition(e.event, e.helper)
          })
        },
        __close: function() {
          this.__instance.content() instanceof $ && this.__instance.content().detach(), this.__instance._$tooltip.remove(), this.__instance._$tooltip = null
        },
        __create: function() {
          var $html = $('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');
          this.__options.arrow || $html.find(".tooltipster-box").css("margin", 0).end().find(".tooltipster-arrow").hide(), this.__options.minWidth && $html.css("min-width", this.__options.minWidth + "px"), this.__options.maxWidth && $html.css("max-width", this.__options.maxWidth + "px"), this.__instance._$tooltip = $html, this.__instance._trigger("created")
        },
        __destroy: function() {
          this.__instance._off("." + self.__namespace)
        },
        __optionsFormat: function() {
          if (this.__options = this.__instance._optionsExtract("tooltipster.sideTip", this.__defaults()), this.__options.position && (this.__options.side = this.__options.position), "object" != typeof this.__options.distance && (this.__options.distance = [this.__options.distance]), this.__options.distance.length < 4 && (void 0 === this.__options.distance[1] && (this.__options.distance[1] = this.__options.distance[0]), void 0 === this.__options.distance[2] && (this.__options.distance[2] = this.__options.distance[0]), void 0 === this.__options.distance[3] && (this.__options.distance[3] = this.__options.distance[1]), this.__options.distance = {
              top: this.__options.distance[0],
              right: this.__options.distance[1],
              bottom: this.__options.distance[2],
              left: this.__options.distance[3]
            }), "string" == typeof this.__options.side) {
            this.__options.side = [this.__options.side, {
              top: "bottom",
              right: "left",
              bottom: "top",
              left: "right"
            } [this.__options.side]], "left" == this.__options.side[0] || "right" == this.__options.side[0] ? this.__options.side.push("top", "bottom") : this.__options.side.push("right", "left")
          }
          6 === $.tooltipster._env.IE && !0 !== this.__options.arrow && (this.__options.arrow = !1)
        },
        __reposition: function(event, helper) {
          var finalResult, self = this,
            targets = self.__targetFind(helper),
            testResults = [];
          self.__instance._$tooltip.detach();
          var $clone = self.__instance._$tooltip.clone(),
            ruler = $.tooltipster._getRuler($clone),
            satisfied = !1,
            animation = self.__instance.option("animation");
          switch (animation && $clone.removeClass("tooltipster-" + animation), $.each(["window", "document"], function(i, container) {
            var takeTest = null;
            if (self.__instance._trigger({
                container: container,
                helper: helper,
                satisfied: satisfied,
                takeTest: function(bool) {
                  takeTest = bool
                },
                results: testResults,
                type: "positionTest"
              }), 1 == takeTest || 0 != takeTest && 0 == satisfied && ("window" != container || self.__options.viewportAware))
              for (i = 0; i < self.__options.side.length; i++) {
                var distance = {
                    horizontal: 0,
                    vertical: 0
                  },
                  side = self.__options.side[i];
                "top" == side || "bottom" == side ? distance.vertical = self.__options.distance[side] : distance.horizontal = self.__options.distance[side], self.__sideChange($clone, side), $.each(["natural", "constrained"], function(i, mode) {
                  if (takeTest = null, self.__instance._trigger({
                      container: container,
                      event: event,
                      helper: helper,
                      mode: mode,
                      results: testResults,
                      satisfied: satisfied,
                      side: side,
                      takeTest: function(bool) {
                        takeTest = bool
                      },
                      type: "positionTest"
                    }), 1 == takeTest || 0 != takeTest && 0 == satisfied) {
                    var testResult = {
                        container: container,
                        distance: distance,
                        fits: null,
                        mode: mode,
                        outerSize: null,
                        side: side,
                        size: null,
                        target: targets[side],
                        whole: null
                      },
                      rulerResults = ("natural" == mode ? ruler.free() : ruler.constrain(helper.geo.available[container][side].width - distance.horizontal, helper.geo.available[container][side].height - distance.vertical)).measure();
                    if (testResult.size = rulerResults.size, testResult.outerSize = {
                        height: rulerResults.size.height + distance.vertical,
                        width: rulerResults.size.width + distance.horizontal
                      }, "natural" == mode ? helper.geo.available[container][side].width >= testResult.outerSize.width && helper.geo.available[container][side].height >= testResult.outerSize.height ? testResult.fits = !0 : testResult.fits = !1 : testResult.fits = rulerResults.fits, "window" == container && (testResult.fits ? testResult.whole = "top" == side || "bottom" == side ? helper.geo.origin.windowOffset.right >= self.__options.minIntersection && helper.geo.window.size.width - helper.geo.origin.windowOffset.left >= self.__options.minIntersection : helper.geo.origin.windowOffset.bottom >= self.__options.minIntersection && helper.geo.window.size.height - helper.geo.origin.windowOffset.top >= self.__options.minIntersection : testResult.whole = !1), testResults.push(testResult), testResult.whole) satisfied = !0;
                    else if ("natural" == testResult.mode && (testResult.fits || testResult.size.width <= helper.geo.available[container][side].width)) return !1
                  }
                })
              }
          }), self.__instance._trigger({
            edit: function(r) {
              testResults = r
            },
            event: event,
            helper: helper,
            results: testResults,
            type: "positionTested"
          }), testResults.sort(function(a, b) {
            return a.whole && !b.whole ? -1 : !a.whole && b.whole ? 1 : a.whole && b.whole ? (ai = self.__options.side.indexOf(a.side)) < (bi = self.__options.side.indexOf(b.side)) ? -1 : bi < ai ? 1 : "natural" == a.mode ? -1 : 1 : a.fits && !b.fits ? -1 : !a.fits && b.fits ? 1 : a.fits && b.fits ? (ai = self.__options.side.indexOf(a.side)) < (bi = self.__options.side.indexOf(b.side)) ? -1 : bi < ai ? 1 : "natural" == a.mode ? -1 : 1 : "document" == a.container && "bottom" == a.side && "natural" == a.mode ? -1 : 1;
            var ai, bi
          }), (finalResult = testResults[0]).coord = {}, finalResult.side) {
            case "left":
            case "right":
              finalResult.coord.top = Math.floor(finalResult.target - finalResult.size.height / 2);
              break;
            case "bottom":
            case "top":
              finalResult.coord.left = Math.floor(finalResult.target - finalResult.size.width / 2)
          }
          switch (finalResult.side) {
            case "left":
              finalResult.coord.left = helper.geo.origin.windowOffset.left - finalResult.outerSize.width;
              break;
            case "right":
              finalResult.coord.left = helper.geo.origin.windowOffset.right + finalResult.distance.horizontal;
              break;
            case "top":
              finalResult.coord.top = helper.geo.origin.windowOffset.top - finalResult.outerSize.height;
              break;
            case "bottom":
              finalResult.coord.top = helper.geo.origin.windowOffset.bottom + finalResult.distance.vertical
          }
          "window" == finalResult.container ? "top" == finalResult.side || "bottom" == finalResult.side ? finalResult.coord.left < 0 ? 0 <= helper.geo.origin.windowOffset.right - this.__options.minIntersection ? finalResult.coord.left = 0 : finalResult.coord.left = helper.geo.origin.windowOffset.right - this.__options.minIntersection - 1 : finalResult.coord.left > helper.geo.window.size.width - finalResult.size.width && (helper.geo.origin.windowOffset.left + this.__options.minIntersection <= helper.geo.window.size.width ? finalResult.coord.left = helper.geo.window.size.width - finalResult.size.width : finalResult.coord.left = helper.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - finalResult.size.width) : finalResult.coord.top < 0 ? 0 <= helper.geo.origin.windowOffset.bottom - this.__options.minIntersection ? finalResult.coord.top = 0 : finalResult.coord.top = helper.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1 : finalResult.coord.top > helper.geo.window.size.height - finalResult.size.height && (helper.geo.origin.windowOffset.top + this.__options.minIntersection <= helper.geo.window.size.height ? finalResult.coord.top = helper.geo.window.size.height - finalResult.size.height : finalResult.coord.top = helper.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - finalResult.size.height) : (finalResult.coord.left > helper.geo.window.size.width - finalResult.size.width && (finalResult.coord.left = helper.geo.window.size.width - finalResult.size.width), finalResult.coord.left < 0 && (finalResult.coord.left = 0)), self.__sideChange($clone, finalResult.side), helper.tooltipClone = $clone[0], helper.tooltipParent = self.__instance.option("parent").parent[0], helper.mode = finalResult.mode, helper.whole = finalResult.whole, helper.origin = self.__instance._$origin[0], helper.tooltip = self.__instance._$tooltip[0], delete finalResult.container, delete finalResult.fits, delete finalResult.mode, delete finalResult.outerSize, delete finalResult.whole, finalResult.distance = finalResult.distance.horizontal || finalResult.distance.vertical;
          var arrowCoord, maxVal, originParentOffset, finalResultClone = $.extend(!0, {}, finalResult);
          if (self.__instance._trigger({
              edit: function(result) {
                finalResult = result
              },
              event: event,
              helper: helper,
              position: finalResultClone,
              type: "position"
            }), self.__options.functionPosition) {
            var result = self.__options.functionPosition.call(self, self.__instance, helper, finalResultClone);
            result && (finalResult = result)
          }
          ruler.destroy(), maxVal = "top" == finalResult.side || "bottom" == finalResult.side ? (arrowCoord = {
            prop: "left",
            val: finalResult.target - finalResult.coord.left
          }, finalResult.size.width - this.__options.minIntersection) : (arrowCoord = {
            prop: "top",
            val: finalResult.target - finalResult.coord.top
          }, finalResult.size.height - this.__options.minIntersection), arrowCoord.val < this.__options.minIntersection ? arrowCoord.val = this.__options.minIntersection : arrowCoord.val > maxVal && (arrowCoord.val = maxVal), originParentOffset = helper.geo.origin.fixedLineage ? helper.geo.origin.windowOffset : {
            left: helper.geo.origin.windowOffset.left + helper.geo.window.scroll.left,
            top: helper.geo.origin.windowOffset.top + helper.geo.window.scroll.top
          }, finalResult.coord = {
            left: originParentOffset.left + (finalResult.coord.left - helper.geo.origin.windowOffset.left),
            top: originParentOffset.top + (finalResult.coord.top - helper.geo.origin.windowOffset.top)
          }, self.__sideChange(self.__instance._$tooltip, finalResult.side), helper.geo.origin.fixedLineage ? self.__instance._$tooltip.css("position", "fixed") : self.__instance._$tooltip.css("position", ""), self.__instance._$tooltip.css({
            left: finalResult.coord.left,
            top: finalResult.coord.top,
            height: finalResult.size.height,
            width: finalResult.size.width
          }).find(".tooltipster-arrow").css({
            left: "",
            top: ""
          }).css(arrowCoord.prop, arrowCoord.val), self.__instance._$tooltip.appendTo(self.__instance.option("parent")), self.__instance._trigger({
            type: "repositioned",
            event: event,
            position: finalResult
          })
        },
        __sideChange: function($obj, side) {
          $obj.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-" + side)
        },
        __targetFind: function(helper) {
          var target = {},
            rects = this.__instance._$origin[0].getClientRects();
          1 < rects.length && 1 == this.__instance._$origin.css("opacity") && (this.__instance._$origin.css("opacity", .99), rects = this.__instance._$origin[0].getClientRects(), this.__instance._$origin.css("opacity", 1));
          if (rects.length < 2) target.top = Math.floor(helper.geo.origin.windowOffset.left + helper.geo.origin.size.width / 2), target.bottom = target.top, target.left = Math.floor(helper.geo.origin.windowOffset.top + helper.geo.origin.size.height / 2), target.right = target.left;
          else {
            var targetRect = rects[0];
            target.top = Math.floor(targetRect.left + (targetRect.right - targetRect.left) / 2), targetRect = 2 < rects.length ? rects[Math.ceil(rects.length / 2) - 1] : rects[0], target.right = Math.floor(targetRect.top + (targetRect.bottom - targetRect.top) / 2), targetRect = rects[rects.length - 1], target.bottom = Math.floor(targetRect.left + (targetRect.right - targetRect.left) / 2), targetRect = 2 < rects.length ? rects[Math.ceil((rects.length + 1) / 2) - 1] : rects[rects.length - 1], target.left = Math.floor(targetRect.top + (targetRect.bottom - targetRect.top) / 2)
          }
          return target
        }
      }
    }), $
  }),
  function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.lazyframe = t()
  }(this, function() {
    "use strict";
    var e = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
      }
      return e
    };
    return function() {
      function n(e) {
        var t = this;
        if (e instanceof HTMLElement != 0 && !e.classList.contains("lazyframe--loaded")) {
          var n = {
            el: e,
            settings: i(e)
          };
          n.el.addEventListener("click", function() {
            n.el.appendChild(n.iframe);
            var i = e.querySelectorAll("iframe");
            n.settings.onAppend.call(t, i[0])
          }), d.lazyload ? l(n) : a(n, n.settings.thumbnail)
        }
      }

      function i(t) {
        var n = Array.prototype.slice.apply(t.attributes).filter(function(e) {
            return "" !== e.value
          }).reduce(function(e, t) {
            return e[0 === t.name.indexOf("data-") ? t.name.split("data-")[1] : t.name] = t.value, e
          }, {}),
          i = e({}, d, n, {
            y: t.offsetTop,
            parameters: function(e) {
              var t = e.split("?");
              if (t[1]) {
                return -1 !== (t = t[1]).indexOf("autoplay") ? t : t + "&autoplay=1"
              }
              return "autoplay=1"
            }(n.src)
          });
        if (i.vendor) {
          var o = i.src.match(v.regex[i.vendor]);
          i.id = v.condition[i.vendor](o)
        }
        return i
      }

      function a(e) {
        var t = this;
        ! function(e) {
          return !(!e.vendor || e.title && e.thumbnail || "youtube" === e.vendor && !e.apikey)
        }(e.settings) ? l(e, !0): function(e, t) {
          var n = v.endpoints[e.settings.vendor](e.settings),
            i = new XMLHttpRequest;
          i.open("GET", n, !0), i.onload = function() {
            if (200 <= i.status && i.status < 400) {
              var n = JSON.parse(i.responseText);
              t(null, [n, e])
            } else t(!0)
          }, i.onerror = function() {
            t(!0)
          }, i.send()
        }(e, function(n, i) {
          if (!n) {
            var r = i[0],
              o = i[1];
            if (o.settings.title || (o.settings.title = v.response[o.settings.vendor].title(r)), !o.settings.thumbnail) {
              var a = v.response[o.settings.vendor].thumbnail(r);
              o.settings.thumbnail = a, e.settings.onThumbnailLoad.call(t, a)
            }
            l(o, !0)
          }
        })
      }

      function l(e, t) {
        if (e.iframe = function(e) {
            var t = document.createDocumentFragment(),
              n = document.createElement("iframe");
            if (e.vendor && (e.src = v.src[e.vendor](e)), n.setAttribute("id", "lazyframe-" + e.id), n.setAttribute("src", e.src), n.setAttribute("frameborder", 0), n.setAttribute("allowfullscreen", ""), "vine" === e.vendor) {
              var i = document.createElement("script");
              i.setAttribute("src", "https://platform.vine.co/static/scripts/embed.js"), t.appendChild(i)
            }
            return t.appendChild(n), t
          }(e.settings), e.settings.thumbnail && t && (e.el.style.backgroundImage = "url(" + e.settings.thumbnail + ")"), e.settings.title && 0 === e.el.children.length) {
          var n = document.createDocumentFragment(),
            i = document.createElement("span");
          i.className = "lazyframe__title", i.innerHTML = e.settings.title, n.appendChild(i), e.el.appendChild(n)
        }
        d.lazyload || (e.el.classList.add("lazyframe--loaded"), e.settings.onLoad.call(this, e), f.push(e)), e.settings.initialized || f.push(e)
      }
      var d = void 0,
        f = [],
        m = {
          vendor: void 0,
          id: void 0,
          src: void 0,
          thumbnail: void 0,
          title: void 0,
          apikey: void 0,
          initialized: !1,
          parameters: void 0,
          y: void 0,
          debounce: 250,
          lazyload: !0,
          initinview: !1,
          onLoad: function(e) {},
          onAppend: function(e) {},
          onThumbnailLoad: function(e) {}
        },
        v = {
          regex: {
            youtube: /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
            vimeo: /vimeo\.com\/(?:video\/)?([0-9]*)(?:\?|)/,
            vine: /vine.co\/v\/(.*)/
          },
          condition: {
            youtube: function(e) {
              return !(!e || 11 != e[1].length) && e[1]
            },
            vimeo: function(e) {
              return !!(e && 9 === e[1].length || 8 === e[1].length) && e[1]
            },
            vine: function(e) {
              return !(!e || 11 !== e[1].length) && e[1]
            }
          },
          src: {
            youtube: function(e) {
              return "https://www.youtube.com/embed/" + e.id + "/?" + e.parameters
            },
            vimeo: function(e) {
              return "https://player.vimeo.com/video/" + e.id + "/?" + e.parameters
            },
            vine: function(e) {
              return "https://vine.co/v/" + e.id + "/embed/simple"
            }
          },
          endpoints: {
            youtube: function(e) {
              return "https://www.googleapis.com/youtube/v3/videos?id=" + e.id + "&key=" + e.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet"
            },
            vimeo: function(e) {
              return "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + e.id
            },
            vine: function(e) {
              return "https://vine.co/oembed.json?url=https%3A%2F%2Fvine.co%2Fv%2F" + e.id
            }
          },
          response: {
            youtube: {
              title: function(e) {
                return e.items[0].snippet.title
              },
              thumbnail: function(e) {
                var t = e.items[0].snippet.thumbnails;
                return t.maxres ? t.maxres.url : t.standard.url
              }
            },
            vimeo: {
              title: function(e) {
                return e.title
              },
              thumbnail: function(e) {
                return e.thumbnail_url
              }
            },
            vine: {
              title: function(e) {
                return e.title
              },
              thumbnail: function(e) {
                return e.thumbnail_url
              }
            }
          }
        };
      return function(t) {
        if (d = e({}, m, arguments.length <= 1 ? void 0 : arguments[1]), "string" == typeof t)
          for (var i = document.querySelectorAll(t), r = 0; r < i.length; r++) n(i[r]);
        else if (void 0 === t.length) n(t);
        else if (1 < t.length)
          for (var o = 0; o < t.length; o++) n(t[o]);
        else n(t[0]);
        d.lazyload && function() {
          function r(e, n) {
            e.settings.initialized = !0, e.el.classList.add("lazyframe--loaded"), i--, a(e), e.settings.initinview && e.el.click(), e.settings.onLoad.call(t, e)
          }
          var t = this,
            n = window.innerHeight,
            i = f.length;
          f.filter(function(e) {
            return e.settings.y < n
          }).forEach(r);
          var o = function(e, t, n) {
              var i = void 0;
              return function() {
                var r = this,
                  o = arguments,
                  s = n && !i;
                clearTimeout(i), i = setTimeout(function() {
                  i = null, n || e.apply(r, o)
                }, t), s && e.apply(r, o)
              }
            }(function() {
              u = s < window.scrollY, s = window.scrollY, u && f.filter(function(e) {
                return e.settings.y < n + s && !1 === e.settings.initialized
              }).forEach(r), 0 === i && window.removeEventListener("scroll", o, !1)
            }, d.debounce),
            s = 0,
            u = !1;
          window.addEventListener("scroll", o, !1)
        }()
      }
    }()
  }),
  function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.lazyframe = e()
  }(this, function() {
    "use strict";
    var c, f, m, v, t = Object.assign || function(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
      }
      return t
    };
    return m = {
        vendor: c = void 0,
        id: void 0,
        src: void 0,
        thumbnail: void 0,
        title: void 0,
        apikey: void 0,
        initialized: !(f = []),
        parameters: void 0,
        y: void 0,
        debounce: 250,
        lazyload: !0,
        initinview: !1,
        onLoad: function(t) {},
        onAppend: function(t) {},
        onThumbnailLoad: function(t) {}
      }, v = {
        regex: {
          youtube: /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
          vimeo: /vimeo\.com\/(?:video\/)?([0-9]*)(?:\?|)/,
          vine: /vine.co\/v\/(.*)/
        },
        condition: {
          youtube: function(t) {
            return !(!t || 11 != t[1].length) && t[1]
          },
          vimeo: function(t) {
            return !!(t && 9 === t[1].length || 8 === t[1].length) && t[1]
          },
          vine: function(t) {
            return !(!t || 11 !== t[1].length) && t[1]
          }
        },
        src: {
          youtube: function(t) {
            return "https://www.youtube.com/embed/" + t.id + "/?" + t.parameters
          },
          vimeo: function(t) {
            return "https://player.vimeo.com/video/" + t.id + "/?" + t.parameters
          },
          vine: function(t) {
            return "https://vine.co/v/" + t.id + "/embed/simple"
          }
        },
        endpoints: {
          youtube: function(t) {
            return "https://www.googleapis.com/youtube/v3/videos?id=" + t.id + "&key=" + t.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet"
          },
          vimeo: function(t) {
            return "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + t.id
          },
          vine: function(t) {
            return "https://vine.co/oembed.json?url=https%3A%2F%2Fvine.co%2Fv%2F" + t.id
          }
        },
        response: {
          youtube: {
            title: function(t) {
              return t.items[0].snippet.title
            },
            thumbnail: function(t) {
              var e = t.items[0].snippet.thumbnails;
              return (e.maxres || e.standard || e.high || e.medium || e.default).url
            }
          },
          vimeo: {
            title: function(t) {
              return t.title
            },
            thumbnail: function(t) {
              return t.thumbnail_url
            }
          },
          vine: {
            title: function(t) {
              return t.title
            },
            thumbnail: function(t) {
              return t.thumbnail_url
            }
          }
        }
      },
      function(e) {
        if (c = t({}, m, arguments.length <= 1 ? void 0 : arguments[1]), "string" == typeof e)
          for (var i = document.querySelectorAll(e), o = 0; o < i.length; o++) n(i[o]);
        else if (void 0 === e.length) n(e);
        else if (1 < e.length)
          for (var r = 0; r < e.length; r++) n(e[r]);
        else n(e[0]);
        c.lazyload && function() {
          var t = this,
            e = window.innerHeight,
            n = f.length,
            i = function(e, i) {
              e.settings.initialized = !0, e.el.classList.add("lazyframe--loaded"), n--, s(e), e.settings.initinview && e.el.click(), e.settings.onLoad.call(t, e)
            };
          f.filter(function(t) {
            return t.settings.y < e
          }).forEach(i);
          var o = function(t, e) {
              var i = void 0;
              return function() {
                var o = this,
                  r = arguments;
                clearTimeout(i), i = setTimeout(function() {
                  i = null, t.apply(o, r)
                }, e)
              }
            }(function() {
              a = r < window.scrollY, r = window.scrollY, a && f.filter(function(t) {
                return t.settings.y < e + r && !1 === t.settings.initialized
              }).forEach(i), 0 === n && window.removeEventListener("scroll", o, !1)
            }, c.debounce),
            r = 0,
            a = !1;
          window.addEventListener("scroll", o, !1)
        }()
      };

    function n(t) {
      var e = this;
      if (t instanceof HTMLElement != 0 && !t.classList.contains("lazyframe--loaded")) {
        var n = {
          el: t,
          settings: i(t)
        };
        n.el.addEventListener("click", function() {
          n.el.appendChild(n.iframe);
          var i = t.querySelectorAll("iframe");
          n.settings.onAppend.call(e, i[0])
        }), c.lazyload ? l(n) : s(n, n.settings.thumbnail)
      }
    }

    function i(e) {
      var n = Array.prototype.slice.apply(e.attributes).filter(function(t) {
          return "" !== t.value
        }).reduce(function(t, e) {
          return t[0 === e.name.indexOf("data-") ? e.name.split("data-")[1] : e.name] = e.value, t
        }, {}),
        i = t({}, c, n, {
          y: e.offsetTop,
          parameters: function(t) {
            var e = t.split("?");
            if (e[1]) return -1 !== (e = e[1]).indexOf("autoplay") ? e : e + "&autoplay=1";
            return "autoplay=1"
          }(n.src)
        });
      if (i.vendor) {
        var r = i.src.match(v.regex[i.vendor]);
        i.id = v.condition[i.vendor](r)
      }
      return i
    }

    function s(t) {
      var e = this;
      ! function(t) {
        return !(!t.vendor || t.title && t.thumbnail || "youtube" === t.vendor && !t.apikey)
      }(t.settings) ? l(t, !0): function(t, e) {
        var n = v.endpoints[t.settings.vendor](t.settings),
          i = new XMLHttpRequest;
        i.open("GET", n, !0), i.onload = function() {
          if (200 <= i.status && i.status < 400) {
            var n = JSON.parse(i.responseText);
            e(null, [n, t])
          } else e(!0)
        }, i.onerror = function() {
          e(!0)
        }, i.send()
      }(t, function(n, i) {
        if (!n) {
          var o = i[0],
            r = i[1];
          if (r.settings.title || (r.settings.title = v.response[r.settings.vendor].title(o)), !r.settings.thumbnail) {
            var s = v.response[r.settings.vendor].thumbnail(o);
            r.settings.thumbnail = s, t.settings.onThumbnailLoad.call(e, s)
          }
          l(r, !0)
        }
      })
    }

    function l(t, e) {
      if (t.iframe = function(t) {
          var e = document.createDocumentFragment(),
            n = document.createElement("iframe");
          if (t.vendor && (t.src = v.src[t.vendor](t)), n.setAttribute("id", "lazyframe-" + t.id), n.setAttribute("src", t.src), n.setAttribute("frameborder", 0), n.setAttribute("allowfullscreen", ""), "vine" === t.vendor) {
            var i = document.createElement("script");
            i.setAttribute("src", "https://platform.vine.co/static/scripts/embed.js"), e.appendChild(i)
          }
          return e.appendChild(n), e
        }(t.settings), t.settings.thumbnail && e && (t.el.style.backgroundImage = "url(" + t.settings.thumbnail + ")"), t.settings.title && 0 === t.el.children.length) {
        var n = document.createDocumentFragment(),
          i = document.createElement("span");
        i.className = "lazyframe__title", i.innerHTML = t.settings.title, n.appendChild(i), t.el.appendChild(n)
      }
      c.lazyload || (t.el.classList.add("lazyframe--loaded"), t.settings.onLoad.call(this, t), f.push(t)), t.settings.initialized || f.push(t)
    }
  }), angular.module("hoff-prod", ["ngSanitize", "nouislider", "jkAngularRatingStars", "MassAutoComplete", "moment-picker", "thatisuday.dropzone", "dir.ajaxInline", "dir.bindhtml", "dir.formFilter", "dir.colorCarousel", "dir.jsEllipsis", "dir.navSide", "dir.initCarousel", "dir.ugcCarousel", "dir.initGallery", "dir.initPopupGallery", "dir.customScroll", "dir.number", "dir.tooltip", "dir.formField", "dir.maskInput", "dir.accordionSections", "dir.tableAdaptive", "dir.initMap", "dir.initTabs", "dir.scrollTo", "dir.popupInline", "dir.popupGet", "dir.validateForm", "dir.openshop", "dir.elemRangeSlider", "dir.recomend", "dir.jsBannerInit", "dir.jsOffersInit", "dir.kitchenPlanner", "dir.bnLazySrc", "dir.headerScrollListener", "dir.pasteFilter", "dir.patternInput", "dir.initCarouselOffersMain", "ctrl.filterCtrl", "ctrl.favCtrl", "ctrl.suggestCtrl", "ctrl.autoCompleteCtrl", "ctrl.changeCity", "ctrl.complectCtrl", "ctrl.cartCtrl", "ctrl.basketCtrl", "ctrl.smsCtrl", "ctrl.basketCardCtrl", "ctrl.cardConfirm", "ctrl.dzCtrl", "ctrl.dateCtrl", "srv.formSrv", "srv.filterSrv", "srv.favSrv", "srv.cartSrv", "srv.mapSrv", "srv.scrollAndResizeListener", "fltr.separatorFltr", "fltr.pluralForm", "fltr.orderObjBy"]).config(["$interpolateProvider", function($interpolateProvider) {
    $interpolateProvider.startSymbol("[[").endSymbol("]]")
  }]).config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: !0,
      requireBase: !1,
      rewriteLinks: !1
    })
  }).config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
    var param = function(obj) {
      var name, value, subName, subValue, innerObj, i, query = "";
      for (name in obj)
        if ((value = obj[name]) instanceof Array)
          for (i = 0; i < value.length; ++i) subValue = value[i], (innerObj = {})[name + "[" + i + "]"] = subValue, query += param(innerObj) + "&";
        else if (value instanceof Object)
        for (subName in value) subValue = value[subName], (innerObj = {})[name + "[" + subName + "]"] = subValue, query += param(innerObj) + "&";
      else null != value && (query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&");
      return query.length ? query.substr(0, query.length - 1) : query
    };
    $httpProvider.defaults.transformRequest = [function(data) {
      return angular.isObject(data) && "[object File]" !== String(data) ? param(data) : data
    }]
  }]).config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: !0,
      requireBase: !1,
      rewriteLinks: !1
    })
  }), angular.module("nouislider", []).directive("slider", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("moment-picker", []).directive("momentPicker", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.formFilter", []).directive("formFilter", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.colorCarousel", []).directive("colorCarousel", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.initGallery", []).directive("initGallery", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.initCarousel", []).directive("initCarousel", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.ugcCarousel", []).directive("ugcCarousel", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.popupInline", []).directive("popupInline", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.initMap", []).directive("initMap", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.openshop", []).directive("openshop", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.jsOffersInit", []).directive("jsOffersInit", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.kitchenPlanner", []).directive("kitchenPlanner", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.scrollTo", []).directive("scrollTo", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.tableAdaptive", []).directive("tableAdaptive", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.initPopupGallery", []).directive("initPopupGallery", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.customScroll", []).directive("customScroll", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.pasteFilter", []).directive("pasteFilter", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.patternInput", []).directive("patternInput", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("dir.recomend", []).directive("recomend", function() {
    return function() {}
  }), angular.module("dir.popState", []).directive("popState", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("ctrl.filterCtrl", []).controller("filterCtrl", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("ctrl.complectCtrl", []).controller("complectCtrl", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("ctrl.basketCtrl", []).controller("basketCtrl", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("ctrl.basketCardCtrl", []).controller("basketCardCtrl", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("ctrl.dateCtrl", []).controller("dateCtrl", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("ctrl.cardConfirm", []).controller("cardConfirm", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("srv.filterSrv", []).factory("filterSrv", function() {
    return {
      restrict: "AEC"
    }
  }), angular.module("fltr.pluralForm", []).filter("pluralForm", function() {
    return function() {}
  }), angular.module("jkAngularRatingStars", []).controller("RatingStarsController", function() {
    return function() {}
  }).directive("jkRatingStars", function() {
    return {
      restrict: "E"
    }
  }), $(function() {
    $(".form-search").addClass("interactive"), $(document).on("focus", ".js-placehoder", function() {
      $(this).closest(".form-search").addClass("focused")
    }), $(document).on("blur", ".js-placehoder", function() {
      0 == $(this).val().length && $(this).closest(".form-search").removeClass("focused")
    })
  }), window.onload = function() {
    if (document.getElementById("appendJs")) {
      ! function(funcs) {
        funcs.reduce(function(promise, func) {
          return promise.then(function(result) {
            return func().then(Array.prototype.concat.bind(result))
          })
        }, Promise.resolve([]))
      }(document.getElementById("appendJs").dataset.js.split(",").map(function(url) {
        return function() {
          return $.ajax(url)
        }
      }))
    }
  }, angular.module("dir.ajaxInline", []).directive("ajaxInline", ["$http", "$compile", "$timeout", function($http, $compile, $timeout) {
    return {
      scope: {
        url: "@ajaxUrl",
        event: "@ajaxEvent",
        method: "@ajaxMethod",
        data: "=ajaxData",
        params: "=ajaxParams",
        headers: "=ajaxHeaders",
        result: "=ajaxResult",
        loader: "=ajaxLoader",
        redirect: "@ajaxRedirect",
        eventTimes: "@ajaxEventTimes",
        eventLimit: "@ajaxEventLimit",
        appendTo: "@ajaxAppendId",
        appendClear: "@ajaxAppendClear"
      },
      link: function($scope, $element, $attrs) {
        var config = {};
        if (!$scope.event) throw new Error('Не указано событие, при котором отправлять ajax запрос, пример ajax-event="click"');
        if (angular.isDefined($scope.eventTimes)) var eventCounter = 0;
        if (angular.isDefined($scope.eventLimit)) var limitCounter = 0;

        function execFunc() {
          if (!$scope.url) throw new Error('Не указан урл ajax запроса, пример ajax-url="/api/get/1/"');
          if ($scope.method || ($scope.method = "post"), config = {
              method: $scope.method,
              url: $scope.url
            }, 0 == $element.serialize().length ? config.data = toSerialize($scope.data) : 0 < $element.serialize().length && angular.isUndefined($scope.data) ? config.data = $element.serialize() : config.data = $element.serialize() + "&" + toSerialize($scope.data), angular.isDefined($scope.params) && (config.params = $scope.params), angular.isDefined($scope.headers) && (config.headers = $scope.headers), angular.isDefined($scope.eventTimes)) ++eventCounter >= $scope.eventTimes && makeRequest(config);
          else if (angular.isDefined($scope.eventLimit)) {
            if ("Comment00" == $scope.appendTo && !angular.element(document.getElementById($scope.appendTo)).is(":empty")) return !1;
            limitCounter < $scope.eventLimit && (makeRequest(config), limitCounter++)
          } else makeRequest(config)
        }
        $element.length && "onload" == $attrs.ajaxEvent ? execFunc() : $element[$attrs.ajaxEvent](function() {
          execFunc()
        });
        var popupConfig = {
          removalDelay: 200,
          key: "pRequest",
          items: {},
          type: "inline",
          closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
          closeOnBgClick: !1,
          callbacks: {
            beforeOpen: function() {
              $("body").addClass("no-scroll")
            },
            open: function() {
              var _this = this;
              $timeout(function() {
                _this.contentContainer[0].className += " popupIn"
              }, 200)
            },
            beforeClose: function() {
              this.contentContainer[0].className += " popupOut", $("body").removeClass("no-scroll")
            },
            afterClose: function() {
              delete $.magnificPopup.instance.popupsCache.pRequest
            }
          },
          inline: {
            markup: ""
          }
        };

        function makeRequest(ajaxConfig) {
          setLoader(1), 0 !== $element.children(".pre-message").length && ($.magnificPopup.instance.isOpen ? ($.magnificPopup.close(), $timeout(function() {
            generatePopup()
          }, 200)) : generatePopup()), $http(ajaxConfig).then(function(responseSuccess) {
            if (angular.isDefined($scope.redirect) && !0 === responseSuccess.data && (window.location = $scope.redirect), angular.isDefined($scope.result) && ($scope.result = responseSuccess.data), angular.isDefined($scope.appendClear) && angular.isDefined($scope.appendTo) && angular.element(document.getElementById($scope.appendTo)).empty(), angular.isDefined($scope.appendTo) && angular.element(document.getElementById($scope.appendTo)).append($compile(responseSuccess.data)($scope)), $timeout(function() {
                var lazyVideo = $(".lazyframe");
                "undefined" != typeof lazyframe && lazyframe(lazyVideo, {
                  onAppend: function(iframe) {
                    $(iframe).addClass("lazy-video")
                  }
                });
                try {
                  $(".selectpicker").selectpicker("refresh"), setTimeout(function() {
                    $(".option--colors").length && $(".option--colors .dropdown-menu li").each(function(i, el) {
                      var topLayerLink = '<a class="top-layer-link" href="' + $(el).find("span.select-icon").data("url") + '" target="_blank"></a>';
                      $(el).prepend(topLayerLink)
                    })
                  }, 100)
                } catch (e) {}
              }, 0), setLoader(0), $timeout(function() {
                $.magnificPopup.instance.isOpen && !$.magnificPopup.instance.popupsCache.hasOwnProperty("pGet") && closePopup()
              }, 2e3), responseSuccess.data.popup && $timeout(function() {
                generatePopup(responseSuccess.data.popup);
                try {
                  myLazyLoad.update()
                } catch (e) {}
              }, 2500), $timeout(function() {
                try {
                  myLazyLoad.update()
                } catch (e) {}
              }, 1), responseSuccess.data.CALLBACK) return new Function(responseSuccess.data.CALLBACK)()
          }, function(responseError) {
            $scope.result = !1, setLoader(0), $timeout(function() {
              $.magnificPopup && closePopup()
            }, 2e3)
          })
        }

        function setLoader(value) {
          angular.isDefined($scope.loader) && ($scope.loader = value)
        }

        function generatePopup(data) {
          data ? (popupConfig.items = data, popupConfig.inline.markup = '<div class="box-popup popup-password"><button title="Закрыть (Esc)" type="button" class="mfp-close"></button><div class="mfp-TITLE box-popup__name"></div><br><div class="mfp-TEXT"></div></div>') : 0 !== $element.children(".pre-message").length && (popupConfig.items = {}, popupConfig.inline.markup = '<div class="box-popup popup-password"><button title="Закрыть (Esc)" type="button" class="mfp-close"></button><div class="box-popup__name"></div><br><div>' + $element.children(".pre-message").html() + "</div></div>"), $.magnificPopup.open(popupConfig)
        }

        function closePopup() {
          $.magnificPopup.close(), delete $.magnificPopup.instance.popupsCache.pRequest
        }
      }
    }
  }]), angular.module("dir.bindhtml", []).directive("bindhtml", ["$compile", "$timeout", function($compile, $timeout) {
    return {
      restrict: "A",
      replace: !0,
      link: function(scope, ele, attrs) {
        scope.$watch(attrs.bindhtml, function(html) {
          void 0 !== html && 0 < html.length && (ele.html(html), $compile(ele.contents())(scope), $timeout(function() {
            try {
              myLazyLoad.update()
            } catch (e) {}
          }, 200))
        })
      }
    }
  }]), angular.module("dir.navSide", []).directive("navSide", [function() {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        var viewportWidth, viewportHeight, elemHeight, toTop, bottomOutView, m_height, m_top, submenu_top, submenu = elem.find(".nav-side__submenu"),
          section = elem.find(".nav-side__section");
        section.each(function() {
          $(this).children(".nav-side__submenu").length && $(this).addClass("has-submenu"), $(this).children(".exclusive").hasClass("red") && $(this).children(".exclusive").append('<span class="red-corner" />'), $(this).children(".exclusive").hasClass("black") && $(this).children(".exclusive").append('<span class="black-corner" />')
        }), setTimeout(function() {
          viewportWidth = document.documentElement.clientWidth, viewportHeight = document.documentElement.clientHeight, elemHeight = elem.outerHeight(), toTop = $(".page-wrapper").offset().top, bottomOutView = toTop + elemHeight - viewportHeight, m_height = viewportHeight - toTop - window.pageYOffset, m_top = (toTop - window.pageYOffset + 17) / $(window).width() * 100, submenu_top = m_top + 15 / $(window).width() * 100, placeNav()
        }, 50);
        var scrollTop, intervalCounter = 0,
          interval = setInterval(function() {
            if (intervalCounter++, $(".exponea-banner").length) {
              $(window).scroll();
              for (var classname = document.getElementsByClassName("exponea-banner__close"), i = 0; i < classname.length; i++) classname[i].addEventListener("click", function() {
                $(window).scroll()
              }, !1);
              clearInterval(interval)
            }
            100 < intervalCounter && clearInterval(interval)
          }, 50);
        $(window).scroll(function() {
          recalcDemensions(), placeNav()
        }), $("#openSideMenu").click(function() {
          if ($(this).hasClass("opened")) closeSideMenu(), $(".page-wrapper").css({
            "margin-top": ""
          }), elem.scrollTop(0), $(window).scrollTop(scrollTop);
          else {
            if (scrollTop = $(window).scrollTop(), $(this).addClass("opened"), elem.addClass("opened"), $("body").addClass("no-scroll sidemenu-opened"), $(".page-wrapper").prepend('<div class="page-overflow" />'), $(".page-wrapper").css({
                "margin-top": -scrollTop + "px"
              }), $(".box-header").hasClass("box-header--fixed")) {
              var topOffset = document.querySelector(".box-header").clientHeight + document.querySelector(".box-header").getBoundingClientRect().top;
              elem.css({
                "padding-top": topOffset + "px"
              })
            }
            $(".page-overflow").click(function() {
              closeSideMenu()
            }), elem.scrollTop(0)
          }
        });
        var timer, iOS = parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || !1;

        function openSubmenu(ctx) {
          $(ctx).hasClass("has-submenu") && (elem.addClass("section-opened"), $(".nav-side__section").removeClass("open"), $(ctx).addClass("open"), elem.scrollTop(0))
        }

        function closeSideMenu() {
          $("#openSideMenu").removeClass("opened"), elem.removeClass("opened").removeClass("section-opened"), $("body").removeClass("no-scroll sidemenu-opened"), $(".page-wrapper").children(".page-overflow").detach(), $(".nav-side__section").removeClass("open")
        }

        function recalcDemensions() {
          elemHeight = elem.outerHeight(), toTop = $(".page-wrapper").offset().top, bottomOutView = toTop + elemHeight - viewportHeight, m_height = viewportHeight - toTop - window.pageYOffset, m_top = (toTop - window.pageYOffset + 17) / $(window).width() * 100, submenu_top = m_top + 15 / $(window).width() * 100;
          parseInt($(".box-search").css("padding-top")), document.querySelector(".box-header").clientHeight, document.querySelector(".box-header").getBoundingClientRect().top;
          m_height < 0 && (m_height = "auto")
        }

        function placeNav() {
          parseInt($(".box-search").css("padding-top"));
          var topOffset = document.querySelector(".box-header").clientHeight + document.querySelector(".box-header").getBoundingClientRect().top;
          topOffset = topOffset < 0 ? 0 : topOffset, elemHeight < viewportHeight ? (elem.removeClass("btm-stick"), 0 < m_top ? (elem.css({
            "padding-top": topOffset + "px",
            "margin-top": 0,
            height: m_height
          }), submenu.css({
            "padding-top": submenu_top + "vw"
          })) : (elem.css({
            "padding-top": 0,
            "margin-top": 0,
            height: "auto"
          }), submenu.css({
            "padding-top": "2vw"
          }))) : (elem.css({
            "padding-top": topOffset + "px",
            "margin-top": 0,
            height: "auto"
          }), 0 < bottomOutView - window.pageYOffset ? (elem.removeClass("btm-stick"), submenu.css({
            "padding-top": submenu_top + "vw"
          })) : (elem.addClass("btm-stick"), submenu.css({
            "padding-top": "2vw"
          })))
        }
        iOS && 13 <= iOS ? section.hover(function() {
          openSubmenu(this)
        }) : section.click(function() {
          openSubmenu(this)
        }), $(".submenu-title").click(function(e) {
          e.stopPropagation(), elem.removeClass("section-opened"), $(".nav-side__section").removeClass("open")
        }), "IE" !== getBrowserInfo().split(" ")[0] && "MSIE" !== getBrowserInfo().split(" ")[0] && "Edge" !== getBrowserInfo().split(" ")[0] || $(document).on("mouseenter", ".nav-side__section.has-submenu", function() {
          $(".form-search__text").blur()
        }), $(window).resize(function() {
          timer && window.clearTimeout(timer), timer = window.setTimeout(function() {
            viewportWidth = document.documentElement.clientWidth, viewportHeight = document.documentElement.clientHeight, elemHeight = elem.outerHeight(), recalcDemensions(), placeNav(), 768 < viewportWidth && closeSideMenu()
          }, 50)
        }), $(".offer-close").click(function() {
          $(window).resize(), setTimeout(function() {
            $(window).scroll(), closeSideMenu(), m_height = $(window).height() - toTop - window.pageYOffset, m_top = (toTop - window.pageYOffset + 17) / $(window).width() * 100, submenu_top = m_top + 15 / $(window).width() * 100, $(".nav-side").css({
              height: m_height
            }), submenu.css({
              "padding-top": submenu_top + "vw"
            })
          }, 100)
        }), $(document).on("click", ".elem-city", function() {
          closeSideMenu()
        })
      }
    }
  }]), angular.module("dir.initCarousel", []).directive("initCarousel", [function() {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        var carousel = elem.find(".swiper-container");
        carousel.append('<div class="swiper-scrollbar"></div>'), carousel.before('<div class="box-carousel__btns"><div class="slider-swiper-button-prev"></div><div class="slider-swiper-button-next"></div></div>');
        var slideImgElem, btnNext = elem.children(".box-carousel__btns").children(".slider-swiper-button-next"),
          btnPrev = elem.children(".box-carousel__btns").children(".slider-swiper-button-prev"),
          swiperScroll = elem.children(".swiper-container").children(".swiper-scrollbar"),
          slidesMax = carousel.data("max-slides"),
          mobileCarusel = carousel.data("mobile-carusel"),
          hackPerView = 4,
          slideImgLoaded = !1;

        function rewriteLazySrc(swiper) {
          if (slideImgLoaded) swiper && swiper.update();
          else if (0 < (slideImgElem = elem.find(".elem-product__img img")).length) {
            for (var i = 0; i <= slideImgElem.length - 1; i++) {
              var el = $(slideImgElem[i]);
              el[0].hasAttribute("data-src") ? (el[0].src = el.attr("data-src"), el.parent().addClass("children-loaded"), el.removeClass("loading").addClass("loaded")) : el[0].hasAttribute("bn-lazy-src") && (el[0].src = el.attr("bn-lazy-src"), el.parent().addClass("children-loaded"), el.removeClass("loading").addClass("loaded"))
            }
            slideImgLoaded = !0, swiper && swiper.update()
          }
        }

        function setPerView() {
          window.innerWidth <= 1600 && 1423 < window.innerWidth ? hackPerView = 3 == slidesMax ? 3 : 4 : window.innerWidth <= 1423 && 768 <= window.innerWidth ? hackPerView = 3 == slidesMax ? 2 : 3 : window.innerWidth < 768 ? hackPerView = "auto" : 3 == slidesMax && (hackPerView = 3)
        }

        function addClassTimeout(elem, cls) {
          setTimeout(function() {
            elem.addClass(cls)
          }, 0)
        }
        3 == slidesMax && (hackPerView = 3), setPerView();
        var settingsForSlider = {
          nextButton: btnNext,
          prevButton: btnPrev,
          scrollbar: swiperScroll,
          slidesPerView: slidesMax,
          scrollbarHide: !1,
          onReachEnd: function(swiper) {
            $(swiper.container[0]).addClass("end-reached"), addClassTimeout(btnNext, "swiper-button-disabled")
          },
          onSlidePrevEnd: function(swiper) {
            rewriteLazySrc(swiper), swiper.isEnd || $(swiper.container[0]).removeClass("end-reached")
          },
          onReachBeginning: function(swiper) {
            $(swiper.container[0]).addClass("begin-reached"), addClassTimeout(btnPrev, "swiper-button-disabled")
          },
          onSlideNextEnd: function(swiper) {
            rewriteLazySrc(swiper), swiper.isBeginning || $(swiper.container[0]).removeClass("begin-reached")
          }
        };
        "auto" !== slidesMax && (carouselSwiper = (0 == mobileCarusel ? (settingsForSlider.spaceBetween = 20, settingsForSlider.onAfterResize = function(swiper) {
          swiper.update()
        }, settingsForSlider.onInit = function(swiper) {
          $(swiper.container[0]).addClass("begin-reached"), $(swiper.container[0]).removeClass("end-reached")
        }, settingsForSlider.breakpoints = {
          1600: {
            slidesPerView: slidesMax,
            spaceBetween: 20
          },
          1423: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          480: {
            centeredSlides: !0,
            slidesPerView: "auto",
            freeMode: !1,
            spaceBetween: 0
          }
        }) : (settingsForSlider.spaceBetween = 20, settingsForSlider.onAfterResize = function(swiper) {
          swiper.slides.length <= swiper.params.slidesPerView ? "auto" !== swiper.params.slidesPerView && elem.addClass("no-arrows") : elem.removeClass("no-arrows"), swiper.update(), setTimeout(function() {
            btnNext.hasClass("swiper-button-disabled") && btnPrev.hasClass("swiper-button-disabled") || swiper.params.slidesPerView
          }, 200)
        }, settingsForSlider.onInit = function(swiper) {
          $(swiper.container[0]).addClass("begin-reached"), $(swiper.container[0]).removeClass("end-reached"), rewriteLazySrc(swiper), swiper.slides.length <= swiper.params.slidesPerView ? "auto" !== swiper.params.slidesPerView && elem.addClass("no-arrows") : (elem.removeClass("no-arrows"), addClassTimeout(btnPrev, "swiper-button-disabled")), swiper.update(), setTimeout(function() {
            btnNext.hasClass("swiper-button-disabled") && btnPrev.hasClass("swiper-button-disabled") && "auto" !== swiper.params.slidesPerView && elem.addClass("no-arrows")
          }, 200)
        }, settingsForSlider.breakpoints = {
          1600: {
            slidesPerView: hackPerView,
            spaceBetween: 20
          },
          1423: {
            slidesPerView: hackPerView,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: hackPerView,
            spaceBetween: 20
          },
          768: {
            slidesPerView: "auto",
            freeMode: !0,
            spaceBetween: 0
          },
          480: {
            slidesPerView: "auto",
            freeMode: !1,
            roundLengths: !0,
            spaceBetween: 0
          }
        }), new Swiper(carousel.get(0), settingsForSlider))), "auto" === slidesMax && (settingsForSlider.spaceBetween = 20, settingsForSlider.slidesPerView = "auto", settingsForSlider.freeMode = !0, settingsForSlider.breakpoints = {
          480: {
            slidesPerView: "auto",
            centeredSlides: !0,
            spaceBetween: 10
          }
        }, settingsForSlider.onInit = function(swiper) {
          $(swiper.container[0]).addClass("begin-reached"), swiper.slides.length <= swiper.params.slidesPerView ? "auto" !== swiper.params.slidesPerView && elem.addClass("no-arrows") : elem.removeClass("no-arrows"), setTimeout(function() {
            btnNext.hasClass("swiper-button-disabled") && btnPrev.hasClass("swiper-button-disabled") && elem.addClass("no-arrows")
          }, 200), swiper.update()
        }, settingsForSlider.onAfterResize = function(swiper) {
          swiper.slides.length <= swiper.params.slidesPerView ? "auto" !== swiper.params.slidesPerView && elem.addClass("no-arrows") : elem.removeClass("no-arrows"), swiper.update(), setTimeout(function() {
            btnNext.hasClass("swiper-button-disabled") && btnPrev.hasClass("swiper-button-disabled") || swiper.params.slidesPerView
          }, 200)
        }, carouselSwiper = new Swiper(carousel.get(0), settingsForSlider));
        var efficientReinit = debounce(function() {
          768 <= $(window).width() && (setPerView(), "auto" !== (settingsForSlider.slidesPerView = slidesMax) && (settingsForSlider.breakpoints = {
            1600: {
              slidesPerView: hackPerView,
              spaceBetween: 20
            },
            1423: {
              slidesPerView: hackPerView,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: hackPerView,
              spaceBetween: 20
            },
            768: {
              slidesPerView: "auto",
              freeMode: !0,
              spaceBetween: 0
            },
            480: {
              slidesPerView: "auto",
              freeMode: !1,
              roundLengths: !0,
              spaceBetween: 0
            }
          }), carouselSwiper.destroy(), carouselSwiper = new Swiper(carousel.get(0), settingsForSlider), btnPrev.click())
        }, 100);
        $(window).resize(efficientReinit)
      }
    }
  }]), angular.module("dir.initCarouselOffersMain", []).directive("initCarouselOffersMain", ["$timeout", function($timeout) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var carousel = element.children(".swiper-container")[0];
        $(carousel).append('<div class="swiper-scrollbar offer-scrollbar"></div>');
        var carouselParams = {
          scrollbar: ".swiper-scrollbar.offer-scrollbar",
          scrollbarDraggable: !0,
          spaceBetween: 20,
          slidesPerView: 5,
          scrollbarHide: !1,
          preloadImages: !1,
          lazyLoading: !0,
          lazyLoadingOnTransitionStart: !0,
          lazyLoadingInPrevNext: !0,
          breakpoints: {
            1600: {
              slidesPerView: 4
            },
            1423: {
              slidesPerView: 3
            },
            1280: {
              slidesPerView: 3
            },
            480: {
              slidesPerView: 1.3,
              spaceBetween: 8
            }
          },
          onInit: function(swiper) {
            $(swiper.container[0]).addClass("begin-reached"), setTimeout(function() {
              element.removeClass("has-loader")
            }, 500)
          },
          onAfterResize: function(swiper) {},
          onTouchStart: function(swiper, e) {},
          onTouchMove: function(swiper, e) {},
          onReachEnd: function(swiper) {
            $(swiper.container[0]).addClass("end-reached")
          },
          onSlidePrevEnd: function(swiper) {
            swiper.isEnd || $(swiper.container[0]).removeClass("end-reached")
          },
          onReachBeginning: function(swiper) {
            $(swiper.container[0]).addClass("begin-reached")
          },
          onSlideNextEnd: function(swiper) {
            swiper.isBeginning || $(swiper.container[0]).removeClass("begin-reached")
          }
        };
        setTimeout(function() {
          new Swiper(carousel, carouselParams)
        }, 100)
      }
    }
  }]), angular.module("dir.initTabs", []).directive("initTabs", ["$timeout", "$interval", "mapSrv", function($timeout, $interval, mapSrv) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var tabSwiper, tabBody = element.children(".elem-tab__bodies").children(".elem-tab__body"),
          activeIndex = 0,
          swiperContainer = element.children(".elem-tab__head").children(".swiper-container"),
          tabHead = swiperContainer.find(".swiper-slide");
        swiperContainer.append('<div class="swiper-button-prev" /><div class="swiper-button-next" />');
        var isSlideToCenter = !!element.hasClass("box-tabs--mob-center"),
          isNotFreeMode = element.hasClass("box-tabs--search");
        if (swiperContainer.length && null === swiperContainer[0].ownerDocument.defaultView) setTimeout(function() {
          initTabs()
        }, 100);
        else {
          setTimeout(function() {
            initTabs()
          }, 100), setTimeout(function() {
            swiperContainer.find(".swiper-container").each(function() {
              if (0 < $(this).find(".swiper-button-next:hidden").length) var sliderOffset = 70;
              if (tabSwiper.params.slidesOffsetAfter = sliderOffset, 0 < $(this).find(".swiper-button-prev:hidden").length) sliderOffset = 70;
              tabSwiper.params.slidesOffsetBefore = sliderOffset
            }), tabSwiper.update()
          }, 200);
          var scrollTriggerElem = $("[data-scroll-to='Reviews']"),
            indexOfReviews = $("#Reviews").index();
          scrollTriggerElem.click(function() {
            tabSwiper.params.centeredSlides = !0, tabSwiper.init({
              centeredSlides: !0
            }), $timeout(function() {
              tabSwiper.slideTo(indexOfReviews)
            }, 1e3)
          }), tabHead.click(function(e) {
            if ("" !== this.id && (window.location.hash = this.id), clikedOnTabHeadFromSide = !1, !$(this).hasClass("active")) {
              activeIndex = $(this).index(), tabHead.removeClass("active"), $(this).addClass("active"), tabBody.removeClass("active"), tabBody.eq(activeIndex).addClass("active"), isSlideToCenter && tabSwiper && tabSwiper.slideTo(activeIndex), stopAllVideo(element);
              for (var i = 0; i < mapSrv.mapObj.length; i++) void 0 !== mapSrv.mapObj[i] && mapSrv.mapObj[i].container.fitToViewport();
              setTimeout(function() {
                try {
                  var $rrSlider = $(".elem-tab__body.active").find(".rr-swiper-container");
                  $rrSlider.removeClass("rr-swiper-container"), $rrSlider.addClass("rr-swiper-container")
                } catch (e) {}
              }, 100), $timeout(function() {
                try {
                  carouselSwiper && carouselSwiper.update(), recomendCarousel.update()
                } catch (e) {}
                $(".img-wrapper", tabBody.eq(activeIndex)).children("img").each(function() {
                  $(this)[0].src = $(this).attr("bn-lazy-src"), $(this).parent().addClass("children-loaded")
                })
              }, 100)
            }
          }), setTimeout(function() {
            var hashTag, tabIndex;
            if (window.location.hash) {
              hashTag = window.location.hash.substring(1), tabHead.removeClass("active");
              var regexp = /#(.*)/;
              tabHead.each(function() {
                var str = $(this).data("hash");
                return regexp.exec(str) && regexp.exec(str)[1] == hashTag || $(this).attr("id") == hashTag ? (tabIndex = $(this).index(), tabSwiper.slideTo(tabIndex, 0, !1), $(this).addClass("active"), tabBody.removeClass("active"), tabBody.eq(tabIndex).addClass("active"), tabSwiper.isBeginning || $(tabSwiper.container[0]).removeClass("begin-reached"), tabSwiper.isEnd || $(tabSwiper.container[0]).removeClass("end-reached"), void 0 !== $(this).data("ajaxInline") && $(this).trigger("click"), !1) : $(this).data("scrollTo") == hashTag || $(this).children("a").length && $(this).children("a").attr("href").substr(1) == hashTag ? (tabIndex = $(this).index(), $(this).trigger("click"), setTimeout(function() {
                  $("html, body").animate({
                    scrollTop: $("#" + hashTag).offset().top - 80
                  }, 200)
                }, 100), tabSwiper.slideTo(tabIndex - 1), !1) : void 0
              }), tabSwiper.update()
            }
          }, 150), $(window).resize(function() {
            setTimeout(function() {
              tabSwiper.update(), carouselSwiper && carouselSwiper.update()
            }, 100)
          }), $("#pvz-pickup-link").length && $("#pvz-pickup-link").on("click", function(e) {
            if ($("#Delivery").length) {
              angular.element("#Delivery").triggerHandler("click"), tabSwiper.slideTo($("#Delivery").index());
              var count = 0,
                timer = setInterval(function() {
                  if ($("#pvzPickup").length)
                    for (var tabsArr = [".box-map", ".box-deliver", "#mCSB_3"], i = 0; i < tabsArr.length; i++) void 0 !== $(".elem-tab__body.active " + tabsArr[i]).offset() && ($("html, body").animate({
                      scrollTop: $(".elem-tab__body.active " + tabsArr[i]).offset().top - 100
                    }, 200, function() {
                      angular.element(document.querySelector("#pvzPickup")).click()
                    }), e.preventDefault(), clearInterval(timer));
                  50 < count++ && (clearInterval(timer), count = 0)
                }, 100)
            }
          }), window.addEventListener("hashchange", function() {
            setTimeout(function() {
              tabHead.each(function() {
                return 0 === window.location.hash.length ? (tabHead.removeClass("active"), tabHead.first().addClass("active"), tabBody.removeClass("active"), tabBody.first().addClass("active"), !1) : this.id !== window.location.hash.substr(1) || $(this).hasClass("active") ? void 0 : (activeIndex = $(this).index(), tabHead.removeClass("active"), $(this).addClass("active"), tabBody.removeClass("active"), tabBody.eq(activeIndex).addClass("active"), !1)
              })
            }, 200)
          }, !1)
        }

        function initTabs() {
          tabSwiper = new Swiper(swiperContainer[0], {
            slidesPerView: "auto",
            spaceBetween: 12,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            centeredSlides: !1,
            freeMode: !0,
            watchOverflow: !0,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
            breakpoints: {
              1024: {
                centeredSlides: !1
              },
              768: {
                centeredSlides: isSlideToCenter,
                freeMode: !isNotFreeMode
              },
              480: {
                spaceBetween: 10
              }
            },
            onInit: function(swiper) {
              setTimeout(function() {
                var event;
                "function" == typeof Event ? event = new Event("resize") : (event = document.createEvent("Event")).initEvent("resize", !0, !0), window.dispatchEvent(event)
              }, 200), $(swiper.container[0]).addClass("begin-reached"), $(swiper.container[0]).removeClass("end-reached"), tabHead.each(function() {
                $(this);
                if ($(this).hasClass("active")) return activeIndex = $(this).index(), !1
              }), tabHead.eq(activeIndex).addClass("active"), tabBody.eq(activeIndex).addClass("active"), setTimeout(function() {
                swiper.slideTo(activeIndex)
              }, 500)
            },
            onReachEnd: function(swiper) {
              $(swiper.container[0]).addClass("end-reached"), $(swiper.container[0]).removeClass("begin-reached")
            },
            onSlidePrevEnd: function(swiper) {
              swiper.isEnd || $(swiper.container[0]).removeClass("end-reached")
            },
            onReachBeginning: function(swiper) {
              $(swiper.container[0]).addClass("begin-reached"), $(swiper.container[0]).removeClass("end-reached")
            },
            onSlideNextEnd: function(swiper) {
              swiper.isBeginning || $(swiper.container[0]).removeClass("begin-reached")
            }
          })
        }
      }
    }
  }]), angular.module("dir.number", []).directive("number", ["$timeout", function($timeout) {
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attrs) {
        var initialVal, _this, callbackFunction, numberNoStepper = angular.isDefined(attrs.numberNostepper),
          numberChange = angular.isDefined(attrs.numberChange),
          basketPopup = angular.isDefined(attrs.basketPopup);
        if (numberNoStepper || element.stepper(), $timeout(function() {
            initialVal = +element.val()
          }, 1), element.on("keydown", function(e) {
            -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || 65 == e.keyCode && (!0 === e.ctrlKey || !0 === e.metaKey) || 67 == e.keyCode && (!0 === e.ctrlKey || !0 === e.metaKey) || 88 == e.keyCode && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && e.keyCode <= 40 || (e.shiftKey || e.keyCode < 48 || 57 < e.keyCode) && (e.keyCode < 96 || 105 < e.keyCode) && e.preventDefault()
          }), basketPopup || element.on("blur", function(e) {
            attrs.itemId && "" === e.target.value && (scope.amount[attrs.itemId] = 0)
          }), element.on("input", function(e) {
            e && 0 === parseInt(e.target.value, 10) && (attrs.itemId && (scope.amount[attrs.itemId] = 0), element.val(0), -1 < window.navigator.userAgent.indexOf("Edge") && element.trigger("change")), e && parseInt(e.target.value, 10) > parseInt(attrs.max, 10) && attrs.itemId && (scope.amount[attrs.itemId] = parseInt(attrs.max, 10));
            var carPos = e.target.selectionStart - 1,
              char = e.target.value[carPos];
            void 0 !== char && !1 === /^\d*$/.test(char) && $(e.target).val(e.target.value.slice(0, carPos) + e.target.value.slice(1 + carPos))
          }), numberChange && element.on("keyup input", function(e) {
            _this = $(this), $timeout(function() {
              +_this.val() > +attrs.max ? _this.val(attrs.max) : +_this.val() < +attrs.min && _this.val(attrs.min)
            }, 10), initialVal = +_this.val()
          }), basketPopup) {
          var arrowPlusBtn = element.parents(".stepper").find(".stepper-arrow.up"),
            arrowMinusBtn = element.parents(".stepper").find(".stepper-arrow.down");
          $timeout(function() {
            +element.val() >= +attrs.max ? arrowPlusBtn.addClass("disabled") : arrowPlusBtn.removeClass("disabled"), +element.val() <= +attrs.min ? arrowMinusBtn.addClass("disabled") : arrowMinusBtn.removeClass("disabled")
          }, 10), element.on("change", function() {
            +(_this = $(this)).val() >= +attrs.max ? arrowPlusBtn.addClass("disabled") : arrowPlusBtn.removeClass("disabled"), +_this.val() <= +attrs.min ? arrowMinusBtn.addClass("disabled") : arrowMinusBtn.removeClass("disabled")
          })
        }
        element.change(function() {
          return _this = $(this), $timeout(function() {
            +_this.val() > +attrs.max ? _this.val(attrs.max) : +_this.val() < +attrs.min && _this.val(attrs.min)
          }, 10), +_this.val() > +initialVal && attrs.plusCallback && "function" === attrs.plusCallback ? (callbackFunction = new Function(attrs.plusCallback), initialVal = +_this.val(), callbackFunction()) : +_this.val() < +initialVal && attrs.minusCallback && "function" === attrs.minusCallback ? (callbackFunction = new Function(attrs.minusCallback), initialVal = +_this.val(), callbackFunction()) : (initialVal = +_this.val(), void(element[0].form && "basketCtrl" === element[0].form.getAttribute("data-ng-controller") && element.blur()))
        })
      }
    }
  }]), angular.module("dir.popupGet", []).directive("popupGet", ["$compile", "$timeout", "$rootScope", "formSrv", function($compile, $timeout, $rootScope, formSrv) {
    return {
      restrict: "A",
      scope: {
        data: "=popupData"
      },
      link: function($scope, $element, $attrs) {
        var openDelay = 0,
          favIds, addFavs = function(str, ins) {
            var ind = str.indexOf("_fav_ids_");
            return -1 === ind ? str : str.slice(0, ind) + ins + str.slice(ind + 9)
          },
          scrollDistance = 0;

        function disableScroll() {
          scrollDistance = $(window).scrollTop(), $("body").css({
            position: "fixed",
            left: 0,
            top: -1 * scrollDistance,
            bottom: 0,
            right: 0
          })
        }

        function enableScroll() {
          $("body").css({
            position: "",
            left: "",
            top: "",
            bottom: "",
            right: ""
          }), $(window).scrollTop(scrollDistance)
        }
        $element.click(function(e) {
          e.preventDefault(), $.magnificPopup.instance.isOpen && ($.magnificPopup.close(), delete $.magnificPopup.instance.popupsCache.pGet, openDelay = 200), $timeout(function() {
            $.magnificPopup.open({
              removalDelay: 200,
              type: "ajax",
              closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
              key: "pGet",
              closeOnBgClick: !1,
              items: {
                src: $element.data("mfpSrc")
              },
              ajax: {
                settings: {
                  data: $scope.data
                }
              },
              callbacks: {
                beforeOpen: function() {
                  $("body").hasClass("safari") ? disableScroll() : $("body").addClass("no-scroll")
                },
                beforeClose: function() {
                  this.contentContainer[0].className += " popupOut", delete $.magnificPopup.instance.popupsCache.pGet, $("body").removeClass("no-scroll"), $(this.contentContainer[0]).find("[data-close-callback]") && $(this.contentContainer[0]).find("[data-close-callback]").each(function() {
                    if ($(this).is(":visible") && !window.backendGetForm) try {
                      eval($(this).data("close-callback"))
                    } catch (e) {
                      e instanceof SyntaxError && console.error(e.message)
                    }
                  })
                },
                afterClose: function() {
                  $("body").hasClass("safari") ? enableScroll() : $("body").removeClass("no-scroll")
                },
                ajaxContentAdded: function() {
                  var socialLinks = this.content.find(".nav-social .elem-social");
                  if (socialLinks.length && (favIds = null !== localStorage.getItem("favObj") && 0 !== JSON.parse(localStorage.getItem("favObj")).length ? JSON.parse(localStorage.getItem("favObj")).join(",") : "", socialLinks.each(function() {
                      var onClickAttr = $(this).attr("onclick"),
                        newOnClickAttr = addFavs(onClickAttr, favIds);
                      $(this).attr("onclick", newOnClickAttr)
                    })), $compile(this.content)($scope), $rootScope.$digest(), this.contentContainer[0].className += " popupIn", 0 < document.getElementsByClassName("selectpicker").length) try {
                    $(".selectpicker").selectpicker("refresh"), setTimeout(function() {
                      $(".option--colors").length && $(".option--colors .dropdown-menu li").each(function(i, el) {
                        var topLayerLink = '<a class="top-layer-link" href="' + $(el).find("span.select-icon").data("url") + '" target="_blank"></a>';
                        $(el).prepend(topLayerLink)
                      })
                    }, 100)
                  } catch (e) {}
                  try {
                    myLazyLoad.update()
                  } catch (e) {}
                  try {
                    $(".elem-custom-scroll").mCustomScrollbar("update")
                  } catch (e) {}
                  formSrv.isEdit = !1, window.backendGetForm = !1
                }
              }
            })
          }, openDelay + 100)
        })
      }
    }
  }]), window.postfixCaptchaElem = 0, angular.module("dir.validateForm", []).service("validatorTools", [function() {
    this.isCyrillicSymbol = function(symbolOrString) {
      var regC = new RegExp("[а-яА-ЯёЁ]");
      return "" === symbolOrString ? -1 : symbolOrString.search(regC)
    }
  }]).directive("input", ["validatorTools", "$parse", function(validatorTools, $parse) {
    function postLink(scope, iElement, iAttrs) {
      var isItEmail = "email" === iAttrs.type,
        keyForValue = iAttrs.ngModel;
      if (isItEmail) {
        var currentCtx = scope.$new(),
          inputValueSet = $parse(iAttrs.ngModel).assign,
          elemValue = iElement.val(),
          invalidSymbolIndex = validator(elemValue);
        if (-1 !== invalidSymbolIndex) {
          var newStr = elemValue.slice(0, invalidSymbolIndex);
          iElement.val(newStr), inputValueSet(currentCtx, newStr)
        }
        iElement.on("keyup", function() {
          currentCtx[keyForValue] = iElement.val(), currentCtx.$apply()
        }), currentCtx.$watch(keyForValue, function(newVal, oldVal) {
          if (newVal != oldVal) {
            var invalidSymbolIndex = validator(newVal);
            if (-1 === invalidSymbolIndex) inputValueSet(currentCtx, newVal);
            else {
              var newStr = newVal.slice(0, invalidSymbolIndex);
              iElement.val(newStr), inputValueSet(currentCtx, newStr)
            }
          }
        })
      }

      function validator(symbol) {
        return validatorTools.isCyrillicSymbol(symbol)
      }
    }
    return {
      compile: function(elem, attrs) {
        if ("email" === attrs.type) {
          var modelVal = attrs.ngModel;
          attrs.ngModel = modelVal || "userEmail"
        }
        return postLink
      },
      restrict: "E",
      scope: !1
    }
  }]).directive("validateForm", ["$http", "$timeout", "$window", "$q", "$document", "$interval", "$compile", "$rootScope", "formSrv", "favSrv", function($http, $timeout, $window, $q, $document, $interval, $compile, $rootScope, formSrv, favSrv) {
    return {
      link: function(scope, elm, attrs) {
        function fillInitials() {
          elm.find("[name='form_text_178']").val("yes" == scope.checkboxModelName ? elm.find("[name='form_text_81']").val() : ""), elm.find("[name='form_text_179']").val("yes" == scope.checkboxModelName ? elm.find("[name='form_text_82']").val() : ""), elm.find("[name='form_text_180']").val("yes" == scope.checkboxModelName ? elm.find("[name='form_text_83']").val() : "")
        }
        if (scope.hideErrors = function(id) {
            $(".has-error", "#" + id).removeClass("has-error")
          }, elm.find("[name='checkName']").length) {
          fillInitials();
          var checkName = elm.find("[name='checkName']");
          elm.find(".js-initials").on("change", fillInitials), checkName.on("change", fillInitials)
        }
        setTimeout(function() {
          elm.hasClass("popup-write") && elm.trigger("reset")
        }, 0);
        var deferred = $q.defer(),
          promise = deferred.promise,
          recaptcha;
        scope.formSrv = formSrv;
        var tempFavIds, captchaCreated = !1,
          elemForCaptcha, captchaObject;
        if (elm.hasClass("kitchen-planning") && $timeout(function() {
            function fillDates() {
              if (dateInput.val() && shopSelect.val()) {
                var dateInputValue = dateInput.val(),
                  shopSelectValue = shopSelect.val();
                $http.get("/ajax/forms/get_free_times.php?date=" + dateInputValue + "&form_id=" + formID + "&shop_id=" + shopSelectValue).then(function(response) {
                  var dates = response.data;
                  if (dates.length) {
                    errorField.hide();
                    var datesTemplate = dates.map(function(date) {
                      return "<option value=" + date + ">" + date + "</option>"
                    }).join("");
                    timeSelect.html(datesTemplate), timeSelect.selectpicker("refresh")
                  } else {
                    var errorText = "Запись на " + dateInputValue + " закончена. Пожалуйста, выберите другую дату встречи.";
                    errorField.text(errorText), errorField.show(), timeSelect.html(""), timeSelect.selectpicker("refresh")
                  }
                })
              }
            }
            var dateInput = elm.find(".date-input"),
              shopSelect = elm.find(".selectpicker.shop-input"),
              timeSelect = elm.find(".selectpicker.time-select"),
              errorField = elm.find(".error-text"),
              formID = elm.find("[name='WEB_FORM_ID']").val();
            fillDates(), shopSelect.on("change", fillDates), $rootScope.$on("date_changed", fillDates)
          }, 1e3), attrs.recaptchaElem && "authFormPopup" === attrs.recaptchaElem) {
          var clickCounter = 0,
            button = elm[0].querySelector('button[type="submit"]');
          angular.element(button).bind("click", function() {
            2 < clickCounter && !0 === captchaCreated ? (clickCounter = 0, executeCaptcha()) : 2 === clickCounter && !1 === captchaCreated ? createCaptcha() : clickCounter++
          })
        }
        $timeout(function() {
          tempFavIds = favSrv.ids, scope.fav_ids = tempFavIds.join()
        }, 10);
        var btnStateDisabled = function(val) {
            for (var btns = $window.document.querySelectorAll('form[data-recaptcha-elem] button[type="submit"]'), i = 0; btns.length > i; i++) val ? btns[i].classList.add("disabled") : btns[i].classList.remove("disabled")
          },
          popStateLoader = function(val) {
            elm.closest(".box-popup") && (val ? elm.closest(".box-popup").addClass("has-loader") : elm.closest(".box-popup").removeClass("has-loader"))
          };

        function isRenderFunctionAvailable() {
          return angular.isFunction(($window.grecaptcha || {}).render)
        }

        function isExecuteFunctionAvailable() {
          return angular.isFunction(($window.grecaptcha || {}).execute)
        }

        function getRecaptcha() {
          return recaptcha ? $q.when(recaptcha) : promise
        }
        var createCaptcha = function() {
            if (attrs.recaptchaElem && "" != window.captchaKey) {
              if (window.postfixCaptchaElem++, elemForCaptcha = attrs.recaptchaElem + window.postfixCaptchaElem, elm.addClass("has-loader"), btnStateDisabled(!0), document.getElementById(elemForCaptcha) || elm.append('<div id="' + elemForCaptcha + '" />'), isRenderFunctionAvailable()) recaptcha = $window.grecaptcha, deferred.resolve(recaptcha);
              else if ($window.document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')) var intervalWait = $interval(function() {
                isRenderFunctionAvailable() && ($interval.cancel(intervalWait), recaptcha = $window.grecaptcha, deferred.resolve(recaptcha))
              }, 30);
              getRecaptcha().then(function(recaptcha) {
                $("#" + elemForCaptcha).length && (captchaObject = recaptcha.render(elemForCaptcha, {
                  sitekey: $window.captchaKey,
                  callback: captchaSubmit,
                  size: "invisible"
                })), elm.removeClass("has-loader"), btnStateDisabled(!1), captchaCreated = !0
              })
            }
          },
          executeCaptcha = function() {
            isExecuteFunctionAvailable() && $window.document.getElementById(elemForCaptcha) && (elm.removeClass("has-loader"), btnStateDisabled(!1), recaptcha.execute(captchaObject).then(function() {
              listenRecaptchaClose(elm)
            }))
          },
          generateTodayDate = function() {
            var today = new Date,
              dd = today.getDate(),
              mm = today.getMonth() + 1;
            return dd < 10 && (dd = "0" + dd), mm < 10 && (mm = "0" + mm), dd + "." + mm + "." + today.getFullYear()
          };
        attrs.recaptchaElem && "authFormPopup" !== attrs.recaptchaElem && createCaptcha();
        var captchaSubmit = function(token) {
            elm.addClass("has-loader"), btnStateDisabled(!0), $http({
              method: attrs.method,
              url: attrs.action,
              data: elm.serialize()
            }).then(options.success)
          },
          options = {
            success: function(response) {
              if (formSrv.data = {}, formSrv.data = response.data, response.data.CLEAR && 1 == response.data.CLEAR) {
                setTimeout(function() {
                  $(elm[0]).find("input, select, textarea").not("[name='form_radio_PAY_TYPE'],[name='form_dropdown_SHOP_TYPE'],[name='form_text_77'],input[type='hidden'],input[type='checkbox'],input[readonly],[name='form_text_233'],[name='form_hidden_230'],[name='form_dropdown_THEME'],.prevent-server-clear").val("")
                }, 100);
                var now = generateTodayDate();
                $("[data-set-date]", elm).attr("data-set-date");
                if ($(".form-field--keeper").attr("date-keeper")) {
                  var ref_date = $(".form-field--keeper").attr("date-keeper");
                  ref_date = ref_date.replace(/-/g, "."), $(".form-field--date input", elm).val(ref_date), $timeout(function() {
                    try {
                      $(".selectpicker").selectpicker("refresh"), setTimeout(function() {
                        $(".option--colors").length && $(".option--colors .dropdown-menu li").each(function(i, el) {
                          var topLayerLink = '<a class="top-layer-link" href="' + $(el).find("span.select-icon").data("url") + '" target="_blank"></a>';
                          $(el).prepend(topLayerLink)
                        })
                      }, 100)
                    } catch (e) {}
                  }, 0)
                } else $(".form-field--date input", elm).val(now);
                $(".time-select", elm) && $timeout(function() {
                  $(".selectpicker.time-select", elm).html(""), $(".selectpicker", elm).each(function() {
                    $(this).selectpicker("refresh")
                  })
                }, 0), $(".selectpicker.selectpicker-shop-list", elm).each(function() {
                  $(this).selectpicker("refresh")
                }), $(".form-field__error-total", elm).text(""), scope.$broadcast("dropStars", null), scope.$broadcast("dropFiles", null)
              }
              if (!1 === response.data.RESULT && "CAPTCHA" === response.data.ERROR_TYPE) !1 === captchaCreated ? createCaptcha() : clickCounter ? clickCounter = 3 : executeCaptcha();
              else if (!1 === response.data.RESULT) response.data.ERRORS && $.map(response.data.ERRORS, function(val, i) {
                $('[name="' + i + '"]', elm).parent().addClass("has-error"), $('[name="' + i + '"]', elm).parent().children(".form-field__error-msg").html(val)
              }), $(".form-field__error-total", elm).removeClass("success");
              else {
                window.backendGetForm = !0, $(".form-field", elm).removeClass("has-error");
                var formData = toJSON(elm.serialize());
                formData.auth_type && 0 < formData.auth_type.length && localStorage.removeItem("favObj"), response.data.HEADER_DESKTOP && !$(".cart-header").length && ($(".box-search").empty(), $(".mobile-cabinet-cart").empty(), angular.element(".box-search").append($compile(response.data.HEADER_DESKTOP)(scope)), angular.element(".mobile-cabinet-cart").append($compile(response.data.HEADER_MOBILE)(scope)), null !== response.data.FAV_IDS ? favSrv.ids = response.data.FAV_IDS : favSrv.ids = [], window.is_authorized = !0, $(".opt-favorite").removeClass("active"), $timeout(function() {
                  for (var i = 0; i < favSrv.ids.length; i++) $('[data-ng-init="checkFav(' + favSrv.ids[i] + ')"]').addClass("active");
                  $.magnificPopup.close()
                }, 200), $.magnificPopup.close()), response.data.HEADER_DESKTOP && $(".cart-header").length && window.location.reload(!0), response.data.REDIRECT_URL && ($("body").addClass("has-loader"), location.href = response.data.REDIRECT_URL)
              }
              var formWrapId;
              if (response.data.MESSAGE && !response.data.POPUP ? response.data.MESSAGE.TITLE && response.data.MESSAGE.TEXT ? $(".form-field__error-total", elm).html('<br><div class="form-field__error-title">' + response.data.MESSAGE.TITLE + '</div><p class="form-field__error-text">' + response.data.MESSAGE.TEXT + "</p>") : response.data.MESSAGE.TITLE ? $(".form-field__error-total", elm).html('<div class="form-field__error-title">' + response.data.MESSAGE.TITLE + "</div>") : response.data.MESSAGE.TEXT && $(".form-field__error-total", elm).html('<p class="form-field__error-text">' + response.data.MESSAGE.TEXT + "</p>") : response.data.MESSAGE && response.data.POPUP ? $.magnificPopup.instance.isOpen ? ($timeout(function() {
                  $.magnificPopup.close()
                }, 100), $timeout(function() {
                  generatePopup(response.data.MESSAGE)
                }, 1e3)) : generatePopup(response.data.MESSAGE) : $(".form-field__error-total", elm).html(""), $(elm).removeClass("has-loader"), btnStateDisabled(!1), popStateLoader(!1), document.querySelector('[name="sessid"]') && $http({
                  method: "POST",
                  url: "/ajax/get_sessid.php"
                }).then(function(response) {
                  $('[name="sessid"]').val(response.data)
                }), response.data.CALLBACK) return new Function(response.data.CALLBACK)();
              "true" == attrs.clearAfterSubmit && $timeout(function() {
                elm[0].reset(), formWrapId = elm.parent().prop("id"), $('[data-ajax-append-id="' + formWrapId + '"]').trigger("click")
              }, 200)
            }
          },
          popupConfig = {
            removalDelay: 200,
            key: "pAnswer",
            items: {},
            type: "inline",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
            closeOnBgClick: !1,
            callbacks: {
              beforeOpen: function() {
                $("body").addClass("no-scroll")
              },
              open: function() {
                var _this = this;
                window.backendGetForm = !1, $timeout(function() {
                  _this.contentContainer[0].className += " popupIn"
                }, 200)
              },
              beforeClose: function() {
                this.contentContainer[0].className += " popupOut", $("body").removeClass("no-scroll"), elm.removeClass("has-loader"), btnStateDisabled(!1), popStateLoader(!1), $(this.contentContainer[0]).find("[data-close-callback]") && $(this.contentContainer[0]).find("[data-close-callback]").each(function() {
                  try {
                    eval($(this).data("close-callback"))
                  } catch (e) {
                    e instanceof SyntaxError && console.error(e.message)
                  }
                })
              },
              afterClose: function() {
                delete $.magnificPopup.instance.popupsCache.pAnswer
              }
            },
            inline: {
              markup: ""
            }
          };

        function generatePopup(data) {
          data.TITLE && "" != data.TITLE ? popupConfig.inline.markup = '<div class="box-popup popup-password"><button title="Закрыть (Esc)" type="button" class="mfp-close"></button><div class="box-popup__name">' + data.TITLE + "</div><br><div>" + data.TEXT + "</div></div>" : popupConfig.inline.markup = '<div class="box-popup popup-password"><button title="Закрыть (Esc)" type="button" class="mfp-close"></button><div>' + data.TEXT + "</div></div>", $.magnificPopup.open(popupConfig)
        }
        $.validator.messages.required = "Поле обязательно для заполнения", $.validator.messages.email = "Адрес e-mail заполнен не верно", $.validator.messages.equalTo = "Пароли не совпадают", $.validator.messages.minlength = "Не менее 6 символов", $.validator.addMethod("checkEmail", function(value, element) {
          return null === element.getAttribute("required") || ($.ajax({
            url: "/ajax/email_valid.php",
            method: "POST",
            success: function(res) {
              result = JSON.parse(res).RESULT
            },
            async: !1,
            data: {
              email: value
            }
          }), result);
          var result
        }, "Адрес e-mail заполнен не верно"), elm.validate({
          ignore: ".ignore",
          errorElement: "div",
          normalizer: function(value) {
            return $.trim(value)
          },
          rules: {
            PASSWORD: {
              minlength: 6
            },
            CONFIRM_PASSWORD: {
              equalTo: "#password"
            }
          },
          submitHandler: function(form) {
            if ($(elm).addClass("has-loader"), btnStateDisabled(!0), popStateLoader(!0), $("input", elm).each(function() {
                $(this).val($.trim($(this).val()))
              }), 0 < $("input[data-mask-input='+7 (999) 999-99-99']:required", elm).length || 0 < $("input[data-mask-input='+7 (999) 999-99-99']", elm).length && "" != $("input[data-mask-input='+7 (999) 999-99-99']").val()) {
              if (0 < $("input[data-mask-input='+7 (999) 999-99-99']:required", elm).length) var telItem = $("input[data-mask-input='+7 (999) 999-99-99']:required", elm);
              else telItem = $("input[data-mask-input='+7 (999) 999-99-99']", elm);
              for (var telItemVal = telItem.val(), phoneError = !1, i = 0; i < telItemVal.length; i++)
                if ("_" == telItemVal[i]) {
                  phoneError = !0;
                  break
                } if (phoneError) {
                if ($(elm).removeClass("has-loader"), btnStateDisabled(!1), popStateLoader(!1), telItem.parent().addClass("has-error"), telItem.focus(), !0 !== telItem.data("modal") && $("html, body").animate({
                    scrollTop: telItem.offset().top - 100
                  }, 200), attrs.statUrl) {
                  var errorStat = {};
                  errorStat.form = form.getAttribute("name"), errorStat.fields = [], errorStat.fields.push(telItem[0].getAttribute("name")), $http({
                    method: "POST",
                    url: attrs.statUrl,
                    data: errorStat
                  })
                }
                return !1
              }
            }
            return angular.isDefined(scope.innModel) && "card" !== scope.onlineshop ? is_valid_inn(scope.innModel) ? attrs.recaptchaElem && "" != window.captchaKey && isExecuteFunctionAvailable() ? (recaptcha.reset(captchaObject), recaptcha.execute(captchaObject).then(function() {
              listenRecaptchaClose(elm)
            })) : $http({
              method: attrs.method,
              url: attrs.action,
              data: elm.serialize()
            }).then(options.success) : (generatePopup({
              TITLE: "Ошибка!",
              TEXT: "Не совпадает контрольная сумма ИНН."
            }), $(elm).removeClass("has-loader"), btnStateDisabled(!1), popStateLoader(!1)) : attrs.recaptchaElem && "" != window.captchaKey && isExecuteFunctionAvailable() && !0 === captchaCreated ? (recaptcha.reset(captchaObject), recaptcha.execute(captchaObject).then(function() {
              listenRecaptchaClose(elm);
              var isCaptchaVisible = !1,
                count = 0,
                timer = setInterval(function() {
                  if ($('iframe[title*="recaptcha"]').each(function(i, el) {
                      "visible" === $(el).parent().parent().css("visibility") && (isCaptchaVisible = !0)
                    }), isCaptchaVisible) {
                    elm.removeClass("has-loader"), elm.find(".disabled").removeClass("disabled");
                    var $recaptcha = $(document).find('iframe[title*="recaptcha"]');
                    $recaptcha.css({
                      top: 0
                    }), $(window).width() < 769 ? $recaptcha.parent().css({
                      position: "fixed",
                      "-webkit-overflow-scrolling": "touch",
                      "max-height": "100vh",
                      overflow: "auto"
                    }) : ($recaptcha.parent().css({
                      position: "fixed",
                      "-webkit-overflow-scrolling": "touch",
                      "max-height": "100vh"
                    }), $recaptcha.css({
                      width: "100%",
                      height: "100%"
                    })), clearTimeout(timer)
                  } else count++;
                  50 < count && clearTimeout(timer)
                }, 100)
            })) : $http({
              method: attrs.method,
              url: attrs.action,
              data: elm.serialize()
            }).then(options.success), !1
          },
          invalidHandler: function(event, validator) {
            if (elm.find("input[required]").each(function(i, el) {
                "" === $(el).val() && $(el).parent(".form-field") && $(el).parent(".form-field").addClass("has-error")
              }), elm.find(".elem-dropzone[required]").length && elm.find(".elem-dropzone[required]").each(function() {
                if (![].slice.call(this.querySelectorAll("input[type='hidden']")).some(function(inp) {
                    return inp.value
                  })) return $(this).addClass("has-error"), window.scrollTo(0, $(this).offset().top - 100), !1
              }), attrs.statUrl) {
              var errorStat = {};
              for (var key in errorStat.form = validator.currentForm.name, errorStat.fields = [], validator.invalid) validator.invalid.hasOwnProperty(key) && errorStat.fields.push(key);
              $http({
                method: "POST",
                url: attrs.statUrl,
                data: errorStat
              })
            }
          },
          errorPlacement: function(error, element) {
            $(element).closest(".form-field").addClass("has-error"), "Не менее 6 символов" == error[0].innerText && $(element).closest(".form-field").children(".form-field__error-msg").text(error[0].innerText), "Пароли не совпадают" == error[0].innerText && $(element).closest(".form-field").children(".form-field__error-msg").text(error[0].innerText)
          },
          highlight: function(element, errorClass) {
            $(element).closest(".form-field").removeClass("has-error")
          },
          unhighlight: function(element, errorClass, validClass) {
            if ($(element).closest(".form-field").removeClass("has-error"), 0 < $("input[data-mask-input='+7 (999) 999-99-99']:required", elm).length || 0 < $("input[data-mask-input='+7 (999) 999-99-99']", elm).length && "" != $("input[data-mask-input='+7 (999) 999-99-99']").val()) {
              if (0 < $("input[data-mask-input='+7 (999) 999-99-99']:required", elm).length) var telItem = $("input[data-mask-input='+7 (999) 999-99-99']:required", elm);
              else telItem = $("input[data-mask-input='+7 (999) 999-99-99']", elm);
              for (var telItemVal = telItem.val(), phoneError = !1, i = 0; i < telItemVal.length; i++)
                if ("_" == telItemVal[i]) {
                  phoneError = !0;
                  break
                } phoneError && telItem.parent().addClass("has-error")
            }
          }
        }), $('input[type="email"]', elm).each(function() {
          $(this).rules("add", {
            checkEmail: !0
          })
        })
      }
    }
  }]), angular.module("dir.maskInput", []).directive("maskInput", [function() {
    return {
      restrict: "A",
      scope: {
        maskInput: "@maskInput",
        placeholder: "@placeholder",
        notZero: "@",
        noStartZero: "@"
      },
      link: function(scope, element, attrs) {
        angular.isDefined(scope.placeholder) && 0 != scope.placeholder.length && element.closest(".form-field").find(".form-field__label").addClass("active"), angular.isUndefined(scope.placeholder) && (element.closest(".form-field").find(".form-field__label").addClass("active"), scope.placeholder = ""), "+7 (999) 999-99-99" === scope.maskInput ? (element.inputmask({
          mask: scope.maskInput,
          placeholder: scope.placeholder,
          clearIncomplete: !1
        }), element.on("keyup keypress", function(e) {
          if (46 === (e.keyCode || e.which)) return e.preventDefault(), !1
        })) : "9{1,6}[.,]([0|9]){2}" === scope.maskInput ? element.inputmask({
          regex: "^[0-9]{1,6}([.,][0-9]{2})?$",
          placeholder: scope.placeholder,
          radixPoint: ".",
          clearIncomplete: !1,
          clearMaskOnLostFocus: !1,
          positionCaretOnClick: "none",
          noValuePatching: !0
        }) : element.inputmask({
          mask: scope.maskInput,
          placeholder: scope.placeholder,
          clearIncomplete: !1
        }), element.attr("placeholder", scope.placeholder), "9{1,6}[.,]([0|9]){2}" === scope.maskInput && (setTimeout(function() {
          isInt(parseFloat(element.val())) && element.val(parseFloat(element.val()).toFixed(2))
        }, 1), element.bind("blur", function() {
          if (element.val().toString().includes(",")) {
            var value = element.val().toString().replace(",", ".");
            element.val(value)
          }
          isInt(parseFloat(element.val())) && element.val(parseFloat(element.val()).toFixed(2)), element.val().toString().includes(".") && 1 === element.val().toString().split(".").pop().length && element.val(parseFloat(element.val()).toFixed(2))
        })), angular.isDefined(scope.notZero) && element.bind("keyup", function() {
          0 == parseInt(element.val()) && element.val("")
        }), angular.isDefined(scope.noStartZero) && element.bind("blur", function() {
          var n;
          n = element.val(), Number(n) === n && n % 1 != 0 || element.val(+element.val())
        }), "int" in attrs && element.on("input", function(e) {
          var carPos = e.target.selectionStart - 1,
            char = e.target.value[carPos];
          !1 === /^\d*$/.test(char) && $(e.target).val(e.target.value.slice(0, carPos) + e.target.value.slice(1 + carPos))
        })
      }
    }
  }]), angular.module("dir.patternInput", []).directive("patternInput", function($compile) {
    return {
      restrict: "A",
      replace: !1,
      terminal: !0,
      priority: 1e3,
      link: function(scope, element, attrs) {
        function showPatternError() {
          setTimeout(function() {
            element.parents(".form-field").find(".form-field__error-msg").text(attrs.patternError), element.parents(".form-field").addClass("pattern-error")
          }, 100), setTimeout(function() {
            element.parents(".form-field").removeClass("pattern-error"), element.parents(".form-field").find(".form-field__error-msg").text(defaultErrorMessage)
          }, 1500)
        }
        var defaultErrorMessage = element.parents(".form-field").find(".form-field__error-msg").text();
        if ("" !== element.attr("pattern-input")) {
          var pattern = new RegExp(element.attr("pattern-input"));
          element.removeAttr("pattern-input"), element.on("keypress keyup", function(event) {
            var inputChar = String.fromCharCode(event.charCode);
            pattern.test(inputChar) || (showPatternError(), event.preventDefault())
          }), element.on("paste", function(event) {
            var pastedData = (event.clipboardData || window.clipboardData || event.originalEvent.clipboardData).getData("Text");
            pattern.test(pastedData) || (showPatternError(), event.preventDefault())
          }), element.on("drop", function() {
            return !1
          }), is_touch_device() && element.on("input", function(e) {
            var carPos = e.target.selectionStart - 1,
              char = e.target.value[carPos];
            !1 === pattern.test(char) && ($(e.target).val(e.target.value.slice(0, carPos) + e.target.value.slice(1 + carPos)), showPatternError())
          }), $compile(element)(scope)
        }
      }
    }
  }), angular.module("dir.formField", []).directive("formField", ["$timeout", function($timeout) {
    return {
      restrict: "C",
      link: function($scope, $element, $attrs) {
        var inputField = $element.find(".form-field__input"),
          hasPlaceholder = inputField[0] && inputField[0].placeholder.length,
          count = 0,
          timer = setInterval(function() {
            try {
              0 < inputField.length && 0 < inputField.val().length || hasPlaceholder || inputField.is(":-webkit-autofill") ? ($element.addClass("filled"), clearTimeout(timer)) : count++, 50 < count && clearTimeout(timer)
            } catch (e) {}
          }, 100);
        if ($attrs.altLabel) {
          var inputLabel = $element.children(".form-field__label"),
            origLabelTxt = inputLabel.text();
          inputLabel.addClass("active"), inputField.focus(function() {
            inputLabel.text($attrs.altLabel)
          })
        }
        if ("email" != inputField.attr("type") && inputField.on("keypress", function(e) {
            $element.removeClass("has-error")
          }), inputField.blur(function() {
            "" != $(this).val() || $(this).hasClass("ng-invalid-number") ? $element.addClass("filled") : $element.removeClass("filled"), $attrs.altLabel && inputLabel.text(origLabelTxt), document.querySelector(".popup-adress") && $timeout(function() {
              $(window).resize(), $(window).scroll()
            }, 100)
          }), $attrs.format) {
          var errorElem = $element.children(".form-field__error-msg"),
            origErrorTxt = errorElem.text(),
            inp = inputField[0];
          inp.addEventListener("change", function(event) {
            $timeout(function() {
              if (inp.value.length < 2) errorElem.text(origErrorTxt);
              else {
                var t = inp.value.split(/[^\d]+/);
                1 == t.length && 8 == t[0].length && (t[1] = t[0].substring(2, 4), t[2] = t[0].substring(4), t[0] = t[0].substring(0, 2)), 1 == t.length && 6 == t[0].length && (t[1] = t[0].substring(2, 4), t[2] = t[0].substring(4), t[0] = t[0].substring(0, 2)), t = t.map(function(item, i, arr) {
                  return i < 2 && item.length < 2 ? "0" + item : 2 == i && 2 == item.length ? "0" == item[0] ? "20" + item : "19" + item : item
                }).join("."), inp.value = t, 3 != (t = inp.value.split(/[^\d]+/)).length && ($element.addClass("has-error").addClass("wrong-format"), errorElem.text("Неверный формат")), parseInt(t[0]) < 1 || 31 < parseInt(t[0]) ? ($element.addClass("has-error").addClass("wrong-format"), errorElem.text("Неверный формат")) : parseInt(t[1]) < 1 || 12 < parseInt(t[1]) ? ($element.addClass("has-error").addClass("wrong-format"), errorElem.text("Неверный формат")) : parseInt(t[2]) < 1e3 || 2018 < parseInt(t[2]) ? ($element.addClass("has-error").addClass("wrong-format"), errorElem.text("Неверный формат")) : ($element.removeClass("has-error").removeClass("wrong-format"), errorElem.text(origErrorTxt));
                var l = inp.value.length;
                if (inp.createTextRange) {
                  var part = inp.createTextRange();
                  part.move("character", l), part.select()
                } else inp.setSelectionRange && inp.setSelectionRange(l, l)
              }
            }, 200)
          })
        }
      }
    }
  }]), angular.module("dir.popupInline", []).directive("popupInline", ["$timeout", "$window", "mapSrv", function($timeout, $window, mapSrv) {
    return {
      restrict: "A",
      link: function($scope, $element, $attrs) {
        var boundsArr;
        var config = {
          removalDelay: 200,
          type: "inline",
          closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
          key: "pGet",
          closeOnBgClick: !1,
          callbacks: {
            beforeClose: function() {
              $(".has-loader").removeClass("has-loader");
              for (var btns = $window.document.querySelectorAll('form[data-recaptcha-elem] button[type="submit"]'), i = 0; btns.length > i; i++) btns[i].classList.remove("disabled");
              if ("#privacy_notice" !== this.content.selector) {
                if (this.contentContainer[0].className += " popupOut", delete $.magnificPopup.instance.popupsCache.pGet, $("html").css({
                    overflow: "scroll"
                  }), $("body").hasClass("safari") || $("body").removeClass("no-scroll"), mapSrv.mapInPopup)
                  for (i = 0; i < mapSrv.mapObj.length; i++) mapSrv.mapObj[i].balloon.close()
              } else setTimeout(function() {
                $('[data-mfp-src="#popup_Resume"]').trigger("click")
              }, 500)
            },
            beforeOpen: function() {
              $("body").hasClass("safari") || $("body").addClass("no-scroll")
            },
            open: function() {
              $(".mfp-container").scrollTop(0);
              var _this = this;
              $timeout(function() {
                _this.contentContainer[0].className += " popupIn"
              }, 200), $timeout(function() {
                if (mapSrv.mapInPopup)
                  for (var i = 0; i < mapSrv.mapObj.length; i++) mapSrv.mapObj[i].container.fitToViewport();
                for (i = 0; i < mapSrv.mapObj.length; i++) mapSrv.mapObj[i] && ((boundsArr = mapSrv.mapObj[i].geoObjects.getBounds())[0][0] == boundsArr[1][0] && boundsArr[0][1] == boundsArr[1][1] ? mapSrv.mapObj[i].setZoom(13, {
                  duration: 0
                }) : mapSrv.mapObj[i].setBounds(mapSrv.mapObj[i].geoObjects.getBounds()));
                $(".js-card-height").each(function() {
                  var h1 = $(this).children().eq(0).find(".box-card-ico__title"),
                    h2 = $(this).children().eq(1).find(".box-card-ico__title"),
                    max = Math.max(h1.height(), h2.height());
                  767 < $(window).width() ? (h1.height(max), h2.height(max)) : (h1.removeAttr("style"), h2.removeAttr("style"))
                })
              }, 300)
            },
            close: function() {
              0 === $(".box-popup:not(.mfp-hide)").length && ($("body").removeClass("no-scroll"), $("html").css({
                overflow: "scroll"
              }))
            },
            afterClose: function() {
              $("body").hasClass("safari") || $("body").removeClass("no-scroll")
            }
          }
        };
        $element.magnificPopup(config), $("[data-mfp-src]").click(function() {
          $(".mfp-container").scrollTop(0)
        }), $(window).resize(function() {
          setTimeout(function() {
            $(".js-card-height").each(function() {
              var h1 = $(this).children().eq(0).find(".box-card-ico__title"),
                h2 = $(this).children().eq(1).find(".box-card-ico__title"),
                max = Math.max(h1.height(), h2.height());
              767 < $(window).width() ? (h1.height(max), h2.height(max)) : (h1.removeAttr("style"), h2.removeAttr("style"))
            })
          }, 300)
        })
      }
    }
  }]), angular.module("dir.jsBannerInit", []).directive("jsBannerInit", [function() {
    return {
      restrict: "C",
      link: function(scope, element, attrs) {
        element.append('<div class="btn-wrapper slider-prev"><div class="swiper-button-prev" /></div>'), element.append('<div class="btn-wrapper slider-next"><div class="swiper-button-next" /></div>'), element.append('<div class="swiper-pagination" />'), element.find(".swiper-slide").length < 2 && (element.children(".btn-wrapper").css({
          opacity: "0",
          "z-index": "-1"
        }), element.children(".swiper-pagination").css({
          opacity: "0",
          "z-index": "-1"
        }));
        var slideImgLoaded = !1,
          carouselBanner = new Swiper(element, {
            spaceBetween: 20,
            nextButton: element.children(".slider-next"),
            prevButton: element.children(".slider-prev"),
            pagination: element.children(".swiper-pagination"),
            paginationClickable: !0,
            loop: !0,
            loadPrevNext: !1,
            noSwiping: !1,
            noSwipingClass: "swiper-slide",
            autoplay: 4e3,
            pauseOnHover: !0,
            breakpoints: {
              1024: {
                noSwiping: !1
              },
              820: {
                autoplay: 4e3,
                pauseOnHover: !1,
                disableOnInteraction: !1
              }
            },
            onSlidePrevEnd: function(swiper) {
              slideImgLoaded || ($(".slide-img-wrap", element).find("img").each(function() {
                $(this)[0].hasAttribute("bn-lazy-src") && ($(this)[0].src = $(this).attr("bn-lazy-src"), $(this).parent().addClass("children-loaded")), $(this)[0].hasAttribute("data-src") && ($(this)[0].src = $(this).attr("data-src"), $(this).parent().addClass("children-loaded"))
              }), slideImgLoaded = !0)
            },
            onSlideNextEnd: function(swiper) {
              slideImgLoaded || ($(".slide-img-wrap", element).find("img").each(function() {
                $(this)[0].hasAttribute("bn-lazy-src") && ($(this)[0].src = $(this).attr("bn-lazy-src"), $(this).parent().addClass("children-loaded")), $(this)[0].hasAttribute("data-src") && ($(this)[0].src = $(this).attr("data-src"), $(this).parent().addClass("children-loaded"))
              }), slideImgLoaded = !0)
            }
          });
        element.on("mouseenter", function() {
          carouselBanner.stopAutoplay()
        }).on("mouseleave", function() {
          carouselBanner.startAutoplay()
        }).on("touchend", function() {
          carouselBanner.startAutoplay()
        })
      }
    }
  }]), angular.module("dir.tooltip", []).directive("tooltip", ["$compile", function($compile) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var side = "bottom",
          maxMediaSize = 0,
          theme = "tooltipster-hoff";
        "side" in attrs && (side = attrs.side), "maxMediaSize" in attrs && (maxMediaSize = parseInt(attrs.maxMediaSize)), "theme" in attrs && (theme = "tooltipster-hoff " + attrs.theme), setTimeout(function() {
          element.tooltipster({
            theme: theme,
            contentCloning: !0,
            contentAsHTML: !0,
            functionReady: function(instance, helper, placement) {
              if (window.innerWidth <= maxMediaSize) return $(helper.tooltip).hide(), !1;
              $compile(helper.tooltip)(scope), element.toggleClass("opened"), $(document).on("click", ".tooltipster-hoff__close", function() {
                $(helper.origin).tooltipster("hide"), $("body").removeClass("no-scroll")
              }), $(document).on("click", ".elem-card__fav--heart", function() {
                $(this).hasClass("active") && $(helper.tooltip).hide()
              }), $(window).width() < 768 && setTimeout(function() {
                instance.close()
              }, 5e3)
            },
            functionAfter: function() {
              element.toggleClass("opened")
            },
            functionPosition: function(instance, helper, placement) {},
            interactive: !0,
            debug: !1,
            trigger: "custom",
            triggerClose: {
              touchleave: !1,
              mouseleave: !0,
              tap: !0
            },
            triggerOpen: {
              touchstart: !1,
              mouseenter: !0,
              tap: !0
            },
            side: side
          })
        }, 100)
      }
    }
  }]), angular.module("dir.elemRangeSlider", []).directive("elemRangeSlider", ["$timeout", function($timeout) {
    return {
      restrict: "C",
      link: function(scope, elem, attrs) {
        var sliderElem = $(elem).find("[data-slider]"),
          min = +sliderElem.data("start"),
          max = +sliderElem.data("end"),
          btnTriggerOnly = sliderElem.data("btn-trigger-only"),
          sliderInput = $(elem).find(".range-field").children("input"),
          inputStart = $(elem).find(".range-field").first().children("input"),
          inputEnd = $(elem).find(".range-field").last().children("input"),
          jsElemBtn = sliderElem.parent().find(".js-elem-btn"),
          handleLower = sliderElem.find(".noUi-handle-lower");
        btnTriggerOnly || handleLower.on("mouseup", function() {
          jsElemBtn.trigger("click")
        }), $(sliderInput, elem).on("focus", function() {
          inputStart.val(), +inputEnd.val()
        }), $(sliderInput, elem).on("blur", function() {
          elem.parent().hasClass("elem-card__in") && (+$(this).val() < min && (scope[$(this).data("ng-model")] = min), +$(this).val() > max && (scope[$(this).data("ng-model")] = max), scope.$emit("updateTotal", scope[$(this).data("ng-model")]))
        }), $(sliderInput, elem).on("keyup", function(e) {
          13 === (e.keyCode || e.which) && (e.preventDefault(), $(this).blur())
        })
      }
    }
  }]), angular.module("dir.jsOffersInit", []).directive("jsOffersInit", ["$timeout", function($timeout) {
    return {
      restrict: "C",
      link: function(scope, element, attrs) {
        var carousel = element.children(".swiper-container")[0];
        $(carousel).append('<div class="swiper-scrollbar"></div>'), element.prepend('<div class="box-offers__btns"><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div>');
        var btnNext = element.find(".swiper-button-next"),
          btnPrev = element.find(".swiper-button-prev"),
          swiperScroll = $(carousel).children(".swiper-scrollbar"),
          carouselOffers = new Swiper(carousel, {
            nextButton: btnNext,
            prevButton: btnPrev,
            scrollbar: swiperScroll,
            spaceBetween: 20,
            slidesPerView: 5,
            scrollbarHide: !1,
            preloadImages: !0,
            breakpoints: {
              1600: {
                slidesPerView: 4
              },
              1423: {
                slidesPerView: 3
              },
              1280: {
                slidesPerView: "auto"
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10
              }
            },
            onInit: function(swiper) {
              $(swiper.container[0]).addClass("begin-reached"), swiper.slides.length <= swiper.params.slidesPerView ? element.addClass("no-arrows") : element.removeClass("no-arrows"), $(".box-offers__elem", element).children("img").each(function() {
                $(this)[0].src = $(this).attr("bn-lazy-src"), $(this).parent().addClass("children-loaded")
              })
            },
            onAfterResize: function(swiper) {
              swiper.slides.length <= swiper.params.slidesPerView ? element.addClass("no-arrows") : element.removeClass("no-arrows")
            },
            onReachEnd: function(swiper) {
              $(swiper.container[0]).addClass("end-reached")
            },
            onSlidePrevEnd: function(swiper) {
              swiper.isEnd || $(swiper.container[0]).removeClass("end-reached")
            },
            onReachBeginning: function(swiper) {
              $(swiper.container[0]).addClass("begin-reached")
            },
            onSlideNextEnd: function(swiper) {
              swiper.isBeginning || $(swiper.container[0]).removeClass("begin-reached")
            }
          });
        $timeout(function() {
          carouselOffers.update()
        }, 100), $(window).resize(function() {
          $timeout(function() {
            carouselOffers.update()
          }, 100)
        }), $(window).load(function() {
          $(window).resize()
        })
      }
    }
  }]), angular.module("dir.customScroll", []).directive("customScroll", ["$timeout", function($timeout) {
    return {
      restrict: "A",
      scope: {
        axis: "@scrollAxis"
      },
      link: function(scope, element, attrs) {
        var mouseScroll = !1;
        scope.axis || (scope.axis = "y", mouseScroll = !0);
        var options = {
          axis: scope.axis,
          scrollButtons: {
            enable: !0
          },
          advanced: {
            updateOnContentResize: !0
          },
          scrollInertia: 0,
          snapAmount: 15,
          mouseWheel: {
            enable: mouseScroll
          },
          callbacks: {
            onInit: function() {
              $(this).addClass("begin-reached")
            },
            onScroll: function() {
              0 != this.mcs.top && $(this).removeClass("begin-reached")
            },
            onTotalScroll: function() {
              $(this).addClass("end-reached")
            },
            onTotalScrollBack: function() {
              $(this).addClass("begin-reached"), $(this).removeClass("end-reached")
            }
          }
        };
        element.addClass("elem-custom-scroll"), 480 < viewportWidth ? $timeout(function() {
          element.mCustomScrollbar(options)
        }, 2) : element.mCustomScrollbar("destroy"), $(window).on("load", function() {
          480 < viewportWidth ? element.mCustomScrollbar(options) : element.mCustomScrollbar("destroy")
        })
      }
    }
  }]), angular.module("dir.bnLazySrc", []).directive("bnLazySrc", function($document, scrollAndResizeListener) {
    return {
      restrict: "A",
      link: function($scope, $element, $attributes) {
        var listenerRemover;

        function isInView(clientHeight, clientWidth) {
          var imageRect = $element[0].getBoundingClientRect();
          0 <= imageRect.top && imageRect.bottom <= clientHeight && 0 <= imageRect.left && imageRect.right <= clientWidth && ($element[0].src = $attributes.bnLazySrc, $element.parent().addClass("children-loaded"), listenerRemover())
        }
        listenerRemover = scrollAndResizeListener.bindListener(isInView), $element.on("$destroy", function() {
          listenerRemover()
        }), setTimeout(function() {
          isInView($document[0].documentElement.clientHeight, $document[0].documentElement.clientWidth)
        }, 1)
      }
    }
  }), angular.module("dir.jsEllipsis", []).directive("jsEllipsis", ["$timeout", function($timeout) {
    return {
      restrict: "C",
      scope: {
        cutHeight: "@cutHeight"
      },
      link: function(scope, element, attrs) {
        var width = $(window).width(),
          height = $(window).height();
        !isNaN(parseInt(element.css("min-height"))) && 0 < parseInt(element.css("min-height")) && (scope.cutHeight = parseInt(element.css("min-height")) + 5);
        var options = {
          height: parseInt(scope.cutHeight),
          remove: [" ", ",", ";", ".", "!", "?"],
          watch: "window"
        };
        $timeout(function() {
          $(window).width() <= 480 ? (options.height = 1.2 * parseInt(scope.cutHeight), element.hasClass("elem-product__name") && element.parent().hasClass("elem-product__name-mobile") && (options.height = .65 * parseInt(scope.cutHeight)), element.hasClass("description") && (options.height = .6 * parseInt(scope.cutHeight))) : 480 < $(window).width() && $(window).width() < 1053 ? options.height = .75 * parseInt(scope.cutHeight) : 1920 < $(window).width() ? options.height = 1.4 * parseInt(scope.cutHeight) : options.height = parseInt(scope.cutHeight), element.trigger("destroy.dot"), element.dotdotdot(options)
        }, 500), setTimeout(function() {
          myEfficientFn()
        }, 600);
        var myEfficientFn = debounce(function() {
          element.trigger("destroy.dot"), $(window).width() <= 480 ? (options.height = 1.2 * parseInt(scope.cutHeight), element.hasClass("elem-product__name") && element.parent().hasClass("elem-product__name-mobile") && (options.height = .65 * parseInt(scope.cutHeight)), element.hasClass("description") && (options.height = .6 * parseInt(scope.cutHeight))) : 480 < $(window).width() && $(window).width() < 1053 ? options.height = .75 * parseInt(scope.cutHeight) : 1920 < $(window).width() ? options.height = 1.4 * parseInt(scope.cutHeight) : options.height = parseInt(scope.cutHeight);
          setTimeout(function() {
            element.dotdotdot(options)
          }, 200), width = $(window).width(), height = $(window).height()
        }, 200);
        angular.element(window).resize(function() {
          $(window).width() == width && $(window).height() == height || myEfficientFn()
        }), $(".elem-view-type").click(function() {
          myEfficientFn()
        }), element.parents(".swiper-slide").click(function() {
          myEfficientFn()
        });
        var expandEllipsis = element.next(".expand-ellipsis");
        expandEllipsis.length && $(expandEllipsis).on("click", function(e) {
          e.preventDefault(), element.trigger("destroy.dot")
        })
      }
    }
  }]), angular.module("dir.headerScrollListener", []).directive("headerScrollListener", ["$window", "$timeout", function($window, $timeout) {
    return {
      scope: !0,
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        $window.viewportWidth;
        var hasScrollCallback = !1,
          pageType_I = {
            current: null,
            old: null,
            setType: function(pageSize) {
              var typesSizes = {
                XS: 479,
                SM: 767,
                MD: 1279,
                LG: 1422,
                XLG: 1600
              };
              for (var i in typesSizes) {
                var typeSize = typesSizes[i];
                if (parseInt(pageSize) <= typeSize) {
                  this.current = i;
                  break
                }
              }
            }
          };

        function setOrDel_ScrollCallback() {
          var scrollValNow = $window.scrollY,
            scrollValOld = $window.scrollY,
            timeoutId = null;
          "XS" !== pageType_I.current && "SM" !== pageType_I.current || ($window.addEventListener("scroll", function() {
            scrollValNow = $window.scrollY, $timeout.cancel(timeoutId), timeoutId = $timeout(changeSettingsByScroll(0 < scrollValOld - scrollValNow ? "top" : "bottom"), 200), scrollValOld = scrollValNow
          }), hasScrollCallback = !0)
        }

        function changeSettingsByScroll(scrollDirection) {
          if (70 < $window.scrollY) {
            var changedSettingFlag = !1;
            $element.hasClass("box-header--fixed") || ($element.addClass("box-header--fixed"), changedSettingFlag = !0), scrollDirection && "top" === scrollDirection ? ($element.addClass("box-header--showed"), $element.removeClass("box-header--hidden")) : changedSettingFlag || ($element.addClass("box-header--hidden"), $element.removeClass("box-header--showed")), $(".nav-profile").removeClass("opened")
          } else clearSettings();

          function clearSettings() {
            $element.removeClass("box-header--fixed"), $element.removeClass("box-header--showed"), $element.removeClass("box-header--hidden")
          }
          $("html").hasClass("bx-no-touch") && $("html").hasClass("bx-firefox") && clearSettings()
        }
        var timeoutId = null;
        $window.onresize = function() {
          $timeout.cancel(timeoutId), timeoutId = $timeout(function() {
            pageType_I.setType($window.viewportWidth), pageType_I.old && pageType_I.old === pageType_I.current || ("XS" != pageType_I.current && "SM" !== pageType_I.current || hasScrollCallback || setOrDel_ScrollCallback($window.viewportWidth), pageType_I.old = pageType_I.current)
          }, 200)
        }, pageType_I.setType($window.viewportWidth), setOrDel_ScrollCallback($window.viewportWidth), changeSettingsByScroll()
      }],
      link: [function() {}]
    }
  }]), angular.module("dir.accordionSections", []).directive("accordionSections", ["$timeout", "$compile", function($timeout, $compile) {
    return {
      restrict: "A",
      scope: {
        multi: "=multiexpand"
      },
      compile: function(elem, attrss) {
        return {
          post: function(scope, element, attrs) {
            element.hasClass("box-accordion__section") && attrs.$attr.accordionSections && ($(element).removeAttr("data-accordion-sections"), $(function() {
              $().generateAccordionWrapper()
            }))
          },
          pre: function(scope, element, attrs) {
            $timeout(function() {
              var _section = element,
                _trigger = _section.find(".trigger");
              _section.each(function() {
                $(this).hasClass("expanded") && $(this).children(".subsection").stop().slideDown(200)
              }), _trigger.off("click"), _trigger.click(function() {
                $(this).parent(".section").hasClass("expanded") ? ($(this).parent(".section").removeClass("expanded"), $(this).parent(".section").children(".subsection").stop().slideUp(200)) : ($(this).parent(".section").addClass("expanded"), $(this).parent(".section").children(".subsection").stop().slideDown(200))
              })
            }, 0)
          }
        }
      }
    }
  }]), $(function() {
    $.fn.reverse = [].reverse, $.fn.generateAccordionWrapper = function() {
      var invert = ":not(.box-accordion__section)",
        wrap = '<div class="box-accordion" data-accordion-sections="">',
        breakpoints = $(".box-article > *" + invert);
      breakpoints.each(function() {
        $(this).nextUntil(invert).wrapAll(wrap)
      }), breakpoints.first().prevUntil(invert).reverse().wrapAll(wrap), compileDom(".box-accordion")
    }, $(".box-accordion")[0] || $().generateAccordionWrapper()
  }), angular.module("ctrl.suggestCtrl", []).controller("suggestCtrl", ["$element", "$scope", "$sce", "$http", "$attrs", "$q", "$timeout", "$rootScope", "$compile", function($element, $scope, $sce, $http, $attrs, $q, $timeout, $rootScope, $compile) {
    var suggestions, URL = $attrs.suggestUrl,
      URL_selected = $attrs.sendUrl,
      inCart = $attrs.incart,
      inOrder = $attrs.inorder,
      objSuggest = [],
      overAddToBasket = !1;

    function setFromEnter() {
      var temp_item = {};
      void 0 !== $element.find(".ac-state-focus").attr("id") ? temp_item.id = $element.find(".ac-state-focus").attr("id") : temp_item.id = $element.find(".ac-menu-item").first().attr("id"), setCity(temp_item)
    }

    function setCity(item) {
      "" !== $element.find(".elem-suggest__input").val() && ($element.find(".elem-suggest__input").val(""), $(".box-citylist__list .elem-radio-city input").attr("checked", !1), $scope.cityID = item.id, !URL_selected || inCart || inOrder || $http.post(URL_selected, {
        location_id: item.id
      }).then(function(response) {
        if (response.data.LOCATION_ID && (location.href = location.pathname + location.search), response.data.CALLBACK) {
          if ("/basket/" === window.location.pathname || "/basket/order/" === window.location.pathname) return;
          return new Function(response.data.CALLBACK)()
        }
      }, function() {}), URL_selected && inCart && $http.post(URL_selected, {
        location_id: item.id
      }).then(function(response) {
        if ($scope.$emit("callMakePost", {
            LOCATION_NAME: response.data.LOCATION_NAME
          }), response.data.CALLBACK) {
          if ("/basket/" === window.location.pathname || "/basket/order/" === window.location.pathname) return;
          return new Function(response.data.CALLBACK)()
        }
      }, function() {}), URL_selected && inOrder && $http.post(URL_selected, {
        location_id: item.id
      }).then(function(response) {
        if ($rootScope.$broadcast("orderMakePost", {
            LOCATION_NAME: response.data.LOCATION_NAME
          }), response.data.CALLBACK) {
          if ("/basket/" === window.location.pathname || "/basket/order/" === window.location.pathname) return;
          return new Function(response.data.CALLBACK)()
        }
      }, function() {}))
    }
    $scope.cityID = 0, $scope.loading = !1, $(document).on("mouseenter", ".elem-product__cart", function() {
      overAddToBasket = !0
    }), $(document).on("mouseleave", ".elem-product__cart", function(e) {
      $(e.relatedTarget).parents("#basket").length || (overAddToBasket = !1)
    }), document.addEventListener("keydown", function(e) {
      $timeout(function() {
        var focusedElement = document.querySelector(".ac-state-focus"),
          acContainer = document.querySelector(".ac-container"),
          acMenuItem = document.querySelector(".ac-menu-item");
        if (("38" == e.keyCode || "40" == e.keyCode) && focusedElement) {
          $element.find(".elem-suggest__input").get()[0].selectionEnd = 0;
          var acContainerHeight = acContainer.clientHeight,
            bias = acMenuItem.clientHeight * ($(focusedElement).index() + 1),
            draggerContainer = $element.find(".mCSB_draggerContainer"),
            dragger = $element.find(".mCSB_dragger"),
            scrolledContainer = document.querySelector(".ac-menu").parentElement;
          scrolledContainer.style.top = 0 < acContainerHeight - bias ? 0 : acContainerHeight - bias + "px";
          var scrollValue = Math.abs(parseInt(scrolledContainer.style.top)) / scrolledContainer.clientHeight;
          dragger.css({
            top: draggerContainer.height() * scrollValue + "px"
          })
        }
      }, 100)
    }), $timeout(function() {
      $element.find(".form-search__text").on("input", function() {
        $(this).val().length ? $element.find(".elem-suggest__clear").show() : $element.find(".elem-suggest__clear").hide()
      }), $element.find(".elem-suggest__clear").on("click", function() {
        $element.find(".form-search__text").val(""), $element.find(".elem-suggest__clear").hide()
      })
    }, 1), $scope.autocomplete_options = {
      suggest: function(term) {
        if (term.length < 3) return;
        $scope.loading = !0;
        var deferred = $q.defer();
        return $http.post(URL, "?q=" + term).then(function(response) {
          objSuggest = response.data, (suggestions = function(term) {
            var q = term.toLowerCase().trim(),
              results = [];
            q = replaceLetter(q);
            for (var i = 0; i < objSuggest.length && results.length < 10; i++) {
              var suggestItem = objSuggest[i],
                suggestItemName = suggestItem.name ? suggestItem.name : suggestItem.NAME,
                suggestItemId = suggestItem.id ? suggestItem.id : suggestItem.ID;
              results.push({
                label: suggestItemName,
                value: suggestItemName,
                id: suggestItemId
              })
            }
            return results
          }(term)).forEach(function(s) {
            s.label = $sce.trustAsHtml(highlight(s.label, term))
          }), deferred.resolve(response), $scope.loading = !1
        }, function(response) {
          deferred.reject(response), $scope.loading = !1
        }), $q.when(deferred.promise).then(function() {
          return suggestions
        }, function(data) {
          return data
        })
      },
      on_attach: function() {
        $element.find(".ac-container").hasClass("elem-suggest__scroll") || ($element.find(".ac-container").addClass("elem-suggest__scroll"), initScroll())
      },
      on_select: function(item) {
        null !== localStorage.getItem("basket_order_location") && localStorage.removeItem("basket_order_location"), setCity(item)
      }
    }, $(document).on("click", ".elem-suggest__submit", function() {
      $(".ac-container").hasClass("ng-hide") || setFromEnter()
    }), $(document).on("keyup", ".elem-suggest__input", function(e) {
      "Enter" === e.key && setFromEnter()
    });
    var productData = {};
    $scope.autocomplete_search = {
      suggest: function(term) {
        if (term.length < 3) return;
        $scope.loading = !0, URL = isArticul(term) ? "/ajax/search_titles_articul.php?articul=" + ("#" === term[0] ? term.slice(1) : term) : $attrs.suggestUrl;
        var deferred = $q.defer();
        return $http.post(URL, "term=" + term).then(function(response) {
          objSuggest = response.data, (suggestions = function(term) {
            term.toLowerCase().trim();
            for (var results = [], i = 0; i < objSuggest.length; i++) {
              var suggestLabel, suggestItem = objSuggest[i];
              if (suggestItem.prices) {
                if ("category" !== suggestItem.type && isArticul(term)) {
                  var priceOld = suggestItem.prices.old ? '<div class="price-old"><span class="line-through">' + suggestItem.prices.old + '<span class="rub">p</span></span></div>' : "";
                  suggestLabel = '<article class="suggestion c-box-product"><div class="c-box-product__image"><img src="' + suggestItem.image + '"></div><div class="c-box-product__info"><span class="name">' + suggestItem.label + '</span><div class="articul">' + suggestItem.articul + '</div><div class="total">' + suggestItem.status_text + '</div></div><div class="c-box-product__counter"><div class="price">' + priceOld + '<div class="price-current"><span>' + suggestItem.prices.new + '<span class="rub">P</span></span></div></div></div><div class="c-box-product__cart"><div class="elem-product__cart"><svg aria-hidden="true" class="icon icon-basket"><use xlink:href="' + window.stp + 'images/required/sprite.svg#basket"></use></svg></div></div></article>'
                } else suggestLabel = '<article class="suggestion c-box-product c-box-product--simple">' + suggestItem.label + "</article>";
                results.push({
                  label: suggestLabel,
                  url: suggestItem.url,
                  data: suggestItem,
                  all: suggestItem.all_results,
                  noMobile: suggestItem.disable_mobile
                })
              }
            }
            return results
          }(term)).forEach(function(s) {
            s.label = $sce.trustAsHtml(highlight(s.label, term))
          }), deferred.resolve(response), $scope.loading = !1
        }, function(response) {
          deferred.reject(response), $scope.loading = !1
        }), $q.when(deferred.promise).then(function() {
          return suggestions
        }, function(data) {
          return data
        })
      },
      on_attach: function() {
        $element.find(".ac-container").hasClass("elem-suggest__scroll") || ($element.find(".ac-container").addClass("elem-suggest__scroll"), initScroll())
      },
      on_select: function(item) {
        overAddToBasket ? (productData = {
          id: item.data.id,
          xml_id: item.data.xml_id,
          getout: "basket"
        }, $scope.addItem(productData)) : location.href = item.url
      }
    };
    var isArticul = function(testString) {
      return ("#" === testString[0] ? testString.slice(1) : testString).split("").every(function(char) {
        return "0123456789".includes(char)
      })
    };
    var closePopupBtn;

    function highlight(str, term) {
      term = replaceLetter(term);
      var highlight_regex = new RegExp("(" + term + ")", "gi");
      return str.replace(highlight_regex, '<span class="highlight">$1</span>')
    }

    function initScroll() {
      $element.find(".elem-suggest__scroll").addClass("elem-custom-scroll"), $element.find(".elem-custom-scroll").mCustomScrollbar({
        axis: "y",
        scrollButtons: {
          enable: !0
        },
        advanced: {
          updateOnContentResize: !0
        },
        scrollInertia: 0,
        snapAmount: 15,
        mouseWheel: {
          enable: !0
        }
      })
    }
    $scope.checkRequest = function(e) {
      "" == toJSON($element.serialize()).search && e.preventDefault()
    }, $scope.addItem = function(frontData) {
      $http.post("/ajax/basket/add_offer.php", frontData).then(function(response) {
        var data;
        data = response.data, popupConfig.inline.markup = data, $.magnificPopup.open(popupConfig), $timeout(function() {
          try {
            myLazyLoad.update()
          } catch (e) {}
        }, 1), pagePreloader($scope.loading = !1)
      }, function() {
        pagePreloader($scope.loading = !1)
      })
    };
    var scrollDistance = 0;
    var popupConfig = {
      removalDelay: 200,
      key: "pCart",
      items: {},
      type: "inline",
      auto: !1,
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
      closeOnBgClick: !1,
      callbacks: {
        beforeOpen: function() {
          closePopupBtn = document.getElementsByClassName("mfp-close")[0];

          function preventScroll() {
            $("html").css({
              overflow: "hidden"
            }), $("body").hasClass("safari") ? (scrollDistance = $(window).scrollTop(), $("body").css({
              position: "fixed",
              left: 0,
              top: -1 * scrollDistance,
              bottom: 0,
              right: 0
            })) : $("body").addClass("no-scroll")
          }
          closePopupBtn ? (closePopupBtn.click(), $timeout(function() {
            preventScroll()
          }, 200)) : preventScroll()
        },
        open: function() {
          var _this = this;
          $compile(this.content)($scope), $(this.contentContainer).children(".box-popup").append('<button title="Закрыть (Esc)" type="button" class="mfp-close"></button>'), $timeout(function() {
            _this.contentContainer[0].className += " popupIn"
          }, 200)
        },
        beforeClose: function() {
          this.contentContainer[0].className += " popupOut", $("html")[0].removeAttribute("style"), $("body").hasClass("safari") ? ($("body").css({
            position: "",
            left: "",
            top: "",
            bottom: "",
            right: ""
          }), $(window).scrollTop(scrollDistance)) : $("body").removeClass("no-scroll")
        },
        afterClose: function() {
          delete $.magnificPopup.instance.popupsCache.pCart
        }
      },
      inline: {
        markup: ""
      }
    };

    function replaceLetter(word) {
      return word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = word.replace(/q/g, "й")).replace(/w/g, "ц")).replace(/e/g, "у")).replace(/r/g, "к")).replace(/t/g, "е")).replace(/y/g, "н")).replace(/u/g, "г")).replace(/i/g, "ш")).replace(/o/g, "щ")).replace(/з/g, "з")).replace(/\[/g, "х")).replace(/\]/g, "ъ")).replace(/a/g, "ф")).replace(/s/g, "ы")).replace(/d/g, "в")).replace(/f/g, "а")).replace(/g/g, "п")).replace(/h/g, "р")).replace(/j/g, "о")).replace(/k/g, "л")).replace(/l/g, "д")).replace(/\;/g, "ж")).replace(/\'/g, "э")).replace(/z/g, "я")).replace(/x/g, "ч")).replace(/c/g, "с")).replace(/v/g, "м")).replace(/b/g, "и")).replace(/n/g, "т")).replace(/m/g, "ь")).replace(/\./g, "ю")
    }
  }]), angular.module("ctrl.autoCompleteCtrl", []).controller("autoCompleteCtrl", ["$element", "$scope", "$sce", "$http", "$attrs", "$q", "$timeout", "$rootScope", "$compile", function($element, $scope, $sce, $http, $attrs, $q, $timeout, $rootScope, $compile) {
    var URL = $attrs.suggestUrl,
      productData = {},
      overAddToBasket = !1;
    $scope.loading = !1, $(document).on("mouseenter", ".elem-product__cart", function() {
      overAddToBasket = !0
    }), $(document).on("mouseleave", ".elem-product__cart", function(e) {
      $(e.relatedTarget).parents("#basket").length || (overAddToBasket = !1)
    });

    function isArticul(testString) {
      return ("#" === testString[0] ? testString.slice(1) : testString).split("").every(function(char) {
        return "0123456789".includes(char)
      })
    }
    var closePopupBtn, suggestElem = $element.children("#autocomplete")[0],
      searchTimer = null;

    function preventDefaultWrapper(e) {
      e.preventDefault()
    }
    new Autocomplete(suggestElem, {
      search: function(input) {
        return new Promise(function(resolve, reject) {
          searchTimer && clearTimeout(searchTimer), searchTimer = setTimeout(function() {
            if (input.length < 1) return [];
            URL = isArticul(input) ? "/ajax/search_titles_articul.php?articul=" + ("#" === input[0] ? input.slice(1) : input) : $attrs.suggestUrl + "?term=" + encodeURI(input), resolve($http.post(URL).then(function(response) {
              return Array.isArray(response.data) ? response.data : [response.data]
            }))
          }, 600)
        }).then(function(r) {
          return r
        })
      },
      renderResult: function(result, props) {
        result = result || [];
        var suggestItem, term = $(".autocomplete-input").val(),
          label = function(str, term) {
            term = function(word) {
              return word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = (word = word.replace(/q/g, "й")).replace(/w/g, "ц")).replace(/e/g, "у")).replace(/r/g, "к")).replace(/t/g, "е")).replace(/y/g, "н")).replace(/u/g, "г")).replace(/i/g, "ш")).replace(/o/g, "щ")).replace(/з/g, "з")).replace(/\[/g, "х")).replace(/\]/g, "ъ")).replace(/a/g, "ф")).replace(/s/g, "ы")).replace(/d/g, "в")).replace(/f/g, "а")).replace(/g/g, "п")).replace(/h/g, "р")).replace(/j/g, "о")).replace(/k/g, "л")).replace(/l/g, "д")).replace(/\;/g, "ж")).replace(/\'/g, "э")).replace(/z/g, "я")).replace(/x/g, "ч")).replace(/c/g, "с")).replace(/v/g, "м")).replace(/b/g, "и")).replace(/n/g, "т")).replace(/m/g, "ь")).replace(/\./g, "ю")
            }(term);
            var highlight_regex = new RegExp("(" + term + ")", "gi");
            return str.replace(highlight_regex, '<span class="highlight">$1</span>')
          }(result.label, term);
        if (result.prices) {
          if ("category" !== result.type && isArticul(term)) {
            var priceOld = result.prices.old ? '<div class="price-old"><span class="line-through">' + result.prices.old + '<span class="rub">p</span></span></div>' : "",
              buyInfo = "N" !== result.can_buy && 0 !== Number(result.prices.new) ? '<div class="c-box-product__counter"><div class="price">' + priceOld + '<div class="price-current"><span>' + result.prices.new + '<span class="rub">P</span></span></div></div></div><div class="c-box-product__cart"><div class="elem-product__cart"><svg aria-hidden="true" class="icon icon-basket"><use xlink:href="' + window.stp + 'images/required/sprite.svg#basket"></use></svg></div></div>' : "";
            suggestItem = "<li" + props + '><a><article class="suggestion c-box-product"><div class="c-box-product__image"><img src="' + result.image + '"></div><div class="c-box-product__info"><span class="name">' + result.label + '</span><div class="articul">' + result.articul + '</div><div class="total">' + result.status_text + "</div></div>" + buyInfo + "</article></a></li>"
          } else suggestItem = "<li" + props + "><a><article class='suggestion c-box-product c-box-product--simple'>" + label + "</article></a></li>";
          return suggestItem
        }
      },
      getResultValue: function(result) {
        var term = $(".autocomplete-input").val();
        return isArticul(term) ? result.articul : result.label
      },
      onSubmit: function(result) {
        overAddToBasket ? (productData = {
          id: result.id,
          xml_id: result.xml_id,
          getout: "basket"
        }, $scope.addItem(productData), overAddToBasket = !1) : result && window.open(encodeURI(result.url), "_self")
      }
    }), $scope.checkRequest = function(e) {
      var requestJson = toJSON($element.serialize()),
        term = $(".autocomplete-input").val();
      "#" === term[0] && $(".autocomplete-input").val(term.slice(1)), "" == requestJson.search && e.preventDefault()
    };
    var popupConfig = {
      removalDelay: 200,
      key: "pCart",
      items: {},
      type: "inline",
      auto: !($scope.addItem = function(frontData) {
        $http.post("/ajax/basket/add_offer.php", frontData).then(function(response) {
          var data;
          data = response.data, popupConfig.inline.markup = data, $.magnificPopup.open(popupConfig), $timeout(function() {
            try {
              myLazyLoad.update()
            } catch (e) {}
          }, 1), pagePreloader($scope.loading = !1)
        }, function() {
          pagePreloader($scope.loading = !1)
        })
      }),
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
      closeOnBgClick: !1,
      callbacks: {
        beforeOpen: function() {
          closePopupBtn = document.getElementsByClassName("mfp-close")[0];

          function preventScroll() {
            $("html").css({
              overflow: "hidden"
            }), $("body").hasClass("safari") ? document.body.addEventListener("touchmove", preventDefaultWrapper, {
              passive: !1
            }) : $("body").addClass("no-scroll")
          }
          closePopupBtn ? (closePopupBtn.click(), $timeout(function() {
            preventScroll()
          }, 200)) : preventScroll()
        },
        open: function() {
          var _this = this;
          $compile(this.content)($scope), $(this.contentContainer).children(".box-popup").append('<button title="Закрыть (Esc)" type="button" class="mfp-close"></button>'), $timeout(function() {
            _this.contentContainer[0].className += " popupIn"
          }, 200)
        },
        beforeClose: function() {
          this.contentContainer[0].className += " popupOut", $("html")[0].removeAttribute("style"), $("body").hasClass("safari") ? document.body.removeEventListener("touchmove", preventDefaultWrapper, {
            passive: !1
          }) : $("body").removeClass("no-scroll")
        },
        afterClose: function() {
          delete $.magnificPopup.instance.popupsCache.pCart
        }
      },
      inline: {
        markup: ""
      }
    }
  }]), angular.module("ctrl.changeCity", []).controller("changeCity", ["$element", "$scope", "$http", "$attrs", "$rootScope", "mapSrv", function($element, $scope, $http, $attrs, $rootScope, mapSrv) {
    var URL_selected = $element.data("send-url"),
      inOrder = $attrs.inorder;
    $scope.setCity = function($event) {
      var _this = $event.currentTarget;
      $(_this).parent().addClass("has-spinner"), $(".elem-radio-city input[type='radio']").prop("disabled", !0);
      var frontData = {};
      frontData[$(_this).attr("name")] = $(_this).val(), URL_selected && !inOrder && $http.post(URL_selected, frontData).then(function(response) {
        if (response.data.LOCATION_ID && setTimeout(function() {
            location.href = location.pathname + location.search
          }, 1e3), response.data.CALLBACK) {
          if ("/basket/" === window.location.pathname || "/basket/order/" === window.location.pathname) return;
          return new Function(response.data.CALLBACK)()
        }
      }, function() {
        $(_this).parent().removeClass("has-spinner"), $(".elem-radio-city input[type='radio']").prop("disabled", !1)
      }), URL_selected && inOrder && (mapSrv.pointChecked && (mapSrv.pointID = null, mapSrv.pointInfo = "", mapSrv.pointChecked = !1), $http.post(URL_selected, frontData).then(function(response) {
        if ($(_this).parent().removeClass("has-spinner"), $(".elem-radio-city input[type='radio']").prop("disabled", !1), $rootScope.$broadcast("orderMakePost", {
            LOCATION_NAME: response.data.LOCATION_NAME
          }), response.data.CALLBACK) {
          if ("/basket/" === window.location.pathname || "/basket/order/" === window.location.pathname) return;
          return new Function(response.data.CALLBACK)()
        }
      }, function() {
        $(_this).parent().removeClass("has-spinner"), $(".elem-radio-city input[type='radio']").prop("disabled", !1)
      }))
    }
  }]), angular.module("ctrl.favCtrl", []).controller("favCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$element", "$compile", "favSrv", "$location", function($rootScope, $scope, $http, $timeout, $element, $compile, favSrv, $location) {
    if ($scope.favModel = favSrv, $("#deleted").length) {
      var deleted = $("#deleted").data("deleted");
      window.inFavorite.ids = window.inFavorite.ids.filter(function(id) {
        return !deleted.includes(id)
      })
    }
    var frontData = {};
    $scope.initFav = function(url) {
      0 == window.is_authorized ? (null === localStorage.getItem("favObj") || 0 == JSON.parse(localStorage.getItem("favObj")).length ? localStorage.setItem("favObj", JSON.stringify(favSrv.ids)) : favSrv.ids = JSON.parse(localStorage.getItem("favObj")), favSrv._AJAX = "Y", "/favorites/" === location.pathname && $http.post(url, favSrv).then(function(response) {
        response.data.products && ($(".box-snippets").empty(), $(".box-snippets").append($compile(response.data.products)($scope))), response.data.pager && $(".box-snippets").parent().append($compile(response.data.pager)($scope))
      }, function() {})) : favSrv.ids = window.inFavorite.ids
    }, $scope.goToFav = function(event, linkUrl) {
      0 < $("#My_favorites").length && "/personal/#My_favorites" === linkUrl && !$("#My_favorites").hasClass("active") && (event.preventDefault(), event.stopPropagation(), $("#My_favorites").click())
    }, $scope.checkFav = function(itemID) {
      contains.call($scope.favModel.ids, itemID) ? ($scope.added = !0, $element.addClass("active")) : ($scope.added = !1, $element.removeClass("active"))
    }, $scope.toggleFav = function(url, itemID, $event, redirect) {
      if ($event) var clickedElement = angular.element($event.currentTarget);
      frontData.id = itemID, contains.call($scope.favModel.ids, itemID) ? frontData.action = "remove" : frontData.action = "add", $scope.loading = !0, 0 == window.is_authorized && (null === localStorage.getItem("favObj") || 0 == JSON.parse(localStorage.getItem("favObj")).length ? localStorage.setItem("favObj", JSON.stringify(favSrv.ids)) : favSrv.ids = JSON.parse(localStorage.getItem("favObj")), frontData.favorites = favSrv.ids), $http.post(url, frontData).then(function(response) {
        if ("double" !== response.data.ERROR) {
          if (favSrv.auth = response.data.auth, 0 == window.is_authorized ? ("add" == frontData.action ? favSrv.ids.push(itemID) : "remove" == frontData.action && (favSrv.ids = removeFromArray(favSrv.ids, itemID)), localStorage.setItem("favObj", JSON.stringify(favSrv.ids))) : favSrv.ids = response.data.ids, $scope.checkFav(itemID), null != clickedElement && ("remove" === frontData.action ? clickedElement.closest(".elem-product").addClass("has-null") : "add" === frontData.action && clickedElement.closest(".elem-product").removeClass("has-null")), $scope.loading = !1, response.data.CALLBACK) return new Function(response.data.CALLBACK)()
        } else {
          if ($scope.loading = !1, !$(".fav-tooltip").length) {
            $element.append("<span class='fav-tooltip'>Артикул уже добавлен в избранное</span>")
          }
          $(".fav-tooltip").stop(!0).fadeIn(0).delay(3e3).fadeOut(500)
        }
      }, function() {
        $scope.loading = !1
      })
    }, $scope.$on("favoriteBroadcast:root", function(event, itemID) {
      $scope.checkFav(itemID)
    })
  }]), angular.module("ctrl.cartCtrl", []).controller("cartCtrl", ["$scope", "$http", "$element", "$timeout", "$compile", "cartSrv", function($scope, $http, $element, $timeout, $compile, cartSrv) {
    $scope.cartData = cartSrv;
    var _creditMonth = 12;
    $scope.scrollDistance = 0, window.creditMonth && 0 < parseInt(window.creditMonth) && (_creditMonth = parseInt(window.creditMonth));
    var closePopupBtn, month_count = void 0 !== _creditMonth ? _creditMonth : 10;

    function disableScroll() {
      $scope.scrollDistance = $(window).scrollTop(), $("body").css({
        position: "fixed",
        left: 0,
        top: -1 * $scope.scrollDistance,
        bottom: 0,
        right: 0
      })
    }

    function enableScroll() {
      $("body").css({
        position: "",
        left: "",
        top: "",
        bottom: "",
        right: ""
      }), $(window).scrollTop($scope.scrollDistance)
    }
    $scope.hide = !0, $scope.initCart = function() {
      $scope.cartData.model.totalBasketQuantity = $scope.totalBasketQuantity, $scope.cartData.model.totalBasketPrice = $scope.totalBasketPrice
    }, $scope.initItem = function() {
      void 0 === $.stepper ? $timeout(function() {
        $scope.initItem()
      }, 500) : $timeout(function() {
        $scope.hide = !1
      }, 1)
    }, $scope.addItem = function(url, frontData, $event) {
      void 0 === $.stepper || $($element).hasClass("clicked") || ($scope.loading = !0, void 0 !== pagePreloader && pagePreloader(!0), $($element).toggleClass("clicked"), $http.post(url, frontData).then(function(response) {
        $($element).toggleClass("clicked"), $.magnificPopup.instance.isOpen ? ($.magnificPopup.close(), $timeout(function() {
          generatePopup(response.data)
        }, 200)) : generatePopup(response.data), pagePreloader($scope.loading = !1)
      }, function() {
        $($element).toggleClass("clicked"), pagePreloader($scope.loading = !1), $("body").hasClass("safari") ? enableScroll() : $("body").removeClass("no-scroll")
      }))
    }, $scope.changeByBlur = function(url, frontData) {}, $scope.amountChange = function(url, frontData) {
      $scope.loading = !0;
      var id = frontData.id + ""; + frontData.quantity > +frontData.max ? frontData.quantity = +frontData.max : +frontData.quantity < 1 && (frontData.quantity = 1), $http.post(url, frontData).then(function(response) {
        $scope.cartData.model.totalBasketPrice = response.data.totalBasketPrice, $scope.totalPrice[id] = response.data.totalPrice, $scope.perMonth(response.data.totalBasketPrice), $scope.freeDelivery(), $scope.loading = !1
      }, function() {
        $scope.loading = !1
      })
    }, $scope.removeItem = function(url, frontData, $event) {
      $scope.loading = !0;
      var item = angular.element($event.currentTarget).closest("tr"),
        itemTable = $(item).closest("tbody");
      $http.post(url, frontData).then(function(response) {
        $scope.cartData.model.totalBasketPrice = response.data.totalBasketPrice, $scope.cartData.model.totalBasketQuantity = response.data.totalBasketQuantity, $scope.perMonth($scope.cartData.model.totalBasketPrice), item.remove(), 0 !== itemTable.children("tr").length ? $scope.freeDelivery() : $scope.closeModal(), $scope.loading = !1
      }, function() {
        $scope.loading = !1
      })
    }, $scope.closeModal = function() {
      $.magnificPopup.close()
    }, $scope.perMonth = function(totalPrice) {
      $scope.monthPay = Math.ceil(totalPrice / month_count)
    };
    var popupConfig = {
      removalDelay: 200,
      key: "pCart",
      items: {},
      type: "inline",
      auto: !($scope.freeDelivery = function() {
        $http.get("/ajax/get_delivery_price.php?TYPE=BASKET&FREE=1").then(function(response) {
          response.data.freeDeliveryMinPrice ? $scope.cartData.model.freeDeliveryMinPrice = response.data.freeDeliveryMinPrice : window.freeDeliveryMinPrice && ($scope.cartData.model.freeDeliveryMinPrice = window.freeDeliveryMinPrice), response.data.arSpecial && "Y" == response.data.arSpecial.FREE_DELIVERY_COLLECT ? $scope.cartData.model.showFreeDelivery = !0 : $scope.cartData.model.showFreeDelivery = !1
        })
      }),
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
      closeOnBgClick: !1,
      callbacks: {
        beforeOpen: function() {
          (closePopupBtn = document.getElementsByClassName("mfp-close")[0]) ? (closePopupBtn.click(), $timeout(function() {
            $("body").hasClass("safari") ? disableScroll() : $("body").addClass("no-scroll")
          }, 200)) : $("body").hasClass("safari") ? disableScroll() : $("body").addClass("no-scroll")
        },
        open: function() {
          var _this = this;
          $compile(this.content)($scope), $(this.contentContainer).children(".box-popup").append('<button title="Закрыть (Esc)" type="button" class="mfp-close"></button>'), $scope.freeDelivery(), $timeout(function() {
            _this.contentContainer[0].className += " popupIn"
          }, 200)
        },
        beforeClose: function() {
          this.contentContainer[0].className += " popupOut", $("html")[0].removeAttribute("style"), $("body").hasClass("safari") ? enableScroll() : $("body").removeClass("no-scroll")
        },
        afterClose: function() {
          delete $.magnificPopup.instance.popupsCache.pCart
        }
      },
      inline: {
        markup: ""
      }
    };

    function generatePopup(data) {
      popupConfig.inline.markup = data, $.magnificPopup.open(popupConfig), $timeout(function() {
        try {
          myLazyLoad.update()
        } catch (e) {}
      }, 1)
    }
    $scope.oneClickElement = function(id) {
      $scope.cartData.oneClickElement = id
    }, $("#buyOneClick_success .elem-btn").click(function(event) {
      event.preventDefault(), document.getElementsByClassName("mfp-close")[0].click()
    })
  }]), angular.module("ctrl.smsCtrl", []).controller("smsCtrl", ["$element", "$scope", "$http", "$attrs", "$timeout", "$compile", "formSrv", "favSrv", function($element, $scope, $http, $attrs, $timeout, $compile, formSrv, favSrv) {
    var url = $attrs.action;
    $scope.smsWaiting = !1, $scope.hasMessage = !1, $scope.cardTrue = !1, $scope.cardFalse = !1, $scope.timeElapsed = !1, $scope.resend = !1;

    function btnStateDisabled(val) {
      for (var btns = document.querySelectorAll('form[data-recaptcha-elem] button[type="submit"]'), i = 0; btns.length > i; i++) val ? btns[i].classList.add("disabled") : btns[i].classList.remove("disabled")
    }
    var captchaOpt;
    if ($attrs.recaptchaElem && "" != window.captchaKey) {
      $element.addClass("has-loader"), btnStateDisabled(!0), $element.append('<div id="' + $attrs.recaptchaElem + '" />');
      var attempt = 1;
      setTimeout(function run() {
        30 != attempt && ("object" == typeof grecaptcha && "function" == typeof grecaptcha.render && document.getElementById($attrs.recaptchaElem) ? (captchaOpt = grecaptcha.render($attrs.recaptchaElem, {
          sitekey: window.captchaKey,
          callback: captchaSubmit,
          size: "invisible"
        }), $element.removeClass("has-loader"), $(".box-popup *").css("pointer-events", "").prop("readonly", !1), $(".box-popup input").prop("disabled", ""), btnStateDisabled(!1), attempt = 30) : (attempt++, setTimeout(run, 1e3)))
      }, 1e3), $timeout(function() {
        var isCaptchaVisible = !1;
        $('iframe[title*="recaptcha"]').each(function(i, el) {
          "visible" === $(el).parent().parent().css("visibility") && (isCaptchaVisible = !0)
        }), isCaptchaVisible || ($element.removeClass("has-loader"), $(".box-popup *").css("pointer-events", "").prop("readonly", !1), $(".box-popup input").prop("disabled", ""), btnStateDisabled(!1))
      }, 3e4)
    }
    var tempFavIds, timer, captchaSubmit = function() {
      cardRequest()
    };
    $timeout(function() {
      tempFavIds = favSrv.ids, $scope.fav_ids = tempFavIds.join()
    }, 10), $element.on("keypress", '.phone-confirm-input, input[name="code"]', function(e) {
      13 === (e.keyCode || e.which) && $(this).parent().find(".elem-btn").click()
    }), $element.on("keyup keypress", function(e) {
      if (13 === (e.keyCode || e.which)) return e.preventDefault(), !1
    });

    function checkIfCaptcha() {
      var isCaptchaVisible = !1,
        count = 0,
        timer = setInterval(function() {
          $('iframe[title*="recaptcha"]').each(function(i, el) {
            "visible" === $(el).parent().parent().css("visibility") && (isCaptchaVisible = !0)
          }), isCaptchaVisible ? ($element.removeClass("has-loader"), $(document).on("click", function(e) {
            $(e.target).next().children('iframe[title*="recaptcha"]') && ($(".box-popup *").css("pointer-events", "").prop("readonly", !1), $(".box-popup input").prop("disabled", ""), btnStateDisabled(!1), $('iframe[title*="recaptcha"]').each(function(i, el) {
              $(el).parent().parent().css("visibility", "hidden")
            }))
          }), clearTimeout(timer), function() {
            var timer = setInterval(function() {
              0;
              var isCaptchaVisible = !1;
              $('iframe[title*="recaptcha"]').each(function(i, el) {
                "visible" === $(el).parent().parent().css("visibility") && (isCaptchaVisible = !0)
              }), isCaptchaVisible || ($element.removeClass("has-loader"), $(".box-popup *").css("pointer-events", "").prop("readonly", !1), $(".box-popup input").prop("disabled", ""), btnStateDisabled(!1), clearInterval(timer))
            }, 200)
          }()) : count++, 50 < count && clearTimeout(timer)
        }, 100)
    }
    var cardNumber, codeNumber, lastCodeNumber;

    function cardRequest() {
      $(".box-popup input").prop("disabled", ""), $(".box-popup *").css("pointer-events", "").prop("readonly", !1), $timeout.cancel(timer), $http.post(url, $element.serialize()).then(function(response) {
        if ("OK" != response.data.STATUS && "ALREADY_SENT" != response.data.STATUS || ($scope.smsWaiting = !0, $scope.cardTrue = !0, $scope.cardFalse = !1), response.data.MESSAGE && ($scope.infoText = response.data.MESSAGE, $scope.hasMessage = !0), "ERROR" == response.data.STATUS && 2 != response.data.ERROR_TYPE && ($scope.cardTrue = !1, $scope.cardFalse = !0, $scope.smsWaiting = !1, $scope.timeElapsed = !1), "ERROR" == response.data.STATUS && 2 == response.data.ERROR_TYPE && ($scope.cardTrue = !1, $scope.cardFalse = !1, $scope.smsWaiting = !0, $scope.timeElapsed = !1), 0 < response.data.REMAIN_TIME && ($scope.timeElapsed = !1, $timeout(function() {
            startTimer(response.data.REMAIN_TIME, $(".mess-sms-timer")), sendAgainTimer(response.data.REMAIN_TIME + 2)
          }, 0)), response.data.REDIRECT_URL && response.data.STATUS && "AUTH_OK" == response.data.STATUS && (location.href = response.data.REDIRECT_URL), $element.removeClass("has-loader"), btnStateDisabled(!1), "AUTH_OK" == response.data.STATUS && ($(".box-search").empty(), $(".mobile-cabinet-cart").empty(), angular.element(".box-search").append($compile(response.data.HEADER_DESKTOP)($scope)), angular.element(".mobile-cabinet-cart").append($compile(response.data.HEADER_MOBILE)($scope)), favSrv.ids = response.data.FAV_IDS, window.is_authorized = !0, localStorage.removeItem("favObj"), $(".opt-favorite").removeClass("active"), $timeout(function() {
            for (var i = 0; i < favSrv.ids.length; i++) $('[data-ng-init="checkFav(' + favSrv.ids[i] + ')"]').addClass("active")
          }, 200), $.magnificPopup.close()), response.data.CALLBACK) return new Function(response.data.CALLBACK)()
      }, function() {}), $scope.resend = !1
    }

    function sendAgainTimer(time) {
      timer = $timeout(function() {
        $scope.timeElapsed = !0, $scope.infoText = "НЕ ПОЛУЧИЛИ КОД? НАЖМИТЕ ДЛЯ ПОВТОРНОЙ ОТПРАВКИ КОДА"
      }, 1e3 * time)
    }
    $scope.checkCard = function($event) {
      $event.preventDefault(), "_" != (cardNumber = $($event.currentTarget).hasClass("elem-btn") ? $('[name="CARD_NUMBER"]').val() : $($event.currentTarget).val()).substr(cardNumber.length - 1) && cardNumber.length ? ($($event.currentTarget).closest(".elem-sms-auth").children(".form-field").removeClass("has-error"), $scope.resend = !0, $element.addClass("has-loader"), $timeout(function() {
        btnStateDisabled(!0), $(".box-popup *").css("pointer-events", "none").prop("readonly", !0), $(".box-popup input").prop("disabled", "disabled")
      }, 200), $timeout(function() {
        $attrs.recaptchaElem && "" != window.captchaKey && "object" == typeof grecaptcha && "function" == typeof grecaptcha.execute ? (grecaptcha.reset(captchaOpt), grecaptcha.execute(captchaOpt).then(function() {
          listenRecaptchaClose($element), checkIfCaptcha()
        })) : cardRequest()
      }, 0), cardNumber) : $($event.currentTarget).hasClass("elem-btn") && $($event.currentTarget).closest(".elem-sms-auth").children(".form-field").addClass("has-error")
    }, $scope.checkSms = function($event) {
      (codeNumber = $($event.currentTarget).hasClass("elem-btn") ? $('[name="SMS_CODE"]').val() : $($event.currentTarget).val()) && "_" != codeNumber.substr(codeNumber.length - 1) && codeNumber != lastCodeNumber && ($element.addClass("has-loader"), btnStateDisabled(!0), $(".box-popup *").css("pointer-events", "none").prop("readonly", !0), $(".box-popup input").prop("disabled", "disabled"), $attrs.recaptchaElem && "" != window.captchaKey && "object" == typeof grecaptcha && "function" == typeof grecaptcha.execute ? (grecaptcha.reset(captchaOpt), grecaptcha.execute(captchaOpt).then(function() {
        listenRecaptchaClose($element), checkIfCaptcha()
      })) : cardRequest(), lastCodeNumber = codeNumber)
    }, $scope.sendAgain = function($event) {
      $($event.currentTarget).hasClass("pseudolink") && ($scope.resend = !0, $timeout(function() {
        cardRequest()
      }, 0))
    }, $scope.type = {
      yes: !1,
      no: !1
    }, $scope.isBind = function(flag) {
      $element.addClass("has-loader"), btnStateDisabled(!0), flag ? ($scope.type.yes = !0, $scope.type.no = !1) : ($scope.type.yes = !1, $scope.type.no = !0), $timeout(function() {
        $attrs.recaptchaElem && "" != window.captchaKey && "object" == typeof grecaptcha && "function" == typeof grecaptcha.execute ? (grecaptcha.reset(captchaOpt), grecaptcha.execute(captchaOpt).then(function() {
          listenRecaptchaClose($element)
        })) : cardRequest()
      }, 0)
    }, formSrv.phoneConfirmed = !1;
    var frontData, confirmedNumber = "";
    $scope.blockSmsBtn = !1, $scope.phoneError = !1;
    var popupConfig = {
      removalDelay: 200,
      key: "pAnswer",
      items: {},
      type: "inline",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
      closeOnBgClick: !($scope.confirmNumber = function(url, data) {
        $(".box-popup input").prop("disabled", ""), $scope.phoneError = !1, frontData = $(":input", $element).serialize() + "&" + toSerialize(data), $timeout.cancel(timer), "" != (confirmedNumber = $element.find(".phone-confirm-input")).val() && confirmedNumber.val() != confirmedNumber.attr("data-placeholder") || confirmedNumber.parent().addClass("has-error"), $http.post(url, frontData).then(function(response) {
          "send" == response.data.status && ($scope.timeElapsed = !1, $scope.infoText = response.data.message, $timeout(function() {
            startTimer(response.data.REMAIN_TIME, ".send-counter"), sendAgainTimer(response.data.REMAIN_TIME + 2)
          }, 0)), "wrongCode" == response.data.status && ($scope.timeElapsed = !1, $scope.infoText = response.data.message, response.data.REMAIN_TIME && startTimer(response.data.REMAIN_TIME, ".send-counter")), "already_send" == response.data.status && ($scope.timeElapsed = !1, $scope.infoText = response.data.message, $timeout(function() {
            startTimer(response.data.REMAIN_TIME, ".send-counter"), sendAgainTimer(response.data.REMAIN_TIME + 2), document.querySelector('input[name="code"]') && (angular.element(document.querySelector('input[name="code"]')).focus(), angular.element(document.querySelector('input[name="code"]')).get(0).setSelectionRange(0, 0))
          }, 0)), "maxAttemptsExceed" == response.data.status && ($scope.timeElapsed = !1, $scope.blockSmsBtn = !0, $scope.infoText = response.data.message, timer = $timeout(function() {
            $scope.timeElapsed = !0, $scope.blockSmsBtn = !1
          }, 3e3)), "success" == response.data.status && ($scope.timeElapsed = !0, $scope.phoneConfirmed = !0, $scope.smsConfirmed = !0, formSrv.phoneConfirmed = !0, confirmedNumber = $element.find(".phone-confirm-input").val()), "error" === response.data.status && ($scope.phoneError = !0, response.data.MESSAGE && !response.data.POPUP ? response.data.MESSAGE.TITLE && response.data.MESSAGE.TEXT ? $(".form-field__error-phone", $element).html('<br><div class="form-field__error-title">' + response.data.MESSAGE.TITLE + '</div><p class="form-field__error-text">' + response.data.MESSAGE.TEXT + "</p>") : response.data.MESSAGE.TITLE ? $(".form-field__error-phone", $element).html('<div class="form-field__error-title">' + response.data.MESSAGE.TITLE + "</div>") : response.data.MESSAGE.TEXT && $(".form-field__error-phone", $element).html('<p class="form-field__error-text">' + response.data.MESSAGE.TEXT + "</p>") : response.data.MESSAGE && response.data.POPUP ? $.magnificPopup.instance.isOpen ? ($timeout(function() {
            $.magnificPopup.close()
          }, 100), $timeout(function() {
            generatePopup(response.data.MESSAGE)
          }, 500)) : generatePopup(response.data.MESSAGE) : $(".form-field__error-phone", $element).html("")), document.querySelector('[name="sessid"]') && $http({
            method: "POST",
            url: "/ajax/get_sessid.php"
          }).then(function(response) {
            $('[name="sessid"]').val(response.data)
          })
        }, function() {})
      }),
      callbacks: {
        beforeOpen: function() {
          $("body").addClass("no-scroll")
        },
        open: function() {
          var _this = this;
          window.backendGetForm = !1, $timeout(function() {
            _this.contentContainer[0].className += " popupIn"
          }, 200)
        },
        beforeClose: function() {
          this.contentContainer[0].className += " popupOut", $("body").removeClass("no-scroll")
        },
        afterClose: function() {
          delete $.magnificPopup.instance.popupsCache.pAnswer
        }
      },
      inline: {
        markup: ""
      }
    };

    function generatePopup(data) {
      data.TITLE && "" != data.TITLE ? popupConfig.inline.markup = '<div class="box-popup popup-password"><button title="Закрыть (Esc)" type="button" class="mfp-close"></button><div class="box-popup__name">' + data.TITLE + "</div><br><div>" + data.TEXT + "</div></div>" : popupConfig.inline.markup = '<div class="box-popup popup-password"><button title="Закрыть (Esc)" type="button" class="mfp-close"></button><div>' + data.TEXT + "</div></div>", $.magnificPopup.open(popupConfig)
    }
    var phoneNumber = $element.find(".phone-confirm-input").val();
    $scope.phoneFilled = phoneNumber && phoneNumber.indexOf("_") < 0, $scope.reconfirm = function($event) {
      13 !== ($event.keyCode || $event.which) || $scope.phoneConfirmed || $timeout(function() {
        $($event.currentTarget).parent().find(".elem-btn").click()
      }, 0), "_" != (phoneNumber = $($event.currentTarget).val()).substr(phoneNumber.length - 1) && (confirmedNumber != phoneNumber ? ($scope.phoneConfirmed = !1, formSrv.phoneConfirmed = !1) : "" != phoneNumber && confirmedNumber == phoneNumber && ($scope.phoneConfirmed = !0, formSrv.phoneConfirmed = !0)), $scope.phoneFilled = phoneNumber && phoneNumber.indexOf("_") < 0
    }
  }]), angular.module("ctrl.dzCtrl", []).controller("dzCtrl", ["$element", "$scope", "$timeout", "$attrs", function($element, $scope, $timeout, $attrs) {
    var jsonResponse, url = $attrs.url,
      _maxFiles = $attrs.maxFiles ? $attrs.maxFiles : 1,
      _maxSize = $attrs.maxSize ? $attrs.maxSize : 1024,
      fileName = $attrs.fileName ? $attrs.fileName : "file",
      iconFile = $attrs.iconPath ? window.stp + $attrs.iconPath : window.stp + "images/required/files.svg",
      subText = $attrs.subText ? $attrs.subText : "",
      mainText = $attrs.mainText ? '<span class="file-message"><span class="with-sub-text" data-subtext="' + subText + '">' + $attrs.mainText + "</span></span>" : '<span class="file-message"><span class="hidden-xs with-sub-text" data-subtext="' + subText + '">Перетащите сюда или <span class="color-blue">загрузите</span> файлы</span><span class="visible-xs color-blue">Загрузите файл</span></span>',
      _acceptedFiles = null;
    if ($attrs.accept && (_acceptedFiles = $attrs.accept), 1 < _maxFiles)
      for (var i = 0; i < _maxFiles; i++) $("<input />").attr("type", "hidden").attr("name", fileName + "[" + i + "]").appendTo($element);
    else $element.children("[name=" + fileName + "]").length || $("<input />").attr("type", "hidden").attr("name", fileName).appendTo($element);
    $element.attr("required") && $element.children("input[type='hidden']").first().attr("required", ""), $element.children(".elem-dropzone__error").length || $('<div class="elem-dropzone__error" />').appendTo($element), $scope.dzOptions = {
      url: url,
      paramName: "file",
      maxFilesize: _maxSize,
      maxFiles: _maxFiles,
      acceptedFiles: _acceptedFiles,
      addRemoveLinks: !0,
      dictRemoveFile: "Удалить файл",
      dictDefaultMessage: '<img src="' + iconFile + '" class="file-icon">' + mainText,
      dictMaxFilesExceeded: "Возможно загрузить файлов: " + _maxFiles + " шт.",
      dictFileTooBig: "Этот файл больше " + _maxSize + " Мб",
      dictInvalidFileType: "Неверный формат файла"
    }, $scope.dzCallbacks = {
      uploadprogress: function(file, progress) {
        $(".dz-preview").not(".dz-complete").addClass("has-loader"), 100 === progress && $(".dz-preview").removeClass("has-loader")
      },
      totaluploadprogress: function(progress) {
        $("button[type='submit']").attr("disabled", "disabled"), 100 === progress && $timeout(function() {
          $("button[type='submit']").removeAttr("disabled")
        }, 1e3)
      },
      addedfile: function(file) {
        if ($element.hasClass("search") && $("body").addClass("has-loader"), $element.removeClass("has-error"), $element.children(".elem-dropzone__error").text(""), $scope.newFile = file, $element.children(".dz-default").length && $element.children(".dz-default").remove(), angular.isDefined($attrs.accept) && $attrs.accept.indexOf(file.type) < 0 || !file.type) {
          return $element.children(".elem-dropzone__error").text("Неверный формат файла."), $scope.removeNewFile(), $("body").removeClass("has-loader"), !1
        }
        if (file.size / 1048576 > parseFloat(_maxSize)) {
          var sizeError = "Размер файла превышает " + _maxSize + " MB";
          return $element.children(".elem-dropzone__error").text(sizeError), $scope.removeNewFile(), $("body").removeClass("has-loader"), !1
        }
      },
      maxfilesexceeded: function() {
        $element.children(".elem-dropzone__error").text(""), $element.children(".elem-dropzone__error").text("Возможно загрузить файлов: " + _maxFiles + " шт."), $scope.removeNewFile()
      },
      success: function(file, xhr) {
        if ((jsonResponse = JSON.parse(xhr)).error && "y" == jsonResponse.error.max_file_size && $timeout(function() {
            $(file.previewElement).find(".dz-error-message").text("Превышен размер файла"), $(file.previewElement).removeClass("dz-success").addClass("dz-error")
          }, 100), jsonResponse.file_id)
          if (file.file_id = jsonResponse.file_id, 1 < _maxFiles) {
            for (var i = 0; i < _maxFiles; i++)
              if ("" == $element.children('[name="' + fileName + "[" + i + ']"]').val()) {
                $element.children('[name="' + fileName + "[" + i + ']"]').val(jsonResponse.file_id);
                break
              }
          } else $element.children('[name="' + fileName + '"]').val(jsonResponse.file_id);
        else jsonResponse.REDIRECT_URL && ($("body").addClass("has-loader"), location.href = jsonResponse.REDIRECT_URL)
      },
      removedfile: function(file) {
        if (file.file_id) {
          if (1 < _maxFiles) {
            for (var i = 0; i < _maxFiles; i++)
              if ($element.children('[name="' + fileName + "[" + i + ']"]').val() == file.file_id) {
                $element.children('[name="' + fileName + "[" + i + ']"]').val("");
                break
              }
          } else $element.children('[name="' + fileName + '"]').val("");
          $element.children(".elem-dropzone__error").text("")
        }
      }
    }, $scope.dzMethods = {}, $scope.removeNewFile = function() {
      $scope.dzMethods.removeFile($scope.newFile)
    }, $(".dz-remove", $element).click(function() {
      $(this).closest(".dz-default").remove(), $element.children('[name="' + fileName + '"]').val("")
    }), $scope.$on("dropFiles", function(event, data) {
      if ($element.children(".dropzone").children(".dz-preview").remove(), 1 < _maxFiles)
        for (var i = 0; i < _maxFiles; i++) $element.children('[name="' + fileName + "[" + i + ']"]').val("");
      else $element.children('[name="' + fileName + '"]').val("");
      Dropzone.forElement(".dropzone").files = [], $element.children(".elem-dropzone__error").text("")
    })
  }]), angular.module("srv.favSrv", []).factory("favSrv", [function() {
    return {
      ids: []
    }
  }]), angular.module("srv.cartSrv", []).factory("cartSrv", [function() {
    return {
      model: {
        items: {},
        totalBasketPrice: 0,
        totalBasketQuantity: 0,
        showFreeDelivery: !1,
        freeDeliveryMinPrice: 1990
      }
    }
  }]), angular.module("srv.formSrv", []).factory("formSrv", [function() {
    return {
      data: {},
      isEdit: !1,
      cardNum: "",
      phoneConfirmed: !1
    }
  }]), angular.module("srv.mapSrv", []).factory("mapSrv", ["$window", function($window) {
    return {
      mapObj: [],
      pointChecked: !1,
      pointInfo: "",
      pointID: null,
      mapInPopup: !1,
      saveToLocalStorage: function(key, val) {
        $window.localStorage.setItem(key, JSON.stringify(val))
      },
      getFromLocalStorage: function(key) {
        return JSON.parse($window.localStorage.getItem(key))
      }
    }
  }]), angular.module("srv.scrollAndResizeListener", []).service("scrollAndResizeListener", function($window, $document, $timeout) {
    var scrollTimeoutId, resizeTimeoutId, id = 0,
      listeners = {};

    function invokeListeners() {
      var clientHeight = $document[0].documentElement.clientHeight,
        clientWidth = $document[0].documentElement.clientWidth;
      for (var key in listeners) listeners.hasOwnProperty(key) && listeners[key](clientHeight, clientWidth)
    }
    return $window.addEventListener("scroll", function() {
      $timeout.cancel(scrollTimeoutId), scrollTimeoutId = $timeout(invokeListeners, 200)
    }), $window.addEventListener("resize", function() {
      $timeout.cancel(resizeTimeoutId), resizeTimeoutId = $timeout(invokeListeners, 200)
    }), {
      bindListener: function(listener) {
        var index = ++id;
        return listeners[id] = listener,
          function() {
            delete listeners[index]
          }
      }
    }
  }), angular.module("fltr.separatorFltr", []).filter("separatorFltr", [function() {
    return function(input) {
      if (void 0 !== input) return input.replace(/,/g, " ");
      console.warn("value of separatorFltr is undefined")
    }
  }]), angular.module("fltr.orderObjBy", []).filter("orderObjBy", [function() {
    return function(items, field, reverse) {
      var filtered = [];
      return angular.forEach(items, function(item) {
        filtered.push(item)
      }), filtered.sort(function(a, b) {
        var aSort = a.SORT,
          bSort = b.SORT;
        return aSort && aSort === bSort ? a[field] > b[field] ? 1 : -1 : aSort < bSort ? -1 : bSort < aSort ? 1 : 0
      }), reverse && filtered.reverse(), filtered
    }
  }]);
