const random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

getRandomMeal();
function getRandomMeal() {
  //Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const meal = data.meals[0];

      addMealToDom(meal);
    });
}
function addMealToDom(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
          <div class="single-meal">
          <u><i><h1>${meal.strMeal}</h1></i></u>
              <img src="${meal.strMealThumb}" alt="" />
              <div class="single-meal-info">
              <h2><b>${meal.strCategory}</b></h2>
              </div>
              <div class="main">
                  <p>${meal.strInstructions}</p>
                  <h2>Ingredients</h2>
                  <ul>
                      ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                  </ul>
                  <a href='${meal.strSource}'><h3>Source</h3></a>
                  <a href='${meal.strYoutube}'><h3>Find This on YouTube</h3></a>
              </div>
          </div>
      `;
}
random.addEventListener('click', () => {
  window.location.href = './recipe.html';
});
