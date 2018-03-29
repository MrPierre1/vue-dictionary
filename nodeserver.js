var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var port = process.env.PORT || 5000;

var fs = require('fs');

function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        } catch (exception) {
            callback(exception);
        }
    });
}

readJSONFile('dictionary.json', function (err, json) {
    if (err) { throw err; }
    // console.log(json);
});


app = express();
app.get('/getWord', (req, res) => {
    // var word = req.body.word;
    console.log('This is the request',req.query.searchTerm, typeof req.query.searchTerm)
    readJSONFile('dictionary.json', function (err, json) {
        if (err) { throw err; }
        console.log(typeof json);

        // res.send("I did it ma", err, json)
        console.log('item term ', json[req.query.searchTerm])
        res.send(json[req.query.searchTerm])
    });
    
})

app.get('/postWord', (req, res) => {
    console.log('This is the request', req.query.wordList, typeof req.query.wordList)
    
    // var word = req.body.word;
    // console.log('This is the request', req.query.searchTerm, typeof req.query.searchTerm)
    // readJSONFile('dictionary.json', function (err, json) {
    //     if (err) { throw err; }
    //     console.log(typeof json);

    //     // res.send("I did it ma", err, json)
    //     console.log('item term ', json[req.query.searchTerm])
    //     res.send(json[req.query.searchTerm])
    // });

    fs.writeFile('wordList.json', JSON.stringify(req.query.wordList), function (err) {
        if (err) throw err;
        console.log(wordList.json, "wordlist api ",req.query.wordList)
    })
})


app.use(serveStatic(__dirname + "/"));

app.listen(port);
