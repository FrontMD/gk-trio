function filterField() {
    const filterFields = document.querySelectorAll("[data-js='filterField']")

    if(filterFields.length < 1) return
    
    filterFields.forEach(field => {
        const content = field.querySelector("[data-js='filterFieldContent']")

        field.style.width = field.offsetWidth + 1 + 'px'

        if(content) {
            content.style.position = 'absolute'
        }
    })

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

    function closeAll() {
        filterFields.forEach(item => {
            item.classList.remove('active')
        })
    }
}