const baseEndpoint = 'https://api.icndb.com/jokes/random';
const jokesDisplay = document.querySelector('.jokesDisplay');
const button = document.querySelector('.getJokes');
const spinner = document.querySelector('.spinner');
const loader = document.querySelector('.loader');

async function fetchJoke(numberOfJokes) {
  loader.classList.remove('hidden');
  jokesDisplay.classList.add('hidden');

  const resp = await fetch(`${baseEndpoint}/${numberOfJokes}`);
  const data = await resp.json();

  loader.classList.add('hidden');
  jokesDisplay.classList.remove('hidden');

  return data;
}

async function displayJoke(numberOfJokes) {
  const jokes = await fetchJoke(numberOfJokes);

  const jokesArray = Object.values(jokes.value);

  const html = jokesArray.map(singleJoke => `<p>${singleJoke.joke}</p> <hr>`);
  jokesDisplay.innerHTML = html.join('');
}

function handleError(err) {
  loader.classList.add('hidden');
  jokesDisplay.classList.remove('hidden');

  console.log('Oh NO!');
  console.log(err);
  jokesDisplay.textContent = `Something went wrong 💩💩 ${err}`;
}

function handleClick(e) {
  e.preventDefault();
  displayJoke(spinner.value).catch(handleError);
}

button.addEventListener('click', handleClick);
