const express = require( 'express' );
const path = require( 'path' );
const cookieParser = require( 'cookie-parser' );
const logger = require( 'morgan' );

const indexRouter = require( './routes/index' );
const usersRouter = require( './routes/users' );
const errors = require( "./common/error" );
const helmet = require( "helmet" );
const cors = require( "cors" );

const app = express();

app.use( cors() );
app.use( helmet() );
app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', indexRouter );
app.use( '/users', usersRouter );

// Not found json response
app.use( ( req, res ) => res.status( 404 ).json( errors.appError404 ) );

// Server error json response
app.use( ( err, req, res, next ) => res.status( 500 ).json( errors.appError500 ) );

module.exports = app;
