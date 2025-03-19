document.getElementById('myButton').addEventListener('click', function() {
    alert('Bouton cliqué!');
});

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(${-index * 20}%)`; // Adjust for 5 slides at a time
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds