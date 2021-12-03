'use strict';
const express = require( 'express' );
const router = express.Router();
const controller = require( './homeController' );


router.get( '/', controller.getRequestHandler );
router.post( '/', controller.postRequestHandler );
router.patch( '/', controller.patchRequestHandler );
router.delete( '/', controller.deleteRequestHandler );

module.exports = router;
