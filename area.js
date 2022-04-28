const mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal'),
  random = document.getElementById('random');

async function updateSelect() {
  let select = document.querySelector('#area');
  let url =`https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  let data = await (await fetch(url)).json();
  // console.log(data.meals)
  const categories=data.meals
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
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${element.strArea}`;
    let Mealsvalue;
    try {
      meals = await (await fetch(url)).json();
    } catch (error) {
      console.log(error);
    }
    Mealsvalue = meals.meals;
    localStorage.setItem(`${element.strArea}`, JSON.stringify(Mealsvalue));
  }
}

async function fetchData() {
  let area = document.querySelector('#area').value;
  let data;
  if (area == `American`) {
    data = localStorage.getItem('American');
  } else if (area == `British`) {
    data = localStorage.getItem('British');
  } else if (area == `Canadian`) {
    data = localStorage.getItem('Canadian');
  } else if (area == `Chinese`) {
    data = localStorage.getItem('Chinese');
  } else if (area == `Croatian`) {
    data = localStorage.getItem('Croatian');
  }else if (area == `Dutch`) {
    data = localStorage.getItem('Dutch');
  }else if (area == `Egyptian`) {
    data = localStorage.getItem('Egyptian');
  }else if (area == `French`) {
    data = localStorage.getItem('French');
  } else if (area == `Greek`) {
    data = localStorage.getItem('Greek');
  } else if (area == `Indian`) {
    data = localStorage.getItem('Indian');
  } else if (area == `Irish`) {
    data = localStorage.getItem('Irish');
  } else if (area == `Italian`) {
    data = localStorage.getItem('Italian');
  } else if (area == `Jamaican`) {
    data = localStorage.getItem('Jamaican');
  } else if (area == `Kenyan`) {
    data = localStorage.getItem('Kenyan');
  } else if (area == `Japanese`) {
    data = localStorage.getItem('Japanese');
  } else if (area == `Malaysian`) {
    data = localStorage.getItem('Malaysian');
  }else if (area == `Mexican`) {
    data = localStorage.getItem('Mexican');
  }else if (area == `Moroccan`) {
    data = localStorage.getItem('Moroccan');
  }else if (area == `Polish`) {
    data = localStorage.getItem('Polish');
  }else if (area == `Portuguese`) {
    data = localStorage.getItem('Portuguese');
  }else if (area == `Russian`) {
    data = localStorage.getItem('Russian');
  }else if (area == `Spanish`) {
    data = localStorage.getItem('Spanish');
  }else if (area == `Thai`) {
    data = localStorage.getItem('Thai');
  }else if (area == `Tunisian`) {
    data = localStorage.getItem('Tunisian');
  }else if (area == `Turkish`) {
    data = localStorage.getItem('Turkish');
  }else if (area == `Unknown`) {
    data = localStorage.getItem('Unknown');
  }else if (area == `Vietnamese`) {
    data = localStorage.getItem('Vietnamese');
  }
  data = JSON.parse(data);
  single_mealEl.innerHTML = '';
  resultHeading.innerHTML = `<h2><u>Search results for '${area}'</u></h2>`;
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
