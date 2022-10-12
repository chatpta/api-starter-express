/**
 * Connect to database and restore it.
 */
const dbLib = require( "./lib" );
const path = require( "path" );


module.exports = {
    restoreDatabaseFromSqlFiles
}

async function restoreDatabaseFromSqlFiles() {

    const path_to_sql = path.resolve( __dirname, '../..', 'test/fixture' );
    const rollback_file = path.resolve( __dirname, '../sql/rollback_000010.sql' );
    const restore_file = path.resolve( path_to_sql, 'chatpta_catalogue_db.sql' );
    const restore_images_file = path.resolve( path_to_sql, 'chatpta_catalogue_db_images.sql' );
    const create_views_file = path.resolve( path_to_sql, 'chatpta_catalogue_db_views.sql' );
    const create_search_file = path.resolve( path_to_sql, 'chatpta_catalogue_db_search.sql' );
    const create_pg_trgm = path.resolve( path_to_sql, 'create_pg_trgm.sql' );

    return await dbLib.restoreAllDatabase( rollback_file, restore_file )
        .then( () => dbLib.restoreAllDatabase( null, restore_images_file ) )
        .then( () => dbLib.restoreAllDatabase( null, create_views_file ) )
        .then( () => dbLib.restoreAllDatabase( null, create_search_file ) )
        .then( () => dbLib.restoreAllDatabase( null, create_pg_trgm ) )
        .then( null );

}

