const userAnimationRef = document.querySelector('.animation-container');
const userSectionRef = document.querySelector('.user-animation-section');

export const startUserAnimation = userName => {
  const data = 'Hellow ' + userName + ' today you have discount 120%';
  userAnimationRef.innerHTML = '';
  const containerRef = document.createElement('div');
  let wordRef = document.createElement('div');

  let delay = 0;
  data.split('').forEach(letter => {
    const letterRef = document.createElement('span');
    letterRef.classList.add('letter');
    letterRef.innerHTML = letter === ' ' ? '&nbsp' : letter;
    letterRef.style.animationDelay = delay + 's';
    delay += 0.02;
    wordRef.append(letterRef);
    if (letter === ' ') {
      containerRef.append(wordRef);
      wordRef = document.createElement('div');
    }
  });
  containerRef.append(wordRef);
  userSectionRef.classList.remove('display-none');
  userAnimationRef.append(containerRef);
  setTimeout(() => {
    userSectionRef.classList.add('display-none');
  }, 5000);
};

// window.addEventListener('load', function () {
//     const textSpans = animateText.querySelectorAll('span');
//     let delay = 0;
//     textSpans.forEach(function (span) {
//       span.style.animationDelay = delay + 's';
//       delay += 0.1;
//     });
//   });
