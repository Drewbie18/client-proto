/**
 * Created by Drew on 2016-11-17.
 * A file for testing methods etc. Not for production *
 */


var tokenFactory = require('./app/auth/tokenFactory');

var token = tokenFactory.generateToken();

tokenFactory.verifyToken(token);


var date = (new Date).getTime();
console.log(date);


tokenFactory.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ODIzZWIxMGQ5M2NkNjBhNjRlMmZhMGMiLCJpYXQiOjE0Nzk0MzU5OTMsImV4cCI6MTQ3OTQzNjA1M30.Cqch-G_mc9yH7Ydct3iKn-_LVOIgxXklIH4pBcR-j1c');