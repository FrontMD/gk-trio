function categorySlider() {
    const categorySliders = document.querySelectorAll('[data-js="categorySlider"]');

    if(categorySliders.length < 1) return

    categorySliders.forEach(sliderSection => {

        const sliderEl = sliderSection.querySelector('[data-js="categorySliderSlider"]')
        const sliderControls = sliderSection.querySelector('[data-js="sliderControls"]')
        const prev = sliderControls.querySelector('[data-js="sliderPrev"]');
        const next = sliderControls.querySelector('[data-js="sliderNext"]');
        const slidesCounter = sliderEl.querySelectorAll('.swiper-slide').length > 4 ? 4.3 : 4;
    
        const categorySliderEx = new Swiper(sliderEl, {
            slidesPerView: 3,
            spaceBetween: 24,
             navigation: {
                nextEl: next,
                prevEl: prev,
            },
            breakpoints: {
                1024: {
                    slidesPerView: slidesCounter,
                }
            },
            on: {
                init: function() {
                    const allVisible = allSlidesVisible(this);
                    if(allVisible) {
                        sliderControls.classList.remove('active')
                    } else {
                        sliderControls.classList.add('active')
                    }
                },
                resize: function() {
                    const allVisible = allSlidesVisible(this);
                    if(allVisible) {
                        sliderControls.classList.remove('active')
                    } else {
                        sliderControls.classList.add('active')
                    }
                },
            }
        })
    })
}