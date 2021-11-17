const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const user = require( '../../controller' ).user;


describe( "Controller Users", function () {
    it( "/get request return message", async function () {

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
        await user.getRequestHandler( req, res, next );

        // Assert
        assert( res.body.first_name === "Pankaj" );
    } );

    it( "/post request return message", async function () {

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
        await user.postRequestHandler( req, res, next );

        // Assert
        assert( res.body.first_name === "Somebody" );
    } );

    it( "/patch request return message", async function () {

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
        await user.patchRequestHandler( req, res, next );

        // Assert
        assert( res.body.first_name === "Updated somebody" );
    } );

    it( "/delete request return message", async function ( ) {

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
        await user.deleteRequestHandler( req, res, next );

        // Assert
        assert( res.body.first_name === "Updated somebody" );
    } );
} );
