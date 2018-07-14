const express = require('express');




const fetch = require('node-fetch');
let Key = require('./apiKey');
const fs = require('fs');

const app = express();
const https = require('https');
let getUpcomings = require('./upcomings.js');
let findMovie = require('./search.js');
let findM = require('./find.js');


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


    /*
    SingleMovie === undefined ?
        SingleMovie = popular.results.find(p => p.id == req.query.id) :
        SingleMovie === undefined ?
            SingleMovie = search.results.find(p => p.id == req.query.id) :
            SingleMovie === undefined ? res.render('not found =(') : res.next();
    */

}

function renderMovie(req, res) {

    let output = req.descr;

    res.render('movie', {
        title: `${output.title}`,
        output,
    });
}

app.get('/movie', findSingle, renderMovie);

/*
app.get('/movie', (req, res) => {
    //console.log(upcomings);

    let SingleMovie = upcomings.results.find(p => p.id == req.query.id);

    SingleMovie === undefined ?
        SingleMovie = popular.results.find(p => p.id == req.query.id) :
            SingleMovie === undefined ?
                SingleMovie = search.results.find(p => p.id == req.query.id) :
                    SingleMovie === undefined ? console.log('Movie not found...') :


    console.log(SingleMovie);

    res.render('movie', {
        title: `${SingleMovie.title}`,
        SingleMovie,
    });
});

*/
/*
function findByname(req, res, next) {

    let data = findMovie(1, req.query.query);
    console.log(data)

};

renderFinded = (req, res) => {

    let output = req.results;
    //console.log(output);

    res.render('index', {
        title: 'vidFlix',
        movies: search.results,
    })

};


app.get('/find', findByname, renderFinded);
*/

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


    /*
    var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
    try {
        findMovie(1, req.query.query);
        (async () => { await wait(2000);

            let data = search.results;
            console.log(data)

            res.render('results', {
                title: 'vidFlix',
                movies: data,
            })
        })();


    } catch (err) {
        console.log(err)
    }
     */
});


const server = app.listen(7070, () => {
    console.log(`Express running on PORT ${server.address().port}`);
    //console.log(tools.topCharts);
});




