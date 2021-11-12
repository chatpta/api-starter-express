const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const home = require( '../../controller' ).home;


describe( "Controller Home", function () {
    it( "/get request return message", function ( done ) {

        // Arrange
        const req = {};
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        home.getRequestHandler( req, res, next );

        // Assert
        assert( res.body.message === "home get response" );
        done();
    } );

    it( "/post request return message", function ( done ) {

        // Arrange
        const req = {};
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        home.postRequestHandler( req, res, next );

        // Assert
        assert( res.body.message === "home post response" );
        done();
    } );

    it( "/patch request return message", function ( done ) {

        // Arrange
        const req = {};
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        home.patchRequestHandler( req, res, next );

        // Assert
        assert( res.body.message === "home patch response" );
        done();
    } );

    it( "/delete request return message", function ( done ) {

        // Arrange
        const req = {};
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        home.deleteRequestHandler( req, res, next );

        // Assert
        assert( res.body.message === "home delete response" );
        done();
    } );
} );
