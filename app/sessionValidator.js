/**
 * Created by Drew on 2016-11-05.
 *
 * Excluding this file for prototype. The session will be validated at time of session call.
 *
 */
var Session = require('./models/common/session');
var cron = require('node-cron');


var validateSession = cron.schedule('* * * * *', function () {
    var date = new Date();
    console.log('running task every minute- ' + date.toJSON());

    var sessionCursor = Session.find({}).cursor();

    sessionCursor.on('data', function (sessionDoc) {

        var currentTime = new Date().getTime();
        var sessionActiveTime = new Date(sessionDoc.activeDate).getTime();
        var dateDiffInHours = Math.floor((currentTime - sessionActiveTime) / 1000 * 60 * 60);

        if (dateDiffInHours > 24) {
            console.log('The expiry date has passed for session: ' + sessionDoc.sessionId);
        } else {
            console.log('the session has not expired: ', sessionDoc.sessionId);
        }
    });

    sessionCursor.on('error', function (err) {
        console.log('there was an error', err);
    });

    sessionCursor.on('close', function () {
        console.log('all sessions have been found');
    });


}, false);


module.exports = validateSession;