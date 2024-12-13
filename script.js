const searchBox = document.querySelector('.search-box');
const btn = document.querySelector('.btn');
const recipeContainer = document.querySelector('.recipeContainer');
const recipeDetailContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

//function to get recipes
const fetchRecipes = async (ourInput) =>{
    recipeContainer.innerHTML="<h2> Fetching Recipes...</h2>";
    document.getElementById('section').style.height="auto";
try {
    
    const data = await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ourInput}`);
    const response = await data.json();

    recipeContainer.innerHTML=""
    response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs To <span>${meal.strCategory}</span> Category</p>
    `
    const button=document.createElement('button');
    button.textContent="View recipe"
    recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });
    recipeContainer.appendChild(recipeDiv);
});
}
 catch (error) {
    recipeContainer.innerHTML="<h2>Error In Fetching Recipes...</h2>";
}
}

const fetchIngredients=(meal)=>{
    let ingredientsList ="";
    for(let i=1; i<=20; i++){
        const ingredient =meal[`strIngredient${i}`]
        if(ingredient){
            const measure =meal[`strMeasure${i}`];
        ingredientsList +=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup =(meal)=>{
    recipeDetailContent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents :</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div>
        <h3 class="recipeInstructions">Instructions:</h3>
        <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailContent.parentElement.style.display="block";
}
recipeCloseBtn.addEventListener('click',() =>{
    recipeDetailContent.parentElement.style.display="none";
});


btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    fetchRecipes(searchInput);

});


