/**
 * Created by Drew on 2017-01-19.
 *
 * This file will contain the authorization routes that the client will use to authenticate with:
 * 1. Local strategy
 * 2. Facebook
 * 3. Google
 *
 */

var tokenFactory = require('./tokenFactory');

module.exports = function (app, passport) {

    //user login using the local strategy
    app.post('/user/login/local', passport.authenticate('local'),  //can add custom callback to authenticate function

        //if this function is called the user was authenticated. If not passport will return a 401 Unauthorized
        function (req, res) {

            console.log('Login success, generating tokens for user.');
            console.log('user object returned from auth', req.user._id);
            //generate Auth token synchronously
            var authToken = tokenFactory.generateToken(req.user._id);
            var key = 'secret-key';

            function sendResult(successResponse) {
                //if true send the okay status, if there was an error this would be undefined or null
                if (successResponse.refreshToken) {
                    res.header('x-auth', authToken).send(successResponse);
                } else {
                    //if the status returns false send 401 unauthorized
                    res.status(401).send('Token is not valid.');
                }
            };
            //generate and encrypt refreshToken via async waterFall
            tokenFactory.generateRefreshToken(req.user._id, key, sendResult);

        });


}