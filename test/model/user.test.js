const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { User } = require( "../../factory" );

describe( 'User model', ( done ) => {

    it( 'findById', async () => {
        // Arrange
        let id = '7d14f1d5-2966-4296-b7df-eaac32c31983';

        // Act
        const user = await User.findById( id );

        // Assert
        assert.deepStrictEqual( "Umesh", user.rows[ 0 ].first_name );
    } );

    it( 'findByFirstName', async () => {
        // Act
        const user = await User.findByFirstName( "Pankaj" );

        // Assert
        assert.deepStrictEqual( "Pankaj", user.rows[ 0 ].first_name );
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
