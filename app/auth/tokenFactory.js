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

var factory = {};

factory.generateToken = function (userId, key) {

    key = 'secret-key'


    //create a JWT to send back to the client
    var data = {
        userId: '5823eb10d93cd60a64e2fa0c',
    };

    var token = jwt.sign(data, key, {expiresIn: 60});

    console.log(token);

    return token

}


factory.verifyToken = function (token, key) {

    key = 'secret-key'

    try {
        var decoded = jwt.verify(token, key);
        console.log('This is the decoded token we got back', decoded);

        var expiry = new Date(decoded.exp * 1000)
        var date = new Date(decoded.iat * 1000);
        console.log('IAT date returned: ', date);
        console.log('EXP date returned: ', expiry);

    } catch (e) {
        console.log('There was an error decoding the token', e);
    }


}


module.exports = factory;