const { before } = require( "mocha" );

before( "Setup test environment before all tests", async function () {
    // Load .env file to process.env
    require( 'dotenv' ).config();
} );
