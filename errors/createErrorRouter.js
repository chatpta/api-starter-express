'use strict';
const express = require( 'express' );
const router = express.Router();


/**
 * Throws error for testing, only when process.env.NODE_ENV = "test".
 */
router.get( '/', function ( req, res, next ) {
    if ( process.env.NODE_ENV === "test" ) {
        throw new Error( "Application broke" )
    }
    next();
} );


module.exports = router;
