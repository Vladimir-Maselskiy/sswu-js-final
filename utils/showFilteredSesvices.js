import { serviceContentRef } from '../refs.js';

export const showFilteredSesvices = data => {
  serviceContentRef.innerHTML = '';
  const listRef = document.createElement('ul');
  listRef.classList.add('services__content-list');
  data.forEach(item => {
    const itemRef = document.createElement('li');
    itemRef.classList.add('services__content-item', `group_${item.group}`);
    const titleRef = document.createElement('h3');
    titleRef.classList.add('services__content-title');
    titleRef.textContent = item.name + `${item.id}`;
    const descriptionRef = document.createElement('p');
    descriptionRef.classList.add('services__content-description');
    descriptionRef.textContent = item.description;
    itemRef.append(titleRef, descriptionRef);
    listRef.append(itemRef);
  });
  serviceContentRef.append(listRef);
  console.log(listRef);
};
