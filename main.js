
const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=*';
const options = {
method: 'GET',
headers: {
    'X-RapidAPI-Key': 'dbbd273f02mshd405ce6e2755b1cp1be80djsne2ac269265e9',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
}
};

 const movieList = document.getElementById("movieList");
 const movieDetails = document.getElementById("movieDetails");

 let movies = [];

  function MovieDetails(movieName) {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${movieName}`, options)
        .then(response => response.json())
        .then(data => {
            const list = data.d;

            list.forEach(item => {
                const movieName = item.l;
                const poster = item.i.imageUrl;
                const year = item.y;
                const rank = item.rank;

                const titleButton = `<button class="collapse">${movieName}</button>`;
                const divTitle = `<div class="content"><p><b>Movie Poster:</b> <img src="${poster}"><br><b>Published year:</b>${year}<br><b>Movie Rank:</b> ${rank}<br></p></div>`;

                const movie = `<li class="class1">${titleButton + divTitle}</li>`;
                movieList.innerHTML += movie;

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
        const MovieTitle = searchInput.value.trim();
        movies.push(MovieTitle); 
        localStorage.setItem("movies", JSON.stringify(movies));
        MovieDetails(MovieTitle); 
        searchInput.textContent = "";
    }

});


   



