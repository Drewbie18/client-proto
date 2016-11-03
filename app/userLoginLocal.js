/**
 * Created by Drew on 2016-11-02.
 *
 * User Login using passport and the Local strategy
 *
 */
//require access to user list
var User = require('./models/common/user');
var bcrypt = require('bcryptjs'); //to compare passowrd hashes.
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {

//581819d75ae9871cd8051a93

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new LocalStrategy(
        //passport defaults to looking for username as 'username' we have 'name'
        {
            usernameField: 'name'
        },

        function (name, password, done) {

            User.find({name: name}, function (err, user) {

                console.log(user);
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }

                return done(null, user);
            });
        }
    ));


    // a login request is a 'post' request
    app.post('/user/login/local', passport.authenticate('local'),  //can add custom callback to authenticate function

        //if this function is called the user was authenticated. If not passport will return a 401 Unauthorized
        function (req, res) {

            console.log('Login success');
            res.send('Login Successful');


        });


}
