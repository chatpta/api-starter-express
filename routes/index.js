'use strict';
const express = require( 'express' );
const home = require( './home' );
const users = require( './users' );
const createErrorRouter = require( './createErrorRouter' );

const router = express.Router();


router.use( '/', home );
router.use( '/users', users );
router.use( '/error', createErrorRouter );

module.exports = router;
