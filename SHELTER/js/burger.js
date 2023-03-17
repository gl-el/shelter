const burgerBtn = document.querySelector('.burger');
const restPage = document.querySelector('.burger__background');
const navLink = document.querySelector('.nav__link');

burgerBtn.addEventListener('click', toggleMenu);
navLink.addEventListener('click', toggleMenu);
restPage.addEventListener('click', toggleMenu);



function toggleMenu() {
  console.log('hey')
  const navigation = document.querySelector('.nav');
  const logo = document.querySelector('.logo-link');
  const body = document.querySelector('.body');
  
  navigation.classList.toggle('nav_active');
  burgerBtn.classList.toggle('burger_active');
  logo.classList.toggle('logo-link_active');
  body.classList.toggle('body_hidden');
  restPage.classList.toggle('burger__background_active');
}