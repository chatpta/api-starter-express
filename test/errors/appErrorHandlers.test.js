const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const express = require( 'express' );
const error = require( '../../errors' );


describe( "Common-middleware error handler", function () {
    it( "appErrorHandlers.notFound404", function ( done ) {
        // Arrange
        let app = express();
        // noinspection JSCheckFunctionSignatures
        app.use( error.appErrorHandlers.notFound404 );

        // Act
        request( app )
            .get( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 404 );
                assert( response.body.error === "not found" );
                done();
            } );
    } );

    it( "appErrorHandlers.appError500", function ( done ) {
        // Arrange
        let app = express();
        app.use( function ( req, res, next ) {
            throw new Error( "Application broke" )
        } );
        // noinspection JSCheckFunctionSignatures
        app.use( error.appErrorHandlers.appErrorHandler );

        // Act
        request( app )
            .get( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.statusCode === 500 );
                assert.deepStrictEqual( response.body.error, "application error" );
                done();
            } );
    } );
} );
