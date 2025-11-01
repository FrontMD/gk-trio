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
            spaceBetween: 24,
             navigation: {
                nextEl: next,
                prevEl: prev,
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