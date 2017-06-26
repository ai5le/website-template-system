searchVisible = 0;
transparent = true;

// Add scrolling
$('.navbar a').addClass('page-scroll');


$(document).scroll(function() {
    if ($(this).scrollTop() > 260) {
        $('nav').addClass('navbar-inverse');
        $('nav').removeClass('navbar-transparent');
    }
});

$(document).scroll(function() {
    if ($(this).scrollTop() < 260) {
        $('nav').addClass('navbar-transparent');
        $('nav').removeClass('navbar-inverse');
    }
});