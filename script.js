'use strict';

let numberOfFilms;

const PersonalMoveDB = {
    count : numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privet: false
};

function start() {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
}

start();




function rememberMyFilms() {
    for ( let i = 0; i < 2; i++) {
        const  a = prompt ('Один из последних просмотренных фильмов?', ''),
               b = prompt('На сколько оцените его', '');
     
         if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                 PersonalMoveDB.movies[a] = b;
                 console.log('done!');
             } else {
                 console.log('error');
                 i--;
             }
     }
}

rememberMyFilms();

function detectPersonalLevel() { 
    if (PersonalMoveDB.count < 10) {
        console.log("Просмотрено слишком мало фильмов");
    } else if (PersonalMoveDB.count >= 10 && PersonalMoveDB.count < 30) {
        console.log("Вы классический зритель");
    } else if (PersonalMoveDB.count >=30) {
        console.log("Вы киноман");
    } else {
        console.log("Произошла ошибка");
    }
}

detectPersonalLevel();

function showMyDB(hidden) {
    if (!hidden) {
        console.log(PersonalMoveDB);
    } 
}

showMyDB(PersonalMoveDB.privet);

function writeYourGenres() {
    for (let i = 0; i <= 3; i++) {
        PersonalMoveDB.genres[i-1] = prompt(`Ваш любимый жанр под номером ${i}`);
    }
}
writeYourGenres();

