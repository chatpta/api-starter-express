const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { User } = require( "../../model/User" );

describe( 'User tests model', () => {

    it( 'getFirstUser finds first user', ( done ) => {
        // Arrange
        let user = new User();
        let expectedUser = { name: "Peter" };

        // Act
        let foundUser = user.getFirstUser();

        // Assert
        assert.deepStrictEqual( foundUser, expectedUser );
        done()
    } );

    it( 'getUserById called by user_id finds user', ( done ) => {
        // Arrange
        let user = new User();
        let expectedUser = { name: "Peter", id: 4 };

        // Act
        let foundUser = user.getUserById( 4 );

        // Assert
        assert.deepStrictEqual( foundUser, expectedUser );
        done()
    } );
} );
