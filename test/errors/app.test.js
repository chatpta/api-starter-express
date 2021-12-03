'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );


describe( "Application, req not found", function () {
    it( "returns not found 404 message", function ( done ) {

        // Act
        request( app )
            .get( '/not-exist' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 404 );
                assert( response.body.type === "not found" );
                done()
            } );
    } );

    if ( process.env?.DB_CONN !== "none" ) {
        it( "returns server error 404", function ( done ) {

            // Act
            request( app )
                .get( '/users?first_name=Not_exist' )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 404 );
                    assert( response.body.type === "not found" );
                    done();
                } );
        } );
    }
} );

describe( "Application, req server error", function () {
    it( "returns server error 500 message", function ( done ) {

        // Act
        request( app )
            .get( '/error' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 500 );
                assert( response.body.type === 'app error' );
                done();
            } );
    } );
} );
