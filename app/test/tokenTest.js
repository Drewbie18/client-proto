/**
 * Created by Drew on 2016-11-15.
 */
var jwt = require('jsonwebtoken');
var localAuthToken =require('./localAuthTokenSchema');

// API ROUTES =================================================
module.exports = function (app) {

    // create client and send back all clients after creation
    app.post('/api/clients', function (req, res) {

        // create a transaction, information comes from AJAX request from Angular
        localAuthToken.create(req.body, function (err, client) {
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





    //this route will be used to test token auth and test middleware
    app.get('/api/user/me', function (req, res) {

        //5823eb10d93cd60a64e2fa0c

        //create a JWT to send back to the client
        var data = {
            userId: '5823eb10d93cd60a64e2fa0c',
        };

        var token = jwt.sign(data, 'secret-key');
        console.log('The token generated is: ', token);

        //there was no return value in client is there was no 'send' method applied.
        res.header('x-auth', token).send('should be something');
    });


    app.get('/api/user/token/send', function (req, res) {

        //this will grab the x-auth value from the http headers.
        var clientToken = req.header('x-auth');

        console.log(clientToken);


        try {
            var decoded = jwt.verify(clientToken, 'secret-key');
            console.log('This is the decoded token we got back', decoded);

            var date = new Date(decoded.iat);

            console.log('IAT date returned: ', date);

        } catch (e) {
            console.log('There was an error decoding the token', e);
        }

        res.send('well...');

    });


};