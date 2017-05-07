'use strict';

const winston = require('winston');
const winstonExRegLogger = require('winston-express-request-logger');
winstonExRegLogger.createLogger({
    transports : [
        new (winston.transports.Console)({
            handleExceptions: true,
            timestamp       : true,
            level           : 'debug'
        })
    ],
    exitOnError: false
});

function configure(app) {
    app.use(winstonExRegLogger.requestDetails);
}

function getLogger() {
    return winstonExRegLogger.getLogger();
}

module.exports = {
    configure: configure,
    getLogger: getLogger
};
