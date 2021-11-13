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
const { query, getClient, pool, endPool } = require( '../db' );
query( 'SELECT NOW()' )
    .then( console.log )
    .then( endPool )
    .catch( console.log );

// Create database if not exist.
// Create tables if not exist.
// Optional drop and create new database.
