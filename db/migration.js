#!/usr/bin/env node
'use strict';

/**
 * Creates database and tables for starter application.
 */

/**
 * Load .env file.
 * Required for database connection.
 */
require( 'dotenv' ).config();

/**
 * Connect to database and test it.
 */
const Factory = require( '../factory' );

Factory.Database.getDbClient()
    .then( client => client.query( 'SELECT NOW()' ) )
    .then( console.log )
    .catch( console.error );
// .finally( process.exit )

// Create database if not exist.
// Create tables if not exist.
// Optional drop and create new database.
