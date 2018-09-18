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