/**
 * Created by Drew on 2017-01-02.
 * This file will contain all the log4js configurations for the app
 * */

//this will get the root directory of the node app.
const appRoot = require('app-root-path');
const rootPath = appRoot.path;


var log4js = require('log4js');


var config = {
    appenders: [{type: 'console'},
        {type: 'file', filename: rootPath + '/logs/auth.log', category: 'auth', maxLogSize: 20480, backups: 3}]
};

log4js.configure(config);
module.exports = log4js;