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
const { query, getClient, pool } = require( '../db' );
query( 'SELECT NOW()' )
    .then( console.log )
    .catch( console.log );

