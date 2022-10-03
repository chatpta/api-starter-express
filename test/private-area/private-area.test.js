const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( "supertest" );

const app = require( "../../app" );
const jwt = require( "../../test/fixture/token" );

const baseRoute = "/api/v1/starter";

describe( "Private-area/private-area", function () {

    it( "get /api/v1/starter/private ['ad'] role", function ( done ) {

        // Act
        request( app )
            .get( `${ baseRoute }/private` )
            .set( 'Authorization', "bearer " + jwt.adminUser.jwt )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private get response' );
                done();
            } );
    } );

    it( "post /api/v1/starter/private ['ad'] role", function ( done ) {

        // Act
        request( app )
            .post( `${ baseRoute }/private` )
            .set( 'Authorization', "bearer " + jwt.adminUser.jwt )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert.deepStrictEqual( response.status, 200 );
                assert.deepStrictEqual( response?.body?.message, 'Private post response' );
                done();
            } );
    } );

    it( "patch /api/v1/starter/private ['ad'] role", function ( done ) {

        // Act
        request( app )
            .patch( `${ baseRoute }/private` )
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

    it( "delete /api/v1/starter/private ['ad'] role", function ( done ) {

        // Act
        request( app )
            .delete( `${ baseRoute }/private` )
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

