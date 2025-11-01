function lockBody() {
	$('body').addClass('no-scroll');

    let scrollbarWidth = getScrollbarWidth()

    $('body').css('padding-right', scrollbarWidth)
    $('[data-js="siteHeader"]').css('padding-right', scrollbarWidth)
}

function unlockBody() {
	$('body').removeClass('no-scroll');
    $('body').css('padding-right', 0);
    $('[data-js="siteHeader"]').css('padding-right', 0)
}

function getScrollbarWidth() {
    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth
}

const jsTemplatePath = (typeof SITE_TEMPLATE_PATH !== 'undefined' && SITE_TEMPLATE_PATH ? SITE_TEMPLATE_PATH + '/' : '');

document.addEventListener('DOMContentLoaded', () => {
    //headerBannerControll();
    fancyboxInit();
    //anchorsInit();
})

// проверяет все ли слайды видны в слайдере
function allSlidesVisible(swiper) {
  const containerRect = swiper.el.getBoundingClientRect();

  return Array.from(swiper.slides).every(slide => {
    const slideRect = slide.getBoundingClientRect();
    
    return slideRect.left >= containerRect.left && slideRect.right <= containerRect.right;
  });
}

// Инициализация фансибокса
function fancyboxInit() {
    Fancybox.bind("[data-fancybox]", {
        placeFocusBack: false,
        mainClass: 'my-fancybox',
        idle: false,
        Carousel: {
            transition: "crossfade",
            Navigation: {
                prevTpl: '<svg><use xlink:href="'+jsTemplatePath+'img/sprites/sprite.svg#arrow_slider_prev"></use></svg>',
                nextTpl: '<svg><use xlink:href="'+jsTemplatePath+'img/sprites/sprite.svg#arrow_slider_next"></use></svg>',
              },
        },
        Thumbs: {
            type: "classic",
        },
        Toolbar: {
            enabled: true,
            display: {
                left: [],
                middle: [],
                right: [
                  "close",
                ],
            },
        }

    });
}

// Показ баннера
/*function headerBannerControll() {
    const headerBanner = document.querySelector('[data-js="headerBanner"]');

    if(!headerBanner) return

    const page = document.querySelector('[data-js="page"]');
    const bannerClose = headerBanner.querySelector('[data-js="headerBannerClose"]');

    headerBanner.classList.add('active');

    if(page) {
        const bannerHeight = headerBanner.offsetHeight;
        page.style.paddingTop = bannerHeight + 'px';
    }

    bannerClose.addEventListener('click', () => {
        if(page) {
            page.style.paddingTop = '0px';
        }

        headerBanner.classList.remove('active')
    })
}*/

// якорные ссылки
/*function anchorsInit() {

    const anchors = document.querySelectorAll('a[href^="#"]');

    if(anchors.length < 1) return

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const anchorName = this.getAttribute('href').replace('#', '');
            const targetEl = document.getElementById(anchorName);
            const targetTabs = targetEl.closest('[data-js="tabsBlock"]');
            let scrollTopOffset = document.querySelector('[data-js="siteHeader"]') ? document.querySelector('[data-js="siteHeader"]').offsetHeight : '0'

            if(targetTabs) {
                const targetTabsSlide = targetEl.closest('[data-js="tabsBlockSlide"]')
                const targetTabIndex = $(targetTabsSlide).index()
                const targetTab = targetTabs.querySelector(`[data-js="tabsBlockTab"][data-index="${targetTabIndex}"]`)

                if(targetTab) {
                    targetTab.click()
                }

                scrollTopOffset = scrollTopOffset + targetTabs.querySelector('[data-js="tabsBlockList"]').offsetHeight + 32

            }

            const targetElPos = Math.ceil($(targetEl).offset().top - scrollTopOffset)

            window.scrollTo({
                top: targetElPos,
                behavior: 'smooth'
            })
    
        });
    });
}*/