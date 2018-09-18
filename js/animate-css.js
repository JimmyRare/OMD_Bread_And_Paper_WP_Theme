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