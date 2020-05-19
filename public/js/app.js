const endpoint = 'http://www.recipepuppy.com/api/';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('form.search');
const recipesSection = document.querySelector('.recipes');

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${endpoint}?q=${query}`);
  const data = await res.json();
  return data;
}

function displayRecipes(recipes) {
  const html = recipes.map(
    recipe => `
    <div class='recipe'>
      <h2>${recipe.title}</h2>
      <p>${recipe.ingredients}</p>
      ${recipe.thumbnail &&
        `<img src='${recipe.thumbnail}' alt='${recipe.title}'/>`}
      <a href='${recipe.href}'>View Recipe</a>
    </div>
  `
  );
  recipesSection.innerHTML = html.join('');
}

async function handleSubmit(event) {
  event.preventDefault();
  const el = event.currentTarget;
  // turn form off
  el.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(el.query.value);
  el.submit.disabled = false;
  displayRecipes(recipes.results);
}

async function fetchAndDisplay(query) {
  // turn form off
  form.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(form.query.value);
  form.submit.disabled = false;
  displayRecipes(recipes.results);
}

form.addEventListener('submit', handleSubmit);

fetchAndDisplay('steak');
