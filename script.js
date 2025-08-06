async function searchRecipe() {
  const input = document.getElementById('searchInput').value.trim();
  const container = document.getElementById('recipeContainer');
  container.innerHTML = "";

  if (input === "") {
    container.innerHTML = "<p>Please enter a dish name.</p>";
    return;
  }

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
  const data = await res.json();

  if (!data.meals) {
    container.innerHTML = `<p>No recipe found for "${input}".</p>`;
    return;
  }

  const meal = data.meals[0];
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  container.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul>${ingredients.map(item => `<li>${item}</li>`).join('')}</ul>
    <h3>Instructions:</h3>
    <p class="instructions">${meal.strInstructions}</p>
  `;
}
