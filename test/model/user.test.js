const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { User } = require( "../../factory" );

// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
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

        it( 'save', async () => {
            // Arrange
            const testUser = {
                first_name: "Good",
                last_name: "Fellow"
            };

            // Act
            const savedUser = await User.save( testUser );

            // Assert
            assert.deepStrictEqual( savedUser.rows[ 0 ].first_name, testUser.first_name );
        } );

        it( 'update', async () => {
            // Arrange
            const user = await User.findOne();
            const user_id = user.rows[ 0 ].user_id;
            const updatedUser = {
                first_name: "Updated first name",
            };

            // Act
            const receivedUpdatedUser = await User.update( user_id, updatedUser );

            console.log( receivedUpdatedUser );
            // Assert
            // assert.deepStrictEqual( savedUser.rows[ 0 ].first_name, testUser.first_name );
        } );

        it( 'findByFirstName', async () => {
            // Act
            const user = await User.findByFirstName( "Pankaj" );

            // Assert
            assert.deepStrictEqual( user.rows[ 0 ].first_name, "Pankaj" );
        } );
    } );
}
