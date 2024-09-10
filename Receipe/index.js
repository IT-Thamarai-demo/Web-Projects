// Initialize Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}

// Recipe search functionality
document.querySelector('.btn').addEventListener('click', function () {
  if (!navigator.onLine) {
    showNoInternetMessage(); // Show no internet message if offline
  } else {
    const query = document.querySelector('.searchbox').value;
    fetchRecipe(query);
  }
});

// Fetch recipe from API
function fetchRecipe(query) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => {
      displayRecipes(data.meals);
    })
    .catch(error => {
      console.log('Error fetching recipes:', error);
    });
}

// Display list of recipes
function displayRecipes(meals) {
  const recipeContainer = document.querySelector('.recipe-container');
  recipeContainer.innerHTML = ''; // Clear previous results

  meals.forEach(meal => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <button class="view-recipe-btn">View Recipe</button>
    `;

    recipeCard.querySelector('.view-recipe-btn').addEventListener('click', function () {
      openRecipeDetails(meal);
    });

    recipeContainer.appendChild(recipeCard);
  });
}

// Open recipe details
function openRecipeDetails(meal) {
  document.querySelector('.recipe-container').style.display = 'none';
  const details = document.getElementById('recipe-details');
  details.style.display = 'block';

  document.getElementById('meal-name').innerText = meal.strMeal;
  document.getElementById('meal-thumb').src = meal.strMealThumb;

  const instructionsList = meal.strInstructions.split('\n').map(step => `<li>${step}</li>`).join('');
  document.getElementById('instructions-list').innerHTML = instructionsList;
}

// Back button to return to recipe finder
document.querySelector('.back-btn').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('recipe-details').style.display = 'none';
  document.querySelector('.recipe-container').style.display = 'flex';
});

// Show a message when offline
function showNoInternetMessage() {
  alert("You are currently offline. Please turn on your internet connection.");
}

// Listen for network changes
window.addEventListener('offline', function () {
  showNoInternetMessage(); // Show message when offline
});

window.addEventListener('online', function () {
  alert("You are back online! You can now search for recipes.");
});
