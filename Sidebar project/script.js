document.getElementById("openMenu").addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("show");
});

document.getElementById("closeMenu").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("show");
});
