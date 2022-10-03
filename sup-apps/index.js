'use strict';
const express = require( 'express' );
const home = require( './home' );
const users = require( './user' );
const items = require( './item' );
const privateArea = require( './private-area' );
const { createErrorRouter } = require( '../errors' );

const router = express.Router();


router.use( '/users', users );
router.use( '/items', items );
router.use( '/private', privateArea );
router.use( '/home', home );
router.use( '/error', createErrorRouter );

module.exports = router;
