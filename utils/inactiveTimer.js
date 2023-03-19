const modalRef = document.querySelector('.modal-window');
const buttonComfirmRef = modalRef.querySelector('.modal__confirm-button');
const buttonCloseDocumentRef = modalRef.querySelector(
  '.modal__close-document-button'
);
buttonComfirmRef.addEventListener('click', onModalButtonClick);
buttonCloseDocumentRef.addEventListener('click', onButtonCloseDocumentClick);
let inactiveTime = 0;
let timeout = 10 * 60 * 1000; // 10 minute
let confirmationTimeout = 10 * 1000; // 10 seconds;
let timeoutID;

function onButtonCloseDocumentClick() {
  console.log('onButtonCloseDocumentClick click');
  window.open('/', '_parent');
}
function onModalButtonClick() {
  modalRef.classList.add('is-hidden');
  handleUserActivity();
  clearTimeout(timeoutID);
}

function checkActivity() {
  inactiveTime += 1000; // 1 second
  if (inactiveTime >= timeout) {
    modalRef.classList.remove('is-hidden');

    timeoutID = setTimeout(function () {
      buttonCloseDocumentRef.click();
    }, confirmationTimeout);
  }
}

function handleUserActivity() {
  inactiveTime = 0;
}

export const inactiveTimer = () => {
  document.addEventListener('click', handleUserActivity);
  document.addEventListener('mousemove', handleUserActivity);
  document.addEventListener('keypress', handleUserActivity);
  setInterval(checkActivity, 1000);
};
