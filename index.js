/**
 * Created by Drew on 2016-10-27.
 */
/**
 * Created by Drew on 2016-08-29.
 */
//initialize express
var express = require('express');
var app = express();


// Static Files ==================================================
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html'); //send index, all other routing done via angular-route
});
app.use('/', express.static(__dirname));
app.use('/assets', express.static(__dirname + '/node_modules'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));


// Connect to Database ==================================================
var mongoose = require('mongoose'); //middleware to connect to mongo
var db = require('./config/db'); //db config
mongoose.connect(db.url); //connect to mongo db.

var methodOverride = require('method-override');
app.use(methodOverride('X-HTTP-Method-Override'));


//  Morgan for Logging ==================================================
var morgan = require('morgan');
app.use(morgan('dev'));


//  multer to upload pictures ==================================================
var multer = require('multer');
var upload = multer({dest: './uploads'});


//TODO CConfigure Middleware
// Middleware ======================================================
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

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

//define port to run client app
var port = process.env.port || 5050;


//quick check to see if mongo is connected
app.get('/api/mongo-connect', function (req, res) {
    console.log(mongoose.connection.readyState);
    var status = mongoose.connection.readyState;
    res.send('The status of the connection is:' + status);

});

// routes ==================================================
require('./app/routes')(app); // configure our routes


app.listen(port);
console.log('The Client is running on port:', port);





