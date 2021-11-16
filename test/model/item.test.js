const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { Item } = require( "../../factory" );

// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    describe( 'Item model', () => {
        it( 'Saves item', ( done ) => {
            // Arrange
            let expectedLine = { record: "Item" };

            // Act
            let foundLine = Item.save();

            // Assert
            assert.deepStrictEqual( foundLine, expectedLine );
            done()
        } );
    } );
}
