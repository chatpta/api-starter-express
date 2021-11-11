const { Pool } = require( 'pg' );
const pool = new Pool();

// The pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on( 'error', ( err ) => {
    console.error( 'Unexpected error on idle client', err )
    process.exit( -1 )
} )

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
}
