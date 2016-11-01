/**
 * Created by Drew on 2016-10-30.
 *
 * This file will contain a function to take the request data from the User Registraion form
 * and create a valid user request to will conform to the data model for a user document in Mongo.
 *
 */

var uuid = require('node-uuid'); //package that will create uuid according RFC 4122

//quick function to have some random numbers to create a user
var generateRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

};

//function to see if we have something to send to the backend
var verifyData = function (entry) {
    return (entry == null || entry == undefined || entry == '-')
};


//if no email is given this will be used as default
var defaultEmail = generateRandom(0, 100000) + '-client-proto@yopmail.com';

//if no password was given
var defaultPass = '1234';

//default username to use
var defaultUserName = 'User-' + generateRandom(0, 1000);

var defaultFirstName = 'John';
var defaultLastName = "Doe";


function createUser(data) {

    console.log(data);

    var name, firstName, lastName, email, password;

    //user name
    if (verifyData(data.userName)) {
        name = defaultUserName
    } else {
        name = data.userName
    }

    //firstname
    if (verifyData(data.firstName)) {

        firstName = defaultFirstName
    } else {
        firstName = data.firstName
    }

    //lastname
    if (verifyData(data.lastName)) {

        lastName = defaultLastName
    } else {
        lastName = data.lastName
    }

    //email
    if (verifyData(data.email)) {

        email = defaultEmail
    } else {
        email = data.email
    }

    //password
    if (verifyData(data.password)) {

        password = defaultPass
    } else {
        password = data.password
    }


    var newUser = {
        name: name,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: data.mobilePhone,
        password: password
    };

    console.log('based on the inputs this is the new user', newUser);

    return newUser;

}


module.exports = createUser;