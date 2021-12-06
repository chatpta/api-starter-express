'use strict';
const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const cors = require( "cors" );
const helmet = require( "helmet" );

const subApps = require( './sup-apps' );
const { appErrorHandlers } = require( './errors' );
const commonMiddleware = require('./logger')


const app = express();

// Setup application processing
app.use( commonMiddleware.appLogger() );
app.use( cors() );
app.use( helmet() );
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
