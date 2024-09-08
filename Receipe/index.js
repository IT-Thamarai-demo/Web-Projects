const searchBox = document.querySelector(".searchbox");
const searchBtn = document.querySelector(".btn");
const recipeContainer = document.querySelector(".recipe-container");
const div = document.querySelector("#hai");

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

// Function to get recipes from API
function fetchRecipes(query) {
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
            <button class="view-recipe-btn">View Recipe</button>
          `;

          recipeDiv.querySelector(".view-recipe-btn").addEventListener("click", () => {
            openPopup(meal);
          });

          recipeContainer.appendChild(recipeDiv);
        });
      } else {
        recipeContainer.innerHTML = "<p>No recipes found.</p>";
      }
    })
    .catch((error) => console.error('Error fetching recipes:', error));
}

// Function to open the recipe details popup
function openPopup(meal) {
  const instructions = meal.strInstructions;

  div.innerHTML = `
    <div class="popup-content">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="popup-image">
      <p id="instructions">${instructions.split('\n').map(line => `<li>${line}</li>`).join('')}</p>
      <button class="close-btn">Close</button>
    </div>
  `;
  div.style.display = "block";

  // Event listener for close button
  document.querySelector(".close-btn").addEventListener("click", () => {
    div.style.display = "none";
  });
}
