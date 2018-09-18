<?php session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

global $isLayerEmpty;
$isLayerEmpty = false;

// hide that bar yo
add_filter('show_admin_bar', '__return_false');

// allowed origins
add_filter('allowed_http_origins', 'add_allowed_origins');

// add charset to diah
add_filter('script_loader_tag', function($tag, $handler) {
    if('diahjs' !== $handler) {
        return $tag;
    }
    return str_replace(' src', ' charset="utf-8" src', $tag);
}, 10, 2);

function add_allowed_origins() {
    $origins[] = 'https://breadandpaper.omdtest.se';
    $origins[] = 'https://breadandpaper.se';
    $origins[] = 'https://di.no';

    return $origins;
}

function omd_bread_and_paper_scripts() {
    wp_enqueue_script('fontawesomse', 'https://use.fontawesome.com/bf61c56c8d.js');
    wp_enqueue_script('diahjs', 'https://di.no/addresshelper/diah.js', array('jquery'), false, true);
    wp_enqueue_script('bundlejs', get_template_directory_uri() . '/js/bundle.js', array('jquery', 'diahjs'), false, true);
    wp_localize_script('bundlejs', 'ajax', array('url' => admin_url('admin-ajax.php')));
}
add_action('wp_enqueue_scripts', 'omd_bread_and_paper_scripts');

function omd_bread_and_paper_styles() {
    wp_enqueue_style('maincss', get_template_directory_uri() . '/main.css');
    wp_enqueue_style('googlefonts', 'https://fonts.googleapis.com/css?family=Amatic+SC|Open+Sans|PT+Sans+Caption');
    wp_enqueue_style('diahcss', 'https://di.no/addresshelper/diah.css');
}
add_action('wp_enqueue_scripts', 'omd_bread_and_paper_styles');

// Menu
function register_the_menu() {
    register_nav_menu('header_menu', __('Huvudmeny'));
}
add_action('init', 'register_the_menu');

// Add to cart ajax
add_action('wp_ajax_add_to_cart', 'add_to_cart');
add_action('wp_ajax_nopriv_add_to_cart', 'add_to_cart');

function add_to_cart() {

    global $woocommerce;

    $woocommerce->cart->add_to_cart($_REQUEST['id']);

    if($_REQUEST['checkout'] == 'true') {
        update_klarna();
    }

    // Cart update
    $id = $_REQUEST['id'];
    if(!empty($_REQUEST['template'])) {
        $template = $_REQUEST['template'];
    } else {
        $template = '';
    }
    $count = $woocommerce->cart->get_cart_contents_count();
    $counts = $woocommerce->cart->get_cart_item_quantities();
    $total = $woocommerce->cart->get_cart_total();

    $product = wc_get_product($id);
    $price = $product->get_price();

    $html = load_template_part('templates/cart', 'box');

    $cart = array(
        'id' => $id,
        'count' => $count,
        'counts' => $counts,
        'price' => $price,
        'total' => $total,
        'html' => $html
    );

    echo json_encode($cart);

    die();

}

// Lower cart item ajax
add_action('wp_ajax_lower_cart_item', 'lower_cart_item');
add_action('wp_ajax_nopriv_lower_cart_item', 'lower_cart_item');

function lower_cart_item() {

    global $woocommerce;

    $id = $_REQUEST['id'];
    $counts = $woocommerce->cart->get_cart_item_quantities();
    
    foreach($woocommerce->cart->get_cart() as $key => $item) {
        if($item['product_id'] == $id) {
            $woocommerce->cart->set_quantity($key, $counts[$id] -1);        
        }
    }
    
    if($_REQUEST['checkout'] == 'true') {
        update_klarna();
    }

    $count = $woocommerce->cart->get_cart_contents_count();
    $counts = $woocommerce->cart->get_cart_item_quantities();

    $product = wc_get_product($id);
    $price = $product->get_price();
    $total = $woocommerce->cart->get_cart_total();

    $html = load_template_part('templates/cart', 'box');

    $cart = array(
        'id' => $id,
        'count' => $count,
        'counts' => $counts,
        'price' => $price,
        'total' => $total,
        'html' => $html
    );

    echo json_encode($cart);

    die();

}

// Remove cart item ajax
add_action('wp_ajax_remove_cart_item', 'remove_cart_item');
add_action('wp_ajax_nopriv_remove_cart_item', 'remove_cart_item');

function remove_cart_item() {

    global $woocommerce;

    $id = $_REQUEST['id'];
    $counts = $woocommerce->cart->get_cart_item_quantities();
    
    foreach($woocommerce->cart->get_cart() as $key => $item) {
        if($item['product_id'] == $id) {
            $woocommerce->cart->set_quantity($key, 0);        
        }
    }

    if($_REQUEST['checkout'] == 'true') {
        update_klarna();
    }

    $count = $woocommerce->cart->get_cart_contents_count();
    $counts = $woocommerce->cart->get_cart_item_quantities();

    $product = wc_get_product($id);
    $price = $product->get_price();
    $total = $woocommerce->cart->get_cart_total();

    $html = load_template_part('templates/cart', 'box');

    $cart = array(
        'id' => $id,
        'count' => $count,
        'counts' => $counts,
        'price' => $price,
        'total' => $total,
        'html' => $html
    );

    echo json_encode($cart);

    die();

}

function load_template_part($template_name, $part_name=null) {
    ob_start();
    get_template_part($template_name, $part_name);
    $var = ob_get_contents();
    ob_end_clean();
    return $var;
}

function update_klarna() {

        global $woocommerce;
    
        // Klarna update
        $klarna_checkout = new WC_Gateway_Klarna_Checkout;
        $klarna_checkout->update_or_create_local_order();

        if ( $woocommerce->session->get( 'ongoing_klarna_order' ) ) {
            wp_delete_post( $woocommerce->session->get( 'ongoing_klarna_order' ) );
            $woocommerce->session->__unset( 'ongoing_klarna_order' );
        }

        if ( WC()->session->get( 'klarna_checkout' ) ) {
            $klarna_checkout->ajax_update_klarna_order();
        }
    

}

add_action('wp_ajax_address_update_klarna', 'address_update_klarna_ajax');
add_action('wp_ajax_nopriv_address_update_klarna', 'address_update_klarna_ajax');
function address_update_klarna_ajax(){

    global $woocommerce;
    
    $streetName = htmlspecialchars( $_POST['streetName'] );
    $city       = htmlspecialchars( $_POST['city'] );
    $streetNo   = htmlspecialchars( $_POST['streetNo'] );
    $postalCode = htmlspecialchars( $_POST['postalCode'] );

    $order_id = $woocommerce->session->get('ongoing_klarna_order');
    $order = new WC_Order($order_id);

    $address = array(
        'address_1'  => $streetName . ', ' . $streetNo,
        'city'       => $city,
        'postcode'   => $postalCode,
        'country'    => 'SE',
    );

    $order->set_address( $address, 'shipping' ); 

    $klarna_checkout = new WC_Gateway_Klarna_Checkout;
    $klarna_checkout->update_or_create_local_order();

    echo json_encode($address);

    wp_die();
}

?>