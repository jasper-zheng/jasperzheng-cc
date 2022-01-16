// console.log('hi menu')
var isMenuOpened = false;
const menuIcoContent = document.getElementById("menu-ico-content");
const menuContainer = document.getElementById("mobileMenu");
menuIcoContent.addEventListener('click', menuIcon)
menuContainer.addEventListener('click',closeMenu)
function menuIcon() {
  menuIcoContent.classList.toggle("change");
  if (isMenuOpened) {
    menuContainer.style.height = "0";
  } else {
    menuContainer.style.height = "100vh";
  }
  isMenuOpened = !isMenuOpened;
}
function closeMenu() {
  menuIcoContent.classList.toggle("change");
  menuContainer.style.height = "0vh";
  isMenuOpened = false;
}
