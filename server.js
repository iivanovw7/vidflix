const express = require('express');
const people = require('./people.json');
const upcomings = require('./upcomings.json');
const app = express();
const https = require('https');



app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'vidFlix.com',
        people: people.profiles,
        movies: upcomings.results,
    });
});


app.get('/profile', (req, res) => {
    const person = people.profiles.find(p => p.id === req.query.id);
    res.render('profile', {
        title: `About ${person.firstname} ${person.lastname}`,
        person,
    });
});

app.get('/movie', (req, res) => {
    console.log(upcomings);

    const SingleMovie = upcomings.results.find(p => p.id == req.query.id);
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


