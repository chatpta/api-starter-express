const { runRollback } = require( "./runRollback" );
const { runMigrationSqlFiles } = require( "./runMigrationSqlFiles" );

/**
 * Reset database to empty new state.
 */

async function resetToDefault() {

    let error_rollback = null;
    let error_migration = null;

    await runRollback()
        .catch( err => {
            error_rollback = err
        } );

    await runMigrationSqlFiles()
        .catch( err => {
            error_migration = err
        } );

    return error_rollback || error_migration;
}

module.exports = {
    resetToDefault
}
