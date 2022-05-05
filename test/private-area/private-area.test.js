const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( "supertest" );

const app = require( "../../app" );
const jwt = require( "../../test/fixture/token" );


describe( "Private-area/private-area", function () {

    it( "get /private ['ad'] role", function ( done ) {

        // Act
        request( app )
            .get( '/private' )
            .set( 'Authorization', "bearer " + jwt.adminUser.jwt )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private get response' );
                done();
            } );
    } );

    it( "post '/private ['ad'] role", function ( done ) {

        // Act
        request( app )
            .post( '/private' )
            .set( 'Authorization', "bearer " + jwt.adminUser.jwt )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert.deepStrictEqual( response.status, 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private post response' );
                done();
            } );
    } );

    it( "patch /private ['ad'] role", function ( done ) {

        // Act
        request( app )
            .patch( '/private' )
            .set( 'Authorization', "bearer " + jwt.adminUser.jwt )
            .send( {
                user: { email: "userAppTest@gmail.com" },
                updated_user: { email: "updatedUserAppTest@gmail.com" }
            } )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private patch response' );
                done();
            } );
    } );

    it( "delete /private ['ad'] role", function ( done ) {

        // Act
        request( app )
            .delete( '/private' )
            .set( 'Authorization', "bearer " + jwt.adminUser.jwt )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private delete response' );
                done();
            } );
    } );
} );

