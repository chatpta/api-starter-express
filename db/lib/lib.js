const Dto = require( "../../interfaces" );
const config = require( "../../config" );


async function _createDto( record ) {
    const dto = await Dto.getDTO();

    // Create data transfer object ( Interface )
    if ( record?.rowCount >= 1 ) {
        dto.success = true;
        dto.length = record?.rowCount;
        dto.data = record?.rows;
    }

    return dto;
}

function _restoreAllDatabase( drop_sql_file, restore_sql_file ) {

    const conf = config.dbConfig.connectionConfig;

    const util = require( 'util' );
    const exec = util.promisify( require( 'child_process' ).exec );

    // const command_one = `psql -h localhost -p 5432 -U chatpta_catalogue_user -d chatpta_catalogue_db`;
    // const command_two = `psql postgresql://chatpta_catalogue_user:password@localhost:5432/chatpta_catalogue_db`;

    const pg_user = process.env.PGUSER || conf.user;
    const pg_pass = process.env.PGPASSWORD || conf.password;
    const pg_host = process.env.PGHOST || conf.host;
    const pg_port = process.env.PGPORT || conf.port;
    const pg_db = process.env.PGDATABASE || conf.database;

    const connect_command = `psql postgresql://${ pg_user }:${ pg_pass }@${ pg_host }:${ pg_port }/${ pg_db }`;
    const restore_command = `${ connect_command } --file="${ restore_sql_file }"`;
    const drop_command = `${ connect_command } --file="${ drop_sql_file }"`;


    async function dropTables() {
        const { stdout, stderr } = await exec( drop_command );
        // console.log( 'stdout:', stdout );
        if ( stdout ) console.log( '\nAll previous tables dropped.\n' );
        if ( stderr ) console.log( 'stderr:', stderr );

    }

    async function restore() {
        const { stdout, stderr } = await exec( restore_command );
        // console.log( 'stdout:', stdout );
        if ( stdout ) console.log( `Restoring db from: \n${ restore_sql_file }\n` );
        if ( stderr ) console.log( 'stderr:', stderr );
    }

    if ( drop_sql_file ) {
        return dropTables().then( restore ).then( null );
    } else {
        return restore().then( null );
    }
}

module.exports = {
    _createDto,
    restoreAllDatabase: _restoreAllDatabase
};
