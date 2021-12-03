'use strict';
const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const cors = require( "cors" );
const helmet = require( "helmet" );

const indexRouter = require( './sup-apps' );
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
app.use( indexRouter );

// Not found json response
app.use( appErrorHandlers.notFound404 );

// Validation error json response
app.use( appErrorHandlers.validationError );

// Server error json response
app.use( appErrorHandlers.appError500 );

module.exports = app;
