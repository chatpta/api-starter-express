'use strict';
const assert = require( 'assert' );
const { describe, it, beforeEach, afterEach } = require( "mocha" );
const User = require( "../../sup-apps/user/userModelFactory" ).getUser();


// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    describe( 'User model', ( done ) => {
        let testUserId = null;
        let testUser2Id = null;

        beforeEach( async () => {
            let testUser = await User.save( { first_name: "Test User" } );
            testUserId = testUser.data[ 0 ].user_id;

            let testUser2 = await User.save( { first_name: "Test User two" } );
            testUser2Id = testUser2.data[ 0 ].user_id;
        } );

        afterEach( async () => {
            await User.delete( testUserId );
            await User.delete( testUser2Id );
        } );


        it( 'findById', async () => {
            // Act
            const foundUser = await User.findById( testUserId );

            // Assert
            assert.deepStrictEqual( foundUser.data[ 0 ].user_id, testUserId );
        } );

        it( 'findOne', async () => {
            // Act
            const user = await User.findOne();

            // Assert
            assert.deepStrictEqual( user.length, 1 );
        } );

        it( 'findLastTen', async () => {
            // Act
            const foundUsers = await User.findLastTen();

            // Assert
            assert( foundUsers.length > 2 );
        } );

        it( 'save', async () => {
            // Arrange
            const testUser = { first_name: "Save me" };

            // Act
            const savedUser = await User.save( testUser );
            const savedUserFirstName = savedUser.data[ 0 ].first_name;
            await User.delete( savedUser.data[ 0 ].user_id );

            // Assert
            assert.deepStrictEqual( savedUserFirstName, testUser.first_name );
        } );

        it( 'update', async () => {
            // Arrange
            const updateUser = { first_name: "Updated user" };

            // Act
            const receivedUpdatedUser = await User.update( testUserId, updateUser );

            // Assert
            assert.deepStrictEqual( receivedUpdatedUser.data[ 0 ].first_name, updateUser.first_name );
        } );

        it( 'delete', async () => {

            // Act
            const receivedDeletedUser = await User.delete( testUserId );

            // Assert
            assert.deepStrictEqual( receivedDeletedUser.data[ 0 ].first_name, "Test User" );
        } );

        it( 'findByFirstName', async () => {
            // Act
            const user = await User.findByFirstName( "Test User" );

            // Assert
            assert.deepStrictEqual( user.data[ 0 ].first_name, "Test User" );
        } );

        it( "run query multiple times", async function () {
            // Arrange
            let iteration = 0;

            // Act
            for ( let i = 0; i < 50; i++ ) {
                iteration = i;
                await User.findOne();
            }

            assert.deepStrictEqual( iteration, 49 );
        } );
    } );
}
