let numberOfFilms;

function start() {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while(numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    
    }
}

start();


const personalMovieDB = {
    count: numberOfFilms,
    
    movies: {},
    actors: {},
    genres: [],
    privet: false

};

    function rememberMyFilms() {

        for (let i = 0; i < 2; i++) {
        
            const a = prompt('Один из последних просмотров фильмов?', ''),
                  b = prompt('На сколько оцените его?', '');
    
            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
    
                personalMovieDB.movies[a] = b;
                console.log('Done!');
            } else {
                console.log('error');
                i--;
            }
            
            personalMovieDB.movies[a] = b;
        }
        
    }

    
    rememberMyFilms();
    
    function detectPersonalLevel() {

    if (personalMovieDB.count < 10) {
        console.log('Просмотренно довольно мало фильмов!');

    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log('Вы классический зритель');
    } else if (personalMovieDB.count >= 30 && personalMovieDB.count >= 30) {
        console.log('Вы кuноман'); 
    } else {
            console.log('Произошла ошибка');
        }
    
    }

        detectPersonalLevel();

        function showMyDB (hidden) {
            if (!hidden) {
                console.log(personalMovieDB.movies);
            }
        }        

       showMyDB(personalMovieDB.privet);
       
       function writeYourGenres () {
            for (let i = 1; i <= 3; i++) {
                personalMovieDB.genres.push[i-1] = prompt(`Ваш любимый жанр под номером ${i}`);;
                
            }

       }

       writeYourGenres();
       