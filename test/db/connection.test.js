const { query, getClient, pool } = require( '../../db' );
const { describe, it, after } = require( "mocha" );
const assert = require( "assert" );

// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    describe( "Database connection", async function () {

        it( "database query should get time", async function () {
            // Query uses next available client
            // Can not be used for transactions

            // Arrange
            let time = null;

            // Act
            time = await query( 'SELECT NOW()' );

            // Assert
            assert( time.rowCount === 1 );
        } );

        it( "checkout client, run query on client should get time", async function () {
            // Good for running transactions

            // Arrange
            let client = await getClient();
            let time = null;

            // Act
            time = await client.query( 'SELECT NOW()' )
            client.release(); // Client must be released each time after use

            // Assert
            assert( time.rowCount === 1 );
        } );

        it( "checkout with release does not exhaust clients", async function () {
            // Just one client is used, no additional connection created
            // Arrange
            let iteration = 0;
            let totalConnectionCount = 0

            // Act
            for ( let i = 0; i < 20; i++ ) {
                let client = await getClient()
                totalConnectionCount = pool.totalCount;
                await client.release();
                iteration = i;
            }

            // Assert
            assert( iteration === 19 );
            assert( totalConnectionCount === 1 );
        } );

        it( "checkout without release, exhaust clients", async function () {
            // Every time create an additional connection, to get new client
            // Arrange
            let iteration = 0;
            let totalConnectionCount = 0

            // Act
            for ( let i = 0; i < 20; i++ ) {
                let client = await getClient()
                totalConnectionCount = pool.totalCount;
                iteration = i;
            }

            // Assert
            assert( iteration === 19 );
            assert( totalConnectionCount === 20 );
        } );
    } );
}
