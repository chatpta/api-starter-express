'use strict';
const { before, after } = require( "mocha" );
const db = require( '../../db' );

before( "Setup test environment before all tests", async function () {
    // Load .env file to process.env
    require( 'dotenv' ).config();
} );

after( "Disconnect pool", function () {
    db.getEndPool()
        .then( console.log )
        .catch( console.error );
} );
