/**
 * Created by Drew on 2016-11-17.
 * A file for testing methods etc. Not for production *
 */


var tokenFactory = require('./app/auth/tokenFactory');

var token = tokenFactory.generateToken();


var SHA256 = require('crypto-js/sha256');

var message = 'I am user number something';

var hash = SHA256(message).toString();

console.log(message);
console.log(hash);


var jwt = require('jsonwebtoken');


//example data object with user ID
var data = {id: 10};


//takes the data object and signs it (hashes it)
//takes the data and our sercet
var token = jwt.sign(data, 'my-secret');
console.log('token: ', token);

//takes the token and secret and makes sure the data was not manipulated
var decoded = jwt.verify(token, 'my-secret');

console.log('decoded:', decoded.header);

var date = new Date(decoded.iat);
console.log(date);