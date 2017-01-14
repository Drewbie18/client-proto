
/**
 *This file will keep the configuration for the morgan logging middleware
 *
 */
const FileStreamRotator = require('file-stream-rotator');
const fs = require('fs');
var morgan = require('morgan');
//create relative path for log files
const path = require('path');
var logPath = path.join(__dirname + '..\\..\\logs');


//------------Config Variables for morgan------------//
// this will contain the rolling log params
var streamConfig = {
    date_format: 'YYYYMMDD',
    filename: logPath + '\\access-%DATE%.log',
    frequency: 'daily',
    verbose: false
};
//This sets the predefined format for morgan
var format = 'combined';

//------------CONFIG OUTPUT------------//
module.exports = function (app) {
    //use logpath to directory and if non-existent, create it.
    fs.existsSync(logPath) || fs.mkdirSync(logPath)

    //create rotating write stream
    var accessLogStream = FileStreamRotator.getStream(streamConfig);
    app.use(morgan(format, {stream: accessLogStream}));
};



