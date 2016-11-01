/**
 * Created by Drew on 2016-10-27.
 */
/**
 * Created by Drew on 2016-08-29.
 */
//initialize express
var express = require('express');
var app = express();

// routes ==================================================
require('./app/routes')(app); // configure our routes


// Static Files ==================================================
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html'); //send index, all other routing done via angular-route
});
app.use('/', express.static(__dirname));
app.use('/assets', express.static(__dirname + '/node_modules'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//adding morgan for console logging. Set on dev level
var morgan = require('morgan');
app.use(morgan('dev'));


//handle file uploads
var multer = require('multer');
var upload = multer({dest: './uploads'});


//configure sessions
var session = require('express-session');
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport - the authentication system
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


//Validator


var flash = require('connect-flash');
var mongo = require('mongodb');


var db = mongoose.connection;


//use body parser to read JSON bodies and URL encoding
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//define port to run client app
var port = process.env.port || 5050;





//Client API calls that will be forwarded to the Database
app.post('/api/high-5/create/user', function (req, res) {

    console.log(req.body);
    var testUser = createUser(req.body);
    var date = new Date();

    var testUserJson = {
        name: testUser.name,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        email: testUser.email,
        phone: testUser.phone,
        password: testUser.password,
        registrationDate: date.toJSON(),
        state: 'NEW',
        tokens: null,
        history: null
    };

    console.log(testUserJson);

    UserModel.create(testUserJson, function (err, user) {

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





