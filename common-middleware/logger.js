const logger = require( 'morgan' );
const path = require( 'path' );
const rotatingFileStream = require( 'rotating-file-stream' );

module.exports = Logger;

/**
 * Creates application logger, write logs to logs directory in app root directory.
 * @return morgan logger
 * @constructor
 */
function Logger() {
    // create a rotating write stream
    const accessLogStream = rotatingFileStream.createStream( 'access.log', {
        interval: '1d', // rotate daily
        path: path.join( __dirname, '..', 'logs' )
    } );

    return logger( 'combined', { stream: accessLogStream } );
}
