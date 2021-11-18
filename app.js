'use strict';
const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const cors = require( "cors" );
const helmet = require( "helmet" );

const indexRouter = require( './routes' );
const Factory = require( "./factory" );

const app = express();

// Setup application processing
app.use( Factory.CommonMiddleware.appLogger() );
app.use( cors() );
app.use( helmet() );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.set('title', 'chatpta starter api');

// Add routers
app.use( indexRouter );

// Not found json response
app.use( Factory.CommonMiddleware.appErrorHandlers.notFound404 );

// Server error json response
app.use( Factory.CommonMiddleware.appErrorHandlers.appError500 );

module.exports = app;
