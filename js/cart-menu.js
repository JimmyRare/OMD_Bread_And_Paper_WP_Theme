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