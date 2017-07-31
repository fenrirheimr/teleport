
(function($) {
    "use strict";

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


    // smooth page scroll ----------------------------------------------------------------------------------------------

    $.event.props.push("wheelDelta");
    $.easing.easeOutQuint = function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };

    var docH = $(document).height() - $(window).height(),
        scrollTop = $(window).scrollTop();

    $(document).on("DOMMouseScroll mousewheel", function (e, delta) {

        // clamp the scroll offset
        scrollTop = Math.min(docH, Math.max(0, scrollTop - (delta || e.wheelDelta)));

        $("body, html").stop().animate({
            scrollTop: scrollTop
        }, 1000, "easeOutQuint");

        e.preventDefault();
    });


})(jQuery);











