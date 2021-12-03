'use strict';
const express = require( 'express' );
const home = require( './home' );
const users = require( '../sup-apps/user/users' );
const items = require( '../sup-apps/item/items' );
const createErrorRouter = require( './createErrorRouter' );

const router = express.Router();


router.use( '/', home );
router.use( '/users', users );
router.use( '/items', items );
router.use( '/error', createErrorRouter );

module.exports = router;
