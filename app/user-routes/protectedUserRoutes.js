/**
 * Created by Drew on 2016-11-29.
 *
 * All routes in this file will be prefaced with an Auth token verification
 * They will also have a callback function incase the Auth token has expired and a
 * refresh token can be requested.
 */


// modules =================================================

var User = require('../models/common/user');

// API ROUTES =================================================
module.exports = function (app) {


    // get all users
    app.get('/api/users', function (req, res) {

        // use mongoose to get all users in the database
        User.find(function (err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            res.json(users); // return all users in JSON format
        });
    });


    // get a user by ID
    app.get('/api/users/:user_Id', function (req, res) {

        // use mongoose to get all users in the database
        User.find({_id: req.params.user_Id}, function (err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all users in JSON format
        });
    });


// delete a user
    app.delete('/api/users/:user_id', function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            // get and return all the users after you create another
            User.find(function (err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        });
    });

}