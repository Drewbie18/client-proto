/**
 * Created by Drew on 2017-01-18.
 *
 * This file will contain the local strategy configuration for passport.
 *
 */

var User = require('../models/common/user');
var bcrypt = require('bcryptjs'); //to compare password hashes.
var LocalStrategy = require('passport-local').Strategy;


module.exports = function(passport){

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

                        return done(null, user);
                    }
                    console.log('passwords do no match', res);
                    return done(null, false, {message: 'Invalid Password'});
                });

            });
        }
    ));
};