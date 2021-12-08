'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const Db = require( '../../db' );

// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    describe( "Database connection", async function () {

        it( "database query should get time", async function () {
            // Query uses next available client
            // Can not be used for transactions

            // Arrange
            let query = Db.getDbQuery();

            // Act
            let time = await query( 'SELECT NOW()' );

            // Assert
            assert( time.rowCount === 1 );
        } );

        it( "checkout client, run query on client should get time", async function () {
            // Good for running transactions

            // Arrange
            let client = await Db.getDbClient();

            // Act
            let time = await client.query( 'SELECT NOW()' )
            client.release(); // Client must be released each time after use

            // Assert
            assert( time.rowCount === 1 );
        } );

        it( "checkout with release does not exhaust clients", async function () {
            // Just one client is used, no additional connection created
            // Arrange
            let pool = Db.getDbPool();
            let totalConnectionCountBeforeTest = pool.totalCount;
            let iteration = 0;
            let totalConnectionCount = 0

            // Act
            for ( let i = 0; i < 20; i++ ) {
                let client = await Db.getDbClient();
                totalConnectionCount = pool.totalCount;
                client.release();
                iteration = i;
            }

            // Assert
            assert( iteration === 19 );
            assert.deepStrictEqual( totalConnectionCount, totalConnectionCountBeforeTest );
        } );

        it( "checkout multiple client", async function () {
            // Every time create an additional connection, to get new client
            // Arrange
            let iteration = 0;
            let totalConnectionCount = 0
            let pool = Db.getDbPool();
            let clients = [];

            // Act
            for ( let i = 0; i < 5; i++ ) {
                let client = await Db.getDbClient();
                clients.push( client );
                totalConnectionCount = pool.totalCount;
                iteration = i;
            }

            // Assert
            assert.deepStrictEqual( iteration, 4 );
            assert.deepStrictEqual( totalConnectionCount, 5 );

            // Release clients
            clients.forEach( client => client.release() )
        } );
    } );
}
