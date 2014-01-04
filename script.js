var calcTop = function (x, a, b) {
    var sqrt = Math.sqrt;
    function sqr(x) {
        return x*x;
    }
    return (b*sqr(1-(-2*b+sqrt(4*b*b + 4*(a-2*b)*x))/(2*(a-2*b))));
}

var scrollHandler = function(e) {
    var this_func = scrollHandler;
    var target = $('.aside');
    var original_target = target.get()[0];
    var scroll_top = document.body.scrollTop;
    var offset_top = parseInt(original_target.style.top);
    var original_top = this_func.original_top;
    var target_top;
    if (!original_top) {
        target_top = target.offset().top;
        original_top = target_top - offset_top;
        this_func.original_top = original_top;
        original_target.style.top = target.css('top');
    }
    else {
        target_top = original_top + offset_top;
    }
    if (target.hasClass('snapped')) {
        if (original_top - 200 > scroll_top) {
            original_target.style.top = '0';
            original_target.classList.remove('snapped');
            return;
        }
        if (original_top + 300 > scroll_top) {
            original_target.style.top =
                calcTop(scroll_top - (original_top - 200), 500, 200) + 'px';
        }
        else {
            original_target.style.top = '0';
        }
    }
    else {
        if (original_top - 200 <= scroll_top) {
            original_target.style.top =
                calcTop(scroll_top - (original_top - 200), 500, 200) + 'px';
            original_target.classList.add('snapped');
            return;
        }
    }
}

$(window).on('scroll', scrollHandler);
