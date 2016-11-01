/**
 * Created by Drew on 2016-10-31.
 */
// modules =================================================
var Client = require('./models/common/client');
var User = require('./models/common/user');
var createDefaultUser = require('./user-services/createUser'); //if form fields are empty will create default data to send


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

    // create user and send back all users after creation
    app.post('/api/users', function (req, res) {

        console.log('The request body is: ', req.body);

        var testUser = createDefaultUser(req.body);


        var testUserJson = {
            name: testUser.name,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email,
            phone: testUser.phone,
            password: testUser.password,

        };

        console.log('Data being sent to Mongo: ', testUserJson);

        // create a user, information comes from AJAX request from Angular
        User.create(testUserJson, function (err, user) {
            if (err) {
                res.send(err);
            } else {
                res.send(user);
            }
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