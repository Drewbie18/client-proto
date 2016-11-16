/**
 * Created by Drew on 2016-11-15.
 */
var jwt = require('jsonwebtoken');

// API ROUTES =================================================
module.exports = function (app) {

    //this route will be used to test token auth and test middleware
    app.get('/api/user/me', function (req, res) {

        //5823eb10d93cd60a64e2fa0c

        //create a JWT to send back to the client
        var data = {
            userId: '5823eb10d93cd60a64e2fa0c',
        };

        var token = jwt.sign(data, 'secret-key');
        console.log('The token generated is: ', token);
        res.header('x-auth', token);
    });








    app.get('/api/user/token/send', function (req, res) {

        var clientToken = req.header('x-auth');

        console.log(clientToken);


        try {
            var decoded = jwt.verify(clientToken, 'secret-key');
            console.log('This is the decoded token we got back', decoded);
        } catch (e) {
            console.log('There was an error decoding the token', e);
        }

        res.send('well...');

    });


};