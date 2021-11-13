'use strict';
const morgan = require( 'morgan' );
const path = require( 'path' );
const rotatingFileStream = require( 'rotating-file-stream' );

module.exports = Logger;

/**
 * Creates application logger, write logs to logs directory in app root directory.
 * @return morgan logger
 * @constructor
 */
function Logger() {
    // Create a rotating write stream
    const accessLogStream = rotatingFileStream.createStream( 'access.log', {
        interval: '1d', // rotate daily
        path: path.join( __dirname, '..', 'logs' )
    } );

    // Set time to EST
    morgan.token( 'date', function () {
        const p = new Date().toString().replace( /[A-Z]{3}\+/, '+' ).split( / / );
        return ( p[ 2 ] + '/' + p[ 1 ] + '/' + p[ 3 ] + ':' + p[ 4 ] + ' ' + p[ 5 ] );
    } );

    return morgan( 'combined', {
        stream: accessLogStream,
        // skip: function ( req, res ) {
        //     return res.statusCode < 400
        // }
    } );
}
