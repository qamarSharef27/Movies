
const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=*';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'dcd7afa16emsh31bc83b2e3c0b01p1b8e80jsnbdccd3c0d71e',
		'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
	}
};

const ResultDiv = document.querySelector(".searchResults");
const searchHistory = document.getElementById('searchHistory');

 let movies = [];

  function MovieDetails(movieName) {
    fetch(`https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=${movieName}`, options)
        .then(response => response.json())
        .then(({ data: list }) => {

            list.forEach(({ title: movieTitle, image: poster, stars }) => {
                
                const picture = `<img src="${poster}" alt="movie" class = "picture">`;
                const description = `<div class="description"><p><b> Movie Name: </b> ${movieTitle } <br></br> <b> Movie Stars: </b> ${stars} <br></p></div>`;               


                const newDiv = `<div class="new">${picture + description}</div>`;


                ResultDiv.innerHTML += newDiv;
                

            });
           
        })
        .catch(err => console.log(err));
}

const storedMovies = JSON.parse(localStorage.getItem("movies"));

if (storedMovies !== null){

if (Array.isArray(storedMovies)) {
    movies = storedMovies;
    storedMovies.forEach(movieTitle => {
        MovieDetails(movieTitle); 
    });
}
}

else if (storedMovies == null){
    MovieDetails("*"); 
}
   

const searchInput = document.getElementById("searchValue");

searchInput.addEventListener("keyup", (event) => {

    if (event.key === "Enter") {
        event.preventDefault(); 
        const MovieTitle = searchInput.value.trim();
        movies.push(MovieTitle); 
        localStorage.setItem("movies", JSON.stringify(movies));
        MovieDetails(MovieTitle); 
        searchInput.value = "";
    }

});





