
const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=*';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fc9bd65e17msh78d99ab103bf137p19d812jsn8513f15d98a1',
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

        document.querySelector(".new").innerHTML = "";

        const MovieTitle = searchInput.value.trim();
        storedMovies.unshift(MovieTitle);

        localStorage.setItem("movies", JSON.stringify(storedMovies));
        const movie = storedMovies;

        movie.forEach(Title => {
            MovieDetails(Title); 
        });
    }

});


searchInput.addEventListener("click", (event) => {

        searchInput.value = "";


});

