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
               CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
               DROP TABLE IF EXISTS Users cascade;
               CREATE TABLE Users (
                    user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
                    
                    first_name text,
                    last_name text,
                    main_body json,
                    roles text[] DEFAULT '{ user }',
                    
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
               );
               
               DROP TABLE IF EXISTS Items cascade;
               CREATE TABLE Items (
                    item_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
                    
                    title text,
                    description text,
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
                    
               CREATE TRIGGER set_timestamp
                    BEFORE UPDATE ON Items 
                    FOR EACH ROW
                    EXECUTE PROCEDURE trigger_set_timestamp();
          COMMIT;
     ` ) )
    .then( result => {
        if ( result.length === 10 ) {
            console.log( "========== Migration complete ==========" );
        }
    } )
    .catch( console.error )
    .finally( process.exit );

// Create database if not exist.
// Create tables if not exist.
// Optional drop and create new database.
