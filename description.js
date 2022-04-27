const single_mealEl = document.getElementById('single-meal');
let val = JSON.parse(localStorage.getItem('val'));
console.log(val);
getData(val);
async function getData(id) {
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  let data = await (await fetch(url)).json();
  console.log(data.meals);
  addMealToDom(data.meals[0]);
}
function addMealToDom(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    }
  }

  single_mealEl.innerHTML = `
            <div class="single-meal">
                <h1>${meal.strMeal}</h1>
                <img src="${meal.strMealThumb}" alt="" />
                <div class="single-meal-info">
                <h2><b>${meal.strCategory}</b></h2>
                </div>
                <div class="main">
                    <p>${meal.strInstructions}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        ${ingredients.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                   
                    <a href='${
                      meal.strSource
                    }' target="iframe_a"><h3>Source</h3></a>
                    <a href='${
                      meal.strYoutube
                    }'><h3>Find This on YouTube</h3></a>
                </div>
            </div>
        `;
}
