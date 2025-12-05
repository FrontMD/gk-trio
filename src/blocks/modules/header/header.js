function headerScroll() {
    const header = $('[data-js="siteHeader"]');
    const initScroll = $(window).scrollTop();

    if(initScroll > 20) {
        header.addClass("site-header--fixed");
    }

    $(window).scroll(function() {
        const scroll = $(window).scrollTop();

        if(scroll > 40) {
            header.addClass("site-header--fixed");
        } else {
            header.removeClass("site-header--fixed");
        }
    });
}