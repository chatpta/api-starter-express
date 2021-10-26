const logger = require( 'morgan' );

module.exports = {
    development: () => logger( 'dev' ),
    production: () => logger( 'dev' ),
    test: () => logger( 'dev' ),
};
