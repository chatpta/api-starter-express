const connection = require( '../../db' );
const { describe, it } = require( "mocha" );
const assert = require( "assert" );

describe( "Database connection test", async function () {
    it( "connect to database and query to gets time", async function () {
        // Setup
        let time = null;

        // Act
        time = await connection.query( 'SELECT NOW()' );

        // Assert
        assert( time );
    } );
} );
