const connection = require( '../../db' );
const { describe, it } = require( "mocha" );
const assert = require( "assert" );

// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    describe( "Database connection", async function () {
        it( "connect to database and query to gets time", async function () {
            // No testing if no db connection

            // Arrange
            let time = null;

            // Act
            time = await connection.query( 'SELECT NOW()' );

            // Assert
            assert( time.rowCount === 1 );
        } );
    } );
}
