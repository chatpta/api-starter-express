const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const Factory = require( "../../factory" );

// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    describe( 'Item model', () => {
        it( 'Saves item', ( done ) => {
            // Arrange
            let item = Factory.Model.getItem();
            let expectedLine = { record: "Item" };

            // Act
            let foundLine = item.save();

            // Assert
            assert.deepStrictEqual( foundLine, expectedLine );
            done()
        } );
    } );
}
