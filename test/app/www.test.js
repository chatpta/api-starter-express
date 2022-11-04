// 'use strict';
// const { describe, it } = require( "mocha" );
// const assert = require( "assert" );
// const request = require( 'supertest' );
//
// const baseRoute = "/api/v1/starter";
//
// describe( "App/www", function () {
//     it( "get /api/v1/starter/home", function ( done ) {
//
//         // Act
//         request( 'http://localhost:40000' )
//             .get( `${ baseRoute }/home` )
//             .end( ( err, response ) => {
//                 if ( err ) return;
//
//                 // Assert
//                 assert( response.status === 200 );
//                 assert( response.body.message === 'home get response' );
//                 done();
//             } );
//     } );
//
//     it( "post /api/v1/starter/home", function ( done ) {
//
//         // Act
//         request( 'http://localhost:40000' )
//             .post( `${ baseRoute }/home` )
//             .end( ( err, response ) => {
//                 if ( err ) return;
//
//                 // Assert
//                 assert( response.status === 200 );
//                 assert( response.body.message === 'home post response' );
//                 done();
//             } );
//     } );
//
//     it( "patch /api/v1/starter/home", function ( done ) {
//
//         // Act
//         request( 'http://localhost:40000' )
//             .patch( `${ baseRoute }/home` )
//             .end( ( err, response ) => {
//                 if ( err ) return;
//
//                 // Assert
//                 assert( response.status === 200 );
//                 assert( response.body.message === 'home patch response' );
//                 done();
//             } );
//     } );
//
//     it( "delete /api/v1/starter/home", function ( done ) {
//
//         // Act
//         request( 'http://localhost:40000' )
//             .delete( `${ baseRoute }/home` )
//             .end( ( err, response ) => {
//                 if ( err ) return;
//
//                 // Assert
//                 assert( response.status === 200 );
//                 assert( response.body.message === 'home delete response' );
//                 done();
//             } );
//     } );
// } );
//
