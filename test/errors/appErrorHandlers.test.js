const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const express = require( 'express' );
const commonMiddleware = require( '../../common-middleware' );


describe( "Common-middleware error handler", function () {
    it( "appErrorHandlers.notFound404", function ( done ) {
        // Arrange
        let app = express();
        // noinspection JSCheckFunctionSignatures
        app.use( commonMiddleware.appErrorHandlers.notFound404 );

        // Act
        request( app )
            .get( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 404 );
                assert( response.body.type === "not found" );
                done();
            } );
    } );

    it( "appErrorHandlers.appError400", function ( done ) {
        // Arrange
        let app = express();
        // noinspection JSCheckFunctionSignatures
        app.use( commonMiddleware.appErrorHandlers.appError400 );

        // Act
        request( app )
            .get( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 400 );
                assert( response.body.type === "data error" );
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
        app.use( commonMiddleware.appErrorHandlers.appError500 );

        // Act
        request( app )
            .get( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.statusCode === 500 );
                assert( response.body.type === "app error" );
                done();
            } );
    } );
} );
