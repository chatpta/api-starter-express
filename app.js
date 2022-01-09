'use strict';
const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const cors = require( "cors" );
const { customHelmet } = require( "./security" );

const subApps = require( './sup-apps' );
const { appErrorHandlers } = require( './errors' );
const commonMiddleware = require('./logger');


const app = express();

const corsOptions = {
    origin: [ /\.chatpta\.ca$/, /localhost:3000$/ ],
    optionsSuccessStatus: 200
}

// Setup application processing
app.use( commonMiddleware.appLogger() );
app.options( '*', cors( corsOptions ) );
app.use( cors( corsOptions ) );
app.use( customHelmet );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.set('title', 'chatpta starter api');

// Add routers
app.use( subApps );

// Not found json response.
app.use( appErrorHandlers.notFound404 );

// Server error json response.
app.use( appErrorHandlers.appErrorHandler );

module.exports = app;
