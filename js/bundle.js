/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animate_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animate_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__animate_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__cart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_menu__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__cart_menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__product_info__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__product_info___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__product_info__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__diah_widget_config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__diah_widget_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__diah_widget_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__delivery_notice_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__delivery_notice_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__delivery_notice_js__);









/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

jQuery(document).ready(function($) {

    // Simple plugin to handle animations better.
    $.fn.extend({
        animateCss: function (animationName, showOrHide) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
            return this;
        }
    });

});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

jQuery(document).ready(function($) {

    // TODO: Remove duplication

    // Add to cart (start page)
    $('.add-to-cart-button').on('click', function(e) {
        e.preventDefault();
        var checkout = isCheckoutPage();
        var id = $(this).parents('.product').attr('id');
        var $value = $('#' + id).find('.counter__value');
        var $cartSymbol = $('.cart-info__symbol');
        var $cartNumber = $('#cart-count');
        var $buttonCartSymbol = $(this).find('.fa-shopping-basket');
        var $cartSum = $('.cart-info__sum');
        $('.loading-box').addClass('fadeIn');

        $value.html('<span class="fa fa-spinner fa-spin"></span>');

        var cartSummaryEl = $('.cart__summary').find('li').last();

        $cartSymbol.addClass('rubberBand');
        $cartNumber.addClass('jello');
        $buttonCartSymbol.addClass('rubberBand');
        $cartSum.addClass('jello');

        $.ajax({
            type: 'post',
            dataType: 'json',
            url: ajax.url,
            data: {
                action: 'add_to_cart',
                id: id,
                checkout: checkout
            },
            success: function(cart) {
                needTemplate = true;

                // Check if id is already in cart
                if($('.cart-box').length) {
                    $boxes = $('.cart-box');
                    $boxes.each(function(i) {
                        if(id === $(this).attr('id')) {
                            console.log('no template')
                            needTemplate = false;
                        }
                    });
                }

                if(needTemplate || !needTemplate) { // Simpler to always re-render?
                    $('.cart-menu').find('.cart-boxes').empty();
                    $('.cart-menu').find('.cart-boxes').append(cart.html);
                }

                $value.html(cart.counts[id]);
                $cartNumber.html(cart.count + '.');
                $cartSum.html(cart.total);

                cartSummaryEl.html('Totalt: ' + cart.total);

                setTimeout(function() { // let animation finish
                    $cartSymbol.removeClass('rubberBand');
                    $cartNumber.removeClass('jello');
                    $buttonCartSymbol.removeClass('rubberBand');
                    $cartSum.removeClass('jello');
                }, 1000);

                if(cart.count == 0) {
                    $('.cart-box__empty').show();
                    $('.cart-info__checkout').addClass('cart-info__checkout--disabled');
                    $('.cart__checkout-button').addClass('disabled');
                    $('#paper-button').addClass('product__button--inactive');
                } else {
                    $('.cart-box__empty').hide();
                    $('.cart-info__checkout').removeClass('cart-info__checkout--disabled');
                    $('.cart__checkout-button').removeClass('disabled');
                    $('#paper-button').removeClass('product__button--inactive');
                }
            }
        });
    });

    // Counter add to cart (cart page)
    $('.cart-menu').on('click', '.counter__plus', function(e) {
        var setup = beforeCartAjax($(this));
   
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: ajax.url,
            data: {
                action: 'add_to_cart',
                id: setup.id,
                checkout: setup.checkout
            },
            success: function(cart) {
                afterCartAjaxSuccess(cart, setup);
            }
        });
    });

    // Counter lower cart item (cart page)
    // TODO: Better logic
    $('.cart-menu').on('click', '.counter__minus', function(e) {
        var setup = beforeCartAjax($(this));

        $.ajax({
            type: 'post',
            dataType: 'json',
            url: ajax.url,
            data: {
                action: 'lower_cart_item',
                id: setup.id,
                checkout: setup.checkout
            },
            success: function(cart) {
                if(cart.counts[setup.id] === undefined) {
                    setup.box.addClass('bounceOutLeft');
                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: ajax.url,
                        data: {
                            action: 'remove_cart_item',
                            id: setup.id,
                            checkout: setup.checkout
                        },
                        success: function(cart) {
                            afterCartAjaxRemoved(cart, setup);
                        }
                    });
                } else {
                    afterCartAjaxSuccess(cart, setup);
                }
            }
        });
    });

    // Remove item from cart
    $('.cart-menu').on('click', '.cart-box__remove', function(e) {
        var setup = beforeCartAjax($(this));
        setup.box.addClass('bounceOutLeft');
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: ajax.url,
            data: {
                action: 'remove_cart_item',
                id: setup.id,
                checkout: setup.checkout
            },
            success: function(cart) {
                afterCartAjaxRemoved(cart, setup);
            }
        });
    });

    // el is jQuery element
    function beforeCartAjax(el) {
        var box = el.parents('.cart-box');
        var id = box.attr('id');
        var valueEl = el.parents('.counter').find('.counter__value');
       
        var cartSummaryEl = $('.cart__summary').find('li').last();
        var cartSymbolEl = $('.cart-info__symbol');
        var cartNumberEl = $('#cart-count');
        var cartSumEl = $('.cart-info__sum');

        var checkout = isCheckoutPage();

        valueEl.html('<span class="fa fa-spinner fa-spin"></span>');

        cartSymbolEl.addClass('rubberBand');
        cartNumberEl.addClass('jello');
        cartSumEl.addClass('jello');

        if (typeof window._klarnaCheckout == 'function') {
            window._klarnaCheckout(function(api) {
                api.suspend();
            });
        }

        return {
            id: id,
            valueEl: valueEl,
            cartSummaryEl: cartSummaryEl,
            cartSymbolEl: cartSymbolEl,
            cartNumberEl: cartNumberEl,
            cartSumEl: cartSumEl,
            box: box,
            checkout: checkout
        };
    }

    function afterCartAjaxSuccess(cart, setup) {
        var $price = setup.box.find('.cart-box__price');
        var $priceTotal = setup.box.find('.cart-box__total');
        var total = (cart.price * cart.counts[setup.id]);

        console.log('res', cart);

        $price.html('á ' + cart.price + ' kr');
        $priceTotal.html(total + ' kr totalt');

        cleanCartHtml(cart, setup);
    }

    function afterCartAjaxRemoved(cart, setup) {
        console.log('res', cart, setup);
        setTimeout(function() {
            setup.box.remove();
        }, 1000);

        cleanCartHtml(cart, setup);
    }

    function cleanCartHtml(cart, setup) {
        setup.valueEl.html(cart.counts[setup.id]);        
        setup.cartSummaryEl.html('Totalt: ' + cart.total);
        setup.cartNumberEl.html(cart.count + '.'); 
        setup.cartSumEl.html(cart.total);        
        
        setTimeout(function() {
            setup.cartSymbolEl.removeClass('rubberBand');
            setup.cartNumberEl.removeClass('jello');
            setup.cartSumEl.removeClass('jello');
        }, 1000);

        if(cart.count == 0) {
            $('.cart-box__empty').show();
            $('.cart-info__checkout').addClass('cart-info__checkout--disabled');
            $('.cart__checkout-button').addClass('disabled');
            $('#paper-button').addClass('product__button--inactive');
        } else {
            $('.cart-box__empty').hide();
            $('.cart-info__checkout').removeClass('cart-info__checkout--disabled');
            $('.cart__checkout-button').removeClass('disabled');
            $('#paper-button').removeClass('product__button--inactive');
        }

        if (typeof window._klarnaCheckout == 'function') {
            window._klarnaCheckout(function(api) {
                api.resume();
            });
        }
    }

    function isCheckoutPage() {
        return $('.woocommerce-checkout').length ? true : false;
    }

});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

jQuery(document).ready(function($) {
    
    // Cart Menu
    var cartMenuTrigger = $('#cart-menu-trigger');
    var cartMenu = $('.cart-menu');
    var cartMenuClose = $('.cart-menu__close .fa');
    var buyButton = $('.add-to-cart-button');
    var checkoutButton = $('.cart__checkout-button');

    cartMenuTrigger.on('click', function(e) {
        e.stopPropagation();
        cartMenu.toggleClass('open');
        setTimeout(function() {
            checkoutButton.toggleClass('show slideInUp');
        }, 1000);

        if($('.cart-box').length) {
            checkoutButton.removeClass('disabled');
        } else {
            checkoutButton.addClass('disabled');
        }
    });

    cartMenu.on('click', function(e) {
        e.stopPropagation();
    });

    buyButton.on('click', function(e) {
        e.stopPropagation();
    });

    cartMenuClose.on('click', function() {
        cartMenu.removeClass('open');
        checkoutButton.removeClass('show slideInUp');
    });

    $(document).on('click', function() {
        cartMenu.removeClass('open');
        checkoutButton.removeClass('show slideInUp');
    });

    
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

jQuery(document).ready(function($) {
    
    // Menu
    var menuTrigger = $('#menu-trigger');
    var mainMenu = $('.main-menu');

    menuTrigger.on('click', function(e) {
        e.stopPropagation();
        menuTrigger.toggleClass('close');
        mainMenu.toggleClass('open');
    });

    mainMenu.on('click', function(e) {
        e.stopPropagation();
    });

    $(document).on('click', function() {
        menuTrigger.removeClass('close');
        mainMenu.removeClass('open');
    });

    $(document).scroll(function() {
        var ronaldosLogo = $('#menu__logo--ronaldos');
        var opacity = $(document).scrollTop() / 100 / 3;
        ronaldosLogo.css('opacity', opacity);
    });
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

jQuery(document).ready(function($) {
    
    $('.product__info-trigger.--long').on('click', function(e) { return onInfoTriggerClick(e, $(this), 'long') });

    $(document).on('click', function() {
        $('.product__long').each(function() {
            if($(this).css('opacity') == 1) {
                closeInfoBox($(this));
            }
        });

        $('.product__info-trigger').each(function() {
            $(this).removeClass('--selected');
        });
    });

    function onInfoTriggerClick(e, button, type) {
        e.stopPropagation();

        var box = button.parents('.product').find('.product__' + type);

        button.toggleClass('--selected');
        
        if(button.hasClass('--selected')) { // show
            showInfoBox(box);
        } else {                            // close
            closeInfoBox(box);
        }
    }

    function closeInfoBox(box) {
        box.animateCss('fadeOutDown');
        box.css('opacity', 0);
    }

    function showInfoBox(box) {
        box.css({
            'opacity': 1
        });
        box.animateCss('fadeInUp');
    }
    
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

jQuery(document).ready(function($) {

    if(!getUrlVars()['thankyou']) {
        $('.klarna_checkout').hide();
    } else {
        $('#cart-count').html('0.');
        $('.cart-boxes').empty();
        $('.cart-box__empty').show();
        $('.woocommerce-Price-amount amount').html('0.00');
        $('.cart-info__checkout').addClass('cart-info__checkout--disabled');
    }

    if($('#diah-widget').length){

        YAHOO.util.Event.onDOMReady( function() {

            var config = {
                apiKey: 'KerT8ZU20Pkla3M8AoW2+jr0JKmgbC+T',
                country: 'SE',
                labels: {
                    street: 'Gata',
                    streetNumber: 'Nummer',
                    zip: 'Postnummer',
                    floor: 'Våning',
                    household: 'Lägenhet'
                },
                distributionSupport: {
                    product: 'BREAD',
                    customerSystem: 'BREAD',
                }, 
                useGeoLocation: true
            };
            var diah = new DI.AddressHelper('diah-widget', config);

            diah.productSupportEvent.subscribe(function(e, args) {
                var data = args[0];
                var address = diah.getSelectedAddress();
                if (data.hasSupport && !data.hasKeyDeviation) {

                    console.log('address helper data', 'success', address);

                    $('.adress-helper').css('border', '1px solid green');
                    $('.no-delivery-message').hide();
                    $('.klarna_checkout').show('fast', function() {
                        $('#klarna-checkout-iframe').css('height', 1200);
                    });
                    $('html, body').animate({
                        scrollTop: $('.klarna_checkout').offset().top - 150
                    }, 500);

                    var flatNo = '';
                    var floorNo = '';
                    if(address.household) {
                        flatNo = address.household.flatNo;
                    }
                    if(typeof address.floor === 'object' && address.floor !== null) {
                        floorNo = address.floor.floorNo;
                    }

                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: ajax.url,
                        data: {
                            action: 'address_helper',
                            city: address.street.city,
                            street: address.street.streetName,
                            streetNumber: address.streetNumber.streetNo,
                            streetEntrance: address.streetNumber.entrance,
                            postalCode: address.streetNumber.postalCode,
                            floorNo: floorNo,
                            flatNo: flatNo
                        },
                        success: function(data) {
                            console.log('Adress Helper data sent', data);
                        },
                        error: function(error) {
                            console.log('error', error.responseText);
                        } 
                    });        
                } else {
                    console.log('address helper data', 'error', address);

                    $('.adress-helper').css('border', '1px solid red');
                    $('.klarna_checkout').hide();
                    $('.no-delivery-message').show();
                    $('html, body').animate({
                        scrollTop: $('.no-delivery-message').offset().top - 150
                    }, 500);
                }
            });

            // diah.selectionChangeEvent.subscribe(function() {

            //     var address = diah.getSelectedAddress();
            //     var complete = diah.isComplete();

            //     console.log(address);

            //     if(complete) {

            //         var streetName  = ( $('input.streetInput').val() == '' ) ? 'Unknown' :  $('input.streetInput').val();
            //         var streetNo    = ( $('input.streetNumberInput').val() == '' ) ? '0' : $('input.streetNumberInput').val();
            //         var city        = $('input.cityLabel').val();
            //         var postalCode  = $('input.zipLabel').val();


            //         $('.klarna_checkout').show();


            //         // if (typeof window._klarnaCheckout == 'function') {
            //         //     window._klarnaCheckout(function(api) {
            //         //         api.suspend();
            //         //     });
            //         // }

            //         // $.ajax(
            //         //     ajax.url,
            //         //     {
            //         //         type: 'POST',
            //         //         dataType: 'json',
            //         //         data: {
            //         //             action: 'address_update_klarna',
            //         //             streetName: streetName,
            //         //             streetNo: streetNo,
            //         //             city: city,
            //         //             postalCode: postalCode
            //         //         },
            //         //         success: function (response) {
            //         //             console.log( response);

            //         //             if (typeof window._klarnaCheckout == 'function') {
            //         //                 window._klarnaCheckout(function(api) {
            //         //                     api.resume();
            //         //                     console.log($("input[name=postal-code]"))
            //         //                     $("input[name=postal-code]").val(response.postcode);
            //         //                 });
            //         //             }
            //         //         },
            //         //         error: function ( response ) {
            //         //             console.log( response );
            //         //         }
            //         //     }
            //         // );

            //     }

            // });

        });   

    }

});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

jQuery(document).ready(function($) {
    $('#delivery-notice__close').on('click', function() {
        $('.delivery-notice').fadeOut();
    });
});

/***/ })
/******/ ]);