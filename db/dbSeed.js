#!/usr/bin/env node
'use strict';

/**
 * Creates database and tables for starter application.
 */

/**
 * Connect to database and test it.
 */
const Factory = require( './dbProvider' );

Factory.getDbClient()
    .then( client => client.query( `
          BEGIN;
               INSERT INTO Users ( first_name, last_name )
               VALUES 
               ('Pankaj', 'Singh'),
               ('Umesh',  'Kumar'),
               ('Master', 'Khan'),
               ('Pintoo', 'Kumar');
               
               INSERT INTO Items ( title, description )
               VALUES 
               ('Chat',   'Masala'),
               ('Garam',  'Masala'),
               ('Sweet',  'Tea'),
               ('Aloo',   'Good');
          COMMIT;
     ` ) )
    .then( result => {
        if ( result.length === 4 ) {
            console.log( "========== Seeding of db complete ==========" );
        }
    } )
    .catch( console.error )
    .finally( process.exit );

// Create database if not exist.
// Create tables if not exist.
// Optional drop and create new database.
