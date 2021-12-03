'use strict';
const express = require( 'express' );
const home = require( './home/home' );
const users = require( './user/userRouter' );
const items = require( './item/items' );
const createErrorRouter = require( '../errors/createErrorRouter' );

const router = express.Router();


router.use( '/', home );
router.use( '/users', users );
router.use( '/items', items );
router.use( '/error', createErrorRouter );

module.exports = router;
