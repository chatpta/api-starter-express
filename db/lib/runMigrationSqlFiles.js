/**
 * Connect to database and test it.
 */
const path = require( "path" );
const Factory = require( './dbProvider' );
const { readFile } = require( './readFile' );

async function runMigrationSqlFiles() {

    const createTables_1 = path.resolve( __dirname, '../sql/migrations/migrate_000010.sql' );

    return Factory.getDbClient()
        .then( async client => client.query( await readFile( createTables_1 ) ) )
        .then( result => {
            if ( result.length > 0 ) {
                console.log( "========== Migration complete ==========" );
            }
        } )
        .catch( err => {
            console.log( "========== Migration Failed ==========\n\n" );
            console.error( err );
        } );
}

module.exports = {
    runMigrationSqlFiles
}
