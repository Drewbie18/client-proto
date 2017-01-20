/**
 * Created by Drew on 2016-11-22.
 *
 * https://scotch.io/tutorials/easy-node-authentication-facebook
 *
 *
 * This workflow will differ from the tutorial as the passport middleware and routes will
 * be in the same file.
 *
 * Workflow
 * 1. register new facebook strategy with passport
 * 2. create auth route
 * 3. create callback route that will
 * 4. *There should also be a 'is logged in' method to see if the user exists and is logged into facebook.
 *
 *
 */


const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('../../config/socialAuth');
const User = require('../models/common/user');
const async = require('async');
const log4js = require('../../config/loggerConf');
var logger = log4js.getLogger('auth');


module.exports = function (passport) {

    passport.use(new FacebookStrategy({
            //config with details from config file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callBackUrl

        },
        function (accessToken, refreshToken, profile, done) {

            //send execution to next event loop
            process.nextTick(function () {

                //search for a user in the DB
                User.findOne({'facebookID': profile.id}, function (err, user) {

                    if (err) {
                        logger.error('There was an error finding facebook user. Error', err);
                        return done(err);
                    }

                    if (user) {
                        logger.info('Facebook user found successfully', user);
                        return done(null, user);

                    } else {
                        logger.info('The user was not found in the system. Creating a new user using facebook' +
                            'information.', profile);


                        //TODO - handle that password is required in DB but not required for FB user creation
                        var newFbUser = {
                            facebookID: profile.id,
                            name: profile.name.givenName,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            password: 'fb password'

                        };

                        User.create(newFbUser, function (err, user) {
                            if (err) {
                                logger.error('There was an error creating the new facebook user', err);
                                return done(err);
                            } else {
                                logger.info('the new facebook user was created successfully')
                                return done(null, user);

                            }
                        });
                    }
                })
            })
        }))
};