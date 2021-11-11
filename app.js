const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const cors = require( "cors" );
const helmet = require( "helmet" );

const indexRouter = require( './routes/indexRouter' );
const commonMiddleware = require( "./common-middleware/index" );

const app = express();

// Setup application processing
app.use( cors() );
app.use( helmet() );
app.use( commonMiddleware.logger );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );

// Add routers
app.use( indexRouter );

// Not found json response
app.use( commonMiddleware.appErrorHandlers.notFound404 );

// Server error json response
app.use( commonMiddleware.appErrorHandlers.appError500 );

module.exports = app;
