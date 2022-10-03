'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );

const baseRoute = "/api/v1/starter";

if ( process.env?.DB_CONN !== "none" ) {
    describe( "User/app", function () {

        it( "post /api/v1/starter/users", function ( done ) {

            // Act
            request( app )
                .post( `${ baseRoute }/users` )
                .send( { user: { first_name: "App_post_test", value_two: "I am two" } } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response?.body?.first_name === "App_post_test" );
                    done();
                } );
        } );

        it( "get /api/v1/starter/users", function ( done ) {

            // Act
            request( app )
                .get( `${ baseRoute }/users?first_name=App_post_test` )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response.body.first_name === 'App_post_test' );
                    done();
                } );
        } );

        it( "patch /api/v1/starter/users", function ( done ) {

            // Act
            request( app )
                .patch( `${ baseRoute }/users` )
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

        it( "delete /api/v1/starter/users", function ( done ) {

            // Act
            request( app )
                .delete(`${ baseRoute }/users` )
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

        it( "get /api/v1/starter/users/recent", function ( done ) {

            // Act
            request( app )
                .get( `${ baseRoute }/users/recent` )
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
