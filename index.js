/**
 * Created by Drew on 2016-10-27.
 */
/**
 * Created by Drew on 2016-08-29.
 */


var express = require('express');
var app = express();


var port = process.env.port || 5050;

app.use('/', express.static(__dirname));


//added another virtual route to grab angular and ng-route because these
// were loaded via npm and therefore were left in a different dir than the rest of the js files.
app.use('/assets', express.static(__dirname + '/node_modules'));

app.use('/js', express.static(__dirname + '/client/js'));

app.use('/css', express.static(__dirname + '/client/css'));


app.use('/img', express.static(__dirname + '/client/img'));

//this will send the index page to the frontend and will load all routing etc for SPA.
// All other routing for simple pages in done in main.js via angular.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});


app.listen(port);
console.log('The Client is running on port:', port);