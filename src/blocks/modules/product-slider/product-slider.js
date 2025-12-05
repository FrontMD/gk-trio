function productSlider() {
    const productSlider = document.querySelector('[data-js="productSlider"]')

    if(!productSlider) return

    const productSliderSlider = productSlider.querySelector('[data-js="productSliderSlider"]')
    const productSliderTabs = productSlider.querySelector('[data-js="productSliderTabs"]')
    const thumbsPrev = productSlider.querySelector('[data-js="sliderPrev"]')
    const thumbsNext = productSlider.querySelector('[data-js="sliderNext"]')
    const tabsWidth = productSliderTabs.querySelector('.swiper-wrapper').offsetWidth
    const tabsSWidth = productSliderTabs.querySelector('.swiper-wrapper').scrollWidth

    let loopVal = false

    if(tabsWidth < tabsSWidth ) {
        loopVal = true
    }
    
    let productSliderTabsEx = new Swiper(productSliderTabs, {
        slidesPerView: 'auto',
        loop: loopVal,
        navigation: {
            nextEl: thumbsNext,
            prevEl: thumbsPrev,
        },
            on: {
                afterInit: function() {
                    AOS.refresh()
                }
            }

    })

    let productSliderSliderEx = new Swiper(productSliderSlider, {
        slidesPerView: 1,
        loop: true,
        thumbs: {
            swiper: productSliderTabsEx
        },
    })

}