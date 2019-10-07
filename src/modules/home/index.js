let slideIndex = 1;
const showSlides = n => {
  let i;
  let slides = document.getElementsByClassName("slider");
  let dots = document.getElementsByClassName("dot");
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

let leftArrow = document.getElementById("arrow-left");
let rightArrow = document.getElementById("arrow-right");
const changeSlide = e => {
  e.target.innerText.toUpperCase() === "NEXT"
    ? showSlides((slideIndex += 1))
    : showSlides((slideIndex += -1));
};
if (leftArrow) leftArrow.addEventListener("click", changeSlide);
if (rightArrow) rightArrow.addEventListener("click", changeSlide);
const currentSlide = n => {
  showSlides((slideIndex = n + 1));
};

let dots = document.querySelectorAll(".dot");
if (dots) {
  dots.forEach((element, i) => {
    element.addEventListener("click", () => currentSlide(i));
    setTimeout(() => currentSlide(i), 5000);
  });
}

showSlides(slideIndex);


