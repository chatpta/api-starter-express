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
    .then( client => client.query( `
          BEGIN;
               DROP TABLE IF EXISTS Users;
               CREATE TABLE Users (
                    user_id SERIAL PRIMARY KEY,
                    first_name text,
                    last_name text,
                    main_body json,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
               );
               
               CREATE OR REPLACE FUNCTION trigger_set_timestamp()
                    RETURNS TRIGGER AS $$
                    BEGIN
                      NEW.updated_at = NOW();
                      RETURN NEW;
                    END;
                    $$ LANGUAGE plpgsql;
               
               CREATE TRIGGER set_timestamp
                    BEFORE UPDATE ON Users
                    FOR EACH ROW
                    EXECUTE PROCEDURE trigger_set_timestamp();
          COMMIT;
     ` ) )
    .then( console.log )
    .catch( console.error )
    .finally( process.exit );

// Create database if not exist.
// Create tables if not exist.
// Optional drop and create new database.
