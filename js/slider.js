document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const track = slider.querySelector('.slider__track');
  const slides = slider.querySelectorAll('.slider__slide');
  const btnPrev = slider.querySelector('.slider__btn--prev');
  const btnNext = slider.querySelector('.slider__btn--next');

  let current = 0;

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  btnPrev.addEventListener('click', () => goToSlide(current - 1));
  btnNext.addEventListener('click', () => goToSlide(current + 1));

  // Автопрокрутка
  setInterval(() => goToSlide(current + 1), 5000);
});