const express = require( 'express' );
const home = require( './home' );
const users = require( './users' );

const router = express.Router();


router.use( '/', home );
router.use( '/users', users );

module.exports = router;

