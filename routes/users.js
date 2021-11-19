'use strict';
const express = require( 'express' );
const router = express.Router();
const user = require( '../controller' ).user;


router.get( '/', user.getRequestFirstNameHandler );
router.post( '/', user.postRequestHandler );
router.patch( '/', user.patchRequestHandler );
router.delete( '/', user.deleteRequestHandler );

module.exports = router;
