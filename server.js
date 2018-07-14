const express = require('express');


const fetch = require('node-fetch');
let Key = require('./apiKey');
const fs = require('fs');

const app = express();
const https = require('https');
let getUpcomings = require('./upcomings.js');


app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

    let upcomings = require('./upcoming.json');


    try {
        getUpcomings(1, 'upcoming');
        res.render('index', {
            title: 'vidFlix',
            movies: upcomings.results,
        })
    } catch (err) {
        console.log(err)
    }

});


app.get('/popular', (req, res) => {


    let popular = require('./popular.json');

    try {
        getUpcomings(1, 'popular');
        res.render('index', {
            title: 'vidFlix',
            movies: popular.results,
        })
    } catch (err) {
        console.log(err)
    }

});

function findSingle(req, res, next) {

    delete require.cache[require.resolve('./search.json')];
    let upcomings = require('./upcoming.json');
    let popular = require('./popular.json');
    let search = require('./search.json');

    function sendOutput(output) {
        req.descr = output;

        return next()
    }


    let resultU = upcomings.results.find(p => p.id == req.query.id);
    let resultP = popular.results.find(p => p.id == req.query.id);
    let resultS = search.results.find(p => p.id == req.query.id);

    if (resultU === undefined) {
        if (resultP === undefined) {
            if (resultS === undefined) {
                res.render('movie not found =(');
            } else {
                sendOutput(resultS)
            }
        } else {
            sendOutput(resultP)
        }
    } else {
        sendOutput(resultU)
    }



}

function renderMovie(req, res) {

    let output = req.descr;

    res.render('movie', {
        title: `${output.title}`,
        output,
    });
}

app.get('/movie', findSingle, renderMovie);


app.get('/find', (req, res) => {

    function doSearch(callback) {
        let p = encodeURI(req.query.query);


        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${Key.myKey()}&language=ru&query=${p}&page=1&include_adult=true`)
        //fetch(`https://api.themoviedb.org/3/search/movie?api_key=${Key.myKey()}&language=ru&query=${index}&page=${page}&include_adult=true`)
            .then(res => res.json())

            .then(json => {

                fs.writeFile('search.json', JSON.stringify(json, null, 2), function () {

                    console.log(`Writing data in search.json done.`);

                });

                callback(json)
            })
            .catch(error => console.error(error));


    }

    function finished(data) {
        console.log(data)
        res.render('results', {
            title: 'vidFlix',
            movies: data.results,
        })
    }

    doSearch(finished)


});


const server = app.listen(7070, () => {
    console.log(`Express running on PORT ${server.address().port}`);

});




