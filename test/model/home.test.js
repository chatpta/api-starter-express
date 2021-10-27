const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { Home } = require( "../../model/Home" );

describe( 'Home tests model', () => {

    it( 'getFirstLine finds first line', ( done ) => {
        // Arrange
        let home = new Home();
        let expectedLine = { name: "First line" };

        // Act
        let foundLine = home.getFirstLine();

        // Assert
        assert.deepStrictEqual( foundLine, expectedLine );
        done()
    } );
} );
