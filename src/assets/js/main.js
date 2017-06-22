// Add scrolling
$('.navbar a').addClass('page-scroll');



$(window).scroll(function(e) {
    oVal = ($(window).scrollTop() / 170);
    $(".blur").css("opacity", oVal);

});