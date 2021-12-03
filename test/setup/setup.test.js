'use strict';
const { before, after } = require( "mocha" );
const { User } = require( "../../factory" );
const Db = require( "../../db" );

let testUserIdSetup = null;
let testUser2IdSetup = null;
// Runs test only if DB_CONN is defined
if ( process.env?.DB_CONN !== "none" ) {
    before( "Setup test environment before all tests", async function () {
        // Load .env file to process.env
        require( 'dotenv' ).config();

        let testUser = await User.save( { first_name: "Test User setup one" } );
        testUserIdSetup = testUser.data[ 0 ].user_id;

        let testUser2 = await User.save( { first_name: "Test User setup two" } );
        testUser2IdSetup = testUser2.data[ 0 ].user_id;
    } );

    after( "Disconnect pool", async function () {

        let queryRunner = await Db.getSqlQueryRunner()
        // Delete all data
        await queryRunner( `
                  BEGIN;
                       DELETE FROM Users;
                       DELETE FROM Items;
                  COMMIT;` )
            .then( result => {
                console.log( "== Deleted all data from Database ==" );
            } )
            .catch( console.error )
            .finally( process.exit );


        // Close database pool after teach test
        await Db.getEndPool()
            .catch( console.error );
    } );
}
