'use strict';
const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const cors = require( "cors" );
const error = require( '@chatpta/common-util' ).error;

const { customHelmet } = require( "./security" );
const subApps = require( './sup-apps' );
const commonMiddleware = require( './logger' );


const app = express();

const corsOptions = {
    origin: [ /\.chatpta\.ca$/, /localhost:3000$/ ],
    optionsSuccessStatus: 200,
    allowedHeaders: [
        'access-control-allow-origin',
        'authorization',
        'content-type',
        'visitor'
    ]
}

// Setup application processing
app.disable('x-powered-by');
app.use( commonMiddleware.appLogger() );
app.options( '*', cors( corsOptions ) );
app.use( cors( corsOptions ) );
app.use( customHelmet );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.set('title', 'chatpta api starter');

// Add routers
app.use('/api/v1/starter', subApps );

// Not found json response.
app.use( error.notFound404 );

// Server error json response.
app.use( error.appErrorHandler );

module.exports = app;
