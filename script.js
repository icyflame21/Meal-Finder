const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  selectCategory = document.getElementById('select'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal'),
  Area = document.getElementById('area');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  //Get search term
  const query = search.value;

  //check for empty
  if (query.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        resultHeading.innerHTML = `<h2><u>Search results for '${query}'</u></h2>`;

        if (data.meals === null) {
          alert('There are no search results. Try again!');
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-MEALId=${meal.idMeal}>
                            <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                        `
            )
            .join('');
        }
      });
  } else {
    alert('Please enter a search term');
  }
}

submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', e => {
  // console.log(e);
  let val = e.path[0].dataset.mealid;
  if (val) {
    localStorage.setItem('val', JSON.stringify(val));
    window.location.href = './description.html';
  }
});
// Event listeners

random.addEventListener('click', () => {
  window.location.href = './recipe.html';
});

selectCategory.addEventListener('click', () => {
  window.location.href = './category.html';
});
Area.addEventListener('click', () => {
  window.location.href = './area.html';
});
// Debounce

var listresult = document.querySelector('.resultsList');
var ignoreClickOnMeElement = document.getElementById('search');
document.addEventListener('click', function (event) {
  var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
  if (!isClickInsideElement) {
    //Do something click is outside specified element
    listresult.innerHTML = '';
  }
});

let token = 0;
window.onload = () => {
  if (search.value.length == 0) {
    listresult.innerHTML = '';
  }
  search.onkeydown = event => {
    // console.log(event);
    if (event.Code == 'Backspace' && search.value.length == 0) {
      listresult.innerHTML = '';
    }
    clearTimeout(token);
    if (search.value.trim().length === 0) {
      return;
    }
    token = setTimeout(() => {
      searchShow(search.value);
    }, 250);
  };
};
async function searchShow(query) {
  try {
    var res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    var data = await res.json();
    // console.log(data.meals);
    Render_results(data.meals);
  } catch (error) {
    console.log(error);
  }
}
function Render_results(result) {
  listresult.innerHTML = '';
  result.forEach(data => {
    const { strMeal, strMealThumb } = data;
    const searchEl = document.createElement('div');
    searchEl.classList.add('resultsList_items');
    searchEl.innerHTML = `<img
    src="${strMealThumb}"
    alt=""
  />
  <div class="Searchinfo">
    <h3>${strMeal}</h3>
  </div>`;
    listresult.append(searchEl);
  });
}
