function spSlider() {
    const spSliders = document.querySelectorAll('[data-js="spSlider"]');

    if(spSliders.length < 1) return

    spSliders.forEach(sliderSection => {

        const sliderEl = sliderSection.querySelector('[data-js="spSliderSlider"]')
        const sliderControls = sliderSection.querySelector('[data-js="sliderControls"]')
        const prev = sliderControls.querySelector('[data-js="sliderPrev"]');
        const next = sliderControls.querySelector('[data-js="sliderNext"]');
        const slidesPerView = 2
        const slidesCount = sliderEl.querySelectorAll('.swiper-slide').length
    
        const spSliderEx = new Swiper(sliderEl, {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            spaceBetween: 12,
             navigation: {
                nextEl: next,
                prevEl: prev,
            },
            breakpoints: {
                768: {
                    slidesPerView: slidesPerView,
                    slidesPerGroup: slidesPerView,
                },
                1341: {
                    spaceBetween: 24,
                    slidesPerView: slidesPerView,
                    slidesPerGroup: slidesPerView,
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