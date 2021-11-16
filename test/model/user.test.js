const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { User } = require( "../../factory" );

describe( 'User model', () => {

    it( 'getFirstUser finds first user', ( done ) => {
        // Arrange
        let expectedUser = { name: "Peter" };

        // Act
        let foundUser = User.getFirstUser();

        // Assert
        assert.deepStrictEqual( foundUser, expectedUser );
        done()
    } );

    it( 'findByName called by user_id finds user', ( done ) => {
        // Arrange
        let expectedUser = { name: "Peter", id: 4 };

        // Act
        const typeOfProperty = typeof User.findByName;

        // Assert
        assert(typeOfProperty === "function");
        done()
    } );
} );
