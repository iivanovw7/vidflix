const https = require('https');
const fs = require('fs');
const fetch = require('node-fetch');
let Key = require('./apiKey');

module.exports = function getUpcomings(page, index) {


    fetch(`https://api.themoviedb.org/3/movie/${index}?api_key=${Key.myKey()}&language=ru&page=${page}`)
        .then(res => res.json())
        .then(json => {
            delete require.cache[require.resolve(`./${index}.json`)];
            fs.writeFile(`${index}.json`, JSON.stringify(json, null, 2), function () {
          //fs.writeFile(`${index}.json`, data, function () {
                console.log(`Writing data in ${index}.json done.`);
                console.log(`https://api.themoviedb.org/3/movie/${index}?api_key=${Key.myKey()}&language=ru&page=${page}`)
                return JSON.stringify(json, null, 2);

            });
        })
        .catch(error => console.error(error));

};


