function animalSlider() {
    const animalSliders = document.querySelectorAll('[data-js="animalSlider"]');

    if(animalSliders.length < 1) return

    animalSliders.forEach(sliderSection => {

        const sliderEl = sliderSection.querySelector('[data-js="animalSliderSlider"]')
        const sliderControls = sliderSection.querySelector('[data-js="sliderControls"]')
        const prev = sliderControls.querySelector('[data-js="sliderPrev"]');
        const next = sliderControls.querySelector('[data-js="sliderNext"]');
    
        const animalSliderEx = new Swiper(sliderEl, {
            slidesPerView: 1,
            spaceBetween: 24,
             navigation: {
                nextEl: next,
                prevEl: prev,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
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