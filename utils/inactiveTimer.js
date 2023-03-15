const modalRef = document.querySelector('.modal-window');
const buttonComfirmRef = modalRef.querySelector('.modal__confirm-button');
const buttonCloseDocumentRef = modalRef.querySelector(
  '.modal__close-document-button'
);
buttonComfirmRef.addEventListener('click', onModalButtonClick);
buttonCloseDocumentRef.addEventListener('click', onButtonCloseDocumentClick);
var inactiveTime = 0;
var timeout = 60000; // 1 minute
var confirmationTimeout = 10000; // 10 seconds;

function onButtonCloseDocumentClick() {
  console.log('onButtonCloseDocumentClick click');
  window.open('/', '_parent');
}
function onModalButtonClick() {
  modalRef.classList.add('is-hidden');
  handleUserActivity();
}

function checkActivity() {
  inactiveTime += 1000; // 1 second
  if (inactiveTime >= timeout) {
    modalRef.classList.remove('is-hidden');

    setTimeout(function () {
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
