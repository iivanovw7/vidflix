'use strict';

const https = require('https');
const fs = require('fs');
const fetch = require('node-fetch');
let Key = require('./apiKey');

module.exports = function findMovie(page, index) {

    let p = encodeURI(index);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${Key.myKey()}&language=ru&query=${p}&page=${page}&include_adult=true`)
    //fetch(`https://api.themoviedb.org/3/search/movie?api_key=${Key.myKey()}&language=ru&query=${index}&page=${page}&include_adult=true`)
        .then(res => res.json())

        .then(json => {
            fs.writeFile('search.json', JSON.stringify(json, null, 2), function () {
                //fs.writeFile(`${index}.json`, data, function () {

                console.log(`Writing data in search.json done.`);

                return JSON.stringify(json, null, 2);
                //console.log(`https://api.themoviedb.org/3/movie/${index}?api_key=${Key.myKey()}&language=ru&page=${page}`)
            });

        })
        .then(json => {
            return JSON.stringify(json, null, 2);
        })
        .catch(error => console.error(error));

};