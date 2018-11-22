<?php get_header(); ?>

    <?php do_action( 'omd_before_index_load' ); ?>

    <!-- <div class="address-helper" id="diah-widget"></div> -->

    <section class="article text-center">
        <div class="wrapper">
            <div class="flag">Bakat med<br>surdeg</div>
            <?php the_field( "settings_intro_text", SETTINGS_PAGE_ID ); ?>
        </div>
    </section>

    <section class="article article--bg-image text-center" style="background-image: url('<?php echo get_template_directory_uri() . '/assets/kardemummakopp.jpg'; ?>');">
        <div class="wrapper">
            <?php the_field( "settings_how_it_works", SETTINGS_PAGE_ID ); ?>
        </div>
    </section>

    <?php get_template_part('templates/steps'); ?>

    <?php get_template_part('templates/products'); ?>

    <div class="delivery-notice__wrapper">
        <div class="delivery-notice animated bounceInUp">

    <?php 
        global $isLayerEmpty;
        if($isLayerEmpty) :
    ?>
        <div><?php the_field( "settings_closed_message", SETTINGS_PAGE_ID ); ?></div>

        <span id="delivery-notice__close" class="fa fa-close"></span>

    <?php else : ?>

        <?php 
            date_default_timezone_set("Europe/Stockholm");  

            $isThursdayPast15 = 4 == date('w', strtotime('now -15 hours'));
            $isFriday = 5 == date('w', strtotime('now'));
            $thursday_string = 'torsdagen den ' . date('j/n', strtotime('next thursday'));

            if(!$isThursdayPast15 && 4 == date('w', strtotime('now'))) {
                $thursday_string = 'idag';
            }

            if($isThursdayPast15 || $isFriday) {
                $next_saturday = date('j/n', strtotime('next saturday + 1 week'));
            } else {
                $next_saturday = date('j/n', strtotime('next saturday'));
            }
        ?>
        
        <?php if( !empty( get_field( "settings_custom_popup", SETTINGS_PAGE_ID ) ) ) : ?>
            <div><?php the_field( "settings_custom_popup", SETTINGS_PAGE_ID ); ?></div>
        <?php else : ?>
            <div>Du som bor i Kinda, Mjölby, Motala, Vadstena och Linköpings kommun får brödet levererat lördagen den <?php echo $next_saturday; ?> om du beställer <strong>senast <?php echo $thursday_string; ?> kl.13.</strong></div>
        <?php endif; ?>
        
        <span id="delivery-notice__close" class="fa fa-close"></span>
         
    <?php endif; ?>

        </div>
    </div>

<?php get_footer(); ?>