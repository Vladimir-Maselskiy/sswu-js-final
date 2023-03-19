import {
  serviceRef,
  formRef,
  copyRightRef,
  burgerMenuBtnRef,
  navRef,
  weatherTempRef,
  weatherWindRef,
  weatherPressureRef,
} from './refs.js';
import { fetchWeather } from './utils/fetchWeather.js';
import { getFilteredSesvices } from './utils/getFilteredSesvices.js';
import { inactiveTimer } from './utils/inactiveTimer.js';
import { showFilteredSesvices } from './utils/showFilteredSesvices.js';
import { startUserAnimation } from './utils/startUserAnimation.js';
new Swiper('.swiper', {
  loop: true,
  navigation: {
    nextEl: '.testimonials__button.next',
    prevEl: '.testimonials__button.prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
      slidesPerGroup: 1,
    },
    1060: {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2,
    },
  },
});
// ініціалізація значення контенту секції з фільтром
let serviceContent = {};

// початкове значення фільтру JSON
let filterButton = 'all';

// шніціалізація змінної погоди;
let weatherData;

let windowWidth = window.innerWidth;

fetchWeather().then(data => {
  const temp = data.main.temp;
  const wind = data.wind.speed;
  const pressure = data.main.pressure;
  weatherTempRef.textContent = `${temp}C`;
  weatherWindRef.textContent = `${wind}m/s`;
  weatherPressureRef.textContent = `${pressure}mm`;
});

// задаємо початкове значення фільтра в секції about
const setActiveStatusToButtonAll = () => {
  const elems = service.children;
  [].forEach.call(elems, function (elem) {
    const button = elem.querySelector('[data-filter]');
    if (button.dataset.filter === 'all') button.classList.add('activ');
  });
};
setActiveStatusToButtonAll();

// задаємо значення фільтра які вибрав  юзер
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
// запускаємо функцію-таймер відслідковування часу неактивності на сторінці
inactiveTimer();

// IIFE, дійстаємо рік з системної дати і встановлюємо в футері
(function () {
  const year = new Date().getFullYear();
  copyRightRef.textContent = `Copyright @ ${year} Brandoxide.all right reserved.`;
})();

//IIFE, відслідковуємо зміну ширини, і задаємо "is-hidden" в бургер меню
(function () {
  if (windowWidth <= 760) {
    navRef.classList.add('is-hidden');
  }
})();

// -------------- оброблювачі подій для всього проекту-----------------
const onFilterListClick = e => {
  setActiveStatusToButtonsOnClick(e.target.dataset.filter);
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

  startUserAnimation(user.name);
  if (user.name === 'Volodymyr') {
    // userAnimationRef.classList.remove('display-none');
    // userAnimationRef.classList.add('display-block');
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
  }, 1000);
};

function updateProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById('progress-bar').style.width = scrolled + '%';
}

// -------------------- прослуховувачі подій для всього проекту-----------------
service.addEventListener('click', onFilterListClick);
formRef.addEventListener('submit', onSubmitForm);
burgerMenuBtnRef.addEventListener('click', onBurgerMenuClick);
window.addEventListener('resize', onWindowResize);
window.addEventListener('load', onLoadWindow);
window.onscroll = updateProgressBar;

// -----------отримуємо json для секції з фільтром------------
fetch('./data/service.json', {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then(res => res.json())
  .then(data => {
    serviceContent = data;
    showFilteredSesvices(getFilteredSesvices(filterButton, serviceContent));
  });
