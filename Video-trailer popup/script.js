const trailer = document.getElementById("trailer");
const video = document.getElementById("video");
const watchBtn = document.getElementById("watch-btn");
const closeBtn = document.getElementById("close-btn");

watchBtn.addEventListener("click", () => {
  trailer.classList.add("active");
  video.play();
});

closeBtn.addEventListener("click", () => {
  trailer.classList.remove("active");
  video.pause();
  video.currentTime = 0;
});

trailer.addEventListener("click", (e) => {
  if (e.target === trailer) {
    trailer.classList.remove("active");
    video.pause();
    video.currentTime = 0;
  }
});
