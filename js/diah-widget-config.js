jQuery(document).ready(function($) {

    if(!getUrlVars()['thankyou']) {
        $('.klarna_checkout').hide();
    } else {
        $('#cart-count').html('0.');
        $('.cart-boxes').empty();
        $('.cart-box__empty').show();
        $('.woocommerce-Price-amount amount').html('0.00');
        $('.cart-info__checkout').addClass('cart-info__checkout--disabled');
    }

    if($('#diah-widget').length){

        YAHOO.util.Event.onDOMReady( function() {

            var config = {
                apiKey: 'KerT8ZU20Pkla3M8AoW2+jr0JKmgbC+T',
                country: 'SE',
                labels: {
                    street: 'Gata',
                    streetNumber: 'Nummer',
                    zip: 'Postnummer',
                    floor: 'Våning',
                    household: 'Lägenhet'
                },
                distributionSupport: {
                    product: 'BREAD',
                    customerSystem: 'BREAD',
                }, 
                useGeoLocation: false
            };
            var diah = new DI.AddressHelper('diah-widget', config);

            diah.productSupportEvent.subscribe(function(e, args) {
                var data = args[0];
                var address = diah.getSelectedAddress();
                if (data.hasSupport && !data.hasKeyDeviation) {

                    console.log('address helper data', 'success', address);

                    $('.adress-helper').css('border', '1px solid green');
                    $('.no-delivery-message').hide();
                    $('.klarna_checkout').show('fast', function() {
                        $('#klarna-checkout-iframe').css('height', 1200);
                    });
                    $('html, body').animate({
                        scrollTop: $('.klarna_checkout').offset().top - 150
                    }, 500);

                    var flatNo = '';
                    var floorNo = '';
                    if(address.household) {
                        flatNo = address.household.flatNo;
                    }
                    if(typeof address.floor === 'object' && address.floor !== null) {
                        floorNo = address.floor.floorNo;
                    }

                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: ajax.url,
                        data: {
                            action: 'address_helper',
                            city: address.street.city,
                            street: address.street.streetName,
                            streetNumber: address.streetNumber.streetNo,
                            streetEntrance: address.streetNumber.entrance,
                            postalCode: address.streetNumber.postalCode,
                            floorNo: address.floor.floorNo,
                            flatNo: flatNo
                        },
                        success: function(data) {
                            console.log('Adress Helper data sent', data);
                        },
                        error: function(error) {
                            console.log('error', error.responseText);
                        } 
                    });        
                } else {
                    console.log('address helper data', 'error', address);

                    $('.adress-helper').css('border', '1px solid red');
                    $('.klarna_checkout').hide();
                    $('.no-delivery-message').show();
                    $('html, body').animate({
                        scrollTop: $('.no-delivery-message').offset().top - 150
                    }, 500);
                }
            });

            // diah.selectionChangeEvent.subscribe(function() {

            //     var address = diah.getSelectedAddress();
            //     var complete = diah.isComplete();

            //     console.log(address);

            //     if(complete) {

            //         var streetName  = ( $('input.streetInput').val() == '' ) ? 'Unknown' :  $('input.streetInput').val();
            //         var streetNo    = ( $('input.streetNumberInput').val() == '' ) ? '0' : $('input.streetNumberInput').val();
            //         var city        = $('input.cityLabel').val();
            //         var postalCode  = $('input.zipLabel').val();


            //         $('.klarna_checkout').show();


            //         // if (typeof window._klarnaCheckout == 'function') {
            //         //     window._klarnaCheckout(function(api) {
            //         //         api.suspend();
            //         //     });
            //         // }

            //         // $.ajax(
            //         //     ajax.url,
            //         //     {
            //         //         type: 'POST',
            //         //         dataType: 'json',
            //         //         data: {
            //         //             action: 'address_update_klarna',
            //         //             streetName: streetName,
            //         //             streetNo: streetNo,
            //         //             city: city,
            //         //             postalCode: postalCode
            //         //         },
            //         //         success: function (response) {
            //         //             console.log( response);

            //         //             if (typeof window._klarnaCheckout == 'function') {
            //         //                 window._klarnaCheckout(function(api) {
            //         //                     api.resume();
            //         //                     console.log($("input[name=postal-code]"))
            //         //                     $("input[name=postal-code]").val(response.postcode);
            //         //                 });
            //         //             }
            //         //         },
            //         //         error: function ( response ) {
            //         //             console.log( response );
            //         //         }
            //         //     }
            //         // );

            //     }

            // });

        });   

    }

});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}