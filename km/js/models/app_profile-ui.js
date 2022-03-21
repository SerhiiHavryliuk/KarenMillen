"use strict";function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var s=r[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(r,t,s){return t&&e(r.prototype,t),s&&e(r,s),r}}(),FrondevoProfileUI=function(){function e(){_classCallCheck(this,e),this.classNameNumericMaskTel=".tel-mask",this.patternNumericMaskTel="+38(099)-999-99-99",this.formProfileSelector="#form-profile",this.classNameInvalidFormRow="invalid-row",this.selectorFormRow=".profile__form-row",this.selectorErrorMessage=".profile__err-mess",this.answerForFormProfile="",this.buttonShowPopupProfileCancel=$(".show-profile-popup-cancel"),this.popupProfileCancelSelector="#profile__popup-cancel",this.buttonHidePopupProfileCancel=$("#profile__button-hide-popup"),this.buttonSendIdProduct=$("#profile__button-send-data"),this.urlSendIdForCurrentItem=$(".profile__buy").attr("data-url-my-purchases"),this.idProductForCancelOrder="",this.formUserDataSelector="#profile__form-user-data",this.formYourAddressSelector="#profile__form-your-address",this.popupSuccessSendFormSelector="#popup-message",this.textForSuccessSendForm=$(".profile__text-for-success-send-form"),this.buttonHidePopupSuccessMessageformYourAddress=$(".button_popup-mess-close"),this.wrapProfilePopupGroup=$(".profile__popup-group"),this.wrapProfilePopupAnsver=$(".profile__popup-ansver"),this.buttonAddNewAddress=$(".profile__add-new-address"),this.selectorWhereAppendNewAddress=$(".profile__address-wrap"),this.idCurrentAddress="",this.actionForCurrentAddress="",this.urlSendidCurrentAddress=$(this.selectorWhereAppendNewAddress).attr("action"),this.wrapInputFormAction=$("input#form-action"),this.wrapProfileAddressBorder=$(".profile__address-border"),this.classCheckBoxAddress=".profile__address-checkbox",this.selectorInputRadio="input.radio",this.selectorImgDeleteAddress=".profile__address-delete",this.selectorTextEditAddress=".profile__address-edit",this.tabLinkFavorites=$('[data-url-hash="#favorites"]'),this.buttonDeleteFavoritesItem=$(".profile__favorites-delete-item"),this.idCurrentFavoriteItem="",this.urlSendIdForCurrentFavoriteItem=$(".profile__favorites").attr("data-url-favorites"),this.sizeFavoriteItem="",this.buttonAddToCartFavoriteItem=$(".profile__favorites-btn"),this.wrapProfileAddressButton=$(".profile__address-button"),this.buttonShowPopupFavoritesSendToFriend=$(".profile__favorites-send-to-friend"),this.selectorFavoritesSendToFriend="#favorites-send-to-friend",this.buttonHidePopupFavoritesSendToFriend=$(".favorites-send__hide-popup"),this.buttonSubmitFormFavoritesSendToFriend=$(".favorites-send__submit"),this.selectorFavoritesSendHideWrap=$(".favorites-send__hide-wrap"),this.urlSendDataFromFormFavoritesSendToFriend=$(".favorites-send__form").attr("data-url-favorites-friend"),this.classformFavoritesSendToFriend=".favorites-send__form",this.selectorformFavoritesSend=$(".favorites-send__form"),this.idFavorites=$("#favorites"),this.classShowMessagePopup="favorites-send__show",this.classHideMessagePopup="favorites-send__hide",this.buttonReviewMessageBeforeSend=$(".favorites-send__review"),this.selectorFormFavoritesSendToFriend=$(".favorites-send__form-group"),this.selectorMessageBeforeSend=$(".favorites-send__message-wrap"),this.selectorFavoritesSendMessageName=$(".favorites-send__message-name"),this.selectorEmailFormFavoritesSendToFriend=$(".favorites-send__form-email"),this.selectorFavoritesSendMessageEmail=$(".favorites-send__message-email"),this.selectorNameFriendFormFavoritesSendToFriend=$(".favorites-send__form-name-friend"),this.selectorFavoritesSendMessageNameFriend=$(".favorites-send__message-name-friend"),this.selectorTextFriendFormFavoritesSendToFriend=$(".favorites-send__form-message-text"),this.selectorFavoritesSendMessageText=$(".favorites-send__message-text"),this.selectorFavoritesSendMessageEmailRepeat=$(".favorites-send__form-email-repeat"),this.selectorFormRowFormSendToFriend=".layout-form-row",this._eventHandlersInit()}return _createClass(e,[{key:"_showPopupForCancelOrder",value:function(){this.popupProfileCancel.showPopup()}},{key:"_hidePopupForCancelOrder",value:function(){this.popupProfileCancel.closePopup()}},{key:"_showPopupForSuccessSendForm",value:function(e){0!=this.formProfile.getServerAsnswer()&&(this.answerForFormProfile=$(this.formProfileSelector).attr("data-answer")),0!=this.formUserData.getServerAsnswer()&&(this.answerForFormProfile=$(this.formUserDataSelector).attr("data-answer")),0!=this.formYourAddress.getServerAsnswer()&&(this.answerForFormProfile=$(this.formYourAddressSelector).attr("data-answer"),this._refreshAddressesInBorder(),this._resetFormYourAddress()),this.textForSuccessSendForm.text(this.answerForFormProfile),this.popupSuccessSendForm.showPopup()}},{key:"_cleanForm",value:function(e){$(e).find($(".profile__form-row").removeClass("invalid-row"))}},{key:"_defineTheFirstAddressOfTheMainAddress",value:function(e){1==this.selectorWhereAppendNewAddress.find(this.classCheckBoxAddress).length&&(this._getIdCurrentAddress(this.selectorWhereAppendNewAddress.find(this.classCheckBoxAddress)),this._setActionForDefineTheFirstAddressOfTheMainAddress(this.selectorWhereAppendNewAddress.find(this.classCheckBoxAddress)),this._sendDataToServer())}},{key:"_refreshAddressesInBorder",value:function(){$(this.selectorWhereAppendNewAddress).empty(),this.selectorWhereAppendNewAddress.append(this.formYourAddress.getServerAsnswer()),this.wrapProfileAddressBorder.removeClass("profile__hidden")}},{key:"_hidePopupForSuccessSendForm",value:function(){this.popupSuccessSendForm.closePopup()}},{key:"_getIdCurrentProductForCancelOrder",value:function(e){this.idProductForCancelOrder=$(e).attr("data-id-tovar")}},{key:"_sendIdCurrentIdProductForCancelOrder",value:function(){var e=this,r="data-products-id="+this.idProductForCancelOrder;this._ajaxSendToServerIdCurrentProductForCancelOrder(r).then(function(r){"OK"==r.status.toUpperCase()&&(e.wrapProfilePopupGroup.css("display","none"),e.wrapProfilePopupAnsver.css("display","block").text(r.message))},function(e){console.error("Не удалось загрузить данные!",e)})}},{key:"_ajaxSendToServerIdCurrentProductForCancelOrder",value:function(e){var r=$.Deferred();return this.AjaxProductId=$.ajax({type:"post",dataType:"json",url:this.urlSendIdForCurrentItem,data:e}).done(function(e){r.resolve(e)}).fail(function(e){r.reject(e.statusText)}),r.promise()}},{key:"_returnDefaultViewPopupForCancelOrder",value:function(){this.wrapProfilePopupGroup.css("display","block"),this.wrapProfilePopupAnsver.css("display","none")}},{key:"_resetFormPersonalData",value:function(){document.getElementById("form-profile").reset(),document.getElementById("profile__form-user-data").reset()}},{key:"_getServerAnsver",value:function(){0!=this.formProfile.getServerAsnswer()&&(window.location=this.formProfile.getServerAsnswer()),0!=this.formUserData.getServerAsnswer()&&(window.location=this.formUserData.getServerAsnswer())}},{key:"_resetFormYourAddress",value:function(){$("#profile__form-your-address input.input").val(""),this.wrapInputFormAction.val("create")}},{key:"_setActionForAddNewAddress",value:function(e){this.wrapInputFormAction.val("create"),document.getElementById("city").focus()}},{key:"_setActionForChangeMainAddress",value:function(e){this.actionForCurrentAddress=$(e).parents().attr("data-action")}},{key:"_setActionForDeleteAddress",value:function(e){this.actionForCurrentAddress=$(e).parents().attr("data-action")}},{key:"_setActionForEditAddress",value:function(e){this.actionForCurrentAddress=$(e).attr("data-action"),this.wrapInputFormAction.val("edit")}},{key:"_setActionForDefineTheFirstAddressOfTheMainAddress",value:function(e){this.actionForCurrentAddress=$(e).attr("data-action"),this.wrapInputFormAction.val("create")}},{key:"_getIdCurrentAddress",value:function(e){this.idCurrentAddress=$(e).parents(".profile__address-group").attr("data-id-current-address")}},{key:"_sendDataToServer",value:function(){var e=this,r="",t=this.urlSendidCurrentAddress,s="post";this.arrAttrWhatNeedForSendDataToServer=[{selector:this.idCurrentAddress,attrName:"data-id-current-address"},{selector:this.actionForCurrentAddress,attrName:"data-action"}],this.arrAttrWhatNeedForSendDataToServer.forEach(function(e){r+="&"+e.attrName+"="+e.selector}),this._ajaxSendToServerCurrentId(r,t,s).then(function(r){if("OK"==r.status.toUpperCase()){if("add new address"==e.actionForCurrentAddress&&($(e.selectorWhereAppendNewAddress).empty(),e.selectorWhereAppendNewAddress.append(r.message)),"delete address"==e.actionForCurrentAddress&&($(e.selectorWhereAppendNewAddress).empty(),""==r.message?e.wrapProfileAddressBorder.addClass("profile__hidden"):e.selectorWhereAppendNewAddress.append(r.message)),"edit address"==e.actionForCurrentAddress){var t=[];$("form#profile__form-your-address input").each(function(e){t[e]=$(this).attr("id")});for(var s=0;s<r.addressData.length;++s)for(var o=0;o<t.length;++o)if(r.addressData[s].inputId==t[o]){var i="#"+t[o];$(i).val(r.addressData[s].value)}}"change of address in the form"==e.actionForCurrentAddress&&($(e.selectorWhereAppendNewAddress).empty(),e.selectorWhereAppendNewAddress.append(r.htmlCode))}},function(e){console.error("Не удалось загрузить данные!",e)})}},{key:"_ajaxSendToServerCurrentId",value:function(e,r,t){var s=$.Deferred();return this.AjaxProductId=$.ajax({type:t,dataType:"json",url:r,data:e}).done(function(e){s.resolve(e)}).fail(function(e){s.reject(e.statusText)}),s.promise()}},{key:"_hideLeftMenu",value:function(){$(".resp-tabs-list").css("display","none"),$(".resp-tabs-container").css({border:"none",width:"100%",paddingLeft:"0"}),setTimeout(function(){$(globalUI.itemCardSliderSelector).each(function(){$(this).find("img").length>1&&$(this).data("bxSlider").reloadSlider()})},200)}},{key:"_changeMainTitlePage",value:function(){$(".profile-title ").css("display","none"),$(".profile__favorites-title ").css("display","block")}},{key:"_getIdCurrentFavoriteItem",value:function(e){var r=e;$(e)[0].hasAttribute("data-cart-add")||(r=$(e).parents("[data-cart-add]")),"profile__favorites-delete-item"==e.className&&(r=$(e).parent().find(".profile__favorites-btn")),this.idCurrentFavoriteItem=$(r).attr("data-cart-id"),this.sizeFavoriteItem=$(r).attr("data-cart-size")}},{key:"_sendIdCurrentFavoriteItemToServer",value:function(e){var r=this,t=this.urlSendIdForCurrentFavoriteItem,s="&goodId="+this.idCurrentFavoriteItem+"&size="+this.sizeFavoriteItem+"&action=remove",o="get";this._ajaxSendToServerCurrentId(s,t,o).then(function(t){"OK"==t.status.toUpperCase()&&r._hideCurrentFavoriteItem(e)},function(e){console.error("Не удалось загрузить данные!",e)})}},{key:"_hideCurrentFavoriteItem",value:function(e){var r=e;$(e)[0].hasAttribute("data-cart-add")||(r=$(e).parents("[data-cart-add]")),"profile__favorites-delete-item"==e.className&&(r=$(e).parent().find(".profile__favorites-btn")),$(r).parent().remove(),this._readCounterItems(),0==this._readCounterItems()&&location.reload()}},{key:"_reloadPage",value:function(){0!=this.formUserData.getServerAsnswer()&&location.reload()}},{key:"_scrollToValue",value:function(e){document.documentElement.clientWidth<768&&$("html, body").animate({scrollTop:e},500)}},{key:"_showPopupFavoritesSendToFriend",value:function(){this.popupFavoritesSendToFriend.showPopup()}},{key:"_closePopupFavoritesSendToFriend",value:function(){this.popupFavoritesSendToFriend.closePopup(),this._returnDefaultViewPopupFavoritesSendToFriend()}},{key:"_showHideReviewMessageBeforeSend",value:function(){""!=this.selectorNameFriendFormFavoritesSendToFriend.val()&&""!=this.selectorEmailFormFavoritesSendToFriend.val()&&""!=this.selectorFavoritesSendMessageEmailRepeat.val()&&""!=this.selectorTextFriendFormFavoritesSendToFriend.val()&&(this.selectorFormFavoritesSendToFriend.toggleClass(this.classHideMessagePopup),this.selectorMessageBeforeSend.toggleClass(this.classShowMessagePopup),"ПРОСМОТР"==this.buttonReviewMessageBeforeSend.text()?this.buttonReviewMessageBeforeSend.text("РЕДАКТИРОВАТЬ"):this.buttonReviewMessageBeforeSend.text("ПРОСМОТР"),this._readTextFromFormFavoritesSend())}},{key:"_readTextFromFormFavoritesSend",value:function(){this.selectorFavoritesSendMessageEmail.text(this.selectorEmailFormFavoritesSendToFriend.val()),this.selectorFavoritesSendMessageNameFriend.text(this.selectorNameFriendFormFavoritesSendToFriend.val()),this.selectorFavoritesSendMessageText.text(this.selectorTextFriendFormFavoritesSendToFriend.val())}},{key:"_sendDataFromFormFavoritesToServer",value:function(){for(var e={},r=0;r<this.buttonAddToCartFavoriteItem.length;r++)e+="&data-cart-id[]="+this.buttonAddToCartFavoriteItem.eq(r).attr("data-cart-id");this._ajaxSendToServerDataFromFormFavoritesToServer(e).then(function(e){"OK"==e.status.toUpperCase()},function(e){console.error("Не удалось загрузить данные!",e)})}},{key:"_ajaxSendToServerDataFromFormFavoritesToServer",value:function(e){var r=$.Deferred();return this.AjaxProductId=$.ajax({type:"get",dataType:"json",url:this.urlSendDataFromFormFavoritesSendToFriend,data:e}).done(function(e){r.resolve(e)}).fail(function(e){r.reject(e.statusText)}),r.promise()}},{key:"_hideFormFavoritesSendToFriend",value:function(){this.selectorformFavoritesSend.addClass(this.classHideMessagePopup),this.selectorFavoritesSendHideWrap.addClass(this.classShowMessagePopup)}},{key:"_readCounterItems",value:function(){var e=this.idFavorites.find(this.buttonAddToCartFavoriteItem).length;return $(".profile__counter-items").text(e+" товаров"),e}},{key:"_modelsInit",value:function(){new FrondevoNumericMask(this.classNameNumericMaskTel,this.patternNumericMaskTel);this.formProfile=new FrondevoAJAXSubmitForm({formSelector:this.formProfileSelector,invalidRowClassName:this.classNameInvalidFormRow,selectorFormRow:this.selectorFormRow,selectorErrorMessage:this.selectorErrorMessage}),this.formUserData=new FrondevoAJAXSubmitForm({formSelector:this.formUserDataSelector,invalidRowClassName:this.classNameInvalidFormRow,selectorFormRow:this.selectorFormRow,selectorErrorMessage:this.selectorErrorMessage}),this.formYourAddress=new FrondevoAJAXSubmitForm({formSelector:this.formYourAddressSelector,invalidRowClassName:this.classNameInvalidFormRow,selectorFormRow:this.selectorFormRow,selectorErrorMessage:this.selectorErrorMessage}),this.popupProfileCancel=new FrondevoPopup({popupSelector:this.popupProfileCancelSelector,overlayStatus:!0}),this.popupSuccessSendForm=new FrondevoPopup({popupSelector:this.popupSuccessSendFormSelector,overlayStatus:!0}),"#favorites"==window.location.hash&&(setTimeout(function(){window.scrollTo(0,0)},1),document.documentElement.clientWidth>768&&(this._hideLeftMenu(),this._changeMainTitlePage())),"#my-purchases"!=window.location.hash&&"#personal-info"!=window.location.hash&&"#address-book"!=window.location.hash||setTimeout(function(){window.scrollTo(0,0)},1),this.popupFavoritesSendToFriend=new FrondevoPopup({popupSelector:this.selectorFavoritesSendToFriend,overlayStatus:!0}),this.formFavoritesSendToFriend=new FrondevoAJAXSubmitForm({formSelector:this.classformFavoritesSendToFriend,invalidRowClassName:this.classNameInvalidFormRow,selectorFormRow:this.selectorFormRowFormSendToFriend,selectorErrorMessage:this.selectorErrorMessage}),this._readCounterItems(),document.documentElement.clientWidth<768&&"#favorites"==window.location.hash&&this._scrollToValue(530)}},{key:"_returnDefaultViewPopupFavoritesSendToFriend",value:function(){this.selectorformFavoritesSend.removeClass(this.classHideMessagePopup),this.selectorFavoritesSendHideWrap.removeClass(this.classShowMessagePopup),this.selectorMessageBeforeSend.removeClass(this.classShowMessagePopup),this.selectorFormFavoritesSendToFriend.removeClass(this.classHideMessagePopup),$(".favorites-send__form input.input").val(""),$(".favorites-send__form textarea").val("")}},{key:"_eventHandlersInit",value:function(){var e=this;$(document).on("ready",function(){return e._modelsInit()}),$(this.formProfileSelector).on("ajax-submit:success",function(){return e._showPopupForSuccessSendForm()}),$(this.formProfileSelector).on("ajax-submit:success",function(r){return e._cleanForm(r.currentTarget)}),$(this.formUserDataSelector).on("ajax-submit:success",function(){return e._showPopupForSuccessSendForm()}),$(this.formUserDataSelector).on("ajax-submit:success",function(r){return e._cleanForm(r.currentTarget)}),$(this.formYourAddressSelector).on("ajax-submit:success",function(){return e._showPopupForSuccessSendForm()}),$(this.formYourAddressSelector).on("ajax-submit:success",function(r){return e._cleanForm(r.currentTarget)}),$(this.formYourAddressSelector).on("ajax-submit:success",function(r){return e._defineTheFirstAddressOfTheMainAddress(r.currentTarget)}),this.buttonShowPopupProfileCancel.on("click",function(){return e._showPopupForCancelOrder()}),this.buttonShowPopupProfileCancel.on("click",function(r){return e._getIdCurrentProductForCancelOrder(r.currentTarget)}),this.buttonHidePopupProfileCancel.on("click",function(){return e._hidePopupForCancelOrder()}),this.buttonHidePopupSuccessMessageformYourAddress.on("click",function(){return e._hidePopupForSuccessSendForm()}),this.buttonHidePopupSuccessMessageformYourAddress.on("click",function(){return e._resetFormPersonalData()}),this.buttonHidePopupSuccessMessageformYourAddress.on("click",function(){return e._getServerAnsver()}),this.buttonHidePopupSuccessMessageformYourAddress.on("click",function(){return e._reloadPage()}),this.buttonSendIdProduct.on("click",function(){return e._sendIdCurrentIdProductForCancelOrder()}),$(this.popupProfileCancelSelector).on("popup:hide",function(){return e._returnDefaultViewPopupForCancelOrder()}),$(this.popupSuccessSendFormSelector).on("popup:hide",function(){return e._resetFormPersonalData()}),$(this.popupSuccessSendFormSelector).on("popup:hide",function(){return e._reloadPage()}),this.buttonAddNewAddress.on("click",function(){return e._resetFormYourAddress()}),this.buttonAddNewAddress.on("click",function(){return e._setActionForAddNewAddress(event.target)}),this.selectorWhereAppendNewAddress.on("click",this.selectorInputRadio,function(r){return e._getIdCurrentAddress(r.target)}),this.selectorWhereAppendNewAddress.on("click",this.selectorInputRadio,function(r){return e._setActionForChangeMainAddress(r.target)}),this.selectorWhereAppendNewAddress.on("click",this.selectorInputRadio,function(){return e._sendDataToServer()}),this.selectorWhereAppendNewAddress.on("click",this.selectorImgDeleteAddress,function(r){return e._getIdCurrentAddress(r.target)}),this.selectorWhereAppendNewAddress.on("click",this.selectorImgDeleteAddress,function(r){return e._setActionForDeleteAddress(r.target)}),this.selectorWhereAppendNewAddress.on("click",this.selectorImgDeleteAddress,function(){return e._sendDataToServer()}),this.selectorWhereAppendNewAddress.on("click",this.selectorTextEditAddress,function(r){return e._getIdCurrentAddress(r.target)}),this.selectorWhereAppendNewAddress.on("click",this.selectorTextEditAddress,function(r){return e._setActionForEditAddress(r.target)}),this.selectorWhereAppendNewAddress.on("click",this.selectorTextEditAddress,function(){return e._sendDataToServer()}),this.tabLinkFavorites.on("click",function(){return e._hideLeftMenu()}),this.tabLinkFavorites.on("click",function(){return e._changeMainTitlePage()}),this.buttonDeleteFavoritesItem.on("click",function(){return e._getIdCurrentFavoriteItem(event.target)}),this.buttonDeleteFavoritesItem.on("click",function(){return e._sendIdCurrentFavoriteItemToServer(event.target)}),this.buttonAddToCartFavoriteItem.on("click",function(){return e._hideCurrentFavoriteItem(event.target)}),this.buttonAddToCartFavoriteItem.on("click",function(){return e._getIdCurrentFavoriteItem(event.target)}),this.buttonAddToCartFavoriteItem.on("click",function(){return e._sendIdCurrentFavoriteItemToServer(event.target)}),this.wrapProfileAddressButton.on("click",function(){return e._scrollToValue(450)}),this.selectorWhereAppendNewAddress.on("click",this.selectorTextEditAddress,function(){return e._scrollToValue(1050)}),this.buttonShowPopupFavoritesSendToFriend.on("click",function(){return e._showPopupFavoritesSendToFriend()}),this.buttonReviewMessageBeforeSend.on("click",function(){return e._showHideReviewMessageBeforeSend()}),$(this.classformFavoritesSendToFriend).on("ajax-submit:success",function(){return e._sendDataFromFormFavoritesToServer()}),$(this.classformFavoritesSendToFriend).on("ajax-submit:success",function(){return e._hideFormFavoritesSendToFriend()}),this.buttonHidePopupFavoritesSendToFriend.on("click",function(){return e._closePopupFavoritesSendToFriend()}),$(this.selectorFavoritesSendToFriend).on("popup:hide",function(){return e._returnDefaultViewPopupFavoritesSendToFriend()})}}]),e}(),profileUI2=new FrondevoProfileUI;