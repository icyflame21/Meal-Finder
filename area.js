const mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal'),
  random = document.getElementById('random');

async function updateSelect() {
  let select = document.querySelector('#area');
  let url = `www.themealdb.com/api/json/v1/1/list.php?a=list`;
  let data = await (await fetch(url)).json();
  let categories = data.categories;
  let option = document.createElement('option');
  option.setAttribute('value', ``);
  option.innerHTML = 'Select By Area';

  select.append(option);

  categories.forEach(ele => {
    let option = document.createElement('option');
    option.setAttribute('value', `${ele.strArea}`);
    option.innerHTML = `${ele.strArea}`;
    select.append(option);
  });
  // storing Data in Local Storage
  storeData(categories);
}
updateSelect();

async function storeData(data) {
  for (var i = 0; i < data.length; i++) {
    const element = data[i];
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${element.strCategory}`;
    let Mealsvalue;
    try {
      meals = await (await fetch(url)).json();
    } catch (error) {
      console.log(error);
    }
    Mealsvalue = meals.meals;
    localStorage.setItem(`${element.strCategory}`, JSON.stringify(Mealsvalue));
  }
}

async function fetchData() {
  let category = document.querySelector('#category').value;
  // console.log(category);
  let data;
  if (category == `Beef`) {
    data = localStorage.getItem('Beef');
  } else if (category == `Chicken`) {
    data = localStorage.getItem('Chicken');
  } else if (category == `Dessert`) {
    data = localStorage.getItem('Dessert');
  } else if (category == `Lamb`) {
    data = localStorage.getItem('Lamb');
  } else if (category == `Miscellaneous`) {
    data = localStorage.getItem('Miscellaneous');
  } else if (category == `Pasta`) {
    data = localStorage.getItem('Pasta');
  } else if (category == `Pork`) {
    data = localStorage.getItem('Pork');
  } else if (category == `Seafood`) {
    data = localStorage.getItem('Seafood');
  } else if (category == `Side`) {
    data = localStorage.getItem('Side');
  } else if (category == `Starter`) {
    data = localStorage.getItem('Starter');
  } else if (category == `Vegan`) {
    data = localStorage.getItem('Vegan');
  } else if (category == `Vegetarian`) {
    data = localStorage.getItem('Vegetarian');
  } else if (category == `Breakfast`) {
    data = localStorage.getItem('Breakfast');
  } else if (category == `Goat`) {
    data = localStorage.getItem('Goat');
  }
  data = JSON.parse(data);
  console.log(data);
  single_mealEl.innerHTML = '';
  resultHeading.innerHTML = `<h2><u>Search results for '${category}'</u></h2>`;
  mealsEl.innerHTML = data
    .map(
      meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="" />
                    <div class="meal-info" data-MEALId=${meal.idMeal}>
                    <h3>${meal.strMeal}</h3>
                    </div>
                </div>
                `
    )
    .join('');
}

mealsEl.addEventListener('click', e => {
  let val = e.path[0].dataset.mealid;
  if (val) {
    localStorage.setItem('val', JSON.stringify(val));
    window.location.href = './description.html';
  }
});

random.addEventListener('click', () => {
  window.location.href = './recipe.html';
});
