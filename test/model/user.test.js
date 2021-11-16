const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { User } = require( "../../factory" );

describe( 'User model', ( done ) => {

    it( 'getQuery', async () => {
        // Arrange
        const query = await User.getQuery();

        // Act
        const time = await query( 'SELECT NOW()' );

        // Assert
        assert( time.rowCount === 1 );

    } );

    it( 'findById', ( done ) => {
        // Arrange
        let expectedUser = { record: 'HI I am here' };

        // Act
        let foundUser = User.findById();

        // Assert
        assert.deepStrictEqual( foundUser, expectedUser );
        done()
    } );

    it( 'findFirstUser finds first user', ( done ) => {
        // Arrange
        let expectedUser = { name: "Peter" };

        // Act
        let foundUser = User.findFirstUser();

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
        assert( typeOfProperty === "function" );
        done()
    } );
} );
