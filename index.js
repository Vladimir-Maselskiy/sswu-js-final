import {
  serviceRef,
  formRef,
  copyRightRef,
  burgerMenuBtnRef,
  navRef,
} from './refs.js';
import { fetchService } from './utils/fetchService.js';
import { getFilteredSesvices } from './utils/getFilteredSesvices.js';
import { showFilteredSesvices } from './utils/showFilteredSesvices.js';
new Swiper('.swiper', {
  loop: true,
  navigation: {
    nextEl: '.testimonials__button.next',
    prevEl: '.testimonials__button.prev',
  },
});
// ініціалізація значення контенту секції з фільтром
let serviceContent = {};
// початкове значення самого фільтру
let filterButton = 'all';

let windowWidth = window.innerWidth;

// задаємо початкове значення фільтра в секції about
const setActiveStatusToButtonAll = () => {
  const elems = service.children;
  [].forEach.call(elems, function (elem) {
    const button = elem.querySelector('[data-filter]');
    if (button.dataset.filter === 'all') button.classList.add('activ');
  });
};
setActiveStatusToButtonAll();

// задаємо значення фільтра по кліку від юзера
const setActiveStatusToButtonsOnClick = filter => {
  const elems = serviceRef.children;
  filterButton = filter;
  [].forEach.call(elems, function (elem) {
    const button = elem.querySelector('[data-filter]');

    if (button.dataset.filter === filter) button.classList.toggle('activ');
    if (button.dataset.filter !== filter) button.classList.remove('activ');
    if (
      !button.classList.contains('activ') &&
      button.dataset.filter === filter
    ) {
      setActiveStatusToButtonAll();
      filterButton = 'all';
    }
  });
  showFilteredSesvices(getFilteredSesvices(filterButton, serviceContent));
};

// IIFE, дійстаємо рік з системної дати і встановлюємо в футері
(function () {
  const year = new Date().getFullYear();
  copyRightRef.textContent = `Copyright @ ${year} Brandoxide.all right reserved.`;
})();

//IIFE, відслідковуємо зміну ширини, і задаємо "is-hidden" в бургер меню
(function () {
  console.log('iife is hidden', windowWidth);
  if (windowWidth <= 760) {
    navRef.classList.add('is-hidden');
  }
})();

// --------------нижче по коду оброблювачі подій для всього проекту-----------------
const onFilterListClick = e => {
  setActiveStatusToButtonsOnClick(e.target.dataset.filter);
};

const onInputChange = e => {
  const isValid = e.target.validity.valid;
  e.target.setValidationMessage =
    'Тільки латинські літери, перша літера у верхньому регістрі';
  console.log(e.target);
};
const onSubmitForm = e => {
  e.preventDefault();
  const { name, surname, email } = e.target.children;
  const user = {
    name: name.value,
    surname: surname.value,
    email: email.value,
  };
  localStorage.setItem('user', JSON.stringify(user));
  if (user.name === 'Volodymyr') {
    console.log('animation');
  }
};

const onBurgerMenuClick = () => {
  console.log('onBurgerMenuClick');
  navRef.classList.toggle('is-hidden');
};

const onWindowResize = () => {
  const width = window.innerWidth;
  if (width > 760) {
    navRef.classList.remove('is-hidden');
  }
  if (windowWidth > 760 && width <= 760) {
    navRef.classList.add('is-hidden');
  }
  windowWidth = width;
};

const onLoadWindow = () => {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(function () {
    loadingScreen.style.display = 'none';
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'block';
  }, 5000);
};

// --------------------нижче по коду, прослуховувачі подій для всього проекту-----------------
service.addEventListener('click', onFilterListClick);
formRef.addEventListener('change', onInputChange);
formRef.addEventListener('submit', onSubmitForm);
burgerMenuBtnRef.addEventListener('click', onBurgerMenuClick);
window.addEventListener('resize', onWindowResize);
window.addEventListener('load', onLoadWindow);

// -----------імітація отримання json для секції з фільтром------------
fetchService().then(data => {
  console.log('data', data);
  serviceContent = data;
  showFilteredSesvices(getFilteredSesvices(filterButton, serviceContent)).catch(
    error => console.log('error in index', error)
  );
});
