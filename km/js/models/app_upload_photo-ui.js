"use strict";function _classCallCheck(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function o(o,t){for(var e=0;e<t.length;e++){var p=t[e];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(o,p.key,p)}}return function(t,e,p){return e&&o(t.prototype,e),p&&o(t,p),t}}(),FrondevoUploadPhoto=function(){function o(){_classCallCheck(this,o),this.buttonShowPopupUploadPhoto=$(".upload_photo-btn-show-popup"),this.selectorPopupUploadPhoto="#upload-photo__popup",this.buttonHidePopupUploadPhoto=$("#upload_photo-hide-popup"),this.slectorUploadPhotoTab=$("ul.upload-photo__tabs li"),this.slectorUploadPhotoTabContent=$(".upload-photo__tab-content"),this._eventHandlersInit()}return _createClass(o,[{key:"_initModules",value:function(){this.popupProfileCancel=new FrondevoPopup({popupSelector:this.selectorPopupUploadPhoto,overlayStatus:!0})}},{key:"_showPopupPopupUploadPhotor",value:function(){this.popupProfileCancel.showPopup()}},{key:"_hidePopupPopupUploadPhoto",value:function(){this.popupProfileCancel.closePopup()}},{key:"_showCurrentTab",value:function(o){var t=$(o).attr("data-tab");this.slectorUploadPhotoTabContent.removeClass("upload-photo__current"),$(t).addClass("upload-photo__current")}},{key:"_eventHandlersInit",value:function(){var o=this;$(document).on("ready",function(){return o._initModules()}),this.buttonShowPopupUploadPhoto.on("click",function(){return o._showPopupPopupUploadPhotor()}),this.buttonHidePopupUploadPhoto.on("click",function(){return o._hidePopupPopupUploadPhoto()}),$("ul.upload-photo__tabs li").on("click",function(){return o._showCurrentTab(event.target)})}}]),o}(),upLoadPhoto=new FrondevoUploadPhoto;