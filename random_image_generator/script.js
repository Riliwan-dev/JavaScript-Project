const container = document.getElementById("imageContainer");
const addBtn = document.getElementById("addImageBtn");
const toggleDark = document.getElementById("toggleDark");

function generateRandomImage() {
    const randomNum = Math.floor(Math.random() * 1000); 
    return `https://picsum.photos/300/200?random=${randomNum}`;
}

function addImage() {
    const img = document.createElement("img");
    img.src = generateRandomImage();
    container.appendChild(img);
}

// Load 6 images on page load
for (let i = 0; i < 6; i++) {
    addImage();
}

addBtn.addEventListener("click", addImage);

// Dark mode toggle
toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
