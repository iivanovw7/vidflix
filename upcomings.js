const https = require('https');
const fs = require('fs');


function getUpcomings() {

    let movies = [];

    formMoviesList = () => {

        let object = JSON.parse(movies);
        let data  = JSON.stringify(object, null, 2)

        //fs.writeFile('upcomings.json', '', function(){console.log('Cleaning upcomings.json done.')});

        fs.writeFile('upcomings.json', data,  function(){console.log('Writing in upcomings.json done.')});

    };


    https.get('https://api.themoviedb.org/3/movie/upcoming?api_key=c571ded9ad0c6a2890529f93abee07c4&language=ru&page=1', (res) => {

        res.on('data', (d) => {
            movies += d;
        });

        res.on('end', () => {
            formMoviesList()
        });

    }).on('error', (e) => {
        console.error(e);
    });

};

setInterval(function () {
    getUpcomings();
    console.log('Collecting data from api...')
}, 48 * 60 * 60 * 1000);


