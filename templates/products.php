<?php
    global $woocommerce;
?>

<section class="products" id="produkter" style="background-image: url('<?php echo get_template_directory_uri() . '/assets/kardemummakopp.jpg'; ?>');">

        <h1 class="text-center text-outline">Välj &amp; Vraka</h1>

        <div class="products__container">

        <?php 
            $args = array(
                'post_type' => 'product',
                'posts_per_page' => -1,
                'orderby' => 'date',
                'order' => 'asc',
                'meta_query' => array(
                    array(
                        'key' => '_stock_status',
                        'value' => 'instock'
                    )
                )
            );

            $counts = $woocommerce->cart->get_cart_item_quantities();
            $cart_count = $woocommerce->cart->get_cart_contents_count();

            $loop = new WP_Query($args);
            if($loop->have_posts()) {
                global $isLayerEmpty;
                $isLayerEmpty = false;
                while($loop->have_posts()) : $loop->the_post();

                    global $product;
                    $price = $product->get_price_html();
                    $image = $product->get_image('medium');
                    $title = $product->get_title();
                ?>
                <?php if($title == 'Morgontidning') : ?>
                    <div class="product__container">
                        <div class="product" id="<?php echo $product->id; ?>">

                            <div class="product__image">
                                <?php echo $image; ?>
                            </div>

                            <h2 class="product__title"><?php the_title(); ?></h2>

                            <div class="product__price">- <?php echo $price; ?> -</div>

                            <div class="product__short">
                                <?php the_excerpt(); ?>
                            </div>

                            <div class="product__long animated">
                                <?php the_content(); ?>
                            </div>

                            <div class="product__info-trigger --long"><span class="fa fa-info-circle"></span></div>

                            <?php if($cart_count > 20) : ?>
                                <div class="product__button add-to-cart-button" id="paper-button">
                                    <span class="fa fa-shopping-basket animated"></span> Köp
                                </div>
                            <?php else : ?>
                                <div class="product__button product__button--inactive add-to-cart-button" id="paper-button">
                                    <span class="fa fa-shopping-basket animated"></span> Köp
                                </div>
                            <?php endif; ?>

                        </div>
                    </div>
                <?php else : ?>
                    <div class="product__container">
                        <div class="product" id="<?php echo $product->id; ?>">

                            <div class="product__image">
                                <?php echo $image; ?>
                            </div>

                            <h2 class="product__title"><?php the_title(); ?></h2>

                            <div class="product__price">- <?php echo $price; ?> -</div>

                            <div class="product__short">
                                <?php the_excerpt(); ?>
                            </div>

                            <div class="product__long animated">
                                <?php the_content(); ?>
                            </div>

                            <div class="product__info-trigger --long"><span class="fa fa-info-circle"></span></div>

                            <div class="product__button add-to-cart-button">
                                <span class="fa fa-shopping-basket animated"></span> Köp
                            </div>

                        </div>
                    </div>
                <?php endif; ?>

                <?php
                endwhile;
            } else {
                global $isLayerEmpty;
                $isLayerEmpty = true;
                
                ?>
                <h2 class="delivery-notice">Nu är beställningen för brödleverans till lördag stängd. Vänligen återkom om några timmar så öppnar vi upp för nästa veckas beställningar.</h2>

                <?php
            }
        ?>

        </div>

    </section>