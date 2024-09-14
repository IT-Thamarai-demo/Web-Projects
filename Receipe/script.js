// Initialize Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  }
  
  // Predefined recipe names for the welcome page and offline support
  const predefinedRecipeNames = ['Spaghetti Bolognese', 'Chicken Curry', 'Vegetable Stir Fry'];
  
  // Fetch and display predefined recipes on page load
  document.addEventListener('DOMContentLoaded', function() {
    fetchPredefinedRecipes();
  });
  
  // Fetch predefined recipes from TheMealDB API
  function fetchPredefinedRecipes() {
    const recipeContainer = document.querySelector('.recipe-container');
    recipeContainer.innerHTML = ''; // Clear previous results
  
    predefinedRecipeNames.forEach(recipeName => {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
        .then(response => response.json())
        .then(data => {
          if (data.meals && data.meals.length > 0) {
            const meal = data.meals[0]; // Get the first meal for the recipe name
            displayPredefinedRecipe(meal); // Display the recipe details
          }
        })
        .catch(error => {
          console.log(`Error fetching ${recipeName}:`, error);
        });
    });
  }
  
  // Display predefined recipe cards
  function displayPredefinedRecipe(meal) {
    const recipeContainer = document.querySelector('.recipe-container');
  
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
      <h3>${meal.strMeal}</h3>
      <button class="view-recipe-btn">View Recipe</button>
    `;
  
    // Event listener to open detailed recipe view
    recipeCard.querySelector('.view-recipe-btn').addEventListener('click', function () {
      openRecipeDetails(meal);
    });
  
    recipeContainer.appendChild(recipeCard);
  }
  
  // Open full recipe details
  function openRecipeDetails(meal) {
    document.querySelector('.recipe-container').style.display = 'none';
    const details = document.getElementById('recipe-details');
    details.style.display = 'block';
  
    document.getElementById('meal-name').innerText = meal.strMeal;
    document.getElementById('meal-thumb').src = meal.strMealThumb;
    document.getElementById('meal-thumb').loading = 'lazy';
  
    const instructionsList = meal.strInstructions.split('\n').map(step => `<li>${step}</li>`).join('');
    document.getElementById('instructions-list').innerHTML = instructionsList;
  
    // Embed YouTube video if available
    const videoUrl = meal.strYoutube ? meal.strYoutube.replace('watch?v=', 'embed/') : '';
    if (videoUrl) {
      document.getElementById('meal-video').src = videoUrl;
      document.getElementById('youtube-link').href = meal.strYoutube;
      document.getElementById('meal-video').style.display = 'block';
      document.getElementById('youtube-link').style.display = 'block';
    } else {
      document.getElementById('meal-video').style.display = 'none';
      document.getElementById('youtube-link').style.display = 'none';
    }
  }
  
  // Back button to return to recipe finder
  document.querySelector('.back-btn').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('recipe-details').style.display = 'none';
    document.querySelector('.recipe-container').style.display = 'flex';
  });
  
  // Save searched recipes to localStorage for offline use
  function saveToLocalStorage(query, meals) {
  const storedRecipes = JSON.parse(localStorage.getItem('storedRecipes')) || {};
  storedRecipes[query] = meals;
  localStorage.setItem('storedRecipes', JSON.stringify(storedRecipes));
}

  
  // Fetch user-searched recipe from TheMealDB API
  function fetchRecipe(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          displayRecipes(data.meals);
          saveToLocalStorage(query, data.meals); // Save for offline use
        } else {
          alert("No results found. Displaying predefined recipe names.");
          fetchPredefinedRecipes(); // Show predefined recipe names if API returns no result
        
        }
    
      })
      .catch(error => {
        console.log('Error fetching recipes:', error);
        alert("Error fetching from API. Displaying predefined recipe names.");
        fetchPredefinedRecipes(); // Show predefined recipes if API call fails
      });
  }
  
  // Display recipes from API response
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
  
  // Check local storage for offline recipes
 function searchOfflineRecipes(query) {
  const storedRecipes = JSON.parse(localStorage.getItem('storedRecipes')) || {};
  if (storedRecipes[query]) {
    displayRecipes(storedRecipes[query]);
  } else {
    alert("You are offline and no matching recipes found.");
  }
}

  
  // Add offline support for searching saved recipes
  document.querySelector('.searchbox').addEventListener('input', function () {
    const query = document.querySelector('.searchbox').value;
    if (!navigator.onLine) {
      searchOfflineRecipes(query);
    }
  });
  
  // Show predefined recipes if offline
  function showNoInternetMessage() {
    alert("You are currently offline. Displaying predefined recipe names.");
    fetchPredefinedRecipes();
  }
  
  // Listen for network changes
  window.addEventListener('offline', function () {
    showNoInternetMessage();
  });
  
  window.addEventListener('online', function () {
    alert("You are back online! You can now search for recipes.");
  });
  
  // Recipe search functionality
  document.querySelector('.btn').addEventListener('click', function () {
    const query = document.querySelector('.searchbox').value;
  
    if (!navigator.onLine) {
      showNoInternetMessage(); // Show predefined recipes if offline
      return;
    }
  
    if (query.trim() === '') {
      alert("Please enter a recipe name.");
      return;
    }
  
    fetchRecipe(query);
  });
  
  // Initialize Google Translate script dynamically
  (function() {
    var gtScript = document.createElement('script');
    gtScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(gtScript);
  })();
  
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
