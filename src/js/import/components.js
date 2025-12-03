@@include("../../blocks/components/form/form.js")
@@include("../../blocks/components/s-filter/s-filter.js")
@@include("../../blocks/components/filter-field/filter-field.js")
@@include("../../blocks/components/filter-range/filter-range.js")

document.addEventListener('DOMContentLoaded', () => {
    validation()
    sFilter()
    filterField()
    filterRange()
})