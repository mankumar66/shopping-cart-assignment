import constants from './../../utils/locales/en';

let leftArrow = document.getElementById("arrow-left");
let rightArrow = document.getElementById("arrow-right");
let slideIndex = 1;
let slides = document.getElementsByClassName("slider");
let dots = document.getElementsByClassName("dot");

const showSlides = n => {
  let i;
  if (slides && dots) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "flex";
    if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
  }
};

/* function to change slider on dot click */
const currentSlide = n => {
  showSlides((slideIndex = n + 1));
};

/* function to change slide on slider Prev/Next button */
const changeSlide = e => {
  e.target.innerText.toUpperCase() === constants.NEXT_LABEL
    ? showSlides((slideIndex += 1))
    : showSlides((slideIndex += -1));
};

/* Event binding for slider Prev/Next navigation */
if (leftArrow) leftArrow.addEventListener("click", changeSlide);
if (rightArrow) rightArrow.addEventListener("click", changeSlide);

/* Event binding for slider dots */
if (dots) {
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => currentSlide(i));
  }
}

/* Default slider render */
showSlides(slideIndex);


