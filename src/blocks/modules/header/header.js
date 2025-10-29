/*function headerScroll() {
    const header = $('[data-js="siteHeader"]');
    const initScroll = $(window).scrollTop();

    if(initScroll > 50) {
        header.addClass("site-header--fixed");
    }

    $(window).scroll(function() {
        const scroll = $(window).scrollTop();

        if(scroll > 110) {
            header.addClass("site-header--fixed");
        } else {
            header.removeClass("site-header--fixed");
        }
    });
}*/

/*function headerMenu() {
    const siteHeaderMenu = document.querySelector('[data-js="siteHeaderMenu"]')
    const headerMenuBtns = document.querySelectorAll('[data-js="headerMenuBtn"]')

    if(!siteHeaderMenu || headerMenuBtns.length < 1) return

    const headerOverlay = document.querySelector('[data-js="headerOverlay"]')
    const siteHeaderMenuItems = siteHeaderMenu.querySelectorAll('[data-js="multiMenu"]')

    
    headerMenuBtns.forEach(headerMenuBtn => {
        headerMenuBtn.addEventListener('click', (e) => {

            e.preventDefault()
            e.stopPropagation()

            let clickedBtn = e.target.closest('[data-js="headerMenuBtn"]')

            if(clickedBtn.classList.contains('active')) {
                unlockBody()
                clickedBtn.classList.remove('active');
                siteHeaderMenu.classList.remove('active');
                headerOverlay.classList.remove('active')

                siteHeaderMenuItems.forEach(item => {
                    item.classList.remove('active')
                })

            } else {
                let targetMenuItem = siteHeaderMenu.querySelector(`[data-js="multiMenu"][data-id="${clickedBtn.dataset.menu}"]`)

                if(!targetMenuItem) return

                lockBody()

                headerMenuBtns.forEach(item => {
                    item.classList.remove('active')
                })
                
                clickedBtn.classList.add('active');

                siteHeaderMenuItems.forEach(item => {
                    item.classList.remove('active')
                })

                targetMenuItem.classList.add('active');
                siteHeaderMenu.classList.add('active');
                headerOverlay.classList.add('active')
            }

        })
    })

    headerOverlay.addEventListener('click', () => {
        unlockBody()
        siteHeaderMenu.classList.remove('active');
        headerOverlay.classList.remove('active')

        siteHeaderMenuItems.forEach(item => {
            item.classList.remove('active')
        })

        headerMenuBtns.forEach(item => {
            item.classList.remove('active')
        })
    })
}*/