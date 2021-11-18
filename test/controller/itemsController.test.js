'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const item = require( '../../controller' ).item;


describe( "Controller Items", function () {

    let itemId = null;

    it( "/post request create item", async function () {

        // Arrange
        const req = { body: { item: { title: "itemsController post test" } } };
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        await item.postRequestHandler( req, res, next );
        let first_name = await res?.body?.title;
        itemId = res.body.item_id;

        // Assert
        assert( first_name === "itemsController post test" );
    } );

    it( "/get request returns item", async function () {

        // Arrange
        const req = {
            query: { item_id: itemId }
        };
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        await item.getRequestHandler( req, res, next );

        // Assert
        assert( res.body.title === "itemsController post test" );
    } );

    it( "/patch request return item", async function () {

        // Arrange
        const req = {
            body: {
                item: { item_id: itemId },
                updated_item: { title: "itemsController patch test" }
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
        await item.patchRequestHandler( req, res, next );
        let title = await res?.body?.title;

        // Assert
        assert( title === "itemsController patch test" );
    } );

    it( "/delete request return item", async function () {

        // Arrange
        const req = { body: { item: { item_id: itemId } } };
        const res = {
            send( message ) {
                this.body = message
            }
        };
        const next = () => {
        }

        // Act
        await item.deleteRequestHandler( req, res, next );

        // Assert
        assert( res.body.title === "itemsController patch test" );
    } );
} );
