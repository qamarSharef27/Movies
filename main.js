
const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=*';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a1b1494a5dmsh2a30439f2541b5dp12737fjsn99efdbbfaaa4',
		'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
	}
};

const ResultDiv = document.querySelector(".searchResults");

 let movies = [];
 var d = 0;

  function MovieDetails(movieName) {
    fetch(`https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=${movieName}`, options)
        .then(response => response.json())
        .then(data => {
            const list = data.data;

                list.forEach(item => {
                const movieTitle  = item.title;
                const poster = item.image;
                const stars = item.stars;

                const picture = `<img src="${poster}" alt="movie" class = "picture">`;
                const description = `<div class="description"><p><b> Movie Name: </b> ${movieTitle } <br></br> <b> Movie Stars: </b> ${stars} <br></p></div>`;               


                const newDiv = `<div class="new">${picture + description}</div>`;


                ResultDiv.innerHTML += newDiv;
                
                d += 1;

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


   



