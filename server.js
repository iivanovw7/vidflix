const express = require('express');

const upcomings = require('./upcoming.json');
const top_rated = require('./top_rated.json');
const now_playing = require('./now_playing.json');
const popular = require('./popular.json');
const delay = require('delay');

const app = express();
const https = require('https');
let getUpcomings = require('./upcomings.js');


app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

    try {
        getUpcomings(1, 'upcoming')
        res.render('index', {
            title: 'vidFlix',
            movies: upcomings.results,
        })
    } catch (err) {
        console.log(err)
    }

});

app.get('/toprated', (req, res) => {

    try {
        getUpcomings(1, 'top_rated')
        res.render('index', {
            title: 'vidFlix',
            movies: top_rated.results,
        })
    } catch (err) {
        console.log(err)
    }

});

app.get('/popular', (req, res) => {

    try {
        getUpcomings(1, 'popular')
        res.render('index', {
            title: 'vidFlix',
            movies: popular.results,
        })
    } catch (err) {
        console.log(err)
    }

});

app.get('/nowplaying', (req, res) => {

    try {
        getUpcomings(1, 'now_playing')
        res.render('index', {
            title: 'vidFlix',
            movies: now_playing.results,
        })
    } catch (err) {
        console.log(err)
    }

});


app.get('/movie', (req, res) => {
    //console.log(upcomings);

    let SingleMovie = upcomings.results.find(p => p.id == req.query.id);

    SingleMovie === undefined ?
        SingleMovie = top_rated.results.find(p => p.id == req.query.id) :
        SingleMovie === undefined ?
            SingleMovie = popular.results.find(p => p.id == req.query.id) :
            SingleMovie === undefined ?
                SingleMovie = now_playing.results.find(p => p.id == req.query.id) :
                console.log('Movie not found...');
    console.log(SingleMovie);

    res.render('movie', {
        title: `${SingleMovie.title}`,
        SingleMovie,
    });


});


const server = app.listen(7070, () => {
    console.log(`Express running on PORT ${server.address().port}`);
    //console.log(tools.topCharts);
});




