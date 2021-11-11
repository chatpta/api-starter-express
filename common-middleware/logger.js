const logger = require( 'morgan' );

module.exports = Logger;

function Logger(req, res, next) {
    logger( 'dev' );
    next();
}


