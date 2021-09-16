// Login Popup

const userLink = document.querySelector('.user-nav__user-link');
const popupLogin = document.querySelector('.popup-login');
const loginInput = document.querySelector('.popup__input--login');

userLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupLogin.classList.toggle('popup--show');
  loginInput.focus();
});

const popupLoginCloseBtn = document.querySelector('.popup-login__close');

popupLoginCloseBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupLogin.classList.remove('popup--show');
});

const showpassCheckbox = document.querySelector('.popup-login__showpass-checkbox');
const showpassBtn = document.querySelector('.popup-login__showpass');

showpassBtn.addEventListener('click', function () {
  showpassBtn.classList.toggle('popup-login__showpass--pushed');
});

const passwordInput = document.querySelector('.popup__input--password');

showpassCheckbox.onchange = function () {
  if (showpassCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
};

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (popupLogin.classList.contains('popup--show')) {
      evt.preventDefault();
      popupLogin.classList.remove('popup--show');
    }
  }
});

// Callback Popup

const callbackBtn = document.querySelector('.page-footer__button--callback');
const popupCallback = document.querySelector('.popup-callback');
const customerInput = document.querySelector('.popup__input--customer');

callbackBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupCallback.classList.toggle('popup--show');
  customerInput.focus();
});

const popupCallbackCloseBtn = document.querySelector('.popup-callback__close');

popupCallbackCloseBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupCallback.classList.remove('popup--show');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (popupCallback.classList.contains('popup--show')) {
      evt.preventDefault();
      popupCallback.classList.remove('popup--show');
    }
  }
});

// Burger Menu

const burgerBtn = document.querySelector('.burger');

const menu = document.querySelector('.menu');
const userNav = document.querySelector('.user-nav');
const catalogNav = document.querySelector('.catalog-nav');

burgerBtn.classList.remove('burger--nojs');
catalogNav.classList.remove('catalog-nav--nojs');

burgerBtn.addEventListener('click', function (evt) {
  if (burgerBtn.classList.contains('burger--open')) {
    evt.preventDefault();
    burgerBtn.classList.remove('burger--open');
    burgerBtn.classList.add('burger--close');
    catalogNav.classList.add('catalog-nav--opened');
    menu.classList.add('menu--opened-on-mobile');
    userNav.classList.add('user-nav--opened-on-mobile');
    catalogNav.classList.add('catalog-nav--opened-on-mobile');
  } else {
    evt.preventDefault();
    burgerBtn.classList.remove('burger--close');
    burgerBtn.classList.add('burger--open');
    catalogNav.classList.remove('catalog-nav--opened');
    menu.classList.remove('menu--opened-on-mobile');
    userNav.classList.remove('user-nav--opened-on-mobile');
    catalogNav.classList.remove('catalog-nav--opened-on-mobile');
  }
});

// Banner Switcher

const bannerItemSmartphone = document.querySelector('.banner__item--smartphone');
const bannerItemRobot = document.querySelector('.banner__item--robot');
const bannerItemLaptop = document.querySelector('.banner__item--laptop');

const controlToggleSmartphone = document.querySelector('.control__toggle--smartphone');
const controlToggleRobot = document.querySelector('.control__toggle--robot');
const controlToggleLaptop = document.querySelector('.control__toggle--laptop');


controlToggleSmartphone.addEventListener('click', function (evt) {
  evt.preventDefault();
  bannerItemSmartphone.classList.add('banner__item--current');
  bannerItemRobot.classList.remove('banner__item--current');
  bannerItemLaptop.classList.remove('banner__item--current');

  controlToggleSmartphone.classList.add('control__toggle--current');
  controlToggleRobot.classList.remove('control__toggle--current');
  controlToggleLaptop.classList.remove('control__toggle--current');
})

controlToggleRobot.addEventListener('click', function (evt) {
  evt.preventDefault();
  bannerItemSmartphone.classList.remove('banner__item--current');
  bannerItemRobot.classList.add('banner__item--current');
  bannerItemLaptop.classList.remove('banner__item--current');

  controlToggleSmartphone.classList.remove('control__toggle--current');
  controlToggleRobot.classList.add('control__toggle--current');
  controlToggleLaptop.classList.remove('control__toggle--current');
})

controlToggleLaptop.addEventListener('click', function (evt) {
  evt.preventDefault();
  bannerItemSmartphone.classList.remove('banner__item--current');
  bannerItemRobot.classList.remove('banner__item--current');
  bannerItemLaptop.classList.add('banner__item--current');

  controlToggleSmartphone.classList.remove('control__toggle--current');
  controlToggleRobot.classList.remove('control__toggle--current');
  controlToggleLaptop.classList.add('control__toggle--current');
})

// Map
