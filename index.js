/**
 * Created by Drew on 2016-10-27.
 */
/**
 * Created by Drew on 2016-08-29.
 */


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//adding morgan for console logging. Set on dev level
var morgan = require('morgan');
app.use(morgan('dev'));


//use body parser to read JSON bodies and URL encoding
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//define port to run client app
var port = process.env.port || 5050;


//added another virtual route to grab angular and ng-route because these
// were loaded via npm and therefore were left in a different dir than the rest of the js files.
app.use('/', express.static(__dirname));
app.use('/assets', express.static(__dirname + '/node_modules'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));


//this will send the index page to the frontend and will load all routing etc for SPA.
// All other routing for simple pages in done in main.js via angular.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});


//Connect to Database
mongoose.connect('mongodb://admin:iamtheadmin@192.168.2.131:27017/hi5_proto');
console.log(mongoose.connection.readyState);


//require the same mongo schema
var UserModel = require('../data-proto/user');

//quick module to create a proper post request
var createUser = require('./server/user-services/createUser.js');


//Client API calls that will be forwarded to the Database
app.post('/api/high-5/create/user', function (req, res) {

    console.log(req.body);
    var testUser = createUser(req.body);

    UserModel.create({
        name: testUser.name,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        email: testUser.email,
        phone: testUser.phone,
        password: testUser.password
    }, function (err, user) {

        if (err) {
            res.send(err);
            return;
        }

        res.send('received client post', user);

    })
});


//Client API calls that will be forwarded to the Database
app.post('/api/high-5/create/client', function (req, res) {

    console.log(req.body);
    res.send('received client post');

});

//quick check to see if mongo is connected
app.get('/api/mongo-connect', function (req, res) {
    console.log(mongoose.connection.readyState);
    var status = mongoose.connection.readyState;
    res.send('The status of the connection is:' + status);


});


app.listen(port);
console.log('The Client is running on port:', port);





