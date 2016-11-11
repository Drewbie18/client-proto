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

        // Search for the sessionId in the
        Session.find({sessionId: req.params.sessionId}, function (err, session) {
            if (err) {
                res.send(err);
            }
            else {
                //find method returns an array.
                session = session[0];

                //if there was no error but no result, session will be null
                if (session == null) {
                    console.log('Session ID not found');
                    res.status(404).send('No session found');
                } else {
                    //if the session is found. validate if it is more than 24 hours old
                    var currentTime = new Date().getTime();
                    var sessionActiveTime = new Date(session.activeDate).getTime();
                    var dateDiffInHours = Math.floor((currentTime - sessionActiveTime) / (1000 * 60 * 60));

                    if (dateDiffInHours > 24) {
                        //send back 401 unauthorized
                        console.log('The expiry date has passed for session: ' + session.sessionId);
                        res.status(401).send('Unauthorized - session has expired')

                    } else {
                        //send back 200
                        console.log('the session has not expired: ', session.sessionId);
                        res.status(200).send('Verified - session is still active');
                    }
                }
            }
        });

    });


    app.get('/api/session/delete/all', function (req, res) {
        Session.remove({}, function (err, status) {
            if (err) {
                console.log('There was an error removing all session documents', err);
                res.status(500).send('ERROR DELETING DOCUMENTS FROM SESSION COLLECTION');
            } else {
                console.log('All documents successfully deleted from session collection', status.result);
                res.status(200).send('ALL SESSION DOCUMENTS DELETED');
            }
        })

    })


};