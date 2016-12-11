/**
 * Created by Drew on 2016-11-17.
 */

var tokenFactory = require('./tokenFactory');

module.exports = function (app) {


    //allow the client to quickly verify if the auth token is still valid on landing
    app.get('/api/token/verify', function (req, res) {

        var token = req.header('x-auth');

        var verify = tokenFactory.verifyToken(token);

        //if true send the okay status
        if (verify.status) {
            res.status(200).send();
        } else {
            //if the status returns false send 401 unauthorized
            res.status(401).send('Token is not valid.');
        }

    });


    //allow the client to quickly verify if the auth token is still valid on landing
    app.post('/api/refresh/verify', function (req, res) {

        var key = 'secret-key';

        var refreshToken = req.body.refreshToken;

        console.log('REFRESH TOKEN FROM FRONT', refreshToken);

        var verify = tokenFactory.verifyRefreshToken(refreshToken, key);

        console.log('RESULT FROM REFRESH VERIFY', verify);

        //if true send the okay status
        if (verify) {
            res.status(200).send();
        } else {
            //if the status returns false send 401 unauthorized
            res.status(401).send('Token is not valid.');
        }

    });


};