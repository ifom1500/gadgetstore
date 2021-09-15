const isStorageSupport = true;
const storage = '';

// Login Popup

const userLink = document.querySelector('.user-nav__user-link');
const loginInput = document.querySelector('.popup__input--login');
const popupLogin = document.querySelector('.popup-login');
const popupLoginCloseBtn = document.querySelector('.popup-login__close');

const passwordInput = document.querySelector('.popup__input--password');
const showpassCheckbox = document.querySelector('.popup-login__showpass-checkbox');
const showpassBtn = document.querySelector('.popup-login__showpass');

userLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupLogin.classList.toggle('popup--show');
  loginInput.focus();
});

popupLoginCloseBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupLogin.classList.remove('popup--show');
})

showpassBtn.addEventListener('click', function (evt) {
  showpassBtn.classList.toggle('popup-login__showpass--pushed');
})

showpassCheckbox.onchange = function () {
  if (showpassCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

// Callback Popup

const callbackBtn = document.querySelector('.page-footer__button--callback');
const customerInput = document.querySelector('.popup__input--customer');
const popupCallback = document.querySelector('.popup-callback');
const popupCallbackCloseBtn = document.querySelector('.popup-callback__close');

callbackBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupCallback.classList.toggle('popup--show');
  customerInput.focus();
})

popupCallbackCloseBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupCallback.classList.remove('popup--show');
})
