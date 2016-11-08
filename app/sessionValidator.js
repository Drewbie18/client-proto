/**
 * Created by Drew on 2016-11-05.
 */
var Session = require('./models/common/session');
var cron = require('node-cron');


var validateSession = cron.schedule('* * * * *', function () {
    var date = new Date();


    console.log('running task every minute' + date.toJSON());
}, false);


module.exports = validateSession;