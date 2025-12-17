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
    AOS.init({
        once: true,
        duration: 600,
        offset: 100
    });
    $('[data-js="customScrollbar"]').each((index, el) => {
        new SimpleBar(el, { autoHide: false });
    })
    tableScrollWrapper();
    fancyboxInit();
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

// оборачивает таблицы в текстовом редакторе
function tableScrollWrapper() {
    const tablesList = document.querySelectorAll('.text-editor table')

    if(tablesList.length < 1) return

    tablesList.forEach(table => {
        if(!table.closest('.text-scroll-h')) {
            const wrapper = document.createElement('div')

            wrapper.classList.add('text-scroll-h')
            table.after(wrapper)
            wrapper.appendChild(table)
        }
    })
}