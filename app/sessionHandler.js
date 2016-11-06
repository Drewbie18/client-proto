/**
 * Created by Drew on 2016-11-04.
 */
var Session = require('./models/common/session');
var uuid = require('node-uuid');


module.exports = function (app) {


    // create a session, append the session to the front end.
    app.post('/api/session', function (req, res) {
        var session = {
            sessionId: uuid.v1(),
            userId: req.body.userId
        };
        console.log('Session being created: ', session);
        // create a transaction, information comes from AJAX request from Angular
        Session.create(session, function (err, session) {
            if (err) {
                res.send(err);
            }
            else {
                console.log('session was created successfully', session);
                res.send(session);
            }
        });

    });

    // Search for a session
    app.get('/api/session/:sessionId', function (req, res) {

        console.log('Session being searched: ', req.params.sessionId);

        // Search for the sessionId in the
        Session.find({sessionId: req.params.sessionId}, function (err, session) {
            if (err) {
                res.send(err);
            }
            else {
                console.log('session was created successfully', session);
                res.send(session);
            }
        });

    });


};