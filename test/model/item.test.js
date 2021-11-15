const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const Factory = require( "../../factory" );

describe( 'Item model', () => {

    it( 'getFirstLine finds first item', ( done ) => {
        // Arrange
        let home = Factory.Model.getItem();
        let expectedLine = { name: "First line" };

        // Act
        let foundLine = home.getFirstLine();

        // Assert
        assert.deepStrictEqual( foundLine, expectedLine );
        done()
    } );
} );
