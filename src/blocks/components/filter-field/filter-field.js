function filterField(inited = false) {
    const filterFields = document.querySelectorAll("[data-js='filterField']")

    if(filterFields.length < 1) return

    filterFields.forEach(field => {
        const content = field.querySelector("[data-js='filterFieldContent']")

        field.style.width = field.offsetWidth + 1 + 'px'

        if(content) {
            content.style.position = 'absolute'
        }
    })

    if(!inited) {
        document.addEventListener('click', (e) => {
            let target = e.target
    
            if(target.closest("[data-js='filterField']")) {
                if(target.closest("[data-js='filterFieldHeader']")) {
                    const field = target.closest("[data-js='filterField']")
            
                    if(field.classList.contains('active')) {
                        closeAll()
                    } else {
                        closeAll()
                        field.classList.add('active')
                    }
                }
            } else {
                closeAll()
            }
        })
    }


    function closeAll() {
        const actualFilterFields = document.querySelectorAll("[data-js='filterField']")
        actualFilterFields.forEach(item => {
            item.classList.remove('active')
        })
    }
}