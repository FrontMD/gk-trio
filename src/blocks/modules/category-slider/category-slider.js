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
            slidesPerView: 1.2,
            spaceBetween: 12,
             navigation: {
                nextEl: next,
                prevEl: prev,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1341: {
                    slidesPerView: slidesCounter,
                    spaceBetween: 24
                }
            },
            on: {
                init: function() {
                    AOS.refresh()
                    const allVisible = allSlidesVisible(this);
                    if(allVisible) {
                        sliderControls.classList.remove('active')
                    } else {
                        sliderControls.classList.add('active')
                    }
                },
                resize: function() {
                    AOS.refresh()
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