import { serviceRef } from './refs.js';
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

const onFilterListClick = e => {
  setActiveStatusToButtonsOnClick(e.target.dataset.filter);
};
service.addEventListener('click', onFilterListClick);

fetchService().then(data => {
  serviceContent = data;
  showFilteredSesvices(getFilteredSesvices(filterButton, serviceContent));
});
