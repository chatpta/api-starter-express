const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );
const commonMiddleware = require( '../../common-middleware' );

describe( "Not found app test", function () {
    it( "returns not found 404 message", function () {

        // noinspection JSCheckFunctionSignatures
        app.use( commonMiddleware.appErrorHandlers.notFound404 );

        // Act
        request( app )
            .get( '/not-exist' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 404 );
                assert( response.body.type === "not found" );
            } );
    } );
} );
