const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const recipeContainer = document.getElementById("recipeContainer");
const darkModeToggle = document.getElementById("darkModeToggle");
const favoritesBtn = document.getElementById("favoritesBtn");
const favoritesModal = document.getElementById("favoritesModal");
const favoritesList = document.getElementById("favoritesList");
const closeFavorites = document.getElementById("closeFavorites");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// 🌙 Dark Mode Setup
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// 🔍 Fetch Recipes
async function getRecipes(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.meals;
}

// 🧑‍🍳 Display Recipes
function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";

  if (!recipes) {
    recipeContainer.innerHTML = `<p class="placeholder">No recipes found 😢</p>`;
    return;
  }

  recipes.forEach(meal => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe");

    const isFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);

    recipeCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="recipe-content">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Origin:</strong> ${meal.strArea}</p>
        <button class="viewBtn">View Recipe</button>
        <button class="favorite-btn">${isFavorite ? "❤️ Remove" : "🤍 Favorite"}</button>
      </div>
    `;

    recipeCard.querySelector(".viewBtn").addEventListener("click", () => {
      showRecipeDetails(meal);
    });

    const favBtn = recipeCard.querySelector(".favorite-btn");
    favBtn.addEventListener("click", () => toggleFavorite(meal, favBtn));

    recipeContainer.appendChild(recipeCard);
  });
}

// ❤️ Toggle Favorites
function toggleFavorite(meal, button) {
  const index = favorites.findIndex(fav => fav.idMeal === meal.idMeal);
  if (index > -1) {
    favorites.splice(index, 1);
    button.textContent = "🤍 Favorite";
  } else {
    favorites.push(meal);
    button.textContent = "❤️ Remove";
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesList();
}

// 🧾 Show Favorites in Modal
function updateFavoritesList() {
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = `<p class="placeholder">No favorites added yet 😢</p>`;
    return;
  }

  favorites.forEach(meal => {
    const favCard = document.createElement("div");
    favCard.classList.add("favorite-card");

    favCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="favorite-info">
        <h4>${meal.strMeal}</h4>
        <button class="viewFav">View</button>
        <button class="removeFav">Remove</button>
      </div>
    `;

    favCard.querySelector(".viewFav").addEventListener("click", () => {
      showRecipeDetails(meal);
      closeFavoritesModal();
    });

    favCard.querySelector(".removeFav").addEventListener("click", () => {
      favorites = favorites.filter(fav => fav.idMeal !== meal.idMeal);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesList();
    });

    favoritesList.appendChild(favCard);
  });
}

// 🔘 Modal Controls
favoritesBtn.addEventListener("click", () => {
  favoritesModal.style.display = "flex";
  updateFavoritesList();
});

closeFavorites.addEventListener("click", closeFavoritesModal);

function closeFavoritesModal() {
  favoritesModal.style.display = "none";
}

// 🧾 Recipe Details View
function showRecipeDetails(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
  }

  recipeContainer.innerHTML = `
    <div class="recipe-details">
      <button id="backBtn">⬅ Back</button>
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>Ingredients:</h3>
      <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
      <a href="${meal.strYoutube}" target="_blank">🎥 Watch Video</a>
    </div>
  `;

  document.getElementById("backBtn").addEventListener("click", () => {
    getRecipes(searchInput.value).then(displayRecipes);
  });
}

// 🔍 Search Button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    getRecipes(query).then(displayRecipes);
  }
});
