const express = require( 'express' );
const router = express.Router();


/* GET home page. */
router.get( '/', function ( req, res, next ) {
    throw new Error( "Application broke" )
} );


module.exports = router;
