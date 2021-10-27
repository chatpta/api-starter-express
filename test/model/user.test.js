const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { User } = require( "../../model/User" );

describe( 'User tests', () => {

    it( 'getFirstUser returns user', ( done ) => {
        // Arrange
        let user = new User();
        let expectedUser = { name: "Peter" };

        // Act
        let userFound = user.getFirstUser();

        // Assert
        assert.deepStrictEqual( userFound, expectedUser);
        done()
    } );
} );
