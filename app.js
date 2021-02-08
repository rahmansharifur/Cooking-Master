// searce Button for meal name
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const inputMeal = document.getElementById('meal-input').value;
    getMeal(inputMeal)
})


// meals Deatile and recived API
const getMeal = meal => {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(response => response.json())
        .then(data => displayMealList(data.meals))
        .catch(error => displayError('Something Went Wrong!!  Please try again later!'));
}



const displayMealList = meals => {

    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';
        mealDiv.innerHTML = ` 
        <div class = "meal-item " data-id = "${meal.idMeal}">
        <div class = "meal-img">
            <img oneclick="displayIngredientsDetails 
            ('${meal.strMeal}')" src = "${meal.strMealThumb}" oneclick="displayIngredientsDetails 
            ('${meal.strMeal}>
        </div>
        <div class = "meal-name">
            <h5>${meal.strMeal}</h5>
            <button type = "button"
            class = "btn btn-secondary btn-sm"  onclick="displayIngredients('${meal.strMeal}')"> Ingredient</button>
            
        </div>
    </div>`;

        mealList.appendChild(mealDiv);
    })




}

// Ingredients  Details received API

const displayIngredients = itemName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayIngredientsDetails(data.meals[0]))
}

const displayIngredientsDetails = item => {
    console.log(item.strMealThumb)
    const ingredientDetailDiv = document.getElementById('ingredientDetail');

    const ingredientDiv = document.createElement('div');
    ingredientDiv.className = 'ingredient';

    ingredientDiv.innerHTML = `    
    <div class = " meal-img">
        <img src = "${item.strMealThumb}" alt = "">
    </div>

    <div class = "instruct">
      <h3>${item.strMeal}</h3><br>
      <p><i class="fas fa-check-circle"></i>  ${item.strIngredient1} ${item.strMeasure1} </p>
      <p><i class="fas fa-check-circle"></i>  ${item.strIngredient2} ${item.strMeasure2} </p>
      <p><i class="fas fa-check-circle"></i>  ${item.strIngredient3} ${item.strMeasure3} </p>
      <p><i class="fas fa-check-circle"></i>  ${item.strIngredient4} ${item.strMeasure4} </p>
      <p><i class="fas fa-check-circle"></i>  ${item.strIngredient5} ${item.strMeasure5} </p>
    </div>

  <div class = "link">
    <a href = "${item.strYoutube}" target = "_blank">Watch Video</a>
  </div>`;

    ingredientDetailDiv.appendChild(ingredientDiv);
    console.log(ingredientDetailDiv)
}



// error massage
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}