/**
 * Created by Drew on 2016-10-31.
 */
// modules =================================================
var Client = require('./models/common/client');
var User = require('./models/common/user');
var createDefaultUser = require('./user-services/createUser'); //if form fields are empty will create default data to send
var bcrypt = require('bcryptjs'); //for password hashing
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// API ROUTES =================================================
module.exports = function (app) {

    // get all clients
    app.get('/api/clients', function (req, res) {

        // use mongoose to get all clients in the database
        Client.find(function (err, clients) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err)
            else     res.json(clients); // return all clients in JSON format
        });
    });

    // create client and send back all clients after creation
    app.post('/api/clients', function (req, res) {

        // create a transaction, information comes from AJAX request from Angular
        Client.create(req.body, function (err, client) {
            if (err) res.send(err);
            else {
                // get and return all the clients after you create another
                Client.find(function (err, clients) {
                    if (err)
                        res.send(err)
                    res.json(clients);
                });
            }
        });

    });

    // delete a client
    app.delete('/api/clients/:client_id', function (req, res) {
        Client.remove({
            _id: req.params.client_id
        }, function (err, client) {
            if (err) res.send(err);
            else {
                // get and return all the clients after you create another
                Client.find(function (err, clients) {
                    if (err)
                        res.send(err)
                    res.json(clients);
                });
            }
        });
    });


    // get all users
    app.get('/api/users', function (req, res) {

        // use mongoose to get all users in the database
        User.find(function (err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all users in JSON format
        });
    });


    // get all users
    app.get('/api/users/:user_Id', function (req, res) {

        // use mongoose to get all users in the database
        User.find({_id: req.params.user_Id}, function (err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all users in JSON format
        });
    });


    // create user and send back all users after creation
    app.post('/api/users', function (req, res) {

        //create default user values--for testing
        var testUser = createDefaultUser(req.body);

        //hash the password using bcryptjs
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(testUser.password, salt, function (err, hash) {

                //use bcrypt callback to complete the post request to mongo
                if (err) {
                    console.log('there was an error hasing', err);
                    return
                }
                //include new hashed password in the JSON body
                var testUserJson = {
                    name: testUser.name,
                    firstName: testUser.firstName,
                    lastName: testUser.lastName,
                    email: testUser.email,
                    phone: testUser.phone,
                    password: hash

                };
                console.log('Data being sent to Mongo: ', testUserJson);

                // create a user, information comes from AJAX request from Angular
                User.create(testUserJson, function (err, user) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log(user);
                        res.send(user);
                    }
                });
            });
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