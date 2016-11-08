/**
 * Created by Drew on 2016-11-05.
 */
var Session = require('./models/common/session');
var cron = require('node-cron');


var validateSession = cron.schedule('* * * * *', function () {
    var date = new Date();
    console.log('running task every minute- ' + date.toJSON());

    var sessionCursor = Session.find({}).cursor();

    sessionCursor.on('data', function (sessionDoc) {
        console.log(sessionDoc.sessionId);

        var currentTime = new Date().getTime();
        var sessionActiveTime = new Date(sessionDoc.activeDate).getTime();

        var dateDiffInHours = Math.Floor((currentTime - sessionActiveTime) / 100 * 60 * 60);

        if (dateDiffInHours > 24) {
            console.log('The expiry date has passed for session: ' + sessionDoc.sessionId);
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