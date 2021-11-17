const assert = require( 'assert' );
const { describe, it } = require( "mocha" );
const { User } = require( "../../factory" );
const { save } = require( "debug" );

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
            const originalUser = { first_name: "For update" };
            const savedUser = await User.save( originalUser );
            const user_id = savedUser.rows[ 0 ].user_id;
            const updateUser = { first_name: "Updated user" };

            // Act
            const receivedUpdatedUser = await User.update( user_id, updateUser );

            // Assert
            assert.deepStrictEqual( receivedUpdatedUser.rows[ 0 ].first_name, updateUser.first_name );
        } );

        it( 'findByFirstName', async () => {
            // Act
            const user = await User.findByFirstName( "Master" );

            // Assert
            assert.deepStrictEqual( user.rows[ 0 ].first_name, "Master" );
        } );
    } );
}
