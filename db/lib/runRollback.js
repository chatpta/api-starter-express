/**
 * Connect to database and test it.
 */
const path = require( "path" );
const Factory = require( './dbProvider' );
const { readFile } = require( './readFile' );

async function runRollback() {

    const rollback_1 = path.resolve( __dirname, '../sql/rollbacks/rollback_000010.sql' );

    return Factory.getDbClient()
        .then( async client => client.query( await readFile( rollback_1 ) ) )
        .then( result => {
            if ( result.length > 0 ) {
                console.log( "========== Rollback complete ==========" );
            }
        } )
        .catch( console.error )
}

module.exports = {
    runRollback
}
