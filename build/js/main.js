
(function($) {
    console.log('test')

    // animation show elements ---------------------------------------------------------------------------------------

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    //usage $( '.class-name' ).animateCss('slideInDown');

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });

    // ymaps.ready(init);
    // var myMap,
    //     myPlacemark;
    //
    // function init(){
    //     myMap = new ymaps.Map("map", {
    //         center: [55.73680706898759,37.69215049999999],
    //         zoom: 16
    //     });
    //
    //     myPlacemark = new ymaps.Placemark([55.73680706898759,37.69215049999999], {
    //         hintContent: 'Москва!',
    //         balloonContent: 'Столица России'
    //     });
    //
    //     myMap.geoObjects.add(myPlacemark);
    // }

    function initMap() {
        var uluru = {lat: 37.69215049999999, lng: 55.73680706898759};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

})(jQuery);