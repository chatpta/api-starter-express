'use strict';
/**
 * This file exports all of the permanent configurations of all of the application.
 * It should not export username, dbname and passwords.
 */

const dbConfig = require( './dbConfig' );

module.exports = { dbConfig };
