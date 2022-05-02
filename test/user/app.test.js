'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );


if ( process.env?.DB_CONN !== "none" ) {
    describe( "User/app", function () {

        it( "post", function ( done ) {

            // Act
            request( app )
                .post( '/users' )
                .send( { user: { first_name: "App_post_test" } } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response?.body?.first_name === "App_post_test" );
                    done();
                } );
        } );

        it( "get", function ( done ) {

            // Act
            request( app )
                .get( '/users?first_name=App_post_test' )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response.body.first_name === 'App_post_test' );
                    done();
                } );
        } );

        it( "patch", function ( done ) {

            // Act
            request( app )
                .patch( '/users' )
                .send( {
                    user: { first_name: "App_post_test" },
                    updated_user: { first_name: "App patch test" }
                } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response?.body?.first_name === "App patch test" );
                    done();
                } );
        } );

        it( "delete", function ( done ) {

            // Act
            request( app )
                .delete( '/users' )
                .send( {
                    user: { first_name: "App patch test" }
                } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response.body.first_name === "App patch test" );
                    done();
                } );
        } );

        it( "/recent get", function ( done ) {

            // Act
            request( app )
                .get( '/users/recent' )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response.body.length >= 1 );
                    done();
                } );
        } );
    } );
}
