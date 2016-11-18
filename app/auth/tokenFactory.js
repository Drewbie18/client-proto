/**
 * Created by Drew on 2016-11-17.
 *
 * AUTH SERVER
 *
 * This will be part of the auth server. Function of this file will include
 * 1. Generate Auth token on successful login
 * 2. Generate refresh token for client
 * 3. Validate refresh token and if verified generate a new auth token
 *
 */

const jwt = require('jsonwebtoken');

//create an object and attach methods on it.
var factory = {};

//this will return a basic auth token
factory.generateToken = function (userId, key) {

    key = 'secret-key';

    //create JWT data, IAT is appended automatically.
    var data = {
        userId: userId,
    };

    var token = jwt.sign(data, key, {expiresIn: '6h'});
    console.log(token);
    //return the token to send to the client.
    return token
};

//this will verify a token
factory.verifyToken = function (token, key) {

    key = 'secret-key1';

    //if there is an error i.e the token is invalid it will be caught.
    try {
        var decoded = jwt.verify(token, key);
        console.log('This is the decoded token we got back', decoded);

        var expiry = new Date(decoded.exp * 1000);
        var date = new Date(decoded.iat * 1000);
        console.log('IAT date returned: ', date);
        console.log('EXP date returned: ', expiry);

        //
    } catch (decodeError) {
        console.log('There was an error decoding the token', decodeError);

        return decodeError;

    }

};


module.exports = factory;