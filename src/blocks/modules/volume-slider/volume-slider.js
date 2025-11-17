function volumeSlider() {
    const volumeSliders = document.querySelectorAll('[data-js="volumeSlider"]');

    if(volumeSliders.length < 1) return

    volumeSliders.forEach(sliderSection => {

        const sliderEl = sliderSection.querySelector('[data-js="volumeSliderSlider"]')
        const sliderControls = sliderSection.querySelector('[data-js="sliderControls"]')
        const prev = sliderControls.querySelector('[data-js="sliderPrev"]');
        const next = sliderControls.querySelector('[data-js="sliderNext"]');
        const slidesPerView = 2
        const slidesCount = sliderEl.querySelectorAll('.swiper-slide').length
    
        const volumeSliderEx = new Swiper(sliderEl, {
            slidesPerView: slidesPerView,
            slidesPerGroup: slidesPerView,
            spaceBetween: 12,
             navigation: {
                nextEl: next,
                prevEl: prev,
            },
            breakpoints: {
                1341: {
                    spaceBetween: 24
                }
            },
            on: {
                init: function() {
                    if(slidesCount > slidesPerView) {
                        sliderControls.classList.add('active')
                    } else {
                        sliderControls.classList.remove('active')
                    }
                },
                resize: function() {
                    if(slidesCount > slidesPerView) {
                        sliderControls.classList.add('active')
                    } else {
                        sliderControls.classList.remove('active')
                    }
                },
            }
        })
    })
}