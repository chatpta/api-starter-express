const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const logger = require( 'morgan' );
const cors = require( "cors" );
const helmet = require( "helmet" );

const indexRouter = require( './routes/index' );
const usersRouter = require( './routes/users' );
const errors = require( "./common/error" );

const app = express();

// Setup application processing
app.use( cors() );
app.use( helmet() );
app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );

// Add routers
app.use( '/', indexRouter );
app.use( '/users', usersRouter );

// Not found json response
app.use( ( req, res ) => res.status( 404 ).json( errors.appError404 ) );

// Server error json response
app.use( ( err, req, res, next ) => res.status( 500 ).json( errors.appError500 ) );

module.exports = app;
