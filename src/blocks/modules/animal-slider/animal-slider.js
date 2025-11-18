function animalSlider() {
    const animalSliders = document.querySelectorAll('[data-js="animalSlider"]');

    if(animalSliders.length < 1) return

    animalSliders.forEach(sliderSection => {

        const sliderEl = sliderSection.querySelector('[data-js="animalSliderSlider"]')
        const sliderControls = sliderSection.querySelector('[data-js="sliderControls"]')
        const prev = sliderControls.querySelector('[data-js="sliderPrev"]');
        const next = sliderControls.querySelector('[data-js="sliderNext"]');
    
        const animalSliderEx = new Swiper(sliderEl, {
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

                1341: {
                    slidesPerView: 3,
                    spaceBetween: 24
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