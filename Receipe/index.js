// Select elements from the DOM
const searchBox = document.querySelector(".searchbox");
const searchBtn = document.querySelector(".btn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetails = document.querySelector(".recipe-details");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const div = document.querySelector("#hai");

// Function to get recipes from API
const fetchRecipes = (query) => {
  recipeContainer.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.meals) {
        data.meals.forEach((meal) => {
          const recipeDiv = document.createElement("div");
          recipeDiv.classList.add("recipe-card");

          recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>
          `;
          
          const button = document.createElement("button");
          button.textContent = "View Recipe";
          button.classList.add("view-recipe-btn");

          recipeDiv.appendChild(button);
          recipeContainer.appendChild(recipeDiv);

          button.addEventListener("click", () => {
            openPopup(meal);
          });
        });
      } else {
        recipeContainer.innerHTML = "<p>No recipes found.</p>";
      }
    })
    .catch((error) => console.error('Error fetching recipes:', error));
};

// Function to open the recipe details popup
function openPopup(meal) {
  div.innerHTML = `
    <div class="popup-content">
      <p>${meal.strInstructions}</p>
      <button class="close-btn">Close</button>
    </div>
  `;
  div.style.display = "block";
  document.querySelector(".close-btn").addEventListener("click", closePopup);
}

// Function to close the recipe details popup
function closePopup() {
  div.style.display = "none";
}

// Event listener for search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = searchBox.value.trim();
  if (input === "") {
    alert("Please enter a recipe to search.");
  } else {
    fetchRecipes(input);
  }
});
