const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const user = require( '../../controller' ).user;


describe( "User controller middleware", function () {
    it( "/get request return message", function ( done ) {

        // Setup
        const req = {};
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        user.getRequestHandler( req, res, next );

        // Assert
        assert( res.body.message === "user get response" );
        done();
    } );

    it( "/post request return message", function ( done ) {

        // Setup
        const req = {};
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        user.postRequestHandler( req, res, next );

        // Assert
        assert( res.body.message === "user post response" );
        done();
    } );

    it( "/patch request return message", function ( done ) {

        // Setup
        const req = {};
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        user.patchRequestHandler( req, res, next );

        // Assert
        assert( res.body.message === "user patch response" );
        done();
    } );

    it( "/delete request return message", function ( done ) {

        // Setup
        const req = {};
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        user.deleteRequestHandler( req, res, next );

        // Assert
        assert( res.body.message === "user delete response" );
        done();
    } );
} );
