"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),FrondevoInspiration=function(){function e(){_classCallCheck(this,e),this.buttonPreviousRecords=$(".inspiration__button-previous-records"),this.inspiration=$(".inspiration"),this.urlGetUrlActionForinspiration=this.inspiration.attr("data-get-url"),this.selectorInspirationList=$(".inspiration__list"),this.arrWhatNeedForGetPreviousRecords=[{selector:".inspiration",attrName:"data-list-page"}],this.elWherePrelaoderAppend=$("body"),this.preloaderHTML='<div class="overlay_preloader" id="overlay-preloader"><div class="preloader"></div></div>',this.preloaderSelector="#overlay-preloader",this.inspirationImg=$(".inspiration__content-img"),this.inspirationFlag=!0,this.container=".inspiration__list",this._eventHandlersInit()}return _createClass(e,[{key:"_initModules",value:function(){this.getPreviousRecords=new FrondevoGetCatalogItems(this.urlGetUrlActionForinspiration,this.inspiration,this.attrForCurentPage),this._addPreloader(),this._wookmarkInit()}},{key:"_getDataWhatCanBeSendForPreviousRecords",value:function(){var e="";return this.arrWhatNeedForGetPreviousRecords.forEach(function(t){e+="&"+t.attrName+"="+$(t.selector).attr(t.attrName)}),e}},{key:"_getPreviousRecords",value:function(){var e=this;this._showPreloader();var t=this._getDataWhatCanBeSendForPreviousRecords();this.getPreviousRecords.getItems(t).then(function(t){e._showNewPreviousRecords(t.htmlCode),e._setNewCurrentPage(t.page),"none"==t.page&&e.buttonPreviousRecords.hide(),setTimeout(function(){return e._wookmarkInit()},50)},function(e){console.error("Не удалось загрузить данные!",e),this._hidePreloader()})}},{key:"_showNewPreviousRecords",value:function(e){var t=this;this.selectorInspirationList.append(e),setTimeout(function(){return t._hidePreloader()},400)}},{key:"_setNewCurrentPage",value:function(e){this.inspiration.attr("data-list-page",e)}},{key:"_addPreloader",value:function(){this.elWherePrelaoderAppend.append(this.preloaderHTML),this.preloader=$(this.preloaderSelector)}},{key:"_showPreloader",value:function(){this.preloader.addClass("show")}},{key:"_hidePreloader",value:function(){this.preloader.removeClass("show")}},{key:"_showHover",value:function(e){if(document.documentElement.clientWidth<1024){if(1==this.inspirationFlag)return this.inspirationImg.addClass(".inspiration__content-img-hover"),$(e).parent().parent().find(".inspiration__img-hover-text").addClass("inspiration__show-hover"),$(e).parent().parent().parent().find(".inspiration__content-img-title").addClass("inspiration__show-hover"),this.inspirationFlag=!1,!1;0==this.inspirationFlag&&("inspiration__img-hover-text inspiration__show-hover"==e.className?location.href=$(e).parent().attr("href"):location.href=$(e).parent().parent().attr("href"))}}},{key:"_wookmarkInit",value:function(){this.wookmark=new Wookmark(this.container,{offset:1,align:"left"})}},{key:"_eventHandlersInit",value:function(){var e=this;$(document).on("ready",function(){return e._initModules()}),this.buttonPreviousRecords.on("click",function(){return e._getPreviousRecords()}),this.inspirationImg.on("click",function(){return e._showHover(event.target)}),$(window).on("resize",function(){return e._wookmarkInit()}),$(window).on("load",function(){return e._wookmarkInit()})}}]),e}(),inspiration=new FrondevoInspiration;