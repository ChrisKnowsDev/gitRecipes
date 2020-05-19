const endpoint = 'http://www.recipepuppy.com/api/';
const proxy = 'https://cors-anywhere.herokuapp.com/';

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${endpoint}?q=${query}`);
  const data = await res.json();
  console.log(data.results);
}

fetchRecipes('steak');
