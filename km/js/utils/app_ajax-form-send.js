"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),FrondevoAJAXSendForm=function(){function e(t){_classCallCheck(this,e),this.urlGetMore=urlGetMore}return _createClass(e,[{key:"getItems",value:function(e){var t=$.Deferred();return $.ajax({type:"get",dataType:"json",url:this.urlGetMore,data:e}).done(function(e){t.resolve(e)}).fail(function(e){t.reject(e.statusText)}),t.promise()}}]),e}();