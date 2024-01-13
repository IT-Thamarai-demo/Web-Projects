
const searchBox = document.querySelector(".Searchbox");
const searchBtn = document.querySelector(".btn");
const RecipeContainer = document.querySelector(".recipe-contanier");
const Receipe_details = document.querySelector(".recipe-details");
const ReceipeClosebtn = document.querySelector(".recipe-close-btn");
const ext=document.querySelector(".receipe.details");
const div=document.querySelector("#hai");
// function to get recipes
const fetchRecipes = (query) => {
  RecipeContainer.innerHTML="";
 

 
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((res) => res.json())
    
    .then((data) => {
      data.meals.forEach((meal) => {
       const receipeDiv=document.createElement("div")
       receipeDiv.classList.add("receipe")
       

    
       receipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p>${meal.strArea}</p>
          <p>${meal.strCategory}</p>
          
        `;
        searchBox.value="";
       
        const button=document.createElement("button")
        button.textContent="View Receipe";
         
        RecipeContainer.appendChild(receipeDiv)
        receipeDiv.appendChild(button)
     
        button.addEventListener("click",()=>{
            openpopup(meal);
        })
    
      });
  
    })
   
   
};

function openpopup(meal)
{
    div.innerHTML=`
    <div class="fix">
        <p>${meal.strInstructions}</p>
        <button class="clbtn" onclick=rem(event)>CLose<button>
    </div>
    `;
    div.style.display="block"
}
function rem(event)
{
     console.log("clicked");
     event.target.parentElement.remove();
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = searchBox.value.trim();
  if(input==="")
  {
    alert("search receipe at the moment")
  }
  else
  {
   fetchRecipes(input)
  }

  
  }
);



