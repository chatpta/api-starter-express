'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const { dbConfig } = require( "../../config" );


describe( "Config/dbConfig", function () {

    it( "connectionConfig", function ( done ) {

        // Act
        const expectedConfigObj = {
            host: '127.0.0.1',
            user: 'chatpta_starter_user',
            database: 'chatpta_starter_db',
            password: 'password',
            port: 40111,
            max: 20,
            idleTimeoutMillis: 2000,
            connectionTimeoutMillis: 200,
            allowExitOnIdle: false
        };

        const dbConfigObj = dbConfig.connectionConfig;

        // Assert
        assert.deepStrictEqual( dbConfigObj, expectedConfigObj );
        done();
    } );
} );

