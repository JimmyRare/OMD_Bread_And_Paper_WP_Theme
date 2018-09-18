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