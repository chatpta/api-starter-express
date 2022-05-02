'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );


describe( "App/app", function () {
    it( "get /", function ( done ) {

        // Act
        request( app )
            .get( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home get response' );
                done();
            } );
    } );

    it( "post /", function ( done ) {

        // Act
        request( app )
            .post( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home post response' );
                done();
            } );
    } );

    it( "patch /", function ( done ) {

        // Act
        request( app )
            .patch( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home patch response' );
                done();
            } );
    } );

    it( "delete /", function ( done ) {

        // Act
        request( app )
            .delete( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home delete response' );
                done();
            } );
    } );
} );

