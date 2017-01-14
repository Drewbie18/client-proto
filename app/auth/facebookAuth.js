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

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('../../config/socialAuth');
const User = require('../models/common/user');


module.exports = function (app) {

    passport.use(new FacebookStrategy({
            //config with details from config file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callBackUrl

        },
        function (accessToken, refreshToken, profile, done) {

        }
    ))


};