const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
}

next.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

prev.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
});

// Auto slide
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);