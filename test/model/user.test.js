const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const Factory = require( "../../factory" );

describe( 'User model', () => {

    it( 'getFirstUser finds first user', ( done ) => {
        // Arrange
        let user = Factory.Model.getUser();
        let expectedUser = { name: "Peter" };

        // Act
        let foundUser = user.getFirstUser();

        // Assert
        assert.deepStrictEqual( foundUser, expectedUser );
        done()
    } );

    it( 'findByName called by user_id finds user', ( done ) => {
        // Arrange
        let user = Factory.Model.getUser();
        let expectedUser = { name: "Peter", id: 4 };

        // Act
        const typeOfProperty = typeof user.findByName;

        // Assert
        assert(typeOfProperty === "function");
        done()
    } );
} );
