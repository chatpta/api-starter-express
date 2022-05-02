#!/usr/bin/env node
'use strict';

/**
 * Connect to database and restore it.
 */
const dbLib = require( "./lib/lib" );
const path = require( "path" );

const path_to_sql = path.resolve( __dirname, '..', 'test/fixture' );
const drop_file = path.resolve( path_to_sql, 'drop_tables.sql' );
const restore_file = path.resolve( path_to_sql, 'chatpta_cart_db.sql' );
const create_views_file = path.resolve( path_to_sql, 'chatpta_cart_db_views.sql' );
const create_search_file = path.resolve( path_to_sql, 'chatpta_cart_db_search.sql' );

dbLib.restoreAllDatabase( drop_file, restore_file )
    .then( () => dbLib.restoreAllDatabase( null, create_views_file ) )
    .then( () => dbLib.restoreAllDatabase( null, create_search_file ) )
    .then( null );

// Create database if not exist.
// Create tables if not exist.
// Optional drop and create new database.
