<?php global $woocommerce ?>
<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    require_once( "config.php" );
?>
<!DOCTYPE html>
<html lang="en">
<head>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112115026-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-112115026-1');
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bread &amp; Paper</title>

    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/favicon-16x16.png">
    <link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/manifest.json">
    <meta name="theme-color" content="#ffffff">

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

    <header class="main-header">
        <ul class="main-menu__icons">
            <li class="logo" id="menu__logo--ronaldos"><img src="<?php echo get_template_directory_uri() . '/assets/ronaldos.png'; ?>" alt="Ronaldos"></li>
            <?php 
                if(is_page(393)) { // clear cart if its
                    $woocommerce->cart->empty_cart();
                }
                $cart_count = $woocommerce->cart->get_cart_contents_count();
                $disabled_cart_class = $cart_count < 1 ? 'cart-info__checkout--disabled' : '';

                $menu_items = wp_get_nav_menu_items('huvudmeny'); 
                foreach($menu_items as $item)  : 
            ?>
                    <li class="no-mobile"><a href="<?php echo $item->url; ?>"><?php echo $item->title; ?></a></li>
                <?php endforeach; ?>
            <li>
                <div class="cart-info">
                    <div id="cart-menu-trigger">
                        <span class="cart-info__symbol fa fa-shopping-basket animated"></span>
                        <div class="cart-info__count circle-number animated" id="cart-count"><?php echo $woocommerce->cart->cart_contents_count; ?>.</div>
                        <div class="cart-info__sum animated"><?php echo $woocommerce->cart->get_cart_total(); ?></div>
                    </div>
                    <div class="cart-info__checkout <?php echo $disabled_cart_class; ?>"><a href="<?php echo $woocommerce->cart->get_checkout_url(); ?>">Kassan</a></div>
                </div>
            </li>
            <li>
                <div id="menu-trigger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </li>
        </ul>
        <ul class="main-menu mobile">
            <?php 
                $menu_items = wp_get_nav_menu_items('huvudmeny'); 
                foreach($menu_items as $item)  : 
            ?>
            <li><a href="<?php echo $item->url; ?>"><?php echo $item->title; ?></a></li>
        <?php endforeach; ?>          
        </ul>
    </header>
    
    <section class="top-image">
        <div class="logo-box">
            <img class="logo logo--bread" src="<?php echo get_template_directory_uri() . '/assets/breadpaper_vit-01.png'; ?>" alt="Logotyp">
            <img class="logo logo--ronaldos" src="<?php echo get_template_directory_uri() . '/assets/ronaldos_vit-01.png'; ?>" alt="Logotyp">
        </div>
        <img class="bg-image bg-image--desktop" src="<?php echo get_template_directory_uri() . '/assets/top-image.jpg'; ?>" alt="Bröd och Papper">
        <img class="bg-image bg-image--mobile" src="<?php echo get_template_directory_uri() . '/assets/top-image-rotated.jpg'; ?>" alt="Bröd och Papper">
    </section>

    <aside class="cart-menu">
        <div class="scroll-wrap">

            <div class="cart-menu__close"><span class="fa fa-close"></span></div>

            <div class="cart-box__empty <?php echo $woocommerce->cart->get_cart_contents_count() < 1 ? '' : 'hidden'; ?>">Här var det tomt.</div>

            <?php get_template_part('templates/cart', 'box'); ?>

            <ul class="cart__summary">
                <li><span class="fa fa-truck"></span> 0kr</li>
                <li>Totalt: <?php echo $woocommerce->cart->get_cart_total(); ?></li>
            </ul>

            <a href="<?php echo $woocommerce->cart->get_checkout_url(); ?>" class="cart__checkout-button animated">Kassan</a>

        </div>
    </aside>