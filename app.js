var express = require('express');
var fs = require('fs');
const { send } = require('process');

var app = express();

var bodyParser = require('body-parser');
const { dirname } = require('path');
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/guestbook', function (req, res) {
    res.sendFile(__dirname + '/public/guestbook.html');
});

app.get('/newmessage', function (req, res) {
    res.sendFile(__dirname + '/public/newmessage.html');
});

app.post("/newmessage", function (req, res) {
    var data = require(__dirname + '/public/guestBookData.json');

    data.push({
        id: data.length +1,
        username: req.body.name,
        country: req.body.country,
        date: new Date(),
        message: req.body.message
    });

    var jsonStr = JSON.stringify(data);

    fs.writeFile(__dirname + '/public/guestBookData.json', jsonStr, (err) => {
        if(err) throw err;
    });

    res.redirect("/guestbook");
});

app.get('/ajaxmessage', function (req, res) {
    res.sendFile(__dirname + '/public/ajaxmessage.html');
});

app.post("/ajaxmessage", function (req, res) {

    var name = req.body.name;
    var country = req.body.country;
    var message = req.body.message;

    res.send("Name: " + name + ", Country: " + country + ", Message: " + message);
});

app.get('/test', function (req, res) {
    res.sendFile(__dirname + '/public/guestbook.html');
});

app.get('*', function (req, res) {
    res.status(404).send("Page not found...");
});

const PORT =process.env.PORT || 8080;

app.listen(PORT);