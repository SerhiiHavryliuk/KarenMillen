"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),FrondevoHashTag=function(){function e(){_classCallCheck(this,e),this.buttonPreviousRecords=$(".inspiration__button-previous-records"),this.hashtag=$(".hashtag"),this.SelectorHashtagLayout=$(".hashtag__wrap"),this.urlGetUrlActionForhashtag=this.hashtag.attr("data-get-url"),this.arrWhatNeedForGetPreviousRecords=[{selector:".hashtag",attrName:"data-list-page"},{selector:".hashtag",attrName:"data-get-url"}],this.elWherePrelaoderAppend=$("#popup-hashtag__group"),this.preloaderHTML='<div class="overlay_preloader" id="overlay-preloader"><div class="preloader"></div></div>',this.preloaderSelector="#overlay-preloader",this.elWherePrelaoderAppendSecond=$("body"),this.preloaderHTMLSecond='<div class="overlay_preloader" id="overlay-preloader-second"><div class="preloader"></div></div>',this.preloaderSelectorSecond="#overlay-preloader-second",this.selectorPopupHashtags="#popup-hashtag",this.classHashImg=".hashtag__img",this.idCurrentHashImg="",this.urlSendIdForCurrentItem=this.hashtag.attr("data-popup-hash-url"),this.selectorPopupHashtagWrap=$(".popup-hashtag__wrap"),this.selectorButtonPrew=".popup-hashtag__prew",this.selectorButtonNext=".popup-hashtag__next",this._eventHandlersInit()}return _createClass(e,[{key:"_initModules",value:function(){this.getPreviousRecords=new FrondevoGetCatalogItems(this.urlGetUrlActionForhashtag,this.hashtag,this.attrForCurentPage),this.popupHashtags=new FrondevoPopup({popupSelector:this.selectorPopupHashtags,overlayStatus:!0}),this._addPreloader(),this._addPreloaderSecond()}},{key:"_getDataWhatCanBeSendForPreviousRecords",value:function(){var e="";return this.arrWhatNeedForGetPreviousRecords.forEach(function(t){e+="&"+t.attrName+"="+$(t.selector).attr(t.attrName)}),e}},{key:"_getPreviousRecords",value:function(){var e=this;this._showPreloader();var t=this._getDataWhatCanBeSendForPreviousRecords();this.getPreviousRecords.getItems(t).then(function(t){e._showNewPreviousRecords(t.htmlCode,t.page),$(".hashtag").attr("data-list-page",t.page),"none"==t.page&&e.buttonPreviousRecords.hide()},function(e){console.error("Не удалось загрузить данные!",e),this._hidePreloader()})}},{key:"_showNewPreviousRecords",value:function(e,t){this.SelectorHashtagLayout.append(e),this._hidePreloader()}},{key:"_addPreloader",value:function(){this.elWherePrelaoderAppend.append(this.preloaderHTML),this.preloader=$(this.preloaderSelector)}},{key:"_showPreloader",value:function(){this.preloader.addClass("show")}},{key:"_hidePreloader",value:function(){this.preloader.removeClass("show")}},{key:"_addPreloaderSecond",value:function(){this.elWherePrelaoderAppendSecond.append(this.preloaderHTMLSecond),this.preloaderSecond=$(this.preloaderSelectorSecond)}},{key:"_showPreloaderSecond",value:function(){this.preloaderSecond.addClass("show")}},{key:"_hidePreloaderSecond",value:function(){this.preloaderSecond.removeClass("show")}},{key:"_showPopupHashtags",value:function(){this.popupHashtags.showPopup()}},{key:"_getIdCurrentHashImg",value:function(e){this.idCurrentHashImg=$(e).attr("data-id-hash-img")}},{key:"_sendCurrentIdHashImg",value:function(e){var t=this,r="&data-id-hash-img="+this.idCurrentHashImg+"&data-section="+this.hashtag.attr("data-section");this._ajaxSendToServerIdCurrentProductForCancelOrder(r).then(function(r){"OK"==r.status.toUpperCase()&&(t.selectorPopupHashtagWrap.empty(),$(e).hasClass("hashtag__img")?(setTimeout(function(){return t._hidePreloaderSecond()},700),setTimeout(function(){return t._showPopupHashtags()},700)):(t._showPreloader(),setTimeout(function(){return t._showPopupHashtags()},700),setTimeout(function(){return t._hidePreloader()},700)),t.selectorPopupHashtagWrap.append(r.htmlCode))},function(e){console.error("Не удалось загрузить данные!",e)})}},{key:"_ajaxSendToServerIdCurrentProductForCancelOrder",value:function(e){var t=$.Deferred();return this.AjaxProductId=$.ajax({type:"get",dataType:"json",url:this.urlSendIdForCurrentItem,data:e}).done(function(e){t.resolve(e)}).fail(function(e){t.reject(e.statusText)}),t.promise()}},{key:"_eventHandlersInit",value:function(){var e=this;$(document).on("ready",function(){return e._initModules()}),this.buttonPreviousRecords.on("click",function(){return e._getPreviousRecords()}),this.SelectorHashtagLayout.on("click",this.classHashImg,function(t){return e._showPreloaderSecond()}),this.SelectorHashtagLayout.on("click",this.classHashImg,function(t){return e._getIdCurrentHashImg(t.currentTarget)}),this.SelectorHashtagLayout.on("click",this.classHashImg,function(t){return e._sendCurrentIdHashImg(t.currentTarget)}),this.selectorPopupHashtagWrap.on("click",this.selectorButtonPrew,function(t){return e._getIdCurrentHashImg(t.target)}),this.selectorPopupHashtagWrap.on("click",this.selectorButtonPrew,function(t){return e._sendCurrentIdHashImg(t.target)}),this.selectorPopupHashtagWrap.on("click",this.selectorButtonNext,function(t){return e._getIdCurrentHashImg(t.target)}),this.selectorPopupHashtagWrap.on("click",this.selectorButtonNext,function(t){return e._sendCurrentIdHashImg(t.target)})}}]),e}(),hashtag=new FrondevoHashTag;