<?php get_header(); ?>

    <?php if(!isset($_GET['thankyou'])) : ?>
        <div class="adress-helper-info">
            <?php the_field( "settings_address_helper_text", SETTINGS_PAGE_ID ); ?>
        </div>
        <div class="adress-helper" id="diah-widget"></div>
        <div class="no-delivery-message">
            Tyvärr levererar vi inte ännu till den adress du angett.
        </div>
    <?php endif; ?>

    <?php 
        if(have_posts()) :
            while(have_posts()) : the_post();
    ?>
                <section><?php the_content(); ?></section>
    <?php endwhile; endif; ?>

<?php get_footer(); ?>