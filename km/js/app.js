"use strict";function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),FrondevoMain=function(){function n(){_classCallCheck(this,n),this._eventHandlersInit()}return _createClass(n,[{key:"_modelsInit",value:function(){new FrondevoScrollToTop}},{key:"_eventHandlersInit",value:function(){var n=this;$(document).on("ready",function(){return n._modelsInit()})}}]),n}(),main=new FrondevoMain;