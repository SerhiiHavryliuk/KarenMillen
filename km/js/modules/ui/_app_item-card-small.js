"use strict";function _classCallCheck(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,s){for(var a=0;a<s.length;a++){var t=s[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(s,a,t){return a&&e(s.prototype,a),t&&e(s,t),s}}(),FrondevoSmallItemCard=function(){function e(s,a){_classCallCheck(this,e),this.ecardClassName=s,this.ecard=$(this.ecardClassName),this.classNameWrapForSlider=a,this.ecardImages=this.ecard.find("img"),this.showControlsClassName="e-card-2_show-controls",this.ecardSliderClassName="bx-viewport",this._initModules(),this._eventHandlersInit()}return _createClass(e,[{key:"_initModules",value:function(){$(this.classNameWrapForSlider).each(function(){!$(this).parent().hasClass(this.ecardSliderClassName)&&$(this).find("img").length>1&&($(this).bxSlider({pager:!1,preloadImages:"all"}),$(".e-card-2__pic_load").removeClass("e-card-2__pic_load"))})}},{key:"_showControls",value:function(e){$(e).addClass(this.showControlsClassName)}},{key:"_hideControls",value:function(e){$(e).removeClass(this.showControlsClassName)}},{key:"_eventHandlersInit",value:function(){var e=this;this.ecard.on("mouseenter",function(s){return e._showControls(s.currentTarget)}),this.ecard.on("mouseleave",function(s){return e._hideControls(s.currentTarget)})}}]),e}();