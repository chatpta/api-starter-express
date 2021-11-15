'use strict';
const { Pool } = require( 'pg' );


const pool = new Pool( {
    max: 20,  // Clients in pool
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 2000,
    allowExitOnIdle: false
} );

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

module.exports = {
    pool: pool,
    query: queryObject => pool.query( queryObject ),
    endPool: async () => await pool.end(),
    getClient: async () => {
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
    },
}
