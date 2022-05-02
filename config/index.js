'use strict';
/**
 * This file exports all permanent configurations of the application.
 * It should not export username, dbname and passwords.
 */

const dbConfig = require( './dbConfig' );
const authConfig = require( './authConfig' );
const emailConfig = require( './emailConfig' );
const secretConfig = require( './secretConfig' );


module.exports = {
    dbConfig,
    authConfig,
    emailConfig,
    secretConfig
};
