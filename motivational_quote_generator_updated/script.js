const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const btn = document.getElementById("btn");
const themeToggle = document.getElementById("themeToggle");
const bgChange = document.getElementById("bgChange");

async function getQuote() {
    try {
        quoteText.textContent = "Loading...";
        authorText.textContent = "";

        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        quoteText.textContent = data.content;
        authorText.textContent = "- " + data.author;

    } catch (error) {
        quoteText.textContent = "Failed to load quote :(";
        authorText.textContent = "";
    }
}

btn.addEventListener("click", getQuote);

/* DARK MODE TOGGLE */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

/* RANDOM BACKGROUND CHANGER */
const backgrounds = [
    "https://images.unsplash.com/photo-1503265192943-9d7eea6fc97c",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
];

function changeBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
}

bgChange.addEventListener("click", changeBackground);

// Load initial quote + random background
getQuote();
changeBackground();
