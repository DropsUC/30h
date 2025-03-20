document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.clickable-image');
  const overlay = document.getElementById('image-overlay');
  const overlayImage = document.getElementById('overlay-image');
  const closeBtn = document.querySelector('.close-btn');

  images.forEach(image => {
    image.addEventListener('click', function() {
      const overlaySrc = this.getAttribute('data-overlay');
      overlayImage.src = overlaySrc;
      overlay.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
  });

  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      overlay.style.display = 'none';
    }
  });
});