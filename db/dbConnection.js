'use strict';

/**
 * Creates connection and provides, database clients.
 * This application should connect to this module only by ActiveRecord.js file.
 * It can also be used in scripts to migrate and seed database.
 * These scripts should not be part of main application.
 */
const { Pool } = require( 'pg' );
const Dto = require( '../interfaces' );
const config = require( '../config' );


const pool = new Pool( config.dbConfig.connectionConfig );

// Pool connection output
pool.on( 'connect', ( client ) => {
    client.query( 'SELECT NOW()' )
        // .then( res => console.log( "Pg pool connected to database" ) )
        .catch( console.error );
} );

pool.on( 'error', ( err, client ) => {
    console.error( 'Unexpected error in pg pool', err )
    process.exit( -1 )
} )

pool.on( 'acquire', ( client ) => {
    // console.log( 'Client acquired from pool' )
} )

pool.on( 'remove', ( client ) => {
    client.query( 'SELECT NOW()' )
        .then( res => console.log( "Client closed and removed from pool" ) )
        .catch( console.error );
} );

// disconnect
process.on( 'SIGINT', function () {
    pool.end().catch( console.log );
    console.log( "PG disconnected" );
    process.exit( 0 );
} );

async function getSqlClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;

    client.query = ( ...args ) => {
        client.lastQuery = args;
        return query.apply( client, args );
    }

    client.release = () => {
        // set the methods back to their old un-monkey-patched version
        client.query = query;
        client.release = release;
        return release.apply( client );
    }

    return client;
}

async function asyncClientQueryRun( query ) {
    // Get database client
    const client = await pool.connect();
    let record = null;
    const dto = await Dto.getDTO();

    try {
        // Query database
        record = await client.query( query );

        // Create data transfer object ( Interface )
        if ( record.rowCount >= 1 ) {
            dto.success = true;
            dto.length = record?.rowCount;
            dto.data = record?.rows;
        }

    } catch ( err ) {
        // Return error
        return err;

    } finally {
        // Release client ( necessary )
        await client.release();

    }
    // Return result
    return dto;
}

module.exports = {
    pool: pool,
    query: queryObject => pool.query( queryObject ),
    endPool: async () => await pool.end(),
    getClient: getSqlClient,
    sqlQueryRunner: asyncClientQueryRun
}
