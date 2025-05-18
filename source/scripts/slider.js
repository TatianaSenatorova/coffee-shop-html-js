import {
  sliderContainer,
  sliderPaginationButtons,
  sliderList,
  sliderPrevButton,
  sliderNextButton,
  sliderItems,
  sliderArrowButtons
} from './dom-elements.js';

let slideWidth = sliderContainer.offsetWidth;
let currentIndex = 0;
sliderPrevButton.disabled = true;

const transferSlider = () => {
  sliderList.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
}

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target.classList.contains('slider')) {
      slideWidth = entry.contentRect.width;
      transferSlider();
    }
  }
});

const observeSliderWidth = () => {
  resizeObserver.observe(sliderContainer);
};

observeSliderWidth();

const changeClasses = () => {
  sliderPaginationButtons.forEach((button) =>
    button.classList.remove('slider__pagination-button--is-current')
  );
  sliderPaginationButtons[currentIndex].classList.add(
    'slider__pagination-button--is-current'
  );
}

const unfocusNonActiveSlides = () => {
  sliderItems.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.querySelector('.slider-card__button').removeAttribute('tabindex');
    } else {
      slide.querySelector('.slider-card__button').setAttribute('tabindex', '-1');
    }
  });
};

const updateSlider = () => {
  sliderArrowButtons.forEach((button) => {
    button.disabled = false;
  }
  );
  if (currentIndex === 0) {
    sliderPrevButton.disabled = true;
  } else if (currentIndex === sliderItems.length - 1) {
    sliderNextButton.disabled = true;
  }
  changeClasses();
  transferSlider();
  unfocusNonActiveSlides();
};

sliderPaginationButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (index === currentIndex) {
      return;
    }
    currentIndex = index;
    updateSlider();
  });
});

sliderPrevButton.addEventListener('click', () => {
  currentIndex--;
  updateSlider();
});

sliderNextButton.addEventListener('click', () => {
  currentIndex++;
  updateSlider();
});

const onDocumentKeyDown = (evt) => {
  if (evt.key === 'ArrowRight' && currentIndex !== (sliderItems.length - 1)) {
    currentIndex++;
    updateSlider();
  } else if (evt.key === 'ArrowLeft' && currentIndex !== 0) {
    currentIndex--;
    updateSlider();
  }
};

document.addEventListener('keydown', onDocumentKeyDown);
