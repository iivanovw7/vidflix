const express = require('express');

const upcomings = require('./upcoming.json');
const popular = require('./popular.json');

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


app.get('/movie', (req, res) => {
    //console.log(upcomings);

    let SingleMovie = upcomings.results.find(p => p.id == req.query.id);

    SingleMovie === undefined ?
        SingleMovie = popular.results.find(p => p.id == req.query.id) :
        SingleMovie === undefined ? console.log('Movie not found...') :


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




