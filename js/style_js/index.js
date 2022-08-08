$(window).scroll(function () {
    const
        a = $(this).scrollTop(),
        b = 400,
        t = window.pageYOffset;

    $(".parallax").css('transform', 'translate(-' + a / 1.6 + 'px, -' + 1 - a / b + 'px)');

    $(".one").css('bottom', -(t * 0.3) + 'px');
    $(".two").css('bottom', -(t * 0.4) + 'px');
    $(".three").css('bottom', -(t * 0.5) + 'px');
    $(".four").css('bottom', -(t * 0.6) + 'px');
    $(".five").css('bottom', -(t * 0.7) + 'px');
});

$("header").on('mousemove', e => {
    const cx = $(window).width() / 2,
        cy = $(window).height() / 2,
        x = (cx - e.pageX) / cx * 2,
        y = (cy - e.pageY) / cy * 2;
    $(".two").css('transform', `translate(${x}px, ${y}px)`);
    $(".four").css('transform', `translate(-${x}px, ${y}px)`);
    $(".five").css('transform', `translate(${x}px, -${y}px)`);
});