'use strict';
const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const cors = require( "cors" );
const error = require( '@chatpta/common-util' ).error;

const { appConfig } = require( "./config" );
const { customHelmet } = require( "./security" );
const subApps = require( './sup-apps' );
const commonMiddleware = require( './logger' );


const app = express();

const corsOptions = {
    origin: appConfig.getAppCORSAllowedList(),
    optionsSuccessStatus: 200,
    allowedHeaders: appConfig.getAppCORSAllowedHeaders()
}

// Setup application processing
app.disable( 'x-powered-by' );
app.use( commonMiddleware.appLogger() );
app.options( '*', cors( corsOptions ) );
app.use( cors( corsOptions ) );
app.use( customHelmet );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.set( 'title', appConfig.getAppTitle() );

// Add routers
app.use( appConfig.getAppRootPath(), subApps );

// Not found json response.
app.use( error.notFound404 );

// Server error json response.
app.use( error.appErrorHandler );

module.exports = app;
