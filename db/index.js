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
        .then( res => console.log( "Pg pool connected to database" ) )
        .catch( console.error );
} );

pool.on( 'error', ( err, client ) => {
    console.error( 'Unexpected error in pg pool', err )
    process.exit( -1 )
} )

pool.on( 'acquire', ( client ) => {
    console.log( 'Client acquired from pool' )
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
    query: ( queryObject ) => {
        return pool.query( queryObject );
    },
    endPool: () => pool.end().then( () => console.log( 'Pool has ended' ) ),
    pool: pool
}
