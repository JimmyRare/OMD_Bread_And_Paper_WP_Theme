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