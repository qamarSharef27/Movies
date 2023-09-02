
const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=*';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b0770d5857mshc600ad7208fbf5cp1c3b22jsnb46c8b13d3e0',
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
    })
    .catch(err => console.log(err));
}

const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];

function displayStoredMovies() {
  ResultDiv.innerHTML = ""; 

  storedMovies.forEach(movieTitle => {
    MovieDetails(movieTitle);
  });
}

if (storedMovies.length === 0) {
  MovieDetails("*");
} else {
  displayStoredMovies();
}

const searchInput = document.getElementById("searchValue");

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const movieTitle = searchInput.value.trim();
    storedMovies.unshift(movieTitle);

    localStorage.setItem("movies", JSON.stringify(storedMovies));

    displayStoredMovies();
  }
});

searchInput.addEventListener("click", (event) => {
  searchInput.value = "";
});
