/**
 * Created by Drew on 2016-11-02.
 *
 * User Login using passport and the Local strategy
 *
 */
//require access to user list
var User = require('../models/common/user');
var bcrypt = require('bcryptjs'); //to compare passowrd hashes.
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var tokenFactory = require('../auth/tokenFactory');
var async = require('async');
const RefreshToken = require('../models/common/authRefreshToken');
const CryptoJS = require('crypto-js');

module.exports = function (app) {


    var userId;

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {

        User.find({_id: id}, function (err, user) {
            if (Array.isArray(user)) {
                user = user[0];
            }
            done(err, user._id);
        });
    });

    passport.use(new LocalStrategy(
        //passport defaults to looking for username as 'username' we have 'name'
        {
            usernameField: 'name'
        },

        function (name, password, done) {

            //search the database for the name that was sent in the request
            User.find({name: name}, function (err, user) {

                //mongo returns an array
                if (Array.isArray(user)) {
                    user = user[0];
                }

                console.log('This is the user that was found for local Strategy: ', user);
                //return is there is an error from the find method
                if (err) {
                    return done(err);
                }
                //if the username returns no results report
                if (user == undefined) {
                    console.log('unknown username');
                    return done(null, false, {message: 'Incorrect username.'});
                }

                //compare the password hash stored in the DB to the hash of the password provided.
                bcrypt.compare(password, user.password, function (err, res) {

                    console.log('BCRYPT compare variables: ', password, user.password);

                    //error in hashing
                    if (err) {
                        console.log('There was an error comparing the password hashes', err);
                    } else if (res) {
                        console.log('password hashes match');
                        userId = user._id;

                        return done(null, user);
                    }
                    console.log('passwords do no match', res);
                    return done(null, false, {message: 'Invalid Password'});
                });

            });
        }
    ));


    // a login request is a 'post' request
    app.post('/user/login/local', passport.authenticate('local'),  //can add custom callback to authenticate function

        //if this function is called the user was authenticated. If not passport will return a 401 Unauthorized
        function (req, res) {

            console.log('Login success, generating tokens for user.');

            //generate Auth token synchronously
            var authToken = tokenFactory.generateToken(userId);
            var key = 'secret-key';

            //generate and encrypt refreshToken via async waterFall
            async.waterfall([
                function (callback) {

                    //setting expiry date to 10 days in the future (ms*s*mins*hrs*d)
                    var expiryDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 10));

                    var tokenBody = {
                        userId: userId,
                        expiryDate: expiryDate.toJSON(),
                        issuer: 'MVP',
                        siteUrl: 'localhost:5050',
                        state: 'ACTIVE'
                    };

                    //return the creation object.
                    RefreshToken.create(tokenBody, function (err, refreshToken) {
                        if (err) {
                            console.error('ERROR GENERATING REFRESH TOKEN', err);
                            callback(null, null);
                        }
                        else {
                            console.log('CREATED REFRESH TOKEN ID', refreshToken._id);
                            callback(null, refreshToken._id.toString());
                        }
                    });
                },
                function (arg1, callback) {

                    var cipherObj = CryptoJS.AES.encrypt(arg1, key);
                    console.log(cipherObj);
                    var cipherString = cipherObj.toString();
                    console.log('The encrypted refreshToken: ', cipherString);
                    callback(null, cipherString);

                }
            ], function (err, results) {
                console.log('This is the results object:', results);

                var successResponse = {
                    message: 'Login Succeeded',
                    refreshToken: results
                };
                res.header('x-auth', authToken).send(successResponse);
            })

        });


};
