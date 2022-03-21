'use strict';

// =============================================================================
// видимость элемента
// варианты проверок:
// - видна ли верхняя граница элемента
// - видна ли нижняя граница элемента
// - виден ли элемент полностью
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondeovoCheckIsVisibleElement = function () {
    function FrondeovoCheckIsVisibleElement(checkedElement) {
        _classCallCheck(this, FrondeovoCheckIsVisibleElement);

        this.checkedElement = checkedElement;
    }

    _createClass(FrondeovoCheckIsVisibleElement, [{
        key: 'checkIsVisibleTop',
        value: function checkIsVisibleTop() {
            this._calculateCoordinates();
            return this.elTop >= this.docViewTop && this.elTop <= this.docViewBottom;
        }
    }, {
        key: 'checkIsVisibleBottom',
        value: function checkIsVisibleBottom() {
            this._calculateCoordinates();
            return this.elBottom <= this.docViewBottom;
        }
    }, {
        key: 'checkIsVisibleFull',
        value: function checkIsVisibleFull() {
            this._calculateCoordinates();
            return this.elBottom <= this.docViewBottom && this.elTop >= this.docViewTop;
        }
    }, {
        key: '_calculateCoordinates',
        value: function _calculateCoordinates() {
            this.docViewTop = $(window).scrollTop();
            this.docViewBottom = this.docViewTop + $(window).height();
            this.elTop = this.checkedElement.offset().top;
            this.elBottom = this.elTop + this.checkedElement.height();
        }
    }]);

    return FrondeovoCheckIsVisibleElement;
}();
'use strict';

// =============================================================================
// получаем больше товаров и/или статей
// может запрашивать данные с учетом активных фильтров и выбранного типа сортировки
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoGetCatalogItems = function () {
    function FrondevoGetCatalogItems(urlGetMore) {
        _classCallCheck(this, FrondevoGetCatalogItems);

        this.urlGetMore = urlGetMore;
    }

    _createClass(FrondevoGetCatalogItems, [{
        key: 'checkIsAnyProductsCanBeLoaded',
        value: function checkIsAnyProductsCanBeLoaded(currentPageOfItemsList) {

            if (currentPageOfItemsList != 'none') {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'getItems',
        value: function getItems(sendingData) {

            var promise = $.Deferred();

            $.ajax({
                'type': 'get',
                'dataType': 'json',
                'url': this.urlGetMore,
                'data': sendingData
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }]);

    return FrondevoGetCatalogItems;
}();
'use strict';

// =============================================================================
// ui на странице каталога
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoAJAXSubmitForm = function () {
    function FrondevoAJAXSubmitForm(params) {
        _classCallCheck(this, FrondevoAJAXSubmitForm);

        this.formSelector = params.formSelector;
        this.invalidRowClassName = params.invalidRowClassName;
        this.formRowSelector = params.selectorFormRow;
        this.errorMessageSelector = params.selectorErrorMessage;

        this.form = $(this.formSelector);
        this.formType = this.form.attr('method') || 'get';
        this.scriptUrl = this.form.attr('action');
        this.sendingData = '';

        this.serverAnswer = '';

        this.needValidate = params.needValidate || true;

        this._eventHandlersInit();
    }

    _createClass(FrondevoAJAXSubmitForm, [{
        key: '_sendData',
        value: function _sendData() {
            var promise = $.Deferred();

            $.ajax({
                'type': this.formType,
                'dataType': 'json',
                'url': this.scriptUrl,
                'data': this.sendingData
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }, {
        key: '_validateForm',
        value: function _validateForm(event) {
            var _this = this;

            event.preventDefault();
            this.sendingData = this.form.serialize();

            this._sendData().then(function (responseJSON) {

                if (responseJSON.status.toUpperCase() == 'ERROR') {
                    _this._showError(responseJSON.invalidInputName, responseJSON.message);
                } else if (responseJSON.goToUrl) {
                    _this._goToUrlAfterSuccessSend(responseJSON.goToUrl);
                } else {
                    _this.serverAnswer = responseJSON.message;
                    _this._firedSendSuccess();
                }
            }, function (error) {
                console.error('Не удалось отправить данные формы!', error);
            });
        }
    }, {
        key: '_showError',
        value: function _showError(invalidInputName, message) {
            var invalidField = this.form.find('[name="' + invalidInputName + '"]'),
                invalidFormRow = invalidField.parents(this.formRowSelector).eq(0),
                invalidMessageWrap = invalidFormRow.find(this.errorMessageSelector).eq(0);

            invalidMessageWrap.text(message);
            invalidFormRow.addClass(this.invalidRowClassName);
        }
    }, {
        key: '_goToUrlAfterSuccessSend',
        value: function _goToUrlAfterSuccessSend(url) {
            window.location = url;
        }
    }, {
        key: '_firedSendSuccess',
        value: function _firedSendSuccess() {
            var event = $.Event('ajax-submit:success');
            this.form.trigger(event);
        }
    }, {
        key: 'getServerAsnswer',
        value: function getServerAsnswer() {
            return this.serverAnswer;
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this2 = this;

            $(this.formSelector).on('submit', function (event) {
                return _this2._validateForm(event);
            });
        }
    }]);

    return FrondevoAJAXSubmitForm;
}();
'use strict';

// =============================================================================
// slider for small item card
// dependencies:
//  - jQuery
//  - jquery.bxslider.js
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoSmallItemCard = function () {
    function FrondevoSmallItemCard(classNameForEcard, classNameForSlider) {
        _classCallCheck(this, FrondevoSmallItemCard);

        this.ecardClassName = classNameForEcard;
        this.ecard = $(this.ecardClassName);
        this.classNameWrapForSlider = classNameForSlider;
        this.ecardImages = this.ecard.find('img');
        this.showControlsClassName = 'e-card-2_show-controls';
        this.ecardSliderClassName = 'bx-viewport';

        this._initModules();
        this._eventHandlersInit();
    }

    _createClass(FrondevoSmallItemCard, [{
        key: '_initModules',
        value: function _initModules() {

            $(this.classNameWrapForSlider).each(function () {

                // была ли ранее проинициализрована галерея на элементе
                // и если изображеий больше чем 1
                if (!$(this).parent().hasClass(this.ecardSliderClassName) && $(this).find('img').length > 1) {
                    $(this).bxSlider({ pager: false, preloadImages: 'all' });
                    $('.e-card-2__pic_load').removeClass('e-card-2__pic_load');
                }
            });
        }
    }, {
        key: '_showControls',
        value: function _showControls(ecard) {
            $(ecard).addClass(this.showControlsClassName);
        }
    }, {
        key: '_hideControls',
        value: function _hideControls(ecard) {
            $(ecard).removeClass(this.showControlsClassName);
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            this.ecard.on('mouseenter', function (event) {
                return _this._showControls(event.currentTarget);
            });
            this.ecard.on('mouseleave', function (event) {
                return _this._hideControls(event.currentTarget);
            });
        }
    }]);

    return FrondevoSmallItemCard;
}();
'use strict';

// =============================================================================
// overlay
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoOverlay = function () {
    function FrondevoOverlay() {
        _classCallCheck(this, FrondevoOverlay);

        this.overlayHTML = '<div id="overlay"></div>';

        this.createOverlay();
    }

    _createClass(FrondevoOverlay, [{
        key: 'createOverlay',
        value: function createOverlay() {
            this.elOverlay = $(this.overlayHTML).appendTo('body');
            //return this.elOverlay;
        }
    }, {
        key: 'showOverlay',
        value: function showOverlay() {

            $(this.elOverlay).addClass('show');
        }
    }, {
        key: 'hideOverlay',
        value: function hideOverlay() {

            $(this.elOverlay).removeClass('show');
        }
    }]);

    return FrondevoOverlay;
}();
'use strict';

// =============================================================================
// popup
// dependencies:
//  - jQuery
//  - ui/_app_overlay.js
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoPopup = function () {
    function FrondevoPopup(parameters) {
        _classCallCheck(this, FrondevoPopup);

        // parameters
        this.popup = $(parameters.popupSelector);
        this.paramOverlayStatus = parameters.overlayStatus || false; // true or false
        this.paramPosition = parameters.position || 'center'; // center or ralative

        this.popupHTMLTemplate = '<div class="F-popup"><div class="F-popup__close"></div><div class="F-popup__content"></div></div>';

        this.popupBackgroundClassName = 'F-popup';
        this.popupButtonCloseClassName = 'F-popup__close';

        this.popupWindow = this.popup.find('.F-popup__window').eq(0);
        this.popupContentWrap = this.popup.find('.F-popup__content').eq(0);

        this.htmlGlobalTag = $('html');

        this._initModules();
        this._eventHandlersInit();
    }

    _createClass(FrondevoPopup, [{
        key: 'createPopup',
        value: function createPopup() {}
    }, {
        key: 'showPopup',
        value: function showPopup() {
            this.popup.addClass('open');
            if (this.paramOverlayStatus) {

                this.overlay.showOverlay();
                this.htmlGlobalTag.addClass('F-popup__window-no-scroll');
            }
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this.popup.removeClass('open');
            if (this.paramOverlayStatus) {
                this.overlay.hideOverlay();
                this.htmlGlobalTag.removeClass('F-popup__window-no-scroll');
            }
            this._firedIfHidePopup();
        }
    }, {
        key: '_checkIsClickOnBackground',
        value: function _checkIsClickOnBackground(clickedElement) {

            if (clickedElement.classList.contains(this.popupBackgroundClassName) || clickedElement.classList.contains(this.popupButtonCloseClassName)) {
                this.closePopup();
            }
        }
    }, {
        key: '_firedIfShowPopup',
        value: function _firedIfShowPopup() {
            var event = $.Event('popup:show');
            this.popup.trigger(event);
            return this;
        }
    }, {
        key: '_firedIfHidePopup',
        value: function _firedIfHidePopup() {
            var event = $.Event('popup:hide');
            this.popup.trigger(event);
            return this;
        }
    }, {
        key: '_initModules',
        value: function _initModules() {
            if (this.paramOverlayStatus) {
                this.overlay = new FrondevoOverlay();
                this.elOverlay = this.overlay.elOverlay;
                this.elOverlay.addClass('popup-overlay');
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            this.popup.on('click', function (event) {
                return _this._checkIsClickOnBackground(event.target);
            });
        }
    }]);

    return FrondevoPopup;
}();
'use strict';

// =============================================================================
// scroll to top of the web application
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoScrollToTop = function () {
    function FrondevoScrollToTop() {
        var elWhereAppendScrollButton = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var topOffsetWhenShowButtonPx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var scrollSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 800;

        _classCallCheck(this, FrondevoScrollToTop);

        // settings
        this.HTMLCode = '<div class="scroll-to-top"><div class="scroll-to-top__text">Наверх</div></div>';
        this.elWhereAppendScrollButton = elWhereAppendScrollButton;
        this.topOffsetWhenShowButton = topOffsetWhenShowButtonPx;
        this.scrollSpeed = scrollSpeed;
        this.footer = $('.footer');

        this.visibleOfFooter = new FrondeovoCheckIsVisibleElement(this.footer);

        // button init
        this._createButtonScrollToTop();
        this._eventHandlersInit();
    }

    _createClass(FrondevoScrollToTop, [{
        key: 'showButton',
        value: function showButton() {
            this.buttonScrollToTop.fadeIn();
        }
    }, {
        key: 'hideButton',
        value: function hideButton() {
            this.buttonScrollToTop.fadeOut();
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {
            $('html, body').animate({ scrollTop: 0 }, this.scrollSpeed);
        }
    }, {
        key: '_createButtonScrollToTop',
        value: function _createButtonScrollToTop() {
            this.buttonScrollToTop = $(this.HTMLCode).appendTo(this.elWhereAppendScrollButton);
        }
    }, {
        key: '_checkOffsetFromTop',
        value: function _checkOffsetFromTop() {
            var offsetFromTopPx = $(window).scrollTop();

            if (offsetFromTopPx > this.topOffsetWhenShowButton) {
                this.showButton();
            } else {
                this.hideButton();
            }
        }
    }, {
        key: '_checkOffsetFromFooter',
        value: function _checkOffsetFromFooter() {

            if (this.visibleOfFooter.checkIsVisibleTop() && !$(this.buttonScrollToTop).hasClass('scroll-to-top_under-footer')) {
                this._fixedUnderFooter();
            } else if (!this.visibleOfFooter.checkIsVisibleTop()) {
                this._fixedBottomScreen();
            }
        }
    }, {
        key: '_fixedUnderFooter',
        value: function _fixedUnderFooter() {
            $(this.buttonScrollToTop).addClass('scroll-to-top_under-footer');
        }
    }, {
        key: '_fixedBottomScreen',
        value: function _fixedBottomScreen() {
            this.buttonScrollToTop.removeClass('scroll-to-top_under-footer');
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            window.addEventListener('scroll', function () {
                return _this._checkOffsetFromTop();
            });
            window.addEventListener('scroll', function () {
                return _this._checkOffsetFromFooter();
            });
            this.buttonScrollToTop.on('click', function () {
                return _this.scrollToTop();
            });
        }
    }]);

    return FrondevoScrollToTop;
}();
'use strict';

// =============================================================================
// behaviours for top navigation
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoTopNav = function () {
    function FrondevoTopNav(elTopNav) {
        _classCallCheck(this, FrondevoTopNav);

        this.topNav = elTopNav;
        this.topNavUl = this.topNav.find('ul').eq(0); // необходимо для избавления от мигания меню при переходе с пункта на пункт


        this.arrTopNavSubMenu = this.topNavUl.find('.h-menu-dd__layout-sub-menu');
        this.flagIsUnderMenu = false;
        this.openSubMenuClassName = 'h-menu-dd_open';

        // элемент для отслеживания тапов для показа под меню на моб версии
        this.itemMenuSel = '.h-menu-dd__item';
        this.arrItemMenuFirstLevel = this.topNav.find(this.itemMenuSel);

        // элемент для отслеживания тапов для показа под под меню на моб версии
        this.arrItemMenuSecondLevel = this.topNav.find('li[data-toogle-mob-sub-sub-menu]');

        this.elForShowMobMenu = $('#h-menu-dd__show-menu'); // чекбокс если включен - показывается меню
        this.infoString = $('.info-string'); // инфо строка в шапке, если она присутсвует, надо переоределить позицию меню в моб версии

        this._eventHandlersInit();
    }

    _createClass(FrondevoTopNav, [{
        key: '_firedIfShowDropDownMenu',
        value: function _firedIfShowDropDownMenu() {
            var _this = this;

            this.flagIsUnderMenu = true;
            setTimeout(function () {
                return _this._checkIsStillUnderMenu();
            }, 300);
        }
    }, {
        key: '_checkIsStillUnderMenu',
        value: function _checkIsStillUnderMenu() {

            if (this.flagIsUnderMenu == true) {
                this.topNav.addClass(this.openSubMenuClassName);
                var _event = $.Event('topMenuDropDown:show');
                this.topNav.trigger(_event);
                return this;
            }
        }
    }, {
        key: '_firedIfHideDropDownMenu',
        value: function _firedIfHideDropDownMenu() {

            this.flagIsUnderMenu = false;

            this.topNav.removeClass(this.openSubMenuClassName);

            var event = $.Event('topMenuDropDown:hide');
            this.topNav.trigger(event);
            return this;
        }
    }, {
        key: '_toogleSubMenuForMobile',
        value: function _toogleSubMenuForMobile(event) {

            if (window.innerWidth > 1024) return; // если десктоп, то должна просто отработать ссылка

            event.preventDefault(); // без этого на мобилках при клике на ссылки прыгало меню
            event.stopPropagation();

            // поднимаемся к родителю - верхний элемент пунка меню - li
            // нужно для дальнейших манипуляций открытие-зарытие
            var $elItemMenuFirstLevel = $(event.target).parents('li').eq(0);

            // если элемент не содержит спец класс, обозначающий точ это ссылка
            // делаем раскрытие под меню
            // иначе переходим по ссылке

            if ($elItemMenuFirstLevel.hasClass('h-menu__item-link')) {

                // т.к. ссылки содержат спаны
                // проверка чтобы урл точно брался у ссылки
                var clickedLinkHref = void 0;
                if ($(event.target).attr('href')) clickedLinkHref = $(event.target).attr('href');else clickedLinkHref = $(event.target).parent().attr('href');

                document.location.href = clickedLinkHref;
            }

            // если кликаем по первому уровню меню и меню не открыто
            if (!$elItemMenuFirstLevel.hasClass('h-menu__item-open') && $elItemMenuFirstLevel.hasClass('h-menu-dd__item')) {

                if (window.innerWidth < 1000) {
                    // если это 1024, то первый уровень должен показать под меню без декорирования пункта первого уровня
                    $elItemMenuFirstLevel.addClass('h-menu__item-open');
                }
            } else if ($elItemMenuFirstLevel.hasClass('h-menu-dd__item')) {
                // если кликаем по первому уровню меню и меню открыто

                $elItemMenuFirstLevel.removeClass('h-menu__item-open');
            }
        }
    }, {
        key: '_toogleSubSubMenuForMobile',
        value: function _toogleSubSubMenuForMobile(event) {

            event.preventDefault();
            event.stopPropagation();

            var $subSubMenuWhatUserWantOpen = $(event.target).parent();

            if ($subSubMenuWhatUserWantOpen.hasClass('h-menu-dd__folded')) {
                // если это суб меню скрыто, тогда показываем

                var $allNeighborSubSubMenu = $subSubMenuWhatUserWantOpen.parents('.h-menu-dd__layout-sub-menu').eq(0).find('ul[data-mob-sub-sub-menu]');

                $allNeighborSubSubMenu.addClass('h-menu-dd__folded');
                $subSubMenuWhatUserWantOpen.removeClass('h-menu-dd__folded');
            }
        }
    }, {
        key: '_setPositionMobMenu',
        value: function _setPositionMobMenu() {
            // позиция отличается для случаев когда есть инфострока в шапке и когда нет

            if (this.infoString.length > 0) {
                this.topNavUl.addClass('h-menu-dd__list_info-string-in-header');
            } else {
                this.topNavUl.removeClass('h-menu-dd__list_info-string-in-header');
            }
        }
    }, {
        key: '_toggleGlobalScroll',
        value: function _toggleGlobalScroll() {
            if (this.elForShowMobMenu.is(':checked')) {
                $('html').addClass('noscroll');
            } else {
                $('html').removeClass('noscroll');
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this2 = this;

            this.topNavUl.on('mouseenter', function () {
                return _this2._firedIfShowDropDownMenu();
            });
            this.topNavUl.on('mouseleave', function () {
                return _this2._firedIfHideDropDownMenu();
            });
            this.arrTopNavSubMenu.on('transitionend', function () {
                return _this2._removeAnimationForSubmenu();
            });
            this.arrItemMenuFirstLevel.on('touchend', function () {
                return _this2._toogleSubMenuForMobile(event);
            });
            this.arrItemMenuSecondLevel.on('touchend', function () {
                return _this2._toogleSubSubMenuForMobile(event);
            });
            this.elForShowMobMenu.on('change', function () {
                return _this2._setPositionMobMenu();
            });
            this.elForShowMobMenu.on('change', function () {
                return _this2._toggleGlobalScroll();
            });
        }
    }]);

    return FrondevoTopNav;
}();
'use strict';

// =============================================================================
// Validate forms
//
// dependencies:
//  - jQuery
//
// Base structure
// .input-wrap
//      input.input(type="text")
//      .error-text
//
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoValidate = function () {
    function FrondevoValidate() {
        _classCallCheck(this, FrondevoValidate);

        this.WrapSelector = '.input-wrap';
        this.ErrorClass = 'error-control';
        this.ErrorTextSelector = '.error-text';

        this.phoneInput = $('[data-validate-phone]');

        this._eventHandlersInit();
    }

    _createClass(FrondevoValidate, [{
        key: 'error',
        value: function error(inputWrap, text) {
            if (text) inputWrap.find(this.ErrorTextSelector).html(text);
            inputWrap.addClass(this.ErrorClass);
        }
    }, {
        key: 'errorClear',
        value: function errorClear(e) {

            $(e).removeClass(this.ErrorClass);
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(document).on('focus', this.WrapSelector, function (event) {
                _this.errorClear(event.currentTarget);
            });

            this.phoneInput.keypress(function (event) {
                var key, keyChar;
                if (!event) var event = window.event;

                if (event.keyCode) key = event.keyCode;else if (event.which) key = event.which;

                /*
                 ���� ������ ���� �� ��������� ������: enter, tab, backspace, del, ������� �����, ������� ������
                 ����� �� ���� ��������� ������ �������, �..� ��� ������� ����� ��� ���������� ������ � ������ ����
                 */
                if (key == null || key == 0 || key == 8 || key == 13 || key == 37 || key == 39 || key == 46 || key == 9) return true;
                keyChar = String.fromCharCode(key);

                /*
                 ���� ������ ������ �� �������� ������ ��� "-", ��� "+", ����� �������� ���� �� ��������
                 */
                if (!/[0-9-\+]/.test(keyChar)) return false;
            });
        }
    }]);

    return FrondevoValidate;
}();

var vaildateAPP = new FrondevoValidate();
'use strict';

// =============================================================================
// Smart Vars
//  Viewport size detect, localStorage
//
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoVars = function () {
    function FrondevoVars() {
        _classCallCheck(this, FrondevoVars);

        // viewport size
        this.viewport = this._viewportRefresh();

        this.supportStorage = false;
        this._checkStorage();

        this._eventHandlersInit();
    }

    _createClass(FrondevoVars, [{
        key: '_checkStorage',
        value: function _checkStorage() {

            var supportKey = 'supportKey' + Math.random();

            if ('localStorage' in window) {
                try {
                    localStorage.setItem(supportKey, 1);
                    this.supportStorage = true;
                } catch (e) {}

                if (this.supportStorage) {
                    localStorage.removeItem(supportKey);
                }
            }
        }
    }, {
        key: '_viewportRefresh',
        value: function _viewportRefresh() {
            var result = {};

            var wwSize = new Array();
            if (window.innerHeight !== undefined) wwSize = [window.innerWidth, window.innerHeight];else {
                var wwSizeIE = document.documentElement ? document.documentElement : document.body;
                wwSize = [wwSizeIE.clientWidth, wwSizeIE.clientHeight];
            }
            result.width = wwSize[0];
            result.height = wwSize[1];

            if (result.width <= 768) result.device = 'mobile';else if (result.width <= 1024) result.device = 'tablet';else result.device = 'desktop';

            return result;
        }
    }, {
        key: '_windowResize',
        value: function _windowResize() {
            this.viewport = this._viewportRefresh();
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this = this;

            $(window).on('resize', function () {
                return _this._windowResize();
            });
        }
    }]);

    return FrondevoVars;
}();

var varsAPP = new FrondevoVars();
'use strict';

// =============================================================================
// overlay
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoGlobalUI = function () {
    function FrondevoGlobalUI() {
        _classCallCheck(this, FrondevoGlobalUI);

        // элемнты взаимодействия
        this.overlay = new FrondevoOverlay();

        // header
        // - top menu
        // - shops list
        this.globalLayout = $('.layuot-global').eq(0);
        this.topNav = $('nav.h-menu-dd').eq(0);
        var topNav = new FrondevoTopNav(this.topNav);

        this.buttonShowShopsList = $('#show-shops-list');
        this.shopsList = $('#shops-list');
        this.shopListWrapForScroll = this.shopsList.find('ul').eq(0);

        // footer:
        // - scroll top
        this.footer = $('.footer');
        // - subscribe
        this.formSubscribeSelector = '#footer__subscription-form';
        this.classNameInvalidFormSubscribeRow = 'invalid-row';
        this.selectorFormSubscribeRow = '.footer__wrap-input';
        this.selectorErrorSubscribeMessage = '.profile__err-mess';
        this.formSubscribeIdentificator = 'footer__subscription-form';

        // popup-answer-after-success-send-in the form subscribe -------------------------------
        this.popupSuccessSendFormSubscribeSelector = '#popup-subscribe-footer';
        this.textForSuccessSendFormSubscribe = $('.footer__text-for-success-send-form');
        this.buttonClosePopupSuccessMessageformSubscribe = $('.button_popup-mess-close');

        // first popup
        this.urlFirstPopupHTMLCode = '/api/first-popup';
        this.elWhereAppendFirstPopup = this.globalLayout;
        this.firstPopupSelector = '#popup-first-visit';
        this.buttonShowFormForgetPassSelector = '#show-form-forget-pass';
        this.firstPopupForgetPassSelctor = '#popup-forget-pass';
        this.formLoginSelector = '#form-login';
        this.formRecoverySelector = '#form-forget-pass';
        this.classNameInvalidFormRow = 'invalid-row';
        this.selectorFormRow = '.layout-form-row';
        this.selectorErrorMessage = '.login__err-mess';
        this.popupFormRecoverMessageClass = 'login__form_pass-message';
        this.popupFormRecoverWrapForMessageSelector = '.login__success-message';
        this.delayForShowFirstPopup = parseInt(localStorage.getItem('newVisitorTime')) || 2000; // если новый пользователь уже ходил по страницам,
        // но первый попап еще не успел показаться
        // считываем сколько осталось времени до показа попапа
        this.mobileFormTabsSelector = '#popup-first-visit .title_fourth';
        this.mobileFormTabActiveClass = 'login__form_mob-active';

        // small item card
        this.itemCardSelector = '.e-card-2';
        this.itemCardSliderSelector = '.ecard-2__slider-layout';

        // horisontal ecards slider
        this.horizontalSlider = $('.horisontal-ecards-slider__carousel');

        // header search
        this.searchInput = $('#header-search-input');
        this.urlGetSearchSuggestions = this.searchInput.attr('data-autocomplete-url');
        this.wrapWhereAppendHTMLCode = this.searchInput.parents('form').eq(0);
        this.searchSuggestionsSelector = '#header-search-suggestions';
        this.searchResultsInFocus = false; // флаги нужны чтобы не закрывать окно с результатами поиска,
        this.searchInputInFocus = false; // если курсор над окном результатов или в поле поиска

        // топ меню
        this.header = $('.header');
        this.stickFlagAttrName = '[data-header-stick]';
        this.stickTopMenuClass = 'header_stick';
        this.topOffsetWhenStickMenu = 60;

        this.reinitSliderAfterWindowResize();
        this._eventHandlersInit();
    }

    _createClass(FrondevoGlobalUI, [{
        key: '_stickTopMenu',
        value: function _stickTopMenu() {
            $('body').addClass(this.stickTopMenuClass);
        }
    }, {
        key: '_unStickTopMenu',
        value: function _unStickTopMenu() {
            $('body').removeClass(this.stickTopMenuClass);
        }
    }, {
        key: '_checkIfNeedStickTopMenu',
        value: function _checkIfNeedStickTopMenu() {

            if (document.documentElement.clientWidth < 1000) {
                this._unStickTopMenu();
                return;
            }

            var offsetFromTopPx = $(window).scrollTop();

            if (offsetFromTopPx > this.topOffsetWhenStickMenu) {
                this._stickTopMenu();
            } else {
                this._unStickTopMenu();
            }
        }
    }, {
        key: 'reinitSliderAfterWindowResize',
        value: function reinitSliderAfterWindowResize() {// todo хорошо бы добавить перинициализацию слайдеров при ресайзе. Сразу не зашло если н стр несольок салйдеров (стр item)

            // this.slider.destroySlider();
            //
            // this.horizontalSlider = $('.horisontal-ecards-slider__carousel');
            //
            // if(document.documentElement.clientWidth>1000) {
            //     let horizontalSliderSlideWidth = this.horizontalSlider.find('li').eq(0).width();
            //     this.slider = this.horizontalSlider.bxSlider({
            //         pager: false,
            //         controls: true,
            //         slideMargin: 10,
            //         minSlides: 2,
            //         maxSlides: 5,
            //         slideWidth: horizontalSliderSlideWidth
            //     });
            // } else {
            //     let horizontalSliderSlideWidth = this.horizontalSlider.find('li').eq(0).width();
            //     this.slider = this.horizontalSlider.bxSlider({
            //         pager: true,
            //         controls: false,
            //         slideMargin: 0,
            //         minSlides: 2,
            //         maxSlides: 2,
            //         slideWidth: horizontalSliderSlideWidth
            //     });
            // }


        }
    }, {
        key: 'showOverlay',
        value: function showOverlay() {

            this.overlay.showOverlay();
        }
    }, {
        key: 'hideOverlay',
        value: function hideOverlay() {

            this.overlay.hideOverlay();
        }
    }, {
        key: 'toggleShopsList',
        value: function toggleShopsList() {
            var _this = this;

            if (this.shopsList.hasClass('open')) {

                this.shopsList.removeClass('header__shops-list_animation');
                setTimeout(function () {
                    return _this._hideShopsList();
                }, 400);
            } else {
                this.shopsList.addClass('open');
                this.shopListWrapForScroll.jScrollPane();
                // для реализации анимации окна, необходима задержка после display:block для общего контейнера popup
                setTimeout(function () {
                    return _this._showShopsList();
                }, 1);
            }
        }
    }, {
        key: '_showShopsList',
        value: function _showShopsList() {
            this.shopsList.addClass('header__shops-list_animation');
        }
    }, {
        key: '_hideShopsList',
        value: function _hideShopsList() {
            console.log(1);
            this.shopsList.removeClass('open');
        }
    }, {
        key: '_checkNewVisitor',
        value: function _checkNewVisitor() {
            var isNewVisitor = localStorage.getItem('newVisitor') || 'true';
            if (isNewVisitor == 'true') {
                localStorage.setItem('newVisitor', 'false'); // указываем что этот посетитель уже не новый
                localStorage.setItem('newVisitorTime', this.delayForShowFirstPopup); // начинаем отсчет времени для показа первого окна
                this._checkIsItTimeForShowFirstPopup();
            } else if (isNewVisitor == 'false' && this.delayForShowFirstPopup > 0) {
                // если пользователь не новый, но ему еще не успели показать окно
                this._checkIsItTimeForShowFirstPopup();
            }
        }
    }, {
        key: '_checkIsItTimeForShowFirstPopup',
        value: function _checkIsItTimeForShowFirstPopup() {
            var _this2 = this;

            var howMuchTimeLeftSec = parseInt(localStorage.getItem('newVisitorTime'));

            if (howMuchTimeLeftSec == 0) {
                // если 0, показываем окно
                this._getHTMLCodeForFirstPopup();
                this._decreaseTimeLeftForFirstPopup(howMuchTimeLeftSec);
            } else if (howMuchTimeLeftSec > 0) {
                // если >0, значит еще не показівали - продолжаем отсчет
                setTimeout(function () {
                    return _this2._decreaseTimeLeftForFirstPopup(howMuchTimeLeftSec);
                }, 1000);
            } else {
                // если значение меньше 0, значит попап уже показывали
                return;
            }
        }
    }, {
        key: '_decreaseTimeLeftForFirstPopup',
        value: function _decreaseTimeLeftForFirstPopup(howMuchTimeLeftSec) {
            howMuchTimeLeftSec -= 1000;
            localStorage.setItem('newVisitorTime', howMuchTimeLeftSec);
            this._checkIsItTimeForShowFirstPopup();
        }
    }, {
        key: '_sendData',
        value: function _sendData() {
            var promise = $.Deferred();

            $.ajax({
                'type': 'get',
                'dataType': 'json',
                'url': this.urlFirstPopupHTMLCode
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }, {
        key: '_getHTMLCodeForFirstPopup',
        value: function _getHTMLCodeForFirstPopup() {
            var _this3 = this;

            this._sendData().then(function (responseJSON) {

                if (responseJSON.status.toUpperCase() == 'ERROR') {
                    console.error('Не удалось отправить данные формы!', error);
                } else if (responseJSON.status.toUpperCase() == 'OK') {
                    _this3.elWhereAppendFirstPopup.append(responseJSON.htmlCode);
                    _this3._showPopupForNewVisitor();
                }
            }, function (error) {
                console.error('Не удалось отправить данные формы!', error);
            });
        }
    }, {
        key: '_showPopupForNewVisitor',
        value: function _showPopupForNewVisitor() {

            // инициализация аякс подгруженных попапов и форм
            this.firstPopup = new FrondevoPopup({
                popupSelector: this.firstPopupSelector,
                overlayStatus: true
            });

            this.firstForgetPopup = new FrondevoPopup({
                popupSelector: this.firstPopupForgetPassSelctor,
                overlayStatus: true
            });

            var formLogin = new FrondevoAJAXSubmitForm({
                formSelector: this.formLoginSelector,
                invalidRowClassName: this.classNameInvalidFormRow,
                selectorFormRow: this.selectorFormRow,
                selectorErrorMessage: this.selectorErrorMessage
            });

            this.formRec = new FrondevoAJAXSubmitForm({
                formSelector: this.formRecoverySelector,
                invalidRowClassName: this.classNameInvalidFormRow,
                selectorFormRow: this.selectorFormRow,
                selectorErrorMessage: this.selectorErrorMessage
            });

            this.firstPopup.showPopup();
        }
    }, {
        key: '_showForgetPassPopup',
        value: function _showForgetPassPopup() {
            this.firstPopup.closePopup();
            this.firstForgetPopup.showPopup();
        }
    }, {
        key: '_showMessageAfrerSuccessSendRecoveryForm',
        value: function _showMessageAfrerSuccessSendRecoveryForm(event) {
            $(this.formRecoverySelector).addClass(this.popupFormRecoverMessageClass);
            $(this.popupFormRecoverWrapForMessageSelector).text(this.formRec.getServerAsnswer());
        }
    }, {
        key: '_formRecoverySetDefaultView',
        value: function _formRecoverySetDefaultView() {
            $(this.formRecoverySelector).removeClass(this.popupFormRecoverMessageClass);
        }
    }, {
        key: '_getSearchSuggestions',
        value: function _getSearchSuggestions(inputSearch) {
            var _this4 = this;

            var inputText = $(inputSearch).val();

            // удаляем символ завершения текстового блока строки для большего удобства
            inputText = inputText.replace(/\x03/gm, "");
            $(inputSearch).val(inputText);

            var dataSend = this.wrapWhereAppendHTMLCode.serialize();

            if (inputText.length > 2) {
                this._sendSearchData(dataSend).then(function (responseJSON) {

                    if (responseJSON.status.toUpperCase() == 'OK') {
                        _this4._showSearchAutocomple(responseJSON.htmlCode);
                    }
                }, function (error) {
                    console.error('Не удалось отправить данные формы!', error);
                });
            } else {
                this._refreshAutocompleteResults();
            }
        }
    }, {
        key: '_sendSearchData',
        value: function _sendSearchData(sendingData) {
            var promise = $.Deferred();

            $.ajax({
                'type': 'get',
                'dataType': 'json',
                'url': this.urlGetSearchSuggestions,
                data: sendingData
            }).done(function (response) {

                promise.resolve(response);
            }).fail(function (response) {

                promise.reject(response.statusText);
            });

            return promise.promise();
        }
    }, {
        key: '_showSearchAutocomple',
        value: function _showSearchAutocomple(htmlCode) {
            this._refreshAutocompleteResults(); // сперва удаялем предыдущие результаты
            this.wrapWhereAppendHTMLCode.append(htmlCode);
        }
    }, {
        key: '_setFlagOverSearchResults',
        value: function _setFlagOverSearchResults() {
            this.searchResultsInFocus = true;
        }
    }, {
        key: '_setFlagLeaveSearchResults',
        value: function _setFlagLeaveSearchResults() {
            this.searchResultsInFocus = false;
            this._deleteSearchAutocomple(); // если покинули окно с подсказками, возможно нужно скрыть подсазки
        }
    }, {
        key: '_setFlagFocusSearchInput',
        value: function _setFlagFocusSearchInput() {
            this.searchInputInFocus = true;
        }
    }, {
        key: '_setFlagLeaveSearchInput',
        value: function _setFlagLeaveSearchInput() {
            this.searchInputInFocus = false;
            this._deleteSearchAutocomple(); // если покинули поле поиска, возможно нужно скрыть подсазки
        }
    }, {
        key: '_refreshAutocompleteResults',
        value: function _refreshAutocompleteResults() {
            $(this.searchSuggestionsSelector).remove();
        }
    }, {
        key: '_deleteSearchAutocomple',
        value: function _deleteSearchAutocomple() {
            if (this.searchResultsInFocus == false && this.searchInputInFocus == false) {
                $(this.searchSuggestionsSelector).remove();
                if (varsAPP.viewport.device != 'mobile') this.searchInput.val('');
            }
        }
    }, {
        key: '_showPopupForSuccessSendFormSubscribe',
        value: function _showPopupForSuccessSendFormSubscribe(event) {
            this.textForSuccessSendFormSubscribe.text(this.formSubscribe.getServerAsnswer());
            this.popupSuccessSendFormSubscribe.showPopup();
        }
    }, {
        key: '_closePopupSuccessSendFormSubscribe',
        value: function _closePopupSuccessSendFormSubscribe() {
            this.popupSuccessSendFormSubscribe.closePopup();
        }
    }, {
        key: '_cleanForm',
        value: function _cleanForm(clickedSubmit) {
            $(this.formSubscribeSelector).find($(this.selectorFormSubscribeRow).removeClass('invalid-row')); // удаление сообщения об ошибке
            document.getElementById(this.formSubscribeIdentificator).reset(); // очистка поля от email
        }
    }, {
        key: '_toggleMobFormTabs',
        value: function _toggleMobFormTabs(clickedTab) {

            var currentForm = $(clickedTab).parents('form').eq(0);

            if (currentForm.hasClass(this.mobileFormTabActiveClass)) {
                currentForm.removeClass(this.mobileFormTabActiveClass);
            } else {
                currentForm.addClass(this.mobileFormTabActiveClass);
            }
        }
    }, {
        key: '_initModules',
        value: function _initModules() {
            var _this5 = this;

            $('.select-custom').customSelect();

            if (this.header.is(this.stickFlagAttrName)) {
                // если на странице должно закрепляться меню
                window.addEventListener('scroll', function () {
                    return _this5._checkIfNeedStickTopMenu();
                });
                window.addEventListener('resize', function () {
                    return _this5._checkIfNeedStickTopMenu();
                });
            }

            // item card
            var smallItemCardSlider = new FrondevoSmallItemCard(this.itemCardSelector, this.itemCardSliderSelector);

            // инициализируем слайдер только для тех блоков, где достачное к-во итемов (в некотрых блоках, например, просмотренные, может быть меньше)
            var quantityOfHorizontalSliders = this.horizontalSlider.length;

            for (var i = 0; i < quantityOfHorizontalSliders; i++) {
                var quantityOfItemsInHorizontalSlider = this.horizontalSlider.eq(i).find('li').length;

                if (document.documentElement.clientWidth > 1000 && quantityOfItemsInHorizontalSlider > 5) {
                    var horizontalSliderSlideWidth = this.horizontalSlider.eq(i).find('li').eq(0).width();
                    this.slider = this.horizontalSlider.eq(i).bxSlider({
                        pager: false,
                        controls: true,
                        slideMargin: 10,
                        minSlides: 2,
                        maxSlides: 5,
                        slideWidth: horizontalSliderSlideWidth
                    });
                } else if (document.documentElement.clientWidth < 1000 && quantityOfItemsInHorizontalSlider > 2) {
                    var _horizontalSliderSlideWidth = this.horizontalSlider.eq(i).find('li').eq(0).width();
                    this.slider = this.horizontalSlider.eq(i).bxSlider({
                        pager: true,
                        controls: false,
                        slideMargin: 0,
                        minSlides: 2,
                        maxSlides: 2,
                        slideWidth: _horizontalSliderSlideWidth
                    });
                }
            }

            // Subscribe form
            this.formSubscribe = new FrondevoAJAXSubmitForm({
                formSelector: this.formSubscribeSelector,
                invalidRowClassName: this.classNameInvalidFormSubscribeRow,
                selectorFormRow: this.selectorFormSubscribeRow,
                selectorErrorMessage: this.selectorErrorSubscribeMessage
            });

            // Popup-answer-after-success-send-form subscribe---------------------------
            this.popupSuccessSendFormSubscribe = new FrondevoPopup({
                popupSelector: this.popupSuccessSendFormSubscribeSelector,
                overlayStatus: true
            });

            // scroll to top
            var scrollToTop = new FrondevoScrollToTop();
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this6 = this;

            $(document).on('ready', function () {
                return _this6._initModules();
            });
            this.topNav.on('topMenuDropDown:show', function () {
                _this6.showOverlay();_this6._hideShopsList();
            }); // при открытии меню, список стран должен быть наверняка закрыт
            this.topNav.on('topMenuDropDown:hide', function () {
                return _this6.hideOverlay();
            });
            this.buttonShowShopsList.on('click', function () {
                return _this6.toggleShopsList();
            });
            $(window).on('resize', function () {
                return _this6.reinitSliderAfterWindowResize();
            });
            $(window).on('load', function () {
                return _this6._checkNewVisitor();
            });

            // first popup
            this.elWhereAppendFirstPopup.on('click', this.buttonShowFormForgetPassSelector, function () {
                return _this6._showForgetPassPopup();
            });
            this.elWhereAppendFirstPopup.on('ajax-submit:success', this.formRecoverySelector, function () {
                return _this6._showMessageAfrerSuccessSendRecoveryForm();
            });
            this.elWhereAppendFirstPopup.on('click', this.mobileFormTabsSelector, function (event) {
                return _this6._toggleMobFormTabs(event.currentTarget);
            });

            // search
            this.searchInput.on('keyup', function (event) {
                return _this6._getSearchSuggestions(event.currentTarget);
            });
            this.wrapWhereAppendHTMLCode.on('mouseenter', this.searchSuggestionsSelector, function () {
                return _this6._setFlagOverSearchResults();
            });
            this.wrapWhereAppendHTMLCode.on('mouseleave', this.searchSuggestionsSelector, function () {
                return _this6._setFlagLeaveSearchResults();
            });
            this.searchInput.on('focus', function () {
                return _this6._setFlagFocusSearchInput();
            });
            this.searchInput.on('blur', function () {
                return _this6._setFlagLeaveSearchInput();
            });

            // popup subscribe
            $(this.formSubscribeSelector).on('ajax-submit:success', function (event) {
                return _this6._showPopupForSuccessSendFormSubscribe();
            });
            $(this.formSubscribeSelector).on('ajax-submit:success', function (event) {
                return _this6._cleanForm(event.currentTarget);
            });
            this.buttonClosePopupSuccessMessageformSubscribe.on('click', function (event) {
                return _this6._closePopupSuccessSendFormSubscribe();
            });
        }
    }]);

    return FrondevoGlobalUI;
}();

var globalUI = new FrondevoGlobalUI();
'use strict';

// =============================================================================
// ui корзины
// dependencies:
//  - jQuery
// =============================================================================

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrondevoCartUI = function () {
    function FrondevoCartUI() {
        _classCallCheck(this, FrondevoCartUI);

        // элементы взаимодействия
        this.cartSizeCheckAttr = 'data-cart-size-check'; // переключатель размеров на странице товара
        this.cartSizeCheck = $('[' + this.cartSizeCheckAttr + ']');
        this.cartSizeClassActive = 'button-size_active'; // класс для активного переключателя

        this.cartSizeWrongMsg = $('[data-cart-size-wrong]'); // сообщение о невыбранном размере
        this.cartSizeSucssesMsg = $('[data-cart-size-sucsses]'); // сообщение о добавленном товаре в корзину
        this.cartFavoriteucssesMsg = $('[data-cart-favorite-sucsses]'); // сообщение о добавленном товаре в избранное


        this.cartItemDel = $('[data-cart-delete-item]'); // удалить позицию из корзины
        this.cartRowSelector = '[data-cart-object]'; // строка в корзине
        this.cartIdAttr = 'data-cart-id'; // id товара (data-cart-object)
        this.cartSizeAttr = 'data-cart-size'; // size товара (data-cart-object)
        this.cartNumAttr = 'data-cart-num'; // количество товара (data-cart-object)
        this.cartPriceAttr = 'data-cart-price'; // цена товара
        this.cartCostAttr = 'data-cart-cost'; // стоимость позиции (цена*кол-во)

        this.cartSincUrlAttr = 'data-cart-sinc-url'; // php начальной синхронизации корзины с сервером
        this.cartUrlAttr = 'data-cart-url'; // php куда отправляем корзину при изменениях

        this.cartAddBtn = $('[data-cart-add]'); // кнопка "добавить в корзину"

        this.cartAddToFavoriteBtn = $('[data-cart-add-to-favorite]'); // кнопка "добавить в избранное"
        this.cartLogoutAddToFavoriteBtn = $('[data-cart-logout-add-to-favorite]'); // кнопка "добавить в избранное" для незарегистрированного

        this.cartNumInput = $('[data-cart-val-num]'); // контролл с количеством товара в позиции
        this.cartSizeInput = $('[data-cart-val-size]'); // контролл с размером товара в позиции

        this.cartPromoSubmitUrlAttr = 'data-cart-promo-url'; // php куда отправляем на проверку промокод
        this.cartPromoSubmit = $('[' + this.cartPromoSubmitUrlAttr + ']'); // кнопка отправки промокода
        this.cartPromoInput = $('[data-cart-promo-code]'); // input с промокодом

        this.cartDiscountSubmitUrlAttr = 'data-cart-discount-url'; // то же для кода дисконт.карты
        this.cartDiscountSubmit = $('[' + this.cartDiscountSubmitUrlAttr + ']'); //
        this.cartDiscountInput = $('[data-cart-discount-code]'); //

        this.cartDiscountMsg = $('[data-cart-discount-msg]'); // контейнер для приема текста от data-cart-promo-url
        this.cartTotal = $('[data-cart-total]'); // общая стоимость заказа
        this.cartHeaderNum = $('[data-cart-header-num]'); // количесво товаров в корзине в шапке

        this.cartEmptyMsgAttr = 'data-cart-empty-msg'; // атрибут с текстом для пустой корзины
        this.cartEmptyMsg = $('[' + this.cartEmptyMsgAttr + ']'); // контейнер для текста для пустой корзины
        this.cartPageEl = $('.cart-page'); // контейнер страницы корзины
        this.cartEmptyPageClass = 'cart-page_empty'; // вид страницы при пустой корзине

        this.cartEmptyHide = $('[data-cart-hide-if-empty]'); // элементы, которые нужно скрыть со страницы если корзина пуста

        this.cartHeaderIcon = $('[data-cart-popup]'); // кнопка "корзина" в шапке
        this.cartHeaderEmptyClass = 'header_basket-empty'; // класс для пустой корзины
        this.cartPopupSelector = '#cartPopup'; // селектор попапа с корзиной
        this.cartPopupCont = $('[data-cart-popup-cont]'); // контейнер для подгрузки в попапе корзины
        this.cartPopupText = $('[data-cart-popup-info]');
        this.cartPopupLoadAttr = 'data-cart-popup-load-url'; // php загрузки попапа корзины

        this.errorMsgCart = 'Не удалось загрузить данные корзины!'; // сообщения об ошибках
        this.errorMsgEmptyInput = 'Заполните поле!'; //  (в дисконте)

        this.Timer;

        this.cart = [];

        // доработка согласно котрой попап корзины показывает при наведении на иконку в шапек
        // скрывается, если увели курсор с шапки и курсор не остался над корзиной
        // определяем элемент "окно корзины" для отслеживани положения курсора мыши
        this.cartEl = $(this.cartPopupSelector);
        this.cartOpenClass = 'open';
        this.flagIsUnderCart = false;

        this._initModules();
        this._eventHandlersInit();
    }

    _createClass(FrondevoCartUI, [{
        key: '_initModules',
        value: function _initModules() {

            /* Init Cart*/

            if (varsAPP.supportStorage) {
                /* Version Control */
                var versionCart = localStorage.getItem('versionCart'),
                    currentVersion = 1;

                if (versionCart != currentVersion) {
                    localStorage.removeItem('cart');
                }
                localStorage.setItem('versionCart', currentVersion);
                /* end Version Control */

                this.cart = JSON.parse(localStorage.getItem('cart'));
            } else this.cart = [];

            if (this.cart == null) {
                this.cart = [];
            }

            if (varsAPP.supportStorage) {
                var s = sessionStorage.getItem('sinc');

                if (this.cart != [] && !s) {
                    sessionStorage.setItem('sinc', 1);
                    this._cartSinc();
                }
            } else this._cartSinc();

            $('.select-selectric').selectric();
        }
    }, {
        key: '_firedIfUnderCart',
        value: function _firedIfUnderCart() {
            this.flagIsUnderCart = true;
            //setTimeout(()=> this._checkIsStillUnderCart(), 300);
        }
    }, {
        key: '_checkIsStillUnderCart',
        value: function _checkIsStillUnderCart() {

            if (this.flagIsUnderCart == true) {
                //this.topNav.addClass(this.openSubMenuClassName);
                var event = $.Event('cursorUnderCart');
                this.cartEl.trigger(event);
                return this;
            }
        }
    }, {
        key: '_firedIfLeaveCart',
        value: function _firedIfLeaveCart() {

            this.flagIsUnderCart = false;

            //this.topNav.removeClass(this.openSubMenuClassName);

            var event = $.Event('cursorLeaveCart');
            this.cartEl.trigger(event);
            return this;
        }

        // на странице товара

    }, {
        key: '_sizeCheck',
        value: function _sizeCheck(e) {
            $('[' + this.cartSizeCheckAttr + ']').removeClass(this.cartSizeClassActive);
            $(e).addClass(this.cartSizeClassActive);
            this.cartAddBtn.attr(this.cartSizeAttr, $(e).attr(this.cartSizeCheckAttr));
            this.cartSizeWrongMsg.css("display", "none");
            this.cartSizeSucssesMsg.css("display", "none");
        }
    }, {
        key: '_addToCart',
        value: function _addToCart(e) {

            var o = e;
            if (!$(e)[0].hasAttribute('data-cart-add')) {
                o = $(e).parents('[data-cart-add]');
                console.log(o);
            }
            var goodId = $(o).attr(this.cartIdAttr),
                goodSize = $(o).attr(this.cartSizeAttr),
                num = 1;

            if (goodSize) {

                this.cartSizeSucssesMsg.css("display", "block");

                // ajax
                var data = "action='add'&goodId=" + goodId + "&size=" + goodSize + "&num=" + num;
                this._cartChange(data, true, true);

                // localStorage
                this._addCartSrorage(goodId, goodSize, num);
            } else {
                this.cartSizeWrongMsg.css("display", "block");
            }
        }
    }, {
        key: '_addToFavoriteLogout',
        value: function _addToFavoriteLogout(e) {
            var o = this.cartAddBtn,
                goodId = $(o).attr(this.cartIdAttr),
                goodSize = $(o).attr(this.cartSizeAttr);
            if (!goodSize) {
                this.cartSizeWrongMsg.css("display", "block");
                e.preventDefault();
            }
        }
    }, {
        key: '_addToFavorite',
        value: function _addToFavorite() {
            var o = this.cartAddBtn,
                goodId = $(o).attr(this.cartIdAttr),
                goodSize = $(o).attr(this.cartSizeAttr);

            if (goodSize) {

                this.cartFavoriteucssesMsg.css("display", "block");

                // ajax
                var data = "goodId=" + goodId + "&size=" + goodSize;

                if (this.cartAddToFavoriteBtn.hasClass('active')) {
                    data += '&action=remove';
                    this.cartAddToFavoriteBtn.removeClass('active');
                } else {
                    data += '&action=add';
                    this.cartAddToFavoriteBtn.addClass('active');
                    $('[data-cart-favorite]').addClass('active');
                }

                $.ajax({
                    url: this.cartAddToFavoriteBtn.attr('data-cart-add-to-favorite'),
                    method: 'get',
                    data: data,
                    dataType: 'json',
                    success: function success(response) {
                        if (response.kol == 0) $('[data-cart-favorite]').removeClass('active');
                    },
                    error: function error(xhr) {
                        console.error(cartUI.errorMsgCart, xhr);
                    }
                });
            } else {
                this.cartSizeWrongMsg.css("display", "block");
            }
        }
    }, {
        key: '_submitPromoCode',
        value: function _submitPromoCode() {
            var code = this.cartPromoInput.val();
            if (code != '') {
                $.ajax({
                    url: this.cartPromoSubmit.attr(this.cartPromoSubmitUrlAttr),
                    method: 'get',
                    data: "promocode=" + this.cartPromoInput.val(),
                    dataType: 'json',
                    success: function success(response) {
                        if (response.status.toUpperCase() == "OK") {
                            cartUI.cartDiscountMsg.html(response.pageMessage);
                            cartUI.cartTotal.text(response.total);
                            this.cartPromoInput.next(".error-text").remove();
                        } else {
                            vaildateAPP.error(cartUI.cartPromoInput.parent(), response.msg);
                        }
                    },
                    error: function error(xhr) {
                        console.error(cartUI.errorMsgCart, xhr);
                    }
                });
            } else {
                vaildateAPP.error(this.cartPromoInput.parent(), this.errorMsgEmptyInput);
            }
        }
    }, {
        key: '_submitDiscountCode',
        value: function _submitDiscountCode() {
            var code = this.cartDiscountInput.val();
            if (code != '') {
                $.ajax({
                    url: this.cartDiscountSubmit.attr(this.cartDiscountSubmitUrlAttr),
                    method: 'get',
                    data: "discountcode=" + this.cartDiscountInput.val(),
                    dataType: 'json',
                    success: function success(response) {
                        if (response.status.toUpperCase() == "OK") {
                            cartUI.cartDiscountMsg.html(response.pageMessage);
                            cartUI.cartTotal.text(response.total);
                            this.cartDiscountInput.next(".error-text").remove();
                        } else {
                            vaildateAPP.error(cartUI.cartDiscountInput.parent(), response.msg);
                        }
                    },
                    error: function error(xhr) {
                        console.error(cartUI.errorMsgCart, xhr);
                    }
                });
            } else {
                vaildateAPP.error(this.cartDiscountInput.parent(), this.errorMsgEmptyInput);
            }
        }
    }, {
        key: '_cartSinc',
        value: function _cartSinc() {
            $.ajax({
                url: $('[' + this.cartSincUrlAttr + ']').attr(this.cartSincUrlAttr),
                method: 'get',
                data: "cart=" + JSON.stringify(this.cart),
                dataType: 'json',
                success: function success(response) {
                    cartUI.cart = response.cart;
                    if (varsAPP.supportStorage) localStorage.setItem('cart', JSON.stringify(cartUI.cart));
                },
                error: function error(xhr) {
                    console.error(cartUI.errorMsgCart, xhr);
                }
            });
        }
    }, {
        key: '_delInCart',
        value: function _delInCart(e) {
            var o = $(e).parents(this.cartRowSelector),
                goodId = o.attr(this.cartIdAttr),
                goodSize = o.attr(this.cartSizeAttr);

            // ajax
            var data = "action='delete'&goodId=" + goodId + "&size=" + goodSize;
            this._cartChange(data);

            // localStorage
            this._delCartStorage(goodId, goodSize);

            o.remove();
        }
    }, {
        key: '_numChangeInCart',
        value: function _numChangeInCart(e) {
            var num = $(e).val(),
                o = $(e).parents(this.cartRowSelector),
                goodId = o.attr(this.cartIdAttr),
                goodSize = o.attr(this.cartSizeAttr);

            o.attr(this.cartNumAttr, num);

            // ajax
            var data = "action='edit'&goodId=" + goodId + "&size=" + goodSize + "&num=" + num;
            this._cartChange(data);

            // localStorage
            this._editCartSrorage(goodId, goodSize, num);

            // recalc Price
            o.find('[' + this.cartCostAttr + ']').text(parseFloat(o.find('[' + this.cartPriceAttr + ']').text()) * num);
        }
    }, {
        key: '_sizeChangeInCart',
        value: function _sizeChangeInCart(e) {
            var size = $(e).val(),
                o = $(e).parents(this.cartRowSelector),
                goodId = o.attr(this.cartIdAttr),
                num = o.attr(this.cartNumAttr),
                oldSize = o.attr(this.cartSizeAttr);

            o.attr(this.cartSizeAttr, size);

            // удаляем
            var data = "action='delete'&goodId=" + goodId + "&size=" + oldSize;
            this._cartChange(data, false);

            //добавляем
            data = "action='add'&goodId=" + goodId + "&size=" + size + "&num=" + num;
            this._cartChange(data);

            // localStorage
            this._editCartSrorage(goodId, size, num);
        }
    }, {
        key: '_cartChange',
        value: function _cartChange(data) {
            var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var open = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            $.ajax({
                url: $('[' + this.cartUrlAttr + ']').attr(this.cartUrlAttr),
                method: 'get',
                data: data,
                dataType: 'json',
                success: function success(response) {
                    var _this = this;

                    if (refresh) {
                        cartUI.cartHeaderNum.text(response.kol);
                        cartUI.cartDiscountMsg.html(response.pageMessage);
                        cartUI.cartTotal.text(response.total);
                    }

                    // открываем попап при добавлении товара
                    if (open) {
                        cartUI.cartPopupOpen();
                        // автоматически закрываем окно корзины
                        setTimeout(function () {
                            return _this._cartPopupClose();
                        }, 2500);
                        //this.Timer = setTimeout(function() { this._cartPopupClose(); }, 2500);
                    }
                },
                error: function error(xhr) {
                    console.error(cartUI.errorMsgCart, xhr);
                }
            });
        }
    }, {
        key: '_addCartSrorage',
        value: function _addCartSrorage(id, size, num) {
            var find = this._findInCartStorage(id, size);

            if (find == -1) {
                // не найдено в корзине
                this.cart.push({ "id": id, "size": size, "count": 1 });
                if (varsAPP.supportStorage) localStorage.setItem('cart', JSON.stringify(this.cart));
            } else {
                // такой товар уже есть
                this.cart[find].count++;
                if (varsAPP.supportStorage) localStorage.setItem('cart', JSON.stringify(this.cart));
            }
            // Корзина перестала быть пустой. Если нужно, выставляем класс для иконки в шапке. Разблокируем попап.
            this.cartHeaderIcon.removeClass(this.cartHeaderEmptyClass);
        }
    }, {
        key: '_editCartSrorage',
        value: function _editCartSrorage(id, size, num) {
            var find = this._findInCartStorage(id, size);
            if (find != -1) {
                this.cart[find].count = parseInt(num);
                if (varsAPP.supportStorage) localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        }
    }, {
        key: '_delCartStorage',
        value: function _delCartStorage(id, size) {
            var find = this._findInCartStorage(id, size);
            if (find != -1) {
                this.cart.splice(find, 1);
                if (varsAPP.supportStorage) localStorage.setItem('cart', JSON.stringify(this.cart));
            }

            if (this.cart.length == 0) {
                // Корзина стала пустой (если нужно блокируем попап, добавляем класс для пустой корзины в шапке)
                this.cartEmptyMsg.text(this.cartEmptyMsg.attr(this.cartEmptyMsgAttr));
                this.cartEmptyHide.css('display', 'none');
                this.cartHeaderIcon.addClass(this.cartHeaderEmptyClass);

                // если находжимя на странице с корзиной, то ее виде немного должен измениться
                if (this.cartPageEl) {
                    this.cartPageEl.addClass(this.cartEmptyPageClass);
                }
            }
        }
    }, {
        key: '_findInCartStorage',
        value: function _findInCartStorage(id, size) {
            var find = -1;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id == id && this.cart[i].size == size) {
                    find = i;
                    break;
                }
            }
            return find;
        }
    }, {
        key: 'cartPopupOpen',
        value: function cartPopupOpen() {

            $.ajax({
                url: $('[' + this.cartPopupLoadAttr + ']').attr(this.cartPopupLoadAttr),
                method: 'get',
                dataType: 'json',
                success: function success(response) {

                    cartUI.cartPopupCont.html(response.htmlCode);

                    cartUI.cartPopup = new FrondevoPopup({
                        popupSelector: cartUI.cartPopupSelector,
                        overlayStatus: false
                    });

                    cartUI.cartPopupText.html(response.text);
                    cartUI.cartPopup.showPopup();

                    // если высота попапа больше высоты экрана
                    // добавляем внутренний скрол списку товаров в корзине
                    var cartPopupHeight = $(cartUI.cartPopupSelector).height() + 120;

                    if (varsAPP.viewport.device == 'desktop' && cartPopupHeight > varsAPP.viewport.height) {

                        var h = cartPopupHeight - varsAPP.viewport.height,
                            hListEl = $('.F-popup_cart-list').eq(0),
                            hlist = hListEl.height();
                        hListEl.css("height", hlist - h).addClass('F-popup_cart-list_long');
                    }
                },
                error: function error(xhr) {
                    console.error(cartUI.errorMsgCart, xhr);
                }
            });
        }
    }, {
        key: '_cartPopupClose',
        value: function _cartPopupClose() {

            if (cartUI.cartPopup && this.flagIsUnderCart == false) {
                cartUI.cartPopup.closePopup();
            }
        }
    }, {
        key: '_eventHandlersInit',
        value: function _eventHandlersInit() {
            var _this2 = this;

            this.cartEl.on('mouseenter', function () {
                return _this2._firedIfUnderCart();
            });
            this.cartEl.on('mouseleave', function () {
                _this2._firedIfLeaveCart();
            });
            this.cartEl.on('cursorLeaveCart', function (event) {
                // закрываем окно через какое-то время
                // для того чтобы успело заметить,
                // если пользователь повел мышь в сторону иконки корзины
                setTimeout(function () {
                    return _this2._cartPopupClose();
                }, 300);
            });

            this.cartHeaderIcon.on('mouseover', function (event) {

                // устанавливаем флаг "мы над корзиной" для ситуации
                // когда курсор идет с корзины в сторону иконки
                _this2._firedIfUnderCart();

                // показываем попап тольок если в корзине что-то есть
                // и если она еще не показана
                if (!_this2.cartHeaderIcon.hasClass(_this2.cartHeaderEmptyClass) && !_this2.cartEl.hasClass(_this2.cartOpenClass)) {
                    _this2.cartPopupOpen();
                }
            });

            this.cartHeaderIcon.on('mouseleave', function (event) {

                // сбрасываем флаг курсора над корзиной
                // который блы установлен при наведении на иконку
                _this2._firedIfLeaveCart();

                // закрываем окно через какое-то время
                // для того чтобы успело сработать событие 'мы над корзиной',
                // если пользователь повел мышь в сторону окна корзины
                setTimeout(function () {
                    return _this2._cartPopupClose();
                }, 300);
            });

            this.cartSizeCheck.on('click', function (event) {
                _this2._sizeCheck(event.target);
            });

            this.cartAddToFavoriteBtn.on('click', function (event) {
                _this2._addToFavorite(event.target);
            });

            this.cartLogoutAddToFavoriteBtn.on('click', function (event) {
                _this2._addToFavoriteLogout(event);
            });

            this.cartAddBtn.on('click', function (event) {
                _this2._addToCart(event.target);
            });

            this.cartItemDel.on('click', function (event) {
                _this2._delInCart(event.target);
            });

            this.cartNumInput.on('change', function (event) {
                _this2._numChangeInCart(event.target);
            });
            this.cartSizeInput.on('change', function (event) {
                _this2._sizeChangeInCart(event.target);
            });

            this.cartPromoSubmit.on('click', function (event) {
                _this2._submitPromoCode();
            });
            this.cartDiscountSubmit.on('click', function (event) {
                _this2._submitDiscountCode();
            });
        }
    }]);

    return FrondevoCartUI;
}();

var cartUI = new FrondevoCartUI();