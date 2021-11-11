const logger = require( 'morgan' );

module.exports = Logger;

function Logger() {
    logger( 'dev' );
}


