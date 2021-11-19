const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const user = require( '../../controller' ).user;

if ( process.env?.DB_CONN !== "none" ) {
    describe( "Controller Users", function () {

        it( "postRequestHandler", async function () {

            // Arrange
            const req = { body: { user: { first_name: "Controller post test" } } };
            const res = {
                send( message ) {
                    this.body = message
                }
            };
            const next = () => {
            }

            // Act
            await user.postRequestHandler( req, res, next );
            let first_name = await res?.body?.first_name;

            // Assert
            assert( first_name === "Controller post test" );
        } );

        it( "getRequestFirstNameHandler", async function () {

            // Arrange
            const req = {
                query: { first_name: "Controller post test" }
            };
            const res = {
                send( message ) {
                    this.body = message
                }
            };
            const next = () => {
            }

            // Act
            await user.getRequestFirstNameHandler( req, res, next );

            // Assert
            assert( res.body.first_name === "Controller post test" );
        } );

        it( "getRequestMostRecentHandler", async function () {

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
            await user.getRequestMostRecentHandler( req, res, next );

            // Assert
            assert( res.body.length >= 1 );
        } );

        it( "patchRequestHandler", async function () {

            // Arrange
            const req = {
                body: {
                    user: { first_name: "Controller post test" },
                    updated_user: { first_name: "Controller patch test" }
                }
            };
            const res = {
                send( message ) {
                    this.body = message
                }
            };
            const next = () => {
            }

            // Act
            await user.patchRequestHandler( req, res, next );
            let first_name = await res?.body?.first_name;

            // Assert
            assert( first_name === "Controller patch test" );
        } );

        it( "deleteRequestHandler", async function () {

            // Arrange
            const req = { body: { user: { first_name: "Controller patch test" } } };
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
            assert( res.body.first_name === "Controller patch test" );
        } );
    } );
}
