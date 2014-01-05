(function ($) {
    $.fn.smoothSnap = function (options) {
        var _this = this;
        options = $.extend({
            start: 200,
            distance: 500
        }, options);

        // Calculate the y-coordinate of the bezier curve: P1(0, b), P2(b, 0), P3(a, 0)
        var calcTop = function (x, a, b) {
            var sqrt = Math.sqrt;
            function sqr(x) {
                return x*x;
            }
            return (b*sqr(1-(-2*b+sqrt(4*b*b + 4*(a-2*b)*x))/(2*(a-2*b))));
        }

        // handler of the Scroll event of the window
        var scrollHandler = function() {
            // target of the snap
            var target = _this;

            // cache the scrollTop of the body
            var scroll_top = document.body.scrollTop || document.documentElement.scrollTop;

            // cache of the current top value
            var offset_top = parseInt(target.css('top'));

            // original top when item is not snapped
            var original_top = scrollHandler.original_top;

            // current target top
            var target_top;

            // cache of options to fasten the code
            var start = options.start;
            var distance = options.distance;

            // assumed it is the first time that THIS handler is called
            if (!original_top) {
                target_top = target.offset().top;
                original_top = target_top - offset_top;
                scrollHandler.original_top = original_top;
            }
            else {
                target_top = original_top + offset_top;
            }

            // if is snapped
            if (target.css('position') === 'fixed') {
                if (original_top - start > scroll_top) {
                    target.css({
                        top: 0,
                        position: 'relative'
                    });
                    return;
                }
                if (original_top + distance -start > scroll_top) {
                    target.css('top',
                        calcTop(scroll_top - (original_top - start),
                                distance, start) + 'px');
                }
                else {
                    target.css('top', '0');
                }
            }
            else {
                if (original_top - start <= scroll_top) {
                    target.css({
                        position: 'fixed',
                        top: calcTop(scroll_top - (original_top - start),
                                distance, start) + 'px'
                    });
                    return;
                }
            }
        }

        // For IE
        $(window).scroll(scrollHandler);

        return this;
    }
}) (jQuery);
