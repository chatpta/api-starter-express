'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );

const baseRoute = "/api/v1/starter";

describe( "App/app", function () {
    it( "get /api/v1/profile/home", function ( done ) {

        // Act
        request( app )
            .get( `${ baseRoute }/home` )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home get response' );
                done();
            } );
    } );

    it( "post /api/v1/profile/home", function ( done ) {

        // Act
        request( app )
            .post( `${ baseRoute }/home` )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home post response' );
                done();
            } );
    } );

    it( "patch /api/v1/profile/home", function ( done ) {

        // Act
        request( app )
            .patch( `${ baseRoute }/home` )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home patch response' );
                done();
            } );
    } );

    it( "delete /api/v1/profile/home", function ( done ) {

        // Act
        request( app )
            .delete( `${ baseRoute }/home` )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home delete response' );
                done();
            } );
    } );
} );

