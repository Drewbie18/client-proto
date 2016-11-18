/**
 * Created by Drew on 2016-11-17.
 */

var tokenFactory = require('./tokenFactory');

module.exports = function (app) {


    //allow the client to quickly verify if the auth token is still valid on landing
    app.get('/api/token/verify', function (req, res) {

        var token = req.header('x-auth');

        tokenFactory.verifyToken(token)


    });


};