const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const express = require( 'express' );
const commonMiddleware = require( '../../common-middleware' );

describe( "Not found middleware", function () {
    it( "returns not found 404 message", function () {
        // Setup
        let app = express();
        // noinspection JSCheckFunctionSignatures
        app.use( commonMiddleware.appErrorHandlers.notFound404 );

        // Act
        request( app )
            .get( '/not-exist-route' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 404 );
                assert( response.body.type === "not found" );
            } );
    } );
} );

describe( "Data error middleware", function () {
    it( "returns data error 400 message", function () {
        // Setup
        let app = express();
        // noinspection JSCheckFunctionSignatures
        app.use( commonMiddleware.appErrorHandlers.appError400 );

        // Act
        request( app )
            .get( '/bad-data-route' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 400 );
                assert( response.body.type === "data error" );
            } );
    } );
} );

// describe( "Application error middleware", function () {
//     it( "returns application error 500 message", function () {
//         // Setup
//         let app = express();
//         // noinspection JSCheckFunctionSignatures
//         app.use( commonMiddleware.appErrorHandlers.appError500 );
//
//         // Act
//         request( app )
//             .get( '/app-error-route' )
//             .end( ( err, response ) => {
//                 if ( err ) return;
//
//                 // Assert
//                 assert( response.status === 500 );
//                 assert( response.body.type === "app error" );
//             } );
//     } );
// } );
