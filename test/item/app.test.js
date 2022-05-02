'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );


if ( process.env?.DB_CONN !== "none" ) {
    describe( "Item/app", function () {

        let item_id = null;
        it( "post", function ( done ) {

            // Act
            request( app )
                .post( '/items' )
                .send( { item: { title: "Items_app_post_test" } } )
                .end( ( err, response ) => {
                    if ( err ) return;
                    // Save for later use
                    item_id = response?.body?.item_id;

                    // Assert
                    assert( response.status === 200 );
                    assert.deepStrictEqual( response?.body?.title, "Items_app_post_test" );
                    done();
                } );
        } );

        it( "get", function ( done ) {

            // Act
            request( app )
                .get( `/items?item_id=${ item_id }` )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response.body.title === 'Items_app_post_test' );
                    done();
                } );
        } );

        it( "patch", function ( done ) {

            // Act
            request( app )
                .patch( '/items' )
                .send( {
                    item: { item_id: item_id },
                    updated_item: { title: "Item app patch test" }
                } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response?.body?.title === "Item app patch test" );
                    done();
                } );
        } );

        it( "delete", function ( done ) {

            // Act
            request( app )
                .delete( '/items' )
                .send( {
                    item: { item_id: item_id }
                } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response.body.title === "Item app patch test" );
                    done();
                } );
        } );
    } );
}
