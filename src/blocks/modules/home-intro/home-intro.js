function homeIntro() {
    const homeIntro = document.querySelector('[data-js="homeIntro"]');

    if(!homeIntro) return

    const homeIntroContainer = homeIntro.querySelector('.home-intro__container')
    const ww = window.innerWidth

    if(ww < 500) {
        homeIntroContainer.style.height = homeIntroContainer.offsetHeight + 'px'
    }

    const homeIntroSlider = homeIntro.querySelector('[data-js="homeIntroSlider"]');
    const homeIntroTabs = homeIntro.querySelector('[data-js="homeIntroTabs"]');
    const slidesCounter = homeIntroTabs.querySelectorAll('.swiper-slide').length;
    const homeIntroInfoSlider = homeIntro.querySelector('[data-js="homeIntroInfoSlider"]');

    const homeIntroTabsEx = new Swiper(homeIntroTabs, {
        slidesPerView: slidesCounter,
        spaceBetween: 10,
    })

    const homeIntroInfoSliderEx = new Swiper(homeIntroInfoSlider, {
        slidesPerView: 1,
        allowTouchMove: false,
        effect: 'fade',

        thumbs: {
            swiper: homeIntroTabsEx
        },
    })

    const homeIntroSliderEx = new Swiper(homeIntroSlider, {
        slidesPerView: 1,
        allowTouchMove: false,
        effect: 'fade',

       
        on: {
            slideChangeTransitionEnd: function () {   
                homeIntroSlider.querySelectorAll('.swiper-slide video').forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                });

                const activeSlide = homeIntroSlider.querySelector('.swiper-slide-active');
                const video = activeSlide.querySelector('video');
        
                if (video) video.play();
            },

            init: function () {
                const activeSlide = homeIntroSlider.querySelector('.swiper-slide-active');
                const video = activeSlide.querySelector('video');
        
                if (video) video.play();
            }
        }
    })


    homeIntroInfoSliderEx.controller.control = [homeIntroSliderEx]
    homeIntroSliderEx.controller.control = [homeIntroInfoSliderEx]
}