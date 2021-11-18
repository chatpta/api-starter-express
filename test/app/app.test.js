'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );


describe( "Application, req not found", function () {
    it( "returns not found 404 message", function ( done ) {

        // Act
        request( app )
            .get( '/not-exist' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 404 );
                assert( response.body.type === "not found" );
                done()
            } );
    } );
} );

describe( "Application, req server error", function () {
    it( "returns server error 500 message", function ( done ) {

        // Act
        request( app )
            .get( '/error' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 500 );
                assert( response.body.type === 'app error' );
                done();
            } );
    } );
} );

describe( "Application, requests root route", function () {
    it( "/ route get", function ( done ) {

        // Act
        request( app )
            .get( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home get response' );
                done();
            } );
    } );

    it( "/ route post", function ( done ) {

        // Act
        request( app )
            .post( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home post response' );
                done();
            } );
    } );

    it( "/ route patch", function ( done ) {

        // Act
        request( app )
            .patch( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home patch response' );
                done();
            } );
    } );

    it( "/ route delete", function ( done ) {

        // Act
        request( app )
            .delete( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home delete response' );
                done();
            } );
    } );
} );

if ( process.env?.DB_CONN !== "none" ) {
    describe( "Application, requests users route", function () {

        it( "/users route post", function ( done ) {

            // Act
            request( app )
                .post( '/users' )
                .send( { user: { first_name: "App_post_test" } } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response?.body?.first_name === "App_post_test" );
                    done();
                } );
        } );

        it( "/users route get", function ( done ) {

            // Act
            request( app )
                .get( '/users?first_name=App_post_test' )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response.body.first_name === 'App_post_test' );
                    done();
                } );
        } );

        it( "/user route patch", function ( done ) {

            // Act
            request( app )
                .patch( '/users' )
                .send( {
                    user: { first_name: "App_post_test" },
                    updated_user: { first_name: "App patch test" }
                } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response?.body?.first_name === "App patch test" );
                    done();
                } );
        } );

        it( "/users route delete", function ( done ) {

            // Act
            request( app )
                .delete( '/users' )
                .send( {
                    user: { first_name: "App patch test" }
                } )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert( response.body.first_name === "App patch test" );
                    done();
                } );
        } );
    } );

    describe( "Application, requests items route", function () {

        let item_id = null;
        it( "/items route post", function ( done ) {

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
                    assert( response?.body?.title === "Items_app_post_test" );
                    done();
                } );
        } );

        it( "/items route get", function ( done ) {

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

        it( "/items route patch", function ( done ) {

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

        it( "/items route delete", function ( done ) {

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
