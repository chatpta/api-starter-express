'use strict';
const { before, after } = require( "mocha" );
const db = require( '../../db' );
const { User } = require( "../../factory" );

let testUserIdSetup = null;
let testUser2IdSetup = null;

before( "Setup test environment before all tests", async function () {
    // Load .env file to process.env
    require( 'dotenv' ).config();

    let testUser = await User.save( { first_name: "Test User setup one" } );
    testUserIdSetup = testUser.data[ 0 ].user_id;

    let testUser2 = await User.save( { first_name: "Test User setup two" } );
    testUser2IdSetup = testUser2.data[ 0 ].user_id;
} );

after( "Disconnect pool", async function () {

    await User.delete( testUserIdSetup );
    await User.delete( testUser2IdSetup );

    await db.getEndPool()
        .then( console.log )
        .catch( console.error );
} );
