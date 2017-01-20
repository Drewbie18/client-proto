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
const log4js = require('../../config/loggerConf');
var logger = log4js.getLogger('auth');

module.exports = function (app, passport) {

    //user login using the local strategy
    app.post('/user/login/local', passport.authenticate('local'),  //can add custom callback to authenticate function

        //if this function is called the user was authenticated. If not passport will return a 401 Unauthorized
        function (req, res) {

            logger.info('Login success, generating tokens for user.', req.user);

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
            }

            //generate and encrypt refreshToken via async waterFall
            tokenFactory.generateRefreshToken(req.user._id, key, sendResult);
        });


    //------Facebook Auth routes.
    app.get('/v1/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/v1/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}),
        function (req, res) {
            res.stats(200).send('logged in with facebook!');
        }
    )
};