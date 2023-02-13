const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

const searchMeal = async (e) => {
  e.preventDefault();

  single_mealEl.innerHTML = "";

  const term = search.value;

  if (term.trim()) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );
      const data = await response.json();

      resultHeading.innerHTML = `<h2>Search results for "${term}"</h2>`;

      if (data.meals === null) {
        resultHeading.innerHTML = `<h2>There ara no search results. Try again!</h2>`;
      } else {
        mealsEl.innerHTML = data.meals
          .map(
            (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
          )
          .join("");
      }
    } catch (error) {
      console.log(error);
    }
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
};

const addMealToDOM = (meal) => {
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
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
      </ul>
    </div>
  </div>
`;
};

const getMealById = async (mealId) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    const meal = data.meals[0];

    addMealToDOM(meal);
  } catch (error) {
    console.log(error);
  }
};

const getRandomMeal = async () => {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  const data = await response.json();
  const meal = data.meals[0];

  addMealToDOM(meal);
};

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
mealsEl.addEventListener("click", (e) => {
  const path = e.path || (e.composedPath && e.composedPath());
  const mealInfo = path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    getMealById(mealId);
  }
});
