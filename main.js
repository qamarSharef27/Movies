
const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=*';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '65fee9fa11msh3dbb751cc4b151fp1b0d12jsn33a61633b290',
		'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
	}
};


const ResultDiv = document.querySelector(".searchResults");
const searchHistory = document.getElementById('searchHistory');

let movies = [];

function MovieDetails(movieName) {
  ResultDiv.innerHTML = "";

  fetch(`https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=${movieName}`, options)
    .then(response => response.json())
    .then(({ data: list }) => {
      list.forEach(({ title: movieTitle, image: poster, stars }) => {
        const picture = `<img src="${poster}" alt="movie" class="picture">`;
        const description = `<div class="description"><p><b> Movie Name: </b> ${movieTitle } <br></br> <b> Movie Stars: </b> ${stars} <br></p></div>`;
        const newDiv = `<div class="new">${picture + description}</div>`;
        ResultDiv.innerHTML += newDiv;
      });

      localStorage.setItem("movies", JSON.stringify([movieName]));
    })
    .catch(err => console.log(err));
}

const searchInput = document.getElementById("searchValue");

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const movieTitle = searchInput.value.trim();

    localStorage.clear();
    MovieDetails(movieTitle);

    searchInput.placeholder = movieTitle;

  }
});

searchInput.addEventListener("click", (event) => {
  searchInput.value = "";
});

const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];

if (storedMovies.length === 0) {
  MovieDetails("*");
} else {
  MovieDetails(storedMovies[0]);
  searchInput.placeholder = storedMovies[0];
}

searchInput.addEventListener('click', function() {
  searchInput.placeholder = 'Search for a movie by Title: ';
});