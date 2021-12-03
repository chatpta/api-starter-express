'use strict';
const express = require( 'express' );
const router = express.Router();
const item = require( '../../controller' ).item;


router.get( '/', item.getRequestHandler );
router.post( '/', item.postRequestHandler );
router.patch( '/', item.patchRequestHandler );
router.delete( '/', item.deleteRequestHandler );

module.exports = router;
