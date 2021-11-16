const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { User } = require( "../../factory" );

describe( 'User model', ( done ) => {

    it( 'findOne', async () => {
        // Act
        const user = await User.findOne();

        // Assert
        assert.deepStrictEqual( user.rowCount, 1 );
    } );

    it( 'findById', async () => {
        // Arrange
        const testUser = await User.findOne();

        // Act
        const foundUser = await User.findById( testUser.rows[ 0 ].user_id );

        // Assert
        assert.deepStrictEqual( foundUser.rows[ 0 ].first_name, testUser.rows[ 0 ].first_name );
    } );

    it( 'findByFirstName', async () => {
        // Act
        const user = await User.findByFirstName( "Pankaj" );

        // Assert
        assert.deepStrictEqual( user.rows[ 0 ].first_name, "Pankaj" );
    } );

    it( 'getQuery', async () => {
        // Arrange
        const query = await User.getQuery();

        // Act
        const time = await query( 'SELECT NOW()' );

        // Assert
        assert( time.rowCount === 1 );

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

    it( 'findByFirstName called by user_id finds user', ( done ) => {
        // Arrange
        let expectedUser = { name: "Peter", id: 4 };

        // Act
        const typeOfProperty = typeof User.findByFirstName;

        // Assert
        assert( typeOfProperty === "function" );
        done()
    } );
} );
