'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const Db = require( '../../db' );

// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    describe( "Db/db", async function () {

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
            let totalCheckoutClientsBeforeTest = pool.totalCount;
            let totalCheckoutClientsAfterTest;
            let checkoutTimes = 25;

            // Act
            for ( let i = 0; i < checkoutTimes; i++ ) {
                let client = await Db.getDbClient();
                client.release();
            }

            totalCheckoutClientsAfterTest = pool.totalCount;

            // Assert
            assert.deepStrictEqual( totalCheckoutClientsAfterTest, totalCheckoutClientsBeforeTest );
        } );

        it( "checkout multiple client", async function () {
            // Every time create an additional connection, to get new client
            // Arrange
            let clients = [];
            let pool = Db.getDbPool();
            let totalCheckoutClientsAfterTest;
            let numberOfIteration = 5

            // Act
            for ( let i = 0; i < numberOfIteration; i++ ) {
                let client = await Db.getDbClient();
                clients.push( client );
            }

            totalCheckoutClientsAfterTest = pool.totalCount;

            // Assert
            assert.deepStrictEqual( totalCheckoutClientsAfterTest, numberOfIteration );

            // Release clients
            clients.forEach( client => client.release() )
        } );

        it( "sqlTransactionQueryArrayRunner test", async function () {
            // Query uses next available client
            // Can not be used for transactions

            // Arrange
            let transactionRunner = Db.getSqlTransactionQueryArrayRunner();

            // Act
            let timeArray = await transactionRunner( [ 'SELECT NOW();', 'SELECT NOW();' ] );

            // Assert

            timeArray.forEach( dto => {
                assert.ok( dto.success );
            } );
        } );
    } );
}
