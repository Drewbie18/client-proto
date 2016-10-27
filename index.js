/**
 * Created by Drew on 2016-10-27.
 */
/**
 * Created by Drew on 2016-08-29.
 */


var express = require('express');
var app = express();
var http = require('http').Server(app);
var socketIo = require('socket.io')(http);


var port = process.env.port || 3000;

app.use('/', express.static(__dirname));

//map a virtual route /public in place of the actual /app,
// this will be used to fetch JS and CSS files
app.use('/public', express.static(__dirname + '/client/public'));


//added another virtual route to grab angular and ng-route because these
// were loaded via npm and therefore were left in a different dir than the rest of the js files.
app.use('/assets', express.static(__dirname + '/node_modules'));

//this will send the index page to the frontend and will load all routing etc for SPA.
// All other routing for simple pages in done in main.js via angular.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/public/index.html');
});


//simple test of getting route params from request
app.get('/api/item/:item_id/:item_name', function (req, res) {

    var responseObj = {
        "_id": req.params.item_id,
        "name": req.params.item_name,
        "text": "This is the object that you got back"
    }

    res.json(responseObj);

});


//another simple get to use an http call to get the spoof data
var orgs = require('./server/test-data/spoof-comments');
var generateRandom = require('./server/test-data/randomNumber');

app.get('/api/comments/all', function (req, res) {

    console.log(generateRandom(0, 10));

    setTimeout(function () {
        res.json(orgs);
    }, 2000);


});

app.get('/api/comments/none', function (req, res) {

    var data = {};
    res.json(data);

});


app.get('/api/data1', function (req, res) {

    var data = {
        data: "A message that is not an error", status: 200, config: Object, statusText: "OK"
    }

    var response = {};

    res.json(data);

});

//spoof assets
//another simple get to use an http call to get the spoof data
var assets = require('./server/test-data/spoofAssets');
app.get('/api/:orgId/assets', function (req, res) {

    var assetResponse = assets(req.params.orgId);
    console.log(assetResponse);

    //send response delayed to for spinner testing
    setTimeout(function () {
        res.json(assetResponse);
    }, 2000);

});

//get perils function
var perils = require('./server/test-data/spoofPerils');
app.get('/api/:orgId/perils', function (req, res) {

    //create list of perils with orgId
    var perilsResponse = perils(req.params.orgId);
    //send response delayed to for spinner testing
    setTimeout(function () {
        res.json(perilsResponse);
    }, 2000);

});

var monthData = require('./server/test-data/randomGraph');
app.get('/api/month-data', function (req, res) {

    //send response.
    res.json(monthData);

});

socketIo.on('connection', function (socket) {
    console.log('A user has connected');
})


//allow cors

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(port);
