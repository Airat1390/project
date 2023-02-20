const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    
    movies: {},
   
    actors: {},

    genres: [],

    privet: false

};

const a = prompt('Один из последних просмотров фильмов?', ''),
    b = prompt('На сколько оцените его?', ''),
    c = prompt('Один из последних просмотров фильмов?', ''),
    d = prompt('На сколько оцените его', '');

    personalMovieDB.movies[a] = b;
    personalMovieDB.movies[c] = d;

    console.log(personalMovieDB.movies);
    

