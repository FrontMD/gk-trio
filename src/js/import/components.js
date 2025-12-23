@@include("../../blocks/components/form/form.js")
@@include("../../blocks/components/s-filter/s-filter.js")
@@include("../../blocks/components/filter-field/filter-field.js")

document.addEventListener('DOMContentLoaded', () => {
    validation()
    sFilter()
    filterField()
})