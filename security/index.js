const helmet = require( "helmet" );

module.exports = {
    customHelmet: helmet.contentSecurityPolicy( {
        useDefaults: true,
        directives: {
            "script-src": [ "'self'", "'unsafe-inline'" ],
            "script-src-attr": null
        },
    } )
}
