(window.dmpJsonp=window.dmpJsonp||[]).push([["dialog"],{"s+wg":function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{isAttached:Object(pe.b)(e),highlighted:!1,icon:"#np_collection",id:"collections",label:F.a.__("neon:::Add to playlist"),selected:!1}}function u(){return Object(R.a)()}function b(){return{isAttached:Object(fe.h)(),highlighted:!1,icon:"#np_consent",id:"consent",label:F.a.__("consent:::Manage cookies"),selected:!1}}function d(){return function(){Object(_e.a)(Object(fe.d)())}}function p(e){return Object(je.c)({mode:e})}function h(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function f(e,t,n,a){return[{name:"Auto",label:"Auto"}].concat(h(t)).map(function(t){var o=n===t.name,r="Auto"!==t.name;return{highlighted:o&&r,icon:o?"#np_checkmark":null,id:t.name,isAttached:r||e,label:r||!a?t.label:t.label+" ("+a+")",selected:o,value:{adaptive:"Auto"===t.name,qualityName:t.name}}})}function _(e){return Object(R.I)(e)}function m(e){return[.5,.75,1,1.25,1.5,2].map(function(t){var n=e===t;return{highlighted:n&&1!==t,icon:n?"#np_checkmark":null,id:""+t,isAttached:!0,label:1!==t?t+"x":F.a.__("neon:::Normal"),selected:n,value:t}})}function O(e){return Object(R.X)(e)}function g(e,t){return e.map(function(e){var n=e.code===t;return{highlighted:n&&-1!==t,icon:n?"#np_checkmark":null,id:-1===e.code?"none":e.code,isAttached:!0,label:e.label,selected:n,value:e.code}})}function v(e){return Object(R.ab)(e)}function j(e){return e?Object(Pe.a)({from:"menu"}):Object(Pe.b)({from:"menu"})}function S(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function y(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function k(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function N(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function D(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function w(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function I(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:nt.b,t=arguments[1];switch(t.type){case tt.d:return Object.assign({},e,{request:"open",requestDetail:t.reason});case tt.c:return Object.assign({},e,{request:"",requestDetail:"",opened:!0,openedBy:e.requestDetail});case tt.a:return Object.assign({},e,{request:"close",requestDetail:t.reason});case tt.b:return Object.assign({},e,{request:"",requestDetail:"",opened:!1,closedBy:e.requestDetail});default:return e}}n.r(t);var A={};n.r(A),n.d(A,"menuItemId",function(){return he}),n.d(A,"getMenuItemList",function(){return s}),n.d(A,"actionForItem",function(){return u});var T={};n.r(T),n.d(T,"menuItemId",function(){return me}),n.d(T,"getMenuItemList",function(){return b}),n.d(T,"actionForItem",function(){return d});var M={};n.r(M),n.d(M,"menuItemId",function(){return Se}),n.d(M,"getMenuItemList",function(){return ye}),n.d(M,"actionForItem",function(){return p});var C={};n.r(C),n.d(C,"menuItemId",function(){return Ne}),n.d(C,"getMenuItemList",function(){return De}),n.d(C,"actionForItem",function(){return _});var q={};n.r(q),n.d(q,"menuItemId",function(){return Ie}),n.d(q,"getMenuItemList",function(){return Ae}),n.d(q,"actionForItem",function(){return O});var P={};n.r(P),n.d(P,"menuItemId",function(){return Me}),n.d(P,"getMenuItemList",function(){return qe}),n.d(P,"actionForItem",function(){return v});var x={};n.r(x),n.d(x,"menuItemId",function(){return Re}),n.d(x,"getMenuItemList",function(){return Ve}),n.d(x,"actionForItem",function(){return j});var E=n("ezi5"),R=n("vGkh"),V=n("VfPQ"),L=n("iErd"),B=n("+kBE"),F=n("iiVM"),H=n("6kjv"),X=n("5B1X"),K=n("V9fO"),Q=function e(t,n){return{onClick:function e(a){var o=Object(K.b)(n.url);t(o?Object(R.V)("Copied link"):Object(R.V)("Sorry, could not copy link")),t(Object(R.gb)(n.service)),t(Object(R.j)(a))}}},z=Object(X.connect)(null,Q)(function(e){var t=e.service,n=e.onClick;return Object(E.h)(B.a,{"aria-labelledby":"np_DialogShare-"+t,className:"np_DialogShare-link",onClick:n,target:"_blank"},Object(E.h)("div",{className:"np_force-flexbox"},Object(E.h)("div",{className:"np_DialogShare-icon"},Object(E.h)(H.a,{xlinkHref:"#np_"+t})),Object(E.h)("div",{id:"np_DialogShare-"+t,className:"np_DialogShare-label"},F.a.__("neon:::Copy link"))))}),J=z,Z=n("qF6C"),W=n("+Da9"),Y=n("E6zV"),G=function e(t,n){return{onClick:function e(a){a.preventDefault(),t(Object(R.T)(n.service,n.url))}}},U=Object(X.connect)(null,G)(function(e){var t=e.service,n=e.url,a=e.onClick;return Object(E.h)(Y.a,{"aria-label":F.a.__("neon:::%service% (opens in a new window)",{service:t}),className:"np_DialogShare-link",href:n,onClick:a,target:"_blank"},Object(E.h)("div",{className:"np_DialogShare-icon"},Object(E.h)(H.a,{xlinkHref:"#np_"+t})),Object(E.h)("div",{id:"np_DialogShare-"+t,className:"np_DialogShare-label"},t))}),$=U,ee=n("fvjX"),te=n("c1HI"),ne=n("wipR"),ae=n("TyQD"),oe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},re=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),ie=function e(t){return{transitionName:"np_transition--fade",transitionEnterTimeout:300,transitionLeaveTimeout:300,password:Object(V.q)(t),services:Object(V.u)(t)}},ce=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),re(t,[{key:"render",value:function e(t){var n=t.password,a=t.services,o=t.close,r=t.onRef,i=n?Object(E.h)("div",{className:"np_dialog-footer np_DialogShare-footer"},Object(E.h)("p",{className:"np_DialogShare-message"},F.a.__("neon:::You made this video private."),Object(E.h)("br",null),F.a.__("neon:::You need to provide the password when you share it: %password%",{password:n}))):null;return Object(E.h)(Z.a,{classNames:"np_DialogShare np_transition",id:"np_DialogShare",labelId:"np_DialogShare-title",onRef:r},Object(E.h)("div",{className:"np_header np_dialog-header"},Object(E.h)("div",{id:"np_DialogShare-title",className:"np_dialog-title"},F.a.__("neon:::Share")),Object(E.h)(B.a,{"aria-label":F.a.__("neon:::Close"),title:F.a.__("neon:::Close"),className:"np_button np_close",onClick:o},Object(E.h)(H.a,{xlinkHref:"#np_close"}))),Object(E.h)("div",{className:"np_dialog-body np_DialogShare-body"},a.map(function(e){return"permalink"===e.service&&Object(ne.supportsClipboard)()?Object(E.h)(J,oe({key:e.service},e)):Object(E.h)($,oe({key:e.service},e))})),i)}}]),t}(E.Component),le=Object(ee.compose)(Object(X.connect)(ie),function(e){return Object(W.a)(e,{selectors:{isOpened:L.e,isEnabled:te.a,isOpenRequested:L.d,isCloseRequested:L.c,closedBy:L.b},actions:{opened:R.q,closed:R.p,close:R.j}})},ae.a)(ce),se=n("7LgJ"),ue=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),be=function(e){function t(){return i(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),ue(t,[{key:"render",value:function e(t){var n=t.close,a=t.onRef;return Object(E.h)(Z.a,{classNames:"np_DialogShortcuts",ariaLabel:F.a.__("neon:::Shortcuts help panel"),onRef:a},Object(E.h)("button",{"aria-label":F.a.__("neon:::Close the shortcuts panel"),title:"close",className:"np_DialogShortcuts-close np_button np_close",onClick:n},Object(E.h)(H.a,{xlinkHref:"#np_close"})),Object(E.h)("div",{className:"np_DialogShortcuts-col"},Object(E.h)("dl",{className:"np_DialogShortcuts-list"},Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd np_DialogShortcuts-kbd--word"},"Space")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Play/Pause"))),Object(E.h)("dl",{className:"np_DialogShortcuts-list"},Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"↑")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Increase volume")),Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"↓")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Decrease volume")),Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"m")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Mute sound"))),Object(E.h)("dl",{className:"np_DialogShortcuts-list"},Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"f")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Enter fullscreen")),Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd np_DialogShortcuts-kbd--word"},"Esc")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Exit fullscreen"))),Object(E.h)("dl",{className:"np_DialogShortcuts-list np_DialogShortcuts-list--secondary"},Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"→")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Skip forward 5s")),Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"←")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Skip back 5s")),Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd np_DialogShortcuts-kbd--word"},"Shift"),Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"→")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Skip forward 10s")),Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd np_DialogShortcuts-kbd--word"},"Shift"),Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"←")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Skip back 10s")),Object(E.h)("dt",{className:"np_DialogShortcuts-key"},Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"0"),Object(E.h)("span",null,"-"),Object(E.h)("kbd",{className:"np_DialogShortcuts-kbd"},"9")),Object(E.h)("dd",{className:"np_DialogShortcuts-val"},F.a.__("neon:::Skip to 0%-90%")))))}}]),t}(E.Component),de=Object(W.a)(be,{selectors:{isOpened:se.e,isOpenRequested:se.d,isCloseRequested:se.c,closedBy:se.b},actions:{opened:R.s,closed:R.r,close:R.k}}),pe=n("Zw0V"),he="collections",fe=n("PMbS"),_e=n("S2l0"),me="consent",Oe=n("EfiX"),ge=n("4bgk"),ve=n("peh1"),je=n("K7ZK"),Se="pip",ye=Object(ve.createSelector)([ge.b,Oe.c,Oe.b],function(e,t,n){return{isAttached:t&&!e,highlighted:n,icon:"#np_pip",id:"pip",label:F.a.__("neon:::Picture-in-picture"),currentValue:n?F.a.__("neon:::On"):F.a.__("neon:::Off"),selected:n,value:"picture-in-picture"}}),ke=n("XANi"),Ne="quality",De=Object(ve.createSelector)([V.n,ke.b,ke.c,ke.f,ke.e],function(e,t,n,a,o){var r=[];return"audio"!==e&&(r=f(t,n,a,o)),{highlighted:a&&"Auto"!==a,icon:"#np_quality",id:Ne,isAttached:r.length>0,items:r,label:F.a.__("neon:::Quality"),currentValue:a,title:F.a.__("neon:::Quality")}}),we=n("XgKk"),Ie="speed",Ae=Object(ve.createSelector)([ge.b,V.x,we.l],function(e,t,n){var a=!t&&!e;return{highlighted:1!==n,icon:"#np_speed",id:"speed",isAttached:a,items:a?m(n):[],label:F.a.__("neon:::Speed"),currentValue:1===n?F.a.__("neon:::Normal"):n,title:F.a.__("neon:::Speed")}}),Te=n("PqSH"),Me="subtitles",Ce=Object(ve.createSelector)([V.A],function(e){return e=Object.keys(e).sort().map(function(t){return{label:e[t].label,code:t}}),e.unshift({label:F.a.__("neon:::None"),code:-1}),e}),qe=Object(ve.createSelector)([Ce,V.B,Te.b],function(e,t,n){var a=e.find(function(e){return e.code===n}).label;return{highlighted:-1!==n,icon:"#np_subtitles",id:Me,isAttached:t,items:t?g(e,n):[],label:F.a.__("neon:::Subtitles"),currentValue:1!==n?a:"Off",title:F.a.__("neon:::Subtitles")}}),Pe=n("eeF7"),xe=n("idq+"),Ee=n("s9Tm"),Re="autoplay_next",Ve=Object(ve.createSelector)([Ee.a,xe.c],function(e,t){return{currentValue:t?F.a.__("neon:::On"):F.a.__("neon:::Off"),highlighted:t,icon:"#np_autoplay",id:Re,isAttached:e,label:F.a.__("neon:::Autoplay next"),selected:t,value:t}}),Le=n("+Tp8"),Be=n("Ag2v"),Fe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},He=function e(t,n){if("string"!=typeof n)return"";var a=n.replace(/\W/g,"-").toLowerCase();return 1===t.length?"np_"+a+"-menu-item":"np_"+t[1].id+"-menu-item--"+a},Xe=function e(t){var n=t.closeSubMenu,a=t.onItemSelected,o=t.openSubMenu,r=t.level,i=t.isAttached,c=t.highlighted,l=t.id,s=t.label,u=t.currentValue,b=t.value,d=t.selected,p=t.icon,h=void 0===p?null:p,f=t.items,_=void 0===f?null:f,m=t.title,O=void 0===m?null:m,g=t.parents,v=t.visibleTree,j=function e(t){t.stopPropagation(),_?o([].concat(S(g),[{id:l,value:b,title:O}])):(a([].concat(S(g),[{id:l,value:b}])),r>0&&n())},y=function e(t){"Enter"!==t.key&&" "!==t.key||j(t)},k=null;h&&(k=Object(E.h)(H.a,{className:"np_menu-icon",xlinkHref:h}));var N=null,D=null,w={},I=r+1,A=v[I]&&v[I].id===l;return _&&(N=Object(E.h)(Je,{itemId:l,itemValue:b,parents:g,children:_,closeSubMenu:n,level:I,onItemSelected:a,openSubMenu:o,style:{display:A?"block":"none"},visibleTree:v}),D=Object(E.h)(H.a,{className:"np_icon--next",xlinkHref:"#np_chevron"})),w={"aria-label":s,"aria-checked":_?null:d?"true":"false","aria-haspopup":_?"true":null,"aria-expanded":_?A?"true":"false":null},i?Object(E.h)("li",Fe({id:He(g,l)},w,{className:"np_menu-item np_menu-item--lvl-"+r+" "+(c?"np_menu-item--highlighted":""),onClick:j,onKeypress:y,role:_?"menuitem":"menuitemradio",tabIndex:"0"}),k,Object(E.h)("span",{className:"np_menu-text"},s),Object(E.h)("span",{className:"np_menu-value np_menu-value--"+(D?"withsubmenu":"nosubmenu")},u),D,N):null},Ke=Xe,Qe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},ze=function e(t){var n=t.children,a=t.closeSubMenu,o=t.itemId,r=void 0===o?"root":o,i=t.itemValue,c=void 0===i?null:i,l=t.level,s=void 0===l?0:l,u=t.onItemSelected,b=t.openSubMenu,d=t.parents,p=void 0===d?[]:d,h=t.style,f=void 0===h?null:h,_=t.visibleTree;return Object(E.h)("ul",{className:"np_menu-list np_menu-list--lvl-"+s,style:f,role:"menu","aria-labelledby":"np_MenuSettings-title"},n.map(function(e){return Object(E.h)(Ke,Qe({},e,{closeSubMenu:a,level:s,onItemSelected:u,openSubMenu:b,parents:[].concat(y(p),[{id:r,value:c}]),visibleTree:_}))}))},Je=ze,Ze=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),We=[A,C,P,q,M,T,x],Ye=function e(t){return{isAttached:Object(Be.d)(t),transitionName:"np_transition--fade",transitionEnterTimeout:300,transitionLeaveTimeout:300,items:We.map(function(e){return e.getMenuItemList(t)})}},Ge=function e(t){return{onItemSelected:function e(n){var a=We.find(function(e){return e.menuItemId===n[1].id});t(a.actionForItem(n[n.length-1].value))}}},Ue={visibleTree:[{id:"root"}],isTransitioning:!1},$e=function(e){function t(){N(this,t);var e=D(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state=Object.assign({},Ue),e}return w(t,e),Ze(t,[{key:"componentWillReceiveProps",value:function e(t){this.props.isAttached&&!t.isAttached&&this.setState(Ue)}},{key:"openSubMenu",value:function e(t){var n=this;this.state.isTransitioning||(this.setState({visibleTree:t,isTransitioning:!0}),setTimeout(function(){n.setState({isTransitioning:!1})},300))}},{key:"closeSubMenu",value:function e(){var t=this;if(!this.state.isTransitioning){var n=[].concat(k(this.state.visibleTree));n.pop(),this.setState({visibleTree:n,isTransitioning:!0}),setTimeout(function(){t.setState({isTransitioning:!1})},300)}}},{key:"render",value:function e(t){var n=t.items,a=t.onItemSelected,o=t.close,r=t.onRef,i=this.state.visibleTree.length;return Object(E.h)(Z.a,{classNames:"np_menu np_transition np_MenuSettings",onRef:r},Object(E.h)("div",{className:"np_dialog-header np_menu-header"},i>1?Object(E.h)(B.a,{"aria-label":F.a.__("neon:::Back"),className:"np_button np_menu-back",onClick:this.closeSubMenu.bind(this)},Object(E.h)(H.a,{className:"np_icon--back",xlinkHref:"#np_chevron"})):null,Object(E.h)("div",{className:"np_dialog-title","aria-live":"polite",id:"np_MenuSettings-title"},i>1?this.state.visibleTree[i-1].title:F.a.__("neon:::Settings")),Object(E.h)(B.a,{"aria-label":F.a.__("neon:::Close"),className:"np_button np_close np_menu-close",onClick:o},Object(E.h)(H.a,{xlinkHref:"#np_close"}))),Object(E.h)("div",{className:"np_dialog-body np_menu-body"},Object(E.h)(Je,{children:n,closeSubMenu:this.closeSubMenu.bind(this),onItemSelected:a,openSubMenu:this.openSubMenu.bind(this),style:{transform:"translateX( "+-100*(i-1)+"%)"},visibleTree:this.state.visibleTree})))}}]),t}(E.Component),et=Object(ee.compose)(Object(X.connect)(Ye,Ge),function(e){return Object(W.a)(e,{selectors:{isOpened:Be.d,isOpenRequested:Be.c,isCloseRequested:Be.b,closedBy:Be.a},actions:{opened:Le.c,closed:Le.b,close:Le.a},focusLeaveBehaviour:"close"})},ae.a)($e),tt=n("22zM"),nt=n("1vZ8");n.d(t,"DialogShare",function(){return le}),n.d(t,"DialogShortcuts",function(){return de}),n.d(t,"MenuSettings",function(){return et}),n.d(t,"menuSettingsReducer",function(){return I})}}]);