@@include("../../blocks/modules/header/header.js")
@@include("../../blocks/modules/modals/modals.js")
@@include("../../blocks/modules/main-burger/main-burger.js")
@@include("../../blocks/modules/home-intro/home-intro.js")

document.addEventListener('DOMContentLoaded', () => {
  homeIntro()
  modalsInit()
  mainBurger()
})