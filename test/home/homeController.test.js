const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const home = require( '../../sup-apps/home/homeController' );


describe( "Controller Home", function () {
    it( "getRequestHandler", function ( done ) {

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

    it( "postRequestHandler", function ( done ) {

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

    it( "patchRequestHandler", function ( done ) {

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

    it( "deleteRequestHandler", function ( done ) {

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
