const connection = require( '../../db' );
const { describe, it } = require( "mocha" );
const assert = require( "assert" );

describe( "Database connection", async function () {
    it( "connect to database and query to gets time", async function ( done ) {
        // No testing if no db connection
        if ( process.env.DB_CONN === "none" ) {
            done();
        }

        // Arrange
        let time = null;

        // Act
        time = await connection.query( 'SELECT NOW()' );

        // Assert
        assert( time );
    } );
} );
