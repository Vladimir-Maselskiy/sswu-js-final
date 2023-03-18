export const userAnimation = () => {
  const animateText = document.querySelector('.animate-text');

  window.addEventListener('load', function () {
    const textSpans = animateText.querySelectorAll('span');
    let delay = 0;
    textSpans.forEach(function (span) {
      span.style.animationDelay = delay + 's';
      delay += 0.1;
    });
  });
};
