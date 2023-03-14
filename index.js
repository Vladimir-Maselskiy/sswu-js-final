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

let serviceContent = {};
let filterButton = 'all';
let windowWidth = window.innerWidth;

const setActiveStatusToButtonAll = () => {
  const elems = service.children;
  [].forEach.call(elems, function (elem) {
    const button = elem.querySelector('[data-filter]');
    if (button.dataset.filter === 'all') button.classList.add('activ');
  });
};

setActiveStatusToButtonAll();

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

(function () {
  const year = new Date().getFullYear();
  copyRightRef.textContent = `Copyright @ ${year} Brandoxide.all right reserved.`;
})();

(function () {
  console.log('iife is hidden', windowWidth);
  if (windowWidth <= 760) {
    navRef.classList.add('is-hidden');
  }
})();

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

service.addEventListener('click', onFilterListClick);
formRef.addEventListener('change', onInputChange);
formRef.addEventListener('submit', onSubmitForm);
burgerMenuBtnRef.addEventListener('click', onBurgerMenuClick);
window.addEventListener('resize', onWindowResize);

fetchService().then(data => {
  serviceContent = data;
  showFilteredSesvices(getFilteredSesvices(filterButton, serviceContent));
});
