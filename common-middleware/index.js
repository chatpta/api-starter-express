'use strict';
const appErrorHandlers = require( '../errors/appErrorHandlers' );
const AppLogger = require( '../logger/appLogger' );

module.exports = {
    appErrorHandlers,
    appLogger: AppLogger,
};

