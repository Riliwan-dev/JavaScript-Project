function animateValue(id, end, duration) {
  let start = 0;
  let increment = Math.ceil(end / (duration / 20));
  let element = document.getElementById(id);

  let counter = setInterval(() => {
    start += increment;
    if (start >= end) {
      start = end;
      clearInterval(counter);
    }
    element.textContent = start;
  }, 20);
}

window.onload = () => {
  animateValue("work", 5, 1500);
  animateValue("websites", 20, 1500);
  animateValue("apps", 8, 1500);
  animateValue("projects", 33, 1500);
};

document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
