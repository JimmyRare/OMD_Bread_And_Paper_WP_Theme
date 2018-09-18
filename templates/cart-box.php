<?php
    global $woocommerce;
 ?>


<div class="cart-boxes">

<?php
    $items = $woocommerce->cart->get_cart();
    foreach($items as $item => $values) :
        $product = wc_get_product($values['data']->get_id());
        $image = $product->get_image();
        $quantity = $values['quantity'];
        $price = $product->get_price();
        $total = $quantity * $price;
?>
<div class="cart-box animated" id="<?php echo $product->id; ?>">
    <h2><?php echo $product->get_title(); ?></h2>
    <div class="cart-box__upper">
        <div class="cart-box__image">
            <?php echo $image; ?>
        </div>
        <div class="cart-box__summary">
            <div class="cart-box__price">
                á <?php echo $price; ?>kr
            </div>
            <div class="counter">
                <span class="fa fa-minus counter__minus"></span>
                <span class="counter__value"><?php echo $quantity; ?></span>
                <span class="fa fa-plus counter__plus"></span>
            </div>
            <div class="cart-box__total">
                <?php echo $total; ?>kr totalt
            </div>
        </div>
    </div>
    <div class="cart-box__remove fa fa-trash-o"></div>
</div>

<?php endforeach; ?>

</div>