const burgerBtn = document.querySelector('.burger');
const restPage = document.querySelector('.burger__bg');
const navLinks = document.querySelectorAll('.nav__link');

burgerBtn.addEventListener('click', toggleMenu);
restPage.addEventListener('click', toggleMenu);
navLinks.forEach((item) => {
  item.addEventListener('click', toggleMenu)
})


function toggleMenu() {

  const navigation = document.querySelector('.nav');
  const body = document.querySelector('.body');

  navigation.classList.toggle('nav_active');
  burgerBtn.classList.toggle('burger_active');
  body.classList.toggle('body_hidden');
  restPage.classList.toggle('burger__background_active');
}