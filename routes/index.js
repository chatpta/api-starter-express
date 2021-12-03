'use strict';
const express = require( 'express' );
const home = require( '../sup-apps/home/home' );
const users = require( '../sup-apps/user/userRouter' );
const items = require( '../sup-apps/item/items' );
const createErrorRouter = require( '../errors/createErrorRouter' );

const router = express.Router();


router.use( '/', home );
router.use( '/users', users );
router.use( '/items', items );
router.use( '/error', createErrorRouter );

module.exports = router;
