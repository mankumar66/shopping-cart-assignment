(() => {
    /* fetch("./server/banners/index.get.json")
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response})
        .catch(function () {
            console.log("error");
        }); */
    var slideIndex = 1;
    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("slider");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "flex";
        dots[slideIndex - 1].className += " active";
    }
    showSlides(slideIndex);
    const leftArrow = document.getElementById('arrow-left');
    const rightArrow = document.getElementById('arrow-right');
    const changeSlide = (e) => {
        e.target.innerText.toUpperCase() === 'NEXT' ? showSlides(slideIndex += 1) : showSlides(slideIndex += -1);
    }
    leftArrow.addEventListener('click', changeSlide);
    rightArrow.addEventListener('click', changeSlide);
    const currentSlide = (n) => {
        showSlides(slideIndex = n + 1);
    }
    (() => {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((element, i) => {
            element.addEventListener('click', () => currentSlide(i));
        });
    })();

})();